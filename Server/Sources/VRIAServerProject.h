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
#ifndef __RIAServerProject__
#define __RIAServerProject__


#include "HTTPServer/Interfaces/CHTTPServer.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "VRIASettingsFile.h"
#include "VProjectSettings.h"
#include "VRIAServerJSContextMgr.h"


class VRIAServerSolution;
class VRIAServerProject;
class VProject;
class CDB4DBase;
class VRIAContext;
class VRIAContextManager;
class VStopHTTPServerMessage;
class VRIAServerProjectJSRuntimeDelegate;
class CUAGDirectory;
class ISymbolTable;
class VRIAHTTPSessionManager;
class VJSRequestHandler;
class IRIAJSCallback;
class VRPCService;
class VRPCCatalog;
class VDataService;
class XBOX::VJSSessionStorageObject;
class VRIAPermissions;



// ----------------------------------------------------------------------------



class VRIAServerProjectOpeningParameters : public XBOX::VObject, public XBOX::IRefCountable
{
public:
			VRIAServerProjectOpeningParameters();
	virtual ~VRIAServerProjectOpeningParameters();

			void					SetOpeningMode( EProjectOpeningMode inOpeningMode);
			EProjectOpeningMode		GetOpeningMode() const;

			void					SetCustomHttpPort( sLONG inPort);
			bool					GetCustomHttpPort( sLONG& outPort) const;

private:
			XBOX::VValueBag			fBag;
};




// ----------------------------------------------------------------------------



class VRIAServerProject : public XBOX::VObject, public XBOX::IRefCountable, public IJSContextPoolDelegate
{
public:

			VRIAServerProject();
			VRIAServerProject( VRIAServerSolution* inSolution);
	virtual ~VRIAServerProject();

			/**	@brief	Load the settings, open the database, load the RPC methods, instantiate required components
						Finally, OpenProject() returns the ria application. If needed, default opening parameters are created. */
	static	VRIAServerProject*			OpenProject( XBOX::VError& outError, VRIAServerSolution* inSolution, VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters);
			/**	@brief	Close the database and release all components */
			XBOX::VError				Close();

			/**	@brief	Start the servers and enable the services according to the settings */
			XBOX::VError				Start();
			
			/**	@brief	Disable the services and stop the servers */
			XBOX::VError				Stop();
			
			/**	@brief	Evaluate the startup javascript files */
			XBOX::VError				OnStartup();

			XBOX::VError				OnStop();

			/** @brief	Project state accessors */
			bool						IsOpened() const;
			bool						IsStarted() const;
			
			/**	@brief	Create and returns a context for this application. The context is registered until its destruction.
						May returns NULL if context creation is not allowed */
			VRIAContext*				RetainNewContext( XBOX::VError& outError);

			/**	@brief	HTTP Server handling high-level methods */
			IHTTPServerProject *		RetainHTTPServerProject( VRIAContext* inContext);
			XBOX::VError				StartHTTPServerProject( VRIAContext* inContext);
			/**	@brief	the HTTP Server is closed asynchronously in the main task. */
			XBOX::VError				StopHTTPServerProject( VRIAContext* inContext);
			bool						IsHTTPServerProjectStarted( VRIAContext* inContext);

			/**	@brief	Web App service handling high-level methods */
			XBOX::VError				SetWebAppServiceEnabled( VRIAContext* inContext, bool inEnabled);
			bool						IsWebAppServiceEnabled( VRIAContext* inContext);

			/**	@brief	Data service handling high-level methods */
			CDB4DBase*					RetainDatabase( VRIAContext* inContext);
			VDataService*				RetainDataService( VRIAContext* inContext, XBOX::VError* outError);
			XBOX::VError				SetDataServiceEnabled( VRIAContext* inContext, bool inEnabled);
			bool						IsDataServiceEnabled( VRIAContext* inContext);
			XBOX::VError				ReloadCatalog( VRIAContext* inContext);

			/**	@brief	RPC service handling high-level methods */
			VRPCCatalog*				RetainRPCCatalog( VRIAContext* inContext, XBOX::VError* outError, const IHTTPRequest* inRequest, IHTTPResponse* inResponse);
			VRPCService*				RetainRPCService( VRIAContext* inContext, XBOX::VError* outError);
			XBOX::VError				SetRPCServiceEnabled( VRIAContext* inContext, bool inEnabled);
			bool						IsRPCServiceEnabled( VRIAContext* inContext);
			/**	@brief	The relative path of the methods file is either relative to the rpc default folder or relative to the project folder (support external tagged items).
						Returns NULL if the file does not exist or does not match any methods file. */
			XBOX::VFile*				RetainRPCMethodsFileFromRelativePath( XBOX::VError& outError, const XBOX::VString& inRelativePath, XBOX::FilePathStyle inRelativPathStyle);
	
			CUAGDirectory*				RetainUAGDirectory( XBOX::VError& outError);

			VRIAPermissions*			RetainPermissions( VRIAContext *inContext, XBOX::VError *outError);

			// HTTP request handler handling
			/** @brief	Returns a retained JavaScript request handler. The callback is retained */
			VJSRequestHandler*			AddJSHTTPRequestHandler( XBOX::VError& outError, VRIAContext* inContext, const XBOX::VString& inPattern, IRIAJSCallback* inJSCallback);
			XBOX::VError				RemoveJSHTTPRequestHandler( VRIAContext* inContext, const XBOX::VString& inPattern, IRIAJSCallback* inJSCallback);

			// JavaScript utilities
			/**	@brief	HTTP session handling: if inRequest is not null, the session storage object is set according to the cookie */
			XBOX::VJSGlobalContext*		RetainJSContext( XBOX::VError& outError, bool inReusable, const IHTTPRequest* inRequest);
			/**	@brief	HTTP session handling: if inResponse is not null, the cookie is set according to the session storage object */
			void						ReleaseJSContext( XBOX::VJSGlobalContext* inContext, IHTTPResponse* inResponse);
			void						DropAllJSContexts();

			// Accessors
			bool						GetUUID( XBOX::VUUID& outUUID) const;
			VRIAServerSolution*			GetSolution() const;
			VProject*					GetDesignProject();
			void						GetName( XBOX::VString& outName) const;
			bool						IsAdministrator() const;
			void						GetHostName( XBOX::VString& outHostName) const;
			void						GetPattern( XBOX::VString& outPattern) const;
			/**	@brief	Returns the physical folder which contains the design project file */
			XBOX::VFolder*				RetainFolder() const;
			/** @brief	Returns the folder which contains the log files. */
			XBOX::VFolder*				RetainLogFolder( bool inCreateIfNotExists) const;
			/** @brief	Returns the temporary folder of the project. */
			XBOX::VFolder*				RetainTemporaryFolder( bool inCreateIfNotExists) const;
			/** @brief	Returns the settings file which contains the setting. */
			const VRIASettingsFile*		RetainSettingsFile( const RIASettingsID& inSettingsID) const;

			XBOX::VError				GetPublicationSettings( XBOX::VString& outHostName, XBOX::VString& outIP, sLONG& outPort, XBOX::VString& outPattern, XBOX::VString &outPublishName) const;

			VRIAHTTPSessionManager*		RetainSessionMgr() const;

			// Logging
			XBOX::VLog4jMsgFileReader*	GetMessagesReader() const;
			void						GetMessagesLoggerID( XBOX::VString& outLoggerID) const;

			/** @brief	Build a path from the project folder path and the relative path inRelativePath */
			void						BuildPathFromRelativePath( XBOX::VFilePath& outPath, const XBOX::VString& inRelativePath, XBOX::FilePathStyle inRelativPathStyle = XBOX::FPS_SYSTEM) const;
	
			XBOX::VJSSessionStorageObject	*GetApplicationStorage ()	{	return fApplicationStorage;	}
			XBOX::VJSSessionStorageObject	*GetApplicationSettings ()	{	return fApplicationSettings;	}

private:

			// Inherited from IJSContextPoolDelegate
	virtual	XBOX::IJSRuntimeDelegate*	GetRuntimeDelegate();
			// @brief	Create a runtime context and attach it to the JavaScript context, set the global object properties. */
	virtual	XBOX::VError				InitializeJSContext( XBOX::VJSGlobalContext* inContext);
	virtual	XBOX::VError				UninitializeJSContext( XBOX::VJSGlobalContext* inContext);

			XBOX::VError				_Open( VProject* inDesignProject, VRIAServerProjectOpeningParameters *inOpeningParameters);

			/** @brief	Update the settings collection with all available settings files */
			XBOX::VError				_LoadSettingsFile();

			XBOX::VError				_LoadPermissionFile();

			/** @brief	Open the default database of the project.
						If none default database is found and if inCreateEmptyDatabaseIfNeed is true, an empty database is created */
			CDB4DBase*					_OpenDatabase( XBOX::VError& outError, bool inCreateEmptyDatabaseIfNeed);
			void						_CloseAndReleaseDatabase( CDB4DBase *inBase);

			/**	@brief	HTTP Server low-level handling */
			XBOX::VError				_StartHTTPServer();
			/** @brief	Disable the context registration, wait for all contexts being unregistered, stop the services which depend on the http server, and finally stop the http server. */
			XBOX::VError				_StopHTTPServer();

			/**	@brief	Web App service low-level handling */
			XBOX::VError				_SetWebAppServiceEnabled( bool inEnabled);

			/**	@brief	Returns the rpc catalog which has been built from the methods files (*.js) and catalog files (*.waRpc) */
			VRPCCatalog*				_RetainRPCCatalog( XBOX::VError& outError, const IHTTPRequest* inRequest, IHTTPResponse* inResponse);

			/** @brief	Returns NULL if inContext is not valid, else returns a valid retained context.
						Typically, _ValidateAndRetainContext() should be used to validate a context passed as parameter. */
			VRIAContext*				_ValidateAndRetainContext( VRIAContext* inContext, bool inCreateContextIfNull);

			/**	@brief	Disable the application context creation. Return previous context creation state. */
			bool						_SetContextCreationEnabled( bool inEnabled);
			bool						_IsContextCreationEnabled() const;

			/** @brief	The following method updates the Web App service settings from the Web App settings .
						Typically, this method is called before starting the WebAppService */
			XBOX::VError				_LoadWebAppServiceSettings();

			XBOX::VError				_EvaluateScript( const XBOX::VFilePath& inFilePath);

			// JavaScript services utilities
			/** @brief	Post a message to the registered services. */
			XBOX::VError				_PostServicesMessage( const XBOX::VString& inMessageName);

			sLONG						fRequestNumber;
			sLONG						fLastGarbageCollectRequest;
			sLONG8						fLastWorkingSetSize;



			VRIAServerSolution			*fSolution;
			VProject					*fDesignProject;
			XBOX::VString				fName;
			XBOX::VLog4jMsgFileReader	*fLogReader;
			XBOX::VString				fLoggerID;
			VProjectSettings			fSettings;
			VRIAPermissions				*fPermissions;
			
			VRIAServerProjectOpeningParameters	*fOpeningParameters;

			typedef struct
			{
				uBYTE opened : 1;
				uBYTE started : 1;
				uBYTE inMaintenance : 1;
				uBYTE unused : 5;
			} ApplicationState;

			ApplicationState			fState;

			// Database
			CDB4DBase					*fDatabase;
	mutable	XBOX::VCriticalSection		fReloadDatabaseMutex;

			// Data service
			VDataService				*fDataService;
		#if !USE_JAVASCRIPT_DATASTORE_SERVICE
			bool						fIsDataServiceManager;				// - false if the data service is managed by a JavaScript service
																			// - true if the project manages the data service (deprecated behaviour)
		#endif

			// Security Manager
			CSecurityManager			*fSecurityManager;

			// HTTP Server
			IHTTPServerProject *		fHTTPServerProject;

			// RPC service
			VRPCService					*fRPCService;
		#if !USE_JAVASCRIPT_RPC_SERVICE
			bool						fIsRPCServiceManager;				// - false if the rpc service is managed by a JavaScript service
																			// - true if the project manages the rpc service (deprecated behaviour)
		#endif

		#if !USE_JAVASCRIPT_WEBAPP_SERVICE
			bool						fIsWebAppServiceManager;			// - false if the web app service is managed by a JavaScript service
																			// - true if the project manages the web app service (deprecated behaviour)
		#endif

			// Application context
			VRIAContextManager			*fContextMgr;
			bool						fContextCreationEnabled;
			
			// JavaScript contexts
			VJSContextPool						*fJSContextPool;
			VRIAServerProjectJSRuntimeDelegate	*fJSRuntimeDelegate;

			// HTTP sessions
			VRIAHTTPSessionManager		*fSessionMgr;
	
			XBOX::VJSSessionStorageObject		*fApplicationStorage;
			XBOX::VJSSessionStorageObject		*fApplicationSettings;

	friend	class VStopHTTPServerMessage;
	friend	class VReloadCatalogMessage;
};



// ----------------------------------------------------------------------------



class VRIAServerProjectJSRuntimeDelegate : public XBOX::VObject, public XBOX::IJSRuntimeDelegate
{
public:
			VRIAServerProjectJSRuntimeDelegate( VRIAServerProject* inApplication);
	virtual ~VRIAServerProjectJSRuntimeDelegate();

	virtual	XBOX::VFolder*					RetainScriptsFolder();
	virtual XBOX::VProgressIndicator*		CreateProgressIndicator( const XBOX::VString& inTitle);

private:
			VRIAServerProject				*fApplication;
};



#endif
