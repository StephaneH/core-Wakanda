/**
 * Unit tests for the backupDatastore method, when a journal is enabled
 * How to generate data:
 * Create a sample application with a model containing whatever data classes you see fit
 * Create some records in your data file.
 * Copy your model to this project's WithJournal/Models model.waModel
 * Copy your data folder's content to this project WithJournal/DataFolder/
 */
function BackupReport() {
    this.warnings = [];
    this.errors = [];
};

BackupReport.prototype.addProblem = function(problem) {
    if (problem.ErrorLevel === 3) {
        this.warnings.push(problem);
    }
    else {
        this.errors.push(problem);
    }
};

var baseFolderPath = application.getFolder("path");
var modelFolderPath = baseFolderPath + "Models/";
var modelFilePath = modelFolderPath + "model.waModel";
var modelFile = new File(modelFilePath);
var dataFolder = baseFolderPath + "DataFolder/";
var dataFilePath = baseFolderPath + "data.waData";
var dataFile = new File(dataFolder + "data.waData");
var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";
var nonExistingModelFile = new File(modelFolderPath + "yzyzudifsqjdj.waModel");
var nonExistingDataFolder = new Folder(baseFolderPath + "BogusFolder/");
var nonExistingDataFile = new File(nonExistingDataFolder.path + "NotThere.waData");

var WAK6BaseFolderPath = application.getFolder("path") + "WithJournalWAK6/";
var WAK6dataFile = new File(WAK6BaseFolderPath + "DataFolder/data.waData");
var WAK6modelFile = new File(WAK6BaseFolderPath + "Models/model.waModel");
var WAK6BackupFolderPath = WAK6BaseFolderPath + "Backups/";
var WAK6BackupRegistryPath = WAK6BaseFolderPath + "Backups/";

function MySleep(delayInMs) {
    var doSleep = function() {
            exitWait();
        }
    setTimeout(doSleep, 1000);
    wait();
}

function UniqueValuesInArray(inArray) {
    for (var i = 0; i < inArray.length; i++) {
        for (var j = i + 1, k = 0; k < inArray.length - 1; k++, j++) {
            if (j >= inArray.length) {
                j = 0;
            }
            if (inArray[i].path === inArray[j].path) {
                return i;
            }
        }
    }
    return -1;
}

var createManifestObject = function(inManifestFile) {
        var mystream = null;
        var data = "";
        var object = null;
        try {
            mystream = new TextStream(inManifestFile);
            do {
                data = data + mystream.read(1);
            } while (mystream.end() == false)
            mystream.close();
            object = JSON.parse(data);
        }
        catch (e) {
            object = null;
        }
        return object;
    };

var validateBackupFolderContent_Journal = function(backupFolder) {
        var journalFile = new File(backupFolder.path + 'journal.waJournal');
        Y.Assert.isTrue(journalFile.exists, "Backed up journal not found: " + journalFile.path);
        var dataFolder = Folder(backupFolder.path + "DataFolder/");
        Y.Assert.isTrue(dataFolder.exists, "Folder not found: " + dataFolder.path);
        var files = ["data.waData", "data.waIndx", "data.WakTDef"];
        Y.Assert.areEqual(dataFolder.files.length, files.length, "Incorrect number of files in backup folder: " + dataFolder.path);
        for (var i = 0; i < files.length; ++i) {
            var path = dataFolder.path + files[i];
            Y.Assert.isTrue(File(path).exists, "File not found: " + path);
        }
        return true;
    };

var validateBackupFolderContent = function(backupFolder) {
        var dataFolder = Folder(backupFolder.path + "DataFolder/");
        Y.Assert.isTrue(dataFolder.exists, "Folder not found: " + dataFolder.path);
        var files = ["data.waData", "data.waIndx", "data.WakTDef"];
        Y.Assert.areEqual(dataFolder.files.length, files.length, "Incorrect number of files in backup folder: " + dataFolder.path);
        for (var i = 0; i < files.length; ++i) {
            var path = dataFolder.path + files[i];
            Y.Assert.isTrue(File(path).exists, "File not found: " + path);
        }
        return true;
    };

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]); // padding
};

getDateFormat = function(date) {
    date = date.substring(0, date.length - 6);
    date = date.replace("T", "_");
    date = date.replace(":", "-");
    date = date.replace(":", "-");
    return date;
};

var validateManifestProperties_config = function(inManifestObjectOrRegistryEntry,config) {
	
	//on verifie la date et le time
    Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("date"));
    Y.Assert.isTrue(new Date(inManifestObjectOrRegistryEntry.date) < new Date(), "incorrect manifest date.");
    //on verifie l'existence de la propriete datafolder
    Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("dataFolder"));
    //on verifie le contenu du datafolder
    if(config != ""){
    	if(config.destination != "undefined"){
    		if(config.useUniqueNames == false) 
    			var dataFolderPath = config.destination.path + "DataFolder/";
    		else
    			var dataFolderPath = config.destination.path + "backup_" + getDateFormat(inManifestObjectOrRegistryEntry.date) + "/DataFolder/";
    	}
	}else{
    	var dataFolderPath = backupFolderPath + "backup_" + getDateFormat(inManifestObjectOrRegistryEntry.date) + "/DataFolder/";
	}
	Y.Assert.areEqual(dataFolderPath,inManifestObjectOrRegistryEntry.dataFolder, "incorrect backup's dataFolder path.");
    Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("journal"));
    Y.Assert.areEqual(inManifestObjectOrRegistryEntry.journal, "", "incorrect journal path.");
    Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("version"));
    Y.Assert.areEqual(inManifestObjectOrRegistryEntry.version, "" + process.buildNumber, "incorrect version number.");
    Y.Assert.isTrue(Folder(inManifestObjectOrRegistryEntry.dataFolder).exists);
    if (inManifestObjectOrRegistryEntry.journal != "") {
        Y.Assert.isTrue(File(inManifestObjectOrRegistryEntry.journal).exists);
    }
    return true;
};
    
var validateManifestProperties_boucle = function(inManifestObjectOrRegistryEntry,i) {
    Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("date"));
    Y.Assert.isTrue(new Date(inManifestObjectOrRegistryEntry.date) < new Date(), "incorrect manifest date.");
    Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("dataFolder"));
    var dataFolderPath = backupFolderPath + "backup_" + getDateFormat(inManifestObjectOrRegistryEntry.date) + "/DataFolder/";;
    var b = false;
    for(var j = 1 ; j <= i ; j++){
    	if(dataFolderPath,inManifestObjectOrRegistryEntry.dataFolder == dataFolderPath)
    		{
    			b = true;
    			break;
    		}
    	dataFolderPath = backupFolderPath + "backup_" + getDateFormat(inManifestObjectOrRegistryEntry.date) + "_00" + j + "/DataFolder/";
    }
    if(!b)
    Y.Assert.fail("incorrect backup's dataFolder path.");
    Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("journal"));
    Y.Assert.areEqual(inManifestObjectOrRegistryEntry.journal, "", "incorrect journal path.");
    Y.Assert.isTrue(inManifestObjectOrRegistryEntry.hasOwnProperty("version"));
    Y.Assert.areEqual(inManifestObjectOrRegistryEntry.version, "" + process.buildNumber, "incorrect version number.");
    Y.Assert.isTrue(Folder(inManifestObjectOrRegistryEntry.dataFolder).exists);
    if (inManifestObjectOrRegistryEntry.journal != "") {
        Y.Assert.isTrue(File(inManifestObjectOrRegistryEntry.journal).exists);
    }
    return true;
};



var countManifestInRegistry = function(manifestFile, backupRegistry) {
        var occurences = 0;
        for (var i = 0; i < backupRegistry.length; i++) {
            if ((backupRegistry[i]).path === manifestFile.path) {
                occurences++;
            }
        }
        return occurences;
    };

var testCase = {
    name: "backup: coverage for regular cases with a no journaled data store",

    _should: {
        error: {

        },
        ignore: {
        testBackup_UseUniqueNames_T: true,
        testBackup_BRF: true,
        testBackup_MaxRet_all: true,
        testBackup_MaxRet_Nmbr: true,
        testBackup_UseUniqueNamesBRF_F: true,
        testBackup_UseUniqueNamesBRF_T: true,
        testBackup_UseUniqueNamesBRF_F_Nmbr: true,
        testBackup_UseUniqueNamesBRF_T_Nmbr: true
        }
    },
    setUp: function() {
        exceptions = 0;
        if (os.isWindows) {}
        else if (os.isLinux) {}
    },

    tearDown: function() {},

    testBackup_defaultSettings: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup();
            manifestObject = createManifestObject(manifestFile);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,""), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_defaultSettings_boucle: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;

        var allManifFiles = [];
        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        for (var i = 1; i < 5; i++) {
            try {
                manifestFile = ds.backup();
                allManifFiles.push(manifestFile);
                manifestObject = createManifestObject(manifestFile);
                MySleep(2010);
            }
            catch (e) {
                exceptions++;
            }
            finally {

            }
            //The manifest file should not be null
            Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
            //The manifest object should not be null
            Y.Assert.isNotNull(manifestObject, "No manifest object.");
            //The backupRegistry should not be null
            Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
            //Validate manifest properties
            Y.Assert.isTrue(validateManifestProperties_boucle(manifestObject,4), "Invalid manifest object.");
            //Check the backup folder content
            Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
            //Check the masRetainedBAckups parameter
            //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
        }
        for (var i = 0; i < allManifFiles.length; i++) {
            Y.Assert.isTrue(allManifFiles[i].exists, "Manifest file not found at round " + i);
            Y.Assert.isTrue(validateBackupFolderContent(allManifFiles[i].parent), "Invalid backup folder content at round " + i);
        }

        var duplicateIndex = UniqueValuesInArray(allManifFiles);
        Y.Assert.areEqual(-1, duplicateIndex, "Duplicate manifest file at index " + duplicateIndex);
    },
    testBackup_Destination: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
        var config = {
            destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime())
        };

        if (config.destination.exists) {
            config.destination.removeContent();
        }

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_UseUniqueNames_F: function() {
    	var isCorrectErrorMsg = false;
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
        var config = {
            useUniqueNames: false
        };

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        var backupFolder = Folder(backupFolderPath);
		var old_backupFolderLength = backupFolder.folders.length + backupFolder.files.length;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
            for(var mess = 0 ; mess < e.messages.length ; mess++){
            	if(e.messages[mess].indexOf("Folder") > -1 && e.messages[mess].indexOf("already exists") > -1)
            		isCorrectErrorMsg = true;
            }
        }
        finally {

        }
        var new_backupFolderLength = backupFolder.folders.length + backupFolder.files.length;
        //No file of folder should be created
        Y.Assert.areEqual(old_backupFolderLength, new_backupFolderLength,"No file or folder should be created.");
        //Check if the correct error message has been returned.
        Y.Assert.isTrue(isCorrectErrorMsg,"incorrect error message.");
    },
    testBackup_UseUniqueNames_T: function() {
    	var isCorrectErrorMsg = false;
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
        var config = {
            useUniqueNames: true
        };

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
        	exceptions++;
            for(var mess = 0 ; mess < e.messages.length ; mess++){
            	if(e.messages[mess].indexOf("Folder") > -1 && e.messages[mess].indexOf("already exists") > -1)
            		isCorrectErrorMsg = true;
            }
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_BRF: function() { // BRF = backup registry Folde
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
        var config = {
            backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime())
        };

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_MaxRet_all: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
        var config = {
            maxRetainedBackups: "all"
        };

        if (config.destination.exists) {
            config.destination.removeContent();
        }

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_MaxRet_Nmbr: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
        var config = {
            maxRetainedBackups: 11
        };

        if (config.destination.exists) {
            config.destination.removeContent();
        }

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_DestinationBRF: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
        var config = {
		    destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
		    backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
		    maxRetainedBackups: "all"
		};


        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_DestinationUseUniqueNames_F: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
		    useUniqueNames: false,
		    maxRetainedBackups: "all"
		};


        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_DestinationUseUniqueNames_T: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
		    useUniqueNames: true,
		    maxRetainedBackups: "all"
		};


        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_UseUniqueNamesBRF_F: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    useUniqueNames: false,
		    backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
		    maxRetainedBackups: "all"
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_UseUniqueNamesBRF_T: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    useUniqueNames: true,
		    backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
		    maxRetainedBackups: "all"
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_FullConfig_F: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
			destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
			useUniqueNames: false,
			backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
			maxRetainedBackups: "all"
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_FullConfig_T: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
		    useUniqueNames: true,
		    backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
		    maxRetainedBackups: "all"
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_DestinationBRF_Nmbr: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
		    backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
		    maxRetainedBackups: 66
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_DestinationUseUniqueNames_F_Nmbr: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
		    useUniqueNames: false,
		    maxRetainedBackups: 66
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_DestinationUseUniqueNames_T_Nmbr: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
		    useUniqueNames: true,
		    maxRetainedBackups: 66
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_UseUniqueNamesBRF_F_Nmbr: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    useUniqueNames: false,
		    backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
		    maxRetainedBackups: 66
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_UseUniqueNamesBRF_T_Nmbr: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    useUniqueNames: true,
		    backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
		    maxRetainedBackups: 66
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_FullConfig_F_Nmbr: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
		    useUniqueNames: false,
		    backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
		    maxRetainedBackups: 66
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    },
    testBackup_FullConfig_T_Nmbr: function() {
        //Calls backup with default config
        var manifestFile = null;
        var exceptions = 0;
		var config = {
		    destination: Folder(baseFolderPath + "destination_" + (new Date()).getTime()),
		    useUniqueNames: true,
		    backupRegistryFolder: Folder(baseFolderPath + "registryFolder_" + (new Date()).getTime()),
		    maxRetainedBackups: 66
		};

        var manifestFile = null;
        var manifestObject = null;

        manifestFile = null;
        manifestObject = null;
        try {
            manifestFile = ds.backup(config);
            manifestObject = createManifestObject(manifestFile);
            MySleep(1010);
        }
        catch (e) {
            exceptions++;
        }
        finally {

        }
        //The manifest file should not be null
        Y.Assert.isNotNull(manifestFile, "No manifest file returned.");
        //The manifest object should not be null
        Y.Assert.isNotNull(manifestObject, "No manifest object.");
        //The backupRegistry should not be null
        Y.Assert.isNotNull(getBackupRegistry(new Folder(backupFolderPath)), "Null backup registry.");
        //Validate manifest properties
        Y.Assert.isTrue(validateManifestProperties_config(manifestObject,config), "Invalid manifest object.");
        //Check the backup folder content
        Y.Assert.isTrue(validateBackupFolderContent(manifestFile.parent), "Invalid backup folder content.");
        //Check the masRetainedBAckups parameter
        //Y.Assert.isTrue(config.maxRetainedBackups >= getBackupRegistry(config.backupRegistryFolder).length,"Mismatch between maxRetainedBackups and registry size at round "+i);
    }
}