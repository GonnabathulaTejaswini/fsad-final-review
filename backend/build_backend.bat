@echo off
set "JAVA_HOME=C:\Program Files\Java\jdk-17"
set "PATH=%JAVA_HOME%\bin;%PATH%"
echo JAVA_HOME is %JAVA_HOME%
call mvnw.cmd clean install -DskipTests
