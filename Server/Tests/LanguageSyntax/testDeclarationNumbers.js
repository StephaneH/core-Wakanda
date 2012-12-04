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
						testNumber1 : {
										name: "nbr1",
										file: "bothSides/NumberDefinitions.js",
										line: 1,
										type: "Number",
										kind: "Local Variable",
										ignore: false
									  },
						testNumber2 : {
										name: "nbr2",
										file: "bothSides/NumberDefinitions.js",
										line: 2,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber3 : {
										name: "nbr3",
										file: "bothSides/NumberDefinitions.js",
										line: 3,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber4 : {
										name: "nbr4",
										file: "bothSides/NumberDefinitions.js",
										line:7,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber5 : {
										name: "nbr5",
										file: "bothSides/NumberDefinitions.js",
										line: 8,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber6 : {
										name: "nbr6",
										file: "bothSides/NumberDefinitions.js",
										line: 10,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber7 : {
										name: "nbr7",
										file: "bothSides/NumberDefinitions.js",
										line: 11,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber8 : {
										name: "nbr8",
										file: "bothSides/NumberDefinitions.js",
										line: 12,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber9 : {
										name: "nbr9",
										file: "bothSides/NumberDefinitions.js",
										line: 13,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber10 : {
										name: "nbr10",
										file: "bothSides/NumberDefinitions.js",
										line: 14,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber11 : {
										name: "nbr11",
										file: "bothSides/NumberDefinitions.js",
										line: 15,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber12 : {
										name: "nbr12",
										file: "bothSides/NumberDefinitions.js",
										line: 16,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber13 : {
										name: "nbr13",
										file: "bothSides/NumberDefinitions.js",
										line: 17,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber14 : {
										name: "nbr14",
										file: "bothSides/NumberDefinitions.js",
										line: 18,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber15 : {
										name: "nbr15",
										file: "bothSides/NumberDefinitions.js",
										line: 19,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber16 : {
										name: "nbr16",
										file: "bothSides/NumberDefinitions.js",
										line: 20,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber17 : {
										name: "nbr17",
										file: "bothSides/NumberDefinitions.js",
										line: 21,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber18 : {
										name: "nbr18",
										file: "bothSides/NumberDefinitions.js",
										line: 22,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber19 : {
										name: "nbr19",
										file: "bothSides/NumberDefinitions.js",
										line: 23,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber20 : {
										name: "nbr20",
										file: "bothSides/NumberDefinitions.js",
										line: 24,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber21 : {
										name: "nbr21",
										file: "bothSides/NumberDefinitions.js",
										line: 25,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  },
						testNumber22 : {
										name: "nbr22",
										file: "bothSides/NumberDefinitions.js",
										line: 26,
										type: "Number",
										kind: "Local Variable",
										ignore:  false
									  }
					}
				
			};

var testCase = {
	name: "Numbers declaration tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);
