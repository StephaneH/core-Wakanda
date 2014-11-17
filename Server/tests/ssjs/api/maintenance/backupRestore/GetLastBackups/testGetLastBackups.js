


/**
 * Unit tests for getLastBackups()
 */
 
var baseFolderPath = application.getFolder("path");
var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";

var testCase = {
     name: "Coverage tests for getLastBackups() validation",
     
    _should: {
		error: {
			
		},
		ignore: {
			/*
			testGetLastBackupsWithNoBackupRegistry: true,
			testGetLastBackupsWithNoBackupRegistryFolderIsAvailable: true,
			testGetLastBackupsWithEmptyBackupRegistryFile: true,
			testGetLastBackupsWithDefaultBackupConfig: true,
			testGetLastBackupsWithNonUniqueNames: false
			*/
			
		}
    },
	 setUp : function () {
		
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
    
    testGetLastBackupsWithNoBackupRegistry: function () {
		//Tests that getLastBackups() returns an empty array when no backup registry is available.
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
		}
		
		var lastBackups = null;
		var exceptions = 0;
			
		try{
			lastBackups = getLastBackups();
			 
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}

		Y.Assert.isNotNull(lastBackups,"last backups NULL");
		Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
		Y.Assert.areEqual(0,lastBackups.length,"getLastBackups returned array not empty");
    },
    
    testGetLastBackupsWithNoBackupRegistryFolderIsAvailable: function () {
		//Tests that getLastBackups() returns an empty array when no backup registry folder exists.
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		
		var lastBackups = null;
		var exceptions = 0;
			
		try{
			lastBackups = getLastBackups();
			 
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}

		Y.Assert.isNotNull(lastBackups,"last backups NULL");
		Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
		Y.Assert.areEqual(0,lastBackups.length,"getLastBackups returned array not empty");
    },
    
    testGetLastBackupsWithEmptyBackupRegistryFile: function () {
		//Tests that getLastBackups() returns an empty array when the backup registry is empty.
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(!mySettings.backupRegistryFolder.exists)
		{
			
			mySettings.backupRegistryFolder.create();
		}
		else
		{
			mySettings.backupRegistryFolder.removeContent(true);
		}
		
		var lastBackups = null;
		var exceptions = 0;
			
		try{
			var backupRegFile = new File(mySettings.backupRegistryFolder.path+"lastBackup.json");
			backupRegFile.create();
			lastBackups = getLastBackups();
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}

		Y.Assert.isNotNull(lastBackups,"last backups NULL");
		Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
		Y.Assert.areEqual(0,lastBackups.length,"getLastBackups returned array not empty");
    },
    
    testGetLastBackupsWithDefaultBackupConfig: function () {
		//Tests that getLastBackups() 
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		var lastBackups = null;
		var exceptions = 0;
		for(var i = 0;i < 5; i++){
			var manif;
			try{
				manif = ds.backup();
				lastBackups = getLastBackups();
			}
			
			catch(e){
				exceptions++;
			}
			finally{
			}
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
			Y.Assert.areEqual(i+1,lastBackups.length,"getLastBackups returned array length mismatch");
		}
    },
    testGetLastBackupsWithNonUniqueNames: function () {
		//Tests that the manifest registry is filled with duplicates when using non-unique names
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		var lastBackups = null;
		var exceptions = 0;
		mySettings.useUniqueNames = false;
		
		for(var i = 0;i < 5; i++){
			var manif;
			try{
				manif = ds.backup(mySettings);
				lastBackups = getLastBackups();
			}
			
			catch(e){
				exceptions++;
			}
			finally{
			}
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
			Y.Assert.areEqual(1,lastBackups.length,"getLastBackups returned array length mismatch");
		}
    },
	
	
	testGetLastBackupsWithMultipleDuplicatesInRegistry: function () {
		//This test is for bug WAK0084452, before WAK0084452  was fixed, a backup registry could
		//contain duplicate entries if some backups had been performed repeatedly with useUniqueNames == false.
		//This tests ensures that duplicates are actually removed from the registry when backing up with use unique names == true
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		
		
		//Create 1 backup with no unique names and manually create a backup registry that has 3 entries
		var lastBackups = null;
		var exceptions = 0;
		var exceptionText = "";
		mySettings.useUniqueNames = false;
		var backupFolderPath = mySettings.destination.path+"Backup_"+Date.now()+"/";
		mySettings.destination = new Folder(backupFolderPath);
		
		var manif;
		try{
			manif = ds.backup(mySettings);
			lastBackups = getLastBackups();
			var f  = new File(mySettings.backupRegistryFolder.path+"lastBackup.json");
			var ts = new TextStream(f,"Overwrite");
			ts.write("[\""+manif.path+"\",\""+manif.path+"\",\""+manif.path+"\"]");
			ts.flush();
			ts.close();
		}
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}
		
		Y.Assert.areEqual(0,exceptions,exceptionText+" in test preparation");
		
		//Attempt to perform more backups
		//Must fail because backup folder already exists, and existing backup registry must not be modified
		for(var i = 0;i < 5; i++){
			exceptions = 0;
			try{
			manif = ds.backup(mySettings);
			}
			
			catch(e){
				exceptions++;
				exceptionText = e.message;
			}
			finally{
				lastBackups = getLastBackups();
			}
			Y.Assert.areEqual(1,exceptions,"Exception thrown: "+exceptionText);
			Y.Assert.areEqual("Folder "+backupFolderPath+" already exists.",exceptionText,"Exception mismatch");
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
			Y.Assert.areEqual(3,lastBackups.length,"getLastBackups returned array length mismatch");
		}
		
		//Then again perform backups, but clean the the backup folder.
		//This time backups shall succeed and the registry should be purged from duplicates, i.e. only
		//One entry shall be found
		for(var i = 0;i < 5; i++){
			exceptions = 0;
			try{
				mySettings.destination.remove();
				manif = ds.backup(mySettings);
				lastBackups = getLastBackups();
			}
			
			catch(e){
				exceptions++;
				exceptionText = e.message;
			}
			finally{
			}
			Y.Assert.areEqual(0,exceptions,"Exception thrown: "+exceptionText);
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isNotNull(lastBackups,"last backups NULL");
			Y.Assert.isArray(lastBackups,"getLastBackups did not return an array");
			Y.Assert.areEqual(1,lastBackups.length,"getLastBackups returned array length mismatch");
		}
    },
    testGetLastBackupsWithMissingBackupFolders: function () {
	//Tests that getLastBackups() does not throw an exception if a backup folder in the backup registry is not found
	//on the file system
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		
		//Create 1 backup with no unique names and manually create a backup registry that has 3 entries
		var lastBackups = null;
		var exceptions = 0;
		var exceptionText = "";
		mySettings.useUniqueNames = true;
		mySettings.maxRetainedBackups = 4;
		var backupFolderPath = mySettings.destination.path+"Backup_"+Date.now()+"/";
		mySettings.destination = new Folder(backupFolderPath);
		
		var manif;
		try{
			manif = ds.backup(mySettings);
			manif = ds.backup(mySettings);
			manif = ds.backup(mySettings);
			manif = ds.backup(mySettings);
		}
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}
		Y.Assert.areEqual(0,exceptions,exceptionText+" in test preparation");
		
		//Now manually remove one backup folder
		//remove the first backup folder "manually"
		var backups = getLastBackups();
		Y.Assert.areEqual(backups.length,4);
		
		var removedManifest = new File(backups[0].path);
		removedManifest.parent.remove();
		
		//Retrieve the last backups, an exception should be thrown
		var result =null;
		var exceptions = 0;
		var msg = '';
		try{
			 result = getLastBackups();
		}
		
		catch(e){
			exceptions++;
			msg = e.message;
		}
		finally{
		}
		//there should be 3 entries
		Y.Assert.isArray(result,"Not an array");
		Y.Assert.areEqual(result.length,3,"Wrong nb of entries");
		Y.Assert.areEqual(msg,'',"not the expected error message");
		Y.Assert.areEqual(exceptions,0,"getLastBackups() threw an exception");
		
		/* result must be
		[{path: manifest,dataFolder:xxx,journal:xxx,date:xxx,version:xxx},
		 {path: missingManifest},
		 ...,
		 {path: manifest,dataFolder:xxx,journal:xxx,date:xxx,version:xxx}
		 ]
		*/
		var incomplete = 0;
		var complete = 0;
		for (var i =0;i < result.length;i++){
			Y.Assert.isTrue(result[i].hasOwnProperty('path'));
			if(result[i].path === removedManifest.path){
				Y.Assert.isFalse(result[i].hasOwnProperty('dataFolder'));
				Y.Assert.isFalse(result[i].hasOwnProperty('journal'));
				Y.Assert.isFalse(result[i].hasOwnProperty('date'));
				Y.Assert.isFalse(result[i].hasOwnProperty('version'));
				incomplete++;
			}else{
				Y.Assert.isTrue(result[i].hasOwnProperty('dataFolder'));
				Y.Assert.isTrue(result[i].hasOwnProperty('journal'));
				Y.Assert.isTrue(result[i].hasOwnProperty('date'));
				Y.Assert.isTrue(result[i].hasOwnProperty('version'));
				complete++
			}
		}
		Y.Assert.areEqual(incomplete,0,"incomplete backup manifest count not correct");
		Y.Assert.areEqual(complete,3,"complete backup manifest count not correct");
    },
	testGetLastBackupsWithMissingBackupManifest: function () {
	//Tests that getLastBackups() does not throw an exception if a backup manifest the backup registry is not found
	//on the file system
		var result =null;
		var exceptions = 0;
		var mySettings = getBackupSettings();
		
		if(mySettings.backupRegistryFolder.exists)
		{
			mySettings.backupRegistryFolder.removeContent(true);
			mySettings.backupRegistryFolder.remove();
		}
		if(mySettings.destination.exists)
		{
			mySettings.destination.removeContent(true);
			mySettings.destination.remove();
		}
		
		//Setup: create a series of backups
		var lastBackups = null;
		var exceptions = 0;
		var exceptionText = "";
		mySettings.useUniqueNames = true;
		mySettings.maxRetainedBackups = 4;
		var backupFolderPath = mySettings.destination.path+"Backup_"+Date.now()+"/";
		mySettings.destination = new Folder(backupFolderPath);
		
		var manif;
		try{
			manif = ds.backup(mySettings);
			manif = ds.backup(mySettings);
			manif = ds.backup(mySettings);
			manif = ds.backup(mySettings);
		}
		catch(e){
			exceptions++;
			exceptionText = e.message;
		}
		finally{
		}
		Y.Assert.areEqual(0,exceptions,exceptionText+" in test preparation");
		
		//Now manually remove one backup manifest
		var backups = getLastBackups();
		Y.Assert.areEqual(backups.length,4);
		
		var removedManifest = new File(backups[0].path);
		removedManifest.remove();
		
		//Retrieve the last backups, no exception should be thrown
		var result =null;
		var exceptions = 0;
		var msg = '';
		try{
			 result = getLastBackups();
		}
		
		catch(e){
			exceptions++;
			msg = e.message;
		}
		finally{
		}
		
		//We created 4 backups, maxRetainedBackups is 4 so there must be 3 entries in the result
		Y.Assert.isArray(result,"Not an array");
		Y.Assert.areEqual(result.length,3,"Wrong nb of entries");
		Y.Assert.areEqual(msg,'',"not the expected error message");
		Y.Assert.areEqual(exceptions,0,"getLastBackups() threw an exception");
		
		/* result must be
		[{path: manifest,dataFolder:xxx,journal:xxx,date:xxx,version:xxx},
		 {path: missingManifest},
		 ...,
		 {path: manifest,dataFolder:xxx,journal:xxx,date:xxx,version:xxx}
		 ]
		*/
		var incomplete = 0;
		var complete = 0;
		for (var i =0;i < result.length;i++){
			Y.Assert.isTrue(result[i].hasOwnProperty('path'));
			if(result[i].path === removedManifest.path){
				Y.Assert.isFalse(result[i].hasOwnProperty('dataFolder'));
				Y.Assert.isFalse(result[i].hasOwnProperty('journal'));
				Y.Assert.isFalse(result[i].hasOwnProperty('date'));
				Y.Assert.isFalse(result[i].hasOwnProperty('version'));
				incomplete++;
			}else{
				Y.Assert.isTrue(result[i].hasOwnProperty('dataFolder'));
				Y.Assert.isTrue(result[i].hasOwnProperty('journal'));
				Y.Assert.isTrue(result[i].hasOwnProperty('date'));
				Y.Assert.isTrue(result[i].hasOwnProperty('version'));
				complete++
			}
		}
		Y.Assert.areEqual(incomplete,0,"incomplete backup manifest count not correct");
		Y.Assert.areEqual(complete,3,"complete backup manifest count not correct");
    }    
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}



