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
				props: ["name", "type", "line", "kind"],
				list: {
						testString1 : {
										name: "str1",
										file: "bothSides/StringDefinitions.js",
										line: 5,
										type: "String",
										kind: "Local Variable",
										ignore: false
									  },
						testString2 : {
										name: "str2",
										file: "bothSides/StringDefinitions.js",
										line: 6,
										type: "String",
										kind: "Local Variable",
										ignore:  false
									  },
						testString3 : {
										name: "str3",
										file: "bothSides/StringDefinitions.js",
										line: 7,
										type: "String",
										kind: "Local Variable",
										ignore:  false
									  },
						testString4 : {
										name: "str4",
										file: "bothSides/StringDefinitions.js",
										line: 11,
										type: "String",
										kind: "Local Variable",
										ignore:  false
									  },
						testString5 : {
										name: "str5",
										file: "bothSides/StringDefinitions.js",
										line: 12,
										type: "String",
										kind: "Local Variable",
										ignore:  false
									  },
						testString6 : {
										name: "str6",
										file: "bothSides/StringDefinitions.js",
										line: 14,
										type: "String",
										kind: "Local Variable",
										ignore:  false
									  },
						testString7 : {
										name: "str7",
										file: "bothSides/StringDefinitions.js",
										line: 15,
										type: "String",
										kind: "Local Variable",
										ignore:  false
									  },
						testString8 : {
										name: "str8",
										file: "bothSides/StringDefinitions.js",
										line: 16,
										type: "String",
										kind: "Local Variable",
										ignore: false
									  }
						}
			};

var testCase = {
	name: "Strings declaration tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);
require("unitTest").run(testCase).getReport();
