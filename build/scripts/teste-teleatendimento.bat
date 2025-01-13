@rem
@rem Copyright 2015 the original author or authors.
@rem
@rem Licensed under the Apache License, Version 2.0 (the "License");
@rem you may not use this file except in compliance with the License.
@rem You may obtain a copy of the License at
@rem
@rem      https://www.apache.org/licenses/LICENSE-2.0
@rem
@rem Unless required by applicable law or agreed to in writing, software
@rem distributed under the License is distributed on an "AS IS" BASIS,
@rem WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
@rem See the License for the specific language governing permissions and
@rem limitations under the License.
@rem

@if "%DEBUG%"=="" @echo off
@rem ##########################################################################
@rem
@rem  teste-teleatendimento startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%"=="" set DIRNAME=.
@rem This is normally unused
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%..

@rem Resolve any "." and ".." in APP_HOME to make it shorter.
for %%i in ("%APP_HOME%") do set APP_HOME=%%~fi

@rem Add default JVM options here. You can also use JAVA_OPTS and TESTE_TELEATENDIMENTO_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\lib\teste-teleatendimento-0.1-plain.jar;%APP_HOME%\lib\asset-pipeline-grails-4.5.1-plain.jar;%APP_HOME%\lib\grails-logging-6.2.3.jar;%APP_HOME%\lib\grails-plugin-databinding-6.2.3.jar;%APP_HOME%\lib\grails-plugin-services-6.2.3.jar;%APP_HOME%\lib\grails-plugin-interceptors-6.2.3.jar;%APP_HOME%\lib\scaffolding-5.1.3.jar;%APP_HOME%\lib\grails-plugin-rest-6.2.3.jar;%APP_HOME%\lib\grails-plugin-url-mappings-6.2.3.jar;%APP_HOME%\lib\grails-plugin-controllers-6.2.3.jar;%APP_HOME%\lib\grails-plugin-datasource-6.2.3.jar;%APP_HOME%\lib\hibernate5-8.1.1.jar;%APP_HOME%\lib\grails-plugin-domain-class-6.2.3.jar;%APP_HOME%\lib\grails-datastore-gorm-support-8.1.2.jar;%APP_HOME%\lib\grails-plugin-validation-6.2.3.jar;%APP_HOME%\lib\grails-plugin-i18n-6.2.3.jar;%APP_HOME%\lib\gsp-6.2.4.jar;%APP_HOME%\lib\sitemesh2-6.2.4.jar;%APP_HOME%\lib\grails-plugin-codecs-6.2.3.jar;%APP_HOME%\lib\grails-plugin-mimetypes-6.2.3.jar;%APP_HOME%\lib\grails-web-6.2.3.jar;%APP_HOME%\lib\grails-web-gsp-taglib-6.2.4.jar;%APP_HOME%\lib\grails-web-jsp-6.2.4.jar;%APP_HOME%\lib\grails-web-gsp-6.2.4.jar;%APP_HOME%\lib\grails-web-boot-6.2.3.jar;%APP_HOME%\lib\converters-5.0.0.jar;%APP_HOME%\lib\grails-web-databinding-6.2.3.jar;%APP_HOME%\lib\grails-web-fileupload-6.2.3.jar;%APP_HOME%\lib\grails-web-mvc-6.2.3.jar;%APP_HOME%\lib\grails-web-url-mappings-6.2.3.jar;%APP_HOME%\lib\grails-web-sitemesh-6.2.4.jar;%APP_HOME%\lib\grails-web-taglib-6.2.4.jar;%APP_HOME%\lib\grails-web-common-6.2.3.jar;%APP_HOME%\lib\grails-gsp-6.2.4.jar;%APP_HOME%\lib\grails-taglib-6.2.4.jar;%APP_HOME%\lib\grails-encoder-6.2.3.jar;%APP_HOME%\lib\grails-core-6.2.3.jar;%APP_HOME%\lib\micronaut-spring-context-4.5.1.jar;%APP_HOME%\lib\micronaut-cache-core-3.5.0.jar;%APP_HOME%\lib\micronaut-spring-4.5.1.jar;%APP_HOME%\lib\micronaut-inject-groovy-3.10.4.jar;%APP_HOME%\lib\spring-boot-starter-actuator-2.7.18.jar;%APP_HOME%\lib\spring-boot-starter-validation-2.7.18.jar;%APP_HOME%\lib\spring-boot-starter-2.7.18.jar;%APP_HOME%\lib\spring-boot-actuator-autoconfigure-2.7.18.jar;%APP_HOME%\lib\spring-boot-autoconfigure-2.7.18.jar;%APP_HOME%\lib\spring-boot-starter-logging-2.7.18.jar;%APP_HOME%\lib\spring-boot-starter-tomcat-2.7.18.jar;%APP_HOME%\lib\h2-2.2.224.jar;%APP_HOME%\lib\tomcat-jdbc-9.0.83.jar;%APP_HOME%\lib\jansi-1.18.jar;%APP_HOME%\lib\micronaut-runtime-3.10.4.jar;%APP_HOME%\lib\micronaut-jackson-databind-3.10.4.jar;%APP_HOME%\lib\micronaut-jackson-core-3.10.4.jar;%APP_HOME%\lib\micronaut-json-core-3.10.4.jar;%APP_HOME%\lib\micronaut-context-3.10.4.jar;%APP_HOME%\lib\micronaut-aop-3.10.4.jar;%APP_HOME%\lib\micronaut-http-3.10.4.jar;%APP_HOME%\lib\grails-spring-6.2.3.jar;%APP_HOME%\lib\grails-bootstrap-6.2.3.jar;%APP_HOME%\lib\micronaut-inject-3.10.4.jar;%APP_HOME%\lib\grails-datastore-gorm-hibernate5-8.1.1.jar;%APP_HOME%\lib\logback-classic-1.2.12.jar;%APP_HOME%\lib\log4j-to-slf4j-2.17.2.jar;%APP_HOME%\lib\jul-to-slf4j-1.7.36.jar;%APP_HOME%\lib\asset-pipeline-core-4.5.1.jar;%APP_HOME%\lib\micronaut-core-reactive-3.10.4.jar;%APP_HOME%\lib\micronaut-core-3.10.4.jar;%APP_HOME%\lib\grails-datastore-gorm-8.1.2.jar;%APP_HOME%\lib\grails-datastore-web-8.1.2.jar;%APP_HOME%\lib\grails-datastore-gorm-validation-8.1.2.jar;%APP_HOME%\lib\grails-datastore-core-8.1.2.jar;%APP_HOME%\lib\grails-databinding-6.2.3.jar;%APP_HOME%\lib\grails-codecs-6.2.3.jar;%APP_HOME%\lib\jcl-over-slf4j-1.7.36.jar;%APP_HOME%\lib\slf4j-api-1.7.36.jar;%APP_HOME%\lib\groovy-ant-3.0.23.jar;%APP_HOME%\lib\groovy-sql-3.0.23.jar;%APP_HOME%\lib\groovy-templates-3.0.23.jar;%APP_HOME%\lib\groovy-xml-3.0.23.jar;%APP_HOME%\lib\groovy-json-3.0.23.jar;%APP_HOME%\lib\groovy-3.0.23.jar;%APP_HOME%\lib\caffeine-2.9.3.jar;%APP_HOME%\lib\javax.inject-1.jar;%APP_HOME%\lib\hibernate-core-5.6.15.Final.jar;%APP_HOME%\lib\javax.persistence-api-2.2.jar;%APP_HOME%\lib\fields-5.1.1.jar;%APP_HOME%\lib\scaffolding-core-2.1.0.jar;%APP_HOME%\lib\javax.annotation-api-1.3.2.jar;%APP_HOME%\lib\spring-boot-actuator-2.7.18.jar;%APP_HOME%\lib\spring-boot-2.7.18.jar;%APP_HOME%\lib\spring-webmvc-5.3.39.jar;%APP_HOME%\lib\spring-context-support-5.3.39.jar;%APP_HOME%\lib\spring-context-5.3.39.jar;%APP_HOME%\lib\spring-test-5.3.39.jar;%APP_HOME%\lib\spring-orm-5.3.39.jar;%APP_HOME%\lib\spring-aop-5.3.39.jar;%APP_HOME%\lib\spring-jdbc-5.3.39.jar;%APP_HOME%\lib\spring-tx-5.3.39.jar;%APP_HOME%\lib\spring-web-5.3.39.jar;%APP_HOME%\lib\spring-beans-5.3.39.jar;%APP_HOME%\lib\spring-expression-5.3.39.jar;%APP_HOME%\lib\spring-core-5.3.39.jar;%APP_HOME%\lib\ant-junit-1.10.14.jar;%APP_HOME%\lib\ant-1.10.15.jar;%APP_HOME%\lib\jline-2.14.6.jar;%APP_HOME%\lib\javax.servlet-api-4.0.1.jar;%APP_HOME%\lib\jaxb-api-2.3.1.jar;%APP_HOME%\lib\junit-4.13.2.jar;%APP_HOME%\lib\commons-lang-2.6.jar;%APP_HOME%\lib\jakarta.annotation-api-2.0.0.jar;%APP_HOME%\lib\snakeyaml-2.2.jar;%APP_HOME%\lib\micrometer-core-1.9.17.jar;%APP_HOME%\lib\tomcat-embed-websocket-9.0.83.jar;%APP_HOME%\lib\tomcat-embed-core-9.0.83.jar;%APP_HOME%\lib\tomcat-embed-el-9.0.83.jar;%APP_HOME%\lib\hibernate-validator-6.2.5.Final.jar;%APP_HOME%\lib\commons-lang3-3.12.0.jar;%APP_HOME%\lib\tomcat-juli-9.0.83.jar;%APP_HOME%\lib\jakarta.inject-api-2.0.1.jar;%APP_HOME%\lib\checker-qual-3.19.0.jar;%APP_HOME%\lib\error_prone_annotations-2.10.0.jar;%APP_HOME%\lib\reactor-core-3.4.34.jar;%APP_HOME%\lib\validation-api-2.0.1.Final.jar;%APP_HOME%\lib\spring-jcl-5.3.31.jar;%APP_HOME%\lib\javassist-3.30.2-GA.jar;%APP_HOME%\lib\jta-1.1.jar;%APP_HOME%\lib\ant-launcher-1.10.15.jar;%APP_HOME%\lib\ant-antlr-1.10.14.jar;%APP_HOME%\lib\groovy-groovydoc-3.0.19.jar;%APP_HOME%\lib\javax.activation-api-1.2.0.jar;%APP_HOME%\lib\hamcrest-core-2.2.jar;%APP_HOME%\lib\hibernate-commons-annotations-5.1.2.Final.jar;%APP_HOME%\lib\jboss-logging-3.4.3.Final.jar;%APP_HOME%\lib\byte-buddy-1.12.23.jar;%APP_HOME%\lib\antlr-2.7.7.jar;%APP_HOME%\lib\jboss-transaction-api_1.2_spec-1.1.1.Final.jar;%APP_HOME%\lib\jandex-2.4.2.Final.jar;%APP_HOME%\lib\classmate-1.5.1.jar;%APP_HOME%\lib\jaxb-runtime-2.3.9.jar;%APP_HOME%\lib\javax.el-api-3.0.1-b06.jar;%APP_HOME%\lib\jaxb-impl-4.0.5.jar;%APP_HOME%\lib\jackson-datatype-jsr310-2.13.5.jar;%APP_HOME%\lib\jackson-annotations-2.13.5.jar;%APP_HOME%\lib\jackson-core-2.13.5.jar;%APP_HOME%\lib\jackson-datatype-jdk8-2.13.5.jar;%APP_HOME%\lib\jackson-databind-2.13.5.jar;%APP_HOME%\lib\HdrHistogram-2.1.12.jar;%APP_HOME%\lib\LatencyUtils-2.0.3.jar;%APP_HOME%\lib\logback-core-1.2.12.jar;%APP_HOME%\lib\log4j-api-2.17.2.jar;%APP_HOME%\lib\jakarta.validation-api-2.0.2.jar;%APP_HOME%\lib\reactive-streams-1.0.4.jar;%APP_HOME%\lib\commons-fileupload-1.5.jar;%APP_HOME%\lib\sitemesh-2.4.4.jar;%APP_HOME%\lib\javax.el-3.0.1-b12.jar;%APP_HOME%\lib\hamcrest-2.2.jar;%APP_HOME%\lib\commons-codec-1.15.jar;%APP_HOME%\lib\jaxb-core-4.0.5.jar;%APP_HOME%\lib\jakarta.xml.bind-api-2.3.3.jar;%APP_HOME%\lib\txw2-2.3.9.jar;%APP_HOME%\lib\istack-commons-runtime-3.0.12.jar;%APP_HOME%\lib\jakarta.activation-1.2.2.jar;%APP_HOME%\lib\commons-io-2.11.0.jar;%APP_HOME%\lib\commons-validator-1.8.0.jar;%APP_HOME%\lib\angus-activation-2.0.2.jar;%APP_HOME%\lib\commons-collections-3.2.2.jar;%APP_HOME%\lib\jakarta.activation-api-1.2.2.jar


@rem Execute teste-teleatendimento
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %TESTE_TELEATENDIMENTO_OPTS%  -classpath "%CLASSPATH%" teste.teleatendimento.Application %*

:end
@rem End local scope for the variables with windows NT shell
if %ERRORLEVEL% equ 0 goto mainEnd

:fail
rem Set variable TESTE_TELEATENDIMENTO_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
set EXIT_CODE=%ERRORLEVEL%
if %EXIT_CODE% equ 0 set EXIT_CODE=1
if not ""=="%TESTE_TELEATENDIMENTO_EXIT_CONSOLE%" exit %EXIT_CODE%
exit /b %EXIT_CODE%

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega
