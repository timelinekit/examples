@echo off
setlocal enabledelayedexpansion

set "ROOT=%~dp0..\.."
set "FRAMEWORK="
set "BASE_PORT=4000"

:: --- Parse arguments ---
:parse_args
if "%~1"=="" goto :args_done
if /i "%~1"=="--react" set "FRAMEWORK=react" & shift & goto :parse_args
if /i "%~1"=="--vue" set "FRAMEWORK=vue" & shift & goto :parse_args
if /i "%~1"=="--angular" set "FRAMEWORK=angular" & shift & goto :parse_args
if /i "%~1"=="--port" set "BASE_PORT=%~2" & shift & shift & goto :parse_args
echo   Unknown argument: %~1
exit /b 1
:args_done

if "%FRAMEWORK%"=="" (
    echo.
    echo   Usage: serve.cmd --react ^| --vue ^| --angular [--port BASE_PORT]
    echo.
    echo   Starts all example apps for the given framework on sequential ports.
    echo   Default base port: 4000
    echo.
    echo   Examples:
    echo     serve.cmd --react              Start all React examples on ports 4000, 4001, ...
    echo     serve.cmd --angular --port 5000  Start Angular examples on ports 5000, 5001, ...
    echo.
    exit /b 1
)

:: --- Launch projects ---
set "COUNT=0"
set "PORT=%BASE_PORT%"
set "PORTS="

echo.
echo   Starting %FRAMEWORK% examples...
echo.

for /d %%D in ("%ROOT%\%FRAMEWORK%\*") do (
    if exist "%%D\package.json" (
        if exist "%%D\node_modules" (
            set "NAME=%%~nxD"
            call :launch "%%D" "!NAME!" "!PORT!"
            set "PORTS=!PORTS! !PORT!"
            set /a PORT+=1
            set /a COUNT+=1
        ) else (
            echo   [%%~nxD] Skipped - no node_modules ^(run setup.cmd first^)
        )
    )
)

if !COUNT! EQU 0 (
    echo   No projects found. Run setup.cmd first to install dependencies.
    exit /b 1
)

:: --- Wait for servers to start, then open browsers ---
echo.
echo   Waiting for servers to start...
timeout /t 5 /nobreak >nul

set "PORT=%BASE_PORT%"
for /d %%D in ("%ROOT%\%FRAMEWORK%\*") do (
    if exist "%%D\package.json" (
        if exist "%%D\node_modules" (
            start "" "http://localhost:!PORT!"
            set /a PORT+=1
        )
    )
)

echo.
echo   =======================================
echo   %COUNT% example(s) running. Press any key to stop all.
echo   =======================================
echo.
pause >nul

:: --- Cleanup: kill processes on used ports ---
echo.
echo   Stopping servers...
for %%P in (%PORTS%) do (
    for /f "tokens=5" %%A in ('netstat -ano 2^>nul ^| findstr "LISTENING" ^| findstr ":%%P "') do (
        taskkill /f /t /pid %%A >nul 2>&1
    )
)
echo   Done.
echo.
exit /b 0

:: --- Launch a single project ---
:launch
set "DIR=%~1"
set "NAME=%~2"
set "LPORT=%~3"

pushd "%DIR%"

:: Check if it's a Next.js project
findstr /m "next" package.json >nul 2>&1
if not errorlevel 1 (
    echo   [%NAME%] http://localhost:%LPORT%
    start /b "" cmd /c "cd /d "%DIR%" && npx next dev --port %LPORT% >nul 2>&1" <nul
    popd
    exit /b 0
)

:: Check if it's an Angular project (ng serve)
findstr /m /c:"ng serve" package.json >nul 2>&1
if not errorlevel 1 (
    echo   [%NAME%] http://localhost:%LPORT%
    start /b "" cmd /c "cd /d "%DIR%" && npx ng serve --port %LPORT% >nul 2>&1" <nul
    popd
    exit /b 0
)

:: Default: Vite (React/Vue)
echo   [%NAME%] http://localhost:%LPORT%
start /b "" cmd /c "cd /d "%DIR%" && npx vite --port %LPORT% >nul 2>&1" <nul
popd
exit /b 0
