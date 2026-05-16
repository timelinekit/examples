@echo off
setlocal

set "BASE=%~dp0base"

echo.
echo   ========================================
echo   TimelineKit - Vue Examples
echo   ========================================

:: --- Setup ---
call "%BASE%\setup.cmd" %*
if errorlevel 1 (
    echo.
    echo   Setup failed. Aborting.
    pause
    exit /b 1
)

:: --- Serve ---
call "%BASE%\serve.cmd" --vue
