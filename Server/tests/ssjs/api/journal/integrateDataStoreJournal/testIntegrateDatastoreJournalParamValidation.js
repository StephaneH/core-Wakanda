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

/**
 * Unit tests for the integrateDatastoreJournal() method
 */
include('./commonTestUtilities.js');

var testDataCreated = false;

var testCase = {
     name: "integrateDatastore: Parameters validation coverage",
     
    _should: {
		error: {
			
		},
		ignore: {
			/*
			testIntegrateDatastoreJournalNoParams: true,
			testIntegrateDatastoreJournalInvalidParamTypes: true,
			testIntegrateDatastoreJournalWithTooRecentJournal: true,
	 		testIntegrateDatastoreJournalWithTooOldJournal: true,
	 		testIntegrateDatastoreJournalWithWrongJournal: true,
	 		
	 		testIntegrateDatastoreJournalWithInvalidOperationNumbers:true,
	 		*/
	 		
			//Fails because the test data is read-only and we have no way to make it writable for now
	 		testIntegrateDatastoreJournalInNonJournaledDataStore:true
	 		
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
		
		/* 
		var d = new Folder(dataFolder);
		if(!d.exists){
			d.create();
		}
		*/
		
		if(testDataCreated === false){
			testDataCreated = true;
			var msg = '';
			try{
				createTestData();
			}
			catch(e){
				msg = e.message;
				testDataCreated = false;
			}
			Y.Assert.areEqual('',msg,'createTestData failed with message: '+msg);
		}
    },
 
    tearDown : function () {
    },
    
     ///Parameter validation tests
    testIntegrateDatastoreJournalNoParams:function(){
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = integrateDataStoreJournal();
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
			
		}
		Y.Assert.isNull(result);
		Y.Assert.areEqual(1,exceptions);
		Y.Assert.areEqual('Wrong type for parameter #1, expected File or String.',exceptionMsg);
	},
	testIntegrateDatastoreJournalInvalidParamTypes:function(){
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		var patterns=[
		
			{model:null,data:null,journal:null,message:'Wrong type for parameter #1, expected File or String.'},
			{model:{},data:null,journal:null,message:'File object must refer to an actual file!'},
			{model:null,data:{},journal:null,message:'Wrong type for parameter #1, expected File or String.'},
			{model:null,data:null,journal:{},message:'Wrong type for parameter #1, expected File or String.'},
			{model:true,data:{},journal:{},message:'Wrong type for parameter #1, expected File or String.'},
			{model:true,data:'notValid',journal:{},message:'Wrong type for parameter #1, expected File or String.'},
			{model:modelFile,data:null,journal:{},message:'Wrong type for parameter #2, expected File or String.'},
			{model:modelFile,data:currentDataFile,journal:null,message:'Wrong type for parameter #3, expected File or String.'},
			{model:modelFile,data:currentDataFile,journal:{},message:'File object must refer to an actual file!'},
			
			//Valid File objects but one of them does not exist
			{model:modelFile,data:currentDataFile,journal:nonExistingFile,message:'File object must refer to an actual file!'},
			{model:nonExistingFile,data:currentDataFile,journal:currentJournalFile,message:'File object must refer to an actual file!'},
			{model:modelFile,data:nonExistingFile,journal:currentJournalFile,message:'File object must refer to an actual file!'},
			{model:nonExistingFile,data:currentDataFile,journal:nonExistingFile,message:'File object must refer to an actual file!'},
			{model:modelFile,data:nonExistingFile,journal:nonExistingFile,message:'File object must refer to an actual file!'},
			{model:nonExistingFile,data:currentDataFile,journal:nonExistingFile,message:'File object must refer to an actual file!'},
			
			//Valid file path strings but one of them does not exist
			{model:modelFile.path,data:currentDataFile.path,journal:nonExistingFile.path,message:'File object must refer to an actual file!'},
			{model:nonExistingFile.path,data:currentDataFile.path,journal:currentJournalFile.path,message:'File object must refer to an actual file!'},
			{model:modelFile.path,data:nonExistingFile.path,journal:currentJournalFile.path,message:'File object must refer to an actual file!'},
			{model:nonExistingFile.path,data:currentDataFile.path,journal:nonExistingFile.path,message:'File object must refer to an actual file!'},
			{model:modelFile.path,data:nonExistingFile.path,journal:nonExistingFile.path,message:'File object must refer to an actual file!'},
			{model:nonExistingFile.path,data:currentDataFile.path,journal:nonExistingFile.path,message:'File object must refer to an actual file!'}
		];
		
		for(var i=0; i < patterns.length;i++){
			
			exceptions=0;
			exceptionMsg = '';
			try{
				result = integrateDataStoreJournal(patterns[i].model,patterns[i].data,patterns[i].journal);
			}
			catch(e){
				exceptions++;
				exceptionMsg = e.message;
				
			}
			Y.Assert.isNull(result,"failed for pattern "+i);
			Y.Assert.areEqual(1,exceptions,"failed for pattern "+i);
			Y.Assert.areEqual(patterns[i].message,exceptionMsg,"failed for pattern "+i);
		}
	},
	 testIntegrateDatastoreJournalWithTooOldJournal:function(){
    	/*Tests that the method throws an exception if the 
    	journal is too old compared to the data
    	*/
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		var backups = getLastBackups();

		var backedUpJournal= new File(baseFolderPath + "Assets/Backups/1/journal.waJournal");
	
		try{
				result = integrateDataStoreJournal(modelFile,currentDataFile,backedUpJournal);
				
			}
			catch(e){
				exceptions++;
				exceptionMsg = e.message;
				
			}
			Y.Assert.isNull(result);
			Y.Assert.areEqual(1,exceptions);
			if (os.isWindows) {
				Y.Assert.areEqual('Log file cannot be integrated into database model',exceptionMsg);
    		}
    		else {
			//MAC & Linux
				Y.Assert.areEqual('Log file cannot be integrated into database Model',exceptionMsg);
			}
			
	},
	testIntegrateDatastoreJournalWithTooRecentJournal:function(){
		/*
		Tests that the method throws an exception if the 
    	journal is too recent compared to the data
    	*/
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		var backups = getLastBackups();

		var testJournalFile= new File(baseFolderPath + "Assets/Backups/4/journal.waJournal");
		
		var testDataFile = new File(baseFolderPath + "Assets/Backups/2/DataFolder/data.waData");
		
		try{
				result = integrateDataStoreJournal(modelFile,testDataFile,testJournalFile);
				
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
			
		}
		Y.Assert.isNull(result);
		Y.Assert.areEqual(1,exceptions);
		if (os.isWindows) {
			Y.Assert.areEqual('Log file cannot be integrated into database model',exceptionMsg);
		}
		else {
		//MAC & Linux
			Y.Assert.areEqual('Log file cannot be integrated into database Model',exceptionMsg);
		}
	},
	testIntegrateDatastoreJournalWithWrongJournal:function(){
		/*
		Tests that the method throws an exception if the journal we wish to integrate is not paired to the 
		data file (dataLink uuid don't match)
    	*/
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
				
		try{
			result = integrateDataStoreJournal(modelFile,currentDataFile,foreignJournalFile);
				
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
			
		}
		Y.Assert.isNull(result);
		Y.Assert.areEqual(1,exceptions);
		
		if (os.isWindows) {
			Y.Assert.areEqual('Log file does not match database model',exceptionMsg);
		}
		else {
		//MAC & Linux
			Y.Assert.areEqual('Log file does not match database Model',exceptionMsg);
		}
		
	},
	testIntegrateDatastoreJournalInNonJournaledDataStore:function(){
		/*
		Tests that the method throws an exception if an attempt is made to integrate a journal inside a datastore
		which has no journal defined
    	*/
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		var myModelFile = new File(baseFolderPath+'Assets/NonJournaled/model.waModel');
		var myDataFile = new File(baseFolderPath+'Assets/NonJournaled/DataFolder/data.waData');
		//var testJournalFile = new File(baseFolderPath+'Assets/DataFolders/Current/journal.waJournal');
		try{
			result = integrateDataStoreJournal(myModelFile,myDataFile,currentJournalFile);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
			
		}
		Y.Assert.isNull(result);
		Y.Assert.areEqual(1,exceptions);
		if (os.isWindows) {
			Y.Assert.areEqual('Log file cannot be found for database model',exceptionMsg);
		}
		else {
		//MAC & Linux
			Y.Assert.areEqual('Log file cannot be found for database Model',exceptionMsg);
		}
	},
	testIntegrateDatastoreJournalWithInvalidOperationNumbers:function(){
		/*
		Tests that the method throws an exception if an attempt is made to integrate a journal with invalid operation numbers
		
    	*/
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		var options=[
			{fromOperation:-1},
			{upToOperation:-1},
			{fromOperation:-1,upToOperation:-1},
			{fromOperation:1428,upToOperation:-1},
			{fromOperation:1428,upToOperation:2890}
		];
		
		for(var i=0; i < options.length;i++){
			
			exceptions=0;
			exceptionMsg = '';
			try{
				result = integrateDataStoreJournal(modelFile,currentDataFile,currentJournalFile,options[i]);
			}
			catch(e){
				exceptions++;
				exceptionMsg = e.message;
			}
			Y.Assert.isNull(result,"failed for pattern "+i);
			Y.Assert.areEqual(1,exceptions,"failed for pattern "+i);
			
			Y.Assert.isTrue(
			(exceptionMsg ==='Log file cannot be integrated into database {BaseName}')||
			(exceptionMsg ==='Log file cannot be integrated into database model')
			||(exceptionMsg ==='Log file cannot be integrated into database Model'),"exception mismatch for pattern "+i+ 'received \''+ exceptionMsg+'\'');
		}
	}
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}



