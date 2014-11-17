var app = app || {};
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var exitLicenseBtn = {} // @button
	var exitSolutionsSettingsBtn = {} // @button
	var saveSolutionsSettingsBtn = {} // @button
	var saveProjectSettingsBtn = {} // @button
	var resetCacheButton = {}; // @buttonImage  
	var compactBtn = {};	// @buttonImage
	var repairBtn = {};	// @buttonImage
	var toggleSolutionSettings = {};	// @menuItem
	var combobox5 = {};	// @combobox
	var backupLogsDL = {};	// @buttonImage
	var compactLogsDL = {};	// @buttonImage
	var repairLogsDL = {};	// @buttonImage
	var verifyLogDL = {};	// @buttonImage
	var licenseBtn = {};	// @buttonImage
	var openSolutionBtn = {};	// @menuItem
	var projectsEvent = {};	// @dataSource
	var projectsSettings = {};	// @menuItem
	var backupBtn = {};	// @buttonImage
	var verifyBtn = {};	// @buttonImage
	var dataBrowserBtn = {};	// @buttonImage
	var openDebuggerBtn = {};	// @menuItem
	var openDebugger = {};	// @buttonImage
	var startStopBtn = {};	// @menuItem
	var recentSolutionsEvent = {};	// @dataSource
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers
	app.resource = {
		START_SOLUTION_REQUIRED: 'You need to start the current solution to complate this operation',
		STOP_SOLUTION_REQUIRED: 'You need to stop the current solution to complate this operation',
        VERIFY_INFO_MSG: 'Verifying started.',
        VERIFY_SUCC_MSG: 'Data was verified successfully.',
        VERIFY_ERR_MSG: 'One or more errors were detected while verifying the data. Please open the log console for more information.',

        REPAIR_INFO_MSG: 'Repair started.',
        REPAIR_SUCC_MSG: 'Data was repaired successfully.',
        REPAIR_ERR_MSG: 'One or more errors were detected while repairing the data. Please open the log console for more information.',


        COMPACT_INFO_MSG: 'Compacting started.',
        COMPACT_SUCC_MSG: 'Data was compacted successfully.',
        COMPACT_ERR_MSG: 'One or more errors were detected while compacting the data. Please open the log console for more information.',

        BACKUP_INFO_MSG: 'Backup started.',
        BACKUP_SUCC_MSG: 'Data was backed up successfully.',
        BACKUP_ERR_MSG: 'One or more errors were detected while data backup. Please open the log console for more information.',

        RESTORE_SUCC_MSG: 'Data was restored successfully.',
        RESTORE_ERR_MSG: 'One or more errors were detected during restoring the data. Please open the log console for more information.',
        RESTORE_INFO_MSG: 'Restore started.',

        RESET_MSG: 'Please wait while the server resetting the cache.',
        RESET_SUCC_MSG: 'WD2 cache was reset successfully.',
        RESET_ERR_MSG: 'Error: resetting WD2 cache failed.',

        STOP_SOLUTION_MSG: 'Please wait while your solution is being stopped. This process may take a few seconds.',
        START_SOLUTION_MSG: 'Please wait while your solution is starting. This process may take a few seconds.',
        START_SOLUTION_INFO_MSG: 'Solution list is empty, please open a solution first.',

        CONFIRM_MSG: 'To perform this action, the solution that is currently running on the server must be stopped. Do you want to proceed?',
        SETTINGS_SUCC_MSG: 'Please restart the server (if it is currently running) for the settings to take effect.'
    };

	toggleSolutionSettings.click = function toggleSolutionSettings_click (event)// @startlock
	{// @endlock
		var dashboard = $('#container3');
		var solutionSettingsContainer = $('#solutionSettingsContainer');
		if (solutionSettingsContainer.is(':visible')) {
			solutionSettingsContainer.find('iframe').attr("src", "");
			solutionSettingsContainer.hide();
			dashboard.show();
			$("#settingsContainer iframe").attr("src", "/webComponents/settingsEditor/index.html");
			var intervalID = window.setInterval(function () {
				if (studio.editor.settingsLoadCaalback) {
					window.clearInterval(intervalID);
					studio.editor.getSettingJsonData(sources.recentSolutions.path, sources.projects.name);
				}		
			}, 500);
		} else {
			$("#settingsContainer iframe").attr("src", "");
			solutionSettingsContainer.find('iframe').attr("src", "/webComponents/settingsEditor/index.html");
			dashboard.hide();
			solutionSettingsContainer.show();
		};
	};// @lock
	
	exitSolutionsSettingsBtn.click = function exitSolutionsSettingsBtn_click(event) // @startlock
    { // @endlock
        var dashboard = $('#container3');
		var solutionSettingsContainer = $('#solutionSettingsContainer');
		solutionSettingsContainer.find('iframe').attr("src", "");
			solutionSettingsContainer.hide();
			dashboard.show();
			$("#settingsContainer iframe").attr("src", "/webComponents/settingsEditor/index.html");
			var intervalID = window.setInterval(function () {
				if (studio.editor.settingsLoadCaalback) {
					window.clearInterval(intervalID);
					studio.editor.getSettingJsonData(sources.recentSolutions.path, sources.projects.name);
				}		
			}, 500);
    }; // @lock

	exitLicenseBtn.click = function exitLicenseBtn_click(event) // @startlock
    { // @endlock
        $("#licenseBtn label").text("License");
		$('#licenseContainer').hide();
		$('#container3').show();
    }; // @lock
	saveSolutionsSettingsBtn.click = function saveSolutionsSettingsBtn_click(event) // @startlock
    { // @endlock
        studio.editor.setSettingJsonData(sources.recentSolutions.path, null);
    }; // @lock

	saveProjectSettingsBtn.click = function saveProjectSettingsBtn_click(event) // @startlock
    { // @endlock
        studio.editor.setSettingJsonData(sources.recentSolutions.path, sources.projects.name);
    }; // @lock

	resetCacheButton.click = function resetCacheButton_click(event) // @startlock
    { // @endlock
        if (sources.recentSolutions.isRunning) {
			$('#notification').notify('show','info', app.resource.RESET_MSG);
			app.remoteConnection.resetCache();
		} else {			
			$('#notification').notify('show','warning', app.resource.START_SOLUTION_REQUIRED);
		}
    }; // @lock

	combobox5.change = function combobox5_change (event)// @startlock
	{// @endlock
		if (this.getState() == "active") {
			app.remoteConnection.setDebuggerServer(this.getValue());
		}
	};// @lock

	backupLogsDL.click = function backupLogsDL_click (event)// @startlock
	{// @endlock
		var hash = $$("backupCombobox").getValue();
		if (hash !== "never") {
			app.downloadLogs(hash);
		}
	};// @lock

	compactLogsDL.click = function compactLogsDL_click (event)// @startlock
	{// @endlock
		var hash = $$("compactCombobox").getValue();
		if (hash !== "never") {
			app.downloadLogs(hash);
		}
	};// @lock

	repairLogsDL.click = function repairLogsDL_click (event)// @startlock
	{// @endlock
		var hash = $$("repairCombobox").getValue();
		if (hash !== "never") {
			app.downloadLogs(hash);
		}
	};// @lock

	verifyLogDL.click = function verifyLogDL_click (event)// @startlock
	{// @endlock
		var hash = $$("verificationCombobox").getValue();
		if (hash !== "never") {
			app.downloadLogs(hash);
		}
	};// @lock

	licenseBtn.click = function licenseBtn_click (event)// @startlock
	{// @endlock
		var dashboard = $('#container3');
		var licenseContainer = $('#licenseContainer');
		if (dashboard.is(':visible')) {
			$("#licenseBtn label").text("Dashboard");
			dashboard.hide();
			licenseContainer.show();
		} else {
			$("#licenseBtn label").text("License");
			licenseContainer.hide();
			$('#container3').show();
		};		
	};// @lock

	openSolutionBtn.click = function openSolutionBtn_click (event)// @startlock
	{// @endlock
		var path = prompt("Please enter your solution path", "ABSOLUTE_PATH/SOLUTION_NAME.waSolution");
		if ( path && path !== "ABSOLUTE_PATH/SOLUTION_NAME.waSolution") {
			app.remoteConnection.openSolutionByPath(path);
		}
	};// @lock

	projectsEvent.onCurrentElementChange = function projectsEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if (sources.recentSolutions.path && sources.projects.name) {
			var intervalID = window.setInterval(function () {
				if (studio.editor.settingsLoadCaalback) {
					window.clearInterval(intervalID);
					studio.editor.getSettingJsonData(sources.recentSolutions.path, sources.projects.name);
				}		
			}, 500);

			for (var attr in this.logFiles) {
        window[attr + 'Logs'] = this.logFiles[attr].length ? this.logFiles[attr] : [{
            "date": "Never",
            "hash": "never",
            "name": "never",
            "path": ""
        }];            
        sources[attr + 'Logs'].sync();
        sources[attr + 'Logs'].orderBy('date desc');
    	}			
		}
	};// @lock

	projectsSettings.click = function projectsSettings_click (event)// @startlock
	{// @endlock
		
	};// @lock

	backupBtn.click = function backupBtn_click (event)// @startlock
	{// @endlock
		if (sources.recentSolutions.isRunning) {
			$('#notification').notify('show','info', app.resource.BACKUP_INFO_MSG);
			app.remoteConnection.backup(sources.recentSolutions.path, sources.projects.name);
		} else {			
			$('#notification').notify('show','warning', app.resource.START_SOLUTION_REQUIRED);
		}
	};// @lock

	verifyBtn.click = function verifyBtn_click (event)// @startlock
	{// @endlock
		if (sources.recentSolutions.isRunning) {
			$('.waf-label-progressbar, .waf-progressBar').show();
			$$('progressBar2').startListening();
			$('#notification').notify('show','info', app.resource.VERIFY_INFO_MSG);
			app.remoteConnection.verify(sources.recentSolutions.path, sources.projects.name);
		} else {
			$('#notification').notify('show','warning', app.resource.START_SOLUTION_REQUIRED);
		}
	};// @lock

	compactBtn.click = function compactBtn_click (event)// @startlock
	{// @endlock
		if (sources.recentSolutions.isRunning) {
			$('#notification').notify('show','warning', app.resource.STOP_SOLUTION_REQUIRED);
		} else {
			$('.waf-label-progressbar, .waf-progressBar').show();
			$$('progressBar2').startListening();
			$('#notification').notify('show','info', app.resource.COMPACT_INFO_MSG);
			app.remoteConnection.compact(sources.recentSolutions.path, sources.projects.name);
		}
	};// @lock

	repairBtn.click = function repairBtn_click (event)// @startlock
	{// @endlock
		if (sources.recentSolutions.isRunning) {
			$('#notification').notify('show','warning', app.resource.STOP_SOLUTION_REQUIRED);
		} else {
			$('.waf-label-progressbar, .waf-progressBar').show();
			$$('progressBar2').startListening();
			$('#notification').notify('show','info', app.resource.REPAIR_INFO_MSG);
			app.remoteConnection.repair(sources.recentSolutions.path, sources.projects.name);
		}
	};// @lock

	dataBrowserBtn.click = function dataBrowserBtn_click (event)// @startlock
	{// @endlock
		if (sources.recentSolutions.isRunning) {			
			var protocol = sources.projects.httpServer.ssl.enabled ? 'https://' : 'http://';
	        var port = protocol === "https://" ? sources.projects.httpServer.ssl.port : sources.projects.httpServer.port;

	        var url = protocol + window.location.hostname + ":" + port + "/walib/dataBrowser/index.html";
	        window.open(url, '_blank');
		} else {
			$('#notification').notify('show','warning', app.resource.START_SOLUTION_REQUIRED);
		}
	};// @lock

	openDebuggerBtn.click = function openDebuggerBtn_click (event)// @startlock
	{// @endlock
		var url, protocol, port;

	    if (sources.projects.httpServer && sources.projects.httpServer.ipAddress) {
	        port = window.location.port;
	        protocol  = window.location.protocol;
	        url = protocol+"//" + window.location.hostname + ":"+port+"/walib/debugger/remote_debugger.html";
	        window.open(url, '_blank');
	    } else {
			$('#notification').notify('show','warning', app.resource.START_SOLUTION_REQUIRED);
		}
	};// @lock

	startStopBtn.click = function startStopBtn_click (event)// @startlock
	{// @endlock
		if (sources.recentSolutions.isRunning) {
			app.remoteConnection.closeSolution();
		} else {
			$('#notification').notify('show','info', app.resource.START_SOLUTION_MSG);
			app.remoteConnection.openRecentSolution(sources.recentSolutions.hash);
		}
	};// @lock

	recentSolutionsEvent.onCurrentElementChange = function recentSolutionsEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if(this.hash) {
			app.remoteConnection.getSolutionDetails(this.hash);
			$("#settingsContainer iframe").attr("src", ""); // @TODO ugly hack
    	    $("#settingsContainer iframe").attr("src", "/webComponents/settingsEditor/index.html");
	    	if (this.isRunning) {
	    		$('#startStopBtn').addClass('stop');
	    		$$('combobox5').setValue(app.remoteConnection.getDebuggerServer());
	    	} else {
	    		$('#startStopBtn').removeClass('stop');
	    	}
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		console.log("start app");
		app.remoteConnection.openWS();
		app.remoteConnection.getProductName();
		app.remoteConnection.getRecentSolutions();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("exitLicenseBtn", "click", exitLicenseBtn.click, "WAF");
	WAF.addListener("exitSolutionsSettingsBtn", "click", exitSolutionsSettingsBtn.click, "WAF");
	WAF.addListener("saveSolutionsSettingsBtn", "click", saveSolutionsSettingsBtn.click, "WAF");
	WAF.addListener("saveProjectSettingsBtn", "click", saveProjectSettingsBtn.click, "WAF");
	WAF.addListener("resetCacheButton", "click", resetCacheButton.click, "WAF");
	WAF.addListener("compactBtn", "click", compactBtn.click, "WAF");
	WAF.addListener("repairBtn", "click", repairBtn.click, "WAF");
	WAF.addListener("toggleSolutionSettings", "click", toggleSolutionSettings.click, "WAF");
	WAF.addListener("combobox5", "change", combobox5.change, "WAF");
	WAF.addListener("backupLogsDL", "click", backupLogsDL.click, "WAF");
	WAF.addListener("compactLogsDL", "click", compactLogsDL.click, "WAF");
	WAF.addListener("repairLogsDL", "click", repairLogsDL.click, "WAF");
	WAF.addListener("verifyLogDL", "click", verifyLogDL.click, "WAF");
	WAF.addListener("licenseBtn", "click", licenseBtn.click, "WAF");
	WAF.addListener("openSolutionBtn", "click", openSolutionBtn.click, "WAF");
	WAF.addListener("projects", "onCurrentElementChange", projectsEvent.onCurrentElementChange, "WAF");
	WAF.addListener("projectsSettings", "click", projectsSettings.click, "WAF");
	WAF.addListener("backupBtn", "click", backupBtn.click, "WAF");
	WAF.addListener("verifyBtn", "click", verifyBtn.click, "WAF");
	WAF.addListener("dataBrowserBtn", "click", dataBrowserBtn.click, "WAF");
	WAF.addListener("openDebuggerBtn", "click", openDebuggerBtn.click, "WAF");
	WAF.addListener("openDebugger", "click", openDebuggerBtn.click, "WAF");
	WAF.addListener("startStopBtn", "click", startStopBtn.click, "WAF");
	WAF.addListener("recentSolutions", "onCurrentElementChange", recentSolutionsEvent.onCurrentElementChange, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
