@echo off
title Ajustes iPadOS 18 - Servidor local
cd /d "%~dp0"

echo.
echo  ============================================
echo   Ajustes iPadOS 18 - servidor local
echo  ============================================
echo.

REM --- IP local del PC (para abrirlo desde el iPad) ---
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do set IP=%%a
set IP=%IP: =%

echo  En el PC:      http://localhost:8000
echo  En el iPad:    http://%IP%:8000
echo.
echo  (El iPad y el PC deben estar en el mismo Wi-Fi)
echo  Mantén esta ventana abierta mientras uses la app en el iPad.
echo  Para parar: Ctrl+C
echo.

start "" "http://localhost:8000"

where node >nul 2>nul
if %errorlevel%==0 (
  node "%~dp0tools\servidor.js"
) else (
  python -m http.server 8000 --bind 0.0.0.0
)
