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
include(solution.getFolder().path+'testQuery.js');
var utils = require('utils');


testCase.name ='test Queries on SQLBridge';
testCase.setUp = function(){
 if (typeof this.initDone === 'undefined') {
            // Do it once:
            this.initDone = true;

            var envVars = {};
			try {
				envVars = unitTest.getenv();
			}
			catch (e) {
			
			}

			if (os.isWindows) {
				var src = envVars.SERVER_TESTS_PATH + '\\ssjs\\modules\\mysqlconnector\\sql_scripts';
				SystemWorker.exec('xcopy /e /s /r /y "' + src + '" "' + envVars + '"'); 
				SystemWorker.exec('"' + envVars.WORKSPACE + '\\testdb_win.bat"');			
			}
			if (os.isMac) {
				var src = envVars.SERVER_TESTS_PATH + '/ssjs/modules/mysqlconnector/sql_scripts/*';
                SystemWorker.exec('bash -c "cp -Rf ' + src + ' ' + envVars.WORKSPACE + '/"');
                SystemWorker.exec('bash -c "chmod u+x ' + envVars.WORKSPACE + '/testdb_mac.sh"'); 
                SystemWorker.exec('bash -c "cd ' + envVars.WORKSPACE + ' && ' + envVars.WORKSPACE + '/testdb_mac.sh"');
			}
			if (os.isLinux) {
				var src = envVars.SERVER_TESTS_PATH + '/ssjs/modules/mysqlconnector/sql_scripts/*';
                SystemWorker.exec('bash -c "cp -Rf  ' + src + ' ' + envVars.WORKSPACE + '/"'); 
                SystemWorker.exec('bash -c "chmod u+x ' + envVars.WORKSPACE + '/testdb_linux.sh"'); 
                SystemWorker.exec('bash -c "cd ' + envVars.WORKSPACE + ' && ' + envVars.WORKSPACE + '/testdb_linux.sh"');
			}			
        }
}
var toBeIgnored = JSON.parse(loadText(application.getFolder('path')+"ignoredTests/" + 'ignoredTestQuery.json'));
utils.extend(testCase._should.ignore,toBeIgnored);

//require("unitTest").run(testCase).getReport();
