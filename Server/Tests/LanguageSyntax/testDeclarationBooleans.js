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
				props : ["name", "type", "line", "kind"],
				list: {
						"test 1: using the true/false syntax" : {
										name: "bool1",
										file: "bothSides/BooleanDefinitions.js",
										line: 5,
										type: "Boolean",
										kind: "Local Variable",
										ignore: false
									  },
						"test 2: using the new syntax" : {
										name: "bool2",
										file: "bothSides/BooleanDefinitions.js",
										line: 6,
										type: "Boolean",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 3: using an existing array": {
										name: "bool3",
										file: "bothSides/BooleanDefinitions.js",
										line: 7,
										type: "Boolean",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 4: using a function returning a boolean": {
										name: "bool4",
										file: "bothSides/BooleanDefinitions.js",
										line: 11,
										type: "Boolean",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 5: using an undefined variable then an existing boolean": {
										name: "bool5",
										file: "bothSides/BooleanDefinitions.js",
										line: 12,
										type: "Boolean",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 6: using the Boolean constructor without new": {
										name: "bool6",
										file: "bothSides/BooleanDefinitions.js",
										line: 14,
										type: "Boolean",
										kind: "Local Variable",
										ignore:  false
									  }
					}
			};

var testCase = {
	name: "Booleans declaration tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);