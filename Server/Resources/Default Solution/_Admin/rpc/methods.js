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
    if( app.rpcService.enabled )
        app.rpcService.disable();

    return !app.rpcService.enabled;
}
function startRPCForApp( appName )
{
    var app = solution.getApplicationByName( appName );
    if( !app.rpcService.enabled )
        app.rpcService.enable();

    return app.rpcService.enabled;
}

function stopDataServiceForApp( appName )
{
    var app = solution.getApplicationByName( appName );
    if( app.dataService.enabled )
        app.dataService.disable();

    return !app.dataService.enabled;
}
function startDataServiceForApp( appName )
{
    var app = solution.getApplicationByName( appName );
    if( !app.dataService.enabled )
        app.dataService.enable();

    return app.dataService.enabled;
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
    if( app.webAppService.enabled )
        app.webAppService.disable();

    return !app.webAppService.enabled;
}
function startWebAppForApp( appName )
{
    var app = solution.getApplicationByName( appName );
    if( !app.webAppService.enabled )
        app.webAppService.enable();

    return app.webAppService.enabled;
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
    var types = ['project', 'http', 'webApp', 'dataService', 'fileService', 'rpc', 'database'],
        app = solution.getApplicationByName( appName ),
        res = {}, files = [];
    for( var i = 0; i < types.length; i++ )
    {
        var file = app.getSettingFile( types[i], 'relativePath' );
        res[types[i]] = { 'file' : file };
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

        app.http        = {
                            enabled  : solution.applications[i].httpServer.started,
                            ip       : solution.applications[i].httpServer.ipAddress,
                            port     : solution.applications[i].httpServer.port,
                            hostName : solution.applications[i].httpServer.hostName
                          };
        app.webApp      = {
			enabled: solution.applications[i].webAppService.enabled,
			directoryIndex: solution.applications[i].webAppService.directoryIndex
		};
        app.dataService = { enabled  : solution.applications[i].dataService.enabled };
        app.rpcService  = { enabled  : solution.applications[i].rpcService.enabled };
        app.fileService = { enabled  : solution.applications[i].fileService.enabled };

        obj.applications.push( app );
    }

    return obj;
}

function getRecentSolutions()
{
    var res = solution.recentlyOpened;
    if( !res )
        res = [];
    return res;
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
