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
				type: "Declaration",
				props : ["name", "signature", "line", "kind"],
				list: {
						testFunction1 : {
										name: "f1",
										file: "bothSides/FunctionDefinitions.js",
										line: 5,
										signature: "f1 : void",
										kind: "Function",
										ignore: false
									  },
						testFunction2 : {
										name: "f2",
										file: "bothSides/FunctionDefinitions.js",
										line: 7,
										signature: "f2 (a) : void",
										kind: "Function",
										ignore: false
									  },
						
						testFunction3 : {
										name: "f3",
										file: "bothSides/FunctionDefinitions.js",
										line: 9,
										signature: "f3 (a, b, c) : void",
										kind: "Function",
										ignore: false
									  },
						testFunction4 : {
										name: "f4",
										file: "bothSides/FunctionDefinitions.js",
										line: 11,
										signature: "f4 : String",
										kind: "Function",
										ignore: false
									  },
						testFunction5 : {
										name: "f5",
										file: "bothSides/FunctionDefinitions.js",
										line: 13,
										signature: "f5 : String | Number",
										kind: "Function",
										ignore: false
									  },
						testFunction6 : {
										name: "f6",
										file: "bothSides/FunctionDefinitions.js",
										line: 17,
										signature: "f6 : String",
										kind: "Function",
										ignore: false
									  },
						testFunction7 : {
										name: "f7",
										file: "bothSides/FunctionDefinitions.js",
										line: 22,
										signature: "f7 : String | Number",
										kind: "Function",
										ignore: false
									  },
						testFunction8 : {
										name: "f8",
										file: "bothSides/FunctionDefinitions.js",
										line: 27,
										signature: "f8 : String | Number",
										kind: "Function",
										ignore: false
									  },
						testFunction9 : {
										name: "f9",
										file: "bothSides/FunctionDefinitions.js",
										line: 32,
										signature: "f9 : String | Number | Boolean",
										kind: "Function",
										ignore: false
									  },
						testFunction10 : {
										name: "f10",
										file: "bothSides/FunctionDefinitions.js",
										line: 37,
										signature: "f10 (a) : String",
										kind: "Function",
										ignore: false
									  },
						testFunction11 : {
										name: "f11",
										file: "bothSides/FunctionDefinitions.js",
										kind: "Function",
										line: 42,
										signature: "f11 (a) : String | Number",
										kind: "Function",
										ignore: false
									  },
						testFunction12 : {
										name: "f12",
										file: "bothSides/FunctionDefinitions.js",
										line: 47,
										signature: "f12 (a) : String | Number | Boolean",
										kind: "Function",
										ignore: false
									  },
						testFunction13 : {
										name: "f13",
										file: "bothSides/FunctionDefinitions.js",
										line: 52,
										signature: "f13 : void",
										kind: "Function",
										ignore: false
									  },
						testFunction14 : {
										name: "f14",
										file: "bothSides/FunctionDefinitions.js",
										kind: "Function",
										line: 61,
										signature: "f14 : KnownObject",
										kind: "Function",
										ignore: false
									  },
						testFunction15 : {
										name: "f15",
										file: "bothSides/FunctionDefinitions.js",
										line: 63,
										signature: "f15 : void",
										kind: "Function",
										ignore: false
									  },
						testFunction16 : {
										name: "f16",
										file: "bothSides/FunctionDefinitions.js",
										line: 68,
										signature: "f16 (a, b, c) : KnownObject | String",
										kind: "Function",
										ignore: false
									},
						testFunction17 : {
										name: "f17",
										file: "bothSides/FunctionDefinitions.js",
										line: 70,
										signature: "f17 (a, b, c) : String",
										kind: "Function",
										ignore: false
									},
						testFunction18 : {
										name: "f18",
										file: "bothSides/FunctionDefinitions.js",
										line: 72,
										signature: "f18 (a, b, c) : String",
										kind: "Function",
										ignore: false
									},
						testFunction19 : {
										name: "f19",
										file: "bothSides/FunctionDefinitions.js",
										line: 74,
										signature: "f19 (a, b, c) : String",
										kind: "Function",
										ignore: false
									},
						testFunction20 : {
										name: "f20",
										file: "bothSides/FunctionDefinitions.js",
										line: 79,
										signature: "f20 : String",
										kind: "Function",
										ignore: false
									}
					}
			};

var testCase = {
	name: "Funtions declaration tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);
require("unitTest").run(testCase).getReport();