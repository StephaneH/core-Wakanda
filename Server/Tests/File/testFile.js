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
    name: "File Basic Test",
    
    _should: {
        ignore: {
            testObjectFileExists2: true, // Not sure about the doc.
            testCreationDateAttributeValue: true, // Cannot rely on Perforce for creation date.
            testMethodGetVolumeSizeExists: true, // Requires a virtual volume
            testMethodGetVolumeSizeValue: true, // Requires a virtual volume
            testMethodGetFreeSpaceExists: true, // Requires a virtual volume
            testMethodGetFreeSpaceValue: true // Requires a virtual volume
        }
    },
    
    setUp : function () {
    	if (os.isWindows) {
    		console.log("Setup: ignore visibility test on Windows");
    		this._should.ignore.testVisibleValue2 = true;
    	}
    	if (os.isLinux) {
    		console.log("Setup: ignore visibility test on Linux");
    		this._should.ignore.testVisibleValue2 = true;
    	}
        console.log("Setup: try to create Temp folder");
        var appPath = application.getFolder("path");
        var obj = Folder(appPath + 'Temp');
        obj.create();
        console.log("Setup: Temp folder creation success");
    },
 
    tearDown : function () {
        console.log("TearDown: does nothing, just testing...");
    },

    //0- Class File exist
    testTestOfClassFileExists: function () {
        var result = typeof File;
        Y.Assert.areSame("function", result);
    },

    //1- object File exist 1
    testObjectFileExists1: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj;
        Y.Assert.areSame("function", result);
    },

    //1- object File exist 2
    testObjectFileExists2: function () {
        var folder_path = application.getFolder("path") + 'Src';
        var obj = File(folder_path, 'file_main');
        var path = obj.path;
        var type = typeof obj;
        var result = [type, folder_path, path];
        Y.Assert.areSame("object", result[0]);
        Y.Assert.areSame(result[1] + '/file_main', result[2]);
    },

    //2- Attribut creationDate exist
    testCreationDateAttributeExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.creationDate;
        Y.Assert.areSame("object", result);
    },

    //3- Attribut creationDate value
    testCreationDateAttributeValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_cdate_14_03_2011_12_48_04');
        var result = new Date(obj.creationDate);
        Y.Assert.areSame("2011-03-14T12:48:04.000Z", result.toISOString());
    },
    
    //4- Attribut lastModifiedDate exist
    testLastModifiedDateAttributeExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.lastModifiedDate;
        Y.Assert.areSame("object", result);
    },

    //5- Attribut lastModifiedDate value
    testLastModifiedDateAttributeValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_mdate_10_03_2011_14_53_36');
        var result = new Date(obj.lastModifiedDate);
        Y.Assert.areSame("2011-05-23T09:52:23.000Z", result.toISOString());
    },

    //6- Attribut exists exist
    testExistsAttributeExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.exists;
        Y.Assert.areSame("boolean", result);
    },

    //7- Attribut exists value case 01
    testExistsAttributeValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/notexist');
        var result = obj.exists;
        Y.Assert.isFalse(result);
    },

    //8- Attribut exists value case 02
    testExistsAttributeValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = obj.exists;
        Y.Assert.isTrue(result);
    },

    //9- Attribut extension exist
    testExtensionAttributExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.extension;
        Y.Assert.areSame("string", result);
    },

    //10- Attribut extension value
    testExtensionAttributValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_ext.ext');
        var result = obj.extension;
        Y.Assert.areSame("ext", result);
    },

    //11- Attribut name exist
    testNameAttributeExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.name;
        Y.Assert.areSame("string", result);
    },

    //12- Attribut name value
    testNameAttributeValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_name.ext');
        var result = obj.name;
        Y.Assert.areSame("file_name.ext", result);
    },

    //13- Attribut nameNoExt exist
    testNameNoExtAttributeExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.nameNoExt;
        Y.Assert.areSame("string", result);
    },

    //14- Attribut nameNoExt value
    testNameNoExtAttributeValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_name.ext');
        var result = obj.nameNoExt;
        Y.Assert.areSame("file_name", result);
    },

    //15- Attribut parent exist
    testParentAttributeExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.parent;
        Y.Assert.areSame("function", result);
    },

    //16- Attribut path exist
    testPathAttributeExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.path;
        Y.Assert.areSame("string", result);
    },

    //17- Attribut path value
    testPathAttributeValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = [obj.path, appPath];
        Y.Assert.areSame(result[1] + 'Src/file_main', result[0]);
    },

    //18- Attribut readOnly exist
    testReadOnlyExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.readOnly;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("boolean", result);
    },

    //19- Attribut readOnly value case 1
    testReadOnlyValue1: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_readonly');
        var result = obj.readOnly;
        Y.Assert.isTrue(result);
    },

    //20- Attribut readOnly value case 2
    testReadOnlyValue2: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_readwrite');
        var result = obj.readOnly;
        Y.Assert.isFalse(result);
    },

    //21- Attribut size exist
    testSizeExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.size;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("number", result);
    },

    //22- Attribut size value
    testSizeValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_size');
        var result = obj.size;
        if (os.isMac) Y.Assert.areSame(72, result);
        if (os.isWindows) Y.Assert.areSame(80, result);
    },


    //23- Attribut visible exist
    testVisibleExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.visible;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("boolean", result);
    },

    //24- Attribut visible value case 1
    testVisibleValue1: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = obj.visible;
        Y.Assert.isTrue(result);
    },

    //25- Attribut visible value case 2
    testVisibleValue2: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/.file_noVisible');
        var result = obj.visible;
        Y.Assert.isFalse(result);
    },

    //26- method create exist
    testMethodCreateExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Temp/file_main');
        var result = typeof obj.create;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },

    //27- method create logic
    testMethodCreateLogic: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Temp/file_new');
        obj.create();
        var obj2 = File(appPath + 'Temp/file_new');
        var result = obj2.exists;
        Y.Assert.isTrue(result);
    },

    //28- method remove exist
    testMethodRemoveExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_to_remove');
        var result = typeof obj.remove;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },

    //29- method remove logic
    testMethodRemoveLogic: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Dest/file_to_remove');
        obj.remove();
        var obj2 = File(appPath + 'Dest/file_to_remove');
        var result = obj2.exists;
        Y.Assert.isFalse(result);
    },

    //30- method copyTo exist
    testMethodCopyToExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.copyTo;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },

    //31- method copyTo logic : no overwrite parameter
    testMethodCopyToLogic1: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        obj.copyTo(appPath + 'Temp/file_main');
        var obj2 = File(appPath + 'Temp/file_main');
        var result = obj2.exists;
        Y.Assert.isTrue(result);
    },

    //32- method copyTo logic : no overwrite parameter + file exists
    testMethodCopyToLogic2: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_copy_exists');
        try {
            obj.copyTo(appPath + 'Dest/file_copy_exists');
            var obj2 = File(appPath + 'Dest/file_copy_exists');
            var result = false;
        } catch (error) {
            var result = true;
        }
        Y.Assert.isTrue(result);
    },

    //33- method copyTo logic : overwrite parameter = false
    testMethodCopyToLogic3: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_copy_no_overwrite');
        try {
            obj.copyTo(appPath + 'Dest/file_copy_no_overwrite');
            Y.Assert.fail("Destination file should not be overwritten.");
        } catch (error) {
            var obj2 = File(appPath + 'Dest/file_copy_no_overwrite');
            if (os.isMac) Y.Assert.areSame(72, obj2.size);
        	if (os.isWindows) Y.Assert.areSame(80, obj2.size);
        }
    },

    //34- method copyTo logic : overwrite parameter = true
    testMethodCopyToLogic4: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_copy_overwrite');
        obj.copyTo(appPath + 'Dest/file_copy_overwrite', true);
        var obj2 = File(appPath + 'Dest/file_copy_overwrite');
        var result = obj2.size;
        if (os.isMac) Y.Assert.areSame(72, result);
        if (os.isWindows) Y.Assert.areSame(80, result);
    },

    //35- method moveTo exist
    testMethodMoveToExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_move_to');
        var result = typeof obj.moveTo;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },

    //36- method moveTo logic default 1 
    testMethodMoveToLogic1: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_move_to');
        obj.moveTo(appPath + 'Temp/file_move_to');
        var obj2 = File(appPath + 'Temp/file_move_to');
        var result = obj2.exists && !obj.exists;
        Y.Assert.isTrue(result);
    },

    //37- method moveTo logic default 2
    testMethodMoveToLogic2: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Temp/file_move_to');
        obj.moveTo(appPath + 'Src/file_move_to');
        var obj2 = File(appPath + 'Src/file_move_to');
        var result = obj2.exists && !obj.exists;
        Y.Assert.isTrue(result);
    },

    //38- method moveTo logic overwrite?
    testMethodMoveToLogic3: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_move_to_exists');
        try {
            obj.copyTo(appPath + 'Dest/file_move_to_exists');
            var obj2 = File(appPath + 'Dest/file_move_to_exists');
            var result = false;
        } catch (error) {
            var result = true;
        }
        Y.Assert.isTrue(result);
    },

    //39- method getURL exist
    testMethodGetURLExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.getURL;
        Y.Assert.areNotSame("undefined", result);
    },

    //40- method getURL value
    testMethodGetURLValue: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = [obj.getURL(), appPath];
        if (os.isWindows) Y.Assert.areSame("file:///" + result[1] + "Src/file_main", result[0]);
        else Y.Assert.areSame("file://" + result[1] + "Src/file_main", result[0]);
    },

    //41- method getVolumeSize exist
    testMethodGetVolumeSizeExists: function () {
        var obj = File('E:/file_volume');
        var result = typeof obj.getVolumeSize;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },

    //42- method getVolumeSize value
    testMethodGetVolumeSizeValue: function () {
        var result = null; //obj.getVolumeSize()
        Y.Assert.areSame(1, 1);
    },

    //43- method getFreeSpace exist
    testMethodGetFreeSpaceExists: function () {
        var obj = File('E:/file_volume');
        var result = typeof obj.getFreeSpace;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },

    //44- method getFreeSpace value
    // Besoin d'un DD virtuel
    testMethodGetFreeSpaceValue: function () {
        var obj = File('E:/file_volume');
        var result = null; //obj.getFreeSpace()
        Y.Assert.areSame(1, 1);
    },

    //45- method next exist
    testMethodNextExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.next;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);

    },

    //46- method valid exist
    testValidExists: function () {
        var appPath = application.getFolder("path");
        var obj = File(appPath + 'Src/file_main');
        var result = typeof obj.valid;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },
    
    //47a - File.isFile() exists
    testIsFileExists: function () {
        var result = typeof File.isFile;
        Y.Assert.areNotSame("undefined", result);
        Y.Assert.areSame("function", result);
    },
    
    //47b - File.isFolder() does not exist
    testIsFolderDoesNotExist: function () {
        var result = typeof File.isFolder;
        Y.Assert.areSame("undefined", result);
        Y.Assert.areNotSame("function", result);
    },
    
    //47 - File.isFile() on existing file
    testIsFileOnExistingFile: function () {
        var appPath = application.getFolder("path");
        var result = File.isFile(appPath + "Src/file_main");
        Y.Assert.isTrue(result);
    },
    
    //48 - File.isFile() on non-existing file
    testIsFileOnNonExistingFile: function () {
        var appPath = application.getFolder("path");
        var result = File.isFile(appPath + "Src/file_pied");
        Y.Assert.isFalse(result);
    },
    
    //48b - File.isFile() on non-existing file 2
    testIsFileOnNonExistingFile2: function () {
        var result = File.isFile("");
        Y.Assert.isFalse(result);
    },
    
    //49 - File.isFile() on existing folder
    testIsFileOnExistingFolder: function () {
        var appPath = application.getFolder("path");
        var result = File.isFile(appPath + "Src");
        Y.Assert.isFalse(result);
    },
    
    //50 - File.isFile() on non-existing folder
    testIsFileOnNonExistingFolder: function () {
        var appPath = application.getFolder("path");
        var result = File.isFile(appPath + "Wow");
        Y.Assert.isFalse(result);
    }
};
