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

function isUppercaseOrLowercase(string) 
{
	var i = 0;
	var symbol = ["/","\\","-","--","---"," ","_","~","\\`","!","@","#","$","%","^","\\&","*","{","}","[","]","\\|",":",";","\\'",'\\"',"\\<","\\>","?",",",".","="];
	//Add test for escaped characters
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

function nativeToPosix(path)
{	
	var newPath; 
	
	newPath = value.replace(/\/+/g,"/");

	return newPath;
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

//OptionHelp

function generateValue(value)
{
var cases = [];
var symbol = ["/","\\","-","--","---"," ","_","~","\\`","!","@","#","$","%","^","\\&","*","{","}","[","]","\\|",":",";","\\'",'\\"',"\\<","\\>","?",",",".","="];
//Character > add files for some tests in the workspace
//Add test for escaped characters
var str;
var str1;
var str2;
var str22;
var str5;
var str6;
var str7;
var str8;
var str9 = "/?";
	for (var s = 0; s < symbol.length;s++)
	{
		var str3 = str4 = symbol[s];
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
			if (value.charAt(s1) != "p")
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
			if (value.charAt(s2) != "p")
				str4 += value.charAt(s2) + " " + symbol[s];
			else
				str4 += value.charAt(s2)
		};
		cases.push(str4.toLowerCase());
		cases.push(str4.toUpperCase());
		str4 = "";
	};
	var casesV = cases.length;
	//Add value for all cases with ":" or "=" as separator or a space or nothing
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
	};
	//Add mulitple value for all cases with ":" or "=" as separator or a space or nothing
	cases.push(str9);
	return cases;
};

function generateJSON()
{
	var jsonResult =
	{
		"args" : "help",
		"name" : "helpTestLogic",
		"helpLogic" :
		[]
	};
	var allCase = generateValue(jsonResult.args);

	for (var jsonI = 0; jsonI < allCase.length;jsonI++)
	{
		if (allCase[jsonI].match(/^./g)[0] == "-" && allCase[jsonI].match(/^../g)[0] != "--" && isUppercaseOrLowercase(allCase[jsonI]) == true || allCase[jsonI] == "--help")
			//test on --help value?
			var linux = mac = true;
		else
			var linux = mac = false;
		if ((allCase[jsonI].match("/help ") != null && allCase[jsonI].match("/help") != null && isUppercaseOrLowercase(allCase[jsonI]) == true) || (allCase[jsonI].match("/h ") != null && allCase[jsonI].match("/h") != null && isUppercaseOrLowercase(allCase[jsonI]) == true) || (allCase[jsonI].match(/^./g)[0] == "-" && allCase[jsonI].match(/^../g)[0] != "--" && isUppercaseOrLowercase(allCase[jsonI]) == true) || allCase[jsonI] == "/help" || allCase[jsonI] == "/?"  || allCase[jsonI] == "--help" || allCase[jsonI] == "/h" || allCase[jsonI] == "--help value")
			var win = true;
		else
			var win = false;
		jsonResult.helpLogic.push(
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


var helpLogicCase = generateJSON();

/*

Configuration [Windows,Linux,Mac] :

[0]
[/help & --help] 																	--help 			--help
[/? & -h]																			-h 				-h
[/h & -help]																		-help 			-help
[/h /e /l /p & -h -e -l -p]															-h -e -l -p  	-h -e -l -p
[/h/e/l/p & -h-e-l-p] 																-h-e-l-p  		-h-e-l-p
[/h/elp & -h-elp] 																	-h-elp  		-h-elp
--h 																				--h 			--h
--h-elp                         													--h-elp         --h-elp
[1]
[/HELP & --HELP] 																	--HELP 			--HELP
[/H & -HELP]																		-HELP 			-HELP
[/H /E /L /P & -H -E -L -P] 														-H -E -L -P  	-H -E -L -P
[/H/E/L/P & -H-E-L-P] 																-H-E-L-P  		-H-E-L-P
[/H/ELP & -H-ELP] 																	-H-ELP  		-H-ELP
--H 																				--H 			--H
--H-ELP                           													--H-ELP         --H-ELP
[2]
[/help value & --help value] 														--help value	--help value
[/? value & -h value]																-h value 		-h value
[/h value & -help value]															-help value 	-help value
[/h value /e value /l value /p value & -h value -e value -l value -p value]			-h value -e value -l value -p value	-h value -e value -l value -p value
[/h/e/l/p value & -h-e-l-p value] 													-h-e-l-p value  -h-e-l-p value
[/h/elp value & -h-elp value] 														-h-elp value  	-h-elp value
--h value                         													--h value       --h value
--h-elp value 																		--h-elp value   --h-elp value
[3]
[/HELP value & --HELP value] 														--HELP value 	--HELP value
[/H value & -HELP value]															-HELP value		-HELP value
[/H value /E value /L value /P value & -H value -E value -L value -P value] 		-H value -E value -L value -P value	-H value -E value -L value -P value
[/H/E/L/P value & -H-E-L-P value] 													-H-E-L-P value  -H-E-L-P value
[/H/ELP value & -H-ELP value] 														-H-ELP value  	-H-ELP value
--H value 																			--H value 		--H value
--H-ELP value 																		--H-ELP value	--H-ELP value
[4]
[/helpvalue & --helpvalue] 															--helpvalue	--helpvalue
[/?value & -hvalue]																	-hvalue 		-hvalue
[/hvalue & -helpvalue]																-helpvalue 	-helpvalue
[/hvalue /evalue /lvalue /pvalue & -hvalue -evalue -lvalue -pvalue]					-hvalue -evalue -lvalue -pvalue	-hvalue -evalue -lvalue -pvalue
[/h/e/l/pvalue & -h-e-l-pvalue] 													-h-e-l-pvalue  -h-e-l-pvalue
[/h/elpvalue & -h-elpvalue] 														-h-elpvalue  	-h-elpvalue
--hvalue                         													--hvalue       --hvalue
--h-elpvalue 																		--h-elpvalue   --h-elpvalue
[5]
[/HELPvalue & --HELPvalue] 															--HELPvalue 	--HELPvalue
[/Hvalue & -HELPvalue]																-HELPvalue		-HELPvalue
[/Hvalue /Evalue /Lvalue /Pvalue & -Hvalue -Evalue -Lvalue -Pvalue] 				-Hvalue -Evalue -Lvalue -Pvalue	-Hvalue -Evalue -Lvalue -Pvalue
[/H/E/L/Pvalue & -H-E-L-Pvalue] 													-H-E-L-Pvalue  -H-E-L-Pvalue
[/H/ELPvalue & -H-ELPvalue] 														-H-ELP value  	-H-ELPvalue
--Hvalue 																			--Hvalue 		--Hvalue
--H-ELPvalue 																		--H-ELPvalue	--H-ELPvalue
[6]
[/help=value & --help=value] 														--help=value	--help=value
[/?=value & -h=value]																-h=value 		-h=value
[/h=value & -help=value]															-help=value 	-help=value
[/h=value /e=value /l=value /p=value & -h=value -e=value -l=value -p=value]			-h=value -e=value -l=value -p=value	-h=value -e=value -l=value -p=value
[/h/e/l/p=value & -h-e-l-p=value] 													-h-e-l-p=value  -h-e-l-p=value
[/h/elp=value & -h-elp=value] 														-h-elp=value  	-h-elp=value
--h=value                         													--h=value       --h=value
--h-elp=value 																		--h-elp=value   --h-elp=value
[7]
[/HELP=value & --HELP=value] 														--HELP=value 	--HELP=value
[/H=value & -HELP=value]															-HELP=value		-HELP=value
[/H=value /E=value /L=value /P=value & -H=value -E=value -L=value -P=value] 		-H=value -E=value -L=value -P=value	-H=value -E=value -L=value -P=value
[/H/E/L/P=value & -H-E-L-P=value] 													-H-E-L-P=value  -H-E-L-P=value
[/H/ELP=value & -H-ELP=value] 														-H-ELP =value  	-H-ELP=value
--H=value 																			--H=value 		--H=value
--H-ELP=value 																		--H-ELP=value	--H-ELP=value
[8]
[/help:value & --help:value] 														--help:value	--help:value
[/?:value & -h:value]																-h:value 		-h:value
[/h:value & -help:value]															-help:value 	-help:value
[/h:value /e:value /l:value /p:value & -h:value -e:value -l:value -p:value]			-h:value -e:value -l:value -p:value	-h:value -e:value -l:value -p:value
[/h/e/l/p:value & -h-e-l-p:value] 													-h-e-l-p:value  -h-e-l-p:value
[/h/elp:value & -h-elp:value] 														-h-elp:value  	-h-elp:value
--h:value                         													--h:value       --h:value
--h-elp:value 																		--h-elp:value   --h-elp:value
[9]
[/HELP:value & --HELP:value] 														--HELP:value 	--HELP:value
[/H:value & -HELP:value]															-HELP:value		-HELP:value
[/H:value /E:value /L:value /P:value & -H:value -E:value -L:value -P:value] 		-H:value -E:value -L:value -P:value	-H:value -E:value -L:value -P:value
[/H/E/L/P:value & -H-E-L-P:value] 													-H-E-L-P:value  -H-E-L-P:value
[/H/ELP:value & -H-ELP:value] 														-H-ELP :value  	-H-ELP:value
--H:value 																			--H:value 		--H:value
--H-ELP:value 																		--H-ELP:value	--H-ELP:value
[10]
--version																			--version		--version
--VERSION 																			--VERSION 		--VERSION
--version value 																	--version value	--version value
--VERSION value 																	--VERSION value --VERSION value
--versionvalue 																		--versionvalue	--versionvalue
--VERSIONvalue 																		--VERSIONvalue --VERSIONvalue
--version=value 																	--version=value	--version=value
--VERSION=value 																	--VERSION=value --VERSION=value
--version:value 																	--version:value	--version:value
--VERSION:value 																	--VERSION:value --VERSION:value
[11]
-version 																			-version 		-version
-VERSION 																			-VERSION 		-VERSION
-version value 																		-version value	-version value
-VERSION value 																		-VERSION value -VERSION value
-versionvalue 																		-versionvalue	-versionvalue
-VERSIONvalue 																		-VERSIONvalue -VERSIONvalue
-version=value 																		-version=value	-version=value
-VERSION=value 																		-VERSION=value -VERSION=value
-version:value 																		-version:value	-version:value
-VERSION:value 																		-VERSION:value -VERSION:value
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

// --***-- Test to check that helpLogic (windows : , Linux/Mac : ) exist
testCLIargs_helpOptionLogicXExist: function()
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
		var optionHelp = SystemWorker.exec(["cmd","/C","{binFile}",caseObject.ae.arg],options);
		console.log("Args to test : " + caseObject.ae.arg);
		console.log("optionHelp value object : "+ JSON.stringify(optionHelp));
		//console.log("Info worker : " + JSON.stringify(optionHelp.getInfos()));
		if (optionHelp != null) {
			if (optionHelp.exitStatus === 0) 
			{
				console.log("optionHelp is : " + optionHelp.output.toString());
				//Asserts
				Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.win),
					optionHelp.exitStatus,
					"Args type : "+ args +", windows : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.win) + ", "+ caseObject.ae.arg + " doesn't work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				Y.Assert.isNotNull(optionHelp);
				Y.Assert.isObject(optionHelp);
				Y.Assert.areSame(0,optionHelp.error.length);
				Y.Assert.isNotNull(optionHelp.output);
				Y.Assert.isString(optionHelp.output.toString().replace(/\r?\n/g, ''));
			} 
			else 
			{
				console.log("optionHelp failed : " + optionHelp.error.toString());
				//Asserts
				Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.win),
					optionHelp.exitStatus,
					"Args type : "+ args +", windows : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.win) + ", "+ caseObject.ae.arg + " work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				Y.Assert.isNotNull(optionHelp);
				Y.Assert.isObject(optionHelp);
				Y.Assert.areSame(0,optionHelp.output.length);
				Y.Assert.isNotNull(optionHelp.error);
				Y.Assert.isString(optionHelp.error.toString().replace(/\r?\n/g, ''));
				var typeError = optionHelp.error.toString().replace(/\r?\n/g, '').match(/^\w+/g);
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
			console.log("optionHelp is null");
	}
	else
	{
		//Linux & MacOS execution tests
		//Cases DOS and UNIX format
		var cmd = '"' + newServerBin.path + '"' + " " + '"' + caseObject.ae.arg + '"';
		console.log("Command SW: " + cmd);
		var optionHelp = SystemWorker.exec(["sh","-c", cmd], null);
		console.log("Args to test : " + caseObject.ae.arg);
		console.log("optionHelp value object : " + JSON.stringify(optionHelp) +"");
		//console.log("Info worker : " + JSON.stringify(optionHelp.getInfos()));
		if (optionHelp != null) 
		{
			if (optionHelp.exitStatus === 0) 
			{
				console.log("optionHelp is : " + optionHelp.output.toString());
				//Asserts
				if (os.isLinux)
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.linux),
						optionHelp.exitStatus,
						"Args type : "+ args +", Linux : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.linux) + ", "+ caseObject.ae.arg + " doesn't work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				else
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.mac),
						optionHelp.exitStatus,
						"Args type : "+ args +", Mac : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.mac) + ", "+ caseObject.ae.arg + " doesn't work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				Y.Assert.isNotNull(optionHelp);
				Y.Assert.isObject(optionHelp);
				Y.Assert.areSame(0,optionHelp.error.length);
				Y.Assert.isNotNull(optionHelp.output);
				Y.Assert.isString(optionHelp.output.toString().replace(/\r?\n/g, ''));
			} 
			else 
			{
				console.log("optionHelp failed : " + optionHelp.error.toString());
				//Asserts
				if (os.isLinux)
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.linux),
						optionHelp.exitStatus,
						"Args type : "+ args +", Linux : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.linux) + ", "+ caseObject.ae.arg + " work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				else
					Y.Assert.areSame(statusCodeOS(caseObject.ae.expected.mac),
						optionHelp.exitStatus,
						"Args type : "+ args +", Mac : "+ caseObject.ae.arg +", format : "+ format +" : Error code value is different than "+ statusCodeOS(caseObject.ae.expected.mac) + ", "+ caseObject.ae.arg + " work or exist. The code returned is : "+ optionHelp.exitStatus +".");
				Y.Assert.isNotNull(optionHelp);
				Y.Assert.isObject(optionHelp);
				Y.Assert.areSame(0,optionHelp.output.length);
				Y.Assert.isNotNull(optionHelp.error);
				Y.Assert.isString(optionHelp.error.toString().replace(/\r?\n/g, ''));
				var typeError = optionHelp.error.toString().replace(/\r?\n/g, '').match(/^\w+/g);
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
			console.log("optionHelp is null");
	}
};

var testCase = 
{
	name: "test CLI args Help",
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

	// --**-- Test to check the defails information returned by option help
	testCLIargs_helpOptionFunctional0: function() {
	var mainInformation;
	var result = [];
	var matched = [];
	var options = { parameters : { binFile : newServerBin }, quote : '"' };
	// Static Value must be updated
	if (os.isLinux) 
	{
		mainInformation =
		[
			"-s",
			"--solution=VALUE",
			"-d",
			"--daemon",
			"--admin-password=VALUE",
			"--admin-port=VALUE",
			"--admin-ssl-port=VALUE",
			"--admin-publish=VALUE",
			"--no-discovery",
			"-g",
			"--debugger=VALUE",
			"--debug-off",
			"--job-id=VALUE",
			"--system-workers=VALUE",
			"--syslog",
			"--verbose",
			"--version",
			"-h",
			"--help"
		];
	} 
	else if (os.isWindows) 
	{
		mainInformation =
		[
			"/s",
			"/solution:VALUE",
			"/admin-password:VALUE",
			"/admin-port:VALUE",
			"/admin-ssl-port:VALUE",
			"/admin-publish:VALUE",
			"/no-discovery",
			"/g",
			"/debugger:VALUE",
			"/debug-off",
			"/job-id:VALUE",
			"/system-workers:VALUE",
			"/verbose",
			"/version",
			"/help",
			"/?"
		];
	} 
	else 
	{
		mainInformation =
		[
			"-s",
			"--solution=VALUE",
			"--admin-password=VALUE",
			"--admin-port=VALUE",
			"--admin-ssl-port=VALUE",
			"--admin-publish=VALUE",
			"--no-discovery",
			"-g",
			"--debugger=VALUE",
			"--debug-off",
			"--job-id=VALUE",
			"--system-workers=VALUE",
			"--syslog",
			"--verbose",
			"--version",
			"-h",
			"--help"
		];
	}
	if (os.isWindows) 
	{
		var optionHelp = SystemWorker.exec(["cmd","/C","{binFile}","/h"],options);
		if (optionHelp != null || optionHelp.output.toString() != "" || optionHelp.output.length == 0)
			console.log("optionHelp is : " + optionHelp.output.toString());
		else
			console.log("optionHelp failed : " + optionHelp.error.toString());
	} 
	else 
	{
		var optionHelp = SystemWorker.exec(["sh","-c",'"' + newServerBin.path + '"' + " " + "-help"],null);
		if (optionHelp != null || optionHelp.output.toString() != "" || optionHelp.output.length == 0)
			console.log("optionHelp is : " + optionHelp.output.toString());
		else
			console.log("optionHelp failed : " + optionHelp.error.toString());
	}
	var stdout = optionHelp.output.toString().replace(/\r?\n/g, '');
	console.log("stdout Value : " + stdout);
	if (os.isLinux) 
	{
		for (var i = 0; i < mainInformation.length; i++) 
		{
			if (stdout != (null || "")) {
				matched = stdout.match(mainInformation[i]);
				console.log("Matched Value :" + mainInformation[i] + matched.length + matched.toString());
			}
			if (matched != null || matched[0] != "" || matched[0] != undefined)
			result.push(matched);
		};
	} 
	else 
	{
		for (var i = 0; i < mainInformation.length; i++) 
		{
			if (stdout != (null || "")) {
				matched = stdout.match(mainInformation[i]);
				console.log("Matched Value :" + mainInformation[i] + matched.length + matched.toString());
			}
			if (matched != null) {
				if (matched[0] != "" || matched[0] != undefined)
				result.push(matched);
			}
		};
	}
	Y.Assert.areSame(mainInformation.length,result.length,"Information returned by help option isn't the same :" + result.toString());
	},
	// --***-- Test to check the global information returned by option help
	testCLIargs_helpOptionFunctional1: function() 
	{
		var mainInformation;
		var options = { parameters : { binFile : newServerBin }, quote : '"' };
		if (os.isLinux)
			mainInformation = "Usage: " + newServerBin.path + " [OPTION]... [FILE]...http://www.wakanda.org  -s, --solution=VALUE       Solution or JS file  -d, --daemon               Go daemon and run in the backgroundAdministration options      --admin-password=VALUE Administrator login password (default: <empty>)      --admin-port=VALUE     Force the Administration panel port number      --admin-ssl-port=VALUE Force Administration panel ssl port number      --admin-publish=VALUE  Force Administration panel publishing mode                              'https': accept only HTTPS connections                              'http':  accept only HTTP connections                              'both':  accept both HTTPS and HTTP connections                              'both-but-http-local-only':  accept HTTPS                             connections and HTTP connections only from                             localhostService discovery options      --no-discovery         Do not start Bonjour servicesDebugger settings  -g, --debugger=VALUE       Debugger to launch at startup (ignored if                             --debug-off is specified) [remote: activate the                             remote web debugger, wakanda: Wakanda Debugger,                             none: disabled] (default: none)      --debug-off            Disable the Debugger features.The debugging                             interface will not be launched on the server                             side, which can be useful when the solution is                             used in a production environmentJobs      --job-id=VALUE         Specify the server job idSystem workers      --system-workers=VALUE Configuration file for system workersLogging facility      --syslog               Forward Wakanda Server's log messages to the                             Syslog daemon      --verbose              Verbose modeHelp:      --version              Display the version and exit  -h, --help                 Display the help and exit";
		else if (os.isMac) 
			mainInformation = "Usage: " + newServerBin.path + " [OPTION]... [FILE]...http://www.wakanda.org  -s, --solution=VALUE       Solution or JS fileAdministration options      --admin-password=VALUE Administrator login password (default: <empty>)      --admin-port=VALUE     Force the Administration panel port number      --admin-ssl-port=VALUE Force Administration panel ssl port number      --admin-publish=VALUE  Force Administration panel publishing mode                              'https': accept only HTTPS connections                              'http':  accept only HTTP connections                              'both':  accept both HTTPS and HTTP connections                              'both-but-http-local-only':  accept HTTPS                             connections and HTTP connections only from                             localhostService discovery options      --no-discovery         Do not start Bonjour servicesDebugger settings  -g, --debugger=VALUE       Debugger to launch at startup (ignored if                             --debug-off is specified) [remote: activate the                             remote web debugger, wakanda: Wakanda Debugger,                             none: disabled] (default: none)      --debug-off            Disable the Debugger features.The debugging                             interface will not be launched on the server                             side, which can be useful when the solution is                             used in a production environmentJobs      --job-id=VALUE         Specify the server job idSystem workers      --system-workers=VALUE Configuration file for system workersLogging facility      --syslog               Forward Wakanda Server's log messages to the                             Syslog daemon      --verbose              Verbose modeHelp:      --version              Display the version and exit  -h, --help                 Display the help and exit";
		else
			mainInformation = "Usage: " + nativeToPosix(newServerBin.path) + " [OPTION]... [FILE]...http://www.wakanda.org  /s, /solution:VALUE        Solution or JS fileAdministration options:      /admin-password:VALUE  Administrator login password (default: <empty>)      /admin-port:VALUE      Force the Administration panel port number      /admin-ssl-port:VALUE  Force Administration panel ssl port number      /admin-publish:VALUE   Force Administration panel publishing mode                              'https': accept only HTTPS connections                              'http':  accept only HTTP connections                              'both':  accept both HTTPS and HTTP connections                              'both-but-http-local-only':  accept HTTPS                             connections and HTTP connections only from localhostService discovery options:      /no-discovery          Do not start Bonjour servicesDebugger settings:  /g, /debugger:VALUE        Debugger to launch at startup (ignored if                             --debug-off is specified) [remote: activate the                             remote web debugger, wakanda: Wakanda Debugger,                             none: disabled] (default: none)      /debug-off             Disable the Debugger features.The debugging                             interface will not be launched on the server                             side, which can be useful when the solution is                             used in a production environmentJobs:      /job-id:VALUE          Specify the server job idSystem workers:      /system-workers:VALUE  Configuration file for system workersLogging facility:      /verbose               Verbose modeHelp:      /version               Display the version and exit  /?, /h, /help              Display the help and exit"; 
		if (os.isWindows) 
		{
			var optionHelp = SystemWorker.exec(["cmd","/C","{binFile}","/h"],options);
			if (optionHelp != null || optionHelp.output.toString() != "" || optionHelp.output.length == 0)
				console.log("optionHelp is : " + optionHelp.output.toString());
			else
				console.log("optionHelp failed : " + optionHelp.error.toString());
		} 
		else 
		{
			var optionHelp = SystemWorker.exec(["sh","-c",'"' + newServerBin.path + '"' + " " + "-help"],null);
			if (optionHelp != null || optionHelp.output.toString() != "" || optionHelp.output.length == 0)
				console.log("optionHelp is : " + optionHelp.output.toString());
			else
				console.log("optionHelp failed : " + optionHelp.error.toString());
		}
		var stdout = optionHelp.output.toString().replace(/\r?\n/g, '');
		console.log("stdout Value : " + stdout);
		Y.Assert.areSame(mainInformation,stdout,"Information returned by help option isn't the same :" + stdout);
	}
};

/* Generated tests for Logic optionHelp */

//Attention, different scope for() and function()
for (var hl = 0; hl < helpLogicCase.helpLogic.length; hl++)
{
	testCase["testCLIargs_helpOptionLogic_" + helpLogicCase.helpLogic[hl].case + "_" + argformat(helpLogicCase.helpLogic[hl].ae.arg)] = function()
	{
		var phl0 = helpLogicCase.helpLogic[index];
		var phl1 = helpLogicCase.name;
		var phl2 = helpLogicCase.args;
		var phl3 = argformat(helpLogicCase.helpLogic[index].ae.arg);
		var phl4 = helpLogicCase.helpLogic[index].config;

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
