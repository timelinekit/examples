@echo off
setlocal enabledelayedexpansion

set "ROOT=%~dp0.."
set "FAILED="
set "COUNT=0"
set "FAIL_COUNT=0"

echo.
echo   TimelineKit Examples - Setup and Build
echo   =======================================
echo.

:: --- Collect all example directories ---
for %%F in (react vue angular) do (
    for /d %%D in ("%ROOT%\%%F\*") do (
        if exist "%%D\package.json" (
            call :process "%%D" "%%~nxD" "%%F"
        )
    )
)

:: --- Summary ---
echo.
echo   =======================================
if "%FAILED%"=="" (
    echo   All %COUNT% examples built successfully.
) else (
    echo   %FAIL_COUNT% of %COUNT% examples failed:
    echo   %FAILED%
)
echo.
exit /b %FAIL_COUNT%

:: --- Process a single example ---
:process
set "DIR=%~1"
set "NAME=%~2"
set "FRAMEWORK=%~3"
set /a COUNT+=1

echo   [%FRAMEWORK%/%NAME%] Installing...
pushd "%DIR%"

:: Clean previous install for fresh resolution
if exist "node_modules" rmdir /s /q "node_modules" >nul 2>&1
if exist "package-lock.json" del /q "package-lock.json" >nul 2>&1

:: Install dependencies
call npm install --loglevel error >nul 2>&1
if errorlevel 1 (
    echo   [%FRAMEWORK%/%NAME%] npm install FAILED
    set /a FAIL_COUNT+=1
    set "FAILED=!FAILED!  %FRAMEWORK%/%NAME% (install) "
    popd
    exit /b 0
)

:: Install optional peer dependencies
call npm install html2canvas jspdf exceljs --loglevel error >nul 2>&1

echo   [%FRAMEWORK%/%NAME%] Building...
call npm run build >nul 2>&1
if errorlevel 1 (
    echo   [%FRAMEWORK%/%NAME%] Build FAILED
    set /a FAIL_COUNT+=1
    set "FAILED=!FAILED!  %FRAMEWORK%/%NAME% (build) "
    popd
    exit /b 0
)

echo   [%FRAMEWORK%/%NAME%] OK
popd
exit /b 0
