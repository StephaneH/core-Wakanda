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
    ///// Compatibility test: support for old syntax restoreDataStore(File: manifest,Folder: restoreDest)
   	//Test that restore folder must be specified. Must fail
   	testRestoreDataStoreNoRestoreFolder: function () {
    	var result =null;
		var exceptions = 0; var exceptionMsg ='';
		var manifest = new File(backupRegistryPathNoJournal + "backup_2012-10-23_19-54-51/backupManifest.json");
		try{
			 result = restoreDataStore(manifest);
		}
		catch(e){
			exceptions++; exceptionMsg = e.message;
		}
		finally{
			Y.Assert.isNull(result,"result should be defined");
			Y.assert(exceptions>0,"restoreDataStore should have thrown an exception");
			Y.Assert.areEqual(exceptionMsg,'Wrong type for parameter #2, expected Folder or String.')
		}
   	},
   	//Test that manifest path be specified only as File or String. Must fail
   	testRestoreDataStoreFormerSyntaxCoverage: function () {
    	var result =null;
		var exceptions = 0; var exceptionMsg ='';
		var manifest = backupRegistryPathNoJournal + "backup_2012-10-23_19-54-51/backupManifest.json";
		var validArgs=[
			{manif:File(manifest),destFolder:Folder(restoreFolder)}
			,{manif:manifest,destFolder:restoreFolder}
			,{manif:File(manifest),destFolder:restoreFolder}
			,{manif:manifest,destFolder:Folder(restoreFolder)}
		];
		var f = Folder(restoreFolder);
		for(var i=0; i<validArgs.length;i++){
			exceptions = 0; 
			exceptionMsg = '';
			result =null;
			if(f.exists){
    			f.removeContent();
    		}
			try{
			 	result = restoreDataStore(validArgs[i].manif,validArgs[i].destFolder);
			 	//MySleep(1000); //otherwise one argument is recognized as undefined...
			}
			catch(e){
				exceptions++; exceptionMsg = e.message;
			}
			Y.Assert.isNotNull(result,"result should be defined for config "+i);
			Y.Assert.areEqual(0,exceptions,"unexpected exception for config "+i);
			
		}
   	},
   	testRestoreDataStoreWithUnreachableFolder: function () {
    	var result =null;
		var exceptions = 0; var exceptionMsg ='';
		var manifest = backupRegistryPathNoJournal + "backup_2012-10-23_19-54-51/backupManifest.json";
		var destFolder;
		destFolder = new Folder("/Data/ShouldNotBeThere/");
    	
		try{
			 result = restoreDataStore(manifest,destFolder);
			 result = restoreDataStore(manifest,destFolder.path);
		}
		catch(e){
			exceptions++; exceptionMsg = e.message;
		}
		finally{
			Y.Assert.isNull(result,"result should be defined");
			Y.assert(exceptions>0,"restoreDataStore should have thrown an exception");
		}
   	},
   	
   	//Test restore with valid parameter, no journal in backup. Must pass
   	testRestoreDataStoreNoJournal: function () {
    	var result =null;
		var exceptions = 0; var exceptionMsg ='';
		
		var backupFolder = new Folder(backupRegistryPathNoJournal);
		Y.Assert.isTrue(backupFolder.folders.length >= 1,"No backup folders found");
		
		var manifest = new File(backupFolder.folders[0].path + "backupManifest.json");
		var destFolder = new Folder(restoreFolder);
		try{
			//restoreFolder is a string
			 result = restoreDataStore(manifest,destFolder);
		}
		catch(e){
			exceptions++; exceptionMsg = e.message;
		}
		
		Y.Assert.isNotNull(result,"result should be defined");
		Y.Assert.isTrue(exceptions == 0,"restoreDataStore should have thrown an exception");
		Y.Assert.isTrue(File(restoreFolder + "DataFolder/data.waData").exists,"no restored data file found");
		Y.Assert.isFalse(File(restoreFolder + "journal.waJournal").exists,"unexpected journal found");
   	},
   	//Test restore with valid parameter, with journal in backup. Must pass
   	testRestoreDataStoreWithJournal: function () {
    	var result =null;
		var exceptions = 0; var exceptionMsg ='';
		var backupFolder = new Folder(backupRegistryPathWithJournal);
		Y.Assert.isTrue(backupFolder.folders.length >= 1,"No backup folders found");
		var manifest = new File(backupFolder.folders[0].path + "backupManifest.json");
		
		try{
			//restoreFolder is a string
			 result = restoreDataStore(manifest,Folder(restoreFolder));
		}
		catch(e){
			exceptions++; exceptionMsg = e.message;
		}
		Y.Assert.isNotNull(result,"result should be defined");
		Y.Assert.isTrue(result.ok,"result.ok mismatch");
		Y.assert(exceptions == 0,"restoreDataStore should have thrown an exception");
		Y.Assert.isTrue(File(restoreFolder + "DataFolder/data.waData").exists,"no restored data file found");
		Y.Assert.isTrue(File(restoreFolder + "journal.waJournal").exists,"expected journal not found");
   	},
   	//Test combination of ds.backup() and restoreDataStore. Must pass
   	testRestoreDataStoreAfterDsDotBackup: function () {
    	var result =null;
		var exceptions = 0; var exceptionMsg ='';
		var manifest = null;
		try{
			//restoreFolder is a string
			manifest = ds.backup();
			result = restoreDataStore(manifest,Folder(restoreFolder));
		}
		catch(e){
			exceptions++; exceptionMsg = e.message;
		}
		finally{
			//manifest must be a valid object
			Y.Assert.isNotNull(manifest,"manifest should be defined");
			Y.Assert.isObject(manifest,"manifest should be an object");
			
			//result should be {ok: true}
			Y.Assert.isNotNull(result,"result should be defined");
			Y.Assert.isTrue(result.ok,"result.ok mismatch");
			
			//no exception thrown, a DataFolder folder is found in the restore folder and no journal is there
			//since this database is not journaled
			Y.assert(exceptions == 0,"restoreDataStore should have thrown an exception");
			Y.Assert.isTrue(Folder(restoreFolder + "DataFolder").exists,"expected restored data folder not found");
			Y.Assert.isFalse(File(restoreFolder + "journal.waJournal").exists,"unexpected journal found");
		}
	}
};

if (typeof dontRequireUnitTestModule === 'undefined'){
	require("unitTest").run(testCase).getReport();
}

