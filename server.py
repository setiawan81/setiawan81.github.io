from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import subprocess
import os
from datetime import datetime

class CustomHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/git-push':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8')) if content_length > 0 else {}
            except Exception:
                data = {}
            
            commit_msg = data.get('message', '').strip()
            if not commit_msg:
                commit_msg = f"Update blog via Admin - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            
            try:
                # 1. Run git add .
                subprocess.run(['git', 'add', '.'], capture_output=True, text=True, check=True)
                
                # Check status
                status_res = subprocess.run(['git', 'status', '--porcelain'], capture_output=True, text=True, check=True)
                if not status_res.stdout.strip():
                    response = {
                        'status': 'success',
                        'message': 'Tidak ada perubahan baru untuk di-push.',
                        'output': 'Working tree clean. No changes to commit.'
                    }
                else:
                    # 2. Run git commit
                    commit_res = subprocess.run(['git', 'commit', '-m', commit_msg], capture_output=True, text=True, check=True)
                    # 3. Run git push origin main
                    push_res = subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True, text=True, check=True)
                    
                    combined_output = f"=== COMMIT OUTPUT ===\n{commit_res.stdout}\n\n=== PUSH OUTPUT ===\n{push_res.stderr or push_res.stdout}"
                    response = {
                        'status': 'success',
                        'message': 'Berhasil melakukan commit dan push ke GitHub!',
                        'output': combined_output
                    }
            except subprocess.CalledProcessError as e:
                response = {
                    'status': 'error',
                    'message': f'Gagal menjalankan perintah Git: {" ".join(e.cmd)}',
                    'output': e.stderr or e.stdout or str(e)
                }
            except Exception as e:
                response = {
                    'status': 'error',
                    'message': f'Error internal: {str(e)}',
                    'output': str(e)
                }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def run(server_class=HTTPServer, handler_class=CustomHandler, port=8000):
    # Ensure working directory is the folder of server.py
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server_address = ('127.0.0.1', port)
    httpd = server_class(server_address, handler_class)
    print(f"YS Blog Backend Server berjalan di http://127.0.0.1:{port}")
    print("Tekan Ctrl+C untuk menghentikan server.")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer dihentikan.")
        httpd.server_close()

if __name__ == '__main__':
    run()
