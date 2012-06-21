
var adminObject;

WAF.onAfterInit = function onAfterInit() {
	
	$("#adminTabView").hide();
	checkAdminAccess();
	
// @lock

// @region namespaceDeclaration// @startlock
	var adminStopSolutionButton = {};	// @buttonImage
	var adminBrowseButton = {};	// @buttonImage
	var adminStartSolutionButton = {};	// @buttonImage
	var adminCompactButton = {};	// @buttonImage
	var adminRepairButton = {};	// @buttonImage
	var solutionCombobox = {};	// @combobox
	var adminVerifyButton = {};	// @buttonImage
	var radioSolution = {};	// @radioGroup
	var logToAdmin = {};	// @login
	var documentEvent = {};	// @document
	var logToAdmin = {};	// @login
// @endregion// @endlock

	var accessResult;
	
// eventHandlers// @lock

	adminBrowseButton.click = function adminBrowseButton_click (event)// @startlock
	{// @endlock
		adminObject.showBrowseDialog();
	};// @lock

	adminStopSolutionButton.click = function adminStopSolutionButton_click (event)// @startlock
	{// @endlock
		this.disable();
		adminObject.stopCurrentSolution();
	};// @lock

	adminStartSolutionButton.click = function adminStartSolutionButton_click (event)// @startlock
	{// @endlock
		this.disable();
		adminObject.startCurrentSolution();
	};// @lock

	adminCompactButton.click = function adminCompactButton_click (event)// @startlock
	{// @endlock
		this.disable();
		adminObject.compactApplication();
	};// @lock

	adminRepairButton.click = function adminRepairButton_click (event)// @startlock
	{// @endlock
		this.disable();
		adminObject.repairApplication();
	};// @lock

	solutionCombobox.change = function solutionCombobox_change (event)// @startlock
	{// @endlock
		adminObject.selectSolution(this.getValue());
	};// @lock

	adminVerifyButton.click = function adminVerifyButton_click (event)// @startlock
	{// @endlock
		this.disable();
		adminObject.verifyApplication();
	};// @lock

	radioSolution.change = function radioSolution_change (event) {
		
		if(this.getValue() === "currentSolution") {
			adminObject.selectCurrentSolution();
		}
	};// @lock

	logToAdmin.logout = function logToAdmin_logout (event)// @startlock
	{// @endlock
		
		window.location.reload();
		
	};// @lock

	logToAdmin.login = function logToAdmin_login (event)// @startlock
	{// @endlock
		
		window.location.reload();
		
	};// @lock
	
// @region eventManager// @startlock
	WAF.addListener("adminStopSolutionButton", "click", adminStopSolutionButton.click, "WAF");
	WAF.addListener("adminBrowseButton", "click", adminBrowseButton.click, "WAF");
	WAF.addListener("adminStartSolutionButton", "click", adminStartSolutionButton.click, "WAF");
	WAF.addListener("adminCompactButton", "click", adminCompactButton.click, "WAF");
	WAF.addListener("adminRepairButton", "click", adminRepairButton.click, "WAF");
	WAF.addListener("solutionCombobox", "change", solutionCombobox.change, "WAF");
	WAF.addListener("adminVerifyButton", "click", adminVerifyButton.click, "WAF");
	WAF.addListener("radioSolution", "change", radioSolution.change, "WAF");
	WAF.addListener("logToAdmin", "logout", logToAdmin.logout, "WAF");
	WAF.addListener("logToAdmin", "logout", logToAdmin.logout, "WAF");
	WAF.addListener("logToAdmin", "login", logToAdmin.login, "WAF");
// @endregion
	
	$("body").bind("keypress", function (event) {
		
		if(adminObject !== undefined) {
			return adminObject.shortcutHandler(event);
		} else {
			return true;
		}
	});

};// @endlock

function checkAdminAccess() {

	var returnLogin,
		currentUser;
	
	result = {
		access : false,
		status : ""
	};
	
	currentUser = WAF.directory.currentUser();
	returnLogin = false;
	
	if(currentUser === null) {
		returnLogin = autoLog();
	}
	
	checkAdminCallback(returnLogin, currentUser);
}

function autoLog() {
	return WAF.directory.login({
		"sync": true,
		"onSuccess" : function (event) {
			
			checkAdminCallback(event.result, null);
		}
	}, "admin", "");
}

function checkAdminCallback(loginReturn, currentUser) {
	
	if (loginReturn === true || currentUser !== null) {
		
		if (WAF.directory.currentUserBelongsTo("01000000000000000000000000000000")) {
			
			$("#adminHeader").show();
			$("#adminTabView").show();
			adminObject = new Admin();
			adminObject.init();
		} else {
			
			alert("You are not allowed to access this page");
		}
	}
	
	if(adminObject === undefined) {
		$("#adminHeader").hide();
		$$("logToAdmin").showLoginDialog();
		$("#name_login_logToAdmin").val("admin");
		$("#name_login_logToAdmin").focus();
	}
}

function Admin() {
	
	this.MODE_OVERVIEW = "overview";
	this.MODE_MAINTENANCE = "maintenance";
	
	this.currentRunningSolution = null;
	this.currentSolution = null;
	this.currentApplicationName = null;
	this.recentSolutions = null;
	this.viewMode = "";
	
	this.maintenanceActionRunning = false;
	this.verifingApplication = {};
	this.repairingApplication = {};
	this.compactingApplication = {};
	this.backupingApplication = {};
	this.restoringApplication = {};
	this.dataFlusingApplication = {};
	
	this.reloadingPage = false;
	this.reloadingSetTimeOut = [];
}

Admin.prototype = {
	
	init : function init_admin() {
		
		var i,
			runningSolution;
		
		$("#loadingContainer").show();
		this.recentSolutions = admin.getRecentSolutionsList();
		
		for(i = 0; i < this.recentSolutions.length; i++) {
			
			if(this.recentSolutions[i].hasOwnProperty("name")) {
				$$("solutionCombobox").addOption(this.recentSolutions[i].name, this.recentSolutions[i].name, false);
			}
		}
		
		$$("adminTabView").onSelect = function select_admin_tab(tabIndex) {
			
			switch(tabIndex) {
				case 1 :
					adminObject.displayOverviewTab();
					break;
				case 2 :
					adminObject.displayMaintenanceTab();
					break;
			}
		}
		
		runningSolution = admin.getSolution();
		
		$("#adminHeader").show();
		$("#adminTabView").show();
		$("#wafConsole div.title").bind("click", function(event) {
			adminObject.console.toggle(true);
		});
		
		//overview tab
		$$("adminTabView").selectTab(1);
		
		if(runningSolution.name !== "DefaultSolution" || runningSolution.applications.length > 1) {
			this.currentRunningSolution = runningSolution
			this.selectSolution(this.currentRunningSolution.name);
			$$("solutionCombobox").setValue(this.currentRunningSolution.name);
			$$("radioSolution").select("currentSolution");
		} else {
			$$("radioSolution").select("recentSolution");
			if(this.recentSolutions.length > 0 && this.recentSolutions[0].hasOwnProperty("name")) {
				this.selectSolution(this.recentSolutions[0].name);
				$$("solutionCombobox").setValue(this.recentSolutions[0].name);
			}
		}
		
		$("#wafConsole").resizable({
			handles: "n",
			minHeight: 25,
			maxHeight: $("#wafConsole").parent().height(),
			stop: function (event, ui) {
				if(ui.element.height() < 25) {
					adminObject.console.opened = false;
					ui.element.removeClass('visible');
				} else {
					adminObject.console.opened = true;
					ui.element.addClass('visible');
					adminObject.console.showApplicationLog();
				}
				
				ui.element.css("top", "");
			},
		});
	},
	
	console : {
		
		timer: null,
		opened: false,
		node: $('#wafConsole'),
		
		getServerLog : function(open, option) {
			
			try {
				var result = admin.getLogMessages();
				
				if(open === undefined) {
					open = true;
				}

				this.log(result.messages, open, option);
			} catch(e) {
				this.log('<b>getServerLog failed :</b> ' + e, open, option);
			};
		},
		log : function console_log(contents, open, option) {
			
			var html,
				logDisplay,
				logSolutionName,
				logApplicationName;
			
			html = '';
			logDisplay = '';
			
			if($.isArray(contents) && contents.length > 0) {
				
				html = contents.join('<br />') + '<br />';
			} else if($.isPlainObject(contents) && contents.message && (contents.message !== '')) {
				
				// contents.message.bold() + ' : ' +
				html = contents.description + '<br />';
			} else if(contents.toString() !== '') {
				
				html = contents.toString() + '<br />';
			}
			
			if(option !== undefined) {
				
				logSolutionName = option.solutionName;
				logApplicationName = option.applicationName;
				
			} else if(adminObject !== null && adminObject.currentSolution !== null && adminObject.currentApplicationName !== null) {
				
				logSolutionName = adminObject.currentSolution.name;
				logApplicationName = adminObject.currentApplicationName;
			}
			
			if(logSolutionName !== adminObject.currentSolution.name || logApplicationName !== adminObject.currentApplicationName) {
				logDisplay = 'display : none;';
			}

			if(html !== '') {
				if(open) {
					this.open();
				}
				
				if(logSolutionName !== undefined && logApplicationName !== undefined) {
					
					html = '<p class="' + logSolutionName.replace(" ", "-") + "-" + logApplicationName.replace(" ", "-") + '-log" style="'+logDisplay+'">' + html + '</p>';
				}
				
				$('#wafConsole .content').append(html).scrollTop($('#wafConsole .content')[0].scrollHeight);
			}
		},
		error : function console_log_error(contents, open, option) {
			
			if($.isArray(contents) && contents.length > 0) {
				
				contents.forEach(function (element, index, elementArray) {
					elementArray[index] = add_error_tag(element);
				});
			} else if($.isPlainObject(contents) && contents.message && (contents.message !== '')) {
				
				contents.message = add_error_tag(contents.message);
				contents.description = add_error_tag(contents.description);
			} else if(contents.toString() !== '') {
				
				contents = add_error_tag(contents.toString());
			}
			
			function add_error_tag(element) {
				
				return '<span class="log-error">'+element+'</span>';
			
			}
			
			this.log(contents, open, option);
		},
		head : function console_log_head(content, open, option) {
			
			content = '<span class="log-head">'+content+'</span>';
			
			this.log(content, open, option);
		},
		open : function() {
			
			if(!this.opened) {
				
				this.node.animate({
					height : '50%'
				}).addClass('visible');
				this.showApplicationLog();
				
				this.opened = true;
			}
		},
		close : function() {
			
			if(this.opened) {
				
				this.node.animate({
					height : 26
				}).removeClass('visible');
				
				this.opened = false;
			}
		},
		toggle : function(refresh) {
			
			if(refresh === undefined) {
				refresh = false;
			}
			
			(this.opened) ? this.close() : this.open();
			
			if(this.opened && refresh === true) {
				this.getServerLog(false);
			}
		},
		showApplicationLog : function show_application_log() {
			
			this.node.children('.content').children('p').hide();
			if(adminObject !== null && adminObject.currentSolution !== null && adminObject.currentApplicationName !== null) {
				this.node.children('.content').children('p.' + adminObject.currentSolution.name.replace(" ", "-") + "-" + adminObject.currentApplicationName.replace(" ", "-") + '-log').show();
			}
			this.node.children('.content').scrollTop(this.node.children('.content')[0].scrollHeight);
		}
	},
	
	selectMode : function admin_select_mode(mode) {
		if(mode === this.MODE_OVERVIEW || mode === this.MODE_MAINTENANCE) {
			this.viewMode = mode;
		}
	},
	
	selectSolution : function select_solution(selectedSolution) {
		
		this.currentSolution = null;
		$("#loadingContainer").show();
		
		if(this.currentRunningSolution !== null && this.currentRunningSolution.name === selectedSolution) {
			
			this.displaySelectedSolution(this.currentRunningSolution);
			
		} else {
			
			admin.getSolutionmaintenanceAsync({
				"onsuccess" : function (response) {
					if(response.hasOwnProperty("name")) {
						adminObject.displaySelectedSolution(response);
						adminObject.console.getServerLog(false);
					} else {
						alert("Error: cannot open this solution");
						$("#loadingContainer").hide();
						$("#adminMaintenanceProjectList").html("");
						$("#maintenanceModeleFileDetail").html("");
						$("#maintenanceLogFileDetail").html("");
						
						$$("adminTabView").selectTab(2);
						adminObject.console.getServerLog(true);
					}
				}
			}, selectedSolution);
			
		}
		this.refreshAdminHeader(selectedSolution);
	},
	
	refreshAdminHeader : function refresh_admin_header(selectedSolution) {
		
		if(this.currentRunningSolution !== null && this.currentRunningSolution.name === selectedSolution) {
			
			$$("radioSolution").select("currentSolution");
			selectedSolution = this.getActiveIcon() + selectedSolution;
			
		} else {
			
			$$("radioSolution").select("recentSolution");
			selectedSolution = this.getMaintenanceIcon() + selectedSolution;
		}
		
		$$("solutionName").setValue(selectedSolution);
	},
	
	getMaintenanceIcon : function get_maintenance_icon() {
		return '<img src="/images/red.png" class="solution-active-marker"/>';
	},
	
	getActiveIcon : function get_active_icon() {
		return '<img src="/images/green.png" class="solution-maintenance-marker"/>';
	},
	
	displayOverviewTab : function display_overview_tab() {
		var settingsHtml;
		
		this.selectMode(this.MODE_OVERVIEW);
		
		$("#adminVerifyButton").hide();
		$("#adminRepairButton").hide();
		$("#adminCompactButton").hide();
		$("#adminBackupButton").hide();
		$("#adminRestoreButton").hide();
		$("#adminFlushDataButton").hide();
		
		$("#adminSaveButton").show(100);
		$("#adminCancelButton").show(200);
		$("#adminBrowseButton").show(300);
		$("#adminUnlockButton").show(300);
		
		$$("adminSaveButton").disable();
		$$("adminCancelButton").disable();
		
		if((this.currentRunningSolution !== null && this.currentRunningSolution.name === this.currentSolution.name) || this.currentSolution === null) {
			
			$$("adminStartSolutionButton").disable();
			$("#adminStartSolutionButton").hide();
			$("#adminStopSolutionButton").show(100);
			
			if(this.currentSolution !== null) {
				$$("adminStopSolutionButton").enable();
			} else {
				$$("adminStopSolutionButton").disable();
			}
			
		} else {
			
			$$("adminStartSolutionButton").enable();
			$$("adminStopSolutionButton").disable();
			$("#adminStartSolutionButton").show(100);
			$("#adminStopSolutionButton").hide();
			
		}
		
		if(this.currentSolution !== null) {
			
			if(this.currentSolution.settings === undefined || this.currentSolution.settings === null || $.isEmptyObject(this.currentSolution.settings)) {
				this.currentSolution.settings = admin.getSettingsFileForSolution(this.currentSolution.name);
			}
			if(!$.isEmptyObject(this.currentSolution.settings)) {
				settingsHtml = this.getSolutionSettingsMarkup(this.currentSolution.settings);
				$("#solutionSettingsOverview").html(settingsHtml);
				$("#solutionSettingsOverview").show();
			}
		} else {
			$("#solutionSettingsOverview").hide();
		}
		
		$("#loadingContainer").hide();
	},
	
	getSolutionSettingsMarkup : function get_solution_settings_markup(settings) {
		
		if($.isEmptyObject(settings.database)) {
			settings.database = {
				"fixedSize" : "",
				"flushDataInterval" : "",
				"memoryForOtherApplications" : "",
				"adaptiveCache" : null
			}
		}
		
		if($.isEmptyObject(settings.solution)) {
			
			settings.solution = {};
		}
		
		if($.isEmptyObject(settings.solution.directory)) {
			
			settings.solution.directory = {
				"authenticationType" : ""
			};
		}
		
		return '<div class="settings-container">'+
			'<div>Datastore Cache: <span class="settings-value"><span class="setting-value-label">'+settings.database.fixedSize+'</span><input class="settings-value-input" name="fixedSize" id="fixedSize" value="'+settings.database.fixedSize+'"/> MB</span></div>'+
			'<div>Flush data buffers every: <span class="settings-value"><span class="setting-value-label">'+settings.database.flushDataInterval+'</span><input class="settings-value-input" name="flushDataInterval" id="flushDataInterval" value="'+settings.database.flushDataInterval+'"/> seconds</span></div>'+
			'<div>Authentification type: <span class="settings-value"><span class="setting-value-label">'+settings.solution.directory.authenticationType+'</span><input class="settings-value-input" name="flushDataInterval" id="flushDataInterval" value="'+settings.solution.directory.authenticationType+'"/></span></div>'+
			'<div>Allocated for other application: <span class="settings-value"><span class="setting-value-label">'+settings.database.memoryForOtherApplications+'</span><input class="settings-value-input" name="flushDataInterval" id="flushDataInterval" value="'+settings.database.memoryForOtherApplications+'"/> MB</span></div>'+
			'<div>Datastore Cache adoptive: <span class="settings-value"><span class="setting-value-label">'+(settings.database.adaptiveCache ? 'yes' : 'no')+'</span><input class="settings-value-input" name="fixedSize" id="fixedSize" type="checkbox" value="1" '+(settings.database.adaptiveCache ? 'checked="checked"' : '')+'/></span></div>'
		'</div>';
	},
	
	displayMaintenanceTab : function display_overview_tab() {
		this.selectMode(this.MODE_MAINTENANCE);
		
		this.displayMaintenanceProjectList();
		
	},
	
	displayMaintenanceToolbar : function display_maintenance_toolbar() {
		
		$("#adminSaveButton").hide();
		$("#adminCancelButton").hide();
		$("#adminBrowseButton").hide();
		$("#adminStartSolutionButton").hide();
		$("#adminStopSolutionButton").hide();
		$("#adminUnlockButton").hide();
		
		$("#adminVerifyButton").show(100);
		$("#adminRepairButton").show(200);
		$("#adminCompactButton").show(300);
		// $("#adminBackupButton").show(400);
		// $("#adminRestoreButton").show(400);
		// $("#adminFlushDataButton").show(500);
		
		if(this.currentApplicationName !== null && this.currentSolution !== null && !this.maintenanceActionRunning) {
			$$("adminRepairButton").enable();
			$$("adminCompactButton").enable();
		} else {
			$$("adminRepairButton").disable();
			$$("adminCompactButton").disable();
			// $$("adminBackupButton").disable();
			// $$("adminRestoreButton").disable();
			// $$("adminFlushDataButton").disable();
		}
		
		if(this.currentApplicationName !== null && this.currentSolution !== null && !this.maintenanceActionRunning) {
			$$("adminVerifyButton").enable();
		} else {
			$$("adminVerifyButton").disable();
		}
		
	},
	
	displayMaintenanceProjectList : function display_maintenance_project_list() {
		
		var i,
			html,
			project,
			projects,
			application,
			applicationList;

		if(this.currentSolution !== null) {
			html = "";
			applicationList = this.currentSolution.applications;
			
			for(i = 0; i < applicationList.length; i++) {
				
				application = applicationList[i];
				
				if(application.admin !== true || application.name !== "ServerAdmin") {
					
					html += '<div id="projectList-'+this.currentSolution.name.replace(" ", "-")+'-'+application.name.replace(" ", "-")+'" class="project-list">' +
						'<div class="project-name" data-application-name="'+application.name+'">'+application.name+'</div>' +
						'<span class="project-busy" style="display : none;">&nbsp</span>'+
					'</div>';
				}
			}
			
			$("#adminMaintenanceProjectList").html(html);
			if(applicationList.length > 0){
				
				this.displayMaintenanceProject(applicationList[0].name, false);
			}
			
			projects = $("#adminMaintenanceProjectList .project-list");
					
			for (i = 0; i < projects.length; i++) {
				
				project = $(projects[i]);
				
				project.bind("click", function(event) {
					adminObject.displayMaintenanceProject($(this).children(".project-name").data("application-name"), false);
				});
				project.bind("mouseover", function (event) {
					$(this).addClass("project-hover");
				});
				project.bind("mouseout", function (event) {
					$(this).removeClass("project-hover");
				});
			}
		}
	},
	
	selectCurrentSolution : function select_current_solution() {
		
		if(this.currentRunningSolution !== null) {
			this.selectSolution(this.currentRunningSolution.name);
			$$("solutionCombobox").setValue(this.currentRunningSolution.name);
		}
	},
	
	displaySelectedSolution : function display_selected_solution(solutionObject) {
		
		this.currentSolution = solutionObject;
		
		if(this.viewMode === this.MODE_OVERVIEW) {
			this.displayOverviewTab();
		} else if(this.viewMode === this.MODE_MAINTENANCE) {
			this.displayMaintenanceTab();
		}
		
		$("#loadingContainer").hide();
	},
	
	displayMaintenanceProject : function display_maintenance_project(applicationName, forceToRefresh) {
		
		var currentApplication;
		
		if(this.currentApplicationName !== applicationName || forceToRefresh) {
			this.currentApplicationName = applicationName
			this.displayMaintenanceToolbar();
			
			$("#adminMaintenanceProjectList .project-list.project-selected").each(function(index) {
				$(this).removeClass("project-selected");
			});
			$("#projectList-"+this.currentSolution.name.replace(" ", "-")+"-"+applicationName.replace(" ", "-")).addClass("project-selected");
			$("#maintenanceFileDetail");
			
			currentApplication = this.getSelectedApplication();
			if(currentApplication !== null) {
				
				this.displayModeleFileDetail(currentApplication);
			}
			
			if(this.currentSolution !== null && this.currentApplicationName !== null) {
				admin.FilesAsync(
				{
					"onsuccess" : function (response) {
						adminObject.displayLogFileDetail(response);
					},
					"onerror" : function (response) {
						
					}
				}
				, {
					"name" : this.currentApplicationName,
					"sol_name" : this.currentSolution.name
				});
			}
			
			this.console.showApplicationLog();
		}
	},
	
	displayModeleFileDetail : function display_modele_file_detail(currentApplication) {
		var modeleFileHtml;
		
		modeleFileHtml = "";
		
		if(currentApplication.waModel === "" || currentApplication.waData === "") {
			$$("adminVerifyButton").disable();
			$$("adminRepairButton").disable();
			$$("adminCompactButton").disable();
		}
		
		if(currentApplication !== null) {
			modeleFileHtml = '<div class="modele-file-line">'+
				'<span class="modele-file-label">Model: </span><div class="modele-file-path">'+currentApplication.waModel+'</div>'+
			'</div>'+
			'<div class="modele-file-line">'+
				'<span class="modele-file-label">Data: </span><div class="modele-file-path">'+currentApplication.waData+'</div>'+
			'</div>';
		}
		
		$("#maintenanceModeleFileDetail").html(modeleFileHtml);
	},
	
	displayLogFileDetail : function display_log_file_detail(logs) {
		var logFileHtml;
		
		logFileHtml = "";
		
		if(logs.files.hasOwnProperty("verify") && logs.files.hasOwnProperty("repair") && logs.files.hasOwnProperty("compact")) {
			
			var i,
				verifyFile,
				repairFile,
				displayDate,
				compactFile,
				selectedOption;
			
			function sortFileByDate(file1, file2) {
				var date1,
					date2;
				
				if(file1.date < file2.date) {
					return 1;
				}
				if(file1.date > file2.date) {
					return -1;
				}
				
				return 0;
			}
			
			logFileHtml += '<div class="log-file-line">';
			
			if(logs.files.verify.length > 0) {
				
				logFileHtml += '<span class="log-file-label">Last verifications: </span><span class="log-file-select"><select id="logVerifyFile">';

				logs.files.verify.sort(sortFileByDate);
				
				if(logs.files.verify.length > 20) {
					logs.files.verify.splice(20);
				}
				selectedOption = 'selected="selected"';
				
				for(i = 0; i < logs.files.verify.length; i++) {
					
					verifyFile = logs.files.verify[i];
					
					displayDate = new Date(verifyFile.date);
					
					logFileHtml += '<option value="'+verifyFile.path+'" '+selectedOption+'>'+
						displayDate.toLocaleString()+
					'</option>';
					
					selectedOption = '';
				}
				
				logFileHtml += '</select></span>';
			} else {
				
				logFileHtml += '<span class="log-file-label">The Data has never been verified.</span>';
				
			}
			
			logFileHtml += '</div>';
			
			
			logFileHtml += '<div class="log-file-line">';
			if(logs.files.repair.length > 0) {
				
				logFileHtml += '<span class="log-file-label">Last repairs: </span><span class="log-file-select"><select id="logRepairFile">';

				logs.files.repair.sort(sortFileByDate);
				
				if(logs.files.repair.length > 20) {
					logs.files.repair.splice(20);
				}
				selectedOption = 'selected="selected"';
				
				for(i = 0; i < logs.files.repair.length; i++) {
					
					repairFile = logs.files.repair[i];
					
					displayDate = new Date(repairFile.date);
					
					logFileHtml += '<option value="'+repairFile.path+'" '+selectedOption+'>'+
						displayDate.toLocaleString()+
					'</option>';
					
					selectedOption = '';
				}
				
				logFileHtml += '</select></span>';
				
			} else {
				
				logFileHtml += '<span class="log-file-label">The Data has never been repaired.</span>';
				
			}
			logFileHtml += '</div>';
			
			
			logFileHtml += '<div class="log-file-line">';
			if(logs.files.compact.length > 0) {
				
				logFileHtml += '<span class="log-file-label">Last compactions: </span><span class="log-file-select"><select id="logCompactFile">';

				logs.files.compact.sort(sortFileByDate);
				
				if(logs.files.compact.length > 20) {
					logs.files.compact.splice(20);
				}
				selectedOption = 'selected="selected"';
				
				for(i = 0; i < logs.files.compact.length; i++) {
					
					compactFile = logs.files.compact[i];
					
					displayDate = new Date(compactFile.date);
					
					logFileHtml += '<option value="'+compactFile.path+'" '+selectedOption+'>'+
						displayDate.toLocaleString()+
					'</option>';
					
					selectedOption = '';
				}
				
				logFileHtml += '</select></span>';
				
			} else {
				logFileHtml += '<span class="log-file-label">The Data has never been compacted.</span>';
			}
			logFileHtml += '</div>';
		}
		
		$("#maintenanceLogFileDetail").html(logFileHtml);
		$("#maintenanceLogFileDetail").show(100);
	},
	
	getSelectedApplication : function get_selected_application() {
		
		var i,
			applicationTmp,
			applicationLength,
			currentApplication;
		
		currentApplication = null;
		
		if(this.currentSolution !== null && this.currentApplicationName !== null) {
			i = 0;
			applicationLength = this.currentSolution.applications.length;
			
			while(currentApplication === null && i < applicationLength) {
				
				applicationTmp = this.currentSolution.applications[i];
				
				if(applicationTmp.name === this.currentApplicationName) {
					currentApplication = applicationTmp;
				}
				i++;
			}
		}
		
		return currentApplication;
	},
	
	startWatchingServerLog : function start_waching_server_log(option) {
		var timer;
		
		timer = window.setInterval(function() {
			adminObject.console.getServerLog(true, option);
		}, 500);
		
		return timer;
	},
	
	stopWatchingServerLog : function stop_waching_server_log(timer) {
		window.clearInterval(timer);
	},
	
	verifyApplication : function verify_application() {
		var app,
			option,
			logTimer;
		
		if(!this.maintenanceActionRunning && this.currentSolution !== null) {
			
			app = {
				name : this.currentApplicationName,
				sol_name : this.currentSolution.name
			};
			
			this.maintenanceActionRunning = true;
			this.displayMaintenanceToolbar();
			
			$('#projectList-'+this.currentSolution.name.replace(" ", "-")+'-'+this.currentApplicationName.replace(" ", "-")+' span.project-busy').show();
			
			option = {
				solutionName : this.currentSolution.name,
				applicationName: this.currentApplicationName
			};
			
			adminObject.console.head('Verifing '+app.name, true, option);
			logTimer = this.startWatchingServerLog(option);
			
			admin.VerifyAsync({
				"onsuccess" : function (response) {
					adminObject.maintenanceActionRunning = false;
					$('.project-list span.project-busy').hide();
					
					adminObject.stopWatchingServerLog(logTimer);
					adminObject.console.getServerLog(true, option);
					
					if(response.errors.length > 0) {
						adminObject.console.error(response.errors, true, option);
					}
					
					adminObject.displayMaintenanceProject(adminObject.currentApplicationName, true);
				},
				"onerror" : function(errorResponse) {
					
					adminObject.maintenanceActionRunning = false;
					adminObject.displayMaintenanceToolbar();
					$('.project-list span.project-busy').hide();
					
					adminObject.stopWatchingServerLog(logTimer);
					adminObject.console.getServerLog(true, option);
					adminObject.console.error(errorResponse, true, option);
				}
			}, app);
		}
	},
	
	repairApplication : function verify_application() {
		var app,
			option,
			logTimer,
			canRepair;
			
		if(!this.maintenanceActionRunning && this.currentSolution !== null) {
			
			canRepair = (this.currentRunningSolution === null || this.currentSolution.name !== this.currentRunningSolution.name);
			if(canRepair === false && confirm("This action required to stop current running solution. Do you want to continue ?")) {
				
				$("#loadingContainer").show();
				if(admin.closeSolution()) {
					this.currentRunningSolution = null;
					this.refreshAdminHeader(this.currentSolution.name);
					
					adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 500, function() {
						autoLog();
						$("#loadingContainer").hide();
						adminObject.repairApplication();
					}));
					return;
				}
			}
			
			if(this.currentRunningSolution === null || canRepair) {
				
				app = {
					name : this.currentApplicationName,
					sol_name : this.currentSolution.name
				};
				
				this.maintenanceActionRunning = true;
				this.displayMaintenanceToolbar();
				
				$('#projectList-'+this.currentSolution.name.replace(" ", "-")+'-'+this.currentApplicationName.replace(" ", "-")+' span.project-busy').show();
				
				option = {
					solutionName : this.currentSolution.name,
					applicationName: this.currentApplicationName
				};
				
				adminObject.console.head('Repairing '+app.name, true, option);
				logTimer = this.startWatchingServerLog(option);
				
				admin.RepairAsync({
					"onsuccess" : function (response) {
						
						adminObject.maintenanceActionRunning = false;
						
						$('.project-list span.project-busy').hide();
						
						adminObject.stopWatchingServerLog(logTimer);
						adminObject.console.getServerLog(true, option);
						
						if(response.errors.length > 0) {
							adminObject.console.error(response.errors, true, option);
						}
						
						adminObject.displayMaintenanceProject(adminObject.currentApplicationName, true);
					},
					"onerror" : function (errorResponse) {
						
						adminObject.maintenanceActionRunning = false;
						adminObject.displayMaintenanceToolbar();
						
						$('.project-list span.project-busy').hide();
						
						adminObject.stopWatchingServerLog(logTimer);
						adminObject.console.getServerLog(true, option);
						adminObject.console.error(errorResponse, true, option);
					}
				}, app);
			} else {
				adminObject.displayMaintenanceToolbar();
			}
		}
	},
	
	compactApplication : function compact_application() {
		var app,
			option,
			logTimer,
			canCompact;
		
		if(!this.maintenanceActionRunning && this.currentSolution !== null) {
			
			canCompact = (this.currentRunningSolution === null || this.currentSolution.name !== this.currentRunningSolution.name);
			if(canCompact === false && confirm("This action required to stop current running solution. Do you want to continue ?")) {
				
				$("#loadingContainer").show();
				if(admin.closeSolution()) {
					this.currentRunningSolution = null;
					this.refreshAdminHeader(this.currentSolution.name);
					
					adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 500, function() {
						autoLog();
						$("#loadingContainer").hide();
						adminObject.compactApplication();
					}));
					return;
				}
			}
			
			if(this.currentRunningSolution === null || canCompact) {
				app = {
					name : this.currentApplicationName,
					sol_name : this.currentSolution.name
				};
				
				this.maintenanceActionRunning = true;
				this.displayMaintenanceToolbar();
				
				$('#projectList-'+this.currentSolution.name.replace(" ", "-")+'-'+this.currentApplicationName.replace(" ", "-")+' span.project-busy').show();
				
				option = {
					solutionName : this.currentSolution.name,
					applicationName: this.currentApplicationName
				};
				
				adminObject.console.head('Compacting '+app.name, true, option);
				logTimer = this.startWatchingServerLog(option);
				
				admin.CompactAsync({
					"onsuccess" : function (response) {
						
						adminObject.maintenanceActionRunning = false;
						
						$('.project-list span.project-busy').hide();
						
						adminObject.stopWatchingServerLog(logTimer);
						adminObject.console.getServerLog(true, option);
						
						if(response.errors.length > 0) {
							adminObject.console.error(response.errors, true, option);
						}
						
						adminObject.displayMaintenanceProject(adminObject.currentApplicationName, true);
					},
					"onerror" : function (errorResponse) {
						
						adminObject.maintenanceActionRunning = false;
						
						adminObject.displayMaintenanceToolbar();
						$('.project-list span.project-busy').hide();
						
						adminObject.stopWatchingServerLog(logTimer);
						adminObject.console.getServerLog(true, option);
						adminObject.console.error(errorResponse, true, option);
					}
				}, app);
			} else {
				adminObject.displayMaintenanceToolbar();
			}
		}
	},
	
	startCurrentSolution : function start_current_solution() {
		
		if(this.currentSolution !== null) {
			$("#loadingContainer").show();
			admin.openRecentSolutionAsync({
				"onsuccess" : function (response) {
					
					if(response === true) {
						adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 500, null));
					} else {
						
						alert("Cannot open this solution");
						$$("adminStartSolutionButton").enable();
						adminObject.console.getServerLog(true);
						
						$("#loadingContainer").hide();
					}
				}
			}, this.currentSolution.name);
		} else {
			
			alert("Please select a solution");
		}
	},
	
	waitServerAndCallback : function wait_server_and_reload(callback) {
		
		try {
			$.ajax({
				url : "/",
				statusCode : {
					200 : function() {
						var i;
						
						try {
							
							if(WAF.directory.currentUser() === null) {
								if(!adminObject.reloadingPage) {
									adminObject.reloadingPage = true;
									
									for(i = 0; i < adminObject.reloadingSetTimeOut.length; i++) {
										
										clearTimeout(adminObject.reloadingSetTimeOut[i]);
									}
									
									adminObject.reloadingSetTimeOut = [];
									
									if(callback === null) {
										window.location.reload();
									} else {
										callback();
										adminObject.reloadingPage = false;
									}
								}
							} else {
								if(adminObject.reloadingSetTimeOut.length > 0) {
									adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 1000, callback));
								}
							}
						} catch(e) {
							adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 1000, callback));
						}
					},
					404 : function() {
						adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 1000, callback));
					},
					503 : function() {
						adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 1000, callback));
					}
				},
				error : function (jqXHR, textStatus, errorThrown) {
					adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 1000, callback));
				}
			});
		} catch(e) {
			adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 1000, callback));
		}
	},
	
	stopCurrentSolution : function stop_current_solution() {
		
		if(this.currentSolution !== null) {
			
			$("#loadingContainer").show();
			admin.closeSolutionAsync({
				"onsuccess" : function (response) {
					if(response === true) {
						adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 500, null));
					} else {
						alert("Connot close current solution. Try again later.");
						$$("adminStopSolutionButton").enable();
						adminObject.console.getServerLog(true);
						$("#loadingContainer").hide();
					}
				}
			});
		}
	},
	
	showBrowseDialog : function show_browse_dialog() {
		$("#adminBrowseDialog").dialog({
			resizable: false,
			height:125,
			width:750,
			modal: true,
			draggable : false,
			title:"Browse Solution",
			dialogClass: "adminBrowseDialog",
			buttons: {
				Cancel: function() {
					$( this ).dialog( "close" );
				},
				"Launch": function() {
					var path = $("#adminBrowseInput").val();
					
					if(path !== "") {
						$( this ).dialog( "close" );
						adminObject.openSolutionByPath(path);
						$("#adminBrowseInput").val();
					}
				}
			},
			open : true
		});
	},
	
	openSolutionByPath : function open_solution_by_path(path) {
		
		$("#loadingContainer").show();
		admin.openSolutionAsync({
			"onsuccess" : function (response) {
				
				if(response === true) {
					adminObject.reloadingSetTimeOut.push(setTimeout(adminObject.waitServerAndCallback, 500, null));
				} else {
					
					alert("Cannot open this solution");
					adminObject.console.getServerLog(true);
					$("#loadingContainer").hide();
				}
			},
			"onerror" : function (error) {
				$("#loadingContainer").hide();
				alert("Cannot open this solution");
			}
		}, path);
	},
	
	shortcutHandler : function admin_shortcut_handler(event) {
		
		var eventReturn;
		
		eventReturn = true;
		
		//all shortcut will be with alt
		if(event.altKey) {
			if(this.viewMode === this.MODE_OVERVIEW) {
				switch(event.charCode) {
					//Alt + s
					case 210 :
						if(this.currentSolution !== null) {
							if(this.currentRunningSolution === null || this.currentRunningSolution.name !== this.currentSolution.name) {
								this.startCurrentSolution();
							} else {
								this.stopCurrentSolution();
							}
							eventReturn = false;
						}
						break;
					//Alt + b
					case 223 :
						this.showBrowseDialog();
						eventReturn = false;
						break;
				}
			} else if(this.viewMode === this.MODE_MAINTENANCE) {
				switch(event.charCode) {
					//Alt + v
					case 9674 :
						this.verifyApplication();
						eventReturn = false;
						break;
					//Alt + r
					case 174 :
						this.repairApplication();
						eventReturn = false;
						break;
					//Alt + c
					case 169 :
						this.compactApplication();
						eventReturn = false;
						break;
				}
			}
		}
		
		return eventReturn;
		
	}

};
