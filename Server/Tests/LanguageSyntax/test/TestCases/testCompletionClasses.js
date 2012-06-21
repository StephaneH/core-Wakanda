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
	include("Utils/utils.js");

	var tests = {
					type: "Completion",
					list: {
							"test 1 : Static completion on an empty class (text)" :{
										mode: 		"text",
										source:		"MySimpleClass1.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "prototype",
													  "apply",
													  "call",
													  "constructor",
													  "length",
													  "toString",
													  "hasOwnProperty",
													  "isPrototypeOf",
													  "propertyIsEnumerable",
													  "toLocaleString",
													  "valueOf"
													]
									},
							"test 2 : Static completion on an empty class (display text)" :{
										mode: 		"displayText",
										source:		"MySimpleClass1.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[ 
													  "prototype : Object||MySimpleClass1",
													  "apply (thisArg, argArray) : Object||Function",
													  "call (thisArg, argN) : Object||Function",
													  "constructor||Function",
													  "length||Function",
													  "prototype||Function",
													  "toString : String||Function",
													  "constructor||Object",
													  "hasOwnProperty (propertyName) : void||Object",
													  "isPrototypeOf (object) : void||Object",
													  "propertyIsEnumerable (prop) : Boolean||Object",
													  "toLocaleString : String||Object",
													  "toString : String||Object",
													  "valueOf : String||Object"
													  ]
									},
							"test 3 : Completion on an empty class instance (text)" :{
										mode: 		"text",
										source:		"vInstance0.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "constructor",
													  "hasOwnProperty",
													  "isPrototypeOf",
													  "propertyIsEnumerable",
													  "toLocaleString",
													  "toString",
													  "valueOf"
													]
									},
							"test 4 : Completion on an empty class instance (display text)" :{
										mode: 		"displayText",
										source:		"vInstance0.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "constructor||Object",
													  "hasOwnProperty (propertyName) : void||Object",
													  "isPrototypeOf (object) : void||Object",
													  "propertyIsEnumerable (prop) : Boolean||Object",
													  "toLocaleString : String||Object",
													  "toString : String||Object",
													  "valueOf : String||Object",
													]
									},
							"test 5 : Static completion on an complete Class (text)" :{
										mode: 		"text",
										source:		"MyCompleteClass.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "prototype",
													  "staticMethod",
													  "staticProperty",
													  "apply",
													  "call",
													  "constructor",
													  "length",
													  "toString",
													  "hasOwnProperty",
													  "isPrototypeOf",
													  "propertyIsEnumerable",
													  "toLocaleString",
													  "valueOf"
													]
									},
							"test 6 : Static completion on an complete Class (display text)" :{
										mode: 		"displayText",
										source:		"MyCompleteClass.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[ 
													  "prototype : Object||MyCompleteClass",
													  "staticMethod : String||MyCompleteClass",
													  "staticProperty : String||MyCompleteClass",
													  "apply (thisArg, argArray) : Object||Function",
													  "call (thisArg, argN) : Object||Function",
													  "constructor||Function",
													  "length||Function",
													  "prototype||Function",
													  "toString : String||Function",
													  "constructor||Object",
													  "hasOwnProperty (propertyName) : void||Object",
													  "isPrototypeOf (object) : void||Object",
													  "propertyIsEnumerable (prop) : Boolean||Object",
													  "toLocaleString : String||Object",
													  "toString : String||Object",
													  "valueOf : String||Object"
													  ]
									},
							"test 7 : Completion on a complete class instance (text)" :{
										mode: 		"text",
										source:		"vInstance1.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "privilegedMethod",
													  "publicMethod",
													  "publicProperty",
													  "publicProperty2",
													  "constructor",
													  "hasOwnProperty",
													  "isPrototypeOf",
													  "propertyIsEnumerable",
													  "toLocaleString",
													  "toString",
													  "valueOf"
													]
									},
							"test 8 : Completion on an complete class instance (display text)" :{
										mode: 		"displayText",
										source:		"vInstance1.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
										              "privilegedMethod : String||MyCompleteClass",
													  "publicMethod : String||MyCompleteClass",
													  "publicProperty : String||MyCompleteClass",
													  "publicProperty2 : String||MyCompleteClass",
													  "constructor||Object",
													  "hasOwnProperty (propertyName) : void||Object",
													  "isPrototypeOf (object) : void||Object",
													  "propertyIsEnumerable (prop) : Boolean||Object",
													  "toLocaleString : String||Object",
													  "toString : String||Object",
													  "valueOf : String||Object",
													]
									},
							"test 9 : Completion on a child class instance - Simple inheritance (text)" :{
										mode: 		"text",
										source:		"vInstance5.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "m1",
													  "p1",
													  "mcm1",
													  "mcp1",
													  "constructor",
													  "hasOwnProperty",
													  "isPrototypeOf",
													  "propertyIsEnumerable",
													  "toLocaleString",
													  "toString",
													  "valueOf"
													]
									},
							"test 10 : Completion on a child class instance - Simple inheritance (display text)" :{
										mode: 		"displayText",
										source:		"vInstance5.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "m1 : void||MyClass1",
													  "p1 : Boolean||MyClass1",
													  "mcm1 : void||MyMotherClass1",
													  "mcp1 : Boolean||MyMotherClass1",
													  "constructor||Object",
													  "hasOwnProperty (propertyName) : void||Object",
													  "isPrototypeOf (object) : void||Object",
													  "propertyIsEnumerable (prop) : Boolean||Object",
													  "toLocaleString : String||Object",
													  "toString : String||Object",
													  "valueOf : String||Object",
													]
									},
							"test 11 : Completion on a child class instance - Ascending inheritance (text)" :{
										mode: 		"text",
										source:		"vInstance6.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "m2",
													  "p2",
													  "mcm1",
													  "mcp1",
													  "mcm2",
													  "mcp2",
													  "constructor",
													  "hasOwnProperty",
													  "isPrototypeOf",
													  "propertyIsEnumerable",
													  "toLocaleString",
													  "toString",
													  "valueOf"
													]
									},
							"test 12 : Completion on a child class instance - Ascending inheritance (display text)" :{
										mode: 		"displayText",
										source:		"vInstance6.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "m2 : void||MyClass2",
													  "p2 : Boolean||MyClass2",
													  "mcm1 : void||MyMotherClass1",
													  "mcp1 : Boolean||MyMotherClass1",
													  "mcm2 : void||MyMotherClass2",
													  "mcp2 : Boolean||MyMotherClass2",
													  "constructor||Object",
													  "hasOwnProperty (propertyName) : void||Object",
													  "isPrototypeOf (object) : void||Object",
													  "propertyIsEnumerable (prop) : Boolean||Object",
													  "toLocaleString : String||Object",
													  "toString : String||Object",
													  "valueOf : String||Object",
													]
									},
							
							"test 13 : Completion on a child class instance - Multiple inheritance (text)" :{
										mode: 		"text",
										source:		"vInstance7.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "m3",
													  "p3",
													  "mcm1",
													  "mcp1",
													  "mcm3",
													  "mcp3",
													  "constructor",
													  "hasOwnProperty",
													  "isPrototypeOf",
													  "propertyIsEnumerable",
													  "toLocaleString",
													  "toString",
													  "valueOf"
													]
									},
							"test 14 : Completion on a child class instance - Ascending inheritance (display text)" :{
										mode: 		"displayText",
										source:		"vInstance7.",
										file:   	"TestFiles/test_01.js",
										line:		7,
										results : 	[
													  "m3 : void||MyClass3",
													  "p3 : Boolean||MyClass3",
													  "mcm1 : void||MyMotherClass1",
													  "mcp1 : Boolean||MyMotherClass1",
													  "mcm3 : void||MyMotherClass3",
													  "mcp3 : Boolean||MyMotherClass3",
													  "constructor||Object",
													  "hasOwnProperty (propertyName) : void||Object",
													  "isPrototypeOf (object) : void||Object",
													  "propertyIsEnumerable (prop) : Boolean||Object",
													  "toLocaleString : String||Object",
													  "toString : String||Object",
													  "valueOf : String||Object",
													]
									},
							}
				};	

	var testCase = {
		name: "Classes completion tests",
		_should: {
			ignore: {
			}
		}
	};

	generateTestCases(tests, testCase);
	require("unitTest").run(testCase).getReport();
