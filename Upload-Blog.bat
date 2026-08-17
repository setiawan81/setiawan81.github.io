@echo off
title Upload Blog ke GitHub
echo ====================================================
echo        MENGUNGGAH PERUBAHAN BLOG KE GITHUB
echo ====================================================
echo.
echo 1. Mendeteksi dan mengumpulkan perubahan file...
git add .
echo.
echo 2. Menyimpan perubahan dengan catatan otomatis...
git commit -m "Update postingan otomatis - %date% %time%"
echo.
echo 3. Mengunggah ke GitHub Pages (branch main)...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Gagal mengunggah ke GitHub!
    echo Pastikan Anda terhubung ke internet dan sudah melakukan login Git.
) else (
    echo.
    echo [SUKSES] Berhasil diunggah! 
    echo Postingan baru Anda akan tampil online dalam +- 30 detik.
)
echo.
echo Tekan tombol apa saja untuk menutup jendela ini...
pause > nul
