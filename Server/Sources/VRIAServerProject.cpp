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
#include "headers4d.h"
#include "VSolution.h"
#include "VProject.h"
#include "VProjectItem.h"
#include "VRIAServerApplication.h"
#include "VRIAServerSolution.h"
#include "VJSApplication.h"
#include "VRIAServerJSAPI.h"
#include "VRIAServerTools.h"
#include "VRIAServerProjectContext.h"
#include "VRPCCatalog.h"
#include "VRIAServerLogger.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "VRIAServerHTTPSession.h"
#include "VRIAServerHTTPRequestHandler.h"
#include "VRPCService.h"
#include "VRIAServerProject.h"
#include "UsersAndGroups/Sources/UsersAndGroups.h"
#include "Security Manager/Interfaces/CSecurityManager.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "VRIAServerJSCore.h"
#include "VDataService.h"
#include "VRIAPermissions.h"
#include "VRIAJSDebuggerSettings.h"

#if VERSIONMAC
#include "AuthorizationHelpers.h"
#endif

USING_TOOLBOX_NAMESPACE


namespace ProjectOpeningParametersKeys
{
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( openingMode, XBOX::VLong, sLONG, ePOM_FOR_RUNNING);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( customHttpPort, XBOX::VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( customSSLPort, XBOX::VLong, sLONG);
	CREATE_BAGKEY_NO_DEFAULT( customAuthenticationType, XBOX::VString);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( enableChrmDebugHandler, XBOX::VBoolean, bool, false);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR(handlesDebuggerServer, XBOX::VBoolean, bool, false);
}



//--------------------------------------------------------------------------------------------------


bool _FindExistingFileInProjectHierarchy (VRIAServerProject *inProject, const XBOX::VString& inFileName, XBOX::VFilePath& outFilePath)
{
	if (NULL == inProject)
		return false;

	bool			found = false;
	VProject *		project = inProject->GetDesignProject();
	XBOX::VFilePath	path;

	outFilePath.Clear();

	if (NULL != project)
	{
		project->GetProjectFolderPath (path);
		path.ToSubFile (inFileName);

		{
			XBOX::VFile file (path);
			if (file.Exists())
				found = true;
		}

		if (!found)
		{
			VSolution* solution = project->GetSolution();

			if (NULL != solution)
			{
				solution->GetSolutionFolderPath (path);
				path.ToSubFile (inFileName);
				XBOX::VFile file (path);
				if (file.Exists())
					found = true;
			}
		}

		if (!found)
		{
			XBOX::VFolder * waLibFolder = VRIAServerApplication::Get()->RetainFolder (VRIAServerApplication::eFS_Walib);
			path = waLibFolder->GetPath();
			XBOX::ReleaseRefCountable (&waLibFolder);
			path.ToSubFolder (CVSTR ("WAF"));
			path.ToSubFolder (CVSTR ("routing"));
			path.ToSubFile (inFileName);

			VFile file (path);
			if (file.Exists())
				found = true;
		}
	}

	if (found)
		outFilePath.FromFilePath (path);

	return found;
}


//--------------------------------------------------------------------------------------------------


VRIAServerProjectOpeningParameters::VRIAServerProjectOpeningParameters()
{
}


VRIAServerProjectOpeningParameters::~VRIAServerProjectOpeningParameters()
{
}


void VRIAServerProjectOpeningParameters::SetOpeningMode( EProjectOpeningMode inOpeningMode)
{
	ProjectOpeningParametersKeys::openingMode.Set( &fBag, inOpeningMode);
}


EProjectOpeningMode VRIAServerProjectOpeningParameters::GetOpeningMode() const
{
	return ProjectOpeningParametersKeys::openingMode.Get( &fBag);
}


void VRIAServerProjectOpeningParameters::SetCustomHttpPort( sLONG inPort)
{
	ProjectOpeningParametersKeys::customHttpPort.Set( &fBag, inPort);
}


bool VRIAServerProjectOpeningParameters::GetCustomHttpPort( sLONG& outPort) const
{
	return ProjectOpeningParametersKeys::customHttpPort.Get( &fBag, outPort);
}


void VRIAServerProjectOpeningParameters::SetCustomSSLPort( sLONG inPort)
{
	ProjectOpeningParametersKeys::customSSLPort.Set( &fBag, inPort);
}


bool VRIAServerProjectOpeningParameters::GetCustomSSLPort( sLONG& outPort) const
{
	return ProjectOpeningParametersKeys::customSSLPort.Get( &fBag, outPort);
}


void VRIAServerProjectOpeningParameters::SetCustomAuthenticationType( const XBOX::VString& inAuthenticationType)
{
	ProjectOpeningParametersKeys::customAuthenticationType.Set( &fBag, inAuthenticationType);
}


bool VRIAServerProjectOpeningParameters::GetCustomAuthenticationType( XBOX::VString& outAuthenticationType) const
{
	return ProjectOpeningParametersKeys::customAuthenticationType.Get( &fBag, outAuthenticationType);
}


void VRIAServerProjectOpeningParameters::SetEnableChrmDebugHandler( bool inEnable)
{
	ProjectOpeningParametersKeys::enableChrmDebugHandler.Set( &fBag, inEnable);
}


bool VRIAServerProjectOpeningParameters::GetEnableChrmDebugHandler() const
{
	return ProjectOpeningParametersKeys::enableChrmDebugHandler.Get( &fBag);
}


void VRIAServerProjectOpeningParameters::SetHandlesDebuggerServer(bool inEnable)
{
	ProjectOpeningParametersKeys::handlesDebuggerServer.Set(&fBag, inEnable);
}


bool VRIAServerProjectOpeningParameters::GetHandlesDebuggerServer() const
{
	return ProjectOpeningParametersKeys::handlesDebuggerServer.Get(&fBag);
}


// ----------------------------------------------------------------------------



class VStopHTTPServerMessage : public VMessage
{
public:

	VStopHTTPServerMessage( VRIAServerProject* inApplication) { fApplication = RetainRefCountable( inApplication); }
	virtual ~VStopHTTPServerMessage() { QuickReleaseRefCountable( fApplication); }

protected:
	virtual	void DoExecute()
			{
				if (fApplication != NULL)
					fApplication->_StopHTTPServer();
			}

private:
			VRIAServerProject	*fApplication;
};



// ----------------------------------------------------------------------------



class VAuthenticationDelegate : public XBOX::VObject , public IAuthenticationDelegate
{
public:
			VAuthenticationDelegate( VRIAServerProject *inApplication)
			: fApplication( inApplication)
			{

			}

	virtual ~VAuthenticationDelegate()
			{
			}

	virtual	VJSGlobalContext* RetainJSContext( VError* outError, bool inReusable)
			{
				VError err = VE_OK;
				
				VJSGlobalContext *context = fApplication->RetainJSContext( err, inReusable, NULL);

				if (outError != NULL)
					*outError = err;

				return context;
			}

	virtual	VError ReleaseJSContext( VJSGlobalContext* inContext)
			{
				fApplication->ReleaseJSContext( inContext, NULL);
				return VE_OK;
			}

	virtual CUAGSession* CopyUAGSession( const XBOX::VString& inUAGSessionID)
			{
				CUAGSession *uagSession = NULL;
				VRIAHTTPSessionManager *sessionMgr = fApplication->RetainSessionMgr();
				if (sessionMgr != NULL)
				{
					VUUID uuid;
					uuid.FromString( inUAGSessionID);
					uagSession = sessionMgr->RetainSession( uuid);
					if (uagSession != NULL)
					{
						if (uagSession->hasExpired())
						{
							sessionMgr->RemoveSession( uagSession);
							ReleaseRefCountable( &uagSession);
						}
					}
					ReleaseRefCountable( &sessionMgr);
				}
				return uagSession;
			}

	virtual void SetUAGSessionAndCookie( IHTTPResponse *ioResponse)
			{
				IAuthenticationInfos* authInfo = ioResponse->GetRequest().GetAuthenticationInfos();
				CUAGSession *uagSession = authInfo->GetUAGSession();
				if (uagSession != NULL)
				{
					uagSession->SetCookie( *ioResponse, kHTTP_SESSION_COOKIE_NAME);
					if (authInfo->NeedAddUAGSession())
					{
						VRIAHTTPSessionManager* sessionMgr = fApplication->RetainSessionMgr();
						if (sessionMgr != NULL)
						{
							sessionMgr->AddSession(uagSession);
							sessionMgr->Release();
						}
					}
				}
				else
				{
					XBOX::VString cookieValue;
					if (ioResponse->GetRequest().GetCookie (kHTTP_SESSION_COOKIE_NAME, cookieValue) && !cookieValue.IsEmpty())
						ioResponse->DropCookie (kHTTP_SESSION_COOKIE_NAME);
				}
			}

private:
			VRIAServerProject	*fApplication;
};



// ----------------------------------------------------------------------------



VRIAServerProject::VRIAServerProject()
: fSolution(NULL),
fDesignProject(NULL),
fDatabase(NULL),
fDataService(NULL),
fSecurityManager(NULL),
fContextMgr(NULL),
fContextCreationEnabled(false),
fJSContextPool(NULL),
fJSRuntimeDelegate(NULL),
fRPCService(NULL),
fOpeningParameters(NULL),
fHTTPServerProject (NULL),
fApplicationStorage(NULL),
fApplicationSettings(NULL),
fSessionMgr(NULL),
fRequestNumber(0),
fLastGarbageCollectRequest(0),
fLastWorkingSetSize(0),
fPermissions(NULL),
fBackupSettings(NULL)
{
	fState.opened = false;
	fState.started = false;
	fState.inMaintenance = false;
}


VRIAServerProject::VRIAServerProject( VRIAServerSolution* inSolution)
: fSolution(inSolution),
fDesignProject(NULL),
fDatabase(NULL),
fDataService(NULL),
fSecurityManager(NULL),
fContextMgr(NULL),
fContextCreationEnabled(false),
fJSContextPool(NULL),
fJSRuntimeDelegate(NULL),
fRPCService(NULL),
fOpeningParameters(NULL),
fHTTPServerProject (NULL),
fApplicationStorage(NULL),
fApplicationSettings(NULL),
fSessionMgr(NULL),
fRequestNumber(0),
fLastGarbageCollectRequest(0),
fLastWorkingSetSize(0),
fPermissions(NULL),
fBackupSettings(NULL),
fFileSystemNamespace(NULL)
{
	fState.opened = false;
	fState.started = false;
}


VRIAServerProject::~VRIAServerProject()
{
	Close();
	ReleaseRefCountable( &fFileSystemNamespace);
}


VRIAServerProject* VRIAServerProject::OpenProject( VError& outError, VRIAServerSolution* inSolution, VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters)
{
	VRIAServerProject *application = NULL;
	outError = VE_OK;

	if (inDesignProject != NULL)
	{
		application = new VRIAServerProject( inSolution);
		if (application != NULL)
		{
			outError = application->_Open( inDesignProject, inOpeningParameters);
		}
		else
		{
			outError = ThrowError( VE_MEMORY_FULL);
		}
	}
	else
	{
		outError = VE_RIA_INVALID_DESIGN_PROJECT;
	}
	return application;
}


VError VRIAServerProject::Close()
{
	if (!fState.opened || fState.started)
		return VE_OK;

	StUseLogger logger;
	VMicrosecondsCounter usCounter;
			
	usCounter.Start();
	logger.Log( fLoggerID, eL4JML_Information, L"Closing the project");

	VError err = VE_OK;
	StErrorContextInstaller errContext;

	fContextCreationEnabled = false;

	if (fContextMgr != NULL)
	{
		VSyncEvent *syncEvent = fContextMgr->WaitForRegisteredContextsCountZero();
		if (syncEvent != NULL)
		{
			syncEvent->Lock();
			syncEvent->Release();
		}
	}

	ReleaseRefCountable( &fRPCService);

	ReleaseRefCountable( &fDataService);

	_CloseAndReleaseDatabase( fDatabase);
	fDatabase = NULL;

	if (fHTTPServerProject != NULL)
	{
		CHTTPServer *httpServer = VRIAServerApplication::Get()->GetComponentHTTP();
		if (testAssert(httpServer != NULL))
		{
			httpServer->RemoveHTTPServerProject (fHTTPServerProject);
			XBOX::ReleaseRefCountable (&fHTTPServerProject);
		}
	}

	ReleaseRefCountable( &fSecurityManager);

	fSettings.Clear();

	ReleaseRefCountable( &fContextMgr);

	if (fSessionMgr != NULL)
		fSessionMgr->Clear(); // sc 17/04/2012, to release the remaining UAG sessions

	ReleaseRefCountable( &fSessionMgr);

	ReleaseRefCountable( &fPermissions);

	delete fJSContextPool;
	fJSContextPool = NULL;

	delete fJSRuntimeDelegate;
	fJSRuntimeDelegate = NULL;

	logger.LogMessagesFromErrorContext( fLoggerID, errContext.GetContext());

	VString logMsg;
	logMsg.Printf( "Project closed (duration: %i ms)", usCounter.Stop()/1000);
	logger.Log( fLoggerID, eL4JML_Information, logMsg);

	ReleaseRefCountable( &fOpeningParameters);

	ReleaseRefCountable( &fDesignProject);

	fName.Clear();

	ReleaseRefCountable( &fApplicationStorage);

	ReleaseRefCountable( &fApplicationSettings);

	fState.opened = false;
	fState.inMaintenance = false;

	return err;
}


VError VRIAServerProject::Start()
{
	if (!fState.opened || fState.started || fState.inMaintenance)
		return VE_OK;

	StUseLogger logger;
	VMicrosecondsCounter usCounter;
			
	usCounter.Start();
	logger.Log( fLoggerID, eL4JML_Information, L"Starting the project");

	VError err = VE_OK;
	StErrorContextInstaller errContext;

#if 1//DYNAMIC_DBGR_FEATURE
	if (fOpeningParameters->GetHandlesDebuggerServer())
	{
		if ( VRIAServerApplication::Get()->GetDebuggingAuthorized() )
		{
			JSWDebuggerFactory		debuggerFactory;

#if defined(_DEBUG) && 0 // early debug deactivated for the moment (waiting for SC's modif

			VError l_err;
			IHTTPServerProjectSettings *httpServerSettings = fHTTPServerProject->GetSettings();

			XBOX::VString	l_ip_str = ServerNetTools::GetFirstLocalAddress();

			IChromeDebuggerServer*		chromeDebuggerServer = NULL;

			VFolder*		resourceFolder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
			VFilePath		filePath;
			VFile*			skeletonfile;
			VString			tracesContent("");
			filePath = resourceFolder->GetPath();
			filePath.ToSubFolder( L"debugger").ToSubFolder( L"chromium");
			filePath.SetFileName( L"remote_traces.skeleton", true);
			skeletonfile = new VFile(filePath);
			if ( skeletonfile && skeletonfile->Exists() )
			{
				VFileStream		l_file_stream(skeletonfile);
				l_err = l_file_stream.OpenReading();
				if (!l_err)
				{
					l_err = l_file_stream.GetText(tracesContent);
					l_file_stream.CloseReading();
				}
				QuickReleaseRefCountable(skeletonfile);
			}

			filePath = resourceFolder->GetPath();
			filePath.ToSubFolder( L"debugger").ToSubFolder( L"chromium");
			filePath.SetFileName( L"remote_debugger.skeleton", true);
			skeletonfile = new VFile(filePath);
			if ( skeletonfile && skeletonfile->Exists() )
			{
				VFileStream		l_file_stream(skeletonfile);
				VString			l_content("");
				l_err = l_file_stream.OpenReading();
				if (!l_err)
				{
					l_err = l_file_stream.GetText(l_content);
					l_file_stream.CloseReading();
					chromeDebuggerServer = debuggerFactory.GetChromeDebugHandler(
						//l_ip_str,
						//(sLONG)httpServerSettings->GetListeningPort(),
						l_content,
						tracesContent);
				}
				QuickReleaseRefCountable(skeletonfile);
			}
			else
			{
				l_err = VE_INVALID_PARAMETER;
			}
			ReleaseRefCountable(&resourceFolder);
			if (!l_err && testAssert(NULL != chromeDebuggerServer))
			{
				VJSGlobalContext::SetDebuggerServer( chromeDebuggerServer );
				chromeDebuggerServer->StartServer();
				{
					const VFolder *			vfRoot = fSolution->RetainFolder();
					if ( vfRoot != 0 )
					{
						VJSGlobalContext::SetSourcesRoot( *vfRoot );
						vfRoot->Release();
						VJSGlobalContext::AllowDebuggerLaunch();
					}
				}
				DebugMsg("VRIAServerProject::Start SetDebuggerServer OK: chrome debugger set !!!!\n");
				fHTTPServerProject->AddHTTPRequestHandler(dynamic_cast<VChromeDebugHandler*>chromeDebuggerServer));
			}
#else
			IWAKDebuggerServer*	wakDebuggerServer = debuggerFactory.Get();
			VJSGlobalContext::SetDebuggerServer( wakDebuggerServer,NULL );
			wakDebuggerServer->StartServer();
			const VFolder *			vfRoot = fSolution->RetainFolder( );
			if ( vfRoot != 0 )
			{
				XBOX::VFilePath	vFilePath;
				fSolution->GetDesignSolution()->BuildPathFromRelativePath( vFilePath, VString(""), FPS_POSIX );
				VString		fullPath;
				vFilePath.GetPosixPath(fullPath);
				wakDebuggerServer->SetSourcesRoot(&fullPath);
				VJSGlobalContext::SetSourcesRoot( *vfRoot );
				vfRoot->Release();
				VJSGlobalContext::AllowDebuggerLaunch();
			}

			_SetDebuggerServer(NULL,WEB_INSPECTOR_TYPE);
			IChromeDebuggerServer*		chromeDebuggerServer;
			VString						solutionName;
			fSolution->GetName(solutionName);
			chromeDebuggerServer = debuggerFactory.GetChromeDebugHandler(solutionName);
			VJSGlobalContext::SetDebuggerServer( NULL, chromeDebuggerServer );
#endif
		}
	}
#endif
	if (fJSContextPool != NULL)
	{
		fJSContextPool->SetEnabled( true);
	}

	// A project which has none preferences is taken as a library project. So, none servers or services is launched.
	if (fSettings.HasProjectSettings())
	{
		if (fHTTPServerProject != NULL)
		{
			// For debugging purpose, add a handler for the requests sent by Wakanda Studio
			VDebugHTTPRequestHandler *debugHandler = new VDebugHTTPRequestHandler( this, CVSTR("(?i)/debug/.*"));
			if (debugHandler != NULL)
			{
				err = fHTTPServerProject->AddHTTPRequestHandler( debugHandler);
				debugHandler->Release();
			}
			else
			{
				err = ThrowError( VE_MEMORY_FULL);
			}

			if (err != VE_OK)
				err = ThrowError( VE_RIA_CANNOT_ENABLE_DEBUG_SERVICE);

			// Install the optimize handler for WAF
			VFilePath optimizeScriptPath;
			VRIAServerApplication::Get()->GetWAFrameworkFolderPath( optimizeScriptPath);
			optimizeScriptPath.ToSubFolder( L"optimize");
			optimizeScriptPath.SetFileName( L"optimize.js");

			VFile *optimizeScriptFile = new VFile( optimizeScriptPath);
			if (optimizeScriptFile != NULL)
			{
				if (optimizeScriptFile->Exists())
				{
					VRIAJSCallbackGlobalFunction *callback = new VRIAJSCallbackGlobalFunction( "optimize");
					if (callback != NULL)
					{
						VJSRequestHandler *handler = new VJSRequestHandler( this, L"/waf-optimize", callback);
						if (handler != NULL)
						{
							handler->SetEnable( true);
							handler->RegisterIncludedFile( optimizeScriptFile);
							err = fHTTPServerProject->AddHTTPRequestHandler( handler);
							ReleaseRefCountable( &handler);
						}
						else
						{
							err = ThrowError( VE_MEMORY_FULL);
						}
						ReleaseRefCountable( &callback);
					}
					else
					{
						err = ThrowError( VE_MEMORY_FULL);
					}
				}
				ReleaseRefCountable( &optimizeScriptFile);
			}
			else
			{
				err = ThrowError( VE_MEMORY_FULL);
			}

			// Execute internal project bootstrap script
			VFilePath internalBootStrapPath;
			VRIAServerApplication::Get()->GetWAFrameworkFolderPath( internalBootStrapPath);
			internalBootStrapPath.ToSubFolder( L"Core");
			internalBootStrapPath.ToSubFolder( L"Runtime");
			internalBootStrapPath.SetFileName( L"projectBootStrap.js");
			_EvaluateScript( internalBootStrapPath);

			// Post 'applicationWillStart' message to the services
			_PostServicesMessage( L"applicationWillStart");

			if (fSettings.GetHTTPServerStarted())
			{
				// Is HTTP Server started on startup ?
				err = _StartHTTPServer();
				if (err != VE_OK)
					err = ThrowError( VE_RIA_CANNOT_START_HTTP_SERVER);
			}
		}
		else
		{
			err = ThrowError( VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
		}
	}

	logger.LogMessagesFromErrorContext( fLoggerID, errContext.GetContext());

	if (err == VE_OK)
	{
		VString logMsg;
		logMsg.Printf( "Project started (duration: %i ms)", usCounter.Stop()/1000);
		logger.Log( fLoggerID, eL4JML_Information, logMsg);
	}

	fState.started = true;

	return err;
}


VError VRIAServerProject::Stop()
{
	if (!fState.started)
		return VE_OK;

	StUseLogger logger;
	VMicrosecondsCounter usCounter;
			
	usCounter.Start();
	logger.Log( fLoggerID, eL4JML_Information, L"Stopping the project");

	StErrorContextInstaller errContext;
#if 1//DYNAMIC_DBGR_FEATURE
	if (fOpeningParameters->GetHandlesDebuggerServer())
	{
		IRemoteDebuggerServer*	l_dbgr_srv = VJSGlobalContext::GetDebuggerServer();
		if (l_dbgr_srv)
		{
			l_dbgr_srv->StopServer();
		}
	}
#endif
	// Post 'applicationWillStop' message to the services
	_PostServicesMessage( L"applicationWillStop");

	if (fHTTPServerProject != NULL)
	{
		if (fHTTPServerProject->IsProcessing())
		{
			// Post 'httpServerWillStop' message to the services
			_PostServicesMessage( L"httpServerWillStop");

			fHTTPServerProject->StopProcessing();
		}
	}

	if (fJSContextPool != NULL)
	{
		fJSContextPool->SetEnabled( false);
		fJSContextPool->Clear();
	}
	logger.LogMessagesFromErrorContext( fLoggerID, errContext.GetContext());

	fState.started = false;

	VString logMsg;
	logMsg.Printf( "Project stopped (duration: %i ms)", usCounter.Stop()/1000);
	logger.Log( fLoggerID, eL4JML_Information, logMsg);

	return errContext.GetLastError();
}


VError VRIAServerProject::OnStartup()
{
	VError err = VE_OK;

	if (fDesignProject != NULL)
	{
		StUseLogger logger;
		StErrorContextInstaller errorContext;
		VectorOfProjectItems itemsVector;
		VMicrosecondsCounter usCounter;
			
		usCounter.Start();
		logger.Log( fLoggerID, eL4JML_Information, L"Executing the bootstrap(s)");

		fDesignProject->GetProjectItemsFromTag( kBootstrapTag, itemsVector);
		for (VectorOfProjectItemsIterator iter = itemsVector.begin() ; iter != itemsVector.end()&& err == VE_OK ; ++iter)
		{
			if (*iter != NULL)
			{
				VFilePath scriptPath;
				(*iter)->GetFilePath( scriptPath);
			
				err = _EvaluateScript( scriptPath);

				if (err != VE_OK)
				{
					err = ThrowError( VE_RIA_CANNOT_EXECUTE_BOOTSTRAP_FILE);
				}
			}
		}

		logger.LogMessagesFromErrorContext( fLoggerID, errorContext.GetContext());
		
		VString logMsg;
		logMsg.Printf( "Bootstrap(s) executed (duration: %i ms)", usCounter.Stop()/1000);
		logger.Log( fLoggerID, eL4JML_Information, logMsg);

	}
	else
	{
		err = VE_RIA_INVALID_DESIGN_PROJECT;
	}

	return err;
}


VError VRIAServerProject::OnStop()
{
	return VE_OK;
}


bool VRIAServerProject::IsOpened() const
{
	return fState.opened;
}


bool VRIAServerProject::IsStarted() const
{
	return fState.started;
}


VRIAContext* VRIAServerProject::RetainNewContext( VError& outError)
{
	outError = VE_OK;
	VRIAContext *context = NULL;

	if (fContextCreationEnabled && fContextMgr != NULL)
	{
		context = new VRIAContext( this, fContextMgr);
		if (context != NULL)
		{
			outError = fContextMgr->RegisterContext( context);
			if (outError != VE_OK)
				ReleaseRefCountable( &context);
		}
		else
		{
			outError = ThrowError( VE_MEMORY_FULL);
		}
	}
	return context;
}


IHTTPServerProject *VRIAServerProject::RetainHTTPServerProject (VRIAContext* inContext)
{
	IHTTPServerProject *	httpServerProject = NULL;
	VRIAContext *			context = _ValidateAndRetainContext( inContext, false);

	if (context != NULL)
	{
		httpServerProject = RetainRefCountable (fHTTPServerProject);
		context->Release();
	}

	return httpServerProject;
}


VError VRIAServerProject::StartHTTPServerProject (VRIAContext* inContext)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext (inContext, true);
	if (context != NULL)
	{
		err = _StartHTTPServer();
		context->Release();
	}

	return err;
}


VError VRIAServerProject::StopHTTPServerProject( VRIAContext* inContext)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext (inContext, true);
	if (context != NULL)
	{
		if (fHTTPServerProject != NULL)
		{
			VStopHTTPServerMessage *msg = new VStopHTTPServerMessage (this);
			if (msg != NULL)
			{
				msg->PostTo (VTaskMgr::Get()->GetMainTask());
				msg->Release();
			}
		}
		else
		{
			err =  ThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
		}
		context->Release();
	}

	return err;
}


bool VRIAServerProject::IsHTTPServerProjectStarted (VRIAContext* inContext)
{
	bool started = false;

	VRIAContext *context = _ValidateAndRetainContext (inContext, true);
	if (context != NULL)
	{
		if (fHTTPServerProject != NULL)
			started = fHTTPServerProject->IsProcessing();
		context->Release();
	}

	return started;
}


CDB4DBase* VRIAServerProject::RetainDatabase( VRIAContext* inContext)

{
	CDB4DBase *base = NULL;

	VRIAContext *context = _ValidateAndRetainContext( inContext, false);
	if (context != NULL)
	{
		base = RetainRefCountable( fDatabase);
		context->Release();
	}
	return base;
}


VDataService* VRIAServerProject::RetainDataService( VRIAContext* inContext, VError* outError)
{
	VDataService *service = NULL;
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, false);
	if (context != NULL)
	{
		service = RetainRefCountable( fDataService);
		context->Release();
	}
	else
	{
		err = ThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return service;
}


VError VRIAServerProject::ReloadCatalog( VRIAContext* inContext)
{
	VError err = VE_OK;

	if (fReloadDatabaseMutex.Lock())
	{
		VRIAContext *context = _ValidateAndRetainContext (inContext, true);
		if (context != NULL)
		{
			StUseLogger logger;
			StErrorContextInstaller errContext;

			bool enableDataService = true;	// to restore data service state
			
			// Abort all JS contexts paused in debug mode.
			if (VRIAServerApplication::Get()->GetDebuggingAuthorized())
			{
				VJSGlobalContext::AbortAllDebug();
			}
			// Post 'catalogWillReload' message to the services
			_PostServicesMessage( L"catalogWillReload");
		
			if (fDatabase != NULL)
			{
				if (fDataService != NULL)
				{
					fDataService->SetDatabase( NULL);
				}
				
				if (err == VE_OK)
				{
					// Disable the application context (VRIAContext) creation to prevent the creation of base contexts and the using of the current opened database
					bool contextCreationEnabled = _SetContextCreationEnabled( false);
					
					// Disable the JavaScript context creation for this application
					bool jsContextPoolEnabled = fJSContextPool->SetEnabled( false);

					// Drop all the JavaScript contexts of the solution to release the existing application contexts
					{
						VJSContextPoolCleaner cleaner;
						cleaner.CleanAll();
					}
					
					// Ensure the application is not used anymore
					ReleaseRefCountable( &context);

					if (fContextMgr != NULL)
					{
						VSyncEvent *syncEvent = fContextMgr->WaitForRegisteredContextsCountZero();
						if (syncEvent != NULL)
						{
							syncEvent->Lock();
							syncEvent->Release();
						}
					}

					// Here, nobody can access to the database so it's safe detach it and to close it
					CDB4DBase *db = fDatabase;
					fDatabase = NULL;
					_CloseAndReleaseDatabase( db);

					_SetContextCreationEnabled( contextCreationEnabled);
					fJSContextPool->SetEnabled( jsContextPoolEnabled);
				}
			}
			else
			{
				VValueBag *settings = fSettings.RetainSettings( RIASettingID::dataService);
				enableDataService = RIASettingsKeys::DataService::enabled.Get( settings);
				ReleaseRefCountable( &settings);
			}

			if (err == VE_OK)
			{
				bool contextCreationEnabled = _SetContextCreationEnabled( false);
				bool jsContextPoolEnabled = fJSContextPool->SetEnabled( false);

				// Here, nobody can access to the database so it's safe to open it
				fDatabase = _OpenDatabase( err, false);

				if (fDatabase != NULL)
				{
					if (err == VE_OK)
					{
						if (fDataService != NULL)
						{
							fDataService->SetDatabase( fDatabase);
						}
					}
					else
					{
						_CloseAndReleaseDatabase( fDatabase);
						fDatabase = NULL;
					}
				}

				_SetContextCreationEnabled( contextCreationEnabled);
				fJSContextPool->SetEnabled( jsContextPoolEnabled);
			}

			// Post 'catalogDidReload' message to the services
			_PostServicesMessage( L"catalogDidReload");

			logger.LogMessagesFromErrorContext( fLoggerID, errContext.GetContext());

			ReleaseRefCountable( &context);
		}

		fReloadDatabaseMutex.Unlock();
	}

	return err;
}


VRPCCatalog* VRIAServerProject::RetainRPCCatalog( VRIAContext* inContext, VError* outError, const IHTTPRequest* inRequest, IHTTPResponse* inResponse)
{
	VRPCCatalog *catalog = NULL;
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, false);
	if (context != NULL)
	{
		catalog = _RetainRPCCatalog( err, inRequest, inResponse);
		context->Release();
	}
	else
	{
		err = ThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return catalog;
}


VRPCService* VRIAServerProject::RetainRPCService( VRIAContext* inContext, XBOX::VError* outError)
{
	VRPCService *service = NULL;
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, false);
	if (context != NULL)
	{
		service = RetainRefCountable( fRPCService);
		context->Release();
	}
	else
	{
		err = ThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return service;
}


CUAGDirectory* VRIAServerProject::RetainUAGDirectory( VError& outError)
{
	if (fSolution == NULL)
	{
		outError = VE_UNKNOWN_ERROR;
		return NULL;
	}

	outError = VE_OK;
	return fSolution->RetainUAGDirectory();
}


VRIAPermissions* VRIAServerProject::RetainPermissions( VRIAContext *inContext, XBOX::VError *outError)
{
	VError err = VE_OK;
	VRIAPermissions *permissions = NULL;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		permissions = RetainRefCountable( fPermissions);
		context->Release();
	}
	else
	{
		err = ThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return permissions;
}

IBackupSettings* VRIAServerProject::RetainBackupSettings(VRIAContext *inContext,VError* outError)
{
	VError err = VE_OK;
	IBackupSettings *settings = NULL;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		if (fBackupSettings == NULL)
		{
			_LoadBackupSettings();
		}
		if (fBackupSettings)
		{
			settings = RetainRefCountable( fBackupSettings);
		}
		context->Release();
	}
	else
	{
		err = ThrowError( VE_RIA_INVALID_CONTEXT);
	}

	if (outError != NULL)
		*outError = err;

	return settings;
}


VJSRequestHandler* VRIAServerProject::AddJSHTTPRequestHandler( VError& outError, VRIAContext* inContext, const VString& inPattern, IRIAJSCallback* inJSCallback)
{
	outError = VE_OK;
	VJSRequestHandler *handler = NULL;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		handler = new VJSRequestHandler( this, inPattern, inJSCallback);
		if (handler != NULL)
		{
			handler->SetEnable( true);

			if (fHTTPServerProject != NULL)
			{
				outError = fHTTPServerProject->AddHTTPRequestHandler( handler);
			}
			else
			{
				outError = ThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
			}
		}
		else
		{
			outError = ThrowError( VE_MEMORY_FULL);
		}
		context->Release();
	}
	return handler;
}


VError VRIAServerProject::RemoveJSHTTPRequestHandler( VRIAContext* inContext, const VString& inPattern, IRIAJSCallback* inJSCallback)
{
	VError err = VE_OK;

	VRIAContext *context = _ValidateAndRetainContext( inContext, true);
	if (context != NULL)
	{
		if (fHTTPServerProject != NULL)
		{
			VJSRequestHandler *handler = dynamic_cast<VJSRequestHandler*>(fHTTPServerProject->RetainHTTPRequestHandlerMatchingPattern( inPattern));
			if (handler != NULL)
			{
				IRIAJSCallback *callback = handler->RetainCallback();
				if (callback != NULL && callback->Match( inJSCallback))
				{
					err = fHTTPServerProject->RemoveHTTPRequestHandler( handler);
				}
				QuickReleaseRefCountable( callback);
			}
			QuickReleaseRefCountable( handler);
		}
		else
		{
			err = ThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
		}

		context->Release();
	}
	return err;
}


VJSGlobalContext* VRIAServerProject::RetainJSContext( VError& outError, bool inReusable, const IHTTPRequest* inRequest)
{
	outError = VE_OK;

	VJSGlobalContext *globalContext = NULL;

	if (fJSContextPool != NULL)
	{
		CUAGSession *session = NULL;
		VJSGlobalContext *preferedContext = NULL;

		if (fSessionMgr != NULL)
		{
			if (inRequest != NULL)
			{
				// sc 09/08/2012, retreive the session from the authentication infos instead of the cookie
				IAuthenticationInfos *authInfo = inRequest->GetAuthenticationInfos();
				if (authInfo != nil)
					session = RetainRefCountable( authInfo->GetUAGSession());

				if (session != NULL)
				{
					if (session->hasExpired())
					{
						fSessionMgr->RemoveSession( session);
						ReleaseRefCountable( &session);
					}
					else
					{
						preferedContext = session->GetLastUsedJSContext();
					}
				}
			}
		}

		globalContext = fJSContextPool->RetainContext( outError, inReusable, preferedContext);

		if (globalContext != NULL)
		{
			VJSContext jsContext( globalContext);

			if (session == NULL)
			{
				CUAGDirectory* dir = fSolution->RetainUAGDirectory();
				if (dir != NULL)
				{
					session = dir->MakeDefaultSession(nil, nil);
					if (fSessionMgr != NULL && session != NULL)
						fSessionMgr->AddSession(session);
					dir->Release();
				}
			}

			if (session != NULL)
			{
				// Update the context with this session
				VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
				if (rtContext != NULL)
				{
					rtContext->SetUAGSession(session);
				}

				session->SetLastUsedJSContext( globalContext);
			}
		}

		ReleaseRefCountable( &session);
	}
	return globalContext;
}


void VRIAServerProject::ReleaseJSContext( VJSGlobalContext* inContext, IHTTPResponse* inResponse)
{
	if (inContext != NULL)
	{
		if ( fSolution != 0 && fSolution-> CanGarbageCollect ( ) )
		{
			VString		vstrMessage ( "Releasing context " );
			vstrMessage. AppendLong8 ( ( sLONG8 ) inContext );
			vstrMessage. AppendCString ( "\n" );
			::DebugMsg ( vstrMessage );
		}

		// sc 28/05/2012, ensure the VJSContext object is destroyed before release the context
		{
			VJSContext		jsContext( inContext);

			CUAGSession* session = NULL;

			VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
			if (rtContext != NULL)
			{
				CDB4DContext* dbcontext = rtContext->RetainDB4DContext(this);
				if (dbcontext != NULL)
				{
					dbcontext->CleanUpForReuse();
					dbcontext->Release();
				}

				// This will make sure session storage object is unlocked (user may have locked it and forgot to unlock).
				VJSSessionStorageObject	*sessionStorageObject = rtContext->GetSessionStorageObject();
				if (sessionStorageObject != NULL)
					sessionStorageObject->ForceUnlock();


				session = rtContext->RetainUAGSession();
				rtContext->SetUAGSession( NULL); // sc 05/06/2012, WAK0076874, the default session may be reused from an other client
			}

			// Finally, update the cookie
			if (inResponse != NULL)
			{
				// sc 09/08/2012, cause HTTP server use the authentication infos UAG session to set the response, the session must be updated here
				inResponse->GetRequest().GetAuthenticationInfos()->SetUAGSession( session);
			}
			
			QuickReleaseRefCountable( session);

			if ( fSolution != 0 && fSolution-> CanGarbageCollect ( ) )
			{
				VInterlocked::Increment ( &fRequestNumber );
				sLONG8			nWorkingSetSize = 0;
				if ( VSystem::AllowedToGetSystemInfo ( ) )
					nWorkingSetSize = VSystem::GetApplicationPhysicalMemSize ( );

				if ( fLastGarbageCollectRequest + 10 < fRequestNumber || fLastWorkingSetSize + 50000000 < nWorkingSetSize )
				{
					fLastGarbageCollectRequest = fRequestNumber;
					fLastWorkingSetSize = nWorkingSetSize;
					/*
						Problem: this may be not the context hogging the memory. Need to garbage collect all contexts.
						Need to have a usage (request) counter per context. 
					*/
					VString		vstrMessage ( "Garbage collecting context " );
					sLONG8		nContext = ( sLONG8 ) inContext;
					vstrMessage. AppendLong8 ( nContext );
					vstrMessage. AppendCString ( "\n" );
					::DebugMsg ( vstrMessage );

					VJSGlobalObject*		globalObject = jsContext. GetGlobalObjectPrivateInstance ( );
					globalObject-> GarbageCollect ( );

					jsContext. GarbageCollect ( );
				}
			}
		}

		if (fJSContextPool != NULL)
			fJSContextPool->ReleaseContext( inContext);
	}
}


bool VRIAServerProject::GetUUID( VUUID& outUUID) const
{
	if (fDesignProject != NULL)
	{
		outUUID = fDesignProject->GetUUID();
		return true;
	}
	return false;
}


VRIAServerSolution* VRIAServerProject::GetSolution() const
{
	return fSolution;
}


VProject* VRIAServerProject::GetDesignProject()
{
	return fDesignProject;
}


void VRIAServerProject::GetName( XBOX::VString& outName) const
{
	outName = fName;
}


bool VRIAServerProject::IsAdministrator() const
{
	return fSettings.GetAdministrator();
}


void VRIAServerProject::GetHostName( VString& outHostName) const
{
	outHostName.Clear();
	fSettings.GetHostName( outHostName);
}


void VRIAServerProject::GetPattern( XBOX::VString& outPattern) const
{
	outPattern.Clear();
#if 0	// sc 25/03/2011 disable project pattern support
	fSettings.GetPattern( outPattern);
#endif
}


VFolder* VRIAServerProject::RetainFolder() const
{
	VFolder *folder = NULL;

	if (fDesignProject != NULL)
	{
		VProjectItem *item = fDesignProject->GetProjectItem();
		if (item != NULL)
		{
			VFilePath path;
			item->GetFilePath( path);
			path = path.ToFolder();
			if (path.IsFolder())
			{
				folder = new VFolder( path);
				if (folder != NULL && !folder->Exists())
				{
					folder->Release();
					folder = NULL;
				}
			}
		}
	}	
	return folder;
}


VFolder* VRIAServerProject::RetainLogFolder( bool inCreateIfNotExists) const
{
	VFolder *folder = NULL;

	if (fDesignProject != NULL)
	{
		VProjectItem *item = fDesignProject->GetProjectItem();
		if (item != NULL)
		{
			VFilePath path;
			item->GetFilePath( path);
			path = path.ToFolder();
			path.ToSubFolder( L"Logs");
			folder = new VFolder( path);
			if (folder != NULL && !folder->Exists() && inCreateIfNotExists)
				folder->Create();
		}
	}
	return folder;
}


VFolder* VRIAServerProject::RetainTemporaryFolder( bool inCreateIfNotExists) const
{
	VFolder *folder = NULL;

	if (fDesignProject != NULL)
	{
		VProjectItem *item = fDesignProject->GetProjectItem();
		if (item != NULL)
		{
			VFilePath path;
			item->GetFilePath( path);
			path = path.ToFolder();
			path.ToSubFolder( L"temp");
			folder = new VFolder( path);
			if (folder != NULL && !folder->Exists() && inCreateIfNotExists)
				folder->Create();
		}
	}
	return folder;
}


const VRIASettingsFile* VRIAServerProject::RetainSettingsFile( const RIASettingsID& inSettingsID) const
{
	return fSettings.RetainSettingsFile( inSettingsID);
}


VError VRIAServerProject::GetPublicationSettings( VString& outHostName, VString& outIP, sLONG& outPort, sLONG& outSSLPort, VString& outPattern, VString& outPublishName, bool& outAllowSSL, bool& outSSLMandatory) const
{
	VError err = VE_OK;

	outHostName.Clear();
	outIP.Clear();
	outPort = 0;
	outSSLPort = 0;
	outPattern.Clear();
	outAllowSSL = false;
	outSSLMandatory = false;
	
	if (!fSettings.HasProjectSettings())
	{
		err = VE_RIA_CANNOT_LOAD_PROJECT_SETTINGS;
	}
	else
	{
		fSettings.GetHostName( outHostName);
		fSettings.GetListeningAddress( outIP);
	#if 0	// sc 25/03/2011 disable project pattern support
		fSettings.GetPattern( outPattern);
	#endif
		fSettings.GetPublishName( outPublishName);
	}

	if (err == VE_OK )
	{
		bool done = false;
		bool sslDone = false;

		if (fOpeningParameters != NULL)
		{
			done = fOpeningParameters->GetCustomHttpPort( outPort);
			sslDone = fOpeningParameters->GetCustomSSLPort( outSSLPort);
		}
		if (!done)
		{
			if (!fSettings.HasHTTPServerSettings())
				err = VE_RIA_CANNOT_LOAD_HTTP_SETTINGS;
			else
			{
				outPort = fSettings.GetListeningPort();
			}
		}
		if (!sslDone)
		{
			if (!fSettings.HasHTTPServerSettings())
				err = VE_RIA_CANNOT_LOAD_HTTP_SETTINGS;
			else
			{
				outSSLPort = fSettings.GetListeningSSLPort();
			}
		}

		outAllowSSL = fSettings.GetAllowSSL();
		outSSLMandatory = fSettings.GetSSLMandatory();
	}

	if (err == VE_OK)
	{
#if WITH_DEPRECATED_IPV4_API

		// resolve the IP address
		IP4 longIP = ServerNetTools::GetIPAddress( outIP);
		if (longIP == 0)
		{
			std::vector<IP4> ipv4Addresses;
			if (ServerNetTools::GetLocalIPv4Addresses (ipv4Addresses) > 0)
			{
				ServerNetTools::GetIPAdress( ipv4Addresses.front(), outIP);
			}
		}
#endif
	}
	
	return err;
}


VRIAHTTPSessionManager*  VRIAServerProject::RetainSessionMgr() const
{
	return RetainRefCountable( fSessionMgr);
}


void VRIAServerProject::GetMessagesLoggerID( XBOX::VString& outLoggerID) const
{
	outLoggerID = fLoggerID;
}


void VRIAServerProject::BuildPathFromRelativePath( VFilePath& outPath, const VString& inRelativePath,const VString& inProjectItemRole, FilePathStyle inRelativPathStyle) const
{
	bool done = false;
	
	outPath.Clear();

	if (fDesignProject != NULL)
	{
		VProjectItem *item = fDesignProject->GetProjectItemFromTag(inProjectItemRole);
		if (item != NULL)
		{
			VFilePath folderPath;
			item->GetFilePath( folderPath);
			folderPath = folderPath.ToFolder();
			outPath.FromRelativePath( folderPath, inRelativePath, inRelativPathStyle);
		}
	}	
}

void VRIAServerProject::BuildPathFromRelativePath( VFilePath& outPath, const VString& inRelativePath, FilePathStyle inRelativPathStyle) const
{
	bool done = false;
	
	outPath.Clear();

	if (inRelativPathStyle == FPS_POSIX && inRelativePath.BeginsWith( L"walib/"))
	{
		VFilePath walibPath;
		VRIAServerApplication::Get()->GetWALibraryFolderPath( walibPath);

		VString relativePath( inRelativePath);
		relativePath.Remove( 1, 6);	// remove "walib/"
			
		outPath.FromRelativePath( walibPath, relativePath, inRelativPathStyle);
		done = true;
	}
	
	if (fDesignProject != NULL && !done)
	{
		VProjectItem *item = fDesignProject->GetProjectItem();
		if (item != NULL)
		{
			VFilePath folderPath;
			item->GetFilePath( folderPath);
			folderPath = folderPath.ToFolder();
			outPath.FromRelativePath( folderPath, inRelativePath, inRelativPathStyle);
		}
	}	
}

XBOX::VError VRIAServerProject::SynchronizeJournalInfos( const XBOX::VFilePath& inSourceDataFolderPath,const XBOX::VFilePath& inDestDataFolderPath)
{
	return _SynchronizeJournalInfos(inSourceDataFolderPath,inDestDataFolderPath);
}

sLONG VRIAServerProject::StartDebugger(VRIAContext* inContext)
{
	if ( VRIAServerApplication::Get()->GetDebuggingAuthorized() )
	{
		IRemoteDebuggerServer*	dbgrSrv = VJSGlobalContext::GetDebuggerServer();
		if (dbgrSrv)
		{
			if (dbgrSrv->GetType() == WEB_INSPECTOR_TYPE)
			{
				dbgrSrv->StartServer();
			}
		}
	}
	else
	{
		//xbox_assert(false);
		DebugMsg("VRIAServerProject::StartDebugger:  debugging not authorized\n");
	}
	return 0;
}
sLONG VRIAServerProject::StopDebugger(VRIAContext* inContext)
{
	IRemoteDebuggerServer*	dbgrSrv = VJSGlobalContext::GetDebuggerServer();
	if (dbgrSrv && (dbgrSrv->GetType() == WEB_INSPECTOR_TYPE))
	{
		dbgrSrv->StopServer();
	}
	return 0;
}

sLONG VRIAServerProject::IsDebugging(VRIAContext* inContext)
{
	IRemoteDebuggerServer*		dbgrSrv = VJSGlobalContext::GetDebuggerServer();
	if (dbgrSrv && (dbgrSrv->GetType() == WEB_INSPECTOR_TYPE))
	{
		if (dbgrSrv->HasClients())
		{
			return 1;
		}
	}
	return 0;
}

sLONG VRIAServerProject::SetBreakpoint(VRIAContext* inContext, const XBOX::VString& inUrl, sLONG inLineNb)
{
	/*sLONG result = 0;
	VString		sourcesRoot;
	{
		XBOX::VFilePath	vFilePath;
		fSolution->GetDesignSolution()->BuildPathFromRelativePath( vFilePath, VString(""), FPS_POSIX );
		vFilePath.GetPosixPath(sourcesRoot);
	}

	XBOX::VString		relFilePath = inUrl;

	XBOX::VFilePath		vfilePath(sourcesRoot,FPS_POSIX);
	XBOX::VFilePath		vFullPath;
	
	vFullPath.FromRelativePath(vfilePath,relFilePath,FPS_POSIX);

	XBOX::VString		fullPosixPath;
	
	vFullPath.GetPosixPath(fullPosixPath);
	VURL				vurl;
	vurl.FromFilePath(fullPosixPath,eURL_POSIX_STYLE);
	XBOX::VString		url;
	vurl.GetAbsoluteURL(url,true);*/

	fSolution->AddBreakpoint(inUrl,inLineNb);
	return 1;

}

sLONG VRIAServerProject::RemoveBreakpoint(VRIAContext* inContext, const XBOX::VString& inUrl, sLONG inLineNb)
{

	fSolution->RemoveBreakpoint(inUrl,inLineNb);
	return 1;

}

sLONG VRIAServerProject::GetDebuggerStatus(
			WAKDebuggerType_t&	outWAKDebuggerType,
			bool&				outStarted,
			sLONG&				outbreakpointsTimeStamp,
			bool&				outConnected,
			sLONG&				outDebuggingEventsTimeStamp,
			bool&				outPendingContexts)
{
	sLONG result = 0;
	IRemoteDebuggerServer*		dbgrSrv = VJSGlobalContext::GetDebuggerServer();
	outStarted = false;
	outWAKDebuggerType = NO_DEBUGGER_TYPE;
	if (dbgrSrv)
	{
		long long evtsTS;
		outWAKDebuggerType = dbgrSrv->GetType();
		if (outWAKDebuggerType != NO_DEBUGGER_TYPE)
		{
			fSolution->GetBreakpointsTimeStamp(outbreakpointsTimeStamp);
			dbgrSrv->GetStatus(
					outStarted,
					outConnected,
					evtsTS,
					outPendingContexts);
			outDebuggingEventsTimeStamp = (sLONG)evtsTS;
		}

	}
	return result;
}

sLONG VRIAServerProject::GetBreakpoints(XBOX::VJSContext* inContext, XBOX::VJSArray& ioBreakpoints)
{
	sLONG result = 0;

	std::set< VRemoteDebuggerBreakpointsManager::VFileBreakpoints >	tmpBrkpts;
	fSolution->GetBreakpoints(tmpBrkpts);

	std::set< VRemoteDebuggerBreakpointsManager::VFileBreakpoints >::iterator	itBrkpt = tmpBrkpts.begin();
	while ( itBrkpt != tmpBrkpts.end() )
	{
		std::set< unsigned >::iterator	itLines = (*itBrkpt).fBreakpoints.begin();

		while (itLines != (*itBrkpt).fBreakpoints.end())
		{
			VJSObject	bkp1(*inContext);
			bkp1.MakeEmpty();
			bkp1.SetProperty( "file", (*itBrkpt).fUrl );
			bkp1.SetProperty( "line", (sLONG) *itLines );
			bkp1.SetProperty( "enabled", true );
			ioBreakpoints.PushValue( bkp1 );
			itLines++;
		}
		itBrkpt++;
	}

	return result;
}


sLONG VRIAServerProject::CanSetDebuggerServer(VRIAContext* inContext, WAKDebuggerType_t inWAKDebuggerType)
{
	if (!VRIAServerApplication::Get()->GetDebuggingAuthorized())
		return 0;

	sLONG canSet = 0;

	switch (inWAKDebuggerType)
	{
	case WEB_INSPECTOR_TYPE:
	case REGULAR_DBG_TYPE:
		canSet = 1;
		break;

	default:
		break;
	}

	return canSet;
}


WAKDebuggerType_t VRIAServerProject::GetDebuggerServer(VRIAContext* inContext)
{
	WAKDebuggerType_t		l_type = NO_DEBUGGER_TYPE;
	IRemoteDebuggerServer*		dbgrSrv = VJSGlobalContext::GetDebuggerServer();
	if (dbgrSrv)
	{
		l_type = dbgrSrv->GetType();
	}
	DebugMsg("VRIAServerProject::GetDebuggerServer type=%d\n",l_type);
	return l_type;
}

VError VRIAServerProject::_SetDebuggerServer(VRIAContext* inContext, WAKDebuggerType_t inWAKDebuggerType)
{
	VError	l_err = VE_INVALID_PARAMETER;

	VRIAContext* context = _ValidateAndRetainContext( inContext, true);

	if (context == NULL)
	{
		DebugMsg("VRIAServerProject::SetDebuggerServer no CONTEXT!!!!\n");
		return VE_INVALID_PARAMETER;
	}

	if (!fOpeningParameters->GetHandlesDebuggerServer())
	{
		DebugMsg("VRIAServerProject::SetDebuggerServer only handled by admin!!!!\n");
		return VE_INVALID_PARAMETER;
	}
	if ( !VRIAServerApplication::Get()->GetDebuggingAuthorized() )
	{
		DebugMsg("VRIAServerProject::SetDebuggerServer not AUTHORIZED!!!!\n");
		return VE_INVALID_PARAMETER;
	}

#if 1
	{
		JSWDebuggerFactory		debuggerFactory;
		if ( inWAKDebuggerType == WEB_INSPECTOR_TYPE)
		{
			IHTTPServerProjectSettings *httpServerSettings = fHTTPServerProject->GetSettings();
			IChromeDebuggerServer*		chromeDebuggerServer = NULL;

			VFolder*		resourceFolder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
			VFilePath		filePath;
			VFile*			skeletonfile;
			VString			tracesContent("");
			filePath = resourceFolder->GetPath();
			filePath.SetFileName( L"remote_traces.skeleton", true);
			skeletonfile = new VFile(filePath);
			if ( skeletonfile && skeletonfile->Exists() )
			{
				VFileStream		l_file_stream(skeletonfile);
				l_err = l_file_stream.OpenReading();
				if (!l_err)
				{
					l_err = l_file_stream.GetText(tracesContent);
					l_file_stream.CloseReading();
				}
			}
			QuickReleaseRefCountable(skeletonfile);
			{
				VString	solutionName;
				fSolution->GetName(solutionName);

				chromeDebuggerServer = debuggerFactory.GetChromeDebugHandler(
						solutionName,
						tracesContent);
			}

			ReleaseRefCountable(&resourceFolder);
			if (!l_err && testAssert(NULL != chromeDebuggerServer))
			{
				VJSGlobalContext::SetDebuggerServer( NULL, chromeDebuggerServer );
				{
					const VFolder *			vfRoot = fSolution->RetainFolder();
					if ( vfRoot != 0 )
					{
						XBOX::VFilePath	vFilePath;
						fSolution->GetDesignSolution()->BuildPathFromRelativePath( vFilePath, VString(""), FPS_POSIX );
						VString		fullPath;
						vFilePath.GetPosixPath(fullPath);
						VJSGlobalContext::SetSourcesRoot( *vfRoot );
						vfRoot->Release();
						VJSGlobalContext::AllowDebuggerLaunch();
					}
				}
				DebugMsg("VRIAServerProject::SetDebuggerServer SetDebuggerServer OK: chrome debugger set !!!!\n");
				fHTTPServerProject->AddHTTPRequestHandler(dynamic_cast<VChromeDebugHandler*>(chromeDebuggerServer));
			}
		}
		else
		{
			IWAKDebuggerServer*			regularDebugger = debuggerFactory.Get();
			if (testAssert(NULL != regularDebugger))
			{
				VJSGlobalContext::SetDebuggerServer( regularDebugger,NULL );
				DebugMsg("VRIAServerProject::SetDebuggerServer SetDebuggerServer OK: regular debugger set !!!!\n");
			}
		}

#endif
		l_err = VE_OK;
	}

	context->Release();
	return l_err;
}


IJSRuntimeDelegate* VRIAServerProject::GetRuntimeDelegate()
{
	return fJSRuntimeDelegate;
}


VError VRIAServerProject::InitializeJSContext( VJSGlobalContext* inContext)
{
	VError err = VE_OK;

	if (inContext != NULL)
	{
		err = VRIAJSRuntimeContext::InitializeJSContext( inContext, this);
		if (err == VE_OK)
		{
			VJSContext jsContext( inContext);
			VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
			if (rtContext != NULL)
			{
				VJSObject globalObject( jsContext.GetGlobalObject());

				// Append the application property to the global object. The application property references the global object.
				VJSObject jsApplication( jsContext, globalObject);
				globalObject.SetProperty( kSSJS_PROPERTY_NAME_Application, jsApplication, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);

				// Append the database object to the global object
				VRIAContext *riaContext = rtContext->GetApplicationContext( this);
				if (riaContext != NULL)
				{
					CDB4DBaseContext *baseContext = (riaContext != NULL) ? riaContext->GetBaseContext() : NULL;
					CDB4DManager *db4d = VRIAServerApplication::Get()->GetComponentDB4D();
					if (db4d != NULL && baseContext != NULL)
					{
						VJSObject jsDatabase = db4d->CreateJSDatabaseObject( jsContext, baseContext);
						//IBackupSettings* pBackupSettings = db4d->CreateBackupSettings();
						//VJSObject jsBackupSettings = db4d->CreateJSBackupSettings(jsContext,pBackupSettings);
						
						globalObject.SetProperty( kSSJS_PROPERTY_NAME_Database, jsDatabase, JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
						globalObject.SetProperty( kSSJS_PROPERTY_NAME_DataStore, jsDatabase, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
						//globalObject.SetProperty( "BackupSettings", jsBackupSettings, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
						//XBOX::ReleaseRefCountable(&pBackupSettings);
						db4d->PutAllEmsInGlobalObject(globalObject, baseContext);
					}
				}

				// Add the syntax engine tester to the global object
				CLanguageSyntaxComponent *languageSyntax = VComponentManager::RetainComponentOfType< CLanguageSyntaxComponent >();
				if (languageSyntax) {
					VJSObject syntaxTester( jsContext, languageSyntax->CreateJavaScriptTestObject( jsContext ) );
					globalObject.SetProperty( CVSTR( "_syntaxTester" ), syntaxTester, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete, NULL);
					languageSyntax->Release();
				}
			}
		}
	}
	return err;
}


VError VRIAServerProject::UninitializeJSContext( VJSGlobalContext* inContext)
{
	VError err = VE_OK;
	
	if (inContext != NULL)
	{
		err = VRIAJSRuntimeContext::UninitializeJSContext( inContext);
	}
	return err;
}


VError VRIAServerProject::_Open( VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters)
{
	if (fState.opened)
		return VE_OK;
	
	VError err = VE_OK;

	if (!testAssert(fDesignProject == NULL))
		err = VE_UNKNOWN_ERROR;

	if (err == VE_OK && inDesignProject == NULL)
		err = ThrowError( VE_RIA_INVALID_DESIGN_PROJECT);

	if (err == VE_OK)
	{
		fDesignProject = inDesignProject;
		fDesignProject->Retain();
		fDesignProject->GetName( fName);
	}

	if (err == VE_OK)
	{
		CopyRefCountable( &fOpeningParameters, inOpeningParameters);
		if (fOpeningParameters == NULL)
		{
			fOpeningParameters = new VRIAServerProjectOpeningParameters();
			if (fOpeningParameters == NULL)
				err = ThrowError( VE_MEMORY_FULL);
		}
	}

	if (err == VE_OK)
	{
		fState.inMaintenance = (fOpeningParameters->GetOpeningMode() == ePOM_FOR_MAINTENANCE);

		// Initialize the log file reader
		VString solutionName;
		fSolution->GetName( solutionName);
		
		fLoggerID = L"com.wakanda-software." + solutionName + L"." + fName;
	}

	if (err == VE_OK)
	{
		StErrorContextInstaller errContext;
		StUseLogger logger;
		VMicrosecondsCounter usCounter;

		usCounter.Start();
		logger.Log( fLoggerID, eL4JML_Information, L"Opening the project");

		if (err == VE_OK || fState.inMaintenance)
		{
			// load file system definition files
			err = _LoadFileSystemDefinitions();
		}

		// Load all available settings files
		if (err == VE_OK || fState.inMaintenance)
		{
			err = _LoadSettingsFile();
			if (err != VE_OK)
				err = ThrowError( VE_RIA_CANNOT_LOAD_SETTINGS_FILES);
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			fPermissions = _LoadPermissionFile( err);
			if  (err != VE_OK)
				err = ThrowError( VE_RIA_CANNOT_LOAD_PERMISSIONS);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			fSessionMgr = new VRIAHTTPSessionManager();
			if (fSessionMgr == NULL)
				err = ThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			fContextMgr = new VRIAContextManager( this);
			if (fContextMgr == NULL)
				err = ThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			fJSRuntimeDelegate = new VRIAServerProjectJSRuntimeDelegate( this);
			if (fJSRuntimeDelegate == NULL)
				err = ThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			fJSContextPool = VRIAServerApplication::Get()->GetJSContextMgr()->CreateJSContextPool( err, this);
			if ((err == VE_OK) && (fJSContextPool != NULL))
			{
				fJSContextPool->SetEnabled( false);
				fJSContextPool->SetContextReusingEnabled ( fSettings.GetReuseJavaScriptContexts());

				// Get the required script: required script will be included into each JavaScript context
				VProjectItem *item = fDesignProject->GetProjectItem();
				if (item != NULL)
				{
					VFilePath path;
					item->GetFilePath( path);
					path = path.ToFolder();
					path.ToSubFolder( L"Scripts");
					path.SetFileName( L"required", false);
					path.SetExtension( L"js");

					VFile file( path);
					if (file.Exists())
					{
						fJSContextPool->AppendRequiredScript( path);
					}
				}

				VFilePath requiredPath;
				VRIAServerApplication::Get()->GetWAFrameworkFolderPath( requiredPath);
				requiredPath.ToSubFolder( L"Core");
				requiredPath.ToSubFolder( L"Runtime");
				requiredPath.SetFileName( L"required");
				requiredPath.SetExtension( L"js");
				VFile requiredFile( requiredPath);
				if (requiredFile.Exists())
				{
					fJSContextPool->AppendRequiredScript( requiredPath);
				}

				// sc 18/06/2012, append solution required file
				VSolution *designSolution = fDesignProject->GetSolution();
				if (designSolution != NULL)
				{
					VFilePath solRequiredPath;
					if (designSolution->GetSolutionFolderPath( solRequiredPath))
					{
						solRequiredPath.SetFileName( L"required.js");

						VFile solRequiredFile( solRequiredPath);
						if (solRequiredFile.Exists())
							fJSContextPool->AppendRequiredScript( solRequiredPath);
					}
				}
			}
			else
			{
				err = ThrowError( VE_MEMORY_FULL);
			}
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			// Instantiate the Security Manager
			fSecurityManager = (CSecurityManager*)VComponentManager::RetainUniqueComponent(CSecurityManager::Component_Type);
			if (fSecurityManager != NULL)
			{
				// Performe some optional init
				VError lError = VE_OK;
				CUAGDirectory *uagDirectory = fSolution->RetainUAGDirectory();

				fSecurityManager->SetUserDirectory( uagDirectory);

				VFilePath path( L"c:\\keytab");
				VFile file( path);
				if (file.Exists())
				{
					lError = fSecurityManager->SetKerberosConfig("srvdev", "c:\\keytab");	//jmo - todo : parametrer ca !
				}

				//err=fSecurityManager->SetKerberosConfig("I7-64B-RD-11.private.4d.fr", "C:\\keytab");
				//err=fSecurityManager->SetKerberosConfig("I7-64B-RD-11", "C:\\keytab");

				ReleaseRefCountable( &uagDirectory);
			}
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			// Open the database
			fDatabase = _OpenDatabase( err, false);
			if (err != VE_OK)
				err = ThrowError( VE_RIA_CANNOT_OPEN_DATABASE);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			// A project which has none preferences is taken as a library project. So, none servers or services is launched.
			if (fSettings.HasProjectSettings())
			{
				// Instanciate the HTTP Server Project
				CHTTPServer *httpServer = VRIAServerApplication::Get()->GetComponentHTTP();
				if (httpServer != NULL)
				{
					XBOX::VFilePath projectFolderPath;
					fDesignProject->GetProjectFolderPath( projectFolderPath);

					// Build a resources settings bag
					VValueBag resourcesSettings;
					VBagArray *bagArray = fSettings.RetainMultipleSettings( RIASettingID::resources);
					if (bagArray != NULL)
					{
						resourcesSettings.SetElements( RIASettingID::resources, bagArray);
						ReleaseRefCountable( &bagArray);
					}

					fHTTPServerProject = httpServer->NewHTTPServerProject( NULL, projectFolderPath.GetPath());
					if (fHTTPServerProject != NULL)
					{
						// Update the settings
						IHTTPServerProjectSettings *httpServerSettings = fHTTPServerProject->GetSettings();
						if (httpServerSettings != NULL)
						{
							VString strValue;
							
							fSettings.GetListeningAddress( strValue);
							httpServerSettings->SetListeningAddress( strValue);

							sLONG httpPort = -1, sslPort = -1;
							if (fOpeningParameters->GetCustomHttpPort( httpPort))
							{
								// Use the custom http port
								httpServerSettings->SetListeningPort( httpPort);
							}
							else
							{
								httpServerSettings->SetListeningPort( fSettings.GetListeningPort());
							}

							httpServerSettings->SetSSLMandatory( fSettings.GetSSLMandatory());

							if (fOpeningParameters->GetCustomSSLPort( sslPort))
							{
								// Use the custom ssl port
								httpServerSettings->SetListeningSSLPort( sslPort);
							}
							else
							{
								httpServerSettings->SetListeningSSLPort( fSettings.GetListeningSSLPort());
							}

							VFilePath sslCertificatePath;
							VValueBag *httpSettings = fSettings.RetainSettings( RIASettingID::http);
							if (httpSettings->GetString( RIASettingsKeys::HTTP::SSLCertificatePath, strValue))
							{
								sslCertificatePath.FromRelativePath( projectFolderPath, strValue, FPS_POSIX);
							}
							else
							{
								VProjectItem *certificatesFolder = fDesignProject->GetProjectItemFromTag( kProjectCertificatesFolderTag);
								if ((certificatesFolder == NULL) && (fDesignProject->GetSolution() != NULL))
									certificatesFolder = fDesignProject->GetSolution()->GetProjectItemFromTag( kSolutionCertificatesFolderTag);
								
								if (certificatesFolder != NULL)
									certificatesFolder->GetFilePath( sslCertificatePath);
							}
							httpServerSettings->SetSSLCertificatesFolderPath( sslCertificatePath);
							ReleaseRefCountable( &httpSettings);

							
							bool allowSSL = false;
							if (fSettings.GetAllowSSL() && sslCertificatePath.IsValid() && sslCertificatePath.IsFolder())	// sc 23/02/2012 check for "allowSSL" settings
							{
								VFolder sslCertificateFolder( sslCertificatePath);
								if (sslCertificateFolder.Exists())
									allowSSL = true;
							}
							httpServerSettings->SetAllowSSL( allowSSL);
							
							VProjectItem *webFolder = fDesignProject->GetProjectItemFromTag( kWebFolderTag);
							if (webFolder != NULL)
							{
								VFilePath webFolderPath;
								if (webFolder->GetFilePath( webFolderPath))
									httpServerSettings->SetWebFolderPath( webFolderPath);
							}

							fSettings.GetHostName( strValue);
							httpServerSettings->SetHostName( strValue);

							if (!fOpeningParameters->GetCustomAuthenticationType( strValue))
								fSolution->GetSettings().GetAuthenticationType( strValue);
							httpServerSettings->SetDefaultAuthType( strValue);

							// Cache settings
							httpServerSettings->SetEnableCache( fSettings.GetUseCache());
							httpServerSettings->SetCacheMaxSize( fSettings.GetCacheMaxSize());
							httpServerSettings->SetCachedObjectMaxSize( fSettings.GetCachedObjectMaxSize());

							// Compression settings
							httpServerSettings->SetEnableCompression( fSettings.GetAllowCompression());
							httpServerSettings->SetCompressionMinThreshold( fSettings.GetCompressionMinThreshold());
							httpServerSettings->SetCompressionMaxThreshold( fSettings.GetCompressionMaxThreshold());

							// Keep-Alive settings
							httpServerSettings->SetEnableKeepAlive( fSettings.GetAcceptKeepAliveConnections());
							/* Temporary disable theses settings loading... because of a bug with long timeout values
							httpServerSettings->SetKeepAliveTimeout( fSettings.GetKeepAliveTimeOut());
							httpServerSettings->SetKeepAliveMaxConnections( fSettings.GetKeepAliveMaxConnections()); */

							// Log settings
							VectorOfVString logTokens;
							fSettings.GetLogFormat( strValue);
							fSettings.GetLogTokens( logTokens);
							httpServerSettings->SetLogFormat( strValue, logTokens);
							fSettings.GetLogFolderPath( strValue);
							fDesignProject->ResolvePosixPathMacros( strValue);
							VFilePath logFolderPath( projectFolderPath, strValue, FPS_POSIX);
							httpServerSettings->SetLogFolderPath( logFolderPath);
							fSettings.GetLogFileName( strValue);
							httpServerSettings->SetLogFileName( strValue);
							httpServerSettings->SetLogMaxSize( fSettings.GetLogMaxSize());

							// Resources settings
							httpServerSettings->LoadResourcesSettingsFromBag( resourcesSettings);

							// Virtual Folders settings
							VValueBag virtualFoldersSettings;
							bagArray = fSettings.RetainMultipleSettings( RIASettingID::virtualFolder);
							if (bagArray != NULL)
							{
								virtualFoldersSettings.SetElements( RIASettingID::virtualFolder, bagArray);
								ReleaseRefCountable( &bagArray);
							}
							httpServerSettings->LoadVirtualFoldersSettingsFromBag( virtualFoldersSettings);


							//----------------------------------------------------------------------
							// VRoutingPreProcessingHandler

							XBOX::VFilePath path;
							bool found = _FindExistingFileInProjectHierarchy (this, CVSTR ("targets.json"), path);

							if (found)
							{
								IPreProcessingHandler *routingProcessingHandler = new VRoutingPreProcessingHandler (path);
								if (NULL != routingProcessingHandler)
									fHTTPServerProject->AddPreProcessingHandler (routingProcessingHandler);
								XBOX::ReleaseRefCountable (&routingProcessingHandler);
							}
						}

						// Authentication Manager settings
						IAuthenticationManager *authenticationMgr = fHTTPServerProject->GetAuthenticationManager();
						if (authenticationMgr != NULL)
						{
							IAuthenticationReferee *authenticationReferee = authenticationMgr->GetAuthenticationReferee();
							if (authenticationReferee != NULL)
							{
								authenticationReferee->LoadFromBag( &resourcesSettings);
							}
						}

						VAuthenticationDelegate *authenticationDelegate = new VAuthenticationDelegate( this);
						fHTTPServerProject->SetAuthenticationDelegate( authenticationDelegate);
						ReleaseRefCountable( &authenticationDelegate);

						if (fSecurityManager != NULL)
						{
							// The server will need a ptr to the Security Manager to handle request authentication
							fHTTPServerProject->SetSecurityManager (fSecurityManager);
						}
#if 1//WKA_USE_UNIFIED_DBG
						if (httpServerSettings && fOpeningParameters->GetEnableChrmDebugHandler())
						{
/*
							const XBOX::VString			K_DBG_FILE_NAME("wak_chromium_dbg.txt");
							bool	l_found;
							l_found = false;
							// test if wak_chromium_dbg.txt exists in wak server exec folder
							VFolder *execFolder = VRIAServerApplication::Get()->RetainExecutableFolder();
							if (execFolder != NULL)
							{
								VString										l_name;
								std::vector< VRefPtr<VFile> >				l_files;
								std::vector< VRefPtr<VFolder> >				resourceFolders;
								execFolder->GetContents(l_files, resourceFolders);
								std::vector< VRefPtr<VFile> >::iterator		l_it;

								for( l_it=l_files.begin(); l_it<l_files.end(); l_it++)
								{
									(*l_it)->GetName(l_name);
									if (l_name.EqualToString(K_DBG_FILE_NAME))
									{
										l_found = true;
										break;
									}
								}
								ReleaseRefCountable( &execFolder);
							}
*/
							// Install a virtual fodler for the JavaScript debugger
							VFolder *resourcesFolder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
							if (/*l_found &&*/ resourcesFolder != NULL)
							{
								VFilePath virtualFolderPath( resourcesFolder->GetPath());
								virtualFolderPath.ToSubFolder( L"debugger").ToSubFolder( L"chromium");

								VFolder virtualFolder( virtualFolderPath);
								if (virtualFolder.Exists())
								{
									fHTTPServerProject->AddVirtualFolder( virtualFolderPath.GetPath(), L"index.html", L"wka_dbg");
								}

							}
							ReleaseRefCountable( &resourcesFolder);
						}
#endif
					}
					else
					{
						err = ThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
					}

					// Cache Manager settings
					ICacheManager *cacheManager = httpServer->GetCacheManager();
					if (cacheManager != NULL)
					{
						cacheManager->LoadRulesFromBag( &resourcesSettings);
					}

					/* Set Server Signature such as ProductName/MajorVers.MinorVers build branch.buildNumber (Platform-BuildArch)
					 * Example: Server: Wakanda/2.0 build 2.123456 (Windows-x64)
					 */
					static bool sServerSignatureDefined = false;
					if (!sServerSignatureDefined)
					{
						XBOX::VString	versionString;
						XBOX::VProcess::Get()->GetProductVersion (versionString);
						httpServer->SetServerInformations ("Wakanda", versionString, true);
						sServerSignatureDefined = true;
					}
				}
				else
				{
					err = ThrowError (VE_RIA_HTTP_SERVER_NOT_FOUND);
				}
			}
		}


		if (err == VE_OK && fHTTPServerProject != NULL)
			err = fHTTPServerProject->Validate();

		if (err == VE_OK && !fState.inMaintenance)
		{
			fRPCService = new VRPCService( this, fHTTPServerProject);
			if (fRPCService == NULL)
				err = ThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			fDataService = new VDataService( this, fHTTPServerProject);
			if (fDataService != NULL)
			{
				fDataService->SetDatabase( fDatabase);
			}
			else
			{
				err = ThrowError( VE_MEMORY_FULL);
			}
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			fContextCreationEnabled = true;
		}

		logger.LogMessagesFromErrorContext( fLoggerID, errContext.GetContext());

		if (err == VE_OK)
		{
			VString logMsg;
			logMsg.Printf( "Project opened (duration: %i ms)", usCounter.Stop()/1000);
			logger.Log( fLoggerID, eL4JML_Information, logMsg);
		}
	}
	
	if (err == VE_OK || fState.inMaintenance) {
		
		if ((fApplicationStorage = new VJSSessionStorageObject()) == NULL)
		
			err = ThrowError(XBOX::VE_MEMORY_FULL);
						
		else if ((fApplicationSettings = new VJSSessionStorageObject()) == NULL) {
			
			ReleaseRefCountable( &fApplicationStorage);
			
			err = ThrowError(XBOX::VE_MEMORY_FULL);	
			
		}
		
	}

	if (err == VE_OK || fState.inMaintenance)
	{
		// Fill the settings "storage" object

		// Project settings
		const VValueBag *bag = fSettings.RetainSettings( RIASettingID::project);
		if (bag != NULL)
			fApplicationSettings->SetKeyVValueBag( L"project", *bag);
		ReleaseRefCountable( &bag);


		// HTTP Server settings
		bag = fSettings.RetainSettings( RIASettingID::http);
		if (bag != NULL)
			fApplicationSettings->SetKeyVValueBag( L"http", *bag);
		ReleaseRefCountable( &bag);


		// JavaScript settings
		bag = fSettings.RetainSettings( RIASettingID::javaScript);
		if (bag != NULL)
			fApplicationSettings->SetKeyVValueBag( L"javaScript", *bag);
		ReleaseRefCountable( &bag);


		// Resources settings array
		const VBagArray *bagArray = fSettings.RetainMultipleSettings( RIASettingID::resources);
		if (bagArray != NULL)
			fApplicationSettings->SetKeyVBagArray( L"resources", *bagArray, false);
		ReleaseRefCountable( &bagArray);


		// Virtual Folders settings array
		bagArray = fSettings.RetainMultipleSettings (RIASettingID::virtualFolder);
		if (bagArray != NULL)
			fApplicationSettings->SetKeyVBagArray (L"virtualFolder", *bagArray, false);
		ReleaseRefCountable (&bagArray);

		// Services settings
		VValueBag servicesSettingsBag;
		bagArray = fSettings.RetainServicesSettings();
		if (bagArray != NULL)
		{
			VIndex servicesCount = bagArray->GetCount();
			for (VIndex serviceIter = 1 ; serviceIter <= servicesCount ; ++serviceIter)
			{
				const VValueBag *serviceBag = bagArray->GetNth( serviceIter);
				if (serviceBag != NULL)
				{
					if (RIASettingsKeys::Service::enabled.Get( serviceBag))
					{
						VValueBag *lBag = serviceBag->Clone();
						if (lBag != NULL)
						{
							VString modulePath, serviceName;
							if (!lBag->GetString( RIASettingsKeys::Service::modulePath, modulePath) && lBag->GetString( RIASettingsKeys::Service::name, serviceName))
							{
								if (!serviceName.IsEmpty())
								{
									// compatibility note: the module path, if not defined, is built from the service name
									modulePath = L"services/" + serviceName;
									lBag->SetString( RIASettingsKeys::Service::modulePath, modulePath);
								}
							}

							if (!modulePath.IsEmpty())
							{
								if (!lBag->GetString( RIASettingsKeys::Service::name, serviceName))
								{
									// resolve the service name from the module path
									VFilePath path( modulePath, FPS_POSIX);
									if (path.IsFile())
										path.GetFileName( serviceName, false);
									else if (path.IsFolder())
										path.GetFolderName( serviceName, false);

									if (!serviceName.IsEmpty())
										lBag->SetString( RIASettingsKeys::Service::name, serviceName);
								}

								if (!serviceName.IsEmpty())
								{
									if (servicesSettingsBag.GetElementsCount( VValueBag::StKey(serviceName)) == 0)
										servicesSettingsBag.AddElement( VValueBag::StKey(serviceName), lBag);
								}
							}
							ReleaseRefCountable( &lBag);
						}
					}
				}
			}
		}
		ReleaseRefCountable( &bagArray);

		// By default, if a database is opened, the "dataStore" service is enabled, even if none settings have been found
		if (!fSettings.HasServiceSettings( L"dataStore"))
		{
			bool autoStart = (fDatabase != NULL);

			// Try to convert the deprecated "dataService" settings into "dataStore" service settings 
			VValueBag *dataServiceBag = fSettings.RetainSettings( RIASettingID::dataService);
			if (dataServiceBag != NULL)
			{
				autoStart = RIASettingsKeys::DataService::enabled.Get( dataServiceBag);
				ReleaseRefCountable( &dataServiceBag);
			}

			VValueBag *serviceBag = new VValueBag();
			if (serviceBag != NULL)
			{
				serviceBag->SetString( RIASettingsKeys::Service::name, L"dataStore");
				serviceBag->SetString( RIASettingsKeys::Service::modulePath, L"services/dataStore");
				serviceBag->SetString( VValueBag::StKey( L"autoStart"), autoStart ? L"true" : L"false");
				servicesSettingsBag.AddElement( VValueBag::StKey( L"dataStore"), serviceBag);
				ReleaseRefCountable( &serviceBag);
			}
		}

		// By default, the "rpc" service is enabled, even if none settings have been found
		if (!fSettings.HasServiceSettings( L"rpc"))
		{
			bool autoStart = true;
			bool publishInClientGlobalNamespace = false;

			// Tr yto convert the deprecated "rpcService" settings into "rpc" service settings
			VValueBag *rpcServiceBag = fSettings.RetainSettings( RIASettingID::rpcService);
			if (rpcServiceBag != NULL)
			{
				autoStart = RIASettingsKeys::RPCService::enabled.Get( rpcServiceBag);
				publishInClientGlobalNamespace = RIASettingsKeys::RPCService::publishInClientGlobalNamespace.Get( rpcServiceBag);
				ReleaseRefCountable( &rpcServiceBag);
			}

			VValueBag *serviceBag = new VValueBag();
			if (serviceBag != NULL)
			{
				serviceBag->SetString( RIASettingsKeys::Service::name, L"rpc");
				serviceBag->SetString( RIASettingsKeys::Service::modulePath, L"services/rpc");
				serviceBag->SetString( VValueBag::StKey( L"autoStart"), autoStart ? L"true" : L"false");
				serviceBag->SetString( VValueBag::StKey( L"publishInClientGlobalNamespace"), publishInClientGlobalNamespace ? L"true" : L"false");
				servicesSettingsBag.AddElement( VValueBag::StKey( L"rpc"), serviceBag);
				ReleaseRefCountable( &serviceBag);
			}
		}

		// By default, the "webApp" service is enabled, even if none settings have been found
		if (!fSettings.HasServiceSettings( L"webApp"))
		{
			bool autoStart = true;

			// Try to convert the deprecated "webApp" settings into "webApp" service settings
			VValueBag *webAppServiceBag = fSettings.RetainSettings( RIASettingID::webApp);
			if (webAppServiceBag != NULL)
			{
				autoStart = RIASettingsKeys::WebApp::enabled.Get( webAppServiceBag);
				ReleaseRefCountable( &webAppServiceBag);
			}

			VValueBag *serviceBag = new VValueBag();
			if (serviceBag != NULL)
			{
				serviceBag->SetString( RIASettingsKeys::Service::name, L"webApp");
				serviceBag->SetString( RIASettingsKeys::Service::modulePath, L"services/webApp");
				serviceBag->SetString( VValueBag::StKey( L"autoStart"), autoStart ? L"true" : L"false");
				servicesSettingsBag.AddElement( VValueBag::StKey( L"webApp"), serviceBag);
				ReleaseRefCountable( &serviceBag);
			}
		}

		// By default, the "upload" service is enabled, even if none settings have been found
		if (!fSettings.HasServiceSettings( L"upload"))
		{
			VValueBag *serviceBag = new VValueBag();
			if (serviceBag != NULL)
			{
				serviceBag->SetString( RIASettingsKeys::Service::name, L"upload");
				serviceBag->SetString( RIASettingsKeys::Service::modulePath, L"services/upload");
				serviceBag->SetString( VValueBag::StKey( L"autoStart"), L"true");
				servicesSettingsBag.AddElement( VValueBag::StKey( L"upload"), serviceBag);
				ReleaseRefCountable( &serviceBag);
			}
		}
		
		fApplicationSettings->SetKeyVValueBag( L"services", servicesSettingsBag);
	}

	fState.opened = true;

	return err;
}


VError VRIAServerProject::_LoadFileSystemDefinitions()
{
	VError err = VE_OK;
	
	// link project namespace to solution one
	if (testAssert( fFileSystemNamespace == NULL))
		fFileSystemNamespace = new VFileSystemNamespace( GetSolution()->GetFileSystemNamespace());
	
	if (fFileSystemNamespace != NULL)
	{
		VFilePath projectPath;
		GetDesignProject()->GetProjectFolderPath( projectPath);

		VFile file( projectPath, CVSTR( "fileSystems.json"), FPS_POSIX);
		if (file.Exists())
			err = fFileSystemNamespace->LoadFromDefinitionFile( &file);
	}
	
	return err;
}


VError VRIAServerProject::_LoadSettingsFile()
{
	VError err = VE_OK;

	if (testAssert(fDesignProject != NULL))
	{
		VectorOfProjectItems itemsVector;

		fDesignProject->GetProjectItemsFromTag( kSettingTag, itemsVector);
		for (VectorOfProjectItemsIterator iter = itemsVector.begin() ; iter != itemsVector.end() && err == VE_OK ; ++iter)
		{
			if (*iter != NULL)
			{
				VFilePath path;
				(*iter)->GetFilePath( path);
				err = fSettings.AppendAndLoadSettingsFile( path);
			}
		}
	}
	return err;	
}


VRIAPermissions* VRIAServerProject::_LoadPermissionFile( VError& outError)
{
	VRIAPermissions *permissions = NULL;

	outError = VE_OK;

	if (testAssert(fDesignProject != NULL))
	{
		VProjectItem *item = fDesignProject->GetProjectItemFromTag( kPermissionsTag);
		if (item != NULL)
		{
			VFilePath path;
			item->GetFilePath( path);

			permissions = new VRIAPermissions( path);
			if (permissions == NULL)
				outError = ThrowError( VE_MEMORY_FULL);
			else
				outError = permissions->LoadPermissionFile();
		}
	}

	return permissions;	
}


XBOX::VError VRIAServerProject::_LoadBackupSettings()
{
	const VSolutionSettings& solutionSettings = fSolution->GetSettings();
	CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	VFilePath baseFolder,backupFolder,backupRegistryFolder;

	//Retrieve folder with backup role
	const VProjectItem* backupsFolderItem = fDesignProject->GetProjectItemFromTag(kBackupsTag);
	if (backupsFolderItem)
	{
		backupsFolderItem->GetFilePath(backupRegistryFolder);
	}
	else
	{
		//Legacy projects: "Backups" role might not be declared so create the default 
		//"Backups" folder at project level
		XBOX::VFolder* fld = RetainFolder();
		fld->GetPath(backupRegistryFolder);
		backupRegistryFolder.ToSubFolder(CVSTR("Backups"));//MAGICAL
		xbox::ReleaseRefCountable(&fld);
	}

	fBackupSettings = db4dMgr->CreateBackupSettings();

	const VValueBag *projBackupSettingsbag = fSettings.RetainSettings(RIASettingID::backup);
	const VValueBag *solBackupSettingsBag  = solutionSettings.RetainSettings( RIASettingID::backup);

	if (projBackupSettingsbag )
	{
		//init from project level and provide backups role folder as base
		//if absolute path specified at solution settings then all backups may be overwritten
		//otherwise backups are stored in the project's folder with "backup" role
		fBackupSettings->Initialize(*projBackupSettingsbag ,backupRegistryFolder);
	}
	else if (solBackupSettingsBag)
	{
		//no settings specified at project level so revert to solution level and apply same logic
		fBackupSettings->Initialize(*solBackupSettingsBag ,backupRegistryFolder);
	}
	else
	{
		//No settings defined neither at project or solution level. Define default settings:
		// backups are stored in the "Backups" folder in incrementally named subfolders
		fBackupSettings->SetDestination(backupRegistryFolder);
		fBackupSettings->SetUseUniqueNames(true);
	}
	
	//Finished setting elements that are non customisable
	fBackupSettings->SetBackupRegistryFolder(backupRegistryFolder);


	fBackupSettings->GetDestination(backupFolder);
	xbox_assert(backupFolder.IsFolder() && backupFolder.IsValid() && !backupFolder.IsEmpty());

	XBOX::ReleaseRefCountable(&solBackupSettingsBag  );
	XBOX::ReleaseRefCountable(&projBackupSettingsbag );
	return VE_OK;
}

CDB4DBase* VRIAServerProject::_OpenDatabase( VError& outError, bool inCreateEmptyDatabaseIfNeed)
{
	CDB4DBase *base = NULL;
	outError = VE_OK;

	if (testAssert(fDesignProject != NULL))
	{
		bool found = false;
		VFilePath structurePath;
		sLONG flags = DB4D_Open_WithSeparateIndexSegment | DB4D_Open_Convert_To_Higher_Version;

		VProjectItem *catalogItem = fDesignProject->GetProjectItemFromTag( kCatalogTag);
		if (catalogItem != NULL)
		{
			if (!catalogItem->ContentExists())
			{
				// sc 15/10/2012 WAK0078042, if the tagged item doesnt exist, returns an error
				VString modelFileName;
				catalogItem->GetName( modelFileName);
				outError = ThrowError( VE_RIA_MODEL_FILE_NOT_FOUND, &modelFileName, NULL);
			}
			else
			{
				catalogItem->GetFilePath( structurePath);
				flags |= DB4D_Open_As_XML_Definition;
				flags |= DB4D_Open_No_Respart;
				found = true;
			}
		}

		if (found)
		{
			CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
			if (db4dMgr != NULL)
			{
				VFilePath dataPath;
				StUseLogger logger;
				VMicrosecondsCounter usCounter;
				
				usCounter.Start();	
				logger.Log( fLoggerID, eL4JML_Information, L"Opening the database");

				VProjectItem *newDataFolderItem = fDesignProject->GetProjectItemFromTag( kDataFolderTag);
				if (newDataFolderItem != NULL)
				{
					newDataFolderItem->GetFilePath( dataPath);
					dataPath.SetFileName( L"data.waData");
				}
				else
				{
					// new "DataFolder" does not exist - backward compatibility
					VProjectItem *oldDataItem = fDesignProject->GetProjectItemFromTag( kDataTag);

					// the data file with active role found
					if (oldDataItem != NULL)
					{
						oldDataItem->GetFilePath( dataPath);
					}
					else
					{
						// sc 29/11/2012, default data file is ./DataFolder/data.waData
						fDesignProject->GetProjectFolderPath( dataPath);

						VString defaultFolder;
						if (VProjectItemTagManager::Get()->GetPreferedDefaultFolder( kDataFolderTag, defaultFolder))
							BuildPathFromRelativePath( dataPath, defaultFolder, FPS_POSIX);
						else
							dataPath.ToSubFolder( L"DataFolder");

						dataPath.SetFileName( L"data.waData");
					}
				}
	
				//Load backup settings we may need them to handle DB opening errors
				_LoadBackupSettings();
				xbox_assert(fBackupSettings != NULL);

				// Open the structure
				VFile structureFile(structurePath);
				CUAGDirectory *uagDirectory = fSolution->RetainUAGDirectory();

				VProjectItem* permissionsItem = NULL;
				VFilePath permissionsPath;
				VFile* permissionsFile = NULL;

				permissionsItem = fDesignProject->GetProjectItemFromTag( kPermissionsTag );	// sc 14/09/2012 WAK0076884, pass the permission file to DB4D

				if ( permissionsItem )
				{
					permissionsItem->GetFilePath( permissionsPath );
					permissionsFile = new VFile( permissionsPath );
				}

				//Open structure
				base = db4dMgr->OpenBase( structureFile, flags, &outError, FA_READ_WRITE, nil, uagDirectory, permissionsFile);

				ReleaseRefCountable( &permissionsFile);

				if (base != NULL && outError == VE_OK)
				{
					VFile dataFile( dataPath);
					if (dataFile.Exists())
					{
						//Open data file, without opening journal so we can detect and fix some problems
						XBOX::StErrorContextInstaller errContext( VE_DB4D_CANNOTOPENDATAFILE, VE_DB4D_CANNOTREADDATASEG, XBOX::VE_OK);
						flags = DB4D_Open_WithSeparateIndexSegment | DB4D_Open_WITHOUT_JournalFile;
						base->OpenData( dataFile, flags, NULL, &outError);
						if ( outError != VE_OK || errContext.GetLastError() != VE_OK)
						{
							logger.Log( fLoggerID, eL4JML_Warning, CVSTR("Error opening data file"));

							outError = errContext.GetLastError();

							if (errContext.GetContext()->Find( VE_DB4D_FLUSH_DID_NOT_COMPLETE) 
								|| errContext.GetContext()->Find( VE_DB4D_FLUSH_COMPLETE_ON_DATA))
							{
								outError = VE_DB4D_FLUSH_DID_NOT_COMPLETE;
							}
							else if (errContext.GetContext()->Find( VE_DB4D_DATAFILE_DOES_NOT_MATCH_STRUCT))
							{
								outError = VE_DB4D_DATAFILE_DOES_NOT_MATCH_STRUCT;
							}
							//XXX: don't mask error code here data file might be corrupted
							//beyond usage and may require manual intervention
							outError = _HandleDataBaseDataFileOpeningError(base,dataPath,outError);
						}
					}
					else
					{
						VFolder parentDataFolder( dataPath.ToParent());
						if (!parentDataFolder.Exists())
							outError = parentDataFolder.CreateRecursive( true);
						
						if (outError == VE_OK)
							base->CreateData( dataFile, flags, NULL, NULL, &outError);
					}
					if(outError == VE_OK)
					{
						outError = _OpenJournal(base,dataPath);
					}

					
					if (outError == VE_OK && fJSContextPool != NULL)
					{
						// Retreive the Entity Model script
						VFilePath emScriptPath( structurePath);
						emScriptPath.SetExtension( "js" );

						VFile file( emScriptPath);
						if (file.Exists())
						{
							fJSContextPool->AppendRequiredScript( emScriptPath);
						}
						else
						{
							VString altScriptName;
							structurePath.GetFileName( altScriptName, false);
							altScriptName.AppendUniChar( '.');
							altScriptName.AppendString( RIAFileKind::kCatalogFileExtension);
							altScriptName.AppendString( L".js");

							VFilePath altPath( structurePath );
							altPath.SetFileName( altScriptName, true );

							VFile altFile( altPath );
							if ( altFile.Exists())
							{
								fJSContextPool->AppendRequiredScript( altPath);
							}
						}
					}

					if (outError == VE_OK)
					{
						xbox_assert(fBackupSettings != NULL);
						base->SetRetainedBackupSettings(fBackupSettings);

					}
				}
				ReleaseRefCountable( &uagDirectory);

				if (outError == VE_OK)
				{
					VString logMsg;
					logMsg.Printf( "Database opened (duration: %i ms)", usCounter.Stop()/1000);
					logger.Log( fLoggerID, eL4JML_Information, logMsg);
				}
				else
				{
					if (base != NULL)
					{
						base->CloseAndRelease();
						base = NULL;
					}

					VString logMsg;
					logMsg.Printf( "Failed to open database (duration: %i ms)", usCounter.Stop()/1000);
					logger.Log( fLoggerID, eL4JML_Fatal, logMsg);
					outError = ThrowError( VE_RIA_CANNOT_OPEN_DATABASE);
				}
			}
			else
			{
				outError = ThrowError( VE_RIA_DB4D_COMPONENT_NOT_FOUND);
			}
		}
	}
	return base;
}

bool VRIAServerProject::_ComputeJournalPathFromSettings(XBOX::VFilePath& outJournalPath,bool& outContainedInDataFolder)
{
	XBOX::VError error = VE_OK;
	bool valid = false;
	VString name;
	outContainedInDataFolder = false;
	outJournalPath.Clear();

	if (fDesignProject != NULL)
	{
		VProjectItem *item = fDesignProject->GetProjectItemFromTag(kDataFolderTag);
		if (item != NULL)
		{
			VFilePath folderPath;
			item->GetFilePath( folderPath);
			folderPath = folderPath.ToFolder();
			valid = _ComputeJournalPath(folderPath,outJournalPath,outContainedInDataFolder);
		}
	}	
	return valid;
}

bool VRIAServerProject::_ComputeJournalPath(const XBOX::VFilePath& inBaseFolder,XBOX::VFilePath& outJournalPath,bool& outRelativeToBaseFolder)
{
	VString name;
	bool hasJournalSettings = false;
	outRelativeToBaseFolder = false;
	outJournalPath.Clear();
	
	hasJournalSettings = fSettings.HasDatabaseJournalSettings();
	if (hasJournalSettings)
	{
		VFile* journal = NULL;
		fSettings.GetDatabaseJournalPath(name);
		if(name.GetLength() == 0)
		{
			name = CVSTR("./journal.waJournal");
			outJournalPath.FromRelativePath(inBaseFolder,name,FPS_POSIX);
			outRelativeToBaseFolder = true;
		}
		else
		{
			outJournalPath.FromRelativePath(inBaseFolder,name,FPS_POSIX);

			//Path should be a folder, if not then make it a folder e.g. if name is './var/foo' then transform into './var/foo/'
			if (outJournalPath.IsFile())
			{
				// /<SomeRoot>/.../var/foo -> /<SomeRoot>/.../var/foo/
				outJournalPath.GetFileName(name,true);
				outJournalPath.ToParent();
				outJournalPath.ToSubFolder(name);
			}
			outJournalPath.ToSubFile(CVSTR("journal.waJournal"));
			outRelativeToBaseFolder = outJournalPath.GetRelativePath(inBaseFolder,name);
		}
		xbox_assert(outJournalPath.IsValid() && outJournalPath.IsFile());
	}
	return hasJournalSettings;
}



bool VRIAServerProject::_BackupDatabaseOnOpening(CDB4DBase* inBase,const XBOX::VFilePath& inJournalToArchive)
{
	bool ok = true;
	StUseLogger logger;

	IBackupTool *backupTool = NULL;
	CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	if(db4dMgr != NULL)
	{
		backupTool = db4dMgr->CreateBackupTool();
	}
		
	if (backupTool == NULL)
	{
		logger.Log( fLoggerID, eL4JML_Error, CVSTR("Cannot create backup tool"));
		vThrowError(VE_MEMORY_FULL);
		ok = false;
	}
	else
	{
		//Obtain context
		CDB4DBaseContext* dbContext = NULL;

		if (fBackupSettings)
		{
			logger.Log( fLoggerID, eL4JML_Information, CVSTR("Starting backup using application settings"));
			ok = backupTool->BackupDatabaseAndDontResetJournal(inBase,inJournalToArchive,*fBackupSettings,NULL,NULL);
		}
		else
		{
			const IBackupSettings* settings = fSolution->RetainBackupSettings();
			logger.Log( fLoggerID, eL4JML_Information, CVSTR("Starting backup using solution settings"));
			ok = backupTool->BackupDatabaseAndDontResetJournal(inBase,inJournalToArchive,*settings,NULL,NULL);
			XBOX::ReleaseRefCountable(&settings);
		}
	}

	if(ok == true)
	{
		logger.Log( fLoggerID, eL4JML_Information, CVSTR("Backup completed successfully"));
	}
	else
	{
		logger.Log( fLoggerID, eL4JML_Error, CVSTR("Backup failed"));
	}
	delete backupTool;
	backupTool = NULL;
	return ok;
}



XBOX::VError VRIAServerProject::_IntegrateJournalFile(CDB4DBase* inBase,const XBOX::VFilePath& inDataFilePath,const XBOX::VFilePath& inJournalPath,bool force)
{
	StUseLogger logger;
	CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	XBOX::VError error = VE_OK;

	if (fSettings.GetRecoverFromJournalOnIncompleteDatabase() || force)
	{
		CDB4DJournalParser* journalParser = NULL;
		
		journalParser = db4dMgr->NewJournalParser();
	
		if ( journalParser == NULL )
		{
			error = VE_MEMORY_FULL;
		}
		else
		{
			VString message;
			VString strJournalPath,strDataFilePath;
			uLONG8 totalOperationCount = 0;
			VProgressIndicator *progressIndicator = NULL;
			XBOX::VFile* journalFile = NULL;
			StErrorContextInstaller errorContext(false);

			inJournalPath.GetPosixPath(strJournalPath);
			inDataFilePath.GetPosixPath(strDataFilePath);
			
			message.AppendString(CVSTR("Integrating journal '"));
			message.AppendString(strJournalPath);
			message.AppendString(CVSTR("' in data file '"));
			message.AppendString(strDataFilePath);
			message.AppendString(CVSTR("'"));
			logger.Log( fLoggerID, eL4JML_Information, message);

			journalFile = new VFile(inJournalPath);
			progressIndicator = new VProgressIndicator();
			error = journalParser->Init( journalFile, totalOperationCount, progressIndicator );
			if ( error == XBOX::VE_OK )
			{
				XBOX::VUUID dataLink;
				inBase->GetJournalUUIDLink(dataLink);
				if ( journalParser->IsValid( dataLink ) )
				{
					
					error = inBase->IntegrateJournal( journalParser, 0, 0, NULL, progressIndicator);
					if ( error == VE_OK )
					{
						logger.Log( fLoggerID, eL4JML_Information, CVSTR("Successfully integrated journal"));
					}
					else
					{
						logger.LogMessagesFromErrorContext(fLoggerID,errorContext.GetContext());
						logger.Log( fLoggerID, eL4JML_Error, CVSTR("Failed to integrate journal"));
					}
				}
				else
				{
					logger.Log( fLoggerID, eL4JML_Error, CVSTR("Journal is not valid for integration in this data file"));
					error = VE_DB4D_LOGFILE_DOES_NOT_MATCH_DATABASE;
				}
				XBOX::ReleaseRefCountable( &journalParser);
			}
			else
			{
				logger.LogMessagesFromErrorContext(fLoggerID,errorContext.GetContext());
				logger.Log( fLoggerID, eL4JML_Error, CVSTR("Failed to integrate journal"));
			}
			XBOX::ReleaseRefCountable( &progressIndicator);
			XBOX::ReleaseRefCountable( &journalFile);
		}
		XBOX::ReleaseRefCountable( &journalParser);
	}
	else
	{
		logger.Log( fLoggerID, eL4JML_Warning, CVSTR("Journal integration disabled by settings"));
	}
	return error;
}


XBOX::VError VRIAServerProject::_OpenJournal(CDB4DBase* inBase,const XBOX::VFilePath& inDataFilePath)
{
	CDB4DManager *db4dMgr = NULL;
	XBOX::VError error = VE_OK;
	XBOX::VUUID journalUUID;
	XBOX::VFilePath lastJournalPath, nextJournalPath,*journalToOpen = NULL;
	StUseLogger logger;
	VFile* journalFile = NULL;
	StErrorContextInstaller errorContext(false);
	
	//Some old projects throw errors when a extra props file is not found
	//we hanlde that case properly but do not want the errors to be propagated
	db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	//Fix method below so that it uses data folder to complete relative paths
	//inBase->GetJournalInfos(inDataFilePath,lastJournalPath,journalUUID);
	db4dMgr->GetJournalInfos(inDataFilePath,lastJournalPath,journalUUID);
	if (errorContext.GetLastError() != VE_OK)
	{
		lastJournalPath.Clear();
		journalUUID.Clear();
	}
	errorContext.Flush();

	if (!fSettings.HasDatabaseJournalSettings() || !fSettings.GetDatabaseJournalEnabled())
	{
		//Either journaling settings are available (legacy project, so don't force journal usage)
		//or it is precisely disabled
		if (!lastJournalPath.IsEmpty() && lastJournalPath.IsFile())
		{
			//But one is defined at database level , log the fact and clear clear it out, DB will run UNJOURNALED 
			logger.Log( fLoggerID, eL4JML_Warning, CVSTR("Settings application require disabling of journal.") );
			inBase->SetJournalFile(NULL,NULL,NULL,false);
		}
		journalToOpen = NULL;
		error = VE_OK;
	}
	else
	{
		bool unused = false;
		_ComputeJournalPathFromSettings(nextJournalPath,unused);
		if testAssert(nextJournalPath.IsValid() && nextJournalPath.IsFile() && !nextJournalPath.IsEmpty())
		{
			journalToOpen = &nextJournalPath;
			if (lastJournalPath.IsEmpty())
			{
				//no journal used previously, so we will create a new one
				//but before that we must backup the database
				StErrorContextInstaller errorContext;
				CDB4DManager *db4dMgr = NULL;
				VFilePath wasRenamed;
				
				logger.Log( fLoggerID, eL4JML_Information, CVSTR("New journal to be created") );
				logger.Log( fLoggerID, eL4JML_Information, CVSTR("Backing up data before journal installation") );
				
				error = VE_MEMORY_FULL;
				db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
				if (db4dMgr)
				{
					IBackupTool* backupTool = NULL;

					backupTool = db4dMgr->CreateBackupTool();
					if (backupTool != NULL)
					{
						error = VE_OK;
						const IBackupSettings* settings = XBOX::RetainRefCountable(fBackupSettings);
						if (settings == NULL)
						{
							settings = fSolution->RetainBackupSettings();
						}
						if(settings != NULL)
						{
							bool ok =  backupTool->BackupDatabase(inBase,NULL,*settings,NULL,NULL);
							error = errorContext.GetLastError();
						}
						else
						{
							logger.Log( fLoggerID, eL4JML_Error, CVSTR("No backup settings found"));
							error = VE_MEMORY_FULL;
						}
					}
					delete backupTool;backupTool = NULL;
				}
				
				if (error == VE_OK)
				{
					//Backup went fine so create the journal and activate it
					logger.Log( fLoggerID, eL4JML_Information, CVSTR("Successfully backed up data. Now creating journal.") );
					journalUUID.Regenerate();
					journalFile = new VFile(*journalToOpen);
					{
						VFolder* parent = journalFile->RetainParentFolder();
						if(parent && !parent->Exists())
						{
							error = parent->CreateRecursive();
						}
						XBOX::ReleaseRefCountable(&parent);
					}
					if(error == VE_OK)
					{
						error = inBase->CreateJournal(journalFile,&journalUUID,true);
					}
					if (error != VE_OK)
					{
						logger.Log( fLoggerID, eL4JML_Error, CVSTR("Failed to create new journal.") );
					}
				}
				else
				{
					logger.LogMessagesFromErrorContext( fLoggerID, errorContext.GetContext() );
					logger.Log( fLoggerID, eL4JML_Error, CVSTR("Backup failed") );
				}
			}
			else
			{
				//Journal was already active on last launch so simply open it
				journalFile = new VFile(*journalToOpen);
				bool giveUp = false;
				do
				{
					error  = inBase->OpenJournal(journalFile,journalUUID,true);
					switch (error)
					{
						case VE_OK:
							logger.Log( fLoggerID, eL4JML_Information, CVSTR("Successfully opened journal"));
							giveUp = true;
						break;

						case VE_DB4D_LOGFILE_NOT_FOUND:
						{
							//TODO: add setting to automatically re-create journal file and carry one with journal opening
							VString temp;
							journalFile->GetPath().GetPosixPath(temp);
							VString message = CVSTR("Current journal '");
							message += temp;
							message += CVSTR("' not found");
							if (!lastJournalPath.IsEmpty())
							{
								message += CVSTR(" (Previous known journal: '");
								lastJournalPath.GetPosixPath(temp);
								message += temp;
								message += CVSTR("')");
							}
							logger.Log( fLoggerID, eL4JML_Error, message );
							giveUp = true;
						}
						break;


						case VE_DB4D_LOGFILE_LAST_OPERATION_DOES_NOT_MATCH:
							if (fSettings.GetRecoverFromJournalOnIncompleteDatabase())
							{
								logger.Log( fLoggerID, eL4JML_Information, CVSTR("Integrating current journal") );
								error = _IntegrateJournalFile(inBase,inDataFilePath,*journalToOpen,false);
								if(error == VE_OK)
								{						
									//Integration went fine, loop once more to re-open the integrated journal file and have journaling turned on
									logger.Log( fLoggerID, eL4JML_Information, CVSTR("Successfully integrated current journal") );
									giveUp = false;
									continue;
								}
								else if (error !=VE_DB4D_LOGFILE_IS_INVALID && error != VE_DB4D_LOGFILE_DOES_NOT_MATCH_DATABASE)
								{
									logger.Log( fLoggerID, eL4JML_Fatal, CVSTR("Failed to integrate journal") );
									giveUp = true;
									break;
								}
							}
							else
							{
								logger.Log( fLoggerID, eL4JML_Warning, CVSTR("Automatic journal integration forbidden by settings") );
								giveUp = true;
							}
							break;
					
						case VE_DB4D_LOGFILE_IS_INVALID:
						case VE_DB4D_LOGFILE_DOES_NOT_MATCH_DATABASE:
							{
								logger.Log( fLoggerID, eL4JML_Error, CVSTR("Journal cannot be used with database.") );
								giveUp = true;
							}
						break;

					default:
						logger.Log( fLoggerID, eL4JML_Error, CVSTR("Unexpected error: disabling journaling") );
						giveUp = true;
						break;
					}
				}while (!giveUp);
			}
		}
		else
		{
			error = VE_FILE_BAD_NAME;
			VString message;
			VString temp;
			nextJournalPath.GetPosixPath(temp);
			message.FromCString("Cannot open journal: invalid name '");
			message.AppendString(temp);
			message.AppendString(CVSTR("'"));
			logger.Log( fLoggerID, eL4JML_Error, message);
		}
	}
	XBOX::ReleaseRefCountable(&journalFile);
	return error;
}

XBOX::VError VRIAServerProject::_SynchronizeJournalInfos(const XBOX::VFilePath& inDamagedDataFolderPath,const XBOX::VFilePath&  inRestoredDataFolderPath)
{
	StUseLogger logger;
	VError result = VE_OK;

	//Copy the waExtra from the damaged folder to the restored folder

	VString name(CVSTR("data.waExtra"));
	VFilePath extraPropsPath;

	//Build extra props file path
	extraPropsPath= inDamagedDataFolderPath;
	extraPropsPath.SetFileName(name,true);
	VFile sourceExtraPropsFile(extraPropsPath);
	
	//After restoration, ensure the correct journal is actually used, i.e. the restored
	//folder must be used in cunjunction with the damaged folder's journal which is why we copy any
	//existing extra props file from the damaged data folder to the restored data folder 
	if(sourceExtraPropsFile.Exists())
	{
		XBOX::VFilePath dest(inRestoredDataFolderPath);
		dest.ToFolder();
		result = sourceExtraPropsFile.CopyTo(dest,NULL,FCP_Overwrite);
	}
	else
	{
		//No extra props (e.g. no journal was enabled) in the damaged data folder
		//so remove the extra props from the restored folder
		extraPropsPath = inRestoredDataFolderPath;
		extraPropsPath.ToSubFile(name);

		VFile destExtraPropsFile(extraPropsPath);
		if (destExtraPropsFile.Exists())
		{
			result = destExtraPropsFile.Delete();
		}
	}
	
	if (result == VE_OK )
	{
		if (fSettings.HasDatabaseJournalSettings())
		{
			/*
			If the journal is stored within the data folder, then the correct journal is stored
			in the damaged data folder and we must move it to that same location relative to the restored data folder.
			This is mandatory if we want auto log integration to work 
			*/
			XBOX::VFilePath journalPathFromSettings;
			bool relativeToDataFolder = false,journalPathIsRelevant = false;
			journalPathIsRelevant = _ComputeJournalPathFromSettings(journalPathFromSettings,relativeToDataFolder);

			if (fSettings.GetDatabaseJournalEnabled())
			{
				if(testAssert(journalPathIsRelevant) && relativeToDataFolder)
				{
					//That journal is stored relative to the data folder.
					//For now journalPathFromSettings designates the location of the journal inside the restored data folder
					XBOX::VFilePath pathOfCorrectJournal;
					bool relative = false;
			
					//We need co compute that same location but related to the damaged data folder, this will
					//give Instead, we compute the path of the correct journal using teh same rule, only relative to the damaged data folder path.
					journalPathIsRelevant = _ComputeJournalPath(inDamagedDataFolderPath,pathOfCorrectJournal,relative);
					xbox_assert(journalPathIsRelevant && pathOfCorrectJournal.IsValid() && pathOfCorrectJournal.IsFile());
					
					//And we copy it inside the restored data folder at the expected location.
					//That way eventual journal integration will operate on the correct journal
					VFile journalFile(pathOfCorrectJournal);
					VString message(CVSTR("Copying current journal '")),temp;
					pathOfCorrectJournal.GetPosixPath(temp);
					message.AppendString(temp);
					message.AppendString(CVSTR("' to restored data folder."));

					logger.Log( fLoggerID, eL4JML_Information, message );
					
					result = journalFile.CopyTo(journalPathFromSettings,NULL,FCP_Overwrite);
					if(result !=VE_OK)
					{
						logger.Log( fLoggerID, eL4JML_Error, CVSTR("Failed to copy current journal to restored data folder") );
					}
				}
			}
		}
	}
	return result;
}
XBOX::VError VRIAServerProject::_RestoreDataFolderFromLastBackup(const XBOX::VFilePath& inDataFilePath,XBOX::VFilePath& outReplacedDataFolderPath)
{
	VError error = VE_OK;
	IBackupTool* backupTool = NULL;
	CDB4DManager *db4dMgr = NULL;
	StUseLogger logger;

	error = VE_MEMORY_FULL;
	db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	if (db4dMgr)
	{
		backupTool = db4dMgr->CreateBackupTool();
		if (backupTool != NULL)
		{
			error = VE_OK;
		}
		else
		{
			logger.Log( fLoggerID, eL4JML_Error, CVSTR("Failed to create backup tool"));
		}
	}
	
	if(error == VE_OK)
	{
		VFilePath lastBackupManifestPath;
		VUUID	  unusedUUID;
		error = VE_FOLDER_NOT_FOUND;
		
		//Retrieve last backup manifest using either project or solution settings
		const IBackupSettings* backupSettings = XBOX::RetainRefCountable(fBackupSettings);
		if (backupSettings == NULL)
		{
			backupSettings = fSolution->RetainBackupSettings();
		}
		error = backupTool->GetLastBackupPath(*backupSettings,lastBackupManifestPath);
		XBOX::ReleaseRefCountable(&backupSettings);

		if(error != VE_OK)
		{
			logger.Log( fLoggerID, eL4JML_Error, CVSTR("Failed to retrieve last backup manifest"));
		}
		else
		{
			//Use said manifest to extract the data folder
			XBOX::VFilePath dataFolderParentPath;
			inDataFilePath.GetParent(dataFolderParentPath);
			dataFolderParentPath.ToParent();

			logger.Log( fLoggerID, eL4JML_Information, CVSTR("Restoring data folder from last backup"));
			{
				StErrorContextInstaller errContext;
				bool ok = backupTool->RestoreDataFolder(lastBackupManifestPath,dataFolderParentPath,outReplacedDataFolderPath,NULL);
				error = errContext.GetLastError();

				if (error != VE_OK)
				{
					logger.LogMessagesFromErrorContext(fLoggerID, errContext.GetContext());
					logger.Log( fLoggerID, eL4JML_Error, CVSTR("Failed to restoring data folder from last backup"));
				}
				else
				{
					//Succeeded
					logger.Log( fLoggerID, eL4JML_Information, CVSTR("Successfully restored data folder"));
					if (!outReplacedDataFolderPath.IsEmpty())
					{
						VString msg;
						outReplacedDataFolderPath.GetPosixPath(msg);
						msg.Insert(CVSTR("Damaged data folder copied to: '"),1);
						msg.AppendChar('\'');
						logger.Log( fLoggerID, eL4JML_Information, msg);
					}
				}
			}
		}
	}
	delete backupTool;
	backupTool = NULL;
	return error;
}

XBOX::VError VRIAServerProject::_HandleDataBaseDataFileOpeningError(CDB4DBase* inBase,const XBOX::VFilePath& inDataFilePath,XBOX::VError inErrorToHandle)
{
	VError result = VE_OK;
	VFilePath journalPath;
	VString	 journalPathStr;
	VUUID	  journalDataLink;
	StUseLogger logger;
	VFilePath newJournalPath;
	CDB4DManager *db4dMgr = NULL;

	//The base is potentially damaged so we revert to our stand-aloen APIs
	//to retrieve the journal info

	db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
	db4dMgr->GetJournalInfos(inDataFilePath,journalPath,journalDataLink);

	journalPath.GetPath(journalPathStr);

	switch (inErrorToHandle)
	{
		case VE_DB4D_DATAFILE_DOES_NOT_MATCH_STRUCT:
			logger.Log( fLoggerID, eL4JML_Fatal, CVSTR("Database data/model mismatch: cannot open this data file with that model") );
			result = VE_DB4D_DATAFILE_DOES_NOT_MATCH_STRUCT;
		break;

		case VE_DB4D_FLUSH_DID_NOT_COMPLETE:
			logger.Log( fLoggerID, eL4JML_Error, CVSTR("Database data file is corrupted") );

			if (!fSettings.GetRecoverFromLastBackupOnCorruptedDatabase())
			{
				logger.Log( fLoggerID, eL4JML_Warning, CVSTR("Automatic recovery from last backup forbidden by settings"));
				result = VE_DB4D_FLUSH_DID_NOT_COMPLETE;
			}
			else
			{
				StErrorContextInstaller errContext;
				XBOX::VFilePath replacedDataFolderPath;
				logger.Log( fLoggerID, eL4JML_Information, CVSTR("Recovering damaged data file from last backup"));
				result = _RestoreDataFolderFromLastBackup(inDataFilePath,replacedDataFolderPath);
				if(result !=VE_OK)
				{
					logger.LogMessagesFromErrorContext( fLoggerID, errContext.GetContext());
					logger.Log( fLoggerID, eL4JML_Fatal, CVSTR("Failed to recover from last backup") );
				}
				else
				{
					XBOX::VFilePath restoredDataFolerPath;
					inDataFilePath.GetParent(restoredDataFolerPath);
					result = _SynchronizeJournalInfos(replacedDataFolderPath,restoredDataFolerPath);
					if(result == VE_OK)
					{
						//Now re-open restored data file
						VFile dataFile( inDataFilePath);
						logger.Log( fLoggerID, eL4JML_Information, CVSTR("Successfully recovered data file") );
						sLONG flags	= DB4D_Open_WithSeparateIndexSegment | DB4D_Open_WITHOUT_JournalFile;
						errContext.Flush();
						inBase->OpenData( dataFile, flags, NULL, &result);
						if ( result != VE_OK )
						{
							logger.LogMessagesFromErrorContext( fLoggerID, errContext.GetContext());
							logger.Log( fLoggerID, eL4JML_Fatal, CVSTR("Failed to open restored data file"));
						}
						else
						{
							logger.Log( fLoggerID, eL4JML_Information, CVSTR("Successully opened recovered data file"));
						}
					}
				}
			}
		break;

		default:
			result = inErrorToHandle;
			logger.Log( fLoggerID, eL4JML_Fatal, CVSTR("Cannot recover from previous errors. Consider restoring data from backup.") );
		break;
	}
	return result;
}

/*
CDB4DBase* VRIAServerProject::_OpenDatabase( VError& outError, bool inCreateEmptyDatabaseIfNeed)
{
	CDB4DBase *base = NULL;
	outError = VE_OK;

	if (testAssert(fDesignProject != NULL))
	{
		bool found = false;
		VFilePath structurePath;
		sLONG flags = DB4D_Open_WithSeparateIndexSegment | DB4D_Open_Convert_To_Higher_Version;

		VProjectItem *catalogItem = fDesignProject->GetProjectItemFromTag( kCatalogTag);
		if (catalogItem != NULL)
		{
			catalogItem->GetFilePath( structurePath);
			flags |= DB4D_Open_As_XML_Definition;
			flags |= DB4D_Open_No_Respart;
			found = true;
		}

		if (found)
		{
			CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
			if (db4dMgr != NULL)
			{
				VFilePath dataPath;
				StUseLogger logger;
				VMicrosecondsCounter usCounter;
				
				usCounter.Start();	
				logger.Log( fLoggerID, eL4JML_Information, L"Opening the database");

				bool buildWak3DataPath = false;
				VProjectItem *newDataFolderItem = fDesignProject->GetProjectItemFromTag( kDataFolderTag);
				if (newDataFolderItem != NULL)
				{
					newDataFolderItem->GetFilePath( dataPath);
					dataPath.SetFileName( L"data.waData");
				}
				else // new "DataFolder" does not exist - backward compatibility
				{
					VProjectItem *oldDataItem = fDesignProject->GetProjectItemFromTag( kDataTag);

					// the data file with active role found
					if (oldDataItem != NULL)
					{
						oldDataItem->GetFilePath( dataPath);
					}
					else // the data file with active role NOT found, check if folder "data" exist
					{
						VString oldDefaultDataFolder;
						VFilePath oldDataFolderPath;
						VProjectItemTagManager::Get()->GetPreferedDefaultFolder( kDataTag, oldDefaultDataFolder);
						BuildPathFromRelativePath( oldDataFolderPath, oldDefaultDataFolder, FPS_POSIX);

						VFolder oldDataFolder( oldDataFolderPath);
						if ( oldDataFolder.Exists())
						{
							//old folder "data" exist, now check if structureName.waData exist
							VString name;
							structurePath.GetFileName( name, false);
							oldDataFolderPath.SetFileName( name, false);
							oldDataFolderPath.SetExtension( RIAFileKind::kDataFileExtension);
							VFile oldDataFile(oldDataFolderPath);
							
							if ( oldDataFile.Exists())
							{
								dataPath = oldDataFolderPath;
							}
							else
							{
								buildWak3DataPath = true;
							}
						}
						else
						{
							buildWak3DataPath = true;
						}
					}
				}

				// build wak3 compatible data path
				if (buildWak3DataPath)
				{
					VString defaultFolder;
					VProjectItemTagManager::Get()->GetPreferedDefaultFolder( kDataFolderTag, defaultFolder);
					BuildPathFromRelativePath( dataPath, defaultFolder, FPS_POSIX);

					VFolder dataFolder( dataPath);
					dataPath.SetFileName( L"data.waData");
				}

				// Open the structure
				VFile structureFile(structurePath);
				CUAGDirectory *uagDirectory = fSolution->RetainUAGDirectory();

				VProjectItem* permissionsItem = NULL;
				VFilePath permissionsPath;
				VFile* permissionsFile = NULL;

				permissionsItem = fDesignProject->GetProjectItemFromTag( kPermissionsTag );

				if ( permissionsItem )
				{
					permissionsItem->GetFilePath( permissionsPath );
					permissionsFile = new VFile( permissionsPath );
				}

				base = db4dMgr->OpenBase( structureFile, flags, &outError, FA_READ_WRITE, nil, uagDirectory, permissionsFile );

				ReleaseRefCountable( &permissionsFile );

				if (base != NULL && outError == VE_OK)
				{
					VFile dataFile( dataPath);
					if (dataFile.Exists())
					{
						base->OpenData( dataFile, flags, NULL, &outError);
					}
					else
					{
						VFolder parentDataFolder( dataPath.ToParent());
						if (!parentDataFolder.Exists())
							outError = parentDataFolder.CreateRecursive( true);
						
						if (outError == VE_OK)
							base->CreateData( dataFile, flags, NULL, NULL, &outError);
					}

					if (outError == VE_OK && fJSContextPool != NULL)
					{
						// Retreive the Entity Model script, which is the "catalogName.js" file near the catalog
						VString emScriptName;
						structurePath.GetFileName( emScriptName, false);
						emScriptName.AppendString( L".js");

						VFilePath emScriptPath( structurePath);
						emScriptPath.SetFileName( emScriptName, true);

						VFile file( emScriptPath);
						if (file.Exists())
						{
							fJSContextPool->AppendRequiredScript( emScriptPath);
						}
						else
						{
							// if the file is not found, try to find the file using the old way, by searching "ModelName.waModel.js" file
							VString emAlternateScriptName;
							structurePath.GetFileName( emScriptName, true);
							emAlternateScriptName.AppendString( L".js");

							VFilePath emAlternateScriptPath( structurePath);
							emAlternateScriptPath.SetFileName( emAlternateScriptName, true);

							VFile alternateFile( emAlternateScriptPath);
							if (alternateFile.Exists())
							{
								fJSContextPool->AppendRequiredScript( emAlternateScriptPath);
							}
						}
					}
				}

				ReleaseRefCountable( &uagDirectory);

				if (outError == VE_OK)
				{
					VString logMsg;
					logMsg.Printf( "Database opened (duration: %i ms)", usCounter.Stop()/1000);
					logger.Log( fLoggerID, eL4JML_Information, logMsg);
				}
			}
			else
			{
				outError = ThrowError( VE_RIA_DB4D_COMPONENT_NOT_FOUND);
			}
		}
	}
	return base;
}
*/

void VRIAServerProject::_CloseAndReleaseDatabase( CDB4DBase *inBase)
{
	if (inBase != NULL)
	{
		StUseLogger logger;
		VMicrosecondsCounter usCounter;
				
		usCounter.Start();
		logger.Log( fLoggerID, eL4JML_Information, L"Closing the database");

		inBase->SetRetainedBackupSettings(NULL);
		XBOX::ReleaseRefCountable(&fBackupSettings);

		if (fJSContextPool != NULL)
		{
			// Remove the Entity Model script from required script

			VFolder *emFolder = inBase->RetainStructFolder();
			if (emFolder != NULL)
			{
				// Build the Entity Model script path, which is the "catalogName.js" file near the catalog
				VFilePath emScriptPath;
				VString emScriptName;
				
				inBase->GetName( emScriptName);
				emScriptName.AppendString( L".js");
				
				emFolder->GetPath( emScriptPath);
				emScriptPath.SetFileName( emScriptName, true);

				VFile file( emScriptPath );
				if ( file.Exists() )
				{
					fJSContextPool->RemoveRequiredScript( emScriptPath);
				}
				else
				{
					VFilePath emAlternateScriptPath;
					VString emAlternateScriptName;

					inBase->GetName( emAlternateScriptName);
					emAlternateScriptName.AppendString( L".js");

					emAlternateScriptName.AppendUniChar( '.');
					emAlternateScriptName.AppendString( RIAFileKind::kCatalogFileExtension);

					emFolder->GetPath( emAlternateScriptPath);
					emAlternateScriptPath.SetFileName( emAlternateScriptName, true);

					VFile alternateFile( emAlternateScriptPath );
					if ( alternateFile.Exists() )
					{
						fJSContextPool->RemoveRequiredScript( emAlternateScriptPath);
					}
				}
			}
		}
		
		inBase->CloseAndRelease( true);
		
		VString logMsg;
		logMsg.Printf( "Database closed (duration: %i ms)", usCounter.Stop()/1000);
		logger.Log( fLoggerID, eL4JML_Information, logMsg);
	}
}


VError VRIAServerProject::_StartHTTPServer()
{
	VError err = VE_OK;
	if (fHTTPServerProject != NULL)
	{
		if (!fHTTPServerProject->IsProcessing())
		{
			StUseLogger logger;
			VMicrosecondsCounter usCounter;
				
			usCounter.Start();
			logger.Log( fLoggerID, eL4JML_Information, L"Starting the HTTP server");

#if VERSIONMAC && USE_HELPER_TOOLS
			sLONG	listeningPort = fHTTPServerProject->GetSettings()->GetListeningPort();
			sLONG	listeningSSLPort = fHTTPServerProject->GetSettings()->GetListeningSSLPort();
			bool	bAllowSSL = fHTTPServerProject->GetSettings()->GetAllowSSL();
			
			//IPv6-TODO : Maj HelperTool
			if ((listeningPort < 1024) || (listeningSSLPort < 1024 && bAllowSSL))
			{
				if (AuthorizationHelpers::IsHelperToolInstalled())
				{
#if WITH_DEPRECATED_IPV4_API				
					uLONG	listeningAddress = fHTTPServerProject->GetSettings()->GetListeningAddress();
#else
					VString	tmpAddress = fHTTPServerProject->GetSettings()->GetListeningAddress();
					
					char listeningAddress[INET6_ADDRSTRLEN]; //large enough for v4 or v6, with trailing 0

					tmpAddress.ToCString(listeningAddress, sizeof(listeningAddress));
#endif			
					int		httpSocketDescriptor = -1;
					int		sslSocketDescriptor = -1;

#if WITH_DEPRECATED_IPV4_API									
					AuthorizationHelpers::OpenSocketAndGetDescriptor (listeningAddress, listeningPort, httpSocketDescriptor);
					if (bAllowSSL)
						AuthorizationHelpers::OpenSocketAndGetDescriptor (listeningAddress, listeningSSLPort, sslSocketDescriptor);
#else
					AuthorizationHelpers::OpenSocketAndGetDescriptor_IPv6 (listeningAddress, listeningPort, httpSocketDescriptor);
					if (bAllowSSL)
						AuthorizationHelpers::OpenSocketAndGetDescriptor_IPv6 (listeningAddress, listeningSSLPort, sslSocketDescriptor);		
#endif					
					if (httpSocketDescriptor != -1)
						fHTTPServerProject->SetListeningSocketDescriptor (httpSocketDescriptor);
					
					if (sslSocketDescriptor != -1)
						fHTTPServerProject->SetListeningSSLSocketDescriptor (sslSocketDescriptor);
				}
			}
			
#endif

			// sc 13/02/2012, if the socket is unavailable, we try to start the HTTP server for several times
			bool retryToStartHTTPServer = false;
			const uLONG maxTrailsCount = 5;
			uLONG trailsCount = 0;

			do
			{
				StErrorContextInstaller lErrorContext;
				retryToStartHTTPServer = false;

				err = fHTTPServerProject->StartProcessing();
				++trailsCount;
				if ((err != VE_OK) && (lErrorContext.GetContext()->Find( VE_SRVR_FAILED_TO_CREATE_LISTENING_SOCKET) || lErrorContext.GetContext()->Find( VE_SRVR_FAILED_TO_START_LISTENER)) && (trailsCount < maxTrailsCount))
				{
					fHTTPServerProject->StopProcessing();
					retryToStartHTTPServer = true;
				}

			} while (retryToStartHTTPServer);
			
			if (err == VE_OK)
			{
				// Post 'httpServerDidStart' message to the services
				_PostServicesMessage( L"httpServerDidStart");

				VString logMsg;
				logMsg.Printf( "HTTP server started (duration: %i ms)", usCounter.Stop()/1000);
				logger.Log( fLoggerID, eL4JML_Information, logMsg);
			}
		}
	}
	else
	{
		err = ThrowError( VE_RIA_HTTP_SERVER_NOT_FOUND);
	}
	return err;
}


VError VRIAServerProject::_StopHTTPServer()
{
	VError err = VE_OK;

	if (fHTTPServerProject != NULL)
	{
		if (fHTTPServerProject->IsProcessing())
		{
			StUseLogger logger;
			VMicrosecondsCounter usCounter;

			usCounter.Start();
			logger.Log( fLoggerID, eL4JML_Information, L"Stopping the HTTP server");
#if 1//DYNAMIC_DBGR_FEATURE
			if (fOpeningParameters->GetHandlesDebuggerServer())
			{
				IRemoteDebuggerServer*	l_dbgr_srv = VJSGlobalContext::GetDebuggerServer();
				if (l_dbgr_srv)
				{
					l_dbgr_srv->StopServer();
				}
			}
#endif
			// Post 'httpServerWillStop' message to the services
			_PostServicesMessage( L"httpServerWillStop");
			
			err = fHTTPServerProject->StopProcessing();

			if (err == VE_OK)
			{
				VString logMsg;
				logMsg.Printf( "HTTP server stopped (duration: %i ms)", usCounter.Stop()/1000);
				logger.Log( fLoggerID, eL4JML_Information, logMsg);
			}
		}
	}
	else
	{
		err = ThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
	}

	return err;	
}


VRPCCatalog* VRIAServerProject::_RetainRPCCatalog( VError& outError, const IHTTPRequest* inRequest, IHTTPResponse* inResponse)
{
	VRPCCatalog *catalog = NULL;

	outError = VE_OK;

	if (testAssert(fDesignProject != NULL))
	{
		catalog = new VRPCCatalog();
		if (catalog != NULL)
		{
			if (fPermissions != NULL)
			{
				// chech whether we have some modules permissions
				std::vector< VRefPtr<VValueBag> > resourcePerm;
				VString type( L"module"), action( L"executeFromClient");

				fPermissions->RetainResourcesPermission( resourcePerm, &type, NULL, &action);
				if (!resourcePerm.empty())
				{
					VJSGlobalContext *globalContext = RetainJSContext( outError, false, inRequest);
					if (globalContext != NULL)
					{
						if (outError == VE_OK)
						{
							VJSContext jsContext( globalContext);
							for (std::vector< VRefPtr<VValueBag> >::iterator permIter = resourcePerm.begin() ; permIter != resourcePerm.end() ; ++permIter)
							{
								VString modulePath;
								if ((*permIter)->GetString( RIAPermissionsKeys::resource, modulePath))
									catalog->LoadModule( modulePath, jsContext);
							}
						}
						ReleaseJSContext( globalContext, inResponse);
					}
				}

				resourcePerm.clear();

				type = L"function";
				fPermissions->RetainResourcesPermission( resourcePerm, &type, NULL, &action);
				for (std::vector< VRefPtr<VValueBag> >::iterator permIter = resourcePerm.begin() ; permIter != resourcePerm.end() ; ++permIter)
				{
					VString methodPath;
					if ((*permIter)->GetString( RIAPermissionsKeys::resource, methodPath))
					{
						catalog->AppendModuleMethod( methodPath);
					}
				}
			}
		}
		else
		{
			outError = ThrowError( VE_MEMORY_FULL);
		}
	}

	return catalog;
}


VRIAContext* VRIAServerProject::_ValidateAndRetainContext( VRIAContext* inContext, bool inCreateContextIfNull)
{
	VRIAContext *context = NULL;

	if (fContextMgr != NULL)
	{
		if (inContext != NULL)
		{
			if (fContextMgr->IsContextRegistered( inContext))
				context = RetainRefCountable( inContext);
		}
		else if (inCreateContextIfNull)
		{
			VError err;
			context = RetainNewContext( err);
		}
	}
	return context;
}


bool VRIAServerProject::_SetContextCreationEnabled( bool inEnabled)
{
	bool previousState = fContextCreationEnabled;
	fContextCreationEnabled = inEnabled;
	return previousState;
}


bool VRIAServerProject::_IsContextCreationEnabled() const
{
	return fContextCreationEnabled;
}


VError VRIAServerProject::_EvaluateScript( const VFilePath& inFilePath)
{
	VError err = VE_OK;

	VFile scriptFile( inFilePath);
	if (scriptFile.Exists() && fJSContextPool != NULL)
	{
		VJSGlobalContext *globalContext = fJSContextPool->RetainContext( err, false);
		if (globalContext != NULL && err == VE_OK)
		{
			if (!globalContext->EvaluateScript( &scriptFile, NULL))
			{
				err = VE_RIA_JS_CANNOT_EVALUATE_SCRIPT;
			}
		}
		else
		{
			err = ThrowError( VE_RIA_JS_CANNOT_CREATE_CONTEXT);
		}
		fJSContextPool->ReleaseContext( globalContext);
	}
	else
	{
		VString posixPath;
		VURL url( inFilePath);
		url.GetPath( posixPath, eURL_POSIX_STYLE, false);
		
		err = ThrowError( VE_RIA_FILE_DOES_NOT_EXIST, &posixPath, NULL);
	}
	return err;
}


VError VRIAServerProject::_PostServicesMessage( const XBOX::VString& inMessage)
{
	VError err = VE_OK;

	// Create a JavaScript context
	VJSGlobalContext *globalContext = fJSContextPool->RetainContext( err, false);

	if (globalContext != NULL && err == VE_OK)
	{
		VJSContext jsContext( globalContext);

		// Post the message using "postServiceMessage" function exported by "services" module.
		VRIAJSCallbackModuleFunction postServiceMessageCallBack( L"services", L"postServiceMessage");

		// Create a message object
		VJSObject jsMessage( jsContext);
		jsMessage.MakeEmpty();
		jsMessage.SetProperty( L"name", inMessage);

		std::vector<VJSValue> jsParams;
		jsParams.push_back( jsMessage);

		err = postServiceMessageCallBack.Call( jsContext, &jsParams, NULL);
	}
	else
	{
		err = ThrowError( VE_RIA_JS_CANNOT_CREATE_CONTEXT);
	}

	fJSContextPool->ReleaseContext( globalContext);

	if (err != VE_OK)
	{
		err = ThrowError( VE_RIA_CANNOT_POST_MESSAGE_TO_SERVICES, &inMessage, NULL);
	}

	return err;
}



// ----------------------------------------------------------------------------



VRIAServerProjectJSRuntimeDelegate::VRIAServerProjectJSRuntimeDelegate( VRIAServerProject *inApplication)
: fApplication(inApplication)
{
}


VRIAServerProjectJSRuntimeDelegate::~VRIAServerProjectJSRuntimeDelegate()
{
}


VFolder* VRIAServerProjectJSRuntimeDelegate::RetainScriptsFolder()
{
	return (fApplication != NULL) ? fApplication->RetainFolder() : NULL;
}


VProgressIndicator* VRIAServerProjectJSRuntimeDelegate::CreateProgressIndicator( const VString& inTitle)
{
	return NULL;
}

XBOX::VFileSystemNamespace* VRIAServerProjectJSRuntimeDelegate::RetainRuntimeFileSystemNamespace()
{
	return RetainRefCountable( fApplication->GetFileSystemNamespace());
}


// ----------------------------------------------------------------------------



VReloadCatalogMessage::VReloadCatalogMessage( VRIAServerProject* inApplication)
{
	fApplication = RetainRefCountable( inApplication);
}


VReloadCatalogMessage::~VReloadCatalogMessage()
{
	QuickReleaseRefCountable( fApplication);
}


void VReloadCatalogMessage::DoExecute()
{
	if (fApplication != NULL)
		fApplication->ReloadCatalog( NULL);
}



// ----------------------------------------------------------------------------



VSetDebuggerServerMessage::VSetDebuggerServerMessage( VRIAServerProject* inApplication, VRIAContext* inContext, WAKDebuggerType_t inWAKDebuggerType)
{
	fApplication = RetainRefCountable( inApplication);
	fContext = RetainRefCountable( inContext);
	fDebuggerType = inWAKDebuggerType;
}


VSetDebuggerServerMessage::~VSetDebuggerServerMessage()
{
	ReleaseRefCountable( &fApplication);
	ReleaseRefCountable( &fContext);
}


void VSetDebuggerServerMessage::DoExecute()
{
	if (fApplication != NULL)
	{
		VJSContextPoolCleaner cleaner;

		// drop all JS contexts of the application
		cleaner.CleanAll();
		
		fApplication->_SetDebuggerServer( fContext, fDebuggerType);
	}
}



VStartDebuggerMessage::VStartDebuggerMessage( VRIAServerProject* inApplication, VRIAContext* inContext )
{
	fApplication = RetainRefCountable( inApplication);
	fContext = RetainRefCountable( inContext);
}


VStartDebuggerMessage::~VStartDebuggerMessage()
{
	ReleaseRefCountable( &fApplication);
	ReleaseRefCountable( &fContext);
}


void VStartDebuggerMessage::DoExecute()
{
	if (fApplication != NULL)
	{
		VJSContextPoolCleaner cleaner;

		// drop all JS contexts of the application
		cleaner.CleanAll();
		
		fApplication->StartDebugger( fContext );
	}
}


//------- TODO: Move in separates files later
//--------------------------------------------------------------------------------------------------


struct _CountElementInVStringFunctor
{
	_CountElementInVStringFunctor (const XBOX::VString& inString)
		: fString (inString)
	{
	}

	bool operator() (const XBOX::VString& inString) const
	{
		return (fString.Find (inString) > 0);
	}

private:
	const XBOX::VString&	fString;
};


struct _MatchVRoutingRuleFunctor
{
	_MatchVRoutingRuleFunctor (const XBOX::VString& inString)
		: fString (inString)
	{
	}

	bool operator() (const std::pair<XBOX::VString, XBOX::VString>& inPairString) const
	{
		XBOX::VectorOfVString includesStrings;
		inPairString.first.GetSubStrings (CHAR_COMMA, includesStrings, false, true);
		
		if (std::count_if (includesStrings.begin(), includesStrings.end(), _CountElementInVStringFunctor (fString)) == includesStrings.size())
		{
			XBOX::VectorOfVString excludesStrings;
			inPairString.second.GetSubStrings (CHAR_COMMA, excludesStrings, false, true);
			
			if (std::count_if (excludesStrings.begin(), excludesStrings.end(), _CountElementInVStringFunctor (fString)) == 0)
				return true;
		}

		return false;
	}

private:
	const XBOX::VString&	fString;
};


//--------------------------------------------------------------------------------------------------


VRoutingRule::VRoutingRule()
: fName()
, fSuffix()
, fRules()
{
}


VRoutingRule::~VRoutingRule()
{
	fRules.clear();
}


XBOX::VError VRoutingRule::LoadFromJSONValue (const XBOX::VJSONValue& inJSONValue)
{
	if (inJSONValue.IsObject())
	{
		inJSONValue.GetProperty ("name").GetString (fName);
		inJSONValue.GetProperty ("suffix").GetString (fSuffix);

		VJSONArray *rules = inJSONValue.GetProperty ("rules").GetArray();
		for (sLONG i = 0; i < rules->GetCount(); i++)
		{
			VJSONValue elem = (*rules)[i];
			if (elem.IsObject())
			{
				VJSONObject *elemObject = elem.GetObject();

				bool isInclude = true;
				VJSONValue jsValue = elemObject->GetProperty ("include");

				if (JSON_undefined != jsValue.GetType())
				{
					XBOX::VString includeString;
					XBOX::VString excludeString;

					jsValue.GetString (includeString);
					jsValue = elemObject->GetProperty ("exclude");
					jsValue.GetString (excludeString);

					fRules.push_back (std::make_pair (includeString, excludeString));
				}
			}
		}
	}

	return XBOX::VE_OK;
}


bool VRoutingRule::MatchString (const XBOX::VString& inString)
{
	if (!fRules.empty())
	{
		VectorOfVRoutingRulePair::iterator it = std::find_if (fRules.begin(), fRules.end(), _MatchVRoutingRuleFunctor (inString));
		return (it != fRules.end());
	}

	return false;
}


//--------------------------------------------------------------------------------------------------


struct _FindMatchingRuleFunctor
{
	_FindMatchingRuleFunctor (const XBOX::VString& inString)
		: fString (inString)
	{
	}

	bool operator() (const VRoutingRuleRefPtr& inRoutingRule) const
	{
		return (inRoutingRule)->MatchString (fString);
	}

private:
	const XBOX::VString&	fString;
};


struct _FindRuleSuffixFunctor
{
	_FindRuleSuffixFunctor (const XBOX::VString& inString)
		: fString (inString)
	{
	}

	bool operator() (const VRoutingRuleRefPtr& inRoutingRule) const
	{
		return fString.EqualToString ((inRoutingRule)->GetSuffix());
	}

private:
	const XBOX::VString&	fString;
};


//--------------------------------------------------------------------------------------------------


VRoutingRulesList::VRoutingRulesList()
: fRoutingRulesList()
, fLock()
{
}


VRoutingRulesList::~VRoutingRulesList()
{
	fRoutingRulesList.clear();
}


XBOX::VError VRoutingRulesList::LoadFromJSONValue (const XBOX::VJSONValue& inJSONValue)
{
	XBOX::VTaskLock		lock (&fLock);

	if (inJSONValue.IsArray())
	{
		VJSONArray *jsonArray = inJSONValue.GetArray();
		for (sLONG i = 0; i < jsonArray->GetCount(); ++i)
		{
			VJSONValue elem = (*jsonArray)[i];
			if ( elem.IsObject() )
			{
				VRoutingRule *rule = new VRoutingRule();
				if (NULL != rule)
				{
					rule->LoadFromJSONValue (elem);
					fRoutingRulesList.push_back (rule);
					rule->Release();
				}
			}
		}
	}

	return XBOX::VE_OK;
}


bool VRoutingRulesList::FindMatchingRule (const XBOX::VString& inString, XBOX::VString& outMatchingRuleSuffix)
{
	outMatchingRuleSuffix.Clear();

	XBOX::VTaskLock		lock (&fLock);
	bool				isOK = false;
	VRoutingRulesVector::const_iterator it = std::find_if (fRoutingRulesList.begin(), fRoutingRulesList.end(), _FindMatchingRuleFunctor (inString));
	if (it != fRoutingRulesList.end())
	{
		outMatchingRuleSuffix.FromString ((*it)->GetSuffix());
		isOK = !outMatchingRuleSuffix.IsEmpty();
	}

	return isOK;
}


bool VRoutingRulesList::AcceptRuleSuffix (const XBOX::VString& inString)
{
	XBOX::VTaskLock		lock (&fLock);
	VRoutingRulesVector::const_iterator it = std::find_if (fRoutingRulesList.begin(), fRoutingRulesList.end(), _FindRuleSuffixFunctor (inString));
	if (it != fRoutingRulesList.end())
		return true;

	return false;
}


//--------------------------------------------------------------------------------------------------


VRoutingPreProcessingHandler::VRoutingPreProcessingHandler (const XBOX::VFilePath& inFilePath)
: fRoutingRulesList (NULL)
{
	_InitRulesFromFile (inFilePath);
}


VRoutingPreProcessingHandler::~VRoutingPreProcessingHandler()
{
	XBOX::ReleaseRefCountable (&fRoutingRulesList);
}


void VRoutingPreProcessingHandler::_InitRulesFromFile (const XBOX::VFilePath& inFilePath)
{
	fRoutingRulesList = new VRoutingRulesList ();

	if (NULL != fRoutingRulesList)
	{
		XBOX::VString	content;
		XBOX::VError	err = XBOX::VE_OK;
		XBOX::VFile		file (inFilePath);

		if (file.Exists())
		{
			XBOX::VFileStream fileStream (&file);

			if (XBOX::VE_OK == (err = fileStream.OpenReading()))
			{
				err = fileStream.GetText (content);
				fileStream.CloseReading();
			}
		}

		content.ExchangeAll( CVSTR( "\r" ), CVSTR( "" ) );
		content.ExchangeAll( CVSTR( "\n" ), CVSTR( "" ) );
		content.ExchangeAll( CVSTR( "\t" ), CVSTR( "" ) );

		if (XBOX::VE_OK == err)
		{
			VJSONValue		value;
			VJSONImporter	importer (content);
			importer.Parse (value);

			fRoutingRulesList->LoadFromJSONValue (value);

#if 0
			// ---------------------------- temp for tests
			XBOX::VString suffix;

			fRoutingRulesList->FindMatchingRule (CVSTR ("safari iphone (10.x)"), suffix);
			fRoutingRulesList->FindMatchingRule (CVSTR ("theBrowser android (10.x)"), suffix);
			fRoutingRulesList->FindMatchingRule (CVSTR ("another browser android (10.x mobile)"), suffix);
			fRoutingRulesList->FindMatchingRule (CVSTR ("safari ipad (10.x)"), suffix);
			fRoutingRulesList->FindMatchingRule (CVSTR ("htc desire (xxx.x)"), suffix);
			fRoutingRulesList->FindMatchingRule (CVSTR ("phone"), suffix);
			fRoutingRulesList->FindMatchingRule (CVSTR ("e10i"), suffix);
			fRoutingRulesList->FindMatchingRule (CVSTR ("samsung galaxy android mobile"), suffix);

			// ---------------------------- end of tests
#endif
		}
	}
}


XBOX::VError VRoutingPreProcessingHandler::GetPatterns (XBOX::VectorOfVString *outPatterns) const
{
	if (outPatterns == NULL)
		return VE_HTTP_INVALID_ARGUMENT;

	outPatterns->clear();
	outPatterns->push_back (CVSTR (".*"));

	return XBOX::VE_OK;
}


static
bool CheckFolderExists (const XBOX::VFilePath& inBaseFolderPath, const XBOX::VString& inFolderName)
{
	XBOX::VFilePath folderPath (inBaseFolderPath);

	folderPath.ToSubFolder (inFolderName);

	if (folderPath.IsFolder())
	{
		XBOX::VFolder	folder (folderPath);
		return folder.Exists();
	}
	
	return false;
}


static
bool CheckFileExists (const XBOX::VFilePath& inBaseFolderPath, const XBOX::VString& inFileName)
{
	XBOX::VFilePath filePath (inBaseFolderPath);

	filePath.ToSubFile (inFileName);

	if (filePath.IsFile())
	{
		XBOX::VFile file (filePath);
		return file.Exists();
	}

	return false;
}


static
XBOX::VError CheckAndResolveURL (const XBOX::VFilePath& inBaseFolderPath, const XBOX::VString& inVirtualFolderName, XBOX::VString& ioURL, IHTTPResponse *ioResponse)
{
	if (NULL == ioResponse)
		return VE_HTTP_INVALID_ARGUMENT;

	const XBOX::VString	CONST_WAPAGE_SUFFIX (".waPage");
	const XBOX::VString	CONST_DEFAULT_WAPAGE_NAME ("index.waPage");

	XBOX::VString		URL (ioURL);
	XBOX::VString		newLocation;
	XBOX::VFilePath		path (inBaseFolderPath);
	bool				bSendRedirect = false;

	if (URL.FindUniChar (CHAR_COLON) > 0) // ':'
		URL.ExchangeAll (CHAR_COLON, CHAR_SOLIDUS);

	if (URL.FindUniChar (CHAR_REVERSE_SOLIDUS) > 0) // '\'
		URL.ExchangeAll (CHAR_REVERSE_SOLIDUS, CHAR_SOLIDUS);

	XBOX::VectorOfVString	elements;

	URL.GetSubStrings (CHAR_SOLIDUS, elements);

	if (elements.empty())
	{
		if (CheckFolderExists (path, CONST_DEFAULT_WAPAGE_NAME))
			path = path.ToSubFolder (CONST_DEFAULT_WAPAGE_NAME);
	}
	else
	{
		XBOX::VString							elementName;
		XBOX::VectorOfVString::const_iterator	firstElement = elements.begin();
		XBOX::VectorOfVString::const_iterator	lastElement = (elements.end() - 1);

		for (XBOX::VectorOfVString::const_iterator it = elements.begin(); it != elements.end(); ++it)
		{
			elementName.FromString (*it);

			if ((it == lastElement) && CheckFileExists (path, elementName))
			{
				path = path.ToSubFile (elementName);
			}
			else
			{
				if ((it == firstElement) && !inVirtualFolderName.IsEmpty() && elementName.EqualToString (inVirtualFolderName))
					;	// Do Nothing
				else if  ((elementName.GetLength() == 1) && (elementName[0] == CHAR_FULL_STOP)) // "."
					;	// Do Nothing
				else if ((elementName.GetLength() == 2) && (elementName[0] == CHAR_FULL_STOP) && (elementName[1] == CHAR_FULL_STOP)) // ".."
				{
					XBOX::VFilePath parentPath (path.ToParent());

					// Try One level up
					if (parentPath.IsChildOf (inBaseFolderPath))
						path.FromFilePath (parentPath);
				}
				else
				{
					// Check if folder exists
					if (CheckFolderExists (path, elementName))
					{
						path = path.ToSubFolder (elementName);

						/*
						 *	Special case: using '/aFolder' URL with /aFolder/index.waPage' folder existing in WebFolder.
						 *	We'll find an existing folder with an existing index.waPage sub folder, but as the URL does not end with '/'
						 *	all the following requestes will be relatives to parent folder '/' instead of '/subFolder'
						 *	--> In this case, we send a redirection to adress this issue.
						 */
						if (it == lastElement)
						{
							if (URL.GetUniChar (URL.GetLength()) != CHAR_SOLIDUS)
							{
								bSendRedirect = true;
								break;
							}

							// Check if an index.waPage folder exists...
							if (!CONST_DEFAULT_WAPAGE_NAME.BeginsWith (elementName) &&
								CheckFolderExists (path, CONST_DEFAULT_WAPAGE_NAME))
							{
								path = path.ToSubFolder (CONST_DEFAULT_WAPAGE_NAME);
							}
						}
					}
					else
					{
						XBOX::VString	elementNameCopy (elementName);

						elementNameCopy.AppendString (CONST_WAPAGE_SUFFIX);

						// Check if something.waPage exists...
						if (CheckFolderExists (path, elementNameCopy))
						{
							/*
							 *	Special case: using '/aFolder' URL with /aFolder/aSubFolder.waPage' folder existing in WebFolder.
							 *	We'll find an existing folder with an existing index.waPage sub folder, but as the URL does not end with '/'
							 *	all the following requestes will be relatives to parent folder '/aFolder/' instead of '/aFolder/aSubFolder/'
							 */
							if ((it == lastElement) && URL.GetUniChar (URL.GetLength()) != CHAR_SOLIDUS)
							{
								path = path.ToSubFolder (elementName); // YT 12-Sep-2012 - WAK0078328 - Send redirection to '/aSubFolder/' not '/aSubFolder.waPage/'
								bSendRedirect = true;
								break;
							}
							else
							{
								path = path.ToSubFolder (elementNameCopy);
							}
						}
						else
						{
							// Then try index.waPage...
							if (!elementName.EqualToString (CONST_DEFAULT_WAPAGE_NAME) &&
								CheckFolderExists (path, CONST_DEFAULT_WAPAGE_NAME))
								path = path.ToSubFolder (CONST_DEFAULT_WAPAGE_NAME);

							if ((it == lastElement) && CheckFileExists (path, elementName))
								path = path.ToSubFile (elementName);
							else
								path = path.ToSubFolder (elementName);
						}
					}
				}
			}
		}
	}

	if (path != inBaseFolderPath)
	{
		path.GetRelativePosixPath (inBaseFolderPath, newLocation);
		if (newLocation.GetUniChar (1) != CHAR_SOLIDUS)
			newLocation.Insert (CHAR_SOLIDUS, 1);

		if (!inVirtualFolderName.IsEmpty())
		{
			newLocation.Insert (inVirtualFolderName, 1);
			newLocation.Insert (CHAR_SOLIDUS, 1);
		}

		if (!newLocation.EqualToString (ioURL))
		{
			if (bSendRedirect)
			{
				if (!ioResponse->GetRequest().GetURLQuery().IsEmpty())
				{
					newLocation.AppendUniChar (CHAR_QUESTION_MARK);
					newLocation.AppendString (ioResponse->GetRequest().GetURLQuery());
				}

				ioResponse->SetResponseStatusCode (HTTP_FOUND);
				ioResponse->AddResponseHeader (CVSTR ("Location"), newLocation, true);
				return VE_HTTP_PROTOCOL_FOUND;
			}
			else
			{
				ioResponse->SetRequestURLPath (newLocation);
				ioURL.FromString (newLocation);
			}
		}
	}

	return XBOX::VE_OK;
}


XBOX::VError VRoutingPreProcessingHandler::HandleRequest (IHTTPResponse *ioResponse)
{
	if (NULL == fRoutingRulesList)
		return XBOX::VE_OK;

	if (NULL == ioResponse)
		return XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);

	XBOX::VError			error = XBOX::VE_OK;
	XBOX::VString			URL (ioResponse->GetRequest().GetURLPath());
	const XBOX::VString		CONST_WAPLATFORM_COOKIE (CVSTR ("waPlatform"));
	const XBOX::VString		CONST_EMPTY_STRING (CVSTR (""));
	const XBOX::VString		CONST_USER_AGENT (CVSTR ("User-Agent"));
	const XBOX::VString		CONST_DEFAULT_WAPAGE_NAME ("index.waPage");
	IVirtualHost *			virtualHost = ioResponse->GetVirtualHost();
	IHTTPRequestHandler *	requestHandler = virtualHost->GetProject()->RetainMatchingHTTPRequestHandler (URL);

	/*
	 *	Check that request will not be handled by another requestHandler than the default 
	 *	requestHandler (VStaticPageRequestHandler)
	 */
	if (NULL == requestHandler)
	{
		/*
		 *	Check each URL level, try to find an existing.waPage folder and then "rewrite" original URL
		 */
		XBOX::VFilePath		webFolderPath;
		XBOX::VString		defaultIndexName;
		XBOX::VString		webFolderName; // Used for VirtualFolders


		virtualHost->GetMatchingVirtualFolderInfos (URL, webFolderPath, defaultIndexName, webFolderName);

		error = CheckAndResolveURL (webFolderPath, webFolderName, URL, ioResponse);

		if (XBOX::VE_OK == error)
		{
			/*
			 *	Check waPlatform cookie other else try to guess platform using User-Agent header
			 */
			XBOX::VString	platformValue;
			bool			waPlatformCookieExists = false;

			waPlatformCookieExists = ioResponse->GetRequest().GetCookie (CONST_WAPLATFORM_COOKIE, platformValue);
			if (!waPlatformCookieExists || platformValue.IsEmpty() || (!platformValue.IsEmpty() && !fRoutingRulesList->AcceptRuleSuffix (platformValue)))
			{
				XBOX::VString	userAgent;
				ioResponse->GetRequestHeader().GetHeaderValue (CONST_USER_AGENT, userAgent);
				fRoutingRulesList->FindMatchingRule (userAgent, platformValue);
			}

			if (!platformValue.IsEmpty())
			{
				XBOX::VString outResolvedURL;
				bool setCookie = true;
				sLONG cookieExpires = 0; // -1: expires at the end of session, 0: expires now

				if (virtualHost->ResolveURLForAlternatePlatformPage (URL, platformValue, outResolvedURL))
				{
					ioResponse->SetRequestURLPath (outResolvedURL);
					ioResponse->AddCookie (CONST_WAPLATFORM_COOKIE, platformValue, CONST_EMPTY_STRING, CONST_EMPTY_STRING, CONST_EMPTY_STRING, false, true, -1); // Expires at the end of session
				}
				else if (waPlatformCookieExists)
					ioResponse->AddCookie (CONST_WAPLATFORM_COOKIE, platformValue, CONST_EMPTY_STRING, CONST_EMPTY_STRING, CONST_EMPTY_STRING, false, true, 0); // Expires now
			}
		}
	}
	else
	{
		XBOX::QuickReleaseRefCountable (requestHandler);
	}

	return error;
}
