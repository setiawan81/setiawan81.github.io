@echo off
title Editor Blog Yogi Setiawan - Server
echo ====================================================
echo    MENJALANKAN SERVER LOCALHOST EDITOR BLOG
echo ====================================================
echo.
echo Server akan dijalankan di http://127.0.0.1:8000
echo Browser Anda akan otomatis terbuka dalam beberapa detik...
echo.
echo [TIPS] Jangan tutup jendela command prompt ini selama Anda sedang menulis!
echo.
start http://127.0.0.1:8000/admin.html
python -m http.server 8000 --bind 127.0.0.1
