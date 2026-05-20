@echo off
setlocal enabledelayedexpansion

set "ROOT=%~dp0..\.."
set "FAILED="
set "COUNT=0"
set "FAIL_COUNT=0"
set "REINSTALL=0"
set "FRAMEWORKS="

:: --- Parse arguments ---
:parse_args
if "%~1"=="" goto :args_done
if /i "%~1"=="--reinstall" set "REINSTALL=1" & shift & goto :parse_args
if /i "%~1"=="--react" set "FRAMEWORKS=!FRAMEWORKS! react" & shift & goto :parse_args
if /i "%~1"=="--vue" set "FRAMEWORKS=!FRAMEWORKS! vue" & shift & goto :parse_args
if /i "%~1"=="--angular" set "FRAMEWORKS=!FRAMEWORKS! angular" & shift & goto :parse_args
shift
goto :parse_args
:args_done

:: Default to all frameworks if none specified
if "%FRAMEWORKS%"=="" set "FRAMEWORKS=react vue angular"

echo.
echo   TimelineKit Examples - Setup and Build
if "%REINSTALL%"=="1" (
    echo   (reinstall mode - clean install all packages^)
) else (
    echo   (quick mode - update TimelineKit packages only^)
)
echo   Frameworks:%FRAMEWORKS%
echo   =======================================
echo.

:: --- Install dependencies (workspace root) ---
pushd "%ROOT%"

if "%REINSTALL%"=="1" (
    echo   Cleaning node_modules...
    if exist "node_modules" rmdir /s /q "node_modules" >nul 2>&1
    if exist "package-lock.json" del /q "package-lock.json" >nul 2>&1
    :: Clean leftover per-project node_modules (from pre-workspace setup)
    for %%F in (%FRAMEWORKS%) do (
        for /d %%D in ("%%F\*") do (
            if exist "%%D\node_modules" rmdir /s /q "%%D\node_modules" >nul 2>&1
            if exist "%%D\package-lock.json" del /q "%%D\package-lock.json" >nul 2>&1
        )
    )
    echo   Installing all dependencies...
    call npm install --loglevel error
    if errorlevel 1 (
        echo   npm install FAILED
        popd
        exit /b 1
    )
    echo   Dependencies installed.
) else (
    if not exist "node_modules" (
        echo   No node_modules found, running full install...
        call npm install --loglevel error
        if errorlevel 1 (
            echo   npm install FAILED
            popd
            exit /b 1
        )
        echo   Dependencies installed.
    ) else (
        echo   Updating TimelineKit packages...
        for %%F in (%FRAMEWORKS%) do (
            for /d %%D in ("%%F\*") do (
                if exist "%%D\package.json" (
                    call npm install @timelinekit/core@latest @timelinekit/%%F@latest -w %%F/%%~nxD --loglevel error >nul 2>&1
                    if errorlevel 1 (
                        echo   [%%F/%%~nxD] Update FAILED
                    )
                )
            )
        )
        echo   TimelineKit packages updated.
    )
)

popd

:: --- Build projects ---
for %%F in (%FRAMEWORKS%) do (
    for /d %%D in ("%ROOT%\%%F\*") do (
        if exist "%%D\package.json" (
            call :build "%%D" "%%~nxD" "%%F"
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

:: --- Build a single project ---
:build
set "DIR=%~1"
set "NAME=%~2"
set "FRAMEWORK=%~3"
set /a COUNT+=1

echo   [%FRAMEWORK%/%NAME%] Building...
pushd "%DIR%"
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
