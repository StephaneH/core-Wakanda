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
 * Unit tests for the getJournalInfo() method
 */

var dataLinkUUID = 'E4464855891E744F8172F8EBF737D677';
var dataFolder = new Folder(application.getFolder("path")+'DataFolder/');
var dataFile = new File(application.getFolder("path")+'DataFolder/data.waData');

var dataFolderWithJournal = new Folder(application.getFolder("path")+'WithJournal/DataFolder/');
var dataFileWithJournal = new File(application.getFolder("path")+'WithJournal/DataFolder/data.waData');

var testCase = {
     name: "getJournalInfo unit tests",
     
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
    },
 
    tearDown : function () {
    },
   
	testGetJournalInfoNoParams:function(){
    	//Test that we operate on the current aplication and only return a 'path' param
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = getJournalInfo();
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isNull(result);
		Y.Assert.areEqual(exceptions,1);
		Y.Assert.areEqual(exceptionMsg,"Method or constructor {p1} expects argument(s).");
	},
	testGetJournalInfoWithNonJournalDataFilePath:function(){
		//Test that we return a proper object if the data file has no journal associated
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = getJournalInfo(dataFile.path);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isNotNull(result);
		Y.Assert.areEqual(exceptions,0);
		Y.Assert.isTrue(result.hasOwnProperty('path'));
		Y.Assert.areEqual(result['path'],'');
		//Y.Assert.areEqual(exceptionMsg,"Journal file not found: {path}");
	},
	testGetJournalInfoWithNonJournalDataFilePathWithValues:function(){
		//Test that we return a proper object with all requested values empty if the data file has no journal associated
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = getJournalInfo(dataFile.path,{values:['dataLink']});
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isNotNull(result);
		Y.Assert.areEqual(exceptions,0);
		Y.Assert.isTrue(result.hasOwnProperty('path'));
		Y.Assert.isTrue(result.hasOwnProperty('dataLink'));
		Y.Assert.areEqual(result['path'],'');
		Y.Assert.areEqual(result['dataLink'],'');
		//Y.Assert.areEqual(exceptionMsg,"Journal file not found: {path}");
	},
		
	testGetJournalInfoWithDataFilePathString:function(){
		//test we work on specified data folder 
		//and we only return a 'path' property
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = getJournalInfo(dataFileWithJournal.path);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isNotNull(result);
		Y.Assert.areEqual(exceptions,0);
		Y.Assert.isTrue(result.hasOwnProperty('path'));
		Y.Assert.areEqual(result['path'],dataFolderWithJournal.path+'journal.waJournal');
	},
	testGetJournalInfoWithDataFilePath:function(){
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = getJournalInfo(dataFileWithJournal);
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isNotNull(result);
		Y.Assert.areEqual(exceptions,0);
		Y.Assert.isTrue(result.hasOwnProperty('path'));
		Y.Assert.areEqual(result['path'],dataFolderWithJournal.path+'journal.waJournal');
	},
	
	testGetJournalInfoWithUnknowDataFilePathString:function(){
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = getJournalInfo(dataFolder.path+'Foo/data.waData');
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isNull(result);
		Y.Assert.areEqual(exceptions,1);
		Y.Assert.areEqual(exceptionMsg,'File object must refer to an actual file!');
	},
	testGetJournalInfoWithInfoEnumDataLink:function(){
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = getJournalInfo(dataFileWithJournal,{values:['dataLink']});
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isNotNull(result);
		Y.Assert.areEqual(exceptions,0);
		Y.Assert.isTrue(result.hasOwnProperty('dataLink'));
		Y.Assert.isTrue(result.hasOwnProperty('path'));
		Y.Assert.areEqual(result['dataLink'],dataLinkUUID);
	},
	testGetJournalInfoWithInfoEnumDataLinkMixedCase:function(){
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = getJournalInfo(dataFileWithJournal,{values:['DaTaLiNk']});
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isNotNull(result);
		Y.Assert.areEqual(exceptions,0);
		Y.Assert.isTrue(result.hasOwnProperty('dataLink'));
		Y.Assert.isTrue(result.hasOwnProperty('path'));
		Y.Assert.areEqual(result['dataLink'],dataLinkUUID);
	},
	testGetJournalInfoWithInfoEnumUnknown:function(){
		var exceptions=0;
		var exceptionMsg='';
		var result = null;
		try{
			result = getJournalInfo(dataFileWithJournal,{values:['foo','dataLink','splurt']});
		}
		catch(e){
			exceptions++;
			exceptionMsg = e.message;
		}
		Y.Assert.isNotNull(result);
		Y.Assert.areEqual(exceptions,0);
		Y.Assert.isTrue(result.hasOwnProperty('dataLink'));
		Y.Assert.isTrue(result.hasOwnProperty('path'));
		Y.Assert.isFalse(result.hasOwnProperty('splurt'));
	}
};

if(typeof dontRequireUnitTest === 'undefined'){
	require("unitTest").run(testCase).getReport();
}




