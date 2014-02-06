
exports.install = function install(installerPath, wakandaPath){
		console.log('-----Installing :');
		var cmdLine = 'cmd /u /c msiexec /i "'+installerPath+'" /passive ADDLOCAL=Feature0,Feature1 INSTALLROOTDIR="'+wakandaPath+'" /l*v "'+env.TESTBASEPATH+'log.log"';
		console.log(cmdLine);
		var result = SystemWorker.exec(cmdLine);
};

exports.uninstall = function uninstall(installerPath){
		console.log('-----Uninstalling');
		var cmdLine = 'cmd /u /c msiexec /x "'+installerPath+'" /passive /l*v "'+env.TESTBASEPATH+'log.log"';
		console.log(cmdLine);
		var result = SystemWorker.exec(cmdLine);
};

// Returns nbErrors
exports.checkErrorInLog = function checkErrorInLog(){
	console.log('-----Checking log file');
	var logText = loadText(env.TESTBASEPATH+'log.log');
	if (!logText){
		console.log('[ERROR] Log file not found');
		return 1;
	}
	
	var nbError = 0;
	var logMatch = logText.match(/.*Return value 3\./gm);
	if (logMatch)
		logMatch.forEach(function(log){
			console.log('[ERROR]' + log);
			nbError++;
		});
	else
		console.log('No error found');
	return nbError;
};

exports.checkProductVersion = function checkProductVersion(){
	console.log('-----Checking log file');
	var logText = loadText(env.TESTBASEPATH+'log.log');
	if (!logText){
		console.log('[ERROR] Log file not found');
		return 1;
	}
	
	var productVersion = 0;
	var arrayVersion = logText.match(/ProductVersion = (.*)/gm);
	if (arrayVersion)
		productVersion = arrayVersion[0].slice(17);
	else
		console.log('No product version');
	return productVersion;
};

exports.getFileAssociation = function getFileAssociation(regKey){
	console.log('-----Checking file association');
	var cmdLine = 'cmd /u /c reg query '+ regKey +' /s';
	console.log(cmdLine);
	var output = SystemWorker.exec(cmdLine).output.toString();
	var re = new RegExp('REG_SZ.*\....');
	var regArray = re.exec(output);
	var result = this.convertPathToPosix(regArray[0].slice(10));
	console.log(result);
	return result;	
};

exports.getTargetPathofShortcut = function getTargetPathofShortcut(shortCutPath){
	console.log('-----Checking shortcut');
	var cmdLine = 'cmd /u /c Shortcut.exe /F:"'+ shortCutPath +'" /A:Q';
	console.log(cmdLine);
	var ouput = SystemWorker.exec(cmdLine).output.toString();
	var re = new RegExp("TargetPath=[^.]*.exe");
	var regArray = re.exec(ouput);
	var result = this.convertPathToPosix(regArray[0].slice(11));
	console.log(result);
	return result;	
};

exports.deleteLog = function deleteLog(){
	console.log('-----Delete Log file');
	var path = env.TESTBASEPATH+'log.log';
	console.log(path);
	var logFile = File(path);
	if (logFile.exist)
		logFile.remove();
};

exports.log = function log(){
	var file = new File(env.TESTBASEPATH+'log.log');
	console.log(file);
	if (!file.exists)
		file.create();
	var stream = new TextStream(file, "write");
};

exports.convertPathToPosix = function convertPathToPosix(path){
	return path.replace(/\\\\/g, '/').replace(/\\/g, '/');
};

/*
exports.diffFolder = function diffFolder(){
	console.log('Diff between install & zip');
	var result = SystemWorker.exec('cmd /u /c C:\\cygwin\\bin\\diff.exe "./main/Wakanda Studio" "./main/Wakanda Studio2" -q -r > '+env.TESTBASEPATH+'logDiff.log');

	var logText = loadText(env.TESTBASEPATH + 'logDiff.log');
	if (!logText){
		console.log('Log file corrupted or not found');
		return 0;
	}
	
	console.log('Diff(s) found');
	console.log(logText);

	var logFile = File(env.TESTBASEPATH + 'logDiff.log');
	//if (logFile.exists)
	//	logFile.remove();
	
	return 1;
};
*/

