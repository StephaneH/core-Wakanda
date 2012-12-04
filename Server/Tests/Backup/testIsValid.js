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
    name: "SSJS BackupSettings isValid() API",
    
    _should: {
		error: {
			
		},
		ignore: {
			
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

    //1- Class BackupSettings exist
    testClassBackupSettingsExists: function () {
    	var obj = new BackupSettings();
		Y.Assert.isObject(obj);
		Y.Assert.isNotNull(obj);
		Y.Assert.isInstanceOf(Object,obj);
    },
    
    testIsValidReturnsFalseIfDestinationSetWithNoParams: function () {
        var backupSettings = new BackupSettings();
       //Write with an illegal value
		try{
			backupSettings.setDestination();
		}
		catch(e){
		}
		
		finally{}
        Y.Assert.isFalse(backupSettings.isValid(),"isValid should return false since invalid destination was set");
    },
    
    testIsValidReturnsFalseUponInstanceCreation: function () {
        var backupSettings = new BackupSettings();
		Y.Assert.isNotNull(backupSettings);
		Y.Assert.isInstanceOf(Object,backupSettings);
		Y.Assert.isFalse(backupSettings.isValid(),"backup settings should be invalid upon construction");
    },
    
    testIsValidReturnsFalseIfDestinationSetWithNonFileUrl: function () {
        var backupSettings = new BackupSettings();
        
       //Write with an illegal value
		try{
			backupSettings.setDestination('http://www.yahoo.com/dropbox/MyFolder/');
		}
		catch(e){
		}
		finally{
			}
        Y.Assert.isFalse(backupSettings.isValid(),"isValid should return false since invalid destination was set");
    },
    
    testIsValidReturnsFalseIfDestinationSetWithFileObject: function () {
        var backupSettings = new BackupSettings();
        var folder = new Folder(application.getFolder("path") + 'Backup/');
        
       //Write with an illegal value
		try{
			var fileObj = new File(folder.path+ "FileSpec");
			backupSettings.setDestination(fileObj);
		}
		catch(e){
		}
		
		finally{}
        Y.Assert.isFalse(backupSettings.isValid(),"isValid should return false since invalid destination was set");
    },
    
    testIsValidReturnsFalseIfDestinationSetWithFilePathString: function () {
        var backupSettings = new BackupSettings();
        var folder = new Folder(application.getFolder("path") + 'Backup/');
        
       //Write with an illegal value
		try{
			var fileObj = new File();
			backupSettings.setDestination(folder.path+ "FileSpec");
		}
		catch(e){
		}
		
		finally{}
        Y.Assert.isFalse(backupSettings.isValid(),"isValid should return false since invalid destination was set");
    },
    
    testIsValidReturnsTrueIfSetDestinationCalledWithLocalFolderPathString: function () {
    	var folder = new Folder(application.getFolder("path") + 'Backup/');
        var backupSettings = new BackupSettings();
        
        backupSettings.setDestination(folder.path);
        Y.Assert.isTrue(backupSettings.isValid(),"isValid should return true since destination is a folder path string");
    },
    
    testIsValidReturnsTrueIfSetDestinationCalledWithLocalFolderObject: function () {
    	var folder = new Folder(application.getFolder("path") + 'Backup/');
        var backupSettings = new BackupSettings();
        
        backupSettings.setDestination(folder);
        Y.Assert.isTrue(backupSettings.isValid(),"isValid should return true since destination is a folder object");
    }
};