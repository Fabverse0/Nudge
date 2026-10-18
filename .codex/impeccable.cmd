@echo off
setlocal
set "IMPECCABLE_HOME=%~dp0..\.impeccable"
set "IMPECCABLE_SKILL_DIR=%~dp0..\.agents\skills\impeccable"
set "engine_version="
set /p engine_version=<"%IMPECCABLE_SKILL_DIR%\scripts\VERSION"
set "IMPECCABLE_BIN=%IMPECCABLE_HOME%\bin\%engine_version%\impeccable.exe"
if exist "%IMPECCABLE_BIN%" goto engine_ready
echo Impeccable engine is missing from this project. Restore the verified local binary before running hooks. 1>&2
exit /b 1
:engine_ready
pushd "%~dp0.."
call "%IMPECCABLE_SKILL_DIR%\scripts\impeccable.cmd" %*
set "engine_exit_code=%errorlevel%"
popd
exit /b %engine_exit_code%
