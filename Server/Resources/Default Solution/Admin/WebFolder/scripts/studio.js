function Studio() {
	
}

Studio.prototype = {
	
	
	File : {
		
		
		//TODO
		/*bool*/
		exists : true,
		file : null,
		
		setFile : function (path) {
			this.file = path;
		},
		
		
	},
	
	alert : function alert(txt) {
		window.alert(txt);
	},
	
	getLocalIpAddresses : function getLocalIpAddresses() {
		
		var localIp = webAdmin.getLocalIpAdresses();
		return localIp.join(";");
	},
	
	editor : {
	
		getProjectPath : function getProjectPath() {
			
			var i,
				projectPath,
				currentApplications,
				currentApplicationsLength;
			
			
			projectPath = "";
			currentApplications = adminObject.currentSolution.applications;
			currentApplicationsLength = currentApplications.length;
			i = 0;
			
			while(projectPath === "" && i < currentApplicationsLength) {
				currentApplication = currentApplications[i];
				
				if(currentApplication.name === adminObject.applicationSettings) {
					projectPath = currentApplication.path;
				}
				
				i++;
			}
			
			return projectPath;
		},
		
		selectFile : function selectFile() {
			
		},
		
		selectFolder : function selectFolder() {
			
		},
		
		loaded : function loaded() {
			
	    	this.getSettingJsonData();
		},
		
		getSettingJsonData : function() {
			webAdmin.getSettingJsonDataAsync({
				"onsuccess": function (response) {
					studio.editor.settingsLoadCaalback(response);
				}
			}, adminObject.currentSolution.hash, adminObject.applicationSettings);
		},
		
		setSettingJsonData : function() {
			
			var saveJson = studio.editor.settingsSaveCaalback();
			
			webAdmin.saveSattingJsonDataAsync({
				"onsuccess": function (response) {
					
					adminObject.closeSettings();
				}
			}, adminObject.currentSolution.hash, adminObject.applicationSettings, saveJson);
		},
		
		setDirty : function setDirty() {
			$("#settingsSetDirty").show();
		},
	
		settingsLoadCaalback : null,
		settingsSaveCaalback : null,
	}
}


var studio = new Studio();
	