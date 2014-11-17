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


/**
 * Unit tests for the integrateDatastoreJournal() method
 */
 
include('./commonTestUtilities.js');

var workFolder = new Folder(baseFolderPath+'Work/');

function setupTest(){
	if (workFolder.exists){
		workFolder.removeContent(true);
	}else{
		workFolder.create();
	}
}

var testDataCreated = false;

/**
 * Creates a DataFolder tree at options.to, using the data folder  specified in options.source.
 * The data file must have the journal stored by its side. If one wishes to specify another journal
 * use the options.sourceJournalFolder
 */
function createDataFolderTree(options){
	Y.Assert.isTrue(options.hasOwnProperty('from'));
	Y.Assert.isTrue(Folder(options['from']).exists);
	Y.Assert.isTrue(options.hasOwnProperty('to'));
	
	var toFolder = new Folder(options.to);
	
	if(toFolder.exists){
		toFolder.removeContent(true);
	}else{
		toFolder.create();
	}
	
	var fromFolder = new Folder(options.from);
	
	var sourceDataFolder = new Folder(options.from+'DataFolder/');
	var destDataFolder = new Folder(options.to+'DataFolder/');
	copyFolderContents({source:sourceDataFolder.path,dest:destDataFolder.path/*,copyOption:'Overwrite'*/});
	
	var sourceJournal = new File(options.from+'journal.waJournal');
	if (options.hasOwnProperty('sourceJournalFolder')){
		sourceJournal = new File(options.sourceJournalFolder+'journal.waJournal');
	}
	sourceJournal.copyTo(destDataFolder.path+'journal.waJournal','Overwrite');
}



var testCase = {
     name: "integrateDatastore coverage tests",
     
    _should: {
		error: {
			
		},
		ignore: {
			
			
	 		/*
			testIntegrateCurrentJournalInLastBackup:true,
			testIntegrateCurrentJournalInLastBackupWithResultDataFile:true,
			testIntegrateTwoSuccessiveJournals: true,
			testIntegrateThreeSuccessiveJournals: true,
			testIntegrateSuccessiveJournalsOutOfOrder: true,
			testIntegrateCurrentJournalInLastBackupAndReplaceJournal: false,
			testIntegrateCurrentJournalInLastBackupAndReplaceJournalWithFailedIntegration: false
			*/
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
		
		if(testDataCreated === false){
			testDataCreated = true;
			var msg = '';
			try{
				createTestData();
			}
			catch(e){
				msg = e.message;
				testDataCreated = false;
			}
			Y.Assert.areEqual('',msg,'createTestData failed with message: '+msg);
		}
    },
 
    tearDown : function () {
    },
    
    
   
    
    ///Integration tests
    
    testIntegrateCurrentJournalInLastBackup:function(){
    	//tests that integrating the current journal into the last backup works
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		setupTest();
				
		try{
			var lastBackedUpDataFile = new File(baseFolderPath + "Assets/Backups/5/DataFolder/data.waData");
			var testDataFile = new File(workFolder.path+'5/data.waData');
			
			copyFile({src:lastBackedUpDataFile.path,dest:testDataFile.path});
			
			result = integrateDataStoreJournal(modelFile,testDataFile,currentJournalFile);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
			
		}
		Y.Assert.isNotNull(result);
		Y.Assert.areEqual(0,exceptions);
	},
	testIntegrateCurrentJournalInLastBackupWithResultDataFile:function(){
    	//integrates current journal into last backed up data folder
    	//using the resultDataFile option
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		setupTest();
		
		try{
			var lastBackedUpDataFile = new File(baseFolderPath + "Assets/Backups/5/DataFolder/data.waData");
			var testDataFile = new File(workFolder.path+'5/data.waData');
			
			if(!testDataFile.parent.exists){
				testDataFile.parent.create();
			}
			
			result = integrateDataStoreJournal(modelFile,lastBackedUpDataFile,currentJournalFile,{resultDataFile:testDataFile});
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
			
		}
		Y.Assert.isNotNull(result);
		Y.Assert.areEqual(0,exceptions);
	},
	testIntegrateTwoSuccessiveJournals:function(){
    	
		//Tests successive integrations by integrating 2 journals in a row
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		setupTest();
		var testDataFile = new File(workFolder.path+'0/data.waData');
		var sourceDataFile = new File(baseFolderPath + 'Assets/Backups/0/DataFolder/data.waData');
		var journals=[
			baseFolderPath + 'Assets/Backups/1/journal.waJournal',
			baseFolderPath + 'Assets/Backups/2/journal.waJournal'];
		
		copyFile({src:sourceDataFile.path,dest:testDataFile.path});
		
		for(var i=0; i<journals.length;i++){
			exceptions = 0;
			exceptionMsg = '';
			try{
				result = integrateDataStoreJournal(modelFile,testDataFile,journals[i]);
			}
			catch(e){
				exceptions++;
				exceptionMsg = e.message;
			}
			Y.Assert.isNotNull(result,'Integration failed at round '+i+' for journal '+journals[i]);
			Y.Assert.areEqual(0,exceptions,'Integration failed at round '+i+' for journal '+journals[i]);
			Y.Assert.areEqual('',exceptionMsg,'Integration failed at round '+i+' for journal '+journals[i]);
		}
	},
	testIntegrateThreeSuccessiveJournals:function(){
    	
		//Tests successive integrations by integrating 3 journals in a row
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		setupTest();
		var testDataFile = new File(workFolder.path+'2/data.waData');
		var sourceDataFile = new File(baseFolderPath + 'Assets/Backups/2/DataFolder/data.waData');
		
		var journals=[
			baseFolderPath + 'Assets/Backups/3/journal.waJournal',
			baseFolderPath + 'Assets/Backups/4/journal.waJournal',
			baseFolderPath + 'Assets/Backups/5/journal.waJournal'];
		
		copyFile({src:sourceDataFile.path,dest:testDataFile.path});
		
		for(var i=0; i<journals.length;i++){
			exceptions = 0;
			exceptionMsg = '';
			try{
				result = integrateDataStoreJournal(modelFile,testDataFile,journals[i]);
			}
			catch(e){
				exceptions++;
				exceptionMsg = e.message;
			}
			Y.Assert.isNotNull(result,'Integration failed at round '+i+' for journal '+journals[i]);
			Y.Assert.areEqual(0,exceptions,'Integration failed at round '+i+' for journal '+journals[i]);
			Y.Assert.areEqual('',exceptionMsg,'Integration failed at round '+i+' for journal '+journals[i]);
		}
	},
	testIntegrateAllSuccessiveJournals:function(){
    	
		//Tests successive integrations by integrating all backuped journals and the current journal in the first backed up data file
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		setupTest();
		
		var testDataFile = new File(workFolder.path+'0/data.waData');
		var sourceDataFile = new File(baseFolderPath + 'Assets/Backups/0/DataFolder/data.waData');

		var journals=[
			baseFolderPath + 'Assets/Backups/1/journal.waJournal',
			baseFolderPath + 'Assets/Backups/2/journal.waJournal',
			baseFolderPath + 'Assets/Backups/3/journal.waJournal',
			baseFolderPath + 'Assets/Backups/4/journal.waJournal',
			baseFolderPath + 'Assets/Backups/5/journal.waJournal',
			currentJournalFile.path];
			
		copyFile({src:sourceDataFile.path,dest:testDataFile.path});
		
		for(var i=0; i<journals.length;i++){
			exceptions = 0;
			exceptionMsg = '';
			try{
				result = integrateDataStoreJournal(modelFile,testDataFile,journals[i]);
			}
			catch(e){
				exceptions++;
				exceptionMsg = e.message;
			}
			Y.Assert.isNotNull(result,'Integration failed at round '+i+' for journal '+journals[i]);
			Y.Assert.areEqual(0,exceptions,'Integration failed at round '+i+' for journal '+journals[i]);
			Y.Assert.areEqual('',exceptionMsg,'Integration failed at round '+i+' for journal '+journals[i]);
		}
	},
	testIntegrateSuccessiveJournalsOutOfOrder:function(){
		//Successfully integrate 3 journals and then integrate the 5th one before the 4th one Successively attempt to integrate journal in the wrong order
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		setupTest();
		
		var testDataFile = new File(workFolder.path+'0/data.waData');
		var sourceDataFile = new File(baseFolderPath + 'Assets/Backups/0/DataFolder/data.waData');
		
		
		var journals=[
			{shouldPass: true,path:baseFolderPath + 'Assets/Backups/1/journal.waJournal'},
			{shouldPass: true,path:baseFolderPath + 'Assets/Backups/2/journal.waJournal'},
			{shouldPass: true,path:baseFolderPath + 'Assets/Backups/3/journal.waJournal'},
			{shouldPass: false,path:baseFolderPath + 'Assets/Backups/5/journal.waJournal'},
			{shouldPass: true,path:baseFolderPath + 'Assets/Backups/4/journal.waJournal'},
			{shouldPass: false,path:currentJournalFile.path}];
		
		if(!testDataFile.parent.exists){
			testDataFile.parent.create();
		}
		sourceDataFile.copyTo (testDataFile, "OverWrite");
		
		for(var i=0; i<journals.length;i++){
			exceptions = 0;
			exceptionMsg = '';
			result = null;
			try{
				result = integrateDataStoreJournal(modelFile,testDataFile,journals[i].path);
			}
			catch(e){
				exceptions++;
				exceptionMsg = e.message;
			}
			
			if (journals[i].shouldPass){
				Y.Assert.isNotNull(result,'Integration failed at round '+i+' for journal '+journals[i].path);
				Y.Assert.areEqual(0,exceptions,'Integration failed at round '+i+' for journal '+journals[i].path);
				Y.Assert.areEqual('',exceptionMsg,'Integration failed at round '+i+' for journal '+journals[i].path);
				
			}else{
				Y.Assert.isNull(result,'Integration should have failed at round '+i+' for journal '+journals[i].path);
				Y.Assert.areEqual(1,exceptions,'Integration should have failed at round '+i+' for journal '+journals[i].path);
				//Y.Assert.areEqual('',exceptionMsg,'Integration should have failed at round '+i+' for journal '+journals[i].path);
			}
		}
	},
	
	testIntegrateCurrentJournalInLastBackupAndReplaceJournal:function(){
    	//test the replaceCurrentJournalOption when integrating one journal
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		setupTest();
				
		createDataFolderTree({from:baseFolderPath + 'Assets/Backups/5/',to:workFolder.path+'5/'});
				
		try{
			var testDataFile = new File(workFolder.path+'5/DataFolder/data.waData');
			result = integrateDataStoreJournal(modelFile,testDataFile,currentJournalFile,{replaceCurrentJournal:true});
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
			
		}
		Y.Assert.isNotNull(result);
		Y.Assert.isTrue(result.hasOwnProperty('previousJournal'));
		Y.Assert.isTrue(result['previousJournal'].exists);
		Y.Assert.areEqual(0,exceptions);
		
		//TODO: open the resulting data store and double check the number of items...
		//in the mean time, do a bit of copy/paste and have the a test solution open up the data store and do the validation
		
	},
	
	
	testIntegrateCurrentJournalInLastBackupAndReplaceJournalWithInvalidJournal:function(){
    	//Tests that we correctly revert journal copying if integration fails and replaceCurrentJournal = true 
    	
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		
		
		setupTest();
		
		//We make a DataFolder from backup folder 5
		var backupsPath = baseFolderPath + 'Assets/Backups/';
		createDataFolderTree({from:backupsPath+"5/",to:workFolder.path+'5/'});
		
		var testDataFile = new File(workFolder.path+'5/DataFolder/data.waData');
		
		//We try to integrate journal from backup 4
		var testJournalFile = new File(backupsPath+"4/journal.waJournal");
		
		var oldCurrentJournalFile = new File(workFolder.path+'5/DataFolder/journal.waJournal');
		var oldCurrentJournalFileCopy = new File(workFolder.path+'5/DataFolder/testJournalCopy.waJournal');
		
		//Make a test safe-copy
		oldCurrentJournalFile.copyTo(oldCurrentJournalFileCopy,'Overwrite');
		
		var filesInTestDataFolderBefore = testDataFile.parent.files.length;
		var filesInTestDataFolderAfter = 0;
		
		//Integrate journal from backup 4 into data from backup 5 -> must fail because journal is too old
		try{
			result = integrateDataStoreJournal(modelFile,testDataFile,testJournalFile,{replaceCurrentJournal:true});
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		finally{
			filesInTestDataFolderAfter = testDataFile.parent.files.length;
		}
		//There should be an exception thrown
		Y.Assert.isNull(result);
		Y.Assert.areEqual(1,exceptions);
		
		//The data folder There should be no changes in the target data folder
		Y.Assert.areEqual(filesInTestDataFolderBefore,filesInTestDataFolderAfter);
		
		//the current journal must be the same as before
		Y.Assert.isTrue(compareFileContent({left:oldCurrentJournalFile,right:oldCurrentJournalFileCopy}));
	}
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}




