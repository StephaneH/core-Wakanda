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
						"test 1: verify DataClass1" : {
										name: "DataClass1",
										file: "serverSide/010_test.waModel",
										line: 0,
										type: "",
										kind: "Class",
										ignore: false
									  },
						"test 2: verify DataClass1 Entity instance declaration using ds.DataClass1.createNewEntity()" : {
										name: "ds1",
										file: "serverSide/020_EntityModelDefinitions.js",
										line: 1,
										type: "DataClass1 | Entity",
										kind: "Local Variable",
										ignore: false
									  },
						"test 3: verify DataClass1 Entity instance declaration using DataClass1.createNewEntity()" : {
										name: "ds2",
										file: "serverSide/020_EntityModelDefinitions.js",
										line: 2,
										type: "DataClass1 | Entity",
										kind: "Local Variable",
										ignore: false
									  },
						"test 4: verify DataClass1 EntityCollection instance declaration using ds.DataClass1.createNewEntityCollection()" : {
										name: "ds3",
										file: "serverSide/020_EntityModelDefinitions.js",
										line: 3,
										type: "DataClass1 | EntityCollection",
										kind: "Local Variable",
										ignore: false
									  },
						"test 5: verify DataClass1 EntityCollection instance declaration using DataClass1.createNewEntityCollection()" : {
										name: "ds4",
										file: "serverSide/020_EntityModelDefinitions.js",
										line: 4,
										type: "DataClass1 | EntityCollection",
										kind: "Local Variable",
										ignore: false
									  }
					}
			};

var testCase = {
	name: "Entity Models declaration tests",
 	_should: {
		ignore: {
		}
	}
};

generateTestCases(tests, testCase);