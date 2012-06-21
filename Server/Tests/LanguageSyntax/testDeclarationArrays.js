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
						"test 1: using the [] notation" : {
										name: "arr1",
										file: "bothSides/ArrayDefinitions.js",
										line: 5,
										type: "Array",
										kind: "Local Variable",
										ignore: false
									  },
						"test 2: using the Array() with new": {
										name: "arr2",
										file: "bothSides/ArrayDefinitions.js",
										line: 6,
										type: "Array",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 3: using an existing array": {
										name: "arr3",
										file: "bothSides/ArrayDefinitions.js",
										line: 7,
										type: "Array",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 4: using a function returning an array": {
										name: "arr4",
										file: "bothSides/ArrayDefinitions.js",
										line: 11,
										type: "Array",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 5: using an undefined variable then an existing array": {
										name: "arr5",
										file: "bothSides/ArrayDefinitions.js",
										line: 12,
										type: "Array",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 6: using the array constructor without new": {
										name: "arr6",
										file: "bothSides/ArrayDefinitions.js",
										line: 14,
										type: "Array",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 7: using the [] notation with undefined elements": {
										name: "arr7",
										file: "bothSides/ArrayDefinitions.js",
										line: 15,
										type: "Array",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 8: using the [] notation without element": {
										name: "arr8",
										file: "bothSides/ArrayDefinitions.js",
										line: 16,
										type: "Array",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 9: using the [] notation with defined ans undefined elements": {
										name: "arr9",
										file: "bothSides/ArrayDefinitions.js",
										line: 17,
										type: "Array",
										kind: "Local Variable",
										ignore:  false
									  },
						"test 10: using the [] notation at the end of a multiple variables declaration line": {
										name: "arr10",
										file: "bothSides/ArrayDefinitions.js",
										line: 18,
										type: "Array",
										kind: "Local Variable",
										ignore:  false
									  }
					}		  
			};

var testCase = {
	name: "Arrays declaration tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);
