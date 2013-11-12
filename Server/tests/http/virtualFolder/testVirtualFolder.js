
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

function count(){
    var counter = 0;
    for(var p in this) if(this.hasOwnProperty(p))++counter;
    return counter;
}

var testCase = {
    
     name: "test Virtual Folder",
     
      _should: {
        error: {
    
            
        },
        ignore: {
        testHTTPServer_GetIpAddress_14:true

        }
    },
   
     /*
     * Sets up data that is needed by each test.
     */
     setUp : function () {

         
        if (os.isWindows) {
        //Win Stuff 
        }
        else if (os.isLinux) {
        //Linux Stuff   
        }
        else {
        //MAC Stuff
        }    
        
    },

    /*
     * Cleans up everything that was created by setUp().
     */
    tearDown : function () {
   
    },
    
    
    /*
     *
     * Test methods for Virtual Folder
     *
     */

    // 0 --**-- Virtual Folder with a url, no index
    testVirtualFolderUrlNoIndex_0: function() {  
    var xhr,
    	headers,
    	headersArray, 
    	result, 
    	URL;
    
    var headersObj = {};
    	
    	URL = "http://127.0.0.1:8081/page/"; 
	    xhr = new XMLHttpRequest();
	    
	    xhr.open('GET',URL,false);
	    xhr.send();
	    
	    result = xhr.status;
	    
	    headers = xhr.getAllResponseHeaders();
	
	    headersArray = headers.split('\n');
 		headersArray.shift();
 		headersArray.pop();

		headersArray.forEach(function(header, index, headersArray) {
         var name, indexSeparator, value;
         	 		
	 		indexSeparator = header.indexOf(':'); 
	        name = header.substr(0,indexSeparator);

	        value = header.substr(indexSeparator + 1).trim(); 
	        headersObj[name] = value; 
 		
 		});
	    
		Y.Assert.areSame(302,result);   
    	Y.Assert.areSame("http://127.0.0.1:8081/index.waPage/index.html/",headersObj.Location); 
    },
    
    // 1 --**-- Virtual Folder with a url, index
    testVirtualFolderUrlIndex_1: function() {  
    var xhr,
    	headers,
    	headersArray,
    	result, 
    	URL;
    
    var headersObj = {};
    
    	URL = "http://127.0.0.1:8081/test/"; 
	    xhr = new XMLHttpRequest();

	    xhr.open('GET',URL,false);
	    xhr.send();
	    
	    result = xhr.status;
	    headers = xhr.getAllResponseHeaders()
	    
	    headersArray = headers.split('\n');
 		headersArray.shift();
 		headersArray.pop();

		headersArray.forEach(function(header, index, headersArray) {
         var name, indexSeparator, value;
         	 		
	 		indexSeparator = header.indexOf(':'); 
	        name = header.substr(0,indexSeparator);

	        value = header.substr(indexSeparator + 1).trim(); 
	        headersObj[name] = value; 
 		
 		});
	    
		Y.Assert.areSame(302,result); 
		Y.Assert.areSame("http://127.0.0.1:8081/index0.waPage/index.html/test.html",headersObj.Location);  
    	
    }
    
    

  };
    
    /*
    //create the console
    (new Y.Test.Console({
        newestOnTop : false,
        filters: {
            pass: true,
            fail: true
        }
    })).render('#testLogger');

    Y.Test.Runner.add(Y.example.test.ExampleSuite);

    //run the tests
    Y.Test.Runner.run();
    */
   
if(typeof dontRequireUnitTest === 'undefined'){
    require("unitTest").run(testCase).getReport();
}  