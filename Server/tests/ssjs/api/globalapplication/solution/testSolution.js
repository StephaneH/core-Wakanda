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
var testCase = {
	name: "test API Global Application Solution",
	_should: {
		error: {},
		ignore: {}
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
	/*    // 1 --**-- Applications property exist

     * Cleans up everything that was created by setUp().
     */
	tearDown: function() {},
	/*
	 *
	 * Test methods for API SSJS Global Application Solution
	 *
	 */
	// 0 --**-- Object Solution exist
	testSolution_ObjectSolutionExist_0: function() {
		Y.Assert.isObject(solution);
	},
	// 1 --**-- Solution is available in Global Application
	testSolution_IsAvailableInApplication_1: function() {
		Y.Assert.isObject(application.solution);
	},
	// 2 --**-- Applications property exist
	testSolution_ApplicationsPropertyExist_2: function() {
		Y.Assert.isArray(solution.applications);
	},
	// 3 --**-- Name property exist
	testSolution_NamePropertyExist_3: function() {
		Y.Assert.isString(solution.name);
	}, 
	// 4 --**-- getApplicationByName medthod exist
	testSolution_getApplication_4: function() {
		var result = solution.getApplicationByName;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 5 --**-- getApplicationByName medthod return an object
	testSolution_getApplicationByNameReturnObject_5: function() {
		Y.Assert.isObject(solution.getApplicationByName());
	}, 
	// 6 --**-- getApplicationByName method exist since Application
	testSolution_getApplicationByNameApplicationExist_6: function() {
		var result = application.solution.getApplicationByName;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 7 --**-- getApplicationByName medthod return an object since an application
	testSolution_getApplicationByNameReturnObjectApplication_7: function() {
		Y.Assert.isObject(application.solution.getApplicationByName());
	},
	// 8 --**-- getDebuggerPort method exist since 
	testSolution_getDebuggerPortExist_8: function() {
		var result = solution.getDebuggerPort;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 9 --**-- getDebuggerPort method return a number
	testSolution_getDebuggerPortReturnNumber_9: function() {
		Y.Assert.isNumber(solution.getDebuggerPort());
	}, 
	// 10 --**-- getDebuggerPort method exist since application
	testSolution_getDebuggerPortApplicationExist_10: function() {
		var result = application.solution.getDebuggerPort;
		Y.Assert.isTypeOf("function", result);
	},
	// 11 --**-- getDebuggerPort method return a number since Application 
	testSolution_getDebuggerPortReturnNumberApplication_11: function() {
		Y.Assert.isNumber(application.solution.getDebuggerPort());
	},
	// 12 --**-- getFolder method exist  
	testSolution_getFolderExist_12: function() {
		var result = application.solution.getFolder;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 13 --**-- getFolder return a string  
	testSolution_getFodlerReturnString_13: function() {
		Y.Assert.isString(application.solution.getFolder());
	},
	// 14 --**-- getFolder method exist since application
	testSolution_getFolderApplicationExist_14: function() {
		var result = application.solution.getFolder;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 15 --**-- getFolder return a string since Application 
	testSolution_getFodlerReturnStringApplication_15: function() {
		Y.Assert.isString(application.solution.getFolder());
	},
	// 16 --**-- getItemsWithRole method exist  
	testSolution_getItemsWithRoleExist_16: function() {
		var result = application.solution.getItemsWithRole;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 17 --**-- getItemsWithRole return a string  
	testSolution_getItemsWithRoleReturnString_17: function() {
		Y.Assert.isObject(application.solution.getItemsWithRole());
	},
	// 18 --**-- getItemsWithRole method exist since application
	testSolution_getItemsWithRoleApplicationExist_18: function() {
		var result = application.solution.getItemsWithRole;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 19 --**-- getItemsWithRole return a string since Application 
	testSolution_getItemsWithRoleReturnStringApplication_19: function() {
		Y.Assert.isObject(application.solution.getItemsWithRole());
	}, 
	// 20 --**-- getWalibFolder() method exist  
	testSolution_getWalibFolderExist_20: function() {
		var result = application.solution.getWalibFolder;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 21 --**-- getWalibFolder() return a string  
	testSolution_getWalibFolderReturnString_21: function() {
		Y.Assert.isObject(application.solution.getWalibFolder());
	},
	// 22 --**-- getWalibFolder() method exist since application
	testSolution_getWalibFolderApplicationExist_22: function() {
		var result = application.solution.getWalibFolder;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 23 --**-- getWalibFolder() return a string since application 
	testSolution_getWalibFolderReturnStringApplication_23: function() {
		Y.Assert.isObject(application.solution.getWalibFolder());
	},
	// 24 --**-- close() method exist 
	testSolution_closeExist_24: function() {
		var result = solution.close;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 25 --**-- close() method exist since application 
	testSolution_closeApplicationExist_25: function() {
		var result = application.solution.close;
		Y.Assert.isTypeOf("function", result);
	},
	// 26 --**-- getSettingFile() method exist   
	testSolution_getSettingFileExist_26: function() {
		var result = solution.getSettingFile;
		Y.Assert.isTypeOf("function", result);
	},
	// 27 --**-- getSettingFile() return an Object 
	testSolution_getSettingFileReturnObject_27: function() {
		Y.Assert.isObject(solution.getSettingFile());
	},
	// 28 --**-- getSettingFile() method exist since application   
	testSolution_getSettingFileApplicationExist_28: function() {
		var result = application.solution.getSettingFile;
		Y.Assert.isTypeOf("function", result);
	},
	// 29 --**-- getSettingFile() return an Object since application
	testSolution_getSettingFileReturnObjectApplication_29: function() {
		Y.Assert.isObject(application.solution.getSettingFile());
	},
	// 30 --**-- quitServer() method exist 
	testSolution_quiServerExist_30: function() {
		var result = solution.quitServer;
		Y.Assert.isTypeOf("function", result);
	}, 
	// 31 --**-- quitServer() method exist since application 
	testSolution_quitServerApplicationExist_31: function() {
		var result = application.solution.quitServer;
		Y.Assert.isTypeOf("function", result);
	},
	
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