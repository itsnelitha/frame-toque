@echo off
echo ========================================
echo   Frame Toque - Setup and Run
echo ========================================
echo.
echo Checking for pnpm...
echo.

REM Check if pnpm is installed
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo pnpm is not installed!
    echo.
    echo Installing pnpm via corepack...
    corepack enable
    if %errorlevel% neq 0 (
        echo Failed to enable corepack.
        echo Please install pnpm manually: npm install -g pnpm
        pause
        exit /b 1
    )
)

echo.
echo Installing dependencies...
echo.
pnpm install

if %errorlevel% neq 0 (
    echo.
    echo Failed to install dependencies!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Starting Development Server
echo ========================================
echo.
echo Starting Next.js on http://localhost:3002
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

pnpm dev --port 3002
