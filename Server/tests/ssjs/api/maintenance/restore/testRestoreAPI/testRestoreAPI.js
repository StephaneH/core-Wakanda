include('commonUtilities.js');

var baseFolder = application.getFolder("path");
var restoreFolder = baseFolder + "TestRestore/";
var backupRegistryPathNoJournal = baseFolder+ "TestBackups/NoJournal/";
var backupRegistryPathWithJournal = baseFolder+ "TestBackups/WithJournal/";

var noCleanOnTearDown = false;
var manifestRebased = false;

//Simply rewrites manifests in order to store the correct base path into the properties
//so that the test suites can be relocated
function rebaseBackupManifests(backupFolderPath){
	var baseFolder = new Folder(backupFolderPath);
	var subFolders = baseFolder.folders;
	var utf8 = 7;
	for(var i = 0;i<subFolders.length;i++){
		var file = new File(subFolders[i].path+'backupManifest.json');
		var data = file.toString();
		var manifObj = JSON.parse(data);
		manifObj["dataFolder"] = file.parent.path+"DataFolder/";
		if(manifObj["journal"] != ''){
			manifObj["journal"] = file.parent.path+"journal.waJournal";
		}
		data = JSON.stringify(manifObj);
		file.remove();
		
		var stream = TextStream(file, "write",utf8);
    	stream.write(data);
    	stream.close();
    }
}
function MySleep(delayInMs){
	var doSleep = function(){
		exitWait();
	}
    setTimeout(doSleep,delayInMs);
    wait();
}

var testCase = {
	name: "Test restoreDataStore syntax",
	_should: {
		error: {
			
		},
		ignore: {
		}
    },
    setUp : function () {
    	var f = Folder(restoreFolder);
    	if(f.exists){
    		f.removeContent();
    	}
    	else{
    		f.create();
    	}
    	
    	//Need to manually patch the manifest files to make
    	//the test portables and cross platform...
    	if (!manifestRebased){
    		rebaseBackupManifests(backupRegistryPathNoJournal);
    		rebaseBackupManifests(backupRegistryPathWithJournal);
    		manifestRebased = true;
    	}
    },
    tearDown : function () {
    	var f = Folder(restoreFolder);
    	if(f.exists && !noCleanOnTearDown ){
    		f.removeContent();
    	}
    	noCleanOnTearDown  = false;
    	
    	},
    testRestoreDataStoreNoParams: function () {
    	var result =null;
		var exceptions = 0; var exceptionMsg ='';
		try{
			 result = restoreDataStore();
		}
		catch(e){
			exceptions++; exceptionMsg = e.message;
		}
		finally{
			Y.Assert.isNull(result,"result should be defined");
			Y.assert(exceptions>0,"restoreDataStore should have thrown an exception");
			Y.Assert.areEqual(exceptionMsg,'Wrong type for parameter #1.')
		}
   	},
   	testRestoreDataStoreFailsForMissingMandatoryArgs: function () {
   		//test that the method fails if currentDataFolder and/or dataToRestore are missing from param #1
   		var tests = [
	   	{
	   		restoreParms:{}
	   		,msg:'Property not found \"currentDataFolder\" for arg #1.'
   		},
   		{
	   		restoreParms:{
	   			dataToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/DataFolder/',
	   			currentJournal:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'Property not found \"currentDataFolder\" for arg #1.'
   		},
   		{
	   		restoreParms:{
	   			currentJournal:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'Property not found \"currentDataFolder\" for arg #1.'
   		},
   		{
	   		restoreParms:{
	   			journalToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal'
	   		}
	   		,msg:'Property not found \"currentDataFolder\" for arg #1.'
   		},
   		{
	   		restoreParms:{
	   			journalToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal',
	   			currentJournal:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'Property not found \"currentDataFolder\" for arg #1.'
   		},
   		{
	   		restoreParms:{
	   			dataToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal',
	   			currentJournal:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'Property not found \"currentDataFolder\" for arg #1.'
   		},
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolder/'
	   		}
	   		,msg:'Property not found \"dataToRestore\" for arg #1.'
   		},
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal'
	   		}
	   		,msg:'Property not found \"dataToRestore\" for arg #1.'
   		},
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal',
	   			currentJournal:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'Property not found \"dataToRestore\" for arg #1.'
   		},
   		
   		//currentDataFolder is valid and may/may not exist. dataToRestore is valid and does not exist
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolder/',
	   			dataToRestore:backupRegistryPathWithJournal+'ZIGZAG_backup_2012-11-08_18-25-11/DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal',
	   			currentJournal:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'Folder \"DataFolder\" not found ('+backupRegistryPathWithJournal+'ZIGZAG_backup_2012-11-08_18-25-11/DataFolder/'+').'
   		},
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolderZZZZ/',
	   			dataToRestore:backupRegistryPathWithJournal+'ZZZZZbackup_2012-11-08_18-25-11/DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal',
	   			currentJournal:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'Folder \"DataFolder\" not found ('+backupRegistryPathWithJournal+'ZZZZZbackup_2012-11-08_18-25-11/DataFolder/'+').'
   		},
   		
   		//currentJournal is missing but journalTorestore is specified
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolder/',
	   			dataToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal'
	   		}
	   		,msg:'Property not found "currentJournal" for arg #1.'
   		},
   		//currentJournal is missing but journalTorestore is specified (thoguh invalid)
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolder/',
	   			dataToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'ZZZZbackup_2012-11-08_18-27-29/journal.waJournal'
	   		}
	   		,msg:'File \"journal.waJournal\" not found ('+backupRegistryPathWithJournal+'ZZZZbackup_2012-11-08_18-27-29/journal.waJournal)'
   		},
   		//currentJournal & journalTorestore are specified but is journalTorestore is invalid
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolder/',
	   			dataToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'ZZZZbackup_2012-11-08_18-27-29/journal.waJournal',
	   			currentJournal:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'File \"journal.waJournal\" not found ('+backupRegistryPathWithJournal+'ZZZZbackup_2012-11-08_18-27-29/journal.waJournal)'
   		},
   		//currentJournal & journalTorestore are specified but is currentJournal is not found
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolder/',
	   			dataToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal',
	   			currentJournal:backupRegistryPathWithJournal+'ZZZZbackup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'File \"journal.waJournal\" not found ('+backupRegistryPathWithJournal+'ZZZZbackup_2012-11-08_18-25-11/journal.waJournal)'
   		},
   		//currentJournal & journalTorestore are both specified and invalid
   		{
	   		restoreParms:{
	   			currentDataFolder:baseFolder+'DataFolder/',
	   			dataToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-25-11/DataFolder/',
	   			journalToRestore:backupRegistryPathWithJournal+'ZZZZbackup_2012-11-08_18-27-29/journal.waJournal',
	   			currentJournal:backupRegistryPathWithJournal+'ZZZZbackup_2012-11-08_18-25-11/journal.waJournal'
	   		}
	   		,msg:'File \"journal.waJournal\" not found ('+backupRegistryPathWithJournal+'ZZZZbackup_2012-11-08_18-27-29/journal.waJournal)'
   		}   		
   		];
   		
   		var result =null;
		var exceptions = 0; var exceptionMsg ='';
		for(var i = 0; i <tests.length;i++){
			try{
				 result = restoreDataStore(tests[i].restoreParms);
			}
			catch(e){
				exceptions++; exceptionMsg = e.message;
			}
			finally{
				Y.Assert.isNull(result,"result should not be defined for test "+i);
				Y.assert(exceptions>0,"restoreDataStore should have thrown an exception for test "+i);
				Y.Assert.areEqual(exceptionMsg,tests[i].msg,'Wrong exception for test '+i)
			}
		}
   	},
   	
   	//Test restoration supporting the new syntax
   	testRestoreDataStoreWithNoJournal:function()
   	{
   		//Basic restoration with no journal, and the 'damaged' data folder does not exists.
   		//Checks that the returned object is {ok:true}
   		var result = null;
   		var exceptions=0;
   		var exceptionMsg = '';
   		
   		var damagedDF = new Folder(restoreFolder+'DataFolder/');
   		try{
   			result = restoreDataStore({currentDataFolder:damagedDF,
   				dataToRestore:backupRegistryPathNoJournal+'backup_2012-10-23_19-54-37/DataFolder/'});
   		}
   		catch(e){
   			exceptionMsg = e.message;
   			exceptions++;
   		}
   		
   		Y.Assert.isNotNull(result);
   		Y.Assert.areEqual(0,exceptions);
   		Y.Assert.isTrue(result.hasOwnProperty('ok'),'ok property missing');
   		Y.Assert.isFalse(result.hasOwnProperty('dataFolder'),'dataFolder property missing');
   		Y.Assert.isFalse(result.hasOwnProperty('journal'),'unexpected journal property');
   	},
   	testRestoreDataStoreWithNoJournalAndExistingDamagedDataFolder:function()
   	{
   		//Ensures that the damaged data folder is duly renamed before restoration takes place
   		var result = null;
   		var exceptions=0;
   		var exceptionMsg = '';
   		
   		var damagedDF = new Folder(restoreFolder+'DataFolder/');
   		
   		if(!damagedDF.exists){
   			damagedDF.create();
   		}
   		
   		try{
   			result = restoreDataStore({currentDataFolder:damagedDF,
   				dataToRestore:backupRegistryPathNoJournal+'backup_2012-10-23_19-54-37/DataFolder/'});
   		}
   		catch(e){
   			exceptionMsg = e.message;
   			exceptions++;
   		}
   		
   		Y.Assert.isNotNull(result);
   		Y.Assert.areEqual(0,exceptions);
   		Y.Assert.isTrue(result.hasOwnProperty('ok'),'ok property missing');
   		Y.Assert.isFalse(result.hasOwnProperty('journal'),'unexpected journal property');
   		Y.Assert.isTrue(result.hasOwnProperty('dataFolder'),'dataFolder property missing');
   		Y.Assert.isObject(result.dataFolder,'dataFolder property not an object');
   		Y.Assert.isTrue(result.dataFolder.exists,'dataFolder property not an existing folder');
   	},
   	testRestoreDataStoreWithJournalInDataFolder:function()
   	{
   		//Tests that a journal located inside a damaged data folder is properly relocated inside the restored data folder
   		var result = null;
   		var exceptions=0;
   		var exceptionMsg = '';
   		
   		//setup, create a test damaged data folder with a journal inside
   		var damagedDF = new Folder(restoreFolder+'DataFolder/');
   		var sourceJournal = new File(backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal');
   		var sourceDataFolder = new Folder(backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/DataFolder/');
   		
   		var currentJournalFile = new File(damagedDF.path+'journal.waJournal');
   		
   		if(damagedDF.exists){
   			damagedDF.removeContent();
   		}else{
   			damagedDF.create();
   		}
   		copyFolderContents({source:sourceDataFolder.path,dest:damagedDF.path});
   		sourceJournal.copyTo(currentJournalFile,'Overwrite');
   		
   		//Then restore
   		
   		try{
   			result = restoreDataStore({currentDataFolder:damagedDF,currentJournal:currentJournalFile,
   				dataToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/DataFolder/'});
   		}
   		catch(e){
   			exceptionMsg = e.message;
   			exceptions++;
   		}
   		
   		Y.Assert.isNotNull(result);
   		Y.Assert.areEqual(0,exceptions);
   		Y.Assert.isTrue(result.hasOwnProperty('ok'),'ok property missing');
   		Y.Assert.isTrue(result.hasOwnProperty('dataFolder'),'dataFolder property missing');
   		Y.Assert.isObject(result.dataFolder,'dataFolder property not an object');
   		Y.Assert.isTrue(result.dataFolder.exists,'dataFolder property not an existing folder');
   		Y.Assert.isFalse(result.hasOwnProperty('journal'),'unexpected journal property');
   		Y.Assert.isTrue(compareFileContent({left:File(result.dataFolder.path+'journal.waJournal'),right:currentJournalFile}),'former current journal and nes current journal mismatch');   		
   	},
   	
   	testRestoreDataStoreWithJournalInDataFolderAndJournalReplacement:function()
   	{
   		//Tests restoring a damaged data folder when current journal is inside the damaged data foler
   		// and a subtitute journal is specified:
   		//- data folder shall be renamed and stored in returnedObject's dataFolder property
   		//- current journal file is contained inside the renamed data folder
   		//subsitute journal file (journalToRestore) shall be copied over current journal file
   		 
   		
   		var result = null;
   		var exceptions=0;
   		var exceptionMsg = '';
   		
   		//setup, create a test damaged data folder with a journal inside
   		var damagedDF = new Folder(restoreFolder+'DataFolder/');
   		var sourceJournal = new File(backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal');
   		var sourceDataFolder = new Folder(backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/DataFolder/');
   		
   		
   		var currentJournalFile = new File(damagedDF.path+'journal.waJournal');
   		var journalToReplaceWith = new File(backupRegistryPathWithJournal+'backup_2012-11-09_09-59-10/journal.waJournal');
   		
   		try{
	   		if(damagedDF.exists){
	   			damagedDF.removeContent();
	   		}else{
	   			damagedDF.create();
	   		}
	   		copyFolderContents({source:sourceDataFolder.path,dest:damagedDF.path});
	   		sourceJournal.copyTo(currentJournalFile,'Overwrite');
	   	}
	   	catch(e){
   			console.log('Exception during setup: '+e.message);
   		}
   		
   		//Then restore
   		
   		try{
   			result = restoreDataStore({currentDataFolder:damagedDF,currentJournal:currentJournalFile,
   				dataToRestore:backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/DataFolder/',
   				journalToRestore:journalToReplaceWith});
   		}
   		catch(e){
   			exceptionMsg = e.message;
   			exceptions++;
   		}
   		
   		Y.Assert.isNotNull(result);
   		Y.Assert.areEqual(0,exceptions);
   		Y.Assert.isTrue(result.hasOwnProperty('ok'),'ok property missing');
   		Y.Assert.isTrue(result.hasOwnProperty('dataFolder'),'dataFolder property missing');
   		Y.Assert.isObject(result.dataFolder,'dataFolder property not an object');
   		Y.Assert.isTrue(result.dataFolder.exists,'dataFolder property not an existing folder');
   		Y.Assert.isFalse(result.hasOwnProperty('journal'),'unexpected journal property');
   		
		//check the current journal is that from journalToRestore
   		Y.Assert.isTrue(compareFileContent({left:currentJournalFile,right:journalToReplaceWith}),'current journal and journal from journalToRestore are different');   		
   	},
   	
   	testRestoreDataStoreWithJournalOutsideDataFolder:function(){
   		//Tests that if the current journal  is located outside the damaged data folder, and journalToRestore is not defined 
   		//the current journal is not modified
   		//perform the restore
   		
   		
   		var result = null;
   		var exceptions=0;
   		var exceptionMsg = '';
   		
   		//setup, create a test damaged data folder and a current journal outside
   		//create the current journal outside the damaged data folder
   		var damagedDF = new Folder(restoreFolder+'DataFolder/');
   		var currentJournalFile = new File(restoreFolder+'Journals/Current/journal.waJournal');
   		var sourceJournal = new File(backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal');
   		var sourceDataFolder = new Folder(backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/DataFolder/');
   		var journalCheckCopy = new File(restoreFolder+'Journals/Current/referenceJournal.waJournal');

   		try{
   			if(currentJournalFile.parent.exists){
   				currentJournalFile.parent.removeContent();
   			}else{
   				currentJournalFile.parent.create();
   			}
   			sourceJournal.copyTo(currentJournalFile);
   			sourceJournal.copyTo(journalCheckCopy);
	   		if(damagedDF.exists){
	   			damagedDF.removeContent();
	   		}else{
	   			damagedDF.create();
	   		}
	   		copyFolderContents({source:sourceDataFolder.path,dest:damagedDF.path});
	   }
	   catch (e){
	   		console.error('Exception during setup: '+e.message);
	   }
   		
   		//Then restore
   		try{
   			result = restoreDataStore({currentDataFolder:damagedDF,currentJournal:currentJournalFile,
   				dataToRestore:sourceDataFolder});
   		}
   		catch(e){
   			exceptionMsg = e.message;
   			exceptions++;
   		}
   		
   		Y.Assert.isNotNull(result);
   		Y.Assert.areEqual(0,exceptions);
   		Y.Assert.isTrue(result.hasOwnProperty('ok'),'ok property missing');
   		Y.Assert.isTrue(result.hasOwnProperty('dataFolder'),'dataFolder property missing');
   		Y.Assert.isObject(result.dataFolder,'dataFolder property not an object');
   		Y.Assert.isTrue(result.dataFolder.exists,'dataFolder property not an existing folder');
   		Y.Assert.isFalse(result.hasOwnProperty('journal'),'unexpected journal property');
   		
		//check the current journal has not been modified
   		Y.Assert.isTrue(compareFileContent({left:currentJournalFile,right:journalCheckCopy}),'current journla has been modified during restore');
   	},
   	testRestoreDataStoreWithJournalOutsideDataFolderAndJournalReplacement:function()
   	{
   		//Tests that if the current journal  is located outside the damaged data folder, and journalToRestore is defined 
   		//the current journal is renamed and the new journal is copied over
   		
   		var result = null;
   		var exceptions=0;
   		var exceptionMsg = '';
   		
   		//setup, create a test damaged data folder and a current journal outside
   		var damagedDF = new Folder(restoreFolder+'DataFolder/');
   		var currentJournalFile = new File(restoreFolder+'Journals/Current/journal.waJournal');
   		var sourceJournal = new File(backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/journal.waJournal');
   		var sourceDataFolder = new Folder(backupRegistryPathWithJournal+'backup_2012-11-08_18-27-29/DataFolder/');
   		var substituteJournalFile = new File(backupRegistryPathWithJournal+'backup_2012-11-09_09-59-10/journal.waJournal');

   		try{
   			if(currentJournalFile.parent.exists){
   				currentJournalFile.parent.removeContent();
   			}else{
   				currentJournalFile.parent.create();
   			}
   			sourceJournal.copyTo(currentJournalFile);
	   		if(damagedDF.exists){
	   			damagedDF.removeContent();
	   		}else{
	   			damagedDF.create();
	   		}
	   		copyFolderContents({source:sourceDataFolder.path,dest:damagedDF.path});
	   }
	   catch (e){
	   		console.error('Exception during setup: '+e.message);
	   }
   		
   		//Then restore
   		try{
   			result = restoreDataStore({currentDataFolder:damagedDF,currentJournal:currentJournalFile,
   				journalToRestore:substituteJournalFile,dataToRestore:sourceDataFolder});
   		}
   		catch(e){
   			exceptionMsg = e.message;
   			exceptions++;
   			console.error('Exception: '+e.message);
   		}
   		
   		Y.Assert.isNotNull(result);
   		Y.Assert.areEqual(0,exceptions);
   		Y.Assert.isTrue(result.hasOwnProperty('ok'),'ok property missing');
   		Y.Assert.isTrue(result.hasOwnProperty('dataFolder'),'dataFolder property missing');
   		Y.Assert.isObject(result.dataFolder,'dataFolder property not an object');
   		Y.Assert.isTrue(result.dataFolder.exists,'dataFolder property not an existing folder');
   		Y.Assert.isTrue(result.hasOwnProperty('journal'),'unexpected journal property');
   		Y.Assert.isObject(result.journal,'journal property not an object');
   		Y.Assert.isTrue(result.journal.exists,'journal property not an existing file');
   		
   		//Ensure the renamed journal is the original journal
   		Y.Assert.isTrue(compareFileContent({left:result.journal,right:sourceJournal}),'renamed journal is not the original journal');
   		
		//Ensure the now current journal is the one we specified
   		Y.Assert.isTrue(compareFileContent({left:currentJournalFile,right:substituteJournalFile}),'new current journal not the expected one');
   		
   		//Ensure the renamed journal and new current journal are not the same
   		Y.Assert.isFalse(compareFileContent({left:currentJournalFile,right:result.journal}),'new current journal and renamed journal shall not be the same');
   		
   	}
};

if (typeof dontRequireUnitTestModule === 'undefined'){
	require("unitTest").run(testCase).getReport();
}

