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


	/*
		Only the first line of git's output goes to stdout. The rest is dumped to stderr. There is a known issue with git's stderr where it is not
		easily piped back to stdout. First of all, "--progress" needs to be specified. Second, "2>&1" is needed to redirect stderr. However, system 
		workers pass the whole string for execution and the underlying shell does not receive the redirection instruction - 2>&1. In order to force
		redirection, the git command is executed via bash shell. In this way, the whole string is analyzed by the shell before execution.
	*/


var			_isGitModuleReady = false;
var			_gitExecPath = "";
var			_gitLogCallback = null;

function debug_alert ( inMessage )
{
	studio. alert ( inMessage );
	// console. log ( "GIT MODULE ALERT: " + ... );
}

function _gitCreateFile ( inPath )
{
	var		flResult = null;
	
	try
	{
		flResult = new File ( inPath );
	}
	catch ( e )
	{
		flResult = studio. File ( inPath );
	}
	
	return flResult;
}

function _gitPrepareFilePath ( inPath )
{
	var		pathConverted = inPath;
	
	if ( os. isMac )
	{
		pathConverted = "'" + pathConverted + "'";
	}

	return pathConverted;
}

function _gitExecuteHTTPRequest ( inURL, inVerb, inBody )
{
	var headers, resultObj;

	var			strResult = "";

	// TODO: Proxy handling
	
	var			xhr;
	if ( typeof ( studio ) == "undefined" || studio == null )
		xhr = new XMLHttpRequest ( );
	else
		xhr = new studio. XMLHttpRequest ( );
   
	xhr. onreadystatechange = function ( )
	{
		var		state = this. readyState;
		if ( state !== 4 )
		{
			// while the status event is not Done we continue
			return;
		}
	 
		strResult = this. responseText;
     };
   
	xhr. open ( inVerb, inURL );
	if ( typeof ( inBody ) != "undefined" && inBody != null )
		xhr. send ( inBody );
	else
		xhr. send ( );
		
	return ( xhr. status == 200 || xhr. status == 201 ? strResult : undefined );
}

function _isGitHubURL ( inURL )
{
	var		nStartIndex = inURL. indexOf ( "//" );
	nStartIndex = inURL. indexOf ( "/", nStartIndex + 2 );
	
	return ( inURL. indexOf ( "api.github.com" ) == nStartIndex - "api.github.com". length );
}

function _isWakandaURL ( inURL )
{
	if ( _isGitHubURL ( inURL ) )
		return false;
		
	var		nStartIndex = inURL. indexOf ( "//" );
	nStartIndex = inURL. indexOf ( "/", nStartIndex + 2 );
	nStartIndex = inURL. indexOf ( "gitservice/repo", nStartIndex + 1 );

	return ( nStartIndex > -1 );
}

var myTestImpl = function ( )
{
	var			isGitHub = _isGitHubURL ( "https://sergiy:t@api.github.com/user/repos" );
	debug_alert ( "https://sergiy:t@api.github.com/user/repos is for GitHub == " + isGitHub );
	isGitHub = _isGitHubURL ( "http://sergiy:123@127.0.0.1:8081/gitservice/repo master" );
	debug_alert ( "http://sergiy:123@127.0.0.1:8081/gitservice/repo master is for GitHub == " + isGitHub );

	var			isWakanda = _isWakandaURL ( "http://sergiy:123@127.0.0.1:8081/gitservice/repo master" );
	debug_alert ( "http://sergiy:123@127.0.0.1:8081/gitservice/repo master is for Wakanda == " + isWakanda );
	isWakanda = _isWakandaURL ( "https://sergiy:t@api.github.com/user/repos" );
	debug_alert ( "https://sergiy:t@api.github.com/user/repos is for Wakanda == " + isWakanda );
}


/**
 * Initializes the git module. Needs to be called only once for a given JS context. 
 * 
 * @param {String} inGitExecPath
 * 	The path to git executable.
 * @param {function} inLogCallback
 *  A callback function to be called by git module each time it executes a git command.
 *  Accepts two parameters: inCommand - command executed, gitResponse - text response returned by git
 *
 * @return nothing
 *
 */
var gitInitImpl = function ( inGitExecPath, inLogCallback )
{
	if ( _isGitModuleReady )
	{
		// debug_alert ( "git module has already been initialized!" );
		
		return;
	}
	
	_gitExecPath = inGitExecPath;
	_gitLogCallback = inLogCallback;
	_isGitModuleReady = true;
}

/**
 * Executes a given git command.
 * 
 * @param {String} inCommand
 * 	The command to be executed.
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * 
 * @return {String} git response in text form.
 *
 */
var gitExecuteImpl = function ( inCommand, inRootPath )
{
	var			gitWorker;
	if ( inRootPath == undefined || inRootPath == null || inRootPath == "" )
		gitWorker = new SystemWorker ( inCommand );
	else
		gitWorker = new SystemWorker ( inCommand, inRootPath );
		
	gitWorker. setBinary ( true );

	var			gitResponse = "";
	gitWorker. onmessage = function ( e )
	{
		var		result = arguments [ 0 ]. data;	
//gitDebugMsg ( "onmessage: " + result. toString ( ) );
		gitResponse += result. toString ( );
//gitDebugMsg ( "git returned " + result. length + " bytes" );
	}
	
	gitWorker. onerror = function ( e )
	{
		var		result = arguments [ 0 ]. data;
//gitDebugMsg ( "onerror: " + result. toString ( ) );
		gitResponse += result. toString ( );
//gitDebugMsg ( "git returned " + result. length + " bytes" );
	}
	
	gitWorker. onterminated = function ( )
	{
//gitDebugMsg ( "inside gitWorker::onterminated" );
		exitWait ( );
	}

	wait ( 15000 );
	
	return gitResponse;
}

/**
 * Internal private git command execution.
 * 
 * @param {String} inCommand
 * 	The command to be executed.
 * @param {String} inRootPath
 *  An optional absolute path to be used by git as the root folder for its actions.
 * 
 *  Calls the log callback so that module's user knows exactly what commands are executed.
 *
 * @return {String} git response in the form of array of strings.
 *
 */
function _gitExecute ( inCommand, inRootPath )
{
	var			gitResponse = gitExecuteImpl ( inCommand, inRootPath );
	if ( _gitLogCallback != null )
		_gitLogCallback ( inCommand, gitResponse );
		
	var			arrLines = gitResponse. split ( "\n" );
	
	return arrLines;
}

/**
 * Verifies if git module is being used within a valid git repository.
 * 
 * @param {String} inCommand
 * 	The command to be executed.
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * 
 *  Calls the log callback so that module's user knows exactly what commands are executed.
 *
 * @return {Boolean} true if repository is valid, false otherwise.
 *
 */
var	gitVerifyRepositoryImpl = function ( inPath )
{
	if ( os. isWindows )
		inPath += "\\";
	else if ( os. isMac )
		inPath += "/";
	else
		debug_alert ( "Error: unknown OS" );
		
	inPath += ".git";
	if ( os. isWindows )
		inPath += "\\";
	else if ( os. isMac )
		inPath += "/";
	else
		debug_alert ( "Error: unknown OS" );
		
	inPath += "index";
	
	var			flDotGit = _gitCreateFile ( inPath );
	
	return flDotGit. exists;
}

/**
 * Verifies if git response has any errors (conflicts only for now) in it.
 * 
 * @param {String} inLines
 * 	git response text in the forms of array of strings
 * 
 * @return {Boolean} true if there are errors, false otherwise.
 *
 */
var	gitResponseHasConflictsImpl = function ( inLines )
{
	var		bResult = false;
	
	try
	{
		for ( var i = 0; i < inLines. length; i++ )
		{
			if ( /^CONFLICT \(content\):/. test ( inLines [ i ] ) )
			{
				bResult = true;
			
				break;
			}
		}
	}
	catch ( e )
	{
		debug_alert ( e. message );
	}

	//debug_alert ( "bResult == " + bResult );
	
	return bResult;
}

/**
 * Verifies if there are any modifications in a given repository.
 * 
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * 
 * @return {Boolean} true if there is at least one modification, false otherwise.
 *
 */
var	gitRepositoryHasModificationsImpl = function ( inRepoAndTreePath )
{
	var				bResult = false;

	var				gitCommand;
	if ( os. isWindows )
		gitCommand = _gitExecPath + inRepoAndTreePath + " status --porcelain --untracked-files=no";
	else if ( os. isMac )
		//gitCommand = 'bash -c "git' + gitRepoAndTree + ' status --porcelain --untracked-files=no 2>&1"';
		//gitCommand = 'git' + gitRepoAndTree + ' status --porcelain --untracked-files=no 2>&1';
		//gitCommand = 'git status --porcelain --untracked-files=no 2>&1';
		gitCommand = 'bash -c "' + _gitExecPath + ' ' + inRepoAndTreePath + ' status --porcelain --untracked-files=no 2>&1"';
	else
		debug_alert ( "Error: unknown OS" );

	var				arrLines = _gitExecute ( gitCommand );
	for ( var i = 0; i < arrLines. length; i++ )
	{
		if (	arrLines [ i ] [ 0 ] == 'M' || arrLines [ i ] [ 1 ] == 'M' ||
				arrLines [ i ] [ 0 ] == 'A' || arrLines [ i ] [ 1 ] == 'A' ||
				arrLines [ i ] [ 0 ] == 'D' || arrLines [ i ] [ 1 ] == 'D' ||
				arrLines [ i ] [ 0 ] == 'R' || arrLines [ i ] [ 1 ] == 'R' ||
				arrLines [ i ] [ 0 ] == 'C' || arrLines [ i ] [ 1 ] == 'C' ||
				arrLines [ i ] [ 0 ] == 'U' || arrLines [ i ] [ 1 ] == 'U' )
		{
			bResult = true;
			//debug_alert ( "Matching line: " + arrLines [ i ] );
			
			break;
		}
	}

	return bResult;
}

var gitGetDefaultIgnoreImpl = function ( )
{
	var		strIgnore = "# OS X\n";
	strIgnore += "*.DS_Store\n";
	strIgnore += "._*\n";
	strIgnore += "# Wakanda preferences\n";
	strIgnore += "*.waPreferences\n";
	strIgnore += "# Wakanda log\n";
	strIgnore += "*.waLog\n";
	strIgnore += "*/Logs\n";
	strIgnore += "studio_log*\n";
	strIgnore += "# Wakanda code symbols\n";
	strIgnore += "*.waSym\n";
	strIgnore += "*.waSymData\n";
	strIgnore += "# Wakanda index\n";
	strIgnore += "*.waIndex\n";
	strIgnore += "*.Match\n";
	strIgnore += "# Wakanda User and Group cache\n";
	strIgnore += "*.cacheUAG\n";
	strIgnore += "# Wakanda backup\n";
	strIgnore += "*.waBackup\n\n";
	
	return strIgnore;
}

/**
 * Creates if necessary a default .gitignore file tailored for Wakanda solutions.
 * 
 * @param {String} inWorkTree
 * 	git working tree path where to create the .gitignore
 * 
 * @return {String}
 *  Returns empty string if the .gitignore file exists aready, returns full file path if it was
 *  actually created, returns null on error.
 *
 */
var gitInitIgnoreImpl = function ( inWorkTree )
{
	// debug_alert ( "Calling gitInitIgnoreImpl on work tree " + inWorkTree );
	var			gitIgnorePath = inWorkTree;
	if ( os. isWindows )
		gitIgnorePath += "\\";
	else if ( os. isMac )
		gitIgnorePath += "/";
	else
		debug_alert ( "Error: unknown OS" );
		
	gitIgnorePath += ".gitignore";
	
	var			flIgnore = _gitCreateFile ( gitIgnorePath );
	if ( flIgnore. exists )
		return "";
	else
	{
		var		bCreated = flIgnore. create ( );
		if ( !bCreated )
		{
			debug_alert ( "Failed to create " + gitIgnorePath );
			
			return null;
		}
	}
	
	// Now let's write the default content for Wakanda .gitignore
	var			strmIgnore = TextStream ( flIgnore, "write" );
	strmIgnore. write ( "# OS X\n");
	strmIgnore. write ( "*.DS_Store\n");
	strmIgnore. write ( "._*\n");
	strmIgnore. write ( "# Wakanda preferences\n");
	strmIgnore. write ( "*.waPreferences\n");
	strmIgnore. write ( "# Wakanda log\n");
	strmIgnore. write ( "*.waLog\n");
	strmIgnore. write ( "*/Logs\n");
	strmIgnore. write ( "studio_log*\n");
	strmIgnore. write ( "# Wakanda code symbols\n");
	strmIgnore. write ( "*.waSym\n");
	strmIgnore. write ( "*.waSymData\n");
	strmIgnore. write ( "# Wakanda index\n");
	strmIgnore. write ( "*.waIndex\n");
	strmIgnore. write ( "*.Match\n");
	strmIgnore. write ( "# Wakanda User and Group cache\n");
	strmIgnore. write ( "*.cacheUAG\n");
	strmIgnore. write ( "# Wakanda backup\n");
	strmIgnore. write ( "*.waBackup\n\n");
	strmIgnore. flush ( );
	strmIgnore. close ( );
	
	return gitIgnorePath;
}

/**
 * Returns git's version string
 * 
 */
var	gitGetVersionImpl = function ( )
{
	var				gitCommand;
	if ( os. isWindows )
		gitCommand = _gitExecPath + " version";
	else if ( os. isMac )
		gitCommand = 'bash -c "git version 2>&1"';
	else
		debug_alert ( "Error: unknown OS" );

	var				strResult = null;
	
	var				arrLines = _gitExecute ( gitCommand );
	if ( typeof ( arrLines ) == "undefined" || arrLines == null )
		debug_alert ( "Failed to retrieve git version" );
	else
	{
		if (	arrLines [ 0 ]. indexOf ( "command not found" ) == -1 &&
				arrLines [ 0 ]. indexOf ( "bash" ) == -1 &&
				arrLines [ 0 ]. length > 0 )
			strResult = arrLines [ 0 ];
		//else
			//debug_alert ( "git is not installed" );
		
	}
	
	//for ( var i = 0; i < arrLines. length; i++ )
	//	debug_alert ( "line " + i + " == " + arrLines [ i ] );

	return strResult;
}

/**
 * Runs external merge tool for all merge conflicts in a given repository.
 * 
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * 
 * Returns nothing.
 *
 */
var	gitRunMergeAllImpl = function ( inRepoAndTreePath, inRootPath )
{
/*
[http]
        sslVerify = false
[user]
        name = Sergiy
        email = stemnikov@gmail.com
[merge]
        tool = p4merge
[diff]
        tool = p4merge
[difftool "p4merge"]
        path = /Applications/p4merge.app/Contents/MacOS/p4merge
[mergetool "p4merge"]
        path = /Applications/p4merge.app/Contents/MacOS/p4merge
        keepTemporaries = false
        keepBackup = false
[mergetool]
        keepBackup = false
*/

	var				gitCommand;
	if ( os. isWindows )
		gitCommand = _gitExecPath + inRepoAndTreePath + " mergetool -y";
	else if ( os. isMac )
		gitCommand = 'bash -c "git' + inRepoAndTreePath + ' mergetool -y 2>&1"';
	else
		debug_alert ( "Error: unknown OS" );

	_gitExecute ( gitCommand, inRootPath );
}

/**
 * Executes a given stash command in a given repository.
 * 
 * @param {String} inActionName
 *  Stash command in the form of a string
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * @param {String} inComment
 *  A comment to be attached to the action.
 * 
 *  @return {String} git response in the form of array of strings.
 *
 */
function gitExecuteStashAction ( inActionName, inRepoAndTreePath, inRootPath, inComment )
{
	var				gitCommand;
	if ( os. isWindows )
		gitCommand = _gitExecPath + inRepoAndTreePath + " stash " + inActionName;
	else if ( os. isMac )
		gitCommand = 'bash -c "git' + inRepoAndTreePath + ' stash ' + inActionName;
	else
		debug_alert ( "Error: unknown OS" );
		
	if ( inActionName == "save" )
	{
		var			gitComment = "";
		// TODO: verify that comment does not contain escape characters that can mess up file paths or exec command
		if ( os. isWindows )
			gitComment = ' "' + inComment + '"';
		else if ( os. isMac )
			gitComment = " '" + inComment + "'";
		else
			debug_alert ( "Error: unknown OS" );
			
		gitCommand += gitComment;
	}

	if ( os. isMac )
		gitCommand += ' 2>&1"';
		
	return _gitExecute ( gitCommand, inRootPath );
}

/**
 * Save the current modifications into a stash in a given repository.
 * 
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * @param {String} inComment
 *  A comment to be attached to the stash.
 * 
 * Returns nothing.
 *
 */
var	gitSaveStashImpl = function ( inRepoAndTreePath, inRootPath, inComment )
{
	gitExecuteStashAction ( "save", inRepoAndTreePath, inRootPath, inComment );
}

/**
 * Pops the latest stash in a given repository.
 * 
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitPopLatestStashImpl = function ( inRepoAndTreePath, inRootPath )
{
	return gitExecuteStashAction ( "pop", inRepoAndTreePath, inRootPath, "" );
}

/**
 * Lists all existing stashes in a given repository.
 * 
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * 
 * Returns nothing.
 *
 */
var gitListStashesImpl = function ( inRepoAndTreePath, inRootPath )
{
	gitExecuteStashAction ( "list", inRepoAndTreePath, inRootPath, "" );
}

/**
 * Shows (in the log for now) the latest stash in a given repository.
 * 
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * 
 * Returns nothing.
 *
 */
var gitShowLatestStashImpl = function ( inRepoAndTreePath, inRootPath )
{
	gitExecuteStashAction ( "show -v", inRepoAndTreePath, inRootPath, "" );
}

/**
 * Clears all existing stashes in a given repository.
 * 
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * @param {String} inRootPath
 *  An absolute path to be used by git as the root folder for its actions.
 * 
 * Returns nothing.
 *
 */
var gitClearAllStashesImpl = function ( inRepoAndTreePath, inRootPath )
{
	gitExecuteStashAction ( "clear", inRepoAndTreePath, inRootPath, "" );
}

/**
 * Pulls updates from a remote server using given URL.
 * 
 * @param {String} inURL
 *  URL of a remote server to pull updates from.
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var	gitPullImpl = function ( inURL, inRepoAndTreePath )
{
	var				gitCommand;
	if ( os. isWindows )
		gitCommand = _gitExecPath + inRepoAndTreePath + " pull " + inURL; // TODO: see if a URL needs to be "quoted" if it contains spaces or other "weird" chars
	else if ( os. isMac )
		gitCommand = 'bash -c "git' + inRepoAndTreePath + " pull " + inURL + ' 2>&1"';
	else
		debug_alert ( "Error: unknown OS" );

	return _gitExecute ( gitCommand );
}

/**
 * Pushes updates to a remote server using given URL.
 * 
 * @param {String} inURL
 *  URL of a remote server to push updates to.
 * @param {String} inRepository
 * 	git repository to be used directly in the git command
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitPushImpl = function ( inURL, inRepository )
{
	var				gitCommand;
	
	if ( os. isWindows )
	{
		inRepository = '"' + inRepository + '"';
		gitCommand = _gitExecPath + " --git-dir=" + inRepository + " push " + inURL;
	}
	else if ( os. isMac )
	{
		inRepository = "'" + inRepository + "'";
		gitCommand = 'bash -c "git --git-dir=' + inRepository + " push " + inURL + ' --progress 2>&1"';
	}
	else
		debug_alert ( "Error: unknown OS" );

	//debug_alert ( gitCommand );
	var			arrLines = _gitExecute ( gitCommand );
	if ( arrLines != null && arrLines. length >= 3 )
	{
		if ( /^error\: failed/. test ( arrLines [ 2 ] ) )
			debug_alert ( "Failed to push changes to remote repository.\n\nPlease see log for more details.\nYou may need to pull from remote repository, resolve conflicts if there are any, and then\npush again." );
	}
	
	return arrLines;
}

/**
 * Commits all staged modifications into a local repository.
 * 
 * @param {String} inComment
 *  A comment to be stored with the commit.
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitCommitLocalImpl = function ( inComment, inRepoAndTreePath )
{
	var				gitCommand;

	// TODO: verify that comment does not contain escape characters that can mess up file paths or exec command
	if ( os. isWindows )
		inComment = '"' + inComment + '"';
	else if ( os. isMac )
		inComment = "'" + inComment + "'";
	else
		debug_alert ( "Error: unknown OS" );
		
	if ( os. isWindows )
		gitCommand = _gitExecPath + inRepoAndTreePath + " commit -m " + inComment;
	else if ( os. isMac )
		gitCommand = 'bash -c "git' + inRepoAndTreePath + " commit -m " + inComment + ' 2>&1"';
	else
		debug_alert ( "Error: unknown OS" );
		
	var				arrLines = _gitExecute ( gitCommand );
	
	return arrLines;
}

/**
 * Clone a remote repository to a local folder.
 * 
 * @param {String} inURL
 *  URL of a remote server to push updates to.
 * @param {String} inDestinationFolderPath
 * 	A path to a local folder to clone to. The folder will be created if necessary.
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitCloneImpl = function ( inURL, inDestinationFolderPath )
{
	var				gitCommand;
	if ( os. isMac )
	{
		inDestinationFolderPath = "'" + inDestinationFolderPath + "'";
		gitCommand = 'bash -c "git ' + " clone " + inURL + " " + inDestinationFolderPath + ' --progress 2>&1"';
	}
	else if ( os. isWindows )
	{
		inDestinationFolderPath = '"' + inDestinationFolderPath + '"';
		gitCommand = _gitExecPath + " clone " + inURL + " " + inDestinationFolderPath + " --progress";
	}
	else
		debug_alert ( "Error: unknown OS" );
		
	var				arrLines = _gitExecute ( gitCommand );
	
	return arrLines;
}

/**
 * Init a git repository in a given local folder.
 * 
 * @param {String} inFolderPath
 *  Folder path to init a repository in
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitInitRepositoryImpl = function ( inFolderPath )
{
	var				gitCommand;
	var				gitCommand2;
	var				gitDir = inFolderPath;
	if ( gitDir [ gitDir. length - 1 ] != '/' )
		gitDir += '/';
		
	gitDir += '.git';
	
	if ( os. isWindows )
	{
		inFolderPath = '"' + inFolderPath + '"';
		gitCommand = _gitExecPath + " init " + inFolderPath;
		gitCommand2 = _gitExecPath + " --git-dir=" + gitDir + " --work-tree=" + inFolderPath + " config http.sslVerify false";
	}
	else if ( os. isMac )
	{
		inFolderPath = "'" + inFolderPath + "'";
		gitCommand = 'bash -c "git' + ' init ' + inFolderPath + ' 2>&1"';
		gitCommand2 = 'bash -c "git --git-dir=' + gitDir + ' --work-tree=' + inFolderPath + ' config http.sslVerify false' + ' 2>&1"';
	}
	else
		debug_alert ( "Error: unknown OS" );
		
	var				arrLines = _gitExecute ( gitCommand );
	
	// This is needed to enable git over https with self-signed certificates on the server
	// which is usually the case when a developer just  starts working on an application
	//debug_alert ( "Running " + gitCommand2 );
	var				arrLines2 = _gitExecute ( gitCommand2 );
}

/**
 * Stage an array of files within a given repository
 * 
 * @param {Array[String]} inArrPath
 *  An array of file paths to stage
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitStageFilesImpl = function ( inArrPaths, inRepoAndTreePath )
{
	var				gitCommand;
	
	if ( os. isWindows )
		gitCommand = _gitExecPath + inRepoAndTreePath + " add";
	else if ( os. isMac )
		gitCommand = 'bash -c "git' + inRepoAndTreePath + ' add';
	else
		debug_alert ( "Error: unknown OS" );
		
	for ( var i = 0; i < inArrPaths. length; i++ )
	{
		if ( os. isWindows )
			gitCommand += ' "' + inArrPaths [ i ] + '"';
		else if ( os. isMac )
			gitCommand += " " + _gitPrepareFilePath ( inArrPaths [ i ] );
		else
			debug_alert ( "Error: unknown OS" );
	}
	
	if ( os. isMac )
		gitCommand += ' 2>&1"';
		
	return _gitExecute ( gitCommand );
}

/**
 * Returns the status of a given git repository.
 * 
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * @param {String} inWorkTree
 * 	git working tree path where to get the status
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitStatusImpl = function ( inRepoAndTreePath, inWorkTree )
{
	var				gitCommand;
	if ( os. isWindows )
		gitCommand = _gitExecPath + inRepoAndTreePath + " status -v";
	else if ( os. isMac )
		gitCommand = 'bash -c "git' + inRepoAndTreePath + ' status -v"';
	else
		debug_alert ( "Error: unknown OS" );
		
	_gitExecute ( gitCommand, inWorkTree );
}

/**
 * Remove given files from a given repository
 * 
 * @param {Array[String]} inArrPath
 *  An array of file paths to remove
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * 
 * @return {String} git response in the form of array of strings.
 *
 */
var gitRemoveImpl = function ( inArrPaths, inRepoAndTreePath )
{
	var				gitCommand;
	
	if ( os. isWindows )
		gitCommand = _gitExecPath + inRepoAndTreePath + " rm --cached";
	else if ( os. isMac )
		gitCommand = 'bash -c "git' + inRepoAndTreePath + ' rm --cached';
	else
		debug_alert ( "Error: unknown OS" );
		
	for ( var i = 0; i < inArrPaths. length; i++ )
	{
		if ( os. isWindows )
			gitCommand += ' "' + inArrPaths [ i ] + '"';
		else if ( os. isMac )
			gitCommand += ' ' + _gitPrepareFilePath ( inArrPaths [ i ] );
		else
			debug_alert ( "Error: unknown OS" );
	}
	
	if ( os. isMac )
		gitCommand += ' 2>&1"';
		
	_gitExecute ( gitCommand );
}

/**
 * Creates and initializes over HTTP a new remote repository hosted on a remote SmartHTTP server.
 * The new repositry is non-bare and is ready to be pushed to. The two currently supported hosts are Wakanda and github.com
 * 
 * @param {String} inURL
 *  URL of a remote server to create a repository on.
 * @param {String} inRemotePath
 * 	A 'path' on the remote SmartHTTP server. In case of Wakanda it is an absolute (very soon to be 
 *  changed to relative) folder path; in case of fithub it is a repository name.
 * 
 * @return {String} HTTP response (success or fail) or 'undefined' if XHR call fails.
 *
 */
var gitInitRemoteRepositoryImpl = function ( inURL, inRemotePath )
{
	var		strHTTPResponse = "";
	
	if ( _isWakandaURL ( inURL ) )
		strHTTPResponse = gitInitRepositoryOnRemoteWakandaImpl ( inURL, inRemotePath );
	else if ( _isGitHubURL ( inURL ) )
	{
		; // TODO: Implement for GitHub.com
		// github parameters: URL, repository name
	}
	else
	{
		debug_alert ( "Unknown URL type: " + inURL );
		throw ( "Unknown URL type: " + inURL );
	}
	
	return strHTTPResponse;
}

/**
 * Creates and initializes over HTTP a new remote repository hosted on Wakanda server.
 * The new repositry is non-bare and is ready to be pushed to.
 * 
 * @param {String} inURL
 *  URL of a remote server to create a repository on.
 * @param {String} inRemoteFullFolderPath
 * 	Full file path on the remote Wakanda server.
 * 
 * @return {String} HTTP response (success or fail) or 'undefined' if XHR call fails.
 *
 */
var gitInitRepositoryOnRemoteWakandaImpl = function ( inURL, inRemoteFullFolderPath )
{
	// TODO: eveything in the full URL must be properly encoded
		
	var			fullURL = inURL;
	if ( fullURL [ fullURL. length - 1 ] != "/" )
		fullURL += "/";

	fullURL += ( "init?path=" + inRemoteFullFolderPath );

	// Exampe of a full URL: http://admin:123@127.0.0.1:8081/gitservice/repo/init?path=/Volumes/SECOND/DBs/ClonedFromWakanda5
	return _gitExecuteHTTPRequest ( fullURL, "GET", null );
}

/**
 * Sets the root of the current git repository on a remote SmartHTTP server.
 * 
 * @param {String} inURL
 *  URL of a remote server to set a repository root on.
 * @param {String} inRemotePath
 * 	Full (very soon to be relative) folder path in case of remote Wakanda server.
 *  Repository name in case of github.com.
 * 
 * @return {String} HTTP response (success or fail) or 'undefined' if XHR call fails.
 *
 */
var gitSetRemoteRepositoryImpl = function ( inURL, inRemotePath )
{
	// TODO: eveything in the full URL must be properly encoded
	
	var			strHTTPResponse = "";
	
	if ( _isWakandaURL ( inURL ) )
	{
		var			fullURL = inURL;
		if ( fullURL [ fullURL. length - 1 ] != "/" )
			fullURL += "/";

		fullURL += ( "dir?path=" + inRemotePath );

		// Exampe of a full URL: http://admin:123@127.0.0.1:8081/gitservice/repo/dir?path=/Volumes/SECOND/DBs/LocalToBePushed
		strHTTPResponse = _gitExecuteHTTPRequest ( fullURL, "GET", null );
	}
	else if ( _isGitHubURL ( inURL ) )
	{
		; // TODO: Implement for GitHub.com
		// github parameters: URL, repository name
	}
	else
	{
		debug_alert ( "Unknown URL type: " + inURL );
		throw ( "Unknown URL type: " + inURL );
	}
	
	return strHTTPResponse;
}

/**
 * Gets the root of the current git repository on a remote SmartHTTP server.
 * 
 * @param {String} inURL
 *  URL of a remote server to get a repository root from.
 * 
 * @return {String} HTTP response (success or fail) or 'undefined' if XHR call fails.
 *
 */
var gitGetRemoteRepositoryImpl = function ( inURL )
{
	// TODO: eveything in the full URL must be properly encoded
	
	var			strHTTPResponse = "";
	
	if ( _isWakandaURL ( inURL ) )
	{
		var			fullURL = inURL;
		if ( fullURL [ fullURL. length - 1 ] != "/" )
			fullURL += "/";

		fullURL += "dir";

		// Exampe of a full URL: http://admin:123@127.0.0.1:8081/gitservice/repo/dir
		_gitExecuteHTTPRequest ( fullURL, "GET", null );
	}
	else if ( _isGitHubURL ( inURL ) )
	{
		; // TODO: Implement for GitHub.com
		// github parameters: URL, repository name
		// TODO: just extract repository name from the given url
	}
	else
	{
		debug_alert ( "Unknown URL type: " + inURL );
		throw ( "Unknown URL type: " + inURL );
	}
	
	return strHTTPResponse;
}

/**
 * Revert given files within a given repository
 * 
 * @param {Array[String]} inArrPath
 *  An array of file paths to revert
 * @param {String} inRepoAndTreePath
 * 	git repository and tree paths to be used directly in the git command
 * 
 * @return {Array{{Array{String}}} git response in the form of array of arrays of strings.
 *
 */
var gitRevertImpl = function ( inArrPaths, inRepoAndTreePath )
{
	var				gitCommand1;
	var				gitCommand2;
	
	if ( os. isWindows )
	{
		gitCommand1 = _gitExecPath + inRepoAndTreePath + " reset HEAD";
		gitCommand2 = _gitExecPath + inRepoAndTreePath + " checkout";
	}
	else if ( os. isMac )
	{
		gitCommand1 = 'bash -c "git' + inRepoAndTreePath + ' reset HEAD';
		gitCommand2 = 'bash -c "git' + inRepoAndTreePath + ' checkout';
	}
	else
		debug_alert ( "Error: unknown OS" );
		
	for ( var i = 0; i < inArrPaths. length; i++ )
	{
		if ( os. isWindows )
		{
			gitCommand1 += ( ' "' + inArrPaths [ i ] + '"' );
			gitCommand2 += ( ' "' + inArrPaths [ i ] + '"' );
		}
		else if ( os. isMac )
		{
			gitCommand1 += ( ' ' + _gitPrepareFilePath ( inArrPaths [ i ] ) );
			gitCommand2 += ( ' ' + _gitPrepareFilePath ( inArrPaths [ i ] ) );
		}
		else
			debug_alert ( "Error: unknown OS" );
	}
	
	if ( os. isMac )
	{
		gitCommand1 += ' 2>&1"';
		gitCommand2 += ' 2>&1"';
	}
		
	var			arrResult = new Array ( );
	arrResult. push ( _gitExecute ( gitCommand1 ) );
	arrResult. push ( _gitExecute ( gitCommand2 ) );
	
	return arrResult;
}




var				exports;

exports. myTest = myTestImpl;
exports. init = gitInitImpl;
exports. execute = gitExecuteImpl;
exports. verifyRepository = gitVerifyRepositoryImpl;
exports. responseHasConflicts = gitResponseHasConflictsImpl;
exports. repositoryHasModifications = gitRepositoryHasModificationsImpl;
exports. initIgnore = gitInitIgnoreImpl;
exports. getVersion = gitGetVersionImpl;
exports. mergeAll = gitRunMergeAllImpl;
exports. saveStash = gitSaveStashImpl;
exports. popStash = gitPopLatestStashImpl;
exports. listStashes = gitListStashesImpl;
exports. showLatestStash = gitShowLatestStashImpl;
exports. clearAllStashes = gitClearAllStashesImpl;
exports. pull = gitPullImpl;
exports. push = gitPushImpl;
exports. commit = gitCommitLocalImpl;
exports. clone = gitCloneImpl;
exports. initRepository = gitInitRepositoryImpl;
exports. stage = gitStageFilesImpl;
exports. getStatus = gitStatusImpl;
exports. remove = gitRemoveImpl;
exports. initRemoteRepository = gitInitRemoteRepositoryImpl;
exports. setRemoteRepository = gitSetRemoteRepositoryImpl;
exports. getRemoteRepository = gitGetRemoteRepositoryImpl;
exports. revert = gitRevertImpl;
exports. getDefaultIgnore = gitGetDefaultIgnoreImpl;
