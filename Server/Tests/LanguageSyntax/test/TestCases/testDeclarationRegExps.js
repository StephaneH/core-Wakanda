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
						testRegExp1 : {
										name: "regexp1",
										file: "bothSides/RegExpDefinitions.js",
										line: 5,
										type: "RegExp",
										kind: "Local Variable",
										ignore: false
									  },
						testRegExp2 : {
										name: "regexp2",
										file: "bothSides/RegExpDefinitions.js",
										line: 6,
										type: "RegExp",
										kind: "Local Variable",
										ignore:  false
									  },
						testRegExp3 : {
										name: "regexp3",
										file: "bothSides/RegExpDefinitions.js",
										line: 7,
										type: "RegExp",
										kind: "Local Variable",
										ignore:  false
									  },
						testRegExp4 : {
										name: "regexp4",
										file: "bothSides/RegExpDefinitions.js",
										line: 11,
										type: "RegExp",
										kind: "Local Variable",
										ignore:  false
									  },
						testRegExp5 : {
										name: "regexp5",
										file: "bothSides/RegExpDefinitions.js",
										line: 12,
										type: "RegExp",
										kind: "Local Variable",
										ignore:  false
									  },
						testRegExp6 : {
										name: "regexp6",
										file: "bothSides/RegExpDefinitions.js",
										line: 14,
										type: "RegExp",
										kind: "Local Variable",
										ignore:  false
									  }
					}
			};

var testCase = {
	name: "RegExps declaration tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);
require("unitTest").run(testCase).getReport();