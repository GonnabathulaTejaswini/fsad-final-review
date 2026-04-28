@echo off
setlocal enabledelayedexpansion
:: Set JAVA_HOME if not already set (using the one found on this system)
if "%JAVA_HOME%"=="" set "JAVA_HOME=C:\Program Files\Java\jdk-17"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo Checking Java version...
java -version

echo Starting Backend...
:: Using explicit launcher because mvnw.cmd wrapper has issues with parentheses in paths
java -cp ".mvn\wrapper\maven-wrapper.jar" "-Dmaven.multiModuleProjectDirectory=%~dp0." org.apache.maven.wrapper.MavenWrapperMain spring-boot:run
pause
