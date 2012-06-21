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
				props : ["name", "kind", "line"],
				list: {
						testVariable1 : {
										name: "v1",
										file: "bothSides/VariablesDefinitions.js",
										line: 1,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable2 : {
										name: "v2",
										file: "bothSides/VariablesDefinitions.js",
										line: 2,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable3 : {
										name: "v3",
										file: "bothSides/VariablesDefinitions.js",
										line: 3,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable4 : {
										name: "v4",
										file: "bothSides/VariablesDefinitions.js",
										line: 4,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable5 : {
										name: "_v5",
										file: "bothSides/VariablesDefinitions.js",
										line: 5,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable6 : {
										name: "v6",
										file: "bothSides/VariablesDefinitions.js",
										line: 6,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable7 : {
										name: "v7",
										file: "bothSides/VariablesDefinitions.js",
										line: 6,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable8 : {
										name: "v8",
										file: "bothSides/VariablesDefinitions.js",
										line: 7,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable9 : {
										name: "v9",
										file: "bothSides/VariablesDefinitions.js",
										line: 7,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable10 : {
										name: "v10",
										file: "bothSides/VariablesDefinitions.js",
										line: 8,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable11 : {
										name: "v11",
										file: "bothSides/VariablesDefinitions.js",
										line: 9,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable12 : {
										name: "v12",
										file: "bothSides/VariablesDefinitions.js",
										line: 10,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable13 : {
										name: "v13",
										file: "bothSides/VariablesDefinitions.js",
										line: 11,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable14 : {
										name: "v14",
										file: "bothSides/VariablesDefinitions.js",
										line: 11,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable15 : {
										name: "v15",
										file: "bothSides/VariablesDefinitions.js",
										line: 11,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable16 : {
										name: "v16",
										file: "bothSides/VariablesDefinitions.js",
										line: 12,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable17 : {
										name: "v17",
										file: "bothSides/VariablesDefinitions.js",
										line: 12,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable18 : {
										name: "v18",
										file: "bothSides/VariablesDefinitions.js",
										line: 13,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable19 : {
										name: "v19",
										file: "bothSides/VariablesDefinitions.js",
										line: 14,
										kind: "Local Variable",
										ignore: false
									  },
						testVariable20 : {
										name: "v20",
										file: "bothSides/VariablesDefinitions.js",
										line: 15,
										kind: "Local Variable",
										ignore: false
									  }
					}
			};

var testCase = {
	name: "Variable declaration tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);