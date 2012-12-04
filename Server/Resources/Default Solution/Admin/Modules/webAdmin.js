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

include('./script/md5.js');
var admin = require("admin");

exports.getMaintenanceLog = function get_maintenance_log(fromId) {
	
	return admin.getMaintenanceLog(fromId);
}

exports.Files = function files(option) {
	var pos,
		sol,
		app,
		obj,
		hash,
		dataPath,
		folderlog,
		recentSolution,
		newSolutionOpen,
		logFilePathHash,
                dataFolderName;
	
	sol = null;
	
	recentSolution = getRecentSolutionFromStorage(option.hash);

	try {
	
		if(recentSolution.path !== solution.getFolder().path + solution.name + ".waSolution") {
			
			sol = internal.openSolution(recentSolution.path, 2);
			newSolutionOpen = true;
			
		} else {
			sol = solution;
			newSolutionOpen = false;
		}
		
		if((sol != null) && ( typeof sol != 'undefined')) {
                    
			app = sol.getApplicationByName(option.applicationName);
                        //data folder in wak2 called data and in wak3 called dataFolder 
                        if(Folder.isFolder(app.getFolder().path+"DataFolder")){
                           dataFolderName =  "dataFolder";
                        } else {
                           dataFolderName =  "data"; 
                        }
                        
			if((app.getItemsWithRole(dataFolderName) == null) || ( typeof app.getItemsWithRole(dataFolderName) == 'undefined')) {

				obj = {};
				obj.files = [];
			} else {

				dataPath = app.getItemsWithRole(dataFolderName).path;
				dataPath = dataPath.replace(app.getItemsWithRole(dataFolderName).name+"/", "");
	
				folderlog = Folder(dataPath + 'Logs');
	
				obj = {};
				obj.files = {
					"verify" : [],
					"repair" : [],
					"compact" : [],
					"unknow" : []
				};
				logFilePathHash = {};
				folderlog.forEachFile(function(file) {
					
					var fileObject;
	
					fileObject = {};
					fileObject.name = file.name;
					fileObject.date = file.creationDate;
					hash = hex_md5(file.path);
					logFilePathHash[hash] = file.path;
					fileObject.path = hash;
					
					if(file.name.substr(0, 6) === "verify") {
						
						obj.files.verify.push(fileObject);
					} else if(file.name.substr(0, 6) === "repair") {
						
						obj.files.repair.push(fileObject);
					} else if(file.name.substr(0, 7) === "compact") {
						
						obj.files.compact.push(fileObject);
					} else {
						
						obj.files.unknow.push(fileObject);
					}
				
				});
			}
			
			if(storage.tryLock()) {
				storage.setItem("logFilePathHash", logFilePathHash);
				storage.unlock();
			}
			
		}
	} catch (e) {
	} finally {
		if((sol !== null) && ( typeof sol !== 'undefined') && newSolutionOpen) {
			sol.close();
			sol = null;
		}
	}
	
	return obj;
}

function getRecentSolutionFromStorage(hash) {
	var recentSolutions = storage.recentSolutions;
	
	if(recentSolutions === undefined || !recentSolutions.hasOwnProperty(hash)) {
		exports.getRecentSolutions();
		recentSolutions = storage.recentSolutions;
	}
	
	return recentSolutions[hash];
}

// Verify function
exports.verifyApplication = function verify_application(option) {
	
	var recentSolution = getRecentSolutionFromStorage(option.hash);
	
	return admin.Verify({
		applicationName : option.applicationName,
		solutionPath : recentSolution.path
	});
}

//Repair Function
exports.repairApplication = function repair_application(option) {
	
	var recentSolution = getRecentSolutionFromStorage(option.hash);
	
	return admin.Repair({
		applicationName : option.applicationName,
		solutionPath : recentSolution.path
	});
}

// Compact Function
exports.compactApplication = function compact_application(option) {
	
	var recentSolution = getRecentSolutionFromStorage(option.hash);
	
	return admin.Compact({
		applicationName : option.applicationName,
		solutionPath : recentSolution.path
	});
}

exports.setService = function set_service(applicationName, serviceName, enable) {
	var service,
		application;
	
	application = solution.getApplicationByName(applicationName);
	service = application[serviceName];(enable) ? service.enable() : service.disable();

	return service.enabled;
}

exports.setServer = function set_server(applicationName, serverName, start) {
	var server,
		application;
	
	application = solution.getApplicationByName(applicationName);
	server = application[serverName];
	(start) ? server.start() : server.stop();

	return server.started;
}

exports.stopRPCForApp = function stop_rpc_for_app(appName) {
	var app,
		rpcService;
	
	app = solution.getApplicationByName(appName);

	rpcService = require("services/rpc").getInstanceFor(app);
	if((rpcService != null) && ( typeof rpcService != 'undefined')) {
		rpcService.stop();
		return !rpcService.isStarted();
	}
	return false;
}

exports.startRPCForApp = function start_rpc_for_app(appName) {
	var app,
		rpcService;
	
	app = solution.getApplicationByName(appName);

	rpcService = require("services/rpc").getInstanceFor(app);
	if((rpcService != null) && ( typeof rpcService != 'undefined')) {
		rpcService.start();
		return rpcService.isStarted();
	}
	return false;
}

exports.stopDataServiceForApp = function stop_data_service_for_app(appName) {
	var app,
		dataStoreService;
	
	app = solution.getApplicationByName(appName);

	dataStoreService = require("services/dataStore").getInstanceFor(app);
	if((dataStoreService != null) && ( typeof dataStoreService != 'undefined')) {
		dataStoreService.stop();
		return !dataStoreService.isStarted();
	}
	return false;
}

exports.startDataServiceForApp = function start_data_service_for_app(appName) {
	var app,
		dataStoreService;
	
	app = solution.getApplicationByName(appName);

	dataStoreService = require("services/dataStore").getInstanceFor(app);
	if((dataStoreService != null) && ( typeof dataStoreService != 'undefined')) {
		dataStoreService.start();
		return dataStoreService.isStarted();
	}
	return false;
}

exports.stopWebAppForApp = function stop_web_app_for_app(appName) {
	var app,
		webAppService;
	
	app = solution.getApplicationByName(appName);

	webAppService = require("services/webApp").getInstanceFor(app);
	if((webAppService != null) && ( typeof webAppService != 'undefined')) {
		webAppService.stop();
		return !webAppService.isStarted();
	}
	return false;
}

exports.startWebAppForApp = function start_web_app_for_app(appName) {
	var app,
		webAppService;
	
	app = solution.getApplicationByName(appName);

	webAppService = require("services/webApp").getInstanceFor(app);
	if((webAppService != null) && ( typeof webAppService != 'undefined')) {
		webAppService.start();
		return webAppService.isStarted();
	}
	return false;
}

exports.stopHTTPServerForApp = function stop_HTTP_server_for_app(appName) {
	var app;
	
	app = solution.getApplicationByName(appName);
	if(app.httpServer.started) {
		app.httpServer.stop();
	}
	return true;

	//return !app.httpServer.started;
}

exports.startHTTPServerForApp = function start_HTTP_server_for_app(appName) {
	var app;
	
	app = solution.getApplicationByName(appName);
	if(!app.httpServer.started) {
		app.httpServer.start();
	}

	return app.httpServer.started;
}

exports.stopSqlServerForApp = function stop_sql_server_for_app(appName) {
	var app;
	
	app = solution.getApplicationByName(appName);
	if(app.sqlServer.started) {
		app.sqlServer.stop();
	}

	return !app.sqlServer.started;
}

exports.startSqlServerForApp = function start_sql_server_for_app(appName) {
	var app;
	
	app = solution.getApplicationByName(appName);
	if(!app.sqlServer.started) {
		app.sqlServer.start();
	}

	return app.sqlServer.started;
}

exports.getSettingsFilesForApp = function get_settings_files_for_app(appName) {
	var i,
		j,
		app,
		res,
		file,
		files,
		types,
		found;
	
	types = ['project', 'http', 'webApp', 'dataService', 'rpc', 'database'];
	app = solution.getApplicationByName(appName);
	res = {};
	files = [];
	
	for(i = 0; i < types.length; i++) {
		
		file = app.getSettingFile(types[i], 'relativePath');
		res[types[i]] = {
			'file' : file
		};
		
		j = 0;
		found = false;
		
		while(!found && j < files.length) {
			if(file === files[j]) {
				found = true;
			}
			j++;
		}
		
		if(!found && file != null) {
			files.push(file);
		}
	}
	res.files = files;

	return res;
}

exports.getSolution = function get_solution() {
	var i,
        app,
        obj,
        dataPath,
        folderlog,
        rpcService,
        webAppService,
        dataStoreService,
        dataFolderName; // this var is created to maintain a compatibily between WAK3 and WAK2
        
        
	
	obj = {};
	obj.name = solution.name;
	obj.hash = hex_md5(solution.getFolder('path') + solution.name + ".waSolution");
	obj.path = solution.getFolder('path') + solution.name + ".waSolution";
	
	obj.applications = [];

	for(i = 0; i < solution.applications.length; i++) {
            //data folder in wak2 called data and in wak3 called dataFolder 
            if(Folder.isFolder(solution.applications[i].getFolder().path+"DataFolder")){
               dataFolderName =  "dataFolder";
            } else {
               dataFolderName =  "data"; 
            }
		
		app = {};
		app.name = solution.applications[i].name;
		app.path = solution.applications[i].getFolder('path');
		app.admin = solution.applications[i].administrator;
		app.pattern = solution.applications[i].pattern;

		if((solution.applications[i].getItemsWithRole("catalog") != null) && ( typeof solution.applications[i].getItemsWithRole("catalog") != 'undefined')) {
			
			app.waModel = solution.applications[i].getItemsWithRole("catalog").path;
		} else {

			app.waModel = "";
			app.waModelshort = "";
		}
		
		if((solution.applications[i].getItemsWithRole(dataFolderName) != null) && ( typeof solution.applications[i].getItemsWithRole(dataFolderName) != 'undefined')) {
			
			app.waData = solution.applications[i].getItemsWithRole(dataFolderName).path;

			dataPath = app.waData;
			dataPath = dataPath.replace(solution.applications[i].getItemsWithRole(dataFolderName).name+"/", "");

			app.files = [];

			folderlog = Folder(dataPath + 'Logs');

			folderlog.forEachFile(function(file) {
				var f;

				f = {};
				f.name = file.name
				f.date = file.creationDate
				f.path = file.path
				app.files.push(f);
				// store the file path
			});
		} else {
			
			app.waData = "";
			app.waDatashort = "";

			app.files = [];
		}

		app.http = {
			enabled : solution.applications[i].httpServer.started,
			ip : solution.applications[i].httpServer.ipAddress,
			port : solution.applications[i].httpServer.port,
			hostName : solution.applications[i].httpServer.hostName
		};

		app.webApp = {
			enabled : false,
			directoryIndex : ''
		};
		
		webAppService = require('services/webApp').getInstanceFor(solution.applications[i]);
		
		if((webAppService != null) && ( typeof webAppService != 'undefined')) {
			
			app.webApp.enabled = webAppService.isStarted();
			app.webApp.directoryIndex = solution.applications[i].settings.getItem('services')['webApp'].directoryIndex;
		}
		

		app.dataService = {
			enabled : false
		};
		
		dataStoreService = require('services/dataStore').getInstanceFor(solution.applications[i]);
		
		if((dataStoreService != null) && ( typeof dataStoreService != 'undefined')) {
			
			app.dataService.enabled = dataStoreService.isStarted();
		}

		app.rpcService = {
			enabled : false
		};
		
		rpcService = require('services/rpc').getInstanceFor(solution.applications[i]);
		
		if((rpcService != null) && ( typeof rpcService != 'undefined')) {
			app.rpcService.enabled = rpcService.isStarted();
		}
		
		app.fileService = {
			enabled : false
		};

		obj.applications.push(app);
	}

	return obj;
}

exports.getSolutionMaintenance = function get_solution_maintenance(hash) {
	
    var i,
    sol,
    obj,
    app,
    dataPath,
    folderlog,
    rpcService,
    application,
    webAppService,
    recentSolution,
    recentSolutions,
    dataStoreService,
    dataFolderName;
	
    try {
		
        sol = null;
        recentSolution = null;
        recentSolutions = storage.recentSolutions;
		
        if(recentSolutions.hasOwnProperty(hash)) {
            recentSolution = recentSolutions[hash];
        }
		
        obj = {};
		
        if(recentSolution !== null) {
            sol = internal.openSolution(recentSolution.path, 2);
			
            if((sol !== null) && ( typeof sol !== 'undefined')) {
	
                obj.name = sol.name;
                obj.hash = hex_md5(recentSolution.path);
                obj.applications = [];
                obj.settings = getSettingsFromSolution(sol);
	
                for(i = 0; i < sol.applications.length; i++) {
					
                    application = sol.applications[i];
                    
                    if(Folder.isFolder(application.getFolder().path+"DataFolder")){
                        dataFolderName =  "dataFolder";
                    } else {
                        dataFolderName =  "data"; 
                    }
					
                    app = {};
                    app.name = application.name;
                    app.path = application.getFolder('path');
                    app.admin = application.administrator;
                    app.pattern = application.pattern;
					
                    if((application.getItemsWithRole("catalog") != null) && ( typeof application.getItemsWithRole("catalog") != 'undefined')) {
						
                        app.waModel = application.getItemsWithRole("catalog").path;
	
                    } else {
	
                        app.waModel = "";
                        app.waModelshort = "";
	
                    }
					
                    if((application.getItemsWithRole(dataFolderName) != null) && ( typeof application.getItemsWithRole(dataFolderName) != 'undefined')) {
						
                        app.waData = application.getItemsWithRole(dataFolderName).path;
	
                        dataPath = app.waData;
                        dataPath = dataPath.replace(application.getItemsWithRole(dataFolderName).name+"/", "");
	
                        app.files = [];
	
                        folderlog = Folder(dataPath + 'Logs');
	
                        folderlog.forEachFile(function(file) {
                            var f;
	
                            f = {};
                            f.name = file.name
                            f.date = file.creationDate
                            f.path = file.path
                            app.files.push(f);
                        // store the file path
                        });
						
                    } else {
	
                        app.waData = "";
                        app.waDatashort = "";
                        app.files = [];
                    }
	
                    app.http = {
                        enabled : application.httpServer.started,
                        ip : application.httpServer.ipAddress,
                        port : application.httpServer.port,
                        hostName : application.httpServer.hostName
                    };
	
                    app.webApp = {
                        enabled : false,
                        directoryIndex : ''
                    };
					
                    webAppService = require('services/webApp').getInstanceFor(application);
					
                    if((webAppService != null) && ( typeof webAppService != 'undefined')) {
						
                        app.webApp.enabled = webAppService.isStarted();
                        app.webApp.directoryIndex = application.settings.getItem( 'services')['webApp'].directoryIndex;
                    }
	
                    app.dataService = {
                        enabled : false
                    };
					
                    dataStoreService = require('services/dataStore').getInstanceFor(application);
					
                    if((dataStoreService != null) && ( typeof dataStoreService != 'undefined')) {
						
                        app.dataService.enabled = dataStoreService.isStarted();
                    }
	
                    app.rpcService = {
                        enabled : false
                    };
					
                    rpcService = require('services/rpc').getInstanceFor(application);
					
                    if((rpcService != null) && ( typeof rpcService != 'undefined')) {
						
                        app.rpcService.enabled = rpcService.isStarted();
                    }
					
                    app.fileService = {
                        enabled : false
                    };
	
                    obj.applications.push(app);
                }
            } else {
                console.log("Error : cannot open " + recentSolution.name + " solution");
                sol = null;
            }

        }
    } catch (e) {
		
        sol = null;
        console.log("Error : ", e);
		
    } finally {
		
        if(sol !== null) {
            sol.close();
            sol = null;
        }
    }
	
    return obj;
}

exports.getRecentSolutions = function get_recent_solutions() {
	
	var i,
		res,
		solution,
		pathHash,
		solutions,
		recentSolutions;
	
	res = internal.recentlyOpenedSolution();
	solutions = [];
	
	recentSolutions = storage.getItem("recentSolutions");
	if(recentSolutions === null) {
		recentSolutions = {};
	}
	
	for(i = 0; i < res.length; i++) {
		
		pathHash = hex_md5(res[i].solutionFile.path);
		solution = {
			name: res[i].name,
			hash: pathHash
		};
		recentSolutions[pathHash] = {
			name: res[i].name,
			path: res[i].solutionFile.path
		}
		solutions.push(solution);
	}
	
	if(storage.tryLock()) {
		storage.setItem("recentSolutions", recentSolutions);
		storage.unlock();
	}
	
	return solutions;
}

exports.openSolutionByPath = function open_solution(path) {
	var returnVal = admin.openSolution(path);
	logout();
	
	return returnVal;
}

exports.openRecentSolution = function open_recent_solution(hash) {
	
	var recentSolutions = storage.recentSolutions;
	
	try {
		if(recentSolutions.hasOwnProperty(hash)) {
			return admin.openSolution(recentSolutions[hash].path);
		} else {
			throw "Cannot open this solution";
		}
	} catch(e) {
		console.log("Error : ", e);
		return false;
	}
}

exports.closeSolution = function close_solution() {
	var returnVal = admin.closeSolution();
	logout();
	
	return returnVal;
}

exports.getLogMessages = function get_log_messages() {
	var log;
	
	log = {};
	log.messages = console.content;
	
	log.messages.forEach(function (element, index, messageArray) {
		
		messageArray[index] = element.replace(", HTTP connection handler", "");
	});

	return log;
}

exports.quitServer = function quit_server() {
	solution.quitServer();
	return true;
}

exports.getDebuggerPort = function get_debugger_port() {
	if(solution !== null) {
		return solution.getDebuggerPort();
	}
	
	return null;
}

exports.getSettingsFileForSolution = function get_settings_file_for_solution(hash) {
	
	var sol,
		settingsObject,
		reopenSolution,
		recentSolution,
		recentSolutions;
	
	sol = null;
	recentSolutions = storage.recentSolutions;
	
	if(recentSolutions.hasOwnProperty(hash)) {
		
		recentSolution = recentSolutions[hash];
	} else {
		
		console.log("Error : solution not found");
		return false;
	}

	try {
	
		if(recentSolution.path !== solution.getFolder().path + solution.name + ".waSolution") {
			
			sol = internal.openSolution(recentSolution.path, 2);
			reopenSolution = true;
			
		} else {
			sol = solution;
			reopenSolution = false;
		}
	} catch(e) {
		
		console.log("Error : ", e);
		if(reopenSolution) {
			sol.close();
		}
		return false;
	}
	
	settingsObject = getSettingsFromSolution(sol);
	
	if(reopenSolution && sol !== null && sol !== undefined) {
		sol.close();
	}
	
	return settingsObject;
}

function getSettingsFromSolution(sol) {
	var str,
		file,
		stream,
		returnObject,
		settingsObject;
	
	returnObject = {};
	try {
		file = sol.getSettingFile("database");
		
		stream = TextStream(file, "read");
		str = stream.read();
		
		settingsObject = JSON.parse(XmlToJSON(str, "json-bag", "settings"));
		
		returnObject = {};
		
		if(settingsObject.hasOwnProperty("database") && settingsObject.database.length > 0) {
			
			returnObject.database = settingsObject.database[0];
		} else {
			
			returnObject.database = {};
		}
		
		returnObject.solution = {};
		if(settingsObject.solution[0].hasOwnProperty("directory") && settingsObject.solution[0].directory.length > 0) {
			
			returnObject.solution.directory = settingsObject.solution[0].directory[0];
		} else {
			
			returnObject.solution.directory = {};
		}
		
		if(settingsObject.solution[0].hasOwnProperty("serverStartup") && settingsObject.solution[0].serverStartup.length > 0) {
			
			returnObject.solution.serverStartup = settingsObject.solution[0].serverStartup[0];
		} else {
			
			returnObject.solution.directory = {};
		}
		
	} catch(e) {
		console.log("Error reading solution settings files", e);
	}
	
	return returnObject;
}

/**
 * Need for studio
 */
exports.openSolution = function open_solution(path) {
	var returnVal = admin.openSolution(path);
	logout();
	
	return returnVal;
}

exports.hasAdministrator = function has_administrator() {
	return directory.hasAdministrator();
}

/**
 * 
 * @param {array} applicationNames application to reload
 */
exports.reloadModels = function reload_models(applicationNames) {
	
	var i,
		modelReloaded,
		modelToReload,
		currentApplication,
		applicationsLength,
		applicationToReload;
	
	modelReloaded = 0;
	modelToReload = applicationNames.length;
	applicationToReload = {};
	
	applicationNames.forEach(function (value, index) {
		applicationToReload[value] = 1;
	});
	
	
	if(solution !== null) {
		
		applicationsLength = solution.applications.length;
		
		if(applicationsLength > 0) {
			i = 0;
			while(modelReloaded < modelToReload && i < applicationsLength) {
				
				currentApplication = solution.applications[i];
				
				if(applicationToReload.hasOwnProperty(currentApplication.name)) {
					
					currentApplication.reloadModel();
					modelReloaded++;
				}
				
				i++;
			}
		}
	}
	
	return (modelReloaded === modelToReload);
}

exports.getCurrentRunningHash = function get_current_running_hash() {
	if(solution !== null) {
		return hex_md5(hex_md5(solution.getFolder('path') + solution.name + ".waSolution"));
	}
	
	return null;
}

exports.setDebuggerServer = function setDebuggerServer(debugMode) {
	
	return setDebuggerServer(debugMode);
}

exports.getDebuggerServer = function getDebuggerServer() {
	
	return getDebuggerServer();
}

exports.getLocalIpAdresses = function get_local_ip_adresses() {
	var i,
		returnArray,
		localInterface,
		interfaceLength,
		localInterfaces,
		localInterfaceName;
	
	returnArray = [];
	
	localInterfaces = os.networkInterfaces();
	
	for(localInterfaceName in localInterfaces) {
		
		localInterface = localInterfaces[localInterfaceName];
		interfaceLength = localInterface.length;
		for(i = 0; i < interfaceLength; i++) {
			returnArray.push(localInterface[i].address);
		}
	}
	
	return returnArray;
}

exports.getSettingJsonData = function getSettingJsonData(solutionHash, applicationName) {
	var app,
		str,
		file,
		stream,
		settingXml,
		settingSolution,
		recentSolutionPath;
	
	recentSolutionPath = getRecentSolutionFromStorage(solutionHash);
	
	try {
		settingSolution = internal.openSolution(recentSolutionPath.path, 2);
		
		if(applicationName === null) {
			file = settingSolution.getSettingFile("database");
			
			stream = TextStream(file, "read");
			str = stream.read();
			
			settingXml = XmlToJSON(str, "json-bag", "settings");
			stream.close();
		} else {
			
			app = settingSolution.getApplicationByName(applicationName);
			
			if(app !== null) {
				
				file = app.getSettingFile("project");
				
				stream = TextStream(file, "read");
				str = stream.read();
				
				settingXml = XmlToJSON(str, "json-bag", "settings");
				stream.close();
			} else {
				settingXml = null;
			}
		}
		
		return settingXml;
	} catch(e) {
		
		return;
	} finally {
		if(settingSolution !== null) {
			settingSolution.close();
		}
	}
}

exports.saveSattingJsonData = function saveSattingJsonData(solutionHash, applicationName, settingsJson) {
	var app,
		file,
		stream,
		settingXml,
		settingSolution,
		recentSolutionPath;
	
	recentSolutionPath = getRecentSolutionFromStorage(solutionHash);
	
	
	settingXml = JSONToXml(settingsJson, "json-bag", "settings");
	
	try {
		settingSolution = internal.openSolution(recentSolutionPath.path, 2);
		
		if(applicationName === null) {
			file = settingSolution.getSettingFile("database");
			
			stream = TextStream(file, "overwrite");
			stream.write(settingXml);
			
			stream.close();
		} else {
			
			app = settingSolution.getApplicationByName(applicationName);
			
			if(app !== null) {
				
				file = app.getSettingFile("project");
				
				stream = TextStream(file, "overwrite");
				stream.write(settingXml);
				
				stream.close();
				
			} else {
				settingXml = null;
			}
		}
		
		return true;
	} catch(e) {
		return false;
	} finally {
		if(settingSolution !== null) {
			settingSolution.close();
		}
	}
}
