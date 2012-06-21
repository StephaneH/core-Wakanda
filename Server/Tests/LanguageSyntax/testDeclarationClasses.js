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
						"test 1: Class declaration using an uppercase first letter in function name" : {
										name: "MySimpleClass1",
										file: "bothSides/ClassDefinitions.js",
										line: 1,
										type: "",
										kind: "Class",
										ignore: false
									  },
						"test 2: Class declaration using a @class JSDoc tag" : {
										name: "mySimpleClass2",
										file: "bothSides/ClassDefinitions.js",
										line: 6,
										type: "",
										kind: "Class",
										ignore: false
									  },
						
						"test 3: Complete Class declaration" : {
										name: "MyCompleteClass",
										file: "bothSides/ClassDefinitions.js",
										line: 8,
										type: "",
										kind: "Class",
										ignore: false
									  },
					
						"test 4: Class declaration and simple inheritance using JSDoc" : {
										name: "vInstance5",
										file: "bothSides/ClassDefinitions.js",
										line: 51,
										type: "MyClass1 | MyMotherClass1",
										kind: "Local Variable",
										ignore: false
									  },
						
						"test 5: Class declaration and ascending inheritance using JSDoc" : {
										name: "vInstance6",
										file: "bothSides/ClassDefinitions.js",
										line: 77,
										type: "MyClass2 | MyMotherClass2 | MyMotherClass1",
										kind: "Local Variable",
										ignore: false
									  },
									  
						"test 6: Class declaration and multiple inheritance using JSDoc" : {
										name: "vInstance7",
										file: "bothSides/ClassDefinitions.js",
										line: 100,
										type: "MyClass3 | MyMotherClass1 | MyMotherClass3",
										kind: "Local Variable",
										ignore: false
									  },
					
						"test 7: Class instantiation using a local variable" : {
										name: "vInstance1",
										file: "bothSides/ClassDefinitions.js",
										line: 21,
										type: "MyCompleteClass",
										kind: "Local Variable",
										ignore: false
									  },
									  
						"test 8: Class instantiation using instance copy" : {
										name: "vInstance2",
										file: "bothSides/ClassDefinitions.js",
										line: 22,
										type: "MyCompleteClass",
										kind: "Local Variable",
										ignore: false
									  },
									  
						"test 9: Class instantiation using a global variable" : {
										name: "vInstance3",
										file: "bothSides/ClassDefinitions.js",
										line: 23,
										type: "MyCompleteClass",
										kind: "Local Variable",
										ignore: false
									  },
									  
						"test 10: declaration using a function returning a Class instance" : {
										name: "vInstance4",
										file: "bothSides/ClassDefinitions.js",
										line: 29,
										type: "MyCompleteClass",
										kind: "Local Variable",
										ignore: false
									  },
						
					}		  
			};

var testCase = {
	name: "Classes declaration tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);
