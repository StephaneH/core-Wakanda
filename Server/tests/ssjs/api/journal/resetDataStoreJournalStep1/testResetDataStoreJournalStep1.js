

/**
 * Post-validation of resetDataStoreJournal method.
 * This test suite must be executed after testResetDataStoreJournalStep0.
 * The application uses a journal which has been previously truncated by testResetDataStoreJournalStep0.
 * The validation consists in:
 * 1) ensuring the application startzs properly: this validates the fact that resetDataStoreJournal() creates the journal properly with
 * respect to the data file (UUID, journal structure...)
 * 2) ensuring that the journal only contains a single operation: data opening. This validates that the journal was properly truncated by resetDataStoreJournal().
 * 3) perform some more tests
 *
 * To regenerate the data:
 * Delete the data folder contents
 * Restart the application
 * Run this test
 * The test will fail but generates the data in setup().
 * Copy the resulting journal in the application folder as defaultJournal.waJournal
 */

var dataFile = new File('/DATA/data.waData');
var dataFolder = new Folder('/DATA/');

var testCase = {
     name: "resetDataStoreJournal: post-reset validation",
     
    _should: {
		error: {
			
		},
		ignore: {
			
		}
    },
	 setUp : function () {
		exceptions = 0;
    	if (os.isWindows) {
    	}
    	else if (os.isLinux) {
    	}
		else {
			//MAC
		}
		
		if(ds.DataClass1.all().length == 0){
			//No data in the data file, generate it
			for (var i=0; i < 1200;i++){
				var e = new ds.DataClass1({attribute1: 'Entry '+(i+1)});
				e.save();
			}
		}
    },
 
    tearDown : function () {
    },
    
    testValidateResetDataStoreJournal: function () {
		//Ensure that resetDataStoreJournal() in testResetDataStoreJournalStep0 actually truncated
		//the journal, by ensuring that the journal now only contains the data opening operation
		var info;
		var exceptions = 0;
		var exceptionMsg = '';
		
		try{
			info = getJournalInfo(dataFile);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		
		Y.Assert.isNotNull(info,"No journal info");
		Y.Assert.isTrue(info.hasOwnProperty('path'),"No path property in journal info");
		
		var operations = null;
		
		try{
			operations = parseJournal(info.path);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isArray(operations,"no operations returned");
		Y.Assert.areEqual('Open data',operations[operations.length-1].operationName,"operationName should be \'Open data\'");
		Y.Assert.areEqual(7,operations[operations.length-1].operationType,"operationType should be 7");
    },
	   testResetDataStoreJournalFailsOnOpenedJournal: function () {
		//resetDataStoreJournal cannot work on self because the application is opened
		
		var result =null;
		var exceptions = 0;
		var exceptionMsg = '';
		
		//Test only passes on Windows because platform locks file on opening
		//On Unices, sharing is pervasive and causes the test to fail
		if (os.isWindows) {
			
			try{
				 result = resetDataStoreJournal(dataFile);
			}
			catch(e){
				exceptions++;
				exceptionMsg = e.message;
			}
			
			Y.Assert.isNull(result,"resetDataStoreJournal should have failed on currently active journal");
			Y.Assert.areEqual(1,exceptions,"No exception thrown");
		}
    },
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}

