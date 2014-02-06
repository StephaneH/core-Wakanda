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
function count() {
	var counter = 0;
	for (var p in this) if (this.hasOwnProperty(p))++counter;
	return counter;
}
var testCase = {
	name: "test API DataStore Maintenance Methods",
	_should: {
		error: {},
		ignore: {
			testHTTPServer_GetIpAddress_14: true
		}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {
		if (os.isWindows) {
			//Win Stuff 
		} else if (os.isLinux) {
			//Linux Stuff   
		} else {
			//MAC Stuff
		}
	},
	/*
	 * Cleans up everything that was created by setUp().
	 */
	tearDown: function() {},
	/*
	 *
	 * Test methods for API SSJS DataStore Maintenance Methods 
	 *
	 */
	// 0 --**-- Method Repair Exist
	testDataStoreMaintenanceMethods_methodRepairExist_0: function() {
		var result = repairDataStore;
		Y.Assert.isTypeOf("function", result);
	},
	// 1 --**-- Method Compact Exist 
	testDataStoreMaintenanceMethods_methodCompactExist_1: function() {
		var result = compactDataStore;
		Y.Assert.isTypeOf("function", result);
	},
	// 2 --**-- Method Verify Exist
	testDataStoreMaintenanceMethods_methodVerifyExist_2: function() {
		var result = verifyDataStore;
		Y.Assert.isTypeOf("function", result);
	},
	// 3 --**-- Method Repair Exist in application object
	testDataStoreMaintenanceMethods_methodRepairExist_3: function() {
		var result = application.repairDataStore;
		Y.Assert.isTypeOf("function", result);
	},
	// 4 --**-- Method Compact Exist in application object
	testDataStoreMaintenanceMethods_methodCompactExist_4: function() {
		var result = application.compactDataStore;
		Y.Assert.isTypeOf("function", result);
	},
	// 5 --**-- Method Verify Exist in application object
	testDataStoreMaintenanceMethods_methodVerifyExist_5: function() {
		var result = application.verifyDataStore;
		Y.Assert.isTypeOf("function", result);
	}
};
/*
    //create the console
    (new Y.Test.Console({
        newestOnTop : false,
        filters: {
            pass: true,
            fail: true
        }
    })).render('#testLogger');

    Y.Test.Runner.add(Y.example.test.ExampleSuite);

    //run the tests
    Y.Test.Runner.run();
    */
if (typeof dontRequireUnitTest === 'undefined') {
	require("unitTest").run(testCase).getReport();
}