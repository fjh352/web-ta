@echo off
For  %%i in (testcase/*.js) DO (
	call "casperjs.bat" test testcase/%%i --engine=slimerjs
)

start python tools.py
exit