/*
 * This file is part of Wakanda software, licensed by 4D under
 *  (i) the GNU General Public License version 3 (GNU GPL v3), or
 *  (ii) the Affero General Public License version 3 (AGPL v3) or
 *  (iii) a commercial license.
 * This file remains the exclusive property of 4D and/or its licensors
 * and is protected by national and international legislations.
 * In any event, Licensee's compliance with the terms and conditions
 * of the applicable license constitutes a prerequisite to any use of this file.
 * Except as otherwise expressly stated in the applicable license,
 * such license does not include any other license or rights on this file,
 * 4D's and/or its licensors' trademarks and/or other proprietary rights.
 * Consequently, no title, copyright or other proprietary rights
 * other than those specified in the applicable license is granted.
 */

/** Use Cases
Here is the list of all possible forms of arguments (case sensitive) :

-a -B -c
-a valueA -B valueB -c valueC
-aBc valueA valueB valueC
--opt-a --opt-b --opt-c
--opt-a valueA --opt-b valueB --opt-c valueC
--opt-a=valueA --opt-b=valueB --opt-c=valueC
--opt-a --opt-b --opt-c valueA valueB valueC
Windows only :

/a valueA /B valueB /c valueC
/a:valueA /B:valueB /c:valueC
/a=valueA /B=valueB /c=valueC [for UNIX compatibility]
/a /b /c valueA valueB valueC
Help :

--help, -h
/help, /?, /h [windows only]

The special argument "--" forces in all cases the end of option scanning (the remaining arguments
will be considered as mere values)

Symbols used with the Windows command interpreter :

>
>>
<
|
||
&
&&
||
@

Symbols used with the shell command interpreter : 

Bash?Shell?Dash?...

ShellScript : 
#
$$
>
>>
<
[]
()
``
""
''
\
|
&
;
*
?
Command Prompt :
|	a Unix pipe
>	redirect standard output
<	redirect standard input
>>	redirect and append standard output
;	separate commands on same line
( )	group commands on same line
/	separator in a pathname
~	(tilde) your home directory
~john the home directory of the user john
.	present working directory
..	parent of present working directory
*	Wildcard match of any number of charcters in a filename
?	Wildcard match of exactly one character in a filename
[ ]	Wildcard match of any one character enclosed in these brackets in a filename
&	process command in background

**/


//LocalSetting
var localOrNot = false;
var localPathServer = "";
var reportLocalPath = "";

//** Info Env Variable
var unitTest = require('unitTest');
var env = unitTest.getenv();
console.log("Info : " + " " + JSON.stringify(env));

//Init
var shell = require("shellWorker");
var newServerBin = null;
var output = '';
var index = 0;
var newServerBinPath = (function() 
{
	if (os.isWindows)
		return "\\Wakanda Enterprise Server\\Wakanda Server.exe";
	if (os.isLinux)
		return "/Wakanda Enterprise Server/WakandaEnterprise";
	return "/Wakanda Enterprise Server.app/Contents/MacOs/Wakanda Enterprise Server";
})();

function find(key, array) 
{
   var results = [];
  for (var i = 0; i < array.length; i++) 
  {
    if (array[i].indexOf(key) == 0) 
    	results.push(array[i]);
  }
  return results;
};

function isUppercaseOrLowercase(string) 
{
	var i = 0;
	var symbol = ["/","\\","-","--","---"," ","_","~","\`","!","@","#","$","%","^","&","*","{","}","[","]","|",":",";","'",'"',"<",">","?",",",".","="];
	while (i <= string.length) 
	{
		character = string.charAt(i);
		console.log("Character : " + character);
		if (!isNaN(character * 1)) 
		{
			console.log('Numeric');
		} 
		else if (find(character,symbol).length > 0) 
		{
			console.log('symbol');
		} 
		else 
		{
			if (character == character.toUpperCase()) 
			{
				console.log('Uppercase');
				return false;
			}
			if (character == character.toLowerCase()) 
			{
				console.log('Lowercase');
				return true;
			}
		}
		i++;
	}
};

function statusCodeOS(bool)
{
	return (bool == true) ? 0 : 1;
	//return if bool then 0 else 1;
};

function argformat(value)
{
	var format = value.match(/^./g);
	if (format[0] === "/")
		format = "dos"
	else if (format[0] === "-")
		format = "unix"
	else 
		format = "unknown"
	return format;
};

function copyServer(localSetting)
{
	if (!localSetting)
	{
		var serverPath = File(env.WAKANDA_SERVER_PATH);
		var serverPathWin = serverPath.parent.path.replace(/\//g,'\\');
		if (os.isWindows)
		{
			var copyServer = new SystemWorker("xcopy /E /Y /R /I /F" + " " + '"' + serverPathWin.replace(/\\$/g,'') + '"' + " " + '"' + env.WORKSPACE + "\\Wakanda Enterprise Server" + '"');
			console.log("xcopy /E /Y /R /I /F" + " " + '"' + serverPathWin.replace(/\\$/g,'') + '"' + " " + '"' + env.WORKSPACE + "\\Wakanda Enterprise Server" + '"');
		}
		else
		{
			if (os.isLinux)
			{
				var copyServer = new SystemWorker("cp -R" + " " + '"' + serverPath.parent.path + '"' + " " + env.WORKSPACE);
				console.log("cp -R" + " " + serverPath.parent.path + " " + env.WORKSPACE);
			}
			else
			{
				var str = serverPath.path;
				console.log("Original Path from Mac : " + str);
				var macPath = str.match('.*.app');
				console.log("Path from Mac : " + macPath[0]);
				var copyServer = new SystemWorker("cp -R" + " " + '"' + macPath[0] + '"' + " " + env.WORKSPACE);
				console.log("cp -R" + " " + macPath[0] + " " + env.WORKSPACE);
			}
		}

		copyServer.onmessage = function()
		{
			if (arguments[0].data != null || arguments[0].data.toString() != "")
			{
				console.log("copyServer : " + arguments[0].data.toString());
				output += arguments[0].data.toString();
			}
			else
				console.log("copyServer failed : " + arguments[0].data.toString());
		};

		copyServer.onterminated = function() {
			exitWait();
		};

		wait();
	} else {
		console.log("We are executing test in local");
	}
};

function binariesPath()
{
	//return (localOrNot === true) ? localPathServer : env.WORKSPACE + newServerBinPath
	return (localOrNot === true) ? localPathServer : env.WAKANDA_SERVER_PATH;
};

newServerBin = File(binariesPath());
console.log("Server exist : " + " " + newServerBin.exists);


/* Arrays Logic Value */

//OptionAdmin

function generateValue(value)
{
var cases = [];

//Check Symbol System to escape for Win & Linux//Mac
if (os.isWindows)
	//var symbol = ["/","\\","-","--","---"," ","_","~","\\`","!","@","#","$","%","^","\\&","*","{","}","\\[","\\]","|",":",";","\\'",'\\"',"\\<","\\>","?",",",".","="];
	var symbol = ["-","--","---","/","\\"];
else
	//var symbol = ["/","\\","-","--","---"," ","_","~","\\`","!","@","#","$","%","^","&","*","{","}","\\[","\\]","|",":",";","\\'",'\\"',"<",">","?",",",".","="];
	var symbol = ["-","--","---","/","\\"]; 

var str;
	for (var s = 0; s < symbol.length;s++)
	{
		//Add *Symbol for the all value beginning lowCase and upCase
		str = symbol[s] + value;
		cases.push(str.toLowerCase());
		cases.push(str.toUpperCase());
	};
	//Add multiple value for all cases with ":" or "=" as separator or a space or nothing
	return cases;
};

// Separate Key & value in the JSON File 

function generateJSON()
{
	var caseU = 0;
	var allCase = [];
	var jsonResult =
	{
		"keys" : 
		[
			"admin-password",
			"admin-port",
			"admin-ssl-port", 
			"admin-publish"
		],
		"valuepasswd" : 
		[
			"password"
		],
		"valueport" :
		[
			8090
		],
		"valueportssl" :
		[
			4444
		],
		"valuepublish" : 
		[
			"https",
			"http",
			"both",
			"both-but-http-local-only"
		],
		"separator" : 
		[
			"=",
			"",
			" ",
			":",
			null
		], 
		"name" : "adminTestLogic",
		"adminLogic" :
		[]
	};

	for (var mCase = 0; mCase < jsonResult.keys.length; ++mCase)
		allCase = allCase.concat(generateValue(jsonResult.keys[mCase]));

	for (var jsonI = 0; jsonI < allCase.length;jsonI++)
	{
		if (allCase[jsonI].match(/(admin-password)/g) || allCase[jsonI].match(/(ADMIN-PASSWORD)/g))
			var value = jsonResult.valuepasswd;
		else if (allCase[jsonI].match(/(admin-port)/g) || allCase[jsonI].match(/(ADMIN-PORT)/g))
			var value = jsonResult.valueport;
		else if (allCase[jsonI].match(/(admin-ssl-port)/g) || allCase[jsonI].match(/(ADMIN-SSL-PORT)/g))
			var value = jsonResult.valueportssl;
		else 
			var value = jsonResult.valuepublish;

		for (var jsonI0 = 0; jsonI0 < jsonResult.separator.length;jsonI0++) 
		{
			for (var jsonI1 = 0; jsonI1 < value.length;jsonI1++)
			{
				
				if ((jsonResult.separator[jsonI0] == " " || jsonResult.separator[jsonI0] == "=") && (allCase[jsonI].match(/^(--a)/g) != null))
					var linux = mac = true;
				else
					var linux = mac = false;

				if ((jsonResult.separator[jsonI0] == " " || jsonResult.separator[jsonI0] == "=" || jsonResult.separator[jsonI0] == ":") && (allCase[jsonI].match(/^(--a)/g) != null || allCase[jsonI].match(/^(\/)/g) != null))
					var win = true;
				else	
					var win = false;

				jsonResult.adminLogic.push(
					{
						"case" : caseU,
						"ae":
						{
							"key" : allCase[jsonI],
							"value" : value[jsonI1],
							"separator": jsonResult.separator[jsonI0],
							"cases" : value.length * jsonResult.separator.length, 
							"expected":
							{
								"win":win,
								"linux":linux,
								"mac":mac
							}
						},
						"config" : null,
						"out" : null,
						 "in" : null
					}
				);
				caseU++;
			};
		};
	};
	return jsonResult;
};

var adminLogicCase = generateJSON();

/* 

Configuration [Windows,Linux,Mac] :


*/

function generator(caseObject,name,keys,format,config) 
{

index++; 

//Configuration generator Expected Result  
/*

	Win 	Mac 	Linux 

1	false	false	true

2	true	true	true

3   false	false	false

4 	false 	true	true

5 	true 	false	false

6 	true 	true 	false

7 	false 	true 	false

8 	true 	false 	true

9 	x 		x 		x

*/
/*

PatternGeneric test generator : 

// --***-- Test to check that adminLogic (windows : , Linux/Mac : ) exist
testCLIargs_adminOptionLogicXExist: function() 
{
	generator(paramUnix,paramDos,expectedUnix,expectedDos,in,out,config);
};

*/
/*
		Note : Use "shellWorker" Module for Linux & Mac 
*/
/*
	If Server not found or command not found : error 127, add tests
*/
	console.log("ServerPath :" + " " + newServerBin.path); 
 	if (os.isWindows) 
 	{ 
 	//Windows execution tests
 		//Cases DOS and UNIX format 
		//var options = { parameters : { binFile : newServerBin }, quote : '"' };
		var outputMessage = ''; 
		var outputError = '';
		var outputExitStatus = null;

		if (caseObject.ae.separator == null)
			var cmd = 'cmd /c' + " " + '"' + newServerBin.path + '"' + " " + caseObject.ae.key;
		else 
			var cmd = 'cmd /c' + " " + '"' + newServerBin.path + '"' + " " + caseObject.ae.key + caseObject.ae.separator + caseObject.ae.value;
		
		console.log("Command SW Win : " + cmd);
		//Missing Kill tree for System Worker
		//var optionAdmin = new SystemWorker(["cmd","/C","{binFile}",caseObject.ae.key],options);
		var optionAdmin = new SystemWorker(cmd);
		console.log("Args to test : " + caseObject.ae.key);
		//console.log("optionAdmin value object : "+ JSON.stringify(optionAdmin)); 

		if (optionAdmin != null || optionAdmin != "undefined") 
		{
			optionAdmin.onmessage = function(outputText)
			{
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>onmessage>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				if (outputText != null || outputText.data.toString() != "")
					outputMessage = outputText.data.toString();
				else
					console.log("Onmessage is empty");
			};
			optionAdmin.onerror = function(errorText)
			{
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>onerror>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				if (errorText != null || errorText.data.toString() != "")
					outputError = errorText.data.toString();
				else
					console.log("Onmessage is empty");
			};
			optionAdmin.onterminated = function(terminatedText) {
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>terminated>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				outputExitStatus = terminatedText.exitStatus;
				//Get Command Info and another information
				exitWait();
			};
			
			if (caseObject.ae.expected.win == true) 
			{
				wait(5000);
				optionAdmin.terminate(true,true);
				wait(5000);
			} 
			else {
				wait()
			}
				
	
			if (outputExitStatus == 0) 
			{
				console.log("optionAdmin is : " + outputMessage);
				//Asserts 
				Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.win),
					outputExitStatus,
					"Args type : "+ keys +", windows : "+ caseObject.ae.key +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.win) + ", "+ caseObject.ae.key + " doesn't work or exist. The code returned is : "+ outputExitStatus +".");
				Y.Assert.isNotNull(optionAdmin);
				Y.Assert.isObject(optionAdmin);
				Y.Assert.areSame('',outputError);
				Y.Assert.isNotNull(outputMessage);
				/*
					Add this following check if admin-port, then check the port in the message, if admin-ssl-port, then check the ssl port, if admin-password, then check the login on host:port/rest/$directory/login 
				*/	
			} 
			else 
			{ 
				console.log("optionAdmin failed : " + outputError);
				//Asserts 
				Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.win),
					outputExitStatus,
					"Args type : "+ keys +", windows : "+ caseObject.ae.key +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.win) + ", "+ caseObject.ae.key + " work or exist. The code returned is : "+ outputExitStatus +".");
				Y.Assert.isNotNull(optionAdmin);
				Y.Assert.isObject(optionAdmin);
				Y.Assert.areSame('',outputMessage);
				Y.Assert.isNotNull(outputError); 
				var typeError = outputError.toString().replace(/\r?\n/g, '').match(/^\w+/g);
				if ( typeError[0] === "missing") 
					console.log("Missing Error");
					//Check the error message
				else if ( typeError[0] === "invalid")
					console.log("invalid Error");  
					//Check the error message
				else if ( typeError[0] === "unknown")
					console.log("Unknown error");
					//Check the error message
				else 
				console.log("There is no error type!");
			}
		} 
		else 
			console.log("optionAdmin is null or undefined");
	} 
	else 
	{ 
	//Linux & MacOS execution tests

		//Cases DOS and UNIX format 
		var outputMessage = ''; 
		var outputError = '';
		var outputExitStatus = null;

		if (caseObject.ae.separator == null)
			var cmd = '"' + newServerBin.path + '"' + " " + caseObject.ae.key;
		else 
			var cmd = '"' + newServerBin.path + '"' + " " + caseObject.ae.key + caseObject.ae.separator + caseObject.ae.value;

		console.log("Command SW Linux/Mac : " + cmd);
		var optionAdmin = new SystemWorker(cmd);
		console.log("Args to test : " + caseObject.ae.key);
			
		if (optionAdmin != null || optionAdmin != "undefined") 
		{
			optionAdmin.onmessage = function(outputText)
			{
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>onmessage>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				if (outputText != null || outputText.data.toString() != "")
					outputMessage = outputText.data.toString();
				else
					console.log("Onmessage is empty");
			};
			optionAdmin.onerror = function(errorText)
			{
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>onerror>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				if (errorText != null || errorText.data.toString() != "")
					outputError = errorText.data.toString();
				else
					console.log("Onmessage is empty");
			};
			optionAdmin.onterminated = function(terminatedText) {
				console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>terminated>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
				outputExitStatus = terminatedText.exitStatus;
				//Get Command Info and another information
				exitWait();
			};
			
			if (caseObject.ae.expected.linux == true && caseObject.ae.expected.mac == true) 
			{
				wait(5000);
				optionAdmin.terminate(true,true);
				wait(5000);
			} 
			else 
				wait()
			
			if (outputExitStatus == 0) 
			{
				console.log("optionAdmin is : " + outputMessage);
				//Asserts 
				if (os.isLinux)
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.linux),
						outputExitStatus,
						"Args type : "+ keys +", Linux : "+ caseObject.ae.key +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.linux) + ", "+ caseObject.ae.key + " doesn't work or exist. The code returned is : "+ outputExitStatus +".");
				else 
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.mac),
						outputExitStatus,
						"Args type : "+ keys +", Mac : "+ caseObject.ae.key +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.mac) + ", "+ caseObject.ae.key + " doesn't work or exist. The code returned is : "+ outputExitStatus +".");
				Y.Assert.isNotNull(optionAdmin);
				Y.Assert.isObject(optionAdmin);
				Y.Assert.areSame('',outputError);
				Y.Assert.isNotNull(outputMessage);
				/*
					Add this following check if admin-port, then check the port in the message, if admin-ssl-port, then check the ssl port, if admin-password, then check the login on host:port/rest/$directory/login 
				*/			
			} 
			else 
			{ 
				console.log("optionAdmin failed : " + outputError);
				//Asserts 
				if (os.isLinux)
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.linux),
						outputExitStatus,
						"Args type : "+ keys +", Linux : "+ caseObject.ae.key +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.linux) + ", "+ caseObject.ae.key + " work or exist. The code returned is : "+ outputExitStatus +".");
				else
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.mac),
						outputExitStatus,
						"Args type : "+ keys +", Mac : "+ caseObject.ae.key +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.mac) + ", "+ caseObject.ae.key + " work or exist. The code returned is : "+ outputExitStatus +".");
				Y.Assert.isNotNull(optionAdmin);
				Y.Assert.isObject(optionAdmin);
				Y.Assert.areSame('',outputMessage);
				Y.Assert.isNotNull(outputError); 
				var typeError = outputError.toString().replace(/\r?\n/g, '').match(/^\w+/g);
				if ( typeError[0] === "missing") 
					console.log("Missing Error");
					//Check the error message
				else if ( typeError[0] === "invalid")
					console.log("invalid Error");  
					//Check the error message
				else if ( typeError[0] === "unknown")
					console.log("Unknown error");
					//Check the error message
				else 
				console.log("There is no error type!");
			}

		} 
		else  
			console.log("optionAdmin is null or undefined");
		
	} 
};

var testCase = 
{
	name: "test CLI args adminOptions",
	_should: {
		error: {},
		ignore: {}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {
		if (os.isWindows) 
		{
			//Win Stuff 
		} 
		else if (os.isLinux) 
		{
			//Linux Stuff   
		} 
		else 
		{
			//MAC Stuff
		}
	},
	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown: function() {},
	/*
	 * 
	 * Test methods for Binary execution with Args : command line arguments
	 *
	 */
};

/* Generated tests for Logic optionAdmin */

//Attention, different scope for() and function()
for (var hl = 0; hl < adminLogicCase.adminLogic.length; hl++) 
{
	testCase["testCLIargs_adminOptionLogic_" + adminLogicCase.adminLogic[hl].case + "_" + argformat(adminLogicCase.adminLogic[hl].ae.key)] = function() 
	{
		var phl0 = adminLogicCase.adminLogic[index];
		var phl1 = adminLogicCase.name;
		var phl2 = adminLogicCase.keys;
		var phl3 = argformat(adminLogicCase.adminLogic[index].ae.key); 
		var phl4 = adminLogicCase.adminLogic[index].config; 
		var phl5 = adminLogicCase.adminLogic[index].ae.separator;
		var phl6 = adminLogicCase.adminLogic[index].ae.value;

		console.log("Object JSON to check : " + JSON.stringify(phl0));
		console.log("Name testSuite : " + phl1);
		console.log("Name options : " + phl2);
		console.log("Option format : " + phl3);
		console.log("Config used : " + phl4);
		console.log("Separator used : " + phl5);
		console.log("Value used : " + phl6);
		
		generator(phl0,phl1,phl2,phl3,phl4,phl5,phl6); 		
	}
};

//CopyServer into the Workspace before to run tests
//copyServer(localOrNot);

if (!localOrNot)
	unitTest.run(testCase).getXmlReport(env.WORKSPACE + '/report.xml');
else 
	unitTest.run(testCase).getXmlReport(reportLocalPath + '/report.xml');