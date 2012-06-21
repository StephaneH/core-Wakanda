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
// sc 26/01/2012 service migration
var kUSE_JAVASCRIPT_WEBAPP_SERVICE		= true;	// mean that the webapp service is implemented as a JavaScript service with a commonjs module
var kUSE_JAVASCRIPT_RPC_SERVICE			= true;	// mean that the rpc service is implemented as a JavaScript service with a commonjs module
var kUSE_JAVASCRIPT_DATASTORE_SERVICE	= true;	// mean that the datastore service is implemented as a JavaScript service with a commonjs module


function setService(applicationName, serviceName, enable) {
	var application = solution.getApplicationByName(applicationName);
	var service = application[serviceName];
	
	(enable) ? service.enable() : service.disable();
	
	return service.enabled;
}

function setServer(applicationName, serverName, start) {
	var application = solution.getApplicationByName(applicationName);
	var server = application[serverName];
	
	(start) ? server.start() : server.stop();
	
	return server.started;
}

function stopRPCForApp( appName )
{
	var app = solution.getApplicationByName( appName );
	
	if (!kUSE_JAVASCRIPT_RPC_SERVICE) {
		if( app.rpcService.enabled )
			app.rpcService.disable();

		return !app.rpcService.enabled;
	}
	else {
		var rpcService = require( "services/rpc").getInstanceFor( app);
		if ((rpcService != null) && (typeof rpcService != 'undefined')) {
			rpcService.stop();
			return !rpcService.isStarted();
		}
		return false;
	}
}

function startRPCForApp( appName )
{
	var app = solution.getApplicationByName( appName );
	
	if (!kUSE_JAVASCRIPT_RPC_SERVICE) {
		if( !app.rpcService.enabled )
			app.rpcService.enable();

		return app.rpcService.enabled;
	}
	else {
		var rpcService = require( "services/rpc").getInstanceFor( app);
		if ((rpcService != null) && (typeof rpcService != 'undefined')) {
			rpcService.start();
			return rpcService.isStarted();
		}
		return false;		
	}
}

function stopDataServiceForApp( appName )
{
	var app = solution.getApplicationByName( appName );

	if (!kUSE_JAVASCRIPT_DATASTORE_SERVICE) {
		if( app.dataService.enabled )
			app.dataService.disable();

		return !app.dataService.enabled;
	}
	else {
		var dataStoreService = require( "services/dataStore").getInstanceFor( app);
		if ((dataStoreService != null) && (typeof dataStoreService != 'undefined')) {
			dataStoreService.stop();
			return !dataStoreService.isStarted();
		}
		return false;
	}
}
function startDataServiceForApp( appName )
{
    var app = solution.getApplicationByName( appName );
	
	if (!kUSE_JAVASCRIPT_DATASTORE_SERVICE) {
		if( !app.dataService.enabled )
			app.dataService.enable();

		return app.dataService.enabled;
	}
	else {
		var dataStoreService = require( "services/dataStore").getInstanceFor( app);
		if ((dataStoreService != null) && (typeof dataStoreService != 'undefined')) {
			dataStoreService.start();
			return dataStoreService.isStarted();
		}
		return false;
	}
}

function stopFileServiceForApp( appName )
{
    var app = solution.getApplicationByName( appName );

    return true;
}

function startFileServiceForApp( appName )
{
    var app = solution.getApplicationByName( appName );

    return true;
}

function stopWebAppForApp( appName )
{
    var app = solution.getApplicationByName( appName );
	
	if (!kUSE_JAVASCRIPT_WEBAPP_SERVICE) {
		if( app.webAppService.enabled )
			app.webAppService.disable();

		return !app.webAppService.enabled;
	}
	else {
		var webAppService = require( "services/webApp").getInstanceFor( app);
		if ((webAppService != null) && (typeof webAppService != 'undefined')) {
			webAppService.stop();
			return !webAppService.isStarted();
		}
		return false;
	}
}

function startWebAppForApp( appName )
{
    var app = solution.getApplicationByName( appName );
	
	if (!kUSE_JAVASCRIPT_WEBAPP_SERVICE) {	
		if( !app.webAppService.enabled )
			app.webAppService.enable();

		return app.webAppService.enabled;
	}
	else {
		var webAppService = require( "services/webApp").getInstanceFor( app);
		if ((webAppService != null) && (typeof webAppService != 'undefined')) {
			webAppService.start();
			return webAppService.isStarted();
		}
		return false;
	}
}

function stopHTTPServerForApp( appName )
{
    var app = solution.getApplicationByName( appName );
    if( app.httpServer.started )
        app.httpServer.stop();
    return true;

    //return !app.httpServer.started;
}

function startHTTPServerForApp( appName )
{
    var app = solution.getApplicationByName( appName );
    if( !app.httpServer.started )
        app.httpServer.start();

    return app.httpServer.started;
}

function stopSqlServerForApp( appName )
{
    var app = solution.getApplicationByName( appName );
    if( app.sqlServer.started )
         app.sqlServer.stop();

    return !app.sqlServer.started;
}

function startSqlServerForApp( appName )
{
    var app = solution.getApplicationByName( appName );
    if( !app.sqlServer.started )
        app.sqlServer.start();

    return app.sqlServer.started;
}

function getSettingsFilesForApp( appName )
{
    var types = ['project', 'http', 'webApp', 'dataService', 'rpc', 'database'],
        app = solution.getApplicationByName( appName ),
        res = {}, files = [];
    for( var i = 0; i < types.length; i++ )
    {
        var file = app.getSettingFile( types[i], 'relativePath' );
        res[types[i]] = {'file' : file};
        var j = 0, found = false;
        while( !found && j < files.length )
        {
            if( file === files[j] )
                found = true;
            j++;
        }
        if( !found && file != null )
            files.push( file );
    }
    res.files = files;
    
    return res;
}


function getSolution()
{
    var obj = {};
    obj.name = solution.name;
    obj.path = solution.getFolder('path');
    obj.applications = [];
    
    for( var i = 0; i < solution.applications.length; i++ )
    {
        var app   = {};
        app.name  = solution.applications[i].name;
        app.path  = solution.applications[i].getFolder('path');
        app.admin = solution.applications[i].administrator;
        app.pattern = solution.applications[i].pattern;
		
		 if ((solution.applications[i].getItemsWithRole("catalog") != null) && (typeof solution.applications[i].getItemsWithRole("catalog") != 'undefined')) 
                 
                 
                     {  
                        app.waModel  = solution.applications[i].getItemsWithRole("catalog").path;
                       
                     }else{
                         
                        app.waModel  = "";
                        app.waModelshort = "";
                         
                     } 
                    if ((solution.applications[i].getItemsWithRole("data") != null) && (typeof solution.applications[i].getItemsWithRole("data") != 'undefined')) 
                     { 
                        app.waData  = solution.applications[i].getItemsWithRole("data").path;
                        
                        
                         var datapath = app.waData;
                          datapath = datapath.replace(solution.applications[i].getItemsWithRole("data").name, "");
                        
                        app.files =[];
                    
                    
                        var folderlog = Folder(datapath + 'Logs');

                  
                                  				 
							 folderlog.forEachFile(function(file) 
							 {
							 	
							 	var f   = {};
							 	f.name = file.name
							 	f.date = file.creationDate
                                                                f.path = file.path
                                                                app.files.push(f); // store the file path
							 });                    
                        
                        
                        
                     }else{
                         app.waData  = "";
                        app.waDatashort = "";
                         
                           app.files =[];
                     }
                         
		
		
                    
                    
                    
		
		
		
        app.http        = {
                            enabled  : solution.applications[i].httpServer.started,
                            ip       : solution.applications[i].httpServer.ipAddress,
                            port     : solution.applications[i].httpServer.port,
                            hostName : solution.applications[i].httpServer.hostName
                          };

		app.webApp = { enabled: false, directoryIndex: ''};
		if (!kUSE_JAVASCRIPT_WEBAPP_SERVICE) {
			app.webApp.enabled = solution.applications[i].webAppService.enabled;
			app.webApp.directoryIndex = solution.applications[i].webAppService.directoryIndex;
		}
		else {
			var webAppService = require( 'services/webApp').getInstanceFor( solution.applications[i]);
			if ((webAppService != null) && (typeof webAppService != 'undefined')) {
				app.webApp.enabled = webAppService.isStarted();
				app.webApp.directoryIndex = solution.applications[i].settings.getItem( 'services')['webApp'].directoryIndex;
			}
		}

		app.dataService = { enabled: false};
		if (!kUSE_JAVASCRIPT_DATASTORE_SERVICE) {
			app.dataService.enabled = solution.applications[i].dataService.enabled;
		}
		else {
			var dataStoreService = require( 'services/dataStore').getInstanceFor( solution.applications[i]);
			if ((dataStoreService != null) && (typeof dataStoreService != 'undefined')) {
				app.dataService.enabled = dataStoreService.isStarted();
			}
		}

		app.rpcService = { enabled: false};
		if (!kUSE_JAVASCRIPT_RPC_SERVICE) {
			app.rpcService.enabled = solution.applications[i].rpcService.enabled;
		}
		else {
			var rpcService = require( 'services/rpc').getInstanceFor( solution.applications[i]);
			if ((rpcService != null) && (typeof rpcService != 'undefined')) {
				app.rpcService.enabled = rpcService.isStarted();
			}
		}

        app.fileService = {enabled  : false};

        obj.applications.push( app );
    }

    return obj;
}

function getSolutionmaintenance(name) {
	
var recentOpened = internal.recentlyOpenedSolution();

var recentSolution = null;

for (var pos = 0 ; (pos < recentOpened.length) ; ++pos)
{
	if ((recentSolution == null) && (recentOpened[pos].name == name))
		recentSolution = recentOpened[pos];
}

	try
	{
		var sol = internal.openSolution( recentSolution.solutionFile.path, 2);
		if ((sol != null) && (typeof sol != 'undefined'))
		{
			
			var obj = {};
    obj.name = solution.name;
    obj.path = sol.getFolder('path');
    obj.applications = [];
    
    for( var i = 0; i < sol.applications.length; i++ )
    {
        var app   = {};
        app.name  = sol.applications[i].name;
        app.path  = sol.applications[i].getFolder('path');
        app.admin = sol.applications[i].administrator;
        app.pattern = sol.applications[i].pattern;
          if ((sol.applications[i].getItemsWithRole("catalog") != null) && (typeof sol.applications[i].getItemsWithRole("catalog") != 'undefined')) 
           {   
	  app.waModel  = sol.applications[i].getItemsWithRole("catalog").path;
          
            }else{
                
                app.waModel  = "";
                app.waModelshort ="";
                
            }            
           if ((sol.applications[i].getItemsWithRole("data") != null) && (typeof sol.applications[i].getItemsWithRole("data") != 'undefined')) 
           {  
           app.waData  = solution.applications[i].getItemsWithRole("data").path;
                      
                        
                         var datapath = app.waData;
                          datapath = datapath.replace(solution.applications[i].getItemsWithRole("data").name, "");
                        
                        app.files =[];
                    
                    
                        var folderlog = Folder(datapath + 'Logs');

                  
                                  				 
							 folderlog.forEachFile(function(file) 
							 {
							 	
							 	var f   = {};
							 	f.name = file.name
							 	f.date = file.creationDate
                                                                f.path = file.path
                                                                app.files.push(f); // store the file path
							 });            
           }else{
               
             app.waData  = "";
            app.waDatashort = "";  
               app.files =[];
           }
		
		
		
        app.http        = {
                            enabled  : sol.applications[i].httpServer.started,
                            ip       : sol.applications[i].httpServer.ipAddress,
                            port     : sol.applications[i].httpServer.port,
                            hostName : sol.applications[i].httpServer.hostName
                          };

		app.webApp = { enabled: false, directoryIndex: ''};
		if (!kUSE_JAVASCRIPT_WEBAPP_SERVICE) {
			app.webApp.enabled = sol.applications[i].webAppService.enabled;
			app.webApp.directoryIndex = sol.applications[i].webAppService.directoryIndex;
		}
		else {
			var webAppService = require( 'services/webApp').getInstanceFor( sol.applications[i]);
			if ((webAppService != null) && (typeof webAppService != 'undefined')) {
				app.webApp.enabled = webAppService.isStarted();
				app.webApp.directoryIndex = sol.applications[i].settings.getItem( 'services')['webApp'].directoryIndex;
			}
		}

		app.dataService = { enabled: false};
		if (!kUSE_JAVASCRIPT_DATASTORE_SERVICE) {
			app.dataService.enabled = sol.applications[i].dataService.enabled;
		}
		else {
			var dataStoreService = require( 'services/dataStore').getInstanceFor( sol.applications[i]);
			if ((dataStoreService != null) && (typeof dataStoreService != 'undefined')) {
				app.dataService.enabled = dataStoreService.isStarted();
			}
		}

		app.rpcService = { enabled: false};
		if (!kUSE_JAVASCRIPT_RPC_SERVICE) {
			app.rpcService.enabled = sol.applications[i].rpcService.enabled;
		}
		else {
			var rpcService = require( 'services/rpc').getInstanceFor( sol.applications[i]);
			if ((rpcService != null) && (typeof rpcService != 'undefined')) {
				app.rpcService.enabled = rpcService.isStarted();
			}
		}
		
        app.fileService = {enabled  : false};

        obj.applications.push( app );
    }

    return obj;
			
		}
	}
	
	catch (e)
	{
	}
	
	finally
	{
		console.log( "The solution %s will be closed", sol.name);	
		sol.close();
		sol = null;		
	}



}
//function getRecentSolutions()
//{
//    var res = solution.recentlyOpened;
//    if( !res )
//        res = [];
//    return res;
//}


function getRecentSolutions()
{
    var res = internal.recentlyOpenedSolution();
     var solutions = []
           	     
     for( var i = 0; i < res.length; i++ )
    {
    	
    	
    	solutions.push(res[i].name);
     }	
    
  	  if( !solutions )
        solutions = [];
    return solutions;
}

function openSolution( path )
{
    solution.open( path );
    //return getSolution();
    return true;
}

function openRecentSolution( name )
{
    solution.openRecent( name );
    return true;
}

function closeSolution()
{
    solution.close();
    return true;
}

function getLogMessages()
{
    var log = {};
    log.messages = console.content;

    return log;
}

function quitServer()
{
    solution.quitServer();
    return true;
}

function getDebuggerPort()
{
    return solution.getDebuggerPort();
}



function getSolutions(){
    
 
var recentSols = internal.recentlyOpenedSolution();
var result = {};
/**
 * solutions : contains all the recent solutions
 */
result.solutions = [];



for(var i = 0, sol; sol = recentSols[i] ; i++){
	
	var item = {};
	
	item.name = sol.name;
	// projects : contains all the recent projects
	item.projects = [];
	
	try{
		if(solution.name === sol.name){
			sol = solution;
		}	else{
			sol = internal.openSolution( sol.solutionFile.path, 2);
		}
		
		if ((sol != null) && (typeof sol != 'undefined')){
			for(var j = 0, project; project = sol.applications[j] ; j++){
				var app = {};
				
			 app.name = project.name;
			 app.path  = project.getFolder('path');
                         app.admin = project.administrator;
                         app.pattern = project.pattern;
             
				//             
             
             if ((project.getItemsWithRole("catalog") != null) && (typeof project.getItemsWithRole("catalog") != 'undefined')) 
           {   
			        app.waModel  = project.getItemsWithRole("catalog").path;
                                 app.waModelshort = "";
					
            }else{
                
               	 app.waModel  = "";
                 app.waModelshort = "";
                
            }            
           if ((project.getItemsWithRole("data") != null) && (typeof project.getItemsWithRole("data") != 'undefined')) 
           {  
						app.waData  = project.getItemsWithRole("data").path;
                                                app.waDatashort = "";
                        
                         var datapath = app.waData;
                         datapath = datapath.replace(project.getItemsWithRole("data").name, "");
                        
                        app.logFiles =[];
                    
                    
                        var folderlog = Folder(datapath + 'Logs');

                  
                                  				 
							 folderlog.forEachFile(function(file) 
							 {
							 	
							 	var f   = {};
							 	f.name = file.name
							 	f.date = file.creationDate
                                                                f.path = file.path
                                                                app.logFiles.push(f); // store the file path
							 });            
           }else{
               
             app.waData  = "";
             app.waDatashort ="";
             app.logFiles =[];
           }
	         app.http        = {
	                            enabled  : project.httpServer.started,
	                            ip       : project.httpServer.ipAddress,
	                            port     : project.httpServer.port,
	                            hostName : project.httpServer.hostName
	                          };
             			 
			 app.webApp = { enabled: false, directoryIndex: ''};
			 if (!kUSE_JAVASCRIPT_WEBAPP_SERVICE) {
				app.webApp.enabled = project.webAppService.enabled;
				app.webApp.directoryIndex = project.webAppService.directoryIndex;
			 }
			 else {
				var webAppService = require( 'services/webApp').getInstanceFor( project);
				if ((webAppService != null) && (typeof webAppService != 'undefined')) {
					app.webApp.enabled = webAppService.isStarted();
					app.webApp.directoryIndex = project.settings.getItem( 'services')['webApp'].directoryIndex;
				}
			 }
			 
	         app.dataService = {enabled: false};
			 if (!kUSE_JAVASCRIPT_DATASTORE_SERVICE) {
				app.dataService.enabled = project.dataService.enabled;
			 }
			 else {
				var dataStoreService = require( 'services/dataStore').getInstanceFor( project);
				if ((dataStoreService != null) && (typeof dataStoreService != 'undefined')) {
					app.dataService.enabled = dataStoreService.isStarted();
				}
			 }
			 
			 app.rpcService = {enabled: false};
			 if (!kUSE_JAVASCRIPT_RPC_SERVICE) {
				app.rpcService.enabled = project.rpcService.enabled;
			 }
			 else {
				var rpcService = require( 'services/rpc').getInstanceFor( project);
				if ((rpcService != null) && (typeof rpcService != 'undefined')) {
					app.rpcService.enabled = rpcService.isStarted();
				}
			 }
			 
	         app.fileService = {enabled  : false};
	             
	             if( app.admin != true) 
				 	item.projects.push(app);
			}
		}
	}catch(e){
		console.log(e)
	}finally{
		try{
			
			if(solution.name != sol.name){
				sol.close();
		}
		
		}catch(e){}
	}
	
	result.solutions.push(item);
}

    return result;
}