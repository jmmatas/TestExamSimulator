@echo off
cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
    echo Python no encontrado en PATH.
    echo Instala Python 3 desde: https://www.python.org/downloads/windows/
    echo Luego vuelve a ejecutar este archivo.
    pause
    exit /b 1
)

start "" http://localhost:8000/index.html
python -m http.server 8000
