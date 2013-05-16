var baseFolder = application.getFolder("path");
var modelFolderPath = baseFolder+ "TestModels/";
var dataFolder = baseFolder + "TestDataFolder/";
var backupFolderFolder = baseFolder + "Backups/";
var booksModelFile = new File(baseFolder + "TestModels/books.waModel"); 
var nonExistingModelFile = new File(baseFolder + "TestModels/FatChanceToFindMe.waModel"); 
var nonExistingDataFolder = new Folder(baseFolder + "BogusFolder/"); 


var testCase = {
     name: "Test backupDataStore",
     
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
		
		var d = new Folder(dataFolder);
		if(!d.exists){
			d.create();
		}
    },
 
    tearDown : function () {
    },
    
    testBackupDataStoreParamHandling1: function () {
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
    testBackupDataStoreParamHandling2: function () {
		//call backupDatastore with missing config, must fail
		var result =null;
		var exceptions = 0;
		var dataFile = File(dataFolder + "books1.waData");
		try{
			 result = backupDataStore(booksModelFile, dataFile);
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
    testBackupDataStoreParamHandling3: function () {
		//call backupDatastore with null config, must fail
		var result =null;
		var exceptions = 0;
		var dataFile = File(dataFolder + "books1.waData");
		try{
			 result = backupDataStore(booksModelFile, dataFile,null);
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
    testBackupDataStoreParamHandling4: function () {
		//call backupDatastore with valid params but the model does not exists, must fail
		var result =null;
		var exceptions = 0;
		var dataFile = File(dataFolder + "books1.waData");
		var config = {
			destination:Folder(baseFolder + "Backups/Test1/"),
			useUniqueNames: false,
			//backupRegistryFolder:Folder("C:/Users/wakandaDev3/Desktop/SimpleFolder/")
			backupRegistryFolder:Folder(baseFolder+ "Backups/Test1/")
		};
		try{
			 result = backupDataStore(nonExistingModelFile , dataFile,config);
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
    testBackupDataStoreParamHandling5: function () {
		//call backupDatastore with valid params but the datafile does not exists, must fail
		var result =null;
		var exceptions = 0;
		var dataFile = File(nonExistingDataFolder.path + "NotThere.waData");
		var config = {
			destination:Folder(baseFolder + "Backups/Test1/"),
			useUniqueNames: false,
			backupRegistryFolder:Folder(baseFolder+ "Backups/Test1/")
		};
		try{
			 result = backupDataStore(booksModelFile , dataFile,config);
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
    
      
	testBackupDataStoreOnOpenedDataStore: function () {
    	//Call backupDataStore on an opened data store, must fail
		var config = {
			destination:Folder(baseFolder + "Backups/Test1/"),
			useUniqueNames: false,
			//backupRegistryFolder:Folder("C:/Users/wakandaDev3/Desktop/SimpleFolder/")
			backupRegistryFolder:Folder(baseFolder+ "Backups/Test1/")
		};
		
		var dataFile = File(dataFolder + "books1.waData");
		var i = 1;
		while(dataFile.exists && i < 500)
		{
			i++;
			dataFile = File(dataFolder + "books" + i + ".waData");
		}
		var myDS = createDataStore(booksModelFile, dataFile);
		Y.Assert.isNotNull(myDS);
		var exceptions = 0;
		var result = 0;
		try{
			 result = backupDataStore(booksModelFile, dataFile,config);
		}
		catch(e){
			exception++;
		}
		finally{
			myDS.close();
		}
		
		//No manifest should be generated
		Y.Assert.isNull(result);
		//No exception should have occured
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
    },
	
	testBackupDataStoreOnClosedDataStore: function () {
    	//create a datastore, close it, then call backupDataStore on an opened data store, must pass
		var config = {
			destination:Folder(baseFolder + "Backups/Test1/"),
			useUniqueNames: false,
			backupRegistryFolder:Folder(baseFolder+ "Backups/Test1/")
		};
		
		var dataFile = File(dataFolder + "books1.waData");
		var i = 1;
		while(dataFile.exists && i < 500)
		{
			i++;
			dataFile = File(dataFolder + "books" + i + ".waData");
		}
		var myDS = createDataStore(booksModelFile, dataFile);
		Y.Assert.isNotNull(myDS);
		myDS.close();
		
		var exceptions = 0;
		var manifestFile = null;
		var manifestObject = null;
		try{
			 manifestFile = backupDataStore(booksModelFile, dataFile,config);
			 var mystream = new TextStream(manifestFile);
			 var data = "";
			do	{	 
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
		//There must be a manifest file generated
		Y.Assert.isNotNull(manifestFile);
		Y.Assert.isTrue(manifestFile.exists);
		
		//No exceptions
		Y.Assert.areEqual(exceptions,0,"backupDataStore threw an exception");
		
		//No journal must be defined in the manifest (impossible to open journal with the createDataStore API)
		Y.Assert.areEqual(manifestObject.journal,"","No journal should be defined");
		
		//Ensure the dataFolder in the manifest is defined and maps to an existing folder
		Y.Assert.areNotEqual(manifestObject.dataFolder,"","no backed up data folder in manifest");
		Y.Assert.isTrue(Folder(manifestObject.dataFolder).exists,"backed up data folder not found");
    }
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}
