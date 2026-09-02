@echo off
title Portfolio Website
cd /d "%~dp0"

rem Check npm is installed
where npm >nul 2>nul
if errorlevel 1 (
  echo.
  echo  [ERROR] npm not found. Install Node.js LTS from https://nodejs.org
  echo  then restart this file.
  echo.
  pause
  exit /b
)

rem Install dependencies on first run
if not exist node_modules (
  echo.
  echo  First run - installing dependencies, please wait ~30 seconds...
  echo.
  call npm install
)

echo.
echo  Starting website...
echo.
echo  When you see "VITE ready", open this in your browser:
echo.
echo         http://localhost:5173
echo.
echo  Keep this window OPEN while browsing the site.
echo  Close this window (or press Ctrl+C) to stop the website.
echo.
call npm run dev
pause
