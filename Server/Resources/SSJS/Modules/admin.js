
/**
 * Varify application data
 * 
 * @param {Object} option
 * 	contain at least :
 * 		applicationName : name of application to verify
 * 		solutionPath : path of solution file
 * 	optional :
 * 		 progressName : progress widget name to provide a progress indicator (default value is adminProgress)
 */
exports.Verify = function verify(option) {
	
	var app,
		log,
		res,
		sol,
		date,
		logName,
		options,
		dataPath,
		dataName,
		folderLog,
		modelData,
		modelFile,
		currentDate,
		solutionOpened,
		progressIndicator,
		currentProgressTitle;
	
	progressIndicator = null;
	if(!option.hasOwnProperty("progressName")) {
		option.progressName = "adminProgress";
	}
	
	function myOpenProgress(title, maxElements) {
		
		if(progressIndicator === null) {
			
			progressIndicator = ProgressIndicator(maxElements, title+" element {curValue} on {maxValue}", false, "", option.progressName);
		} else {
			
			progressIndicator.subSession(maxElements, title+" element {curValue} on {maxValue}", false);
		}
		
		currentProgressTitle = title;
		
		log.appendToLog(title + " on " + maxElements + " elements");
		addLog(title + " on " + maxElements + " elements");
	}

	function myProgress(curElement, maxElements) {
		
		progressIndicator.setValue(curElement);
		log.appendToLog(currentProgressTitle + " - " + curElement + "/" + maxElements);
	}

	function myCloseProgress() {
		
		log.appendToLog("End "+currentProgressTitle);
		currentProgressTitle = "";
		progressIndicator.endSession();
	}

	function myAddProblem(problem) {
		var formatedProblem;
		
		formatedProblem = formatProblem(problem);
		this.storedProblems.push(formatedProblem);
		log.appendToLog(problem.ErrorText);
	}
	
	sol = null;
	
	try {
		
		if(solution.getFolder('path') + solution.name + ".waSolution" === option.solutionPath) {
			
			sol = solution;
			solutionOpened = false;
		} else {
			
			sol = internal.openSolution(option.solutionPath, 2);
			solutionOpened = true;
		}
		if((sol !== null) && ( typeof sol !== 'undefined')) {
			
			app = sol.getApplicationByName(option.applicationName);

			if((app.getItemsWithRole("data") == null) || ( typeof app.getItemsWithRole("data") == 'undefined')) {

				options = {
					'storedProblems' : []
				}
				return options.storedProblems;

			}
			
			modelFile = File(app.getItemsWithRole("catalog").path);
			
			modelData = File(app.getItemsWithRole("data").path);

			dataPath = app.getItemsWithRole("data").path;
			dataPath = dataPath.replace(app.getItemsWithRole("data").name, "");

			folderLog = Folder(dataPath + 'Logs');

			if(!folderLog.exists) {//check for subfolder named Documents
				try {
					folderLog.create();
					//if not there, create it
				} catch (e) {//if you can't create it, then error out
					return {
						error : 5,
						errorMessage : ' could not create doc folder'
					};
				}
			}

			date = new Date();
			currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
			logName = 'verify ' + app.name + ' ' + currentDate + '.waLog';
			log = new Log(dataPath + 'Logs/' + logName);

			options = {
				'openProgress' : myOpenProgress,
				'closeProgress' : myCloseProgress,
				'progress' : myProgress,
				'addProblem' : myAddProblem,

				// you can add any custom code here, it will be passed to the
				// addProblem function in the 'this' keyword
				'storedProblems' : [] // we add an array to store any problems that arise
			}

			app.verifyDataStore(modelFile, modelData, options);

			if(options.storedProblems.length > 0) {

				log.appendToLog(options.storedProblems.length + " errors found");
				res = {
					errors : options.storedProblems,
					file : {
						name : log.logFile.name,
						date : log.logFile.creationDate,
						path : log.logFile.path
					}
				};
				return res;
			} else {
				log.appendToLog("no errors found");
				res = {
					errors : options.storedProblems,
					file : {
						name : log.logFile.name,
						date : log.logFile.creationDate,
						path : log.logFile.path
					}
				};
				return res;
			}

		}

	} catch(e) {
		console.log(e);
	} finally {
		
		try {
			if(sol !== null && solutionOpened) {
				sol.close();
			}
		} catch(e) {
		}
	}
	
	return res;
	
}

/**
 * Repair application data
 * 
 * @param {Object} option
 * 	contain at least :
 * 		applicationName : name of application to repair
 * 		solutionPath : path of solution file
 * 	optional :
 * 		 progressName : progress widget name to provide a progress indicator (default value is adminProgress)
 */
exports.Repair = function repair(option) {
	
	var app,
		log,
		res,
		sol,
		date,
		logName,
		folderM,
		options,
		dataPath,
		dataName,
		folderLog,
		modelData,
		modelFile,
		repairDest,
		currentDate,
		modeleIndexFile,
		modeleMatchFile,
		progressIndicator,
		currentProgressTitle,
		modeleIndexRepairedFile,
		modeleMatchRepairedFile;

	progressIndicator = null;
	if(!option.hasOwnProperty("progressName")) {
		option.progressName = "adminProgress";
	}
	
	function myOpenProgress(title, maxElements) {
		
		log.appendToLog(title + " on " + maxElements + " elements");
		addLog(title + " on " + maxElements + " elements");
		
		currentProgressTitle = title;
		
		if(progressIndicator === null) {
			progressIndicator = ProgressIndicator(maxElements, title+" element {curValue} on {maxValue}", false, "", option.progressName);
		} else {
			progressIndicator.subSession(maxElements, title+" element {curValue} on {maxValue}", false);
		}
	}

	function myProgress(curElement, maxElements) {
		
		progressIndicator.setValue(curElement);
		log.appendToLog(currentProgressTitle + " - " + curElement + "/" + maxElements);
	}

	function myCloseProgress() {
		log.appendToLog("End "+currentProgressTitle);
		currentProgressTitle = "";
		progressIndicator.endSession();
	}

	function myAddProblem(problem) {
		var formatedProblem;
		
		formatedProblem = formatProblem(problem);
		this.storedProblems.push(formatedProblem);
		log.appendToLog(problem.ErrorText);

	}

	sol = null;
	
	try {
		
		sol = internal.openSolution(option.solutionPath, 2);
		if((sol != null) && ( typeof sol != 'undefined')) {
			app = sol.getApplicationByName(option.applicationName);

			if((app.getItemsWithRole("data") == null) || ( typeof app.getItemsWithRole("data") == 'undefined')) {

				options = {
					'storedProblems' : []
				}
				return options.storedProblems;

			}
			modelFile = File(app.getItemsWithRole("catalog").path);
			
			modelData = File(app.getItemsWithRole("data").path);
			
			dataPath = app.getItemsWithRole("data").path;
			dataPath = dataPath.replace(app.getItemsWithRole("data").name, "");
			dataName = app.getItemsWithRole("data").name.replace(".waData", "");


			folderLog = Folder(dataPath + 'Logs');

			if(!folderLog.exists) {//check for subfolder named Documents
				try {
					folderLog.create();
					//if not there, create it
				} catch (e) {//if you can't create it, then error out
					return {
						error : 5,
						errorMessage : ' could not create doc folder'
					};
				}
			}
			
			date = new Date();
			currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
			
			folderM = Folder(dataPath + 'Replaced files (repairing) ' + currentDate);

			if(!folderM.exists) {//check for subfolder named Documents
				try {
					folderM.create();
					//if not there, create it
				} catch (e) {//if you can't create it, then error out
					return {
						error : 5,
						errorMessage : ' could not create doc folder'
					};
				}
			}
			
			logName = 'repair ' + app.name + ' ' + currentDate + '.waLog';
			log = new Log(dataPath + 'Logs/' + logName);
			
			repairDest = File(dataPath + 'Replaced files (repairing) ' + currentDate +'/repaired_' + app.getItemsWithRole("data").name);

			options = {
				'openProgress' : myOpenProgress,
				'closeProgress' : myCloseProgress,
				'progress' : myProgress,
				'addProblem' : myAddProblem,

				// you can add any custom code here, it will be passed to the
				// addProblem function in the 'this' keyword
				'storedProblems' : [] // we add an array to store any problems that arise
			}
			
			app.repairDataStore(modelFile, modelData, options, repairDest);
			
			if(options.storedProblems.length > 0) {

				log.appendToLog(options.storedProblems.length + " errors found");
				
				res = {
					errors : options.storedProblems,
					file : {
						name : log.logFile.name,
						date : log.logFile.creationDate,
						path : log.logFile.path
					}
				};
				
			} else {
				log.appendToLog("no errors found");
			}
				
			//Replace Data file
			modelData.copyTo(dataPath + 'Replaced files (repairing) ' + currentDate +'/' + app.getItemsWithRole("data").name);
			repairDest.moveTo(modelData, true);
			
			//Replace Index File
			if(File.isFile(dataPath + dataName + '.waIndx')) {
				modeleIndexFile = File(dataPath + dataName + '.waIndx');
				modeleIndexFile.copyTo(dataPath + 'Replaced files (repairing) ' + currentDate +'/' + dataName + '.waIndx', true);
				
				modeleIndexRepairedFile = File(dataPath + 'Replaced files (repairing) ' + currentDate +'/repaired_' + dataName + '.waIndx');
				modeleIndexRepairedFile.moveTo(modeleIndexFile, true);
			}
			
			//Replace Match File
			if(File.isFile(dataPath + dataName + '.Match')) {
				modeleMatchFile = File(dataPath + dataName + '.Match');
				modeleMatchFile.copyTo(dataPath + 'Replaced files (repairing) ' + currentDate +'/' + dataName + '.Match', true);
				
				modeleMatchRepairedFile = File(dataPath + 'Replaced files (repairing) ' + currentDate +'/repaired_' + dataName + '.Match');
				modeleMatchRepairedFile.moveTo(modeleMatchFile, true);
			}
			
			res = {
				errors : options.storedProblems,
				file : {
					name : log.logFile.name,
					date : log.logFile.creationDate,
					path : log.logFile.path
				}
			};
			
		}

	} catch(e) {
		console.log("ERROR", e);
	} finally {
		try {
			
			if(sol !== null) {
				sol.close();
			}

		} catch(e) {
		}
	}
	
	return res;

}

/**
 * Compact application data
 * 
 * @param {Object} option
 * 	contain at least :
 * 		applicationName : name of application to compact
 * 		solutionPath : path of solution file
 * 	optional :
 * 		 progressName : progress widget name to provide a progress indicator (default value is adminProgress)
 */
exports.Compact = function compact(option) {
	
	var app,
		log,
		res,
		sol,
		date,
		folderM,
		logName,
		options,
		dataPath,
		dataName,
		folderLog,
		modelFile,
		modelData,
		currentDate,
		compactDest,
		modeleIndexFile,
		modeleMatchFile,
		progressIndicator,
		currentProgressTitle,
		modeleIndexCompactedFile,
		modeleMatchCompactedFile;
	
	progressIndicator = null;
	if(!option.hasOwnProperty("progressName")) {
		option.progressName = "adminProgress";
	}
	
	function myOpenProgress(title, maxElements) {
		
		log.appendToLog(title + " on " + maxElements + " elements");
		addLog(title + " on " + maxElements + " elements");
		
		currentProgressTitle = title;
		
		if(progressIndicator === null) {
			progressIndicator = ProgressIndicator(maxElements, title+" element {curValue} on {maxValue}", false, "", option.progressName);
		} else {
			progressIndicator.subSession(maxElements, title+" element {curValue} on {maxValue}", false);
		}
	}

	function myProgress(curElement, maxElements) {
		
		progressIndicator.setValue(curElement);
		log.appendToLog(currentProgressTitle + " - " + curElement + "/" + maxElements);
	}

	function myCloseProgress() {
		
		log.appendToLog("End "+currentProgressTitle);	
		currentProgressTitle = "";
		progressIndicator.endSession();
	}

	function myAddProblem(problem) {
		var formatedProblem;
		
		formatedProblem = formatProblem(problem);
		this.storedProblems.push(formatedProblem);
		log.appendToLog(problem.ErrorText);

	}

	sol = null;
	
	try {
		
		sol = internal.openSolution(option.solutionPath, 2);
		
		if((sol != null) && ( typeof sol != 'undefined')) {
			app = sol.getApplicationByName(option.applicationName);

			if((app.getItemsWithRole("data") == null) || ( typeof app.getItemsWithRole("data") == 'undefined')) {

				options = {
					'storedProblems' : []
				}
				return options.storedProblems;

			}
			
			modelFile = File(app.getItemsWithRole("catalog").path);
			
			modelData = File(app.getItemsWithRole("data").path);

			dataPath = app.getItemsWithRole("data").path;
			dataPath = dataPath.replace(app.getItemsWithRole("data").name, "");
			dataName = app.getItemsWithRole("data").name.replace(".waData", "");

			folderLog = Folder(dataPath + 'Logs');

			if(!folderLog.exists) {//check for subfolder named Documents
				try {
					folderLog.create();
					//if not there, create it
				} catch (e) {//if you can't create it, then error out
					return {
						error : 5,
						errorMessage : ' could not create doc folder'
					};
				}
			}
			
			date = new Date();
			currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
			
			folderM = Folder(dataPath + 'Replaced files (compacting) ' + currentDate);

			if(!folderM.exists) {//check for subfolder named Documents
				try {
					folderM.create();
					//if not there, create it
				} catch (e) {//if you can't create it, then error out
					return {
						error : 5,
						errorMessage : ' could not create doc folder'
					};
				}
			}

			logName = 'compact ' + app.name + ' ' + currentDate + '.waLog';
			log = new Log(dataPath + 'Logs/' + logName);

			compactDest = File(dataPath + 'Replaced files (compacting) ' + currentDate + '/compacted_' + app.getItemsWithRole("data").name);
			
			options = {
				'openProgress' : myOpenProgress,
				'closeProgress' : myCloseProgress,
				'progress' : myProgress,
				'addProblem' : myAddProblem,

				// you can add any custom code here, it will be passed to the
				// addProblem function in the 'this' keyword
				'storedProblems' : [] // we add an array to store any problems that arise
			}

			app.compactDataStore(modelFile, modelData, options, compactDest);

			if(options.storedProblems.length > 0) {

				log.appendToLog(options.storedProblems.length + " errors found");
				
				res = {
					errors : options.storedProblems,
					file : {
						name : log.logFile.name,
						date : log.logFile.creationDate,
						path : log.logFile.path
					}
				};
			} else {
				log.appendToLog("no errors found");
			}
				
			//Replace Data file
			modelData.copyTo(dataPath + 'Replaced files (compacting) ' + currentDate + '/' + app.getItemsWithRole("data").name, true);
			compactDest.moveTo(modelData, true);
			
			//Replace Index File
			if(File.isFile(dataPath + dataName + '.waIndx')) {
				modeleIndexFile = File(dataPath + dataName + '.waIndx');
				modeleIndexFile.copyTo(dataPath + 'Replaced files (compacting) ' + currentDate + '/' + dataName + '.waIndx', true);
				
				modeleIndexCompactedFile = File(dataPath + 'Replaced files (compacting) ' + currentDate + '/compacted_' + dataName + '.waIndx');
				modeleIndexCompactedFile.moveTo(modeleIndexFile, true);
			}
			
			//Replace Match File
			if(File.isFile(dataPath + dataName + '.Match')) {
				modeleMatchFile = File(dataPath + dataName + '.Match');
				modeleMatchFile.copyTo(dataPath + 'Replaced files (compacting) ' + currentDate + '/' + dataName + '.Match', true);
				
				modeleMatchCompactedFile = File(dataPath + 'Replaced files (compacting) ' + currentDate + '/compacted_' + dataName + '.Match');
				modeleMatchCompactedFile.moveTo(modeleMatchFile, true);
			}
			
			res = {
				errors : options.storedProblems,
				file : {
					name : log.logFile.name,
					date : log.logFile.creationDate,
					path : log.logFile.path
				}
			};
		}

	} catch(e) {
		console.log(e)
	} finally {
		try {

			if(sol !== null) {
				sol.close();
			}

		} catch(e) {
		}
	}
				
	return res;

}

/**
 * Open solution
 * 
 * @param {String} path path of the .waSolution file
 */
exports.openSolution = function open_solution(path) {
	try {
		internal.openSolution(path, 1);
		return true;
		
	} catch(e) {
		console.log("Error : ", e);
		return false;
	}
}

/**
 * Close current Solution
 */
exports.closeSolution = function close_solution() {
	solution.close();
	return true;
}

function formatProblem(problem) {
	
	var i,
		paramName,
		ERROR_LEVEL,
		paramExtract,
		paramExtractReg;
	
	ERROR_LEVEL = {
		"1": "Fatal Error",
		"2": "Regular Error",
		"3": "Warning"
	};
	
	problem.ErrorLevelLabel = ERROR_LEVEL[problem.ErrorLevel];
	
	paramExtractReg = new RegExp("\{(.*?)\}", "gi");
	paramExtract = problem.ProblemTypeText.match(paramExtractReg);
	
	for(i = 0; i < paramExtract.length; i++) {
		
		paramName = paramExtract[i].substring(1, (paramExtract[i].length -1));
		problem.ProblemTypeText = problem.ProblemTypeText.replace(paramExtract[i], problem[paramName]);
		
		delete problem[paramName];
	}
	
	return problem;
}

function Log(file) {// Constructor function definition
	
	var log;
	
	log = {
		appendToLog : function(myMessage) {// append function
			var file,
				stream;
			
			file = this.logFile;
			
			if(file != null) {
				if(!file.exists) {// if the file does not exist
					file.create();
				}
				// create it
				stream = TextStream(file, "write");
				// open the stream in write mode
				stream.write(myMessage + "\n");
				// append the message to the end of stream
				stream.close();
				// do not forget to close the stream
			}
		},
		init : function(file) {// to initialize the log
		
			this.logFile = file;
			if(file.exists) {
				file.remove();
			}
			file.create();
		},
		set : function(file) {// to create the log file
		
			if( typeof file == "string") {// only text files can be created
				file = File(file);
			}
			this.logFile = file;
		},
		logFile : null
	}

	log.set(file);

	return log;
}


function addLog(log) {
	
	var i,
		maxTry,
		logged,
		maintenanceLog;
	
	logged = false;
	maxTry = 3;
	i = 0;
	
	while(logged === false && i < maxTry) {
		
		if(storage.tryLock()) {
			maintenanceLog = storage.getItem("maintenanceLog");
			if(maintenanceLog === null) {
				maintenanceLog = [];
			}
			maintenanceLog.push(log);
			storage.setItem("maintenanceLog", maintenanceLog);
			storage.unlock();
			
			logged = true;
		}
		
		i++;
	}
	
	if(logged === false) {
		console.info("Cannot Log: " + log);
	}

}

exports.getMaintenanceLog = function get_maintenance_log(fromId) {
	
	var length,
		returnLog,
		maintenanceLog;
	
	maintenanceLog = storage.getItem("maintenanceLog");
	if(maintenanceLog === null) {
		maintenanceLog = [];
	}
	
	length = maintenanceLog.length;
	
	returnLog = {
		maxId : length,
		messages : maintenanceLog.slice(fromId, length)
	}
	
	return returnLog;
	
}