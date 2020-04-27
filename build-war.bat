@echo off
REM --- Copyright (c) 2019 VMware, Inc. All rights reserved.
REM --- Windows script
REM --- (if Ant runs out of memory try defining ANT_OPTS=-Xmx512M)

@setlocal
@IF not defined ANT_HOME (
   @echo BUILD FAILED: You must set the env variable ANT_HOME to your Apache Ant folder
   goto end
)

@call "%ANT_HOME%\bin\ant" build-plugin-war

:end
