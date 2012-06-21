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
						"test 1 : Completion on an object property on an empty line (see WAK0074773)" :{
									mode: 		"text",
									source:		"prop1: o1.",
									file:   	"TestFiles/test_01.js",
									line:		7,
									results : 	[ "m1","p1","p3","p4","constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf" ]
							 	}
						}
			};	

var testCase = {
	name: "Objects completion tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);
require("unitTest").run(testCase).getReport();
