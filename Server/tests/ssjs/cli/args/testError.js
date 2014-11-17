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

//Overload string in prototype
String.prototype.insert = function (index, string) 
{
  if (index > 0)
    return this.substring(0, index) + string + this.substring(index, this.length);
  else
    return string + this;
};

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

//ErrorLogicCase

function generateValue(value)
{
var cases = [];
var symbol = ["/","\\","\\-","\\--","---","\\ ","_","~","\\`","!","@","#","$","%","\\^","\\&","*","{","}","[","]","\\|",":",";","\\'",'\\"',"\\<","\\>","?",",",".","="];
//Character > add files for some tests in the workspace
//Add test for escaped characters
var str0;
var str;
var str1;
var str2;
var str22;
var str5;
var str6;
var str7;
var str8;
var str9;
var str10;
var str11;
var str12;
	for (var s = 0; s < symbol.length;s++)
	{
		var str3 = str4 = symbol[s];
		//Add *symbol alone
		str0 = symbol[s];
		cases.push(str0);
		//Add *Symbol for the all value beginning lowCase and upCase
		str = symbol[s] + value;
		cases.push(str.toLowerCase());
		cases.push(str.toUpperCase());
		//Add *Symbol for the first letter beginning lowCase and upCase
		str1 = symbol[s] + value.substring(0,1);
		cases.push(str1.toLowerCase());
		cases.push(str1.toUpperCase());
		//Add *Symbol for the second letter in the all word beginning lowCase and upCase
		str2 = value.insert(1,symbol[s]);
		cases.push(str2.toLowerCase());
		cases.push(str2.toUpperCase());
		//Add *Symbol for the first & second letter in the all word beginning lowCase and upCase
		str22 = str2.insert(0,symbol[s]);
		cases.push(str22.toLowerCase());
		cases.push(str22.toUpperCase());
		//Add *Symbol for the all words without space for each letter lowCase and upCase
		for (var s1 = 0; s1 < value.length;s1++)
		{
			if (value.charAt(s1) != "o")
				str3 += value.charAt(s1) + symbol[s];
			else
				str3 += value.charAt(s1)
		};
		cases.push(str3.toLowerCase());
		cases.push(str3.toUpperCase());
		str3 = "";
		//Add *Symbol for the all words with a space for each letter lowCase and upCase
		for (var s2 = 0; s2 < value.length;s2++)
		{
			if (value.charAt(s2) != "o")
				str4 += value.charAt(s2) + " " + symbol[s];
			else
				str4 += value.charAt(s2)
		};
		cases.push(str4.toLowerCase());
		cases.push(str4.toUpperCase());
		str4 = "";
	};
	var casesV = cases.length;
	//Add value for all cases with ":" or "=" as separator or a space or nothing & Add mulitple value for all cases with ":" or "=" as separator or a space or nothing
	for (var s3 = 0; s3 < casesV;s3++)
	{
		str5 = cases[s3] + " " + "value";
		cases.push(str5.toLowerCase());
		cases.push(str5.toUpperCase());
		str6 = cases[s3] + "value";
		cases.push(str6.toLowerCase());
		cases.push(str6.toUpperCase());
		str7 = cases[s3] + "=" + "value";
		cases.push(str7);
		str8 = cases[s3] + ":" + "value";
		cases.push(str8);
		str9 = cases[s3] + " " + "value1" + " " + cases[s3] + " " + "value2" + " " + cases[s3] + " " + "value3";
		cases.push(str9);
		str10 = cases[s3] + "=" + "value1" + " " + cases[s3] + "=" + "value2" + " " + cases[s3] + "=" + "value3";
		cases.push(str10); 
		str11 = cases[s3] + ":" + "value1" + " " + cases[s3] + ":" + "value2" + " " + cases[s3] + ":" + "value3";
		cases.push(str11); 
		str12 = cases[s3] + " " + cases[s3] + " " + cases[s3] + " " + "value1" + " " + "value2" + " " + "value3";
		cases.push(str12);
	};
	return cases;
};

function generateJSON()
{
	var jsonResult =
	{
		"args" : "foo",
		"name" : "errorTestLogic",
		"errorLogic" :
		[]
	};
	var allCase = generateValue(jsonResult.args);

	for (var jsonI = 0; jsonI < allCase.length;jsonI++)
	{
		var linux = mac = win = false;
		jsonResult.errorLogic.push(
			{
				"case" : jsonI,
				"ae":
				{
					"arg" : allCase[jsonI],
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
	};
	return jsonResult;
};

var errorLogicCase = generateJSON();

/* 

Configuration [Windows,Linux,Mac] :

[0]
[/z & -z]		-z				-z		
[/Z & -Z]		-Z				-Z
[/foo & --foo]	--foo			--foo		
[/FOO & --FOO]	--FOO			--FOO
[-foo]			-foo			-foo
[-FOO]			-FOO			-FOO
[1]
[/z value & -z value]		-z value 			-z value	
[/Z value & -Z value]		-Z value			-Z value
[/foo value & --foo value]	--foo value			--foo value		
[/FOO value & --FOO value]	--FOO value			--FOO value
[-foo value]				-foo value			-foo value
[-FOO value]				-FOO value			-FOO value
[2]
[/zvalue & -zvalue]		-zvalue 			-zvalue	
[/Zvalue & -Zvalue]		-Zvalue			-Zvalue
[/foovalue & --foovalue]	--foovalue			--foovalue		
[/FOOvalue & --FOOvalue]	--FOOvalue			--FOOvalue
[-foovalue]				-foovalue			-foovalue
[-FOOvalue]				-FOOvalue			-FOOvalue

*/

function generator(caseObject,name,args,format,config) 
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

// --***-- Test to check that errorLogic (windows : , Linux/Mac : ) exist
testCLIargs_errorOptionLogicXExist: function() 
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
	var options = { parameters : { binFile : newServerBin }, quote : '"' };
 	if (os.isWindows) 
 	{
 	//Windows execution tests
 		//Cases DOS and UNIX format
		var optionError = SystemWorker.exec(["cmd","/C","{binFile}",caseObject.ae.arg],options);
		console.log("Args to test : " + caseObject.ae.arg);
		console.log("optionError value object : "+ JSON.stringify(optionError));
		if (optionError != null) {
			if (optionError.exitStatus === 0) 
			{
				console.log("optionError is : " + optionError.output.toString());
				//Asserts
				Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.win),
					optionError.exitStatus,
					"Args type : "+ args +", windows : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.win) + ", "+ caseObject.ae.arg + " doesn't work or exist. The code returned is : "+ optionError.exitStatus +".");
				Y.Assert.isNotNull(optionError);
				Y.Assert.isObject(optionError);
				Y.Assert.areSame(0,optionError.error.length);
				Y.Assert.isNotNull(optionError.output);
				Y.Assert.isString(optionError.output.toString().replace(/\r?\n/g, ''));
			} 
			else 
			{
				console.log("optionError failed : " + optionError.error.toString());
				//Asserts
				Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.win),
					optionError.exitStatus,
					"Args type : "+ args +", windows : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.win) + ", "+ caseObject.ae.arg + " work or exist. The code returned is : "+ optionError.exitStatus +".");
				Y.Assert.isNotNull(optionError);
				Y.Assert.isObject(optionError);
				Y.Assert.areSame(0,optionError.output.length);
				Y.Assert.isNotNull(optionError.error);
				Y.Assert.isString(optionError.error.toString().replace(/\r?\n/g, ''));
				var typeError = optionError.error.toString().replace(/\r?\n/g, '').match(/^\w+/g)
				console.log("typeError Value : " + typeError);
				if (typeError != null) 
				{
					if ( typeError[0] == "missing")
						console.log("Missing Error");
						//Check the error message
					else if ( typeError[0] == "invalid")
						console.log("invalid Error");
						//Check the error message
					else if ( typeError[0] == "unknown")
						console.log("Unknown error");
						//Check the error message
					else
					console.log("There is no error type!");
				} 
				else
				console.log("typeError is null");
			}
		} else
			console.log("optionError is null");
	}
	else
	{
		//Linux & MacOS execution tests
		//Cases DOS and UNIX format
		var cmd = '"' + newServerBin.path + '"' + " " + '"' + caseObject.ae.arg + '"';
		console.log("Command SW: " + cmd);
		var optionError = SystemWorker.exec(["sh","-c", cmd], null);
		console.log("Args to test : " + caseObject.ae.arg);
		console.log("optionError value object : "+ JSON.stringify(optionError) +"");
		if (optionError != null) 
		{
			if (optionError.exitStatus === 0) 
			{
				console.log("optionError is : " + optionError.output.toString());
				//Asserts
				if (os.isLinux)
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.linux),
						optionError.exitStatus,
						"Args type : "+ args +", Linux : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.linux) + ", "+ caseObject.ae.arg + " doesn't work or exist. The code returned is : "+ optionError.exitStatus +".");
				else
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.mac),
						optionError.exitStatus,
						"Args type : "+ args +", Mac : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.mac) + ", "+ caseObject.ae.arg + " doesn't work or exist. The code returned is : "+ optionError.exitStatus +".");
				Y.Assert.isNotNull(optionError);
				Y.Assert.isObject(optionError);
				Y.Assert.areSame(0,optionError.error.length);
				Y.Assert.isNotNull(optionError.output);
				Y.Assert.isString(optionError.output.toString().replace(/\r?\n/g, ''));
				//Check ouput message of the error
			} 
			else 
			{
				console.log("optionError failed : " + optionError.error.toString());
				//Asserts
				if (os.isLinux)
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.linux),
						optionError.exitStatus,
						"Args type : "+ args +", Linux : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.linux) + ", "+ caseObject.ae.arg + " work or exist. The code returned is : "+ optionError.exitStatus +".");
				else
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.mac),
						optionError.exitStatus,
						"Args type : "+ args +", Mac : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.mac) + ", "+ caseObject.ae.arg + " work or exist. The code returned is : "+ optionError.exitStatus +".");
				Y.Assert.isNotNull(optionError);
				Y.Assert.isObject(optionError);
				Y.Assert.areSame(0,optionError.output.length);
				Y.Assert.isNotNull(optionError.error);
				Y.Assert.isString(optionError.error.toString().replace(/\r?\n/g, ''));
				var typeError = optionError.error.toString().replace(/\r?\n/g, '').match(/^\w+/g);
				console.log("typeError Value : " + typeError);
				if (typeError != null) 
				{
					if ( typeError[0] == "missing")
						console.log("Missing Error");
						//Check the error message
					else if ( typeError[0] == "invalid")
						console.log("invalid Error");
						//Check the error message
					else if ( typeError[0] == "unknown")
						console.log("Unknown error");
						//Check the error message
					else
					console.log("There is no error type!");
				} 
				else
				console.log("typeError is null");
			}

		} else
			console.log("optionError is null");
	}
};

var testCase = 
{
	name: "test CLI Args Error",
	_should: {
		error: {},
		ignore: {}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() 
	{
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

/* Generated tests for Logic optionError */

//Attention, different scope for() and function()
for (var hl = 0; hl < errorLogicCase.errorLogic.length; hl++)
{
	testCase["testCLIargs_errorOptionLogic_" + errorLogicCase.errorLogic[hl].case + "_" + argformat(errorLogicCase.errorLogic[hl].ae.arg)] = function()
	{
		var phl0 = errorLogicCase.errorLogic[index];
		var phl1 = errorLogicCase.name;
		var phl2 = errorLogicCase.args;
		var phl3 = argformat(errorLogicCase.errorLogic[index].ae.arg);
		var phl4 = errorLogicCase.errorLogic[index].config;

		console.log("Object JSON to check : " + JSON.stringify(phl0));
		console.log("Name testSuite : " + phl1);
		console.log("Name options : " + phl2);
		console.log("Option format : " + phl3);
		console.log("Config used : " + phl4);

		generator(phl0,phl1,phl2,phl3,phl4);
	};
};

//CopyServer into the Workspace before to run tests
//copyServer(localOrNot);

if (!localOrNot) 
	unitTest.run(testCase).getXmlReport(env.WORKSPACE + '/report.xml');
else 
	unitTest.run(testCase).getXmlReport(reportLocalPath + '/report.xml');

	

