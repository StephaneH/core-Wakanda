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
#include "VSolutionStartupParameters.h"
#include "VSolution.h"
#include "VProject.h"
#include "VProjectItem.h"
#include "VRIAServerProject.h"
#include "VRIAServerJSAPI.h"
#include "VJSSolution.h"
#include "VRIAServerJSContextMgr.h"
#include "VRIAServerTools.h"
#include "VRIAServerApplication.h"
#include "VRIAServerLogger.h"
#include "UsersAndGroups/Sources/UsersAndGroups.h"
#include "VRIAJSDebuggerSettings.h"
#include "VRIAPermissions.h"
#include "VRIAServerSolution.h"



USING_TOOLBOX_NAMESPACE



namespace SolutionOpeningParametersKeys
{
	CREATE_BAGKEY( solutionOpeningParameters);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( openingMode, XBOX::VLong, sLONG, ePOM_FOR_RUNNING);
	CREATE_BAGKEY_NO_DEFAULT_SCALAR( customAdministratorHttpPort, XBOX::VLong, sLONG);
	CREATE_BAGKEY_WITH_DEFAULT_SCALAR( openDefaultSolutionIfOpeningFails, XBOX::VBoolean, bool, true);
}



VRIAServerSolutionOpeningParameters::VRIAServerSolutionOpeningParameters()
{
	fBag = new VValueBag();
}


VRIAServerSolutionOpeningParameters::VRIAServerSolutionOpeningParameters( const VRIAServerSolutionOpeningParameters& inSource)
{
	fBag = inSource.fBag->Clone();
}


VRIAServerSolutionOpeningParameters::VRIAServerSolutionOpeningParameters( VSolutionStartupParameters *inStartupParameters)
: fBag(NULL)
{
	if (inStartupParameters != NULL)
		fBag = inStartupParameters->GetExtraData().RetainUniqueElement( SolutionOpeningParametersKeys::solutionOpeningParameters);

	if (fBag == NULL)
		fBag = new VValueBag();
}


VRIAServerSolutionOpeningParameters::~VRIAServerSolutionOpeningParameters()
{
	ReleaseRefCountable( &fBag);
}


VValueBag* VRIAServerSolutionOpeningParameters::RetainBag() const
{
	return RetainRefCountable( fBag);
}


void VRIAServerSolutionOpeningParameters::UpdateStartupParameters( VSolutionStartupParameters *inStartupParameters)
{
	if (inStartupParameters != NULL)
		inStartupParameters->GetExtraData().ReplaceElement( SolutionOpeningParametersKeys::solutionOpeningParameters, fBag);
}


void VRIAServerSolutionOpeningParameters::SetOpeningMode( EProjectOpeningMode inOpeningMode)
{
	SolutionOpeningParametersKeys::openingMode.Set( fBag, inOpeningMode);
}


EProjectOpeningMode VRIAServerSolutionOpeningParameters::GetOpeningMode() const
{
	return SolutionOpeningParametersKeys::openingMode.Get( fBag);
}


void VRIAServerSolutionOpeningParameters::SetCustomAdministratorHttpPort( sLONG inPort)
{
	SolutionOpeningParametersKeys::customAdministratorHttpPort.Set( fBag, inPort);
}


bool VRIAServerSolutionOpeningParameters::GetCustomAdministratorHttpPort( sLONG& outPort) const
{
	return SolutionOpeningParametersKeys::customAdministratorHttpPort.Get( fBag, outPort);
}


void VRIAServerSolutionOpeningParameters::SetOpenDefaultSolutionWhenOpeningFails( bool inOpenDefaultSolution)
{
	SolutionOpeningParametersKeys::openDefaultSolutionIfOpeningFails.Set( fBag, inOpenDefaultSolution);
}


bool VRIAServerSolutionOpeningParameters::GetOpenDefaultSolutionWhenOpeningFails() const
{
	return SolutionOpeningParametersKeys::openDefaultSolutionIfOpeningFails.Get( fBag);
}



// ----------------------------------------------------------------------------



VRIAServerSolution::VRIAServerSolution()
: fDesignSolution(NULL),
fOpeningParameters(NULL),
#if defined(WKA_USE_CHR_REM_DBG)
#else
fDebuggerSettings(NULL),
#endif
fUAGDirectory(NULL),
fPermissions(NULL),
fJSContextPool(NULL),
fJSRuntimeDelegate(NULL),
fLogger(NULL),
fLogReader(NULL),
fGarbageCollect(false)
{
	fState.opened = false;
	fState.started = false;
	fState.inMaintenance = false;
}


VRIAServerSolution::~VRIAServerSolution()
{
}


VRIAServerSolution* VRIAServerSolution::OpenSolution( VError& outError, VSolutionStartupParameters *inStartupParameters)
{
	outError = VE_OK;
	VRIAServerSolution *solution = NULL;

	VSolution *designSolution = VSolutionManager::Get()->OpenSolution( inStartupParameters);
	if (designSolution != NULL)
	{
		solution = new VRIAServerSolution();
		if (solution != NULL)
		{
			VRIAServerSolutionOpeningParameters *openingParams = new VRIAServerSolutionOpeningParameters( inStartupParameters);
			outError = solution->_Open( designSolution, openingParams);
			ReleaseRefCountable( &openingParams);
		}
		else
		{
			VSolutionManager::Get()->CloseSolution( designSolution);
			
			delete designSolution;
			designSolution = NULL;

			outError = ThrowError( VE_MEMORY_FULL);
		}
	}
	else
	{
		outError = VE_UNKNOWN_ERROR;
	}

	return solution;
}


VError VRIAServerSolution::Close()
{
	if (!fState.opened || fState.started)
		return VE_OK;

	StUseLogger logger;
	VMicrosecondsCounter usCounter;
			
	usCounter.Start();

	logger.Log( fLoggerID, eL4JML_Information, L"Closing the solution");

	for (VectorOfApplication_iter iter = fApplicationsCollection.begin() ; iter != fApplicationsCollection.end() ; ++iter)
	{
		(*iter)->Close();
	}

	if (fApplicationsMutex.Lock())
	{
		fApplicationsCollection.clear();
		fApplicationsMap.clear();

		fApplicationsMutex.Unlock();
	}

	ReleaseRefCountable( &fPermissions);
	xbox_assert(fUAGDirectory->GetRefCount() == 1);
	ReleaseRefCountable( &fUAGDirectory);

	if (fDesignSolution != NULL)
	{
		VSolutionManager::Get()->CloseSolution( fDesignSolution);
		delete fDesignSolution;
		fDesignSolution = NULL;
	}

#if defined(WKA_USE_CHR_REM_DBG)
#else
	JSWDebuggerFactory		fctry;
	IJSWDebugger*			jswDebugger = fctry. Get ( );
	if ( jswDebugger != 0 )
		jswDebugger-> SetSettings ( NULL );

	delete fDebuggerSettings;
	fDebuggerSettings = NULL;
#endif

	VString logMsg;
	logMsg.Printf( "Solution closed (duration: %i ms)", usCounter.Stop()/1000);
	logger.Log( fLoggerID, eL4JML_Information, logMsg);

	if (fLogger != NULL)
	{
		if (fLogReader != NULL)
		{
			fLogger->DetachReader( fLogReader);
		}

		fLogger->Flush();
		fLogger->Stop();

		ILogger *appLogger = VRIAServerApplication::Get()->RetainLogger();
		if (appLogger == fLogger)
			VRIAServerApplication::Get()->SetLogger( NULL);
		ReleaseRefCountable( &appLogger);
	}

	ReleaseRefCountable( &fLogger);
	ReleaseRefCountable( &fLogReader);

	fName.Clear();
	fLoggerID.Clear();
	fSettings.Clear();

	delete fJSContextPool;
	fJSContextPool = NULL;

	delete fJSRuntimeDelegate;
	fJSRuntimeDelegate = NULL;

	ReleaseRefCountable( &fOpeningParameters);

	fState.opened = false;
	fState.inMaintenance = false;

	return VE_OK;
}


VError VRIAServerSolution::Start()
{	
	if (!fState.opened || fState.started || fState.inMaintenance)
		return VE_OK;

	VError err = VE_OK;
	StUseLogger logger;
	VMicrosecondsCounter usCounter;
			
	usCounter.Start();
	logger.Log( fLoggerID, eL4JML_Information, L"Starting the solution");

	if (fApplicationsMutex.Lock())
	{
		bool ignoreProjectStartingErrors = !fSettings.GetStopIfProjectFails();
		fGarbageCollect = fSettings.GetGarbageCollect();

		for (VectorOfApplication_iter iter = fApplicationsCollection.begin() ; iter != fApplicationsCollection.end() && err == VE_OK ; ++iter)
		{
			err = (*iter)->Start();
			if (err != VE_OK)
			{
				VString name;
				(*iter)->GetName( name);

				VErrorBase *errBase = CreateErrorBase( VE_RIA_CANNOT_START_PROJECT, &name, NULL);
				logger.LogMessageFromErrorBase( fLoggerID, errBase);
				ReleaseRefCountable( &errBase);

				VJSWorker::TerminateAll();
				
				(*iter)->Stop();	// sc 19/01/2011 if the project started with errors, the project must be stopped

				if (ignoreProjectStartingErrors)
					err = VE_OK;
				else
					err = VE_RIA_CANNOT_START_PROJECT;
			}
		}

		for (VectorOfApplication_iter iter = fApplicationsCollection.begin() ; iter != fApplicationsCollection.end() && err == VE_OK ; ++iter)
		{
			if ((*iter)->IsStarted())
			{
				err = (*iter)->OnStartup();

				if (err != VE_OK)
				{
					VString name;
					(*iter)->GetName( name);

					VErrorBase *errBase = CreateErrorBase( VE_RIA_CANNOT_START_PROJECT, &name, NULL);
					logger.LogMessageFromErrorBase( fLoggerID, errBase);
					ReleaseRefCountable( &errBase);

					VJSWorker::TerminateAll();
					
					(*iter)->Stop();	// sc 19/01/2011 if the bootstrap cannot be executed, the project must be stopped

					if (ignoreProjectStartingErrors)
						err = VE_OK;
					else
						err = VE_RIA_CANNOT_START_PROJECT;
				}
			}
		}
		
		fApplicationsMutex.Unlock();
	}

	VRIAServerApplication::Get()->SetDataCacheFlushEnabled( true);

	if (err == VE_OK)
	{
		//TEST_RegisterDebuggerUAGCallback ( );
#if defined(WKA_USE_CHR_REM_DBG)
#else
		xbox_assert ( fDebuggerSettings == NULL );
		fDebuggerSettings = new VJSDebuggerSettings ( this );
		err = fDebuggerSettings-> Init ( );
		if ( err == VE_OK )
		{
			JSWDebuggerFactory		fctry;
			IJSWDebugger*			jswDebugger = fctry. Get ( );
			if ( jswDebugger != 0 )
				jswDebugger-> SetSettings ( fDebuggerSettings );
		}
#endif
	}

	if (err == VE_OK)
	{
		VString logMsg;
		logMsg.Printf( "Solution started (duration: %i ms)", usCounter.Stop()/1000);
		logger.Log( fLoggerID, eL4JML_Information, logMsg);
	}

	fState.started = true;

	return err;
}


VError VRIAServerSolution::Stop()
{
	if (!fState.started)
		return VE_OK;

	StUseLogger logger;
	VMicrosecondsCounter usCounter;
			
	usCounter.Start();
	logger.Log( fLoggerID, eL4JML_Information, L"Stopping the solution");

	VRIAServerApplication::Get()->SetDataCacheFlushEnabled( false);

	// sc 21/01/2010, to avoid dead locks, never lock the applications mutex during the applications stopping.
	for (VectorOfApplication_iter iter = fApplicationsCollection.begin() ; iter != fApplicationsCollection.end() ; ++iter)
	{
		(*iter)->OnStop();
	}

	VJSWorker::TerminateAll();

	for (VectorOfApplication_iter iter = fApplicationsCollection.begin() ; iter != fApplicationsCollection.end() ; ++iter)
	{
		(*iter)->Stop();
	}

	fState.started = false;

	VString logMsg;
	logMsg.Printf( "Solution stopped (duration: %i ms)", usCounter.Stop()/1000);
	logger.Log( fLoggerID, eL4JML_Information, logMsg);

	return VE_OK;
}


VSolution* VRIAServerSolution::GetDesignSolution() const
{
	return fDesignSolution;
}


void VRIAServerSolution::GetName( XBOX::VString& outName) const
{
	outName = fName;
}


VFolder* VRIAServerSolution::RetainFolder() const
{
	VFolder *folder = NULL;

	if (fDesignSolution != NULL)
	{
		VProjectItem *item = fDesignSolution->GetSolutionFileProjectItem();
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


VFolder* VRIAServerSolution::RetainLogFolder( bool inCreateIfNotExists) const
{
	VFolder *folder = NULL;

	if (fDesignSolution != NULL)
	{
		VProjectItem *item = fDesignSolution->GetSolutionFileProjectItem();
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


const VRIASettingsFile* VRIAServerSolution::RetainSettingsFile( const RIASettingsID& inSettingsID) const
{
	return fSettings.RetainSettingsFile( inSettingsID);
}


CUAGDirectory* VRIAServerSolution::RetainUAGDirectory() const
{
	return RetainRefCountable( fUAGDirectory);
}


VRIAPermissions* VRIAServerSolution::RetainPermissions( XBOX::VError *outError) const
{
	VRIAPermissions *permissions = RetainRefCountable( fPermissions);

	if (outError != NULL)
		*outError = VE_OK;

	return permissions;
}


bool VRIAServerSolution::GetUUID( VUUID& outUUID) const
{
	if (fDesignSolution != NULL)
	{
		outUUID = fDesignSolution->GetUUID();
		return true;
	}
	return false;
}


VLog4jMsgFileReader* VRIAServerSolution::GetMessagesReader() const
{
	return fLogReader;
}


void VRIAServerSolution::GetMessagesLoggerID( XBOX::VString& outLoggerID) const
{
	outLoggerID = fLoggerID;
}


VRIAServerProject* VRIAServerSolution::RetainApplicationByName( const VString& inName) const
{
	VRIAServerProject *application = NULL;

	if (fApplicationsMutex.Lock())
	{
		VString locName;
		for (VectorOfApplication_citer iter = fApplicationsCollection.begin() ; (iter != fApplicationsCollection.end()) && (application == NULL) ; ++iter)
		{
			(*iter)->GetName( locName);
			if (inName.EqualToString( locName, true))
				application = (*iter).Retain();
		}
		fApplicationsMutex.Unlock();
	}
	return application;
}


VRIAServerProject* VRIAServerSolution::RetainApplicationByUUID( const VUUID& inUUID) const
{
	VRIAServerProject *application = NULL;

	if (fApplicationsMutex.Lock())
	{
		MapOfApplication_citer found = fApplicationsMap.find( inUUID);
		if (found != fApplicationsMap.end())
			application = found->second.Retain();

		fApplicationsMutex.Unlock();
	}
	return application;
}


void VRIAServerSolution::GetApplications( VectorOfApplication& outApplicationsCollection)
{
	if (fApplicationsMutex.Lock())
	{
		outApplicationsCollection.clear();
		outApplicationsCollection.insert( outApplicationsCollection.begin(), fApplicationsCollection.begin(), fApplicationsCollection.end()),

		fApplicationsMutex.Unlock();
	}
}


const VSolutionSettings& VRIAServerSolution::GetSettings() const
{
	return fSettings;
}


void VRIAServerSolution::DropAllJSContexts()
{
	if (fJSContextPool != NULL)
		fJSContextPool->Clear();
	
	if (fApplicationsMutex.Lock())
	{
		for (VectorOfApplication_citer iter = fApplicationsCollection.begin() ; iter != fApplicationsCollection.end() ; ++iter)
		{
			(*iter)->DropAllJSContexts();
		}

		fApplicationsMutex.Unlock();
	}
}


IJSRuntimeDelegate* VRIAServerSolution::GetRuntimeDelegate()
{
	return fJSRuntimeDelegate;
}


VError VRIAServerSolution::InitializeJSContext( VJSGlobalContext* inContext)
{
	VError err = VE_OK;

	if (inContext != NULL)
	{
		VJSContext jsContext( inContext);
		VJSObject globalObject( jsContext.GetGlobalObject());

		// Append the solution object to the global object
		VJSObject jsSolution( jsContext, VJSSolution::CreateInstance( jsContext, this));
		globalObject.SetProperty( kSSJS_PROPERTY_NAME_Solution, jsSolution, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete, NULL);
	}
	return err;
}


VError VRIAServerSolution::UninitializeJSContext( VJSGlobalContext* inContext)
{
	return VE_OK;
}


VError VRIAServerSolution::_Open( VSolution* inDesignSolution, VRIAServerSolutionOpeningParameters *inOpeningParameters)
{
	if (fState.opened)
		return VE_OK;
	
	VError err = VE_OK;

	if (!testAssert(fDesignSolution == NULL))
		err = VE_UNKNOWN_ERROR;

	if (err == VE_OK && inDesignSolution == NULL)
		err = ThrowError( VE_RIA_INVALID_DESIGN_SOLUTION);

	if (err == VE_OK)
	{
		fDesignSolution = inDesignSolution;
		fDesignSolution->GetName( fName);

		CopyRefCountable( &fOpeningParameters, inOpeningParameters);

		if (fOpeningParameters == NULL)
		{
			fOpeningParameters = new VRIAServerSolutionOpeningParameters();
			if (fOpeningParameters == NULL)
				err = ThrowError( VE_MEMORY_FULL);
		}

		if (err == VE_OK)
			fState.inMaintenance = fOpeningParameters->GetOpeningMode() == eSOM_FOR_MAINTENANCE;

		if (err == VE_OK && !fState.inMaintenance)
		{
			VSize		nNameLength = fName. GetLength ( ) * 2 + 1;
			char*		szchName = new char [ nNameLength ];
			fName. ToCString ( szchName, nNameLength );
			fprintf ( stdout, "Publishing solution \"%s\"\n", szchName );
			delete [ ] szchName;
		}

		if (err == VE_OK && !fState.inMaintenance)
		{
			const VFolder *			vfRoot = RetainFolder ( );
			if ( vfRoot != 0 )
			{
				VJSGlobalContext::SetSourcesRoot ( *vfRoot );
				vfRoot-> Release ( );
				VJSGlobalContext::AllowDebuggerLaunch ( );
			}
		}

		fLoggerID = L"com.wakanda-software." + fName;

		if (err == VE_OK && !fState.inMaintenance)
		{
			// Create a messages logger
			VFolder *logFolder = RetainLogFolder( true);
			if (logFolder != NULL)
			{
				fLogger = new VLog4jMsgFileLogger( *logFolder,  fName + L"_log");
				if (fLogger == NULL)
				{
					err = ThrowError( VE_MEMORY_FULL);
				}
				else
				{
					VRIAServerApplication::Get()->SetLogger( fLogger);
					fLogger->Start();
				}

				logFolder->Release();
			}
			else
			{
				err = ThrowError( VE_RIA_LOG_FOLDER_NOT_FOUND);
			}
		}

		StUseLogger logger;

		if (err == VE_OK && !fState.inMaintenance)
		{
			// Create a log file reader
			fLogReader = new VLog4jMsgFileReader();
			if (fLogReader == NULL)
				err = ThrowError( VE_MEMORY_FULL);
			else
				fLogger->AttachReader( fLogReader);
		}

		if (err == VE_OK || fState.inMaintenance)
		{
			StErrorContextInstaller errContext;
			VMicrosecondsCounter usCounter;
			
			usCounter.Start();

			logger.Log( fLoggerID, eL4JML_Information, L"Opening the solution");

			if (err == VE_OK && !fState.inMaintenance)
			{
				fJSRuntimeDelegate = new VRIAServerSolutionJSRuntimeDelegate( this);
				if (fJSRuntimeDelegate == NULL)
					err = ThrowError( VE_MEMORY_FULL);
			}

			if (err == VE_OK && !fState.inMaintenance)
			{
				fJSContextPool = VRIAServerApplication::Get()->GetJSContextMgr()->CreateJSContextPool( err, this);
			}
	
			if (err == VE_OK || fState.inMaintenance)
			{
				// Load all available settings files
				err = _LoadFileSettings();
				if (err != VE_OK)
					err = ThrowError( VE_RIA_CANNOT_LOAD_SETTINGS_FILES);
			}

			if  (err == VE_OK || fState.inMaintenance)
			{
				// Load the database settings
				err = _LoadDatabaseSettings();
				if (err != VE_OK)
					err = ThrowError( VE_RIA_CANNOT_LOAD_DATABASE_SETTINGS);
			}

			if (err == VE_OK || fState.inMaintenance)
			{
				fPermissions = _LoadPermissionFile( err);
				if (err != VE_OK)
					err = ThrowError( VE_RIA_CANNOT_LOAD_PERMISSIONS);
			}

			if (err == VE_OK || fState.inMaintenance)
			{
				// Load users and groups directory
				fUAGDirectory = _OpenUAGDirectory( err);
				if (err != VE_OK)
					err = ThrowError( VE_RIA_CANNOT_LOAD_UAG_DIRECTORY);
			}

			if (err == VE_OK || fState.inMaintenance)
			{
				// Build the ServerAdmin project file path
				VFilePath serverAdminProjectPath;
				VFolder *folder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
				if (folder != NULL)
				{
					folder->GetPath( serverAdminProjectPath);
					serverAdminProjectPath.ToSubFolder( L"Default Solution");
					serverAdminProjectPath.ToSubFolder( L"Admin");	// sc 18/02/2011 "ServerAdmin" become "Admin"
					serverAdminProjectPath.SetFileName( L"ServerAdmin", false);
					serverAdminProjectPath.SetExtension( RIAFileKind::kProjectFileExtension);
				}
				ReleaseRefCountable( &folder);

				// Opening the applications
				if (fApplicationsMutex.Lock())
				{
					// Note: the ServerAdmin project may be the project of the default solution
					// or the ServerAdmin project added to a solution which has none admin project.
					bool hasAdmin = false;
					VProject *serverAdminProject = fDesignSolution->GetProjectFromFilePathOfProjectFile( serverAdminProjectPath);

					bool ignoreProjectOpeningErrors = !fSettings.GetStopIfProjectFails();
					fGarbageCollect = fSettings.GetGarbageCollect();

					VectorOfProjects designProjects;
					fDesignSolution->GetVectorOfProjects( designProjects);
					for (VectorOfProjects::iterator iter = designProjects.begin() ; iter != designProjects.end() && (err == VE_OK || fState.inMaintenance) ; ++iter)
					{
						if (*iter != NULL)
						{
							VRIAServerProject *application = NULL;

							// Create opening parameters
							VRIAServerProjectOpeningParameters *projectOpeningParams = new VRIAServerProjectOpeningParameters();
							if (projectOpeningParams != NULL)
							{
								projectOpeningParams->SetOpeningMode( fState.inMaintenance ? ePOM_FOR_MAINTENANCE : ePOM_FOR_RUNNING);

								sLONG defaultAdminPort = 0;
								if (*iter == serverAdminProject && fOpeningParameters->GetCustomAdministratorHttpPort( defaultAdminPort))
									projectOpeningParams->SetCustomHttpPort( defaultAdminPort);
															
								// for Default solution, pass the WebAdmin opening parameters
								application = VRIAServerProject::OpenProject( err, this, *iter, projectOpeningParams);
								if ((application != NULL) && (err == VE_OK || fState.inMaintenance))
								{
									VUUID uuid;
									xbox_assert(application->GetUUID( uuid));
									
									fApplicationsCollection.push_back( VRefPtr<VRIAServerProject>(application));
									fApplicationsMap[uuid] = VRefPtr<VRIAServerProject>(application);
									hasAdmin |= application->IsAdministrator();

									if (!fState.inMaintenance)
									{
										VString			vstrHostName;
										VString			vstrIP;
										sLONG			nPort = 0;
										VString			vstrPattern;
										VString			vstrPublishName;
										VError			vErrorS = application-> GetPublicationSettings ( vstrHostName, vstrIP, nPort, vstrPattern, vstrPublishName );
										xbox_assert ( vErrorS == VE_OK );
										vstrPublishName. Clear ( );
										application-> GetName ( vstrPublishName );

										VString			vstrMessage;
										vstrMessage. AppendCString ( "\tProject \"" );
										vstrMessage. AppendString ( vstrPublishName );
										vstrMessage. AppendCString ( "\" published at " );
										vstrMessage. AppendString ( vstrIP );
										vstrMessage. AppendCString ( " on port " );
										vstrMessage. AppendLong ( nPort );
										vstrMessage. AppendCString ( "\n" );

										VSize		nNameLength = vstrMessage. GetLength ( ) * 2 + 1;
										char*		szchName = new char [ nNameLength ];
										vstrMessage. ToCString ( szchName, nNameLength );
										fprintf ( stdout, szchName );
										delete [ ] szchName;
									}
								}

								ReleaseRefCountable( &projectOpeningParams);
							}
							else
							{
								err = ThrowError( VE_MEMORY_FULL);
							}

							if (err != VE_OK)
							{
								VString name;
								(*iter)->GetName( name);

								VErrorBase *errBase = CreateErrorBase( VE_RIA_CANNOT_OPEN_PROJECT, &name, NULL);
								logger.LogMessageFromErrorBase( fLoggerID, errBase);
								ReleaseRefCountable( &errBase);

								if (!fState.inMaintenance)
								{
									if (application != NULL)
										application->Close();

									if (ignoreProjectOpeningErrors)
										err = VE_OK;
									else
										err = VE_RIA_CANNOT_OPEN_PROJECT;
								}
							}
							ReleaseRefCountable( &application);
						}
					}

					if (!hasAdmin && !fState.inMaintenance && (err == VE_OK))
					{
						VFile file( serverAdminProjectPath);
						if (file.Exists())
						{
							VURL url( serverAdminProjectPath);
							fDesignSolution->AddExistingProject( url, false);

							VProject *designProject = fDesignSolution->GetProjectFromFilePathOfProjectFile( serverAdminProjectPath);
							if (designProject != NULL)
							{
								VRIAServerProject *application = NULL;

								// Create opening parameters
								VRIAServerProjectOpeningParameters *projectOpeningParams = new VRIAServerProjectOpeningParameters();
								if (projectOpeningParams != NULL)
								{
									projectOpeningParams->SetOpeningMode( ePOM_FOR_RUNNING);

									sLONG defaultAdminPort = 0;
									if (fOpeningParameters->GetCustomAdministratorHttpPort( defaultAdminPort))
										projectOpeningParams->SetCustomHttpPort( defaultAdminPort);

									application = VRIAServerProject::OpenProject( err, this, designProject, projectOpeningParams);
									if (application != NULL && err == VE_OK)
									{
										VUUID uuid;
										xbox_assert(application->GetUUID( uuid));

										fApplicationsCollection.push_back( VRefPtr<VRIAServerProject>(application));
										fApplicationsMap[uuid] = VRefPtr<VRIAServerProject>(application);
									}
									ReleaseRefCountable( &projectOpeningParams);
								}
								else
								{
									err = ThrowError( VE_MEMORY_FULL);
								}

								if (err != VE_OK)
								{
									VString name;
									designProject->GetName( name);

									VErrorBase *errBase = CreateErrorBase( VE_RIA_CANNOT_OPEN_PROJECT, &name, NULL);
									logger.LogMessageFromErrorBase( fLoggerID, errBase);
									ReleaseRefCountable( &errBase);

									if (application != NULL)
										application->Close();

									if (ignoreProjectOpeningErrors)
										err = VE_OK;
									else
										err = VE_RIA_CANNOT_OPEN_PROJECT;
								}
								ReleaseRefCountable( &application);
							}
						}
					}

					fApplicationsMutex.Unlock();
				}
			}

			logger.LogMessagesFromErrorContext( fLoggerID, errContext.GetContext());

			if (err == VE_OK)
			{
				VString logMsg;
				logMsg.Printf( "Solution opened (duration: %i ms)", usCounter.Stop()/1000);
				logger.Log( fLoggerID, eL4JML_Information, logMsg);
			}
		}
	}

	fState.opened = true;

	return err;
}


VError VRIAServerSolution::_LoadFileSettings()
{
	VError err = VE_OK;

	if (testAssert(fDesignSolution != NULL))
	{
		VectorOfProjectItems itemsVector;

		fDesignSolution->GetProjectItemsFromTag( kSettingTag, itemsVector);
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


VError VRIAServerSolution::_LoadDatabaseSettings()
{
	VError err = VE_OK;

	VValueBag *settings = fSettings.RetainSettings( RIASettingID::database);
	if (settings != NULL)
	{
		// Set the DB4D cache size
		CDB4DManager *db4dMgr = VRIAServerApplication::Get()->GetComponentDB4D();
		if (db4dMgr != NULL)
		{
			// done from the function allocDatabaseCache() in init.cpp
			VSize minsizeblockmem = 0, wantedSizeBlockMem = 0, allocatedSize = 0, minSizeToFlush = 0;

			// calculate the wanted cache size
			if (fSettings.GetAdaptiveCache())
			{
				minsizeblockmem = ((VSize) fSettings.GetMinimumCacheSize()) * 1024 * 1024;

				sLONG8 maxCacheSize = ((sLONG8) fSettings.GetMaximumCacheSize()) * 1024 * 1024;
				sLONG8 minCacheSize = minsizeblockmem;
				sLONG8 minReservedSize = ((sLONG8) fSettings.GetMemoryForOtherApplications()) * 1024 * 1024;
				sLONG ourPercent = fSettings.GetMemoryForCache();
				
				VSize mandatoryMinimum = db4dMgr->GetMinimumCacheSize();

				if(minCacheSize < mandatoryMinimum)
					minCacheSize = mandatoryMinimum;

				if(maxCacheSize < minCacheSize)
					maxCacheSize = minCacheSize;
				
				if (minCacheSize == maxCacheSize)
				{
					wantedSizeBlockMem = minCacheSize;
				}
				else
				{
					sLONG8 cacheSize = 0;
					sLONG8 memMax = VSystem::GetPhysicalMemSize();

					if (memMax > minReservedSize)
						cacheSize = (memMax - minReservedSize)/100 * ourPercent;
					else
						cacheSize = minCacheSize;

					if (cacheSize > maxCacheSize)
						cacheSize = maxCacheSize;
					if (cacheSize < minCacheSize)
						cacheSize = minCacheSize;

					wantedSizeBlockMem = (VSize) cacheSize;
				}
			}
			else
			{
				minsizeblockmem = ((VSize) fSettings.GetFixedCacheSize()) * 1024 * 1024;
				wantedSizeBlockMem = minsizeblockmem;
			}
		
#if !VERSION_LINUX
//jmo - Bug sous Linux... Et probablement ailleurs ! Soit la pile d'appels suivante :

// #0  xbox::VCppMemMgr::AddVirtualAllocation (this=0x7fffec0bfb70, inMaxBytes=104857600, inHintAddress=0x0, inPhysicalMemory=true) at depot/XToolbox/Main/Kernel/Sources/VMemoryCpp.cpp:1480
// #1  0x00007ffff11924fb in VDBCacheMgr::SetMaxSize (this=0x7fffec0bfb60, inSize=209715200, inPhysicalMemOnly=true, outMaxSize=0x7fffffffcc08) at depot/Components/Main/DB4D/Sources/Cache.cpp:1066
// #2  0x00007ffff12a6841 in VDBMgr::SetCacheSize (this=0x7fffec0d5670, inSize=209715200, inPhysicalMemOnly=true, outActualCacheSize=0x7fffffffcc08) at depot/Components/Main/DB4D/Sources/DB4DMgr.cpp:675
// #3  0x00007ffff1302681 in VDB4DMgr::SetCacheSize (this=0x7fffec1d2480, inSize=209715200, inPhysicalMemOnly=true, outActualSize=0x7fffffffcc08) at depot/Components/Main/DB4D/Sources/DB4DComponent.cpp:582
// #4  0x0000000000494f7f in VRIAServerSolution::_LoadDatabaseSettings (this=0x7fffec34c250) at depot/4eDimension/main/4D/PC4D/Solution_RIAServer.cpp:685

//On voit dans xbox::VCppMemMgr::AddVirtualAllocation() qu'on retourne SYSTEMATIQUEMENT une erreur si on utilise le mem. manager standard. Cette erreur se propage jusqu'au "err=" de la ligne ci-dessous et empeche le chargement de la solution...

			err = db4dMgr->SetCacheSize( wantedSizeBlockMem, fSettings.GetKeepCacheInMemory(), &allocatedSize);
#endif

			// Calculate the minimum size to flush
			if ( allocatedSize <= 2*1024L*1024L)
			{
				minSizeToFlush = allocatedSize/4L;	// en dessous de 2 Mo: 25%
			}
			else
			{
				double r = (double) allocatedSize / (1024L*1024L);
				minSizeToFlush = (VSize) (1024.0 * 1024.0 * ::log(r));
				if (minSizeToFlush < 512L*1024L)
					minSizeToFlush = 512L*1024L;
			}

			db4dMgr->SetMinSizeToFlush( minSizeToFlush);

			if ((allocatedSize < minsizeblockmem) && ((((double) (minsizeblockmem - allocatedSize)) / ((double) minsizeblockmem)) > 0.01))
			{
				// TBD: returns a warning
			}

			// Set the data cache flush delay
			VRIAServerApplication::Get()->SetDataCacheFlushDelay( fSettings.GetFlushDataInterval() * 1000);
		}
		else
		{
			err = ThrowError( VE_RIA_DB4D_COMPONENT_NOT_FOUND);
		}
	}
	return err;	
}


CUAGDirectory* VRIAServerSolution::_OpenUAGDirectory( VError& outError)
{
	outError = VE_OK;

	CUAGDirectory *directory = nil;

	CUAGManager *uag = VComponentManager::RetainComponentOfType<CUAGManager>();
	if (uag != NULL)
	{
		if (testAssert(fDesignSolution != NULL))
		{
			StUseLogger logger;
			VMicrosecondsCounter usCounter;

			VProjectItem *dirItem = fDesignSolution->GetProjectItemFromTag( kUAGDirectoryTag);
			if (dirItem != NULL)
			{
				VFilePath directoryPath;
				dirItem->GetFilePath( directoryPath);
			
				usCounter.Start();
				logger.Log( fLoggerID, eL4JML_Information, L"Opening the users and groups directory");
				
				VFile file( directoryPath);
				directory = uag->RetainDirectory( file, FA_READ_WRITE, NULL, NULL, &outError);
			}

			if (directory == NULL && outError == VE_OK)
			{
				VFilePath solpath;
				fDesignSolution->GetSolutionFilePath(solpath);
				solpath.SetExtension(RIAFileKind::kDirectoryFileExtension);
				VFile defaultDirFile(solpath);
				directory = uag->RetainDirectory( defaultDirFile, FA_READ_WRITE, NULL, NULL, &outError, NULL, true);
			}

			if (directory != NULL && outError == VE_OK)
			{
				// Create an "admin" user if needed

				CUAGGroup *adminGroup = directory->RetainSpecialGroup( CUAGDirectory::AdminGroup);
				CUAGGroup *debuggerGroup = directory->RetainSpecialGroup( CUAGDirectory::DebuggerGroup);

				if ((adminGroup != NULL) && (debuggerGroup != NULL))
				{
					StErrorContextInstaller errorContext( VE_UAG_USERNAME_DOES_NOT_EXIST, VE_OK);

					CUAGUser *adminUser = directory->RetainUser( L"admin");
					
					if (adminUser == NULL)
						adminUser = directory->AddOneUser( L"admin", L"", L"", outError);

					if ((outError == VE_OK) && (adminUser != NULL))
					{
						VUUID adminUserID, userID;
						adminUser->GetID( adminUserID);
						
						CUAGUserVector users;
						adminGroup->RetainUsers( users);

						bool hasAdminUser = false;
						for (CUAGUserVector::iterator userIter = users.begin() ; (userIter != users.end()) && !hasAdminUser ; ++userIter)
						{
							(*userIter)->GetID( userID);
							hasAdminUser = (adminUserID == userID);
						}

						if (!hasAdminUser)
							outError = adminUser->PutIntoGroup( adminGroup);

						if (outError == VE_OK)
						{
							users.clear();
							debuggerGroup->RetainUsers( users);

							hasAdminUser = false;
							for (CUAGUserVector::iterator userIter = users.begin() ; (userIter != users.end()) && !hasAdminUser ; ++userIter)
							{
								(*userIter)->GetID( userID);
								hasAdminUser = (adminUserID == userID);
							}

							if (!hasAdminUser)
								outError = adminUser->PutIntoGroup( debuggerGroup);
						}
					}
					ReleaseRefCountable( &adminUser);
				}
				QuickReleaseRefCountable( adminGroup);
				QuickReleaseRefCountable( debuggerGroup);
			}

			if (directory != NULL && outError == VE_OK)
			{
				VString logMsg;
				logMsg.Printf( "Users and groups directory opened (duration: %i ms)", usCounter.Stop()/1000);
				logger.Log( fLoggerID, eL4JML_Information, logMsg);
			}
		}
		uag->Release();
	}
	else
	{
		outError = ThrowError( VE_RIA_UAG_COMPONENT_NOT_FOUND);
	}
	return directory;
}


VRIAPermissions* VRIAServerSolution::_LoadPermissionFile( VError& outError)
{
	VRIAPermissions *permissions = NULL;

	outError = VE_OK;

	if (testAssert(fDesignSolution != NULL))
	{
		VProjectItem *item = fDesignSolution->GetProjectItemFromTag( kPermissionsTag);
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


// THIS TEST METHOD WILL GO AWAY INTO ITS OWN SEPARATE SOURCE FILE
VError VRIAServerSolution::TEST_RegisterDebuggerUAGCallback ( )
{
	VError					vError = VE_OK;

	xbox_assert ( fDesignSolution != 0 );
	if ( fDesignSolution == NULL )
		return ThrowError ( VE_RIA_INVALID_DESIGN_SOLUTION );

	CUAGManager*			cmpUAGManager = VComponentManager::RetainComponentOfType <CUAGManager> ( );
	if ( cmpUAGManager == 0 )
		return ThrowError ( VE_RIA_UAG_COMPONENT_NOT_FOUND );

	bool					bCanDebug = false;

	VProjectItem*			pitemDirectory = fDesignSolution-> GetProjectItemFromTag ( kUAGDirectoryTag );
	VProjectItem*			pitemPerms = fDesignSolution-> GetProjectItemFromTag ( kPermissionsTag );
	if ( pitemDirectory != NULL )
	{
		VFilePath			pathPerms;
		pitemDirectory-> GetFilePath ( pathPerms );
		/*VFilePath	pathPerms;
		if ( pitemPerms != NULL )
			pitemPerms-> GetFilePath ( pathPerms );*/

		// Load and parse premissions file
		pathPerms. SetExtension ( CVSTR ( "waPerm" ) ); // Hardcoded to be at the same level as the directory file and to have the same name but different extension
		VFile				vfPerms ( pathPerms );
		VValueBag			vvbagPerms;
		vError = LoadBagFromXML ( vfPerms, L"Permissions", vvbagPerms );

		const VBagArray*	bgaPerms = vvbagPerms. GetElements ( CVSTR ( "allow" ) ); // Use namespaced bag keys instead, like SolutionPerms::allow
		if ( bgaPerms != 0 && fUAGDirectory != 0 )
		{
			//CUAGUser*		cUser = fUAGDirectory-> RetainUser ( CVSTR ( "stemnikov" ), &vError );
			CUAGUser*		cUser = fUAGDirectory-> RetainUser ( CVSTR ( "toto" ), &vError );
			if ( cUser != NULL && vError == VE_OK )
			{
				// NEED TO COMPARE the input HA1 with the one stored in the directory to validate user name and password
				VString		vstrValidHA1;
				vError = cUser-> GetHA1 ( vstrValidHA1 );

				CUAGSession*	cSession = fUAGDirectory-> OpenSession ( cUser, &vError );
				if ( cSession != NULL && vError  == VE_OK )
				{
					VIndex			nCount = bgaPerms-> GetCount ( );
					for ( VIndex i = 1; i <= nCount && vError == VE_OK; i++ )
					{
						const VValueBag*		vvbagOnePerm = bgaPerms-> GetNth ( i );
						if ( vvbagOnePerm == NULL )
							continue;

						VString		vstrAction;
						vvbagOnePerm-> GetString ( CVSTR ( "action" ), vstrAction ); // Use namespaced bag keys instead, like SolutionPerms::action
						VString		vstrGroupID;
						vvbagOnePerm-> GetString ( CVSTR ( "groupID" ), vstrGroupID ); // Use namespaced bag keys instead, like SolutionPerms::groupID
						::DebugMsg ( CVSTR ( "Action is \"" ) + vstrAction + CVSTR ( "\"\r\n" ) );
						::DebugMsg ( CVSTR ( "GroupID is \"" ) + vstrGroupID + CVSTR ( "\"\r\n" ) );

						if ( vstrAction. EqualToString ( CVSTR ( "debug" ) ) )
						{
							VUUID		vidGroup;
							vidGroup. FromString ( vstrGroupID );
							if ( cSession-> BelongsTo ( vidGroup ) )
							{
								bCanDebug = true;

								break;
							}
						}
					}
					cSession-> Release ( );
				}
				cUser-> Release ( );
			}
		}
	}
	else
		vError = ThrowError ( VE_RIA_INVALID_DESIGN_SOLUTION );

	cmpUAGManager-> Release ( );

	return vError;
}


// ----------------------------------------------------------------------------



VRIAServerSolutionJSRuntimeDelegate::VRIAServerSolutionJSRuntimeDelegate( VRIAServerSolution* inSolution)
: fSolution(inSolution)
{
}


VRIAServerSolutionJSRuntimeDelegate::~VRIAServerSolutionJSRuntimeDelegate()
{
}


VFolder* VRIAServerSolutionJSRuntimeDelegate::RetainScriptsFolder()
{
	return (fSolution != NULL) ? fSolution->RetainFolder() : NULL;
}


VProgressIndicator* VRIAServerSolutionJSRuntimeDelegate::CreateProgressIndicator( const VString& inTitle)
{
	return NULL;
}
