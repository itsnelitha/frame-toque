@echo off
echo ========================================
echo   Frame Toque - Development Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo ERROR: node_modules folder not found!
    echo.
    echo Please install dependencies first by running:
    echo   setup-and-run.bat
    echo.
    echo Or manually run:
    echo   pnpm install
    echo.
    pause
    exit /b 1
)

echo Starting Next.js on http://localhost:3002
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

pnpm dev --port 3002
