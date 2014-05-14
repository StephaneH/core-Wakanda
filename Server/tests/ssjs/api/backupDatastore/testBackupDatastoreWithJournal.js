

/**
 * Unit tests for the backupDatastore method, when a journal is enabled
 * How to generate data:
 * Create a sample application with a model containing whatever data classes you see fit
 * Create some records in your data file.
 * Copy your model to this project's WithJournal/Models model.waModel
 * Copy your data folder's content to this project WithJournal/DataFolder/
 */

var baseFolderPath = application.getFolder("path")+"WithJournal/";
var modelFolderPath = baseFolderPath+ "Models/";
var modelFile = new File(modelFolderPath+ "model.waModel"); 
var dataFolder = baseFolderPath + "DataFolder/";
var dataFilePath = baseFolderPath + "data.waData";
var dataFile = new File(dataFolder + "data.waData");
var WAK6dataFile = new File( application.getFolder("path")+"WithJournalWAK6/DataFolder/data.waData");
var WAK6modelFile = new File( application.getFolder("path")+"WithJournalWAK6/Models/model.waModel");

var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";
var nonExistingModelFile = new File(modelFolderPath + "yzyzudifsqjdj.waModel"); 
var nonExistingDataFolder = new Folder(baseFolderPath + "BogusFolder/"); 

var backupFolderContentIsValid = function(backupFolder){
	var dataFolder = Folder(backupFolder.path+"DataFolder/");
	Y.Assert.isTrue(dataFolder.exists,"Folder not found: "+dataFolder.path);
	
	var files = ["data.Match","data.waData","data.waIndx","data.WakTDef"];
	Y.Assert.areEqual(dataFolder.files.length,files.length,"Incorrect number of files in backup folder: "+dataFolder.path);
	for(var i=0;i<files.length;++i){
		var path = dataFolder.path+files[i];
		Y.Assert.isTrue(File(path).exists,"File not found: "+path);
	}
	return true;
};


var testCase = {
     name: "Test backupDataStore With Journal",
     
    _should: {
		error: {
			
		},
		ignore: {
			
			testBackupDataStoreWithNoParams: true,
			testBackupDataStoreWithNoConfig: true,
			testBackupDataStoreWithNullConfig: true,
			testBackupDataStoreWithNonExistingModel: true,
			testBackupWAK6DataStore: true,
			testBackupDataStoreWithUnspecifiedBackupRegistryFolder: true,
			testBackupDataStoreWithUnspecifiedBackupFolder: true,
			testBackupDataStoreWithValidParamsAndNonExistingDataFile: true,
			testBackupDataStoreOnClosedDataStoreWithUniqueNames: true,
			testBackupDataStoreOnClosedDataStoreWithUseUniqueNamesDefaultValue: true,
			testBackupDataStoreOnClosedDataStoreWithoutUniqueNames: true
			

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
		 
		var d = new Folder(dataFolder);
		if(!d.exists){
			d.create();
		}
    },
 
    tearDown : function () {
    },
    
    testBackupDataStoreWithNoParams: function () {
		//call backupDatastore with no params, must fail
		var result =null;
		var exceptions = 0;
		try{
			 result = backupDataStore(null, null);
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
    },
    testBackupDataStoreWithNoConfig: function () {
		//call backupDatastore with missing config, must fail
		var result =null;
		var exceptions = 0;
		try{
			 result = backupDataStore(modelFile, dataFile);
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
    },
    testBackupDataStoreWithNullConfig: function () {
		//call backupDatastore with null config, must fail
		var result =null;
		var exceptions = 0;
		try{
			 result = backupDataStore(modelFile, dataFile,null);
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
    },
    testBackupDataStoreWithNullConfig: function () {
		//call backupDatastore with null config, must fail
		var result =null;
		var exceptions = 0;
		try{
			 result = backupDataStore(modelFile, dataFile,null);
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
    },
    
    testBackupDataStoreWithUnspecifiedBackupRegistryFolder: function () {
		//call backupDatastore without specifying backupRegistryFolder, must fail
		var result =null;
		var exceptions = 0;
		var config = {
			destination:Folder(backupFolderPath),
			useUniqueNames: false
		};
		var nbFilesInBackupFolderBefore = config.destination.folders.length + config.destination.files.length;
		
		try{
			 result = backupDataStore(nonExistingModelFile , dataFile,config);
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
		var nbFilesInBackupFolderAfter = config.destination.folders.length + config.destination.files.length;
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
		//Nothing has been created in the backup folder
		Y.Assert.areEqual(nbFilesInBackupFolderAfter,nbFilesInBackupFolderBefore,"Backup folder unexpectedly modified");
		
    },
    testBackupDataStoreWithUnspecifiedBackupFolder: function () {
		//call backupDatastore without specifying backupFolder, must fail
		var result =null;
		var exceptions = 0;
		var config = {
			useUniqueNames: false,
			backupRegistryFolder:Folder(backupRegistryPath)
		};
		var nbFoldersBefore = Folder(backupFolderPath).folders.length;
		var nbFilesBefore = Folder(backupFolderPath).files.length;
		
		try{
			 result = backupDataStore(nonExistingModelFile , dataFile,config);
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
		var nbFoldersAfter = Folder(backupFolderPath).folders.length;
		var nbFilesAfter = Folder(backupFolderPath).files.length;
		
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
		//Nothing has been created in the backup folder
		Y.Assert.areEqual(nbFoldersAfter,nbFoldersBefore,"Nb of folders in backup folder have changed");
		Y.Assert.areEqual(nbFilesAfter,nbFilesBefore,"Nb of files in backup folder have changed");
    },
    testBackupWAK6DataStore: function () {
		//call backupDatastore with a valid config but for a WAK6 journalized data store, must fail
		var result =null;
		var exceptions = 0;
		var config = {
			useUniqueNames: true,
			destination:Folder(backupFolderPath),
			backupRegistryFolder:Folder(backupRegistryPath)
		};
		var nbFoldersBefore = Folder(backupFolderPath).folders.length;
		var nbFilesBefore = Folder(backupFolderPath).files.length;
		
		try{
			 result = backupDataStore(modelFile , WAK6dataFile,config);
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
		var nbFoldersAfter = Folder(backupFolderPath).folders.length;
		var nbFilesAfter = Folder(backupFolderPath).files.length;
		
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
		//Nothing has been created in the backup folder
		Y.Assert.areEqual(nbFoldersAfter,nbFoldersBefore,"Nb of folders in backup folder have changed");
		Y.Assert.areEqual(nbFilesAfter,nbFilesBefore,"Nb of files in backup folder have changed");
    },
    testBackupDataStoreWithValidParamsAndNonExistingDataFile: function () {
		//call backupDatastore with valid params but the datafile does not exists, must fail
		var result =null;
		var exceptions = 0;
		var dataFile = File(nonExistingDataFolder.path + "NotThere.waData");
		var config = {
			destination:Folder(backupFolderPath),
			useUniqueNames: false,
			backupRegistryFolder:Folder(backupRegistryPath)
		};
		try{
			 result = backupDataStore(modelFile , dataFile,config);
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
    },
	
	testBackupDataStoreOnClosedDataStoreWithUniqueNames: function () {
    	//Create a series of backup using unique names, must pass
    	
    	var tempBackupFolder = new Folder(baseFolderPath+"TempBackup/");
		var tempBackupRegistryFolder = new Folder(baseFolderPath+"TempBackupRegistry/");
		if(!tempBackupFolder.exists){
			tempBackupFolder.create();
		}else{
			tempBackupFolder.removeContent();
		}
		
		if( !tempBackupRegistryFolder.exists){
			tempBackupRegistryFolder.create();
		}else{
			tempBackupRegistryFolder.removeContent();
		}
			
		var config = {
			destination:tempBackupFolder,
			useUniqueNames: true,
			backupRegistryFolder:tempBackupRegistryFolder
		};
    			
		var exceptions = 0;
		var manifestFiles = new Array();
		var nbBackups = 5;
		var backupFoldersBefore = config.destination.folders.length;
		
		try{
			for (var i = 0; i < nbBackups;++i){
			 manifestFiles[i] = backupDataStore(modelFile, dataFile,config);
			}
			 var mystream = new TextStream( manifestFiles[nbBackups-1]);
			 var data = "";
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
		
		//No exceptions were thrown
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");

		//There should be nbBackups more folder entries inside the backup folder
		Y.Assert.areEqual(config.destination.folders.length,backupFoldersBefore + nbBackups, "Wrong count of backup folders");
		
		//The backup registry file is inside the backup registry folder
		Y.Assert.isTrue(File(config.backupRegistryFolder.path+"lastBackup.json").exists,"actual backup registry file not found");
		
		//Each backup manifest is then tested
		for( var i =0; i < nbBackups;++i){
			
			//A manifest file object has been returned
			Y.Assert.isNotNull(manifestFiles[i], "Unexpected null manifest file " + i);
			
			//The manifest file does exist
			Y.Assert.isTrue(manifestFiles[i].exists,"Actual manifest file not found "+i);
			
			//a waJournal inside the backup folder
			Y.Assert.isTrue(File(manifestFiles[i].parent.path+"journal.waJournal").exists,"Unexpected journal file found in backup "+i);
			
			//Ensure each backup sub-folder is uniquely named
			for( var j =0; j < nbBackups;++j){
				if(j != i){
					Y.Assert.areNotEqual(manifestFiles[j].parent.path,manifestFiles[i].parent.path," non-unique backup folder found: "+manifestFiles[j].parent.name );
				}
			}
			Y.Assert.isTrue(Folder(manifestFiles[i].parent.path+"DataFolder/").exists,"No data folder found in backup "+i);
			Y.Assert.isTrue(backupFolderContentIsValid(manifestFiles[i].parent),"Invalid backup folder content "+i);
		}
    },
    testBackupDataStoreOnClosedDataStoreWithUseUniqueNamesDefaultValue: function () {
    	//Create a series of backup w/o specifying useUniqueNames. 
    	//Unique names should be used, must pass
    	
    	var tempBackupFolder = new Folder(baseFolderPath+"TempBackupUseUniqueNamesDefaultValue/");
		var tempBackupRegistryFolder = new Folder(baseFolderPath+"TempBackupRegistryUseUniqueNamesDefaultValue/");
		if(!tempBackupFolder.exists){
			tempBackupFolder.create();
		}else{
			tempBackupFolder.removeContent();
		}
		
		if( !tempBackupRegistryFolder.exists){
			tempBackupRegistryFolder.create();
		}else{
			tempBackupRegistryFolder.removeContent();
		}
			
		var config = {
			destination:tempBackupFolder,
			useUniqueNames: true,
			backupRegistryFolder:tempBackupRegistryFolder
		};
    			
		var exceptions = 0;
		var manifestFiles = new Array();
		var nbBackups = 5;
		var backupFoldersBefore = config.destination.folders.length;
		
		try{
			for (var i = 0; i < nbBackups;++i){
			 manifestFiles[i] = backupDataStore(modelFile, dataFile,config);
			}
			 var mystream = new TextStream( manifestFiles[nbBackups-1]);
			 var data = "";
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
		
		//No exceptions were thrown
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");

		//There should be nbBackups more folder entries inside the backup folder
		Y.Assert.areEqual(config.destination.folders.length,backupFoldersBefore + nbBackups, "Wrong count of backup folders");
		
		//The backup registry file is inside the backup registry folder
		Y.Assert.isTrue(File(config.backupRegistryFolder.path+"lastBackup.json").exists,"actual backup registry file not found");
		
		//Each backup manifest is then tested
		for( var i =0; i < nbBackups;++i){
			
			//A manifest file object has been returned
			Y.Assert.isNotNull(manifestFiles[i], "Unexpected null manifest file " + i);
			
			//The manifest file does exist
			Y.Assert.isTrue(manifestFiles[i].exists,"Actual manifest file not found "+i);
			
			//no waJournal inside the backup folder
			Y.Assert.isTrue(File(manifestFiles[i].parent.path+"journal.waJournal").exists,"Unexpected journal file found in backup "+i);
			
			//Ensure each backup sub-folder is uniquely named
			for( var j =0; j < nbBackups;++j){
				if(j != i){
					Y.Assert.areNotEqual(manifestFiles[j].parent.path,manifestFiles[i].parent.path," non-unique backup folder found: "+manifestFiles[j].parent.name );
				}
			}
			Y.Assert.isTrue(Folder(manifestFiles[i].parent.path+"DataFolder/").exists,"No data folder found in backup "+i);
			Y.Assert.isTrue(backupFolderContentIsValid(manifestFiles[i].parent),"Invalid backup folder content "+i);
		}
    },
    
    testBackupDataStoreOnClosedDataStoreWithoutUniqueNames: function () {
    	//Regular test create a backup without unique names on a sample data store which is closed, must pass
    	
		var tempBackupFolder = new Folder(baseFolderPath+"TempBackup/");
		var tempBackupRegistryFolder = new Folder(baseFolderPath+"TempBackupRegistry/");
		if(!tempBackupFolder.exists){
			tempBackupFolder.create();
		}else{
			tempBackupFolder.removeContent();
		}
		
		if( !tempBackupRegistryFolder.exists){
			tempBackupRegistryFolder.create();
		}else{
			tempBackupRegistryFolder.removeContent();
		}
			
		var config = {
			destination:tempBackupFolder,
			useUniqueNames: false,
			backupRegistryFolder:tempBackupRegistryFolder
		};
		
		var exceptions = 0;
		var manifestFile = null;
		var manifestObject = null;
		var backupFoldersBefore = config.destination.folders.length;
		
		//Create more than 1 backup
		try{
			for (var i = 0;i < 3;++i){
			 manifestFile = backupDataStore(modelFile, dataFile,config);
			}
			
			 var mystream = new TextStream(manifestFile);
			 var data = "";
			do{	 
				data = data + mystream.read(1);
			}while(mystream.end()==false)
			mystream.close();
			manifestObject = JSON.parse(data);
		}
		catch(e){
			exceptions++;
		}
		finally{
		}
			
		//No exceptions
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");		
		//There must be a manifest file generated
		Y.Assert.isNotNull(manifestFile, "Unexpected null manifest file");
		Y.Assert.isTrue(manifestFile.exists,"Actual manifest file not found");
		Y.Assert.isTrue(File(config.backupRegistryFolder.path+"/lastBackup.json").exists,"actual backup registry file not found");
		Y.Assert.isTrue(manifestFile.parent.name != "Backups","useUniqueNames parameter ignored");
		
		//There should only be ONE FOLDER inside the backup folder: DataFolder
		var backupFoldersAfter = config.destination.folders.length;
		Y.Assert.areEqual(config.destination.folders.length,1, "Wrong count of folders in backup folder");
		Y.Assert.areEqual(config.destination.folders[0].name,"DataFolder", "'DataFolder' should be the only folder item in the backup folder");
		
		//There should only be TWO FILES inside the backup folder: the manifest and the journal
		Y.Assert.areEqual(config.destination.files.length,2, "Wrong count of files in backup folder");
		Y.Assert.areEqual(config.destination.files[0].name,"backupManifest.json", "'backupManifest.json' should be the only file item in the backup folder");
		Y.Assert.areEqual(config.destination.files[1].name,"journal.waJournal", "'backupManifest.json' should be the only file item in the backup folder");
				
		//Ensure the dataFolder in the manifest is defined and maps to an existing folder
		Y.Assert.areNotEqual(manifestObject.dataFolder,"","no backed up data folder in manifest");
		Y.Assert.isTrue(Folder(manifestObject.dataFolder).exists,"backed up data folder not found");
    }
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}

