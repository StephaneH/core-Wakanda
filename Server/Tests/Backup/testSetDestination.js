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
var testCase = {
    name: "SSJS BackupSettings API",
    
    _should: {
		error: {
			testSetDestinationFailsWithZeroParams : true,
			testSetDestinationFailsWithFilePath: true,
			testSetDestinationFailsWithRelativeFilePath: true,
			testSetDestinationFailsWithRelativeFolderPath: true,
			testSetDestinationFailsWithFileObject: true,
			testSetDestinationFailsNonFileUrl: true,
			testSetDestinationFailsWithLocalFileUrlThatLeadsToFile: true,
			testSetDestinationFailsWithLocalHostFileUrlThatLeadsToFile: true,
			testSetDestinationFailsWithLocalHostIPFileUrlThatLeadsToFile: true,
			testSetDestinationFailsWithNonLocalFileUrlThatLeadsToFolder: true,
    		testSetDestinationFailsWithNonLocalFileUrlThatLeadsToFile: true
		},
		ignore: {
			//file:// url handling in VUrl does not behave properly when clearing localhost
			// name/address from network part of URL, it returns a // at beginning of
			//path which causes these two tests to fail
			testSetDestinationOkWithFileLocalHostIPUrlLeadingToLocalFolder: true,
			testSetDestinationOkWithFileLocalHostUrlLeadingToLocalFolder: true
		}
    },
    
    setUp : function () {
    	/*
    	if (os.isWindows) {
    	}
    	if (os.isLinux) {
    	}
    	*/
    },
 
    tearDown : function () {

    },

    //1- Class Backup exist
    testClassBackupSettingsExists: function () {
    	var obj = new BackupSettings();
		Y.Assert.isObject(obj);
		Y.Assert.isInstanceOf(Object,obj);
    },
    
    //2- object of instance BackupSettings() exists in global application object
    testObjectBackupSettingsExistsInApplicationObject: function () {
        var backupSettings = application.backupSettings;
		Y.Assert.isNotNull(application);
		Y.Assert.isNotNull(backupSettings);
		Y.Assert.isInstanceOf(Object,backupSettings);
    },
    
    //3- setDestination returns false if no param supplied
    testSetDestinationFailsWithZeroParams: function () {
        var backupSettings = new BackupSettings();
        backupSettings.setDestination();
    },
	
	//4- setDestination returns false if set with file path
    testSetDestinationFailsWithFilePath: function () {
		var filePath = application.getFolder("path") + 'Dummy';
        var backupSettings = new BackupSettings();
		backupSettings.setDestination(filePath);
    },
    
    //4.1- setDestination fails if called with a File object
    testSetDestinationFailsWithFileObject: function () {
    	var fileObj = new File(application.getFolder("path") + 'Dummy');
        var backupSettings = new BackupSettings();
		backupSettings.setDestination(fileObj);
    },
    
    //5- setDestination returns false if set with relative file path
    testSetDestinationFailsWithRelativeFilePath: function () {
        var backupSettings = new BackupSettings();
		backupSettings.setDestination('../Parent/file');
    },
    
    //5.1- setDestination returns false if set with URL that is not file://
    testSetDestinationFailsNonFileUrl: function () {
        var backupSettings = new BackupSettings();
  		backupSettings.setDestination('http://www.google.com/myDrivePunkAss/');
    },
    
    //5.2- setDestination returns false if set with local file:// URL that maps to a file
    testSetDestinationFailsWithLocalFileUrlThatLeadsToFile: function () {
        var backupSettings = new BackupSettings();
        var url = 'file:///'+application.getFolder("path")+'Dummy';
        backupSettings.setDestination(url);
    },
    testSetDestinationFailsWithLocalHostFileUrlThatLeadsToFile: function () {
        var backupSettings = new BackupSettings();
        var url = 'file://localhost/'+application.getFolder("path")+'Dummy';
        backupSettings.setDestination(url);
    },
    testSetDestinationFailsWithLocalHostIPFileUrlThatLeadsToFile: function () {
        var backupSettings = new BackupSettings();
        var url = 'file://127.0.0.1/'+application.getFolder("path")+'Dummy';
        backupSettings.setDestination(url);
    },
    //5.3- setDestination returns false if set with non-local file:// URL that maps to a file
    testSetDestinationFailsWithNonLocalFileUrlThatLeadsToFile: function () {
        var backupSettings = new BackupSettings();
        var url = 'file://192.168.0.12/'+application.getFolder("path")+'Dummy';
        backupSettings.setDestination(url);
    },
    //5.4- setDestination returns false if set with non-local file:// URL that maps to a file
    testSetDestinationFailsWithNonLocalFileUrlThatLeadsToFolder: function () {
        var backupSettings = new BackupSettings();
        var url = 'file://192.168.0.12/'+application.getFolder("path")+'MyDummyFolder/';
        backupSettings.setDestination(url);
    },
	
	//6- setDestination returns false if set with relative folder path
    testSetDestinationFailsWithRelativeFolderPath: function () {
        var backupSettings = new BackupSettings();
		backupSettings.setDestination('../Parent/');
    },
	
	//7- setDestination succeeds when set with absolute folder path
	testSetDestinationOkWithAbsoluteFolderPath: function () {
		var path = application.getFolder("path") + 'Backup/';
        var backupSettings = new BackupSettings();
		backupSettings.setDestination(path);
		var result = backupSettings.destination;
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,path);
    },
	
	//8- setDestination succeeds when set with Folder object
	testSetDestinationOkWithAbsoluteFolderPath1: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var backupSettings = new BackupSettings();
		backupSettings.setDestination(folder);
		var result = backupSettings.destination;
		var expected = folder.path;
		Y.Assert.isNotNull(result);
		Y.Assert.isNotNull(expected);
		Y.Assert.isNotUndefined(result);
		Y.Assert.isNotUndefined(expected);
		Y.Assert.areSame(result.path,expected);
    },
	
	//9- setDestination succeeds when set with Folder object's path or string
	testSetDestinationOkWithAbsoluteFolderPath2: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var folderPath = folder.path;
		Y.Assert.isNotNull(folderPath);
		Y.Assert.isNotUndefined(folderPath);
		
		var backupSettings = new BackupSettings();
		backupSettings.setDestination(folderPath);
		var result = backupSettings.destination;
		
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,folderPath);
    },
    //9.1- setDestination succeeds when set with a local file:// URL leading to a folder
	testSetDestinationOkWithFileUrlLeadingToLocalFolder: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var folderPath = folder.path;
        var url = "file:///"+folder.path;
		Y.Assert.isNotNull(folderPath);
		Y.Assert.isNotUndefined(folderPath);
		
		var backupSettings = new BackupSettings();
		backupSettings.setDestination(url);
		var result = backupSettings.destination;
		
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,folderPath);
    },
    //9.2- setDestination succeeds when set with a local file:// URL leading to a folder
	testSetDestinationOkWithFileLocalHostUrlLeadingToLocalFolder: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var folderPath = folder.path;
        var url = "file://localhost/"+folder.path;
		Y.Assert.isNotNull(folderPath);
		Y.Assert.isNotUndefined(folderPath);
		
		var backupSettings = new BackupSettings();
		backupSettings.setDestination(url);
		var result = backupSettings.destination;
		
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,folderPath);
    },
    
    //9.3- setDestination succeeds when set with a local file:// URL leading to a folder
	testSetDestinationOkWithFileLocalHostIPUrlLeadingToLocalFolder: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var folderPath = folder.path;
        var url = "file://localhost/"+folder.path;
		Y.Assert.isNotNull(folderPath);
		Y.Assert.isNotUndefined(folderPath);
		
		var backupSettings = new BackupSettings();
		backupSettings.setDestination(url);
		var result = backupSettings.destination;
		
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,folderPath);
    },
    
    //10- setDestination with no params does not overwrites a previous valid destination
	testSetDestinationWithNoParamsDoesNotOverwritePrevDestination: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var expectedFolderPath = folder.path;
		Y.Assert.isNotNull(expectedFolderPath);
		Y.Assert.isNotUndefined(expectedFolderPath);
		
		var backupSettings = new BackupSettings();
		backupSettings.setDestination(folder);
		var result = backupSettings.destination;
		
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath);
		
		//Write with an illegal value
		try{
			backupSettings.setDestination();
		}
		catch(e){
		}
		finally{}
		
		result = backupSettings.destination;
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath,"destination folder overwritten");
    },
    //11- setDestination with relative path string does not overwrites a previous valid destination
	testSetDestinationWithRelativePathStringDoesNotOverwritePrevDestination: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var expectedFolderPath = folder.path;
		Y.Assert.isNotNull(expectedFolderPath);
		Y.Assert.isNotUndefined(expectedFolderPath);
		
		var backupSettings = new BackupSettings();
		backupSettings.setDestination(folder);
		var result = backupSettings.destination;
		
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath);
		
		//Write with an illegal value
		try{
			backupSettings.setDestination("../RelativePath/");
		}
		catch(e){
		}
		finally{}
		
		result = backupSettings.destination;
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath,"destination folder overwritten");
    },
    //12- setDestination with file path string does not overwrites a previous valid destination
	testSetDestinationWithFilePathStringDoesNotOverwritePrevDestination: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var expectedFolderPath = folder.path;
		Y.Assert.isNotNull(expectedFolderPath);
		Y.Assert.isNotUndefined(expectedFolderPath);
		
		var backupSettings = new BackupSettings();
		backupSettings.setDestination(folder);
		var result = backupSettings.destination;
		
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath);
		
		//Write with an illegal value
		try{
			backupSettings.setDestination(folder.path + "FileSpec");
		}
		catch(e){
		}
		finally{}
		
		result = backupSettings.destination;
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath,"destination folder overwritten");
    },
    //13- setDestination with file object does not overwrites a previous valid destination
	testSetDestinationWithFileObjectDoesNotOverwritePrevDestination: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var expectedFolderPath = folder.path;
		Y.Assert.isNotNull(expectedFolderPath);
		Y.Assert.isNotUndefined(expectedFolderPath);
		
		var backupSettings = new BackupSettings();
		backupSettings.setDestination(folder);
		var result = backupSettings.destination;
		
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath);
		
		//Write with an illegal value
		try{
			var fileObj = new File(folder.path+ "FileSpec");
			backupSettings.setDestination(fileObj);
		}
		catch(e){
		}
		finally{}
		
		result = backupSettings.destination;
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath,"destination folder overwritten");
    },
    //14- setDestination with file object does not overwrites a previous valid destination
	testSetDestinationWithNonFileUrlDoesNotOverwritePrevDestination: function () {
		var folder = new Folder(application.getFolder("path") + 'Backup/');
        var expectedFolderPath = folder.path;
		Y.Assert.isNotNull(expectedFolderPath);
		Y.Assert.isNotUndefined(expectedFolderPath);
		
		var backupSettings = new BackupSettings();
		backupSettings.setDestination(folder);
		var result = backupSettings.destination;
		
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath);
		
		//Write with an illegal value
		try{
			backupSettings.setDestination('http://www.yahoo.com/dropbox/MyFolder/');
		}
		catch(e){
		}
		finally{
			}
		
		result = backupSettings.destination;
		Y.Assert.isNotNull(result);
		Y.Assert.isNotUndefined(result);
		Y.Assert.areSame(result.path,expectedFolderPath,"destination folder overwritten");
    }
};