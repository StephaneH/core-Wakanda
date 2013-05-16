include(solution.getFolder().path+'testDataClass.js');
var utils = require('utils');


testCase.name ='test DataClass functions on SQLBridge';
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

var toBeIgnored = JSON.parse(loadText(application.getFolder('path')+"ignoredTests/" + 'ignoredTestDataClass.json'));
utils.extend(testCase._should.ignore,toBeIgnored);

//require("unitTest").run(testCase).getReport();

