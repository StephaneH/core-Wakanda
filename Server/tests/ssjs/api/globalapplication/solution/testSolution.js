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
    
     name: "test API Global Application Solution",
     
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

    /*    // 1 --**-- Applications property exist

     * Cleans up everything that was created by setUp().
     */
    tearDown : function () {
   
    },
    
    
    /*
     *
     * Test methods for API SSJS Global Application Solution
     *
     */

    // 0 --**-- Object Solution exist
    testSolution_ObjectSolutionExist_0: function() {   

   	Y.Assert.isObject(solution);   
    
      },

    // 1 --**-- solution is available in Global Application
    testSolution_IsAvailableInApplication_1: function() {   
    
    Y.Assert.isObject(application.solution);   
    
      },

    // 2 --**-- Applications property exist
    testSolution_ApplicationsPropertyExist_2: function() {   
    
    Y.Assert.isArray(solution.applications);   
    
      },

    // 3 --**-- Name property exist
    testSolution_NamePropertyExist_3: function() {   
        
    Y.Assert.isString(solution.name);   
    
     },

    // 4 --**-- RecentlyOpened property exist
    testSolution_recentlyOpenedPropertyExist_4: function() {   
   
    Y.Assert.isArray(solution.recentlyOpened);
    
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