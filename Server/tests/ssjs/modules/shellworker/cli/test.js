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
 * Test suite for the ShellWorker module (CLI).
 *
 * @author sebastien.courvoisier@4d.com
 */

var shellWorkerIsAvailable = true;
try {
	var shellWorker = require('shellWorker');
} catch (e) {
	shellWorkerIsAvailable = false;
}

var unitTest = require('unitTest');
var env = unitTest.getenv();
if (typeof env.WORKSPACE === 'undefined') {
	if (os.isWindows) {
		env.WORKSPACE = 'C:';
	} else {
		env.WORKSPACE = '/';
	}
}

if (typeof env.P4_WORKSPACE_PATH === 'undefined') {
	if (os.isWindows) {
		env.P4_WORKSPACE_PATH = 'C:';
	} else {
		env.P4_WORKSPACE_PATH = '/';
	}
}

var testCase = {
	name: 'Test suite for the ShellWorker module (SSJS)',

	// Ignored tests (waiting for clarifications or implementations):
	_should: {
		ignore: {

		}
	},

	// Setup test suite:
	setUp: function() {

	},

	tearDown: function() {

	},

	// Module exist:    
	testModuleIsAvailable: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
	},

	testModuleIsObject: function() {
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
	},

	// Classes methods and properties exist:    
	testExecMethodExists: function() {
		Y.Assert.isFunction(shellWorker.exec, 'shellWorker.exec is not a Function');
	},

	testCreateMethodExists: function() {
		Y.Assert.isFunction(shellWorker.create, 'shellWorker.create is not a Function');
	},

	// Module business logic (sync):
	testWrongCommand: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.exec, 'shellWorker.exec is not a Function');
		var commandHasFailed = false;
		try {
			var result = shellWorker.exec('Cowabunga!');
		} catch (e) {
			commandHasFailed = true;
		}
		Y.Assert.isTrue(commandHasFailed, 'An exception should have been thrown');
	},

	test1Arg: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.exec, 'shellWorker.exec is not a Function');
		if (os.isWindows) {
			var cmd = 'cd';
			var expected = env.WORKSPACE;
		} else {
			var cmd = 'pwd';
			var expected = env.WORKSPACE;
		}
		var result = shellWorker.exec(cmd);
		Y.Assert.areSame(expected.toLowerCase(), result.replace(/^\s+/g, '').replace(/\s+$/g, '').toLowerCase());
	},

	test2ArgsFolder: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.exec, 'shellWorker.exec is not a Function');
		var folder = new Folder(env.P4_WORKSPACE_PATH);
		if (os.isWindows) {
			var cmd = 'cd';
			var expected = folder.path.substr(0, folder.path.length - 1).replace(/\//g, '\\');
		} else {
			var cmd = 'pwd';
			var expected = folder.path.substr(0, folder.path.length - 1);
		}
		var result = shellWorker.exec(cmd, folder);
		Y.Assert.areSame(expected.toLowerCase(), result.replace(/^\s+/g, '').replace(/\s+$/g, '').toLowerCase());
	},

	test2ArgsString: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.exec, 'shellWorker.exec is not a Function');
		var folder = env.P4_WORKSPACE_PATH;
		if (os.isWindows) {
			var cmd = 'cd';
			var expected = folder;
		} else {
			var cmd = 'pwd';
			var expected = folder;
		}
		var result = shellWorker.exec(cmd, folder);
		Y.Assert.areSame(expected.toLowerCase(), result.replace(/^\s+/g, '').replace(/\s+$/g, '').toLowerCase());
	},

	test3Args: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.exec, 'shellWorker.exec is not a Function');
		if (os.isWindows) {
			var cmd = 'set FOO';
			var expected = 'FOO=bar';
		} else {
			var cmd = 'echo $FOO';
			var expected = 'bar';
		}
		var result = shellWorker.exec(cmd, null, {
			FOO: 'bar'
		});
		Y.Assert.areSame(expected.toLowerCase(), result.replace(/^\s+/g, '').replace(/\s+$/g, '').toLowerCase());
	},

	// Module business logic (async):
	testWrongCommandAsync: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.create, 'shellWorker.create is not a Function');
		var test = this;
		var commandHasFailed = false;
		var worker = shellWorker.create("Cowabunga!");
		worker.onerror = function() {
			commandHasFailed = true;
		};
		worker.onterminated = function() {
			test.resume(function() {
				Y.Assert.isTrue(commandHasFailed, 'The onerror handler should have been called');
			});
		};
		this.wait(1000);
	},

	test1ArgAsync: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.create, 'shellWorker.create is not a Function');
		var test = this;
		if (os.isWindows) {
			var cmd = 'cd';
			var expected = env.WORKSPACE;
		} else {
			var cmd = 'pwd';
			var expected = env.WORKSPACE;
		}
		var result = '';
		var worker = shellWorker.create(cmd);
		worker.onmessage = function(msg) {
			result += msg;
		};
		worker.onterminated = function() {
			test.resume(function() {
				Y.Assert.areSame(expected.toLowerCase(), result.replace(/^\s+/g, '').replace(/\s+$/g, '').toLowerCase());
			});
		};
		this.wait(1000);
	},

	test2ArgsFolderAsync: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.create, 'shellWorker.create is not a Function');
		var test = this;
		var folder = new Folder(env.P4_WORKSPACE_PATH);
		if (os.isWindows) {
			var cmd = 'cd';
			var expected = folder.path.substr(0, folder.path.length - 1).replace(/\//g, '\\');
		} else {
			var cmd = 'pwd';
			var expected = folder.path.substr(0, folder.path.length - 1);
		}
		var result = '';
		var worker = shellWorker.create(cmd, folder);
		worker.onmessage = function(msg) {
			result += msg;
		};
		worker.onterminated = function() {
			test.resume(function() {
				Y.Assert.areSame(expected.toLowerCase(), result.replace(/^\s+/g, '').replace(/\s+$/g, '').toLowerCase());
			});
		};
		this.wait(1000);
	},

	test2ArgsStringAsync: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.create, 'shellWorker.create is not a Function');
		var test = this;
		var folder = env.P4_WORKSPACE_PATH;
		if (os.isWindows) {
			var cmd = 'cd';
			var expected = folder;
		} else {
			var cmd = 'pwd';
			var expected = folder;
		}
		var result = '';
		var worker = shellWorker.create(cmd, folder);
		worker.onmessage = function(msg) {
			result += msg;
		};
		worker.onterminated = function() {
			test.resume(function() {
				Y.Assert.areSame(expected.toLowerCase(), result.replace(/^\s+/g, '').replace(/\s+$/g, '').toLowerCase());
			});
		};
		this.wait(1000);
	},

	test3ArgsAsync: function() {
		Y.Assert.isTrue(shellWorkerIsAvailable, 'The shellWorker module is not available');
		Y.Assert.isObject(shellWorker, 'shellWorker is not an Object');
		Y.Assert.isFunction(shellWorker.create, 'shellWorker.create is not a Function');
		var test = this;
		if (os.isWindows) {
			var cmd = 'set FOO';
			var expected = 'FOO=bar';
		} else {
			var cmd = 'echo $FOO';
			var expected = 'bar';
		}
		var result = '';
		var worker = shellWorker.create(cmd, null, {
			FOO: 'bar'
		});
		worker.onmessage = function(msg) {
			result += msg;
		};
		worker.onterminated = function() {
			test.resume(function() {
				Y.Assert.areSame(expected.toLowerCase(), result.replace(/^\s+/g, '').replace(/\s+$/g, '').toLowerCase());
			});
		};
		this.wait(1000);
	}
};

unitTest.run(testCase).getXmlReport(env.WORKSPACE + '/report.xml');
exitWait();