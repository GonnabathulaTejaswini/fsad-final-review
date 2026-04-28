@echo off
echo ==========================================
echo   Learning Management System - Starter
echo ==========================================
echo.
echo Make sure MySQL is running on localhost:3306
echo.
echo 1. Starting Backend in a separate window...
start "LMS Backend" cmd /c "cd backend && run.bat"

echo 2. Starting Frontend in a separate window...
start "LMS Frontend" cmd /c "cd frontend && run.bat"

echo.
echo Project is starting. 
echo - Wait for the Backend window to show "Started LearningManagementSystemApplication".
echo - Wait for the Frontend window to show "Compiled successfully".
echo - Open http://localhost:3000 in your browser.
echo.
pause
