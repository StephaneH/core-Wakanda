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

var nonExistingFile = new File(application.getFolder("path")+'xoxo');
var baseFolderPath = application.getFolder("path");
var modelFolderPath = baseFolderPath;
var modelFilePath = modelFolderPath+ "Assets/model.waModel"; 
var modelFile = new File(modelFilePath); 

var baseFolderPath = application.getFolder("path");

var modelFilePath = baseFolderPath+ "Assets/model.waModel"; 
var modelFile = new File(modelFilePath); 

var currentDataFolder = new Folder(baseFolderPath+ "Assets/CurrentDataFolder/DataFolder/");
var currentDataFile = new File(baseFolderPath+ "Assets/CurrentDataFolder/DataFolder/data.waData");
var currentJournalFile = new File(baseFolderPath+ "Assets/CurrentDataFolder/DataFolder/journal.waJournal");

var backupFolderPath = baseFolderPath + "Backups/";
var backupRegistryPath = baseFolderPath + "Backups/";

var foreignJournalFile = new File(baseFolderPath + "Assets/ForeignJournal/journal.waJournal");

function MySleep(delayInMs){
	var doSleep = function(){
		exitWait();
	}
    setTimeout(doSleep,1000);
    wait();
}

function copyFolderContents(options){
	var source = new Folder(options.source);
	var dest = new Folder(options.dest);
	
	if(!dest.exists){
		dest.create();
	}
	for(var i=0; i< source.files.length;i++){
		source.files[i].copyTo(dest.path+source.files[i].name,'Overwrite');
	}

	for(var i=0; i< source.folders.length;i++){
		var subFolder = source.folders[i];
		copyFolderContents({source:options.source+subFolder.name+'/',dest:options.dest+subFolder.name+'/'});
	}
}


//Creates assets for the tests:
//6 backups inside the Assets/Backups/0... Assets/Backups/5 folders
// The 'current data folder' in 'Assets/CurrentDataFolder/'
function createTestData(){
	
	var i = 0;
	var config = getBackupSettings();
	config.maxRetainedBackups = 7;
	config.useUniqueNames = false;
	for(;i < config.maxRetainedBackups - 1;i++){
		
		ds.Book.createBooks({title: 'Title set '+(i+1),count:5});
		
		
		config.destination = new Folder(application.getFolder("path")+"Assets/Backups/"+i+'/');
		
		if(config.destination.exists){
			config.destination.remove(true);
		}
			
		var manifestFile = ds.backup(config);
		
		/*var assetFolder = new Folder(application.getFolder("path")+"Assets/Backups/"+i+'/');
		if(assetFolder.exists){
			assetFolder.removeContent(true);
		}else{
			assetFolder.create();
		}
		copyFolderContents({source:manifestFile.parent.path,dest:assetFolder.path});
		*/
		MySleep(1000)
	}
	
	//Now create a set of 20 that will act as the current data folder
	ds.Book.createBooks({title: 'Title set '+(i+1),count:20});
	
	config.destination = currentDataFolder.parent;
	//We use useUniqueNames to false so remove folder 
	if(config.destination.exists){
		config.destination.remove(true);
	}
	var manifestFile = ds.backup(config);
	
	File(currentDataFolder.parent.path+'journal.waJournal').moveTo(currentJournalFile,'Overwrite');
	File(currentDataFolder.parent.path+'backupManifest.json').remove();

}

/**
 * Binary compares two files. Super slow
 */
function compareFileContent(obj){
	
	var ok = true;
	try{
		var l = new File(obj.left.path);
		var r = new File(obj.right.path);
		
		var leftStream = BinaryStream(l);
		var rightStream = BinaryStream(r);
		Y.Assert.areEqual(leftStream.length,rightStream.length);
		var s = leftStream.getSize();
		while (s > 0){
			var leftBuf = leftStream.getBuffer(1024);
			var rightBuf = rightStream.getBuffer(1024);
		
			s -= leftBuf.length;
			for(var i = 0; i < leftBuf.length;i++){
				Y.Assert.areEqual(leftBuf[i],rightBuf[i]);
			}
		}
	}
	catch(e){
		ok = false;
	}
	return ok;
}
function copyFile(obj){
	var sourceFile = new File(obj.src);
	var destFile = new File(obj.dest);
	if(!destFile.parent.exists){
		destFile.parent.create();
	}
	
	sourceFile.copyTo(destFile);
}


