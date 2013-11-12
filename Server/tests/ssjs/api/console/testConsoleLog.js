
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

//Function read File content : 
function readFile(file) {

    var readFileContent = new TextStream(file,"Read",0),
                              data = "";
    do
        { 
        data = data + readFileContent.read(1);
        }
    while(readFileContent.end() == false)
    readFileContent.close();

    return data;
}

function writeFile(TestFile,string) {
	
	var writeFileContent = new TextStream(fileTest,"Write"); 
	
	do 
	
		{
	 	 writeFileContent.write(string); 
		}
	while(writeFileContent.end() == false)
	writeFileContent.close();
	
} 

var animal = "lion", 
    count = 2, 
    action = "Create", 
    product = "Wakanda", 
    path = "C:/Program/"
    ++count; 
	
var testCase = {
    
     name: "test API ConsoleLog",
     
      _should: {
		error: {
			
			
		},
		ignore: {

		}
    },
   
     /*
     * Sets up data that is needed by each test.
     */
	 setUp : function () {
		exceptions = 0;
         
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
     * Test methods for API SSJS ConsoleLog
     *
     */
	 
 	// 0 --**-- Object console exist
 	testConsoleLog_ObjectConsoleExist_0: function() {   

	 	var result = typeof console;
 	 Y.Assert.areSame("object", result);
 	
      }, 
      
    // 1 --**-- Object console.log() exist
 	testConsoleLog_ObjectConsoleLogExist_1: function() {   

	 	var result = typeof console.log();
 	 Y.Assert.areSame("object", result);
 	
      },
      
    // 2 --**-- Object console.debug() exist
 	testConsoleLog_ObjectConsoleDebugExist_2: function() {   

	 	var result = typeof console.debug();
 	 Y.Assert.areSame("object", result);
 	
      },
      
    // 3 --**-- Object console.error() exist
 	testConsoleLog_ObjectConsoleErrorExist_3: function() {   

	 	var result = typeof console.error();
 	 Y.Assert.areSame("object", result);
 	
      },
      
    // 4 --**-- Object console.info() exist
 	testConsoleLog_ObjectConsoleInfoExist_4: function() {   

	 	var result = typeof console.info();
 	 Y.Assert.areSame("object", result);
 	
      },
      
    // 5 --**-- Object console.warn() exist
 	testConsoleLog_ObjectConsoleWarnExist_5: function() {   

	 	var result = typeof console.warn();
 	 Y.Assert.areSame("object", result);
 	
      }, 

    // 6 --**-- Create a console error Message 
    testConsoleLog_ErrorMessage_6: function() { 

        console.error("Action failed:", action);
        
        wait(500);
        
        var file = new File ( solution.getFolder('path') + "Logs/testConsoleLog_log_1.txt");
    
        var stringResult = readFile(file).search("Action failed:");
        
      Y.Assert.areNotSame(-1,stringResult);
  
      },
      
    // 7 --**-- Create a console Info Message 
    testConsoleLog_InfoMessage_7: function() { 

        console.info("Product updated:", product);
        
        wait(500);
        
        var file = new File( solution.getFolder('path') + "Logs/testConsoleLog_log_1.txt"); 

        var stringResult = readFile(file).search("Product updated:"); 

      Y.Assert.areNotSame(-1,stringResult);
  
      },
      
    // 8 --**-- Create a console log Message 
    testConsoleLog_LogMessage_8: function() { 

        console.log("The %s jumped over %d tall buildings", animal, count);
         
        wait(500);
        
        var file = new File( solution.getFolder('path') + "Logs/testConsoleLog_log_1.txt"); 

        var stringResult = readFile(file).search("lion"); 
        	
      Y.Assert.areNotSame(-1,stringResult);
  
      }, 

    // 9 --**-- Create a console warn Message 
    testConsoleLog_WarnMessage_9: function() { 

        console.warn("File not found:", path);

        wait(500);
        
        var file = new File( solution.getFolder('path') + "Logs/testConsoleLog_log_1.txt"); 

        var stringResult = readFile(file).search("File not found:"); 
          
      Y.Assert.areNotSame(-1,stringResult);
  
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