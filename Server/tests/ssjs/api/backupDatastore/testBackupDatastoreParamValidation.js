
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


