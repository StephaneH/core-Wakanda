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
#include "JSDebugger/Headers/JSWDebugger.h"

#if VERSIONMAC
#include "AuthorizationHelpers.h"
#endif

USING_TOOLBOX_NAMESPACE



namespace ProjectOpeningParametersKeys
{
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( openingMode, XBOX::VLong, sLONG, ePOM_FOR_RUNNING);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( customHttpPort, XBOX::VLong, sLONG);
}



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

	virtual CUAGSession* CopyUAGSession( const XBOX::VString& inUAGSessionID)
			{
				CUAGSession *uagSession = NULL;
				VRIAHTTPSessionManager *sessionMgr = fApplication->RetainSessionMgr();
				if (sessionMgr != NULL)
				{
					VUUID uuid;
					uuid.FromString( inUAGSessionID);
					uagSession = sessionMgr->RetainSession( uuid);
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
fLogReader(NULL),
fOpeningParameters(NULL),
fHTTPServerProject (NULL),
fApplicationStorage(NULL),
fApplicationSettings(NULL),
fSessionMgr(NULL),
fRequestNumber(0),
fLastGarbageCollectRequest(0),
fLastWorkingSetSize(0),
fPermissions(NULL)
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
fLogReader(NULL),
fOpeningParameters(NULL),
fHTTPServerProject (NULL),
fApplicationStorage(NULL),
fApplicationSettings(NULL),
fSessionMgr(NULL),
fRequestNumber(0),
fLastGarbageCollectRequest(0),
fLastWorkingSetSize(0),
fPermissions(NULL)
{
	fState.opened = false;
	fState.started = false;
}


VRIAServerProject::~VRIAServerProject()
{
	Close();
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

	ReleaseRefCountable( &fLogReader);

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
			
			VJSGlobalContext::AbortAllDebug ( );

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
					// Abort all JS contexts paused in debug mode.

					// Disable the application context (VRIAContext) creation to prevent the creation of base contexts and the using of the current opened database
					bool contextCreationEnabled = _SetContextCreationEnabled( false);
					
					// Disable the JavaScript context creation for this application
					bool jsContextPoolEnabled = fJSContextPool->SetEnabled( false);

					// Drop all the JavaScript contexts of the solution to release the existing application contexts
					fSolution->DropAllJSContexts();
					
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
				// Retreive the session according to the cookie
				session = fSessionMgr->RetainSessionFromCookie( *inRequest);
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
		}

		// Finally, update the cookie
		if (inResponse != NULL)
		{
			if (session != NULL)
				session->SetCookie( *inResponse, kHTTP_SESSION_COOKIE_NAME);
			else
			{
				XBOX::VString cookieValue;
				if (inResponse->GetRequest().GetCookie (kHTTP_SESSION_COOKIE_NAME, cookieValue))
					inResponse->DropCookie (kHTTP_SESSION_COOKIE_NAME);
			}
		}
		
		QuickReleaseRefCountable( session);

		sLONG8	nContext = ( sLONG8 ) inContext;
		if (fJSContextPool != NULL)
			fJSContextPool->ReleaseContext( inContext);

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
				vstrMessage. AppendLong8 ( nContext );
				vstrMessage. AppendCString ( "\n" );
				::DebugMsg ( vstrMessage );

				VJSGlobalObject*		globalObject = jsContext. GetGlobalObjectPrivateInstance ( );
				globalObject-> GarbageCollect ( );

				jsContext. GarbageCollect ( );
			}
		}
	}
}


void VRIAServerProject::DropAllJSContexts()
{
	if (fJSContextPool != NULL)
		fJSContextPool->Clear();
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


VError VRIAServerProject::GetPublicationSettings( VString& outHostName, VString& outIP, sLONG& outPort, VString& outPattern, VString& outPublishName) const
{
	VError err = VE_OK;

	outHostName.Clear();
	outIP.Clear();
	outPort = 0;
	outPattern.Clear();
	
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

		if (fOpeningParameters != NULL)
			done = fOpeningParameters->GetCustomHttpPort( outPort);

		if (!done)
		{
			if (!fSettings.HasHTTPServerSettings())
				err = VE_RIA_CANNOT_LOAD_HTTP_SETTINGS;
			else
				outPort = fSettings.GetListeningPort();
		}
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

#elif DEPRECATED_IPV4_API_SHOULD_NOT_COMPILE
	#error NEED AN IP V6 UPDATE
#endif
	}
	
	return err;
}


VRIAHTTPSessionManager*  VRIAServerProject::RetainSessionMgr() const
{
	return RetainRefCountable( fSessionMgr);
}


VLog4jMsgFileReader* VRIAServerProject::GetMessagesReader() const
{
	return fLogReader;
}


void VRIAServerProject::GetMessagesLoggerID( XBOX::VString& outLoggerID) const
{
	outLoggerID = fLoggerID;
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
						globalObject.SetProperty( kSSJS_PROPERTY_NAME_Database, jsDatabase, JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
						globalObject.SetProperty( kSSJS_PROPERTY_NAME_DataStore, jsDatabase, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
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
		
		fLogReader = RetainRefCountable( fSolution->GetMessagesReader());	// sc 18/06/2010 use solution message reader
		fLoggerID = L"com.wakanda-software." + solutionName + L"." + fName;
	}

	if (err == VE_OK)
	{
		StErrorContextInstaller errContext;
		StUseLogger logger;
		VMicrosecondsCounter usCounter;

		usCounter.Start();
		logger.Log( fLoggerID, eL4JML_Information, L"Opening the project");

		// Load all available settings files
		err = _LoadSettingsFile();
		if (err != VE_OK)
			err = ThrowError( VE_RIA_CANNOT_LOAD_SETTINGS_FILES);

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

				// Module support: require.js must be included into each JavaScript context
				VFilePath requirePath, requirePath2;
				VRIAServerApplication::Get()->GetWAFrameworkFolderPath( requirePath);
				requirePath.ToSubFolder( L"Core");
				requirePath2 = requirePath;
				requirePath.ToSubFolder( L"Native");
				requirePath.SetFileName( L"require");
				requirePath.SetExtension( L"js");
				
				VFile file( requirePath);
				if (file.Exists())
				{
					fJSContextPool->AppendRequiredScript( requirePath);
				}
				else
				{
					err = ThrowError( VE_RIA_JS_FILE_NOT_FOUND, &CVSTR("require.js"), NULL);
				}

				requirePath2.ToSubFolder( L"Runtime");
				requirePath2.SetFileName( L"required");
				requirePath2.SetExtension( L"js");
				VFile file2( requirePath2);
				if (file2.Exists())
				{
					fJSContextPool->AppendRequiredScript( requirePath2);
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

							sLONG httpPort = 0;
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
							httpServerSettings->SetListeningSSLPort( fSettings.GetListeningSSLPort());

							fSettings.GetSSLCertificatesPath( strValue);
							VFilePath sslCertificatePath( projectFolderPath, strValue, FPS_POSIX);
							httpServerSettings->SetSSLCertificatesFolderPath( sslCertificatePath);
							
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

						if (fSettings.GetEnableJavaScriptDebugger())
						{
							// Install a virtual fodler for the JavaScript debugger
							VFolder *resourcesFolder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
							if (resourcesFolder != NULL)
							{
								VFilePath virtualFolderPath( resourcesFolder->GetPath());
								virtualFolderPath.ToSubFolder( L"debugger").ToSubFolder( L"chromium");

								VFolder virtualFolder( virtualFolderPath);
								if (virtualFolder.Exists())
								{
									fHTTPServerProject->AddVirtualFolder( virtualFolderPath.GetPath(), L"index.html", L"wka_dbg");
								}

								ReleaseRefCountable( &resourcesFolder);
							}
							JSWDebuggerFactory		l_fctry;
							VChrmDebugHandler*		l_chr_dbgr = (VChrmDebugHandler *)(l_fctry.GetCD());
							if (testAssert (NULL != l_chr_dbgr))
								fHTTPServerProject->AddHTTPRequestHandler(l_chr_dbgr);
							}
					}
					else
					{
						err = ThrowError (VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);
					}

				#if HTTP_SERVER_GLOBAL_CACHE
					// Cache Manager settings
					ICacheManager *cacheManager = httpServer->GetCacheManager();
					if (cacheManager != NULL)
					{
						cacheManager->LoadRulesFromBag( &resourcesSettings);
					}
				#endif

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
					VString serviceName;
					if (serviceBag->GetString( RIASettingsKeys::Service::name, serviceName))
					{
						if (RIASettingsKeys::Service::enabled.Get( serviceBag))
						{
							VValueBag *lBag = serviceBag->Clone();
							servicesSettingsBag.AddElement( VValueBag::StKey(serviceName), lBag);
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
			VString directoryIndex( L"index.html");

			// Try to convert the deprecated "webApp" settings into "webApp" service settings
			VValueBag *webAppServiceBag = fSettings.RetainSettings( RIASettingID::webApp);
			if (webAppServiceBag != NULL)
			{
				autoStart = RIASettingsKeys::WebApp::enabled.Get( webAppServiceBag);
				directoryIndex = RIASettingsKeys::WebApp::directoryIndex.Get( webAppServiceBag);
				ReleaseRefCountable( &webAppServiceBag);
			}

			VValueBag *serviceBag = new VValueBag();
			if (serviceBag != NULL)
			{
				serviceBag->SetString( RIASettingsKeys::Service::name, L"webApp");
				serviceBag->SetString( VValueBag::StKey( L"autoStart"), autoStart ? L"true" : L"false");
				serviceBag->SetString( VValueBag::StKey( L"directoryIndex"), directoryIndex);
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
				
				// Check if a data file has been defined
				VProjectItem *dataItem = fDesignProject->GetProjectItemFromTag( kDataTag);
				if (dataItem != NULL)
				{
					dataItem->GetFilePath( dataPath);
				}
				else
				{
					VString defaultFolder;
					VProjectItemTagManager::Get()->GetPreferedDefaultFolder( kDataTag, defaultFolder);
					BuildPathFromRelativePath( dataPath, defaultFolder, FPS_POSIX);

					VFolder dataFolder( dataPath);
					if (dataFolder.Exists() || (dataFolder.Create() == VE_OK))
					{
						VString name;
						structurePath.GetFileName( name, false);
						dataPath.SetFileName( name, false);
						dataPath.SetExtension( RIAFileKind::kDataFileExtension);
					}
				}

				// Open the structure
				VFile structureFile(structurePath);
				CUAGDirectory *uagDirectory = fSolution->RetainUAGDirectory();

				base = db4dMgr->OpenBase( structureFile, flags, &outError, FA_READ_WRITE, nil, uagDirectory);
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
						// Retreive the Entity Model script, which is the "catalogName.kCatalogFileExtension.js" file near the catalog
						VString emScriptName;
						structurePath.GetFileName( emScriptName, false);
						emScriptName.AppendUniChar( '.');
						emScriptName.AppendString( RIAFileKind::kCatalogFileExtension);
						emScriptName.AppendString( L".js");

						VFilePath emScriptPath( structurePath);
						emScriptPath.SetFileName( emScriptName, true);

						VFile file( emScriptPath);
						if (file.Exists())
						{
							fJSContextPool->AppendRequiredScript( emScriptPath);
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


void VRIAServerProject::_CloseAndReleaseDatabase( CDB4DBase *inBase)
{
	if (inBase != NULL)
	{
		StUseLogger logger;
		VMicrosecondsCounter usCounter;
				
		usCounter.Start();
		logger.Log( fLoggerID, eL4JML_Information, L"Closing the database");

		if (fJSContextPool != NULL)
		{
			// Remove the Entity Model script from required script

			VFolder *emFolder = inBase->RetainStructFolder();
			if (emFolder != NULL)
			{
				// Build the Entity Model script path, which is the "catalogName.kCatalogFileExtension.js" file near the catalog
				VFilePath emScriptPath;
				VString emScriptName;
				
				inBase->GetName( emScriptName);
				emScriptName.AppendUniChar( '.');
				emScriptName.AppendString( RIAFileKind::kCatalogFileExtension);
				emScriptName.AppendString( L".js");
				
				emFolder->GetPath( emScriptPath);
				emScriptPath.SetFileName( emScriptName, true);

				fJSContextPool->RemoveRequiredScript( emScriptPath);
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
			
			if ((listeningPort < 1024) || (listeningSSLPort < 1024 && bAllowSSL))
			{
				if (AuthorizationHelpers::IsHelperToolInstalled())
				{
					uLONG	listeningAddress = fHTTPServerProject->GetSettings()->GetListeningAddress();
					int		httpSocketDescriptor = -1;
					int		sslSocketDescriptor = -1;
					
					AuthorizationHelpers::OpenSocketAndGetDescriptor (listeningAddress, listeningPort, httpSocketDescriptor);
					if (bAllowSSL)
						AuthorizationHelpers::OpenSocketAndGetDescriptor (listeningAddress, listeningSSLPort, sslSocketDescriptor);
					
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
