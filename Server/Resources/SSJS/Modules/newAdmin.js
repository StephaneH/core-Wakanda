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
 * Verify application data
 * 
 * @param {Object} option
 *  contain at least :
 *      applicationName : name of application to verify
 *      solutionPath : path of solution file
 *  optional :
 *       progressName : progress widget name to provide a progress indicator (default value is adminProgress)
 */
exports.Verify = function (option) {

    var app,
        log,
        res,
        date,
        logName,
        options,
        folderLog,
        currentDate,
        progressIndicator,
        currentProgressTitle;

    progressIndicator = null;
    if (!option.hasOwnProperty("progressName")) {
        option.progressName = "adminProgressBar";
    }

    function myOpenProgress(title, maxElements) {
        if (progressIndicator === null) {
            progressIndicator = ProgressIndicator(maxElements, title + " element {curValue} on {maxValue}", false, "", option.progressName);
        } else {
            progressIndicator.subSession(maxElements, title + " element {curValue} on {maxValue}", false);
        }

        currentProgressTitle = title;
        log.appendToLog(title + " on " + maxElements + " elements");
        addLog(title + " on " + maxElements + " elements");
    }

    function myProgress(curElement, maxElements) {
        progressIndicator.setValue(curElement);
        //log.appendToLog(currentProgressTitle + " - " + curElement + "/" + maxElements);
    }

    function myCloseProgress() {
        log.appendToLog("End " + currentProgressTitle);
        currentProgressTitle = "";
        progressIndicator.endSession();
    }

    function myAddProblem(problem) {
        var formatedProblem;
        formatedProblem = formatProblem(problem);
        this.storedProblems.push(formatedProblem);
        log.appendToLog(problem.ErrorText);
        addLog("Error: " + problem.ProblemTypeText + ", " + problem.ErrorText);
    }

    try {
        if (solution.getFolder('path') + solution.name + '.waSolution' !== option.solutionPath) {
            return;
        }

        app = solution.getApplicationByName(option.applicationName);

        folderLog = new Folder(app.getFolder().path + 'Logs');

        if (!folderLog.exists) {//check for subfolder named Documents
            try {
                folderLog.create();
            //if not there, create it
            } catch (e) {//if you can't create it, then error out
                return {
                    error : 5,
                    errorMessage : ' could not create log folder'
                };
            }
        }

        date = new Date();
        currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
        logName = 'verify ' + app.name + ' ' + currentDate + '.waLog';
        log = new Log(app.getFolder().path + 'Logs/' + logName);

        options = {
            'openProgress' : myOpenProgress,
            'closeProgress' : myCloseProgress,
            'progress' : myProgress,
            'addProblem' : myAddProblem,

            // you can add any custom code here, it will be passed to the
            // addProblem function in the 'this' keyword
            'storedProblems' : [] // we add an array to store any problems that arise
        };

        ds.verify(options);

        if (options.storedProblems.length > 0) {
            log.appendToLog(options.storedProblems.length + " errors found");
        } else {
            log.appendToLog("no errors found");
        }

        res = {
            errors : options.storedProblems,
            file : {
                name : log.logFile.name,
                date : log.logFile.creationDate.toString(),
                path : log.logFile.path
            }
        };
    } catch (e) {
        console.log(e);
    }
    return res;
};

exports.Backup = function (option) {

    var app,
        log,
        res,
        date,
        settings,
        logName,
        options,
        folderLog,
        currentDate,
        progressIndicator,
        currentProgressTitle;

    progressIndicator = null;
    if (!option.hasOwnProperty("progressName")) {
        option.progressName = "adminProgressBar";
    }

    function myOpenProgress(title, maxElements) {
        if (progressIndicator === null) {
            progressIndicator = ProgressIndicator(maxElements, title + " element {curValue} on {maxValue}", false, "", option.progressName);
        } else {
            progressIndicator.subSession(maxElements, title + " element {curValue} on {maxValue}", false);
        }

        currentProgressTitle = title;
        log.appendToLog(title + " on " + maxElements + " elements");
        addLog(title + " on " + maxElements + " elements");
    }

    function myProgress(curElement, maxElements) {
        progressIndicator.setValue(curElement);
        //log.appendToLog(currentProgressTitle + " - " + curElement + "/" + maxElements);
    }

    function myCloseProgress() {
        log.appendToLog("End " + currentProgressTitle);
        currentProgressTitle = "";
        progressIndicator.endSession();
    }

    function myAddProblem(problem) {
        var formatedProblem;
        formatedProblem = formatProblem(problem);
        this.storedProblems.push(formatedProblem);
        log.appendToLog(problem.ErrorText);
        addLog("Error: " + problem.ProblemTypeText + ", " + problem.ErrorText);
    }

    try {
        if (solution.getFolder('path') + solution.name + '.waSolution' !== option.solutionPath) {
            return;
        }

        app = solution.getApplicationByName(option.applicationName);

        folderLog = new Folder(app.getFolder().path + 'Logs');

        if (!folderLog.exists) {//check for subfolder named Documents
            try {
                folderLog.create();
            //if not there, create it
            } catch (e) {//if you can't create it, then error out
                return {
                    error : 5,
                    errorMessage : ' could not create log folder'
                };
            }
        }

        date = new Date();
        currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + 'T' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();
        logName = 'backup ' + app.name + ' ' + currentDate + '.waLog';
        log = new Log(app.getFolder().path + 'Logs/' + logName);

        options = {
            'openProgress' : myOpenProgress,
            'closeProgress' : myCloseProgress,
            'progress' : myProgress,
            'addProblem' : myAddProblem,

            // you can add any custom code here, it will be passed to the
            // addProblem function in the 'this' keyword
            'storedProblems' : [] // we add an array to store any problems that arise
        };

        settings = app.getBackupSettings();
        app.ds.backup(settings, options);

        if (options.storedProblems.length > 0) {
            log.appendToLog(options.storedProblems.length + " errors found");
        } else {
            log.appendToLog("no errors found");
        }

        res = {
            errors : options.storedProblems,
            file : {
                name : log.logFile.name,
                date : log.logFile.creationDate.toString(),
                path : log.logFile.path
            }
        };
    } catch (e) {
        console.log(e);
    }
    return res;
};

/**
 * Open solution
 * 
 * @param {String} path: path of the .waSolution file
 * @param {String} debuggerType:  path of the .waSolution file
 */
exports.openSolution = function (path, debuggerType) {
    var job = getJobManager().getJob();
    try {
        waserver.openSolution(path, 1, debuggerType, job);
    } catch (e) {
        console.log("Error : ", e);
    }
    return job.id;
};

exports.closeSolution = function () {
    var job = getJobManager().getJob();
    solution.close(job);
    return job.id;
};


exports.getMaintenanceLog = function (fromId) {

    var length,
        returnLog,
        maintenanceLog;

    maintenanceLog = storage.getItem("maintenanceLog");
    if (maintenanceLog === null) {
        maintenanceLog = [];
    }

    length = maintenanceLog.length;

    returnLog = {
        maxId : length,
        messages : maintenanceLog.slice(fromId, length)
    };
    return returnLog;
};

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

    for (i = 0; i < paramExtract.length; i++) {

        paramName = paramExtract[i].substring(1, (paramExtract[i].length - 1));
        problem.ProblemTypeText = problem.ProblemTypeText.replace(paramExtract[i], problem[paramName]);

        delete problem[paramName];
    }

    return problem;
}

function Log(file) {// Constructor function definition

    var log;

    log = {
        appendToLog : function (myMessage) {// append function
            var file,
                stream;

            file = this.logFile;

            if (file != null) {
                if (!file.exists) {// if the file does not exist
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
        init : function (file) {// to initialize the log

            this.logFile = file;
            if (file.exists) {
                file.remove();
            }
            file.create();
        },
        set : function (file) {// to create the log file

            if (typeof file === "string") {// only text files can be created
                file = File(file);
            }
            this.logFile = file;
        },
        logFile : null
    };

    log.set(file);

    return log;
}

function addLog(log) {

    var i,
        maxTry,
        logged,
        maintenanceLog;

    i = 0;
    logged = false;
    maxTry = 3;

    while (logged === false && i < maxTry) {

        if (storage.tryLock()) {
            maintenanceLog = storage.getItem("maintenanceLog");
            if (maintenanceLog === null) {
                maintenanceLog = [];
            }
            maintenanceLog.push(log);
            storage.setItem("maintenanceLog", maintenanceLog);
            storage.unlock();
            logged = true;
        }
        i++;
    }

    if (logged === false) {
        console.info("Cannot Log: " + log);
    }
}