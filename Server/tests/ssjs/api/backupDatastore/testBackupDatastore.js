
/**
 * Unit tests for the backupDatastore method
 */
/*
var baseFolderPath = application.getFolder("path")+"NoJournal/";
var modelFolderPath = baseFolderPath+ "Models/";
var modelFilePath = modelFolderPath+ "model.waModel"; 
var modelFile = new File(modelFilePath); 
var dataFolder = baseFolderPath + "DataFolder/";
var dataFilePath = baseFolderPath + "data.waData";
var dataFile = new File(dataFolder + "data.waData");
var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";
var nonExistingModelFile = new File(modelFolderPath + "yzyzudifsqjdj.waModel"); 
var nonExistingDataFolder = new Folder(baseFolderPath + "BogusFolder/"); 
var nonExistingDataFile = new File(nonExistingDataFolder.path + "NotThere.waData");

var createManifestObject = function(inManifestFile){
	var mystream = null;
	var data = "";
	var object = null;
	try{
		mystream =new TextStream(inManifestFile);
		do{	 
			data = data + mystream.read(1);
		}while(mystream.end()==false)
		mystream.close();
		object = JSON.parse(data);
	}
	catch(e){
		object = null;
	}
	return object;
};

var validateBackupFolderContent = function(backupFolder){
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

var validateManifestProperties = function(inManifestObjectOrRegistryEntry){
	Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("dataFolder"));
	Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("journal"));
	Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("date"));
	Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("version"));
	
	Y.Assert.isTrue(Folder(inManifestObjectOrRegistryEntry.dataFolder).exists);
	
	if(inManifestObjectOrRegistryEntry.journal != ""){
		Y.Assert.isTrue(File(inManifestObjectOrRegistryEntry.journal).exists);
	}
	
	return true;
};

var countManifestInRegistry= function(manifestFile,backupRegistry){
	var occurences = 0;
	for(var i = 0; i < backupRegistry.length;i++){
		if ((backupRegistry[i]).path===manifestFile.path){
			occurences++;
		}
	}
	return occurences;
}

var testCase = {
     name: "backupDataStore: coverage for regular cases",
     
    _should: {
		error: {
			
		},
		ignore: {
			testBackupDataStoreWithUseUniqueNames: false,
			testBackupDataStoreWithNonUniqueNames: false
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
    
    testBackupDataStoreWithUseUniqueNames: function () {
		//Calls backupDataStore with a config that shall use unique names
		//In this configuration each backup (and manifest), should be stored in a particular folder
		//After several backups are created the various files should still be available.
		var manifestFile =null;
		var exceptions = 0;
		var config = {useUniqueNames:true,
		destination:Folder(backupFolderPath),
		backupRegistryFolder: Folder(backupRegistryPath)
		};
		
		
		if (config.destination.exists){
			config.destination.removeContent();
		}
		
		if (config.backupRegistryFolder.exists){
			config.backupRegistryFolder.removeContent();
		}
		
		
		var nbFoldersBefore = 0,nbFoldersAfter = 0;
		var nbFilesBefore = 0, nbFilesAfter = 0;
		var backupRegistryEntriesBefore = 0, backupRegistryEntriesAfter = 0;
		var manifestObject = null;
		var resultingManifests = [];
		
		if(Folder(backupFolderPath).exists)
		{
			nbFoldersBefore = Folder(backupFolderPath).folders.length;
			nbFilesBefore = Folder(backupFolderPath).files.length;
		}
		
		var noBackupRegistry = true;
		if( getBackupRegistry(config.backupRegistryFolder) != null){
			backupRegistryEntriesBefore = (getBackupRegistry(config.backupRegistryFolder)).length;
			noBackupRegistry = false;
		}
		
		var nbBackups = 25;
		for(var i= 1; i <= nbBackups; i++){
			
			try{
				 manifestFile = backupDataStore(modelFile,dataFile,config);
				 manifestObject = createManifestObject(manifestFile);
				 backupRegistryEntriesAfter = (getBackupRegistry(config.backupRegistryFolder)).length;
				 resultingManifests[i-1] = manifestFile.path;
			}
			
			catch(e){
				exceptions++;
			}
			finally{
				nbFoldersAfter = Folder(backupFolderPath).folders.length;
				nbFilesAfter = Folder(backupFolderPath).files.length;
			}

			//No exception should have occured
			Y.Assert.areEqual(0,exceptions,"backupDataStore threw an exception");

			//A manifest has been produced
			Y.Assert.isNotNull(manifestFile,"No manifest file produced");
			Y.Assert.isNotNull(manifestObject,"No manifest object available");

			

			//that manifest is valid
			Y.Assert.isTrue(validateManifestProperties(manifestObject),"Manifest is not valid");
			
			//That manifest file must be present only once in the registry
			Y.Assert.areEqual(1,countManifestInRegistry(manifestFile,getBackupRegistry(config.backupRegistryFolder)),"Unexpected duplicates found for manifest "+i);

			
			if (noBackupRegistry){
				//if there was no backup registry then it has been created
				noBackupRegistry = false;
				Y.Assert.areEqual(nbFilesAfter,nbFilesBefore+1,"file count did not change in backup folder");
				nbFilesBefore++;
				Y.Assert.isNotNull(getBackupRegistry(config.backupRegistryFolder));
			}
			else{
				
				Y.Assert.areEqual(nbFilesAfter,nbFilesBefore,"file count changed in backup folder");
			}
			
			//there is one more folder inside the backup folder
			Y.Assert.areEqual(nbFoldersBefore+i,nbFoldersAfter,"invalid folder count in backup folder");
			Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent),"backup folder content is invalid");
			
			//There is one more entry inside the backup registry and 20 entries MAX
			if (i>20)
			{
				Y.Assert.areEqual(20,backupRegistryEntriesAfter,"Wrong Max # of entries in backup registry");
			}
			else
			{
				Y.Assert.areEqual(backupRegistryEntriesBefore+i,backupRegistryEntriesAfter,"Wrong # of entries in backup registry");
			}
		}
		
		
		
		//Second step, for all collected manifests, ensure the manifest exists
		//and that the manifest is valid, along with the related backup data
		if (nbBackups>20){
			Y.Assert.areEqual(20,getBackupRegistry(config.backupRegistryFolder).length,"Postcheck: Wrong Max # of entries in backup registry");
		}
		else{
			Y.Assert.areEqual(nbBackups,getBackupRegistry(config.backupRegistryFolder).length,"Postcheck: Wrong # of entries in backup registry");
		}
		
		Y.Assert.areEqual(nbBackups,resultingManifests.length,"Postcheck: Wrong # collected manifests");
		
		//Backup registry should have at most 20 entries
		Y.Assert.isTrue(20>= getBackupRegistry(config.backupRegistryFolder).length,"More than 20 entries in registry");
		
		
		for(var i= 0; i < nbBackups; i++){
			var manifFile = new File(resultingManifests[i]);
			var manifObj = manifestObject = createManifestObject(manifFile);
			Y.Assert.isNotNull(manifestObject,"Postcheck: No manifest object available");
			Y.Assert.isTrue(validateManifestProperties(manifestObject),"Postcheck: Manifest is not valid");
			Y.Assert.isTrue(validateBackupFolderContent(manifFile.parent),"Postcheck: backup folder content is invalid");
		}
    },
    testBackupDataStoreWithNonUniqueNames: function () {
		//Calls backupDataStore with a config that mandates not using unique names, and 
		//always using  the same destination.
		//In this configuration the manifest file will overwrite the previous one, and in the 
		//the registry there shall only be one entry for that manifest file
		var manifestFile =null;
		var exceptions = 0;
		var config = {useUniqueNames:false,
			destination:Folder(backupFolderPath),
			backupRegistryFolder: Folder(backupRegistryPath)
		};
		
		var manifestObject = null;

		for(var i= 1; i <= 5; i++){
			
			try{
				 manifestFile = backupDataStore(modelFile,dataFile,config);
				 manifestObject = createManifestObject(manifestFile);
				 backupRegistryEntriesAfter = (getBackupRegistry(config.backupRegistryFolder)).length;
			}
			
			catch(e){
				exceptions++;
			}
			finally{
			}

			//No exception should have occured
			Y.Assert.areEqual(0,exceptions,"backupDataStore threw an exception");

			//A manifest has been produced
			Y.Assert.isNotNull(manifestFile,"No manifest file produced");
			
			//that manifest is valid
			Y.Assert.isNotNull(manifestObject,"No manifest object available");
			Y.Assert.isTrue(validateManifestProperties(manifestObject),"Manifest is not valid");
			
			//The backup content is valid
			Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent),"backup folder content is invalid");
			
			//That manifest file must be present only once in the registry
			Y.Assert.areEqual(1,countManifestInRegistry(manifestFile,
				getBackupRegistry(config.backupRegistryFolder)),
				"Duplicate entry found for manifest " + i );
		}
		
		//Postcheck, the backup registry shall have 20 etnries Max
		Y.Assert.isTrue(20>= getBackupRegistry(config.backupRegistryFolder).length,"More than 20 entries in registry");
    }
    
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}
*/

/**
 * Unit tests for the backupDatastore method
 */
var baseFolderPath = application.getFolder("path")+"NoJournal/";
var modelFolderPath = baseFolderPath+ "Models/";
var modelFilePath = modelFolderPath+ "model.waModel"; 
var modelFile = new File(modelFilePath); 
var dataFolder = baseFolderPath + "DataFolder/";
var dataFilePath = baseFolderPath + "data.waData";
var dataFile = new File(dataFolder + "data.waData");
var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";
var nonExistingModelFile = new File(modelFolderPath + "yzyzudifsqjdj.waModel"); 
var nonExistingDataFolder = new Folder(baseFolderPath + "BogusFolder/"); 
var nonExistingDataFile = new File(nonExistingDataFolder.path + "NotThere.waData");



//Set of parameters that should cause backupDataStore to fail
var incorrectParametersSets = [
	{
		modelFileParam:null,
		dataFileParam:null,
		configParam:null
	},
	{
		modelFileParam:"",
		dataFileParam:null,
		configParam:null
	},
	{
		modelFileParam:null,
		dataFileParam:"",
		configParam:null
	},
	{
		modelFileParam:modelFilePath,
		dataFileParam:"",
		configParam:null
	},
	{
		modelFileParam:"",
		dataFileParam:dataFilePath,
		configParam:null
	},
	{
		modelFileParam:"",
		dataFileParam:dataFilePath,
		configParam:{}
	},
	{
		modelFileParam:nonExistingModelFile,
		dataFileParam:null,
		configParam:{}
	},
	{
		modelFileParam:nonExistingModelFile,
		dataFileParam:"",
		configParam:{}
	},
	{
		modelFileParam:nonExistingModelFile,
		dataFileParam:nonExistingDataFile,
		configParam:{}
	}
];


//Set of backup configurations which are missing a property, they should cause
//backupDataStore to throw an exception
//The exceptionText property contains the expected exception message to automate testing
var backupConfigsWithMissingProperties= [
	{
		exceptionText:"Backup configuration property 'destination' not found"
	}, //empty config
	{
		exceptionText:"Backup configuration property 'destination' not found",
		useUniqueNames: true,
		backupRegistryFolder:Folder(backupRegistryPath)
	},
	{
		exceptionText:"Backup configuration property 'destination' not found",
		backupRegistryFolder:Folder(backupRegistryPath)
	},
	
	{
		exceptionText:"Backup configuration property 'destination' not found",
		useUniqueNames: true
	},
	{
		exceptionText:"Backup configuration property 'backupRegistryFolder' not found",
		destination:Folder(backupFolderPath),
		useUniqueNames: true
	},
	{
		exceptionText:"Backup configuration property 'backupRegistryFolder' not found",
		destination:Folder(backupFolderPath)
	},
	{
		exceptionText:"Backup configuration property 'useUniqueNames' not found",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:Folder(backupRegistryPath)
	}
];

//Set of backup complete configurations with some properties being incorrectly typed.
//They should cause
//backupDataStore to throw an exception
//The exceptionText property contains the expected exception message to automate testing
var backupConfigsWithInvalidPropertyTypes= [
	//Those configurations have all required properties but they don't have a proper type
	{
		exceptionText:"Invalid type for Backup configuration property 'destination', Folder expected",
		destination:backupFolderPath, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'destination', Folder expected",
		destination:"", //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'destination', Folder expected",
		destination:true, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'destination', Folder expected",
		destination:12, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'destination', Folder expected",
		destination:null, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'destination', Folder expected",
		destination:{foo:"bar"}, //should be a folder
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:"",
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:backupRegistryPath,
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:null,
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:42,
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:true,
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:'',
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'backupRegistryFolder', Folder expected",
		destination:Folder(backupFolderPath),
		backupRegistryFolder:{foo:"barr"},
		useUniqueNames: true
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: "true"
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: "false"
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: {foo:true}
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: null
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: 42
	},
	{
		exceptionText:"Invalid type for Backup configuration property 'useUniqueNames', bool expected",
		destination:Folder(backupFolderPath), 
		backupRegistryFolder:Folder(backupRegistryPath),
		useUniqueNames: 0
	}
];

var testCase = {
     name: "backupDataStore: Parameters validation coverage",
     
    _should: {
		error: {
			
		},
		ignore: {
			testBackupDataStoreFailsWithNoParams: false,
			testBackupDataFailsWithIncorrectParameters: false,
			testBackupDataStoreRejectsConfigWithMissingProperties: false,
			testBackupDataStoreRejectsConfigWithInvalidPropertyTypes: false
			
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
			 result = backupDataStore();
		}
		
		catch(e){
			exceptions++;
		}
		finally{
		}
		//No manifest should be generated
		Y.Assert.isNull(result,"Unexpected manifest file");
		//No exception should have occured
		Y.Assert.areEqual(1,exceptions,"backupDataStore threw an exception");
    },

	testBackupDataFailsWithIncorrectParameters: function () {
   	
    	var i=0;
    	var result =null;
		var exceptions = 0;
		var exceptionText = "";
    	for(i =0;i < incorrectParametersSets.length;i++){
    		result =null;
			exceptions = 0;
			exceptionText = "";
			var params = incorrectParametersSets[i];
			
			Y.Assert.isTrue(params.hasOwnProperty("modelFileParam"));
			Y.Assert.isTrue(params.hasOwnProperty("dataFileParam"));
			Y.Assert.isTrue(params.hasOwnProperty("configParam"));
			
			try{
				result = backupDataStore(params.modelFileParam, params.dataFileParam,params.configParam);
			}
			
			catch(e){
				exceptions++;
				exceptionText = e.message;
			}
			finally{
			}
			//No manifest should be generated
			Y.Assert.isNull(result,"Unexpected manifest file for config "+i);
			//No exception should have occured
			Y.Assert.areEqual(exceptions,1,"No exception thorwn fro config "+i);
    	}
    },
 
 	testBackupDataStoreRejectsConfigWithMissingProperties: function () {
    	var i=0;
    	for(i =0;i < backupConfigsWithMissingProperties.length;i++){
    		var result =null;
			var exceptions = 0;
			var exceptionText = "";
			var config = backupConfigsWithMissingProperties[i];
			try{
				result = backupDataStore(modelFile, dataFile,config);
			}
			
			catch(e){
				exceptions++;
				exceptionText = e.message;
			}
			finally{
			}
			//No manifest should be generated
			Y.Assert.isNull(result,"Unexpected manifest file for config "+i);
			//No exception should have occured
			Y.Assert.areEqual(exceptions,1,"No exception thorwn fro config "+i);
			Y.Assert.areEqual(config.exceptionText,exceptionText,"Exception mismatch for config "+i);  		
    	}
    },
    testBackupDataStoreRejectsConfigWithInvalidPropertyTypes: function () {
    	var i=0;
    	for(i =0;i < backupConfigsWithInvalidPropertyTypes.length;i++){
    		var result =null;
			var exceptions = 0;
			var exceptionText = "";
			var config = backupConfigsWithInvalidPropertyTypes[i];
			try{
				result = backupDataStore(modelFile, dataFile,config);
			}
			
			catch(e){
				exceptions++;
				exceptionText = e.message;
			}
			finally{
			}
			//No manifest should be generated
			Y.Assert.isNull(result,"Unexpected manifest file for config "+i);
			//No exception should have occured
			Y.Assert.areEqual(exceptions,1,"No exception thorwn fro config "+i);
			Y.Assert.areEqual(config.exceptionText,exceptionText,"Exception mismatch for config "+i);  		
    	}
    }
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}







