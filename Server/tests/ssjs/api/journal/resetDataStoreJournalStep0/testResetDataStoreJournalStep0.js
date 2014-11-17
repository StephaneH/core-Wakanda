

/**
 * Unit tests for resetDataStoreJournal method.
 */
 
//Can't use Folder('DATA/').parent.parent, because sandboxing restricts going upper than the file system root folder
var dataFolder = new Folder(Folder('/DATA/').path);
var path = dataFolder.parent.parent.parent.path;
var targetDataFile = new File(path+'resetDataStoreJournalStep1/testResetDataStoreJournalStep1/DataFolder/data.waData');
var defaultJournal = new File(path+'resetDataStoreJournalStep1/testResetDataStoreJournalStep1/defaultJournal.waJournal');



var testCase = {
     name: "resetDataStoreJournal: unit tests",
     
    _should: {
		error: {
			
		},
		ignore: {
			testResetDataStoreJournal:false
			
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
    },
 
    tearDown : function () {
    },
    
    testResetDataStoreJournalFailsWhenNoJournalInUse: function () {
		//Checks exceptions thrown when resetting a datastore journal but the datastore does not use a journal
		var result =null;
		var exceptions = 0;
		var exceptionMsg = '';
		
		try{
			 result = resetDataStoreJournal(File('/DATA/data.waData'));
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		
		Y.Assert.isNull(result,"resetDataStoreJournal should have failed because no journal is active");
		Y.Assert.areEqual(1,exceptions,"No exception thrown");
    },
    testResetDataStoreJournalFailsWhenDataFileDoesNotExist: function () {
		//Checks exceptions thrown when resetting a datastore journal but the datastore does not exists
		
		var result =null;
		var exceptions = 0;
		var exceptionMsg = '';
		var df = new File('/DATA/data125.waData');
		
		Y.Assert.isFalse(df.exists,df.path+' exists');
		
		try{
			 result = resetDataStoreJournal(df);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		
		Y.Assert.isNull(result,"resetDataStoreJournal should have failed because data file does not exists");
		Y.Assert.areEqual(1,exceptions,"No exception thrown");
		Y.Assert.areEqual('File object must refer to an actual file!',exceptionMsg);
    },
    
    testResetDataStoreJournalFailsForMissingArgs: function () {
		//Checks exceptions thrown when not specifying arguments to resetDataStoreJournal
		
		var result =null;
		var exceptions = 0;
		var exceptionMsg = '';
		
		try{
			 result = resetDataStoreJournal();
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		
		Y.Assert.isNull(result,"resetDataStoreJournal should have failed because no args passed");
		Y.Assert.areEqual(1,exceptions,"No exception thrown");
		Y.Assert.areEqual('Wrong type for parameter #1, expected File or String.',exceptionMsg);
    },
    testResetDataStoreJournalFailsForWrongTypeOfArg: function () {
		//Checks exceptions thrown when specifying an argument which is neither a file or string to resetDataStoreJournal
		
		var result =null;
		var exceptions = 0;
		var exceptionMsg = '';
		
		try{
			 result = resetDataStoreJournal({});
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		
		Y.Assert.isNull(result,"resetDataStoreJournal should have failed because wrong type of args passed");
		Y.Assert.areEqual(1,exceptions,"No exception thrown");
		Y.Assert.areEqual('File object must refer to an actual file!',exceptionMsg,"No exception thrown");
    },
    
    testResetDataStoreJournalWhenJournalFileNotFound: function () {
		//Call resetDataStore() on a datafile which is journal-based. However the journal cannot be found.
		//In that case a new journal is created and we have no previousJournal item inside the returned object
		var result =null;
		var exceptions = 0;
		var exceptionMsg = '';
		var journalInfo=null;
		
		
		//Setup: create a sample datafolder with a journal-based datastore, but just don't copy the journal file
		var dest = new Folder(application.getFolder("path")+"testData/DataFolder/");
		var df = new File(dest.path+'data.waData');
		if(!dest.exists){
			dest.create();
		}
		else{
			dest.removeContent(true);
		}
		
		var theFiles = targetDataFile.parent.files;
		for(var i=0; i <theFiles.length;i++){
			var foo = theFiles[i].name.split('.');
			var bar = foo[1].toLowerCase();
			if(bar!='wajournal'){
				theFiles[i].copyTo(dest.path+theFiles[i].name);
			}
		}
		
		Y.Assert.isTrue(df.exists,df.path+' not found !!!');
		
		try{
			journalInfo = getJournalInfo(df);
			 result = resetDataStoreJournal(df);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		
		Y.Assert.isNotNull(result);
		Y.Assert.isFalse(result.hasOwnProperty('previousJournal'),'Unexpected previousJournal property');
		Y.Assert.isTrue(result.hasOwnProperty('currentJournal'),'No currentJournal property');
		Y.Assert.areEqual(result.currentJournal,journalInfo.path);
		Y.Assert.isTrue(File(result.currentJournal).size < (1 * 1024),'Reset journal size seems a bit large...');
    },
    
    testResetDataStoreJournalNominal: function () {
    	//Checks the correct execution of resetDataStoreJournal on a journaled data store, that is closed
    	var result =null;
		var exceptions = 0;
		var exceptionMsg = '';
		var journalInfo=null;
		
		Y.Assert.isTrue(defaultJournal.exists,'testResetDataStoreJournalStep1 default journal not found. Regenerate the test data');
		
		//Setup: clear testResetDataStoreJournalStep1 journal files and copy the defaultJournal instead
		
		
		var theFiles = targetDataFile.parent.files;
		for(var i=0; i <theFiles.length;i++){
			var foo = theFiles[i].name.split('.');
			var bar = foo[1].toLowerCase();
			if(bar=='wajournal'){
				theFiles[i].remove();
			}
		}
		
		
		var thejournal = targetDataFile.parent.path+'journal.waJournal';
		defaultJournal.copyTo(thejournal,'Overwrite');
		
		try{
			journalInfo = getJournalInfo(targetDataFile);
			result = resetDataStoreJournal(targetDataFile);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		
		Y.Assert.isNotNull(result);
		Y.Assert.isTrue(result.hasOwnProperty('previousJournal'),'No previousJournal property');
		Y.Assert.isTrue(result.hasOwnProperty('currentJournal'),'No currentJournal property');
		Y.Assert.areEqual(result.currentJournal,journalInfo.path);
		Y.Assert.isTrue(File(result.previousJournal).size > (10 * 1024),'previousJournal seems to small to be the original journal');
    }
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}


