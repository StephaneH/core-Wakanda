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


function getUid() {		
	var s = [];
	var hexDigits = "0123456789ABCDEF";
	for (var j = 0; j < 32; j++) {
	s[j] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[12] = "4";  
	s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  
	var uuid = s.join("");
	return uuid;
}

var testCase = {
	name: "test API DataStore Maintenance Methods",
	_should: {
		error: {},
		ignore: {
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleExist_21: true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleReturn_22:true, 
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleParam_23:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemExist_24:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemReturn_25:true, 
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParam_26:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorText_27:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorNumber_28:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorType_29:true,
			testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel_30:true
		}
	},
	/*
	 * Sets up data that is needed by each test.
	 */
	setUp: function() {

		//Add all Data for a generic Solution
		var
			string,
			word, 
			uuid, 
			obj,
			number,
			long64,
			long,
			image,
			duration,
			byte,
			date,
			bool,
			blob,
			newEntity;


		for ( var i = 0; i < 1000; i++) {
			
			newEntity = ds.Element.createEntity();
			
			word = 65535; 
			newEntity.word = word;

			uuid = getUid();
			newEntity.uuid = uuid;

			obj = {
				    "Great Expectations": "John",
				    "Pride and Prejudice": "Alice",
				    "Wuthering Heights": "Alice"
				};

			number = i; 
			newEntity.number = number;

			long64 = 9223372036854775807;
			newEntity.long64 = long64;

			long = 2147483647; 
			newEntity.long = long;

			//Add Image

			var currentTime = new Date();
		 		hours = currentTime.getHours();
		  		minutes = currentTime.getMinutes();
				secondes = currentTime.getSeconds(); 
				millisecondes = currentTime.getMilliseconds(); 
				duration = hours + ":" + minutes;
			newEntity.duration = duration; 

			byte = 255;
			newEntity.byte = byte; 

			date = new Date();
			newEntity.date = date; 

			bool = true;
			newEntity.bool = bool;

			blob = new Blob(20, 88, "application/octet-stream");
			newEntity.blob = blob; 

			string = "Morbi non libero nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam blandit tristique porta. Aenean nec tristique purus. Morbi felis nulla, blandit at eleifend in, venenatis ut mi. Sed urna ipsum, fringilla mollis laoreet vel, tempus eget odio. Curabitur in tempor neque. Suspendisse dapibus, sem imperdiet elementum vulputate, felis libero tempor purus, in pharetra nisl lacus quis nulla. Pellentesque molestie nunc lacus. Vestibulum in aliquet sem. Suspendisse at libero sem, in consequat purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ";
			newEntity.string = string;
			
			newEntity.save();

		} 

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
	tearDown: function() {

		ds.Element.drop();

	},
	/*
	 *
	 * Test methods for API SSJS DataStore Maintenance Methods 
	 *
	 */
	// 0 --**-- Method RepairDataStore Exist
	testDataStoreMaintenanceMethods_methodRepairDataStoreExist_0: function() {
		var result = repairDataStore;
		Y.Assert.isTypeOf("function", result, "RepairDataStore doesn't exist");
	},
	// 1 --**-- Method CompactDataStore Exist 
	testDataStoreMaintenanceMethods_methodCompactDataStoreExist_1: function() {
		var result = compactDataStore;
		Y.Assert.isTypeOf("function", result, "CompactDataStore doesn't exist");
	},
	// 2 --**-- Method VerifyDatastore Exist
	testDataStoreMaintenanceMethods_methodVerifyDataStoreExist_2: function() {
		var result = verifyDataStore;
		Y.Assert.isTypeOf("function", result, "VerifyDataStore doesn't exist");
	},
	// 3 --**-- Method RepairDataStore Exist in application object
	testDataStoreMaintenanceMethods_methodRepairDataStoreApplicationExist_3: function() {
		var result = application.repairDataStore;
		Y.Assert.isTypeOf("function", result, "RepairDataStore doesn't exist as a global object");
	},
	// 4 --**-- Method CompactDataStore Exist in application object
	testDataStoreMaintenanceMethods_methodCompactDataStoreApplicationExist_4: function() {
		var result = application.compactDataStore;
		Y.Assert.isTypeOf("function", result, "CompactDataStore doesn't exist as a global object");
	},
	// 5 --**-- Method VerifyDataStore Exist in application object
	testDataStoreMaintenanceMethods_methodVerifyDataStoreApplicationExist_5: function() {
		var result = application.verifyDataStore;
		Y.Assert.isTypeOf("function", result, "verifyDataStore doesn't exist as a global object");
	}, 
	// 6 --**-- Method RepairDataStore does not Exist in ds object
	testDataStoreMaintenanceMethods_methodRepairDataStoreDsExist_6: function() {
		var result = ds.repairDataStore;
		Y.Assert.isTypeOf("undefined", result, "RepairDataStore exist in the ds object");
	},
	// 7 --**-- Method CompactDataStore does not Exist in ds object
	testDataStoreMaintenanceMethods_methodCompactDataStoreDsExist_7: function() {
		var result = ds.compactDataStore;
		Y.Assert.isTypeOf("undefined", result, "CompactDataStore exist in the ds object");
	},
	// 8 --**-- Method VerifyDataStore does not Exist in ds object
	testDataStoreMaintenanceMethods_methodVerifyDataStoreDsExist_8: function() {
		var result = ds.verifyDataStore;
		Y.Assert.isTypeOf("undefined", result, "verifyDataStore exist in the ds object");
	},
	// 9 --**-- Method Verify Exist in ds object
	testDataStoreMaintenanceMethods_methodVerifyDsExist_9: function() {
		var result = ds.verify;
		Y.Assert.isTypeOf("function", result, "Verify doesn't exist in the ds object");
	},
	// 10 --**-- Method Verify works well in ds Object
	testDataStoreMaintenanceMethods_methodVerifyDsWorks_10: function() {
		var result = ds.verify();
		Y.Assert.isBoolean(result, "Verify doesn't return a Boolean");
	},
	// 11 --**-- Method Verify : CallBackOpenProgress exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackOpenProgressExist_11: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({openProgress: function()
				{
					result = ++incrementalValue;
				}

			});

		Y.Assert.isNumber(result, "Method Verify : CallBack openProgress doesn't exist");
	},
	// 12 --**-- Method Verify : CallBackOpenProgress must return an exact number of segments 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackOpenProgressReturn_12: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({openProgress: function()
				{
					result = ++incrementalValue;
				}

			});

		//19 Segments, confirm with log return ? i see 18 segments
		Y.Assert.areSame(19,result, "Method Verify : CallBack openProgress doesn't return an exact number of segments" + ' '  + result);
	},
	// 13 --**-- Method Verify : CallBackOpenProgress param Title is a string, example of title : Check bit tables for segment X
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackOpenProgressTitleParam_13: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({openProgress: function(title,maxElements)
				{
					if (typeof title != 'string') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack openProgress Param title isn't a string");
	},
	// 14 --**-- Method Verify : CallBackOpenProgress param maxElements is a Number, example of maxElements : X segment(s) (only Number displayed)
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackOpenProgressTitleParam_14: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({openProgress: function(title,maxElements)
				{
					if (typeof maxElements != 'number') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack openProgress Param maxElements isn't a number");
	},
	// 15 --**-- Method Verify : CallBackCloseProgress exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackCloseProgressExist_15: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({closeProgress: function()
				{
					result = ++incrementalValue;
				}

			});

		Y.Assert.isNumber(result, "Method Verify : CallBack closeProgress doesn't exist");
	},
	// 16 --**-- Method Verify : CallBackCloseProgress must return an exact number of segments
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackCloseProgressReturn_16: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({closeProgress: function()
				{
					result = ++incrementalValue;
				}

			});

		//19 Segments, confirm with log return ? i see 18 segments
		Y.Assert.areSame(19,result, "Method Verify : CallBack closeProgress doesn't return an exact number of segments" + ' '  + result);
	},
	// 17 --**-- Method Verify : CallBackProgress exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackProgressExist_17: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({progress: function()
				{
					result = ++incrementalValue;
				}

			});
		Y.Assert.isNumber(result, "Method Verify : CallBack progress doesn't exist");
	},
	// 18 --**-- Method Verify : CallBackOpenProgress must return an exact number
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackProgressReturn_18: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({progress: function()
				{
					result = ++incrementalValue;
				}

			});

		//2104 Progress? 
		Y.Assert.areSame(2104,result, "Method Verify : CallBack progress doesn't return an exact number" + ' '  + result);
	},
	// 19 --**-- Method Verify : CallBackProgress param curElement is a Number, example of curElement : X (number)
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackProgressCurElementParam_19: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({progress: function(curElement,maxElements)
				{
					if (typeof curElement != 'number') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack progress Param curElement isn't a number");
	},
	// 20 --**-- Method Verify : CallBackProgress param maxElements is a Number, example of maxElements :  X (number)
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackProgressMaxElementsParam_20: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({progress: function(curElement,maxElements)
				{
					if (typeof maxElements != 'number') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack progress Param maxElements isn't a number");
	},
	// 21 --**-- Method Verify : CallBackSetProgressTitle exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleExist_21: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({setProgressTitle: function()
				{
					result = ++incrementalValue;
				}

			});
		Y.Assert.isNumber(result, "Method Verify : CallBack setProgressTitle doesn't exist");
	},	
	// 22 --**-- Method Verify : CallBackSetProgressTitle exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleReturn_22: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({setProgressTitle: function()
				{
					result = ++incrementalValue;
				}

			});
		//19 Segments, confirm with log return ? i see 18 segments	
		Y.Assert.areSame(19,result, "Method Verify : CallBack setProgressTitle doesn't return an exact number" + ' ' + result);
	},	
	// 23 --**-- Method Verify : CallBackSetProgressTitle param title is a string, example of title :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackSetProgressTitleParam_23: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({setProgressTitle: function(title)
				{
					if (typeof title != 'string') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack setProgressTitle Param title isn't a string");
	},
	// 24 --**-- Method Verify : CallBackAddProblem exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemExist_24: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({addProblem: function()
				{
					result = ++incrementalValue;
				}

			});
		Y.Assert.isNumber(result, "Method Verify : CallBack AddProblem doesn't exist");
	},	
	// 25 --**-- Method Verify : CallBackAddProblem exist 
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemReturn_25: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({addProblem: function()
				{
					result = ++incrementalValue;
				}

			});
		//19 Segments, confirm with log return ? i see 18 segments	
		Y.Assert.areSame(19,result, "Method Verify : CallBack AddProblem doesn't return an exact number" + ' ' + result);
	},	
	// 26 --**-- Method Verify : CallBackAddProblem param problem is an object, example of object :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParam_26: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({addProblem: function(problem)
				{
					if (typeof problem != 'object') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack AddProblem Param problem isn't an object");
	},
	// 27 --**-- Method Verify : CallBackAddProblem param problem.ErrorText is a string, example of string :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorText_27: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({addProblem: function(problem)
				{
					if (typeof problem.ErrorText != 'string') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack AddProblem Param problem.ErrorText isn't a string");
	},
	// 28 --**-- Method Verify : CallBackAddProblem param problem.ErrorNumber is a number, example of number :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorNumber_28: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({addProblem: function(problem)
				{
					if (typeof problem.ErrorNumber != 'number') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack AddProblem Param problem.ErrorNumber isn't a number");
	},
	// 29 --**-- Method Verify : CallBackAddProblem param problem.ErrorType is a number, example of number :  N/A
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorType_29: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({addProblem: function(problem)
				{
					if (typeof problem.ErrorType != 'number') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack AddProblem Param problem.ErrorType isn't a number");
	},
	// 30 --**-- Method Verify : CallBackAddProblem param problem.ErrorLevel is a number, example of number :  1:Fatal error, 2:regular error, 3:warning
	testDataStoreMaintenanceMethods_methodVerifyDsCallBackAddProblemParamObjectPropertiesErrorLevel_30: function() {
		var incrementalValue, 
		result; 

		incrementalValue = 0;
		result = null;

			ds.verify({addProblem: function(problem)
				{
					if (typeof problem.ErrorLevel != 'number') {
						return result = false
					} else {
						return result = true
					}
						
				}

			});

		Y.Assert.isTrue(result, "Method Verify : CallBack AddProblem Param problem.ErrorLevel isn't a number");
	},
	// 31 --**-- Method Verify from ds object must generate no error from a data
	testDataStoreMaintenanceMethods_methodVerifyDsNoError_31: function() {
		//Synchronus ? 
		var nbproblems, 
			problems, 
			result;

		nbproblems = 0;
		problems = [];
		result = null;

			ds.verify({ addProblem: function(problem)
			{
				++nbproblems;
				problems.push(problem);
				
			}});

			result ="";

			if (nbproblems == 0) {

				result = "ok";
								
			} else {

				result = "damaged";
			    problems;

			}

		Y.Assert.areSame("ok",result);
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