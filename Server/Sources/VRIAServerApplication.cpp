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
#include "DB4D/Headers/DB4D.h"
// db4d bag keys, to be included once and only once per project
#include "DB4D/Headers/DB4DBagKeys.h"
#include "JavaScript/VJavaScript.h"
#include "VRIAServerComponentBridge.h"
#include "VSolution.h"
#include "VRIAServerSolution.h"
#include "VRIAServerTools.h"
#include "VSolutionStartupParameters.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "VRIAServerApplication.h"
#include "ServerNet/VServerNet.h"
#include "VRIAServerProject.h"
#include "Kernel/Sources/VChecksumMD5.h"
#include "Kernel/Sources/MurmurHash.h"
#include "JSDebugger/Interfaces/CJSWDebuggerFactory.h"
#include "VRIAServerJSAPI.h"
#include "VRIAServerJSCore.h"

#include "VRIAServerProgressIndicator.h"



#if VERSIONMAC
#include "AuthorizationHelpers.h"
#endif


//#define TEST_MYSQL_CONNECTOR
#ifdef TEST_MYSQL_CONNECTOR
#include "testMySQLConnector.h"
#endif


USING_TOOLBOX_NAMESPACE


const uLONG	kMIN_DATA_CACHE_FLUSH_DELAY			= 60000;	// minimum delay is 1 min
const uLONG kDEFAULT_DATA_CACHE_FLUSH_DELAY		= 900000;	// default delay is 15 min

//** Change those hardcoded constants.

#define DEFAULT_NAME			"noname"

#define	DEFAULT_SERVICE_NAME 	"_http._tcp"

#define DEFAULT_PORT			(80)



// ----------------------------------------------------------------------------


namespace ServerStartupParametersKeys
{
	CREATE_BAGKEY_NO_DEFAULT( defaultAdministratorHttpPort, XBOX::VLong);
	CREATE_BAGKEY_NO_DEFAULT( defaultAdministratorSSLPort, XBOX::VLong);
	CREATE_BAGKEY_NO_DEFAULT( quitServerWhenSolutionIsClosed, XBOX::VBoolean);
	CREATE_BAGKEY_NO_DEFAULT( netDump, XBOX::VBoolean);
}


VRIAServerStartupParameters::VRIAServerStartupParameters()
: fSolutionFile(NULL), fJavaScriptFile(NULL)
{
}


VRIAServerStartupParameters::~VRIAServerStartupParameters()
{
	ReleaseRefCountable( &fSolutionFile);
	ReleaseRefCountable( &fJavaScriptFile);
}


void VRIAServerStartupParameters::SetSolutionToLaunch( XBOX::VFile* inSolutionFile)
{
	CopyRefCountable( &fSolutionFile, inSolutionFile);
}


XBOX::VFile* VRIAServerStartupParameters::GetSolutionToLaunch() const
{
	return fSolutionFile;
}


void VRIAServerStartupParameters::SetAdministratorHttpPort( sLONG inPort)
{
	fBag.SetLong( ServerStartupParametersKeys::defaultAdministratorHttpPort, inPort);
}


bool VRIAServerStartupParameters::GetAdministratorHttpPort( sLONG& outPort) const
{
	return fBag.GetLong( ServerStartupParametersKeys::defaultAdministratorHttpPort, outPort);
}


void VRIAServerStartupParameters::SetAdministratorSSLPort( sLONG inPort)
{
	fBag.SetLong( ServerStartupParametersKeys::defaultAdministratorSSLPort, inPort);
}


bool VRIAServerStartupParameters::GetAdministratorSSLPort( sLONG& outPort) const
{
	return fBag.GetLong( ServerStartupParametersKeys::defaultAdministratorSSLPort, outPort);
}


void VRIAServerStartupParameters::SetQuitServerWhenSolutionIsClosed( bool inQuitServer)
{
	fBag.SetBool( ServerStartupParametersKeys::quitServerWhenSolutionIsClosed, inQuitServer);
}


bool VRIAServerStartupParameters::GetQuitServerWhenSolutionIsClosed( bool& outQuitServer)
{
	return fBag.GetBool( ServerStartupParametersKeys::quitServerWhenSolutionIsClosed, outQuitServer);
}


void VRIAServerStartupParameters::SetJavaScriptFileToExecute( XBOX::VFile* inJavaScriptFile)
{
	CopyRefCountable( &fJavaScriptFile, inJavaScriptFile);
}


XBOX::VFile* VRIAServerStartupParameters::GetJavaScriptFileToExecute() const
{
	return fJavaScriptFile;
}


void VRIAServerStartupParameters::SetNetDump(bool inWithServerNetDump)
{
	fBag.SetBool( ServerStartupParametersKeys::netDump, inWithServerNetDump);
}


bool VRIAServerStartupParameters::GetNetDump(bool& outWithServerNetDump)
{
	return fBag.GetBool( ServerStartupParametersKeys::netDump, outWithServerNetDump);
}


// ----------------------------------------------------------------------------



VRIAServerStartupMessage::VRIAServerStartupMessage( VRIAServerApplication* inServer, VRIAServerStartupParameters *inStartupParameters)
: fServer(inServer) 
{
	fStartupParameters = RetainRefCountable( inStartupParameters);
}


VRIAServerStartupMessage::~VRIAServerStartupMessage()
{
	ReleaseRefCountable( &fStartupParameters);
}


void VRIAServerStartupMessage::DoExecute()
{
	if (fServer != NULL)
	{
		fServer->_OnStartup( fStartupParameters);
	}
}



// ----------------------------------------------------------------------------



VRIAOpenSolutionAsCurrentSolutionMessage::VRIAOpenSolutionAsCurrentSolutionMessage( VRIAServerApplication* inServer, VSolutionStartupParameters *inStartupParameters)
: fServer(inServer) 
{
	fStartupParameters = RetainRefCountable( inStartupParameters);
}


VRIAOpenSolutionAsCurrentSolutionMessage::~VRIAOpenSolutionAsCurrentSolutionMessage()
{
	QuickReleaseRefCountable( fStartupParameters);
}


void VRIAOpenSolutionAsCurrentSolutionMessage::DoExecute()
{
	if (fServer != NULL)
	{
		fServer->_OpenSolutionAsCurrentSolution( fStartupParameters);
	}
}



// ----------------------------------------------------------------------------



class VRIACloseCurrentSolutionMessage : public VMessage
{
public:
			VRIACloseCurrentSolutionMessage( VRIAServerApplication* inServer) : fServer(inServer) {;}
	virtual	~VRIACloseCurrentSolutionMessage() {;}

protected:
	virtual	void DoExecute()
			{
				if (fServer != NULL)
					fServer->_CloseCurrentSolution();
			}

private:
			VRIAServerApplication	*fServer;
};



// ----------------------------------------------------------------------------



class VDataCacheFlushMessage : public VMessage
{
public:
			VDataCacheFlushMessage( VRIAServerApplication* inServer) : fServer(inServer) {;}
	virtual	~VDataCacheFlushMessage() {;}

protected:
	virtual	void DoExecute()
			{
				if (fServer != NULL)
					fServer->_FlushDataCache();
			}

private:
			VRIAServerApplication	*fServer;
};



// ----------------------------------------------------------------------------







// ----------------------------------------------------------------------------


VRIAServerApplication* VRIAServerApplication::sCurrentApplication = NULL;


VRIAServerApplication::VRIAServerApplication()
: fInitCalled(false)
, fInitOK(false)
, fSolution(NULL)
, fIsOpeningOrClosingCurrentSolution(0)
, fLocalizer(NULL)
, fComponent_DB4D(NULL)
, fComponent_LanguageSyntax(NULL)
, fComponent_HTTP(NULL)
, fComponent_Bridge( NULL)
, fDataCacheFlushEnabled(false)
, fDataCacheFlushDelay(kDEFAULT_DATA_CACHE_FLUSH_DELAY)
, fServiceDiscoveryServer(NULL)
, fStartupParameters(NULL)
, fJSContextPool(NULL)
, fJSRuntimeDelegate(NULL)
, fJSContextMgr(NULL)
, indexProgressIndicator(NULL)
, flushProgressIndicator(NULL)
{
	xbox_assert(sCurrentApplication == NULL);
	sCurrentApplication = this;
}


VRIAServerApplication::~VRIAServerApplication()
{
	if (fInitCalled)
	{
		_DeInit();
	}
	
	xbox_assert(sCurrentApplication == this);
	sCurrentApplication = NULL;
}


bool VRIAServerApplication::Init( VProcess::InitOptions inOptions)
{
	bool ok = false;
	
	if (!fInitCalled)
	{
		if (inherited::Init( inOptions))
		{
			fInitCalled = true;
			fInitOK = _Init();
		}
	}
	return fInitOK;
}


XBOX::VFolder* VRIAServerApplication::RetainFolder( XBOX::VProcess::EFolderKind inSelector) const
{
	VFolder *folder = NULL;

	switch( inSelector)
	{
		case eFS_Walib:
			{
				VFilePath path;
				GetWALibraryFolderPath( path);
				folder = new VFolder( path);
				break;
			}

		default:
			folder = inherited::RetainFolder( inSelector);
	}

	return folder;
}


VFolder* VRIAServerApplication::RetainApplicationPackageFolder() const
{
	return RetainFolder( VProcess::eFS_Bundle);
}


VFolder* VRIAServerApplication::RetainApplicationResourcesFolder() const
{
	return RetainFolder( VProcess::eFS_Resources);
}


VFolder* VRIAServerApplication::RetainApplicationDTDsFolder() const
{
	return RetainFolder( VProcess::eFS_DTDs);
}


VFolder* VRIAServerApplication::RetainExecutableFolder() const
{
	return RetainFolder( VProcess::eFS_Executable);
}


VFolder* VRIAServerApplication::RetainNativeComponentsFolder() const
{
	return RetainFolder( VProcess::eFS_NativeComponents);
}


void VRIAServerApplication::GetWALibraryFolderPath( VFilePath& outPath) const
{
	// "walib" folder is at the same level than "resources" folder
	VFolder *folder = RetainApplicationResourcesFolder();
	if (folder != NULL)
	{
		VFilePath folderPath;
		folder->GetPath( outPath);
		outPath = outPath.ToParent();
		outPath = outPath.ToSubFolder( L"walib");
		folder->Release();
	}
}


void VRIAServerApplication::GetWAFrameworkFolderPath( VFilePath& outPath) const
{
	GetWALibraryFolderPath( outPath);
	outPath = outPath.ToSubFolder( L"WAF");
}


VFolder* VRIAServerApplication::RetainUserPreferencesFolder( bool inCreateIfNotExists) const
{
	VFolder *folder = NULL;
	
	VFolder *parent = VFolder::RetainSystemFolder( eFK_UserPreferences, inCreateIfNotExists);
	if (parent != NULL)
	{
		VFilePath path;
		parent->GetPath( path);
		path.ToSubFolder( L"WakandaSoftware");
		path.ToSubFolder( L"Server");
		folder = new VFolder( path);
		if (folder != NULL)
		{
			if (!folder->Exists() && inCreateIfNotExists)
				folder->CreateRecursive();
		}
		parent->Release();
	}
	return folder;
}


VFolder* VRIAServerApplication::RetainSolutionsLinkFilesFolder( bool inCreateIfNotExists) const
{
	VFolder *folder = NULL;
	
	VFolder *parent = RetainUserPreferencesFolder( inCreateIfNotExists);
	if (parent != NULL)
	{
		folder = new VFolder( *parent, L"RecentlyOpened");
		if (folder != NULL)
		{
			if (!folder->Exists() && inCreateIfNotExists)
				folder->Create();
		}
		parent->Release();
	}
	return folder;
}


CDB4DManager* VRIAServerApplication::GetComponentDB4D() const
{
	return fComponent_DB4D;
}


CLanguageSyntaxComponent* VRIAServerApplication::GetComponentLanguageSyntax() const
{
	return fComponent_LanguageSyntax;
}


CHTTPServer* VRIAServerApplication::GetComponentHTTP() const
{
	return fComponent_HTTP;
}


VLocalizationManager* VRIAServerApplication::RetainLocalizer() const
{
	VLocalizationManager *localizer = NULL;
	if (fMutex.Lock())
	{
		localizer = RetainRefCountable( fLocalizer);
		fMutex.Unlock();
	}
	return localizer;
}


VSolutionStartupParameters* VRIAServerApplication::RetainDefaultSolutionStartupParameters() const
{
	VSolutionStartupParameters *startupParams = NULL;

	VFolder *folder = RetainApplicationResourcesFolder();
	if (folder != NULL)
	{
		VFilePath path;
		folder->GetPath( path);
		path.ToSubFolder( L"Default Solution");
		path.SetFileName( L"DefaultSolution", false);
		path.SetExtension( RIAFileKind::kSolutionFileExtension);

		VFile *file = new VFile( path);
		if (file != NULL && file->Exists())
		{
			startupParams = new VSolutionStartupParameters();
			if (startupParams != NULL)
			{
				startupParams->SetStoreInLinkFile( false);
				startupParams->SetSolutionFileToOpen( file);
				startupParams->SetOpenProjectSymbolsTable( false);	// sc 25/05/2012, on Server, do not use the symbols table anymore

				VRIAServerSolutionOpeningParameters openingParams( startupParams);
				openingParams.SetOpeningMode( eSOM_FOR_RUNNING);
				openingParams.SetOpenDefaultSolutionWhenOpeningFails( false);
				openingParams.SetCustomAdministratorAuthType( L"basic");	// sc 15/06/2012 force basic authentication for admin
				openingParams.UpdateStartupParameters( startupParams);
			}
		}
		QuickReleaseRefCountable( file);
		folder->Release();
	}

	return startupParams;
}


VRIAServerStartupParameters* VRIAServerApplication::RetainStartupParameters() const
{
	return RetainRefCountable( fStartupParameters);
}


XBOX::VError VRIAServerApplication::OpenSolutionAsCurrentSolution( const XBOX::VFilePath& inDesignSolutionFilePath)
{
	VError err = VE_OK;
	
	VSolutionStartupParameters *startupParams = new VSolutionStartupParameters();

	if (startupParams != NULL)
	{
		VFile *file = new VFile( inDesignSolutionFilePath);
		startupParams->SetSolutionFileToOpen( file);
		startupParams->SetOpenProjectSymbolsTable( false);	// sc 25/05/2012, on Server, do not use the symbols table anymore
		QuickReleaseRefCountable( file);
	}

	err = OpenSolutionAsCurrentSolution( startupParams);

	QuickReleaseRefCountable( startupParams);

	return err;
}


XBOX::VError VRIAServerApplication::OpenSolutionAsCurrentSolution( VSolutionStartupParameters *inStartupParameters)
{
	VError err = VE_OK;

	VRIAOpenSolutionAsCurrentSolutionMessage *msg = new VRIAOpenSolutionAsCurrentSolutionMessage( this, inStartupParameters);
	if (msg != NULL)
	{
		msg->PostTo( VTaskMgr::Get()->GetMainTask());
		msg->Release();
	}

	return err;
}


VError VRIAServerApplication::CloseCurrentSolution()
{
	VError err = VE_OK;

	VRIACloseCurrentSolutionMessage *msg = new VRIACloseCurrentSolutionMessage( this);
	if (msg != NULL)
	{
		msg->PostTo( VTaskMgr::Get()->GetMainTask());
		msg->Release();
	}
	return err;
}


VRIAServerSolution* VRIAServerApplication::RetainCurrentSolution() const
{
	VRIAServerSolution *solution = NULL;
	if (fSolutionMutex.Lock())
	{
		solution = RetainRefCountable( fSolution);
		fSolutionMutex.Unlock();
	}
	return solution;
}


bool VRIAServerApplication::IsCurrentSolution( VRIAServerSolution *inSolution) const
{
	bool result = false;

	if (fSolutionMutex.Lock())
	{
		result = (inSolution == fSolution);
		fSolutionMutex.Unlock();
	}

	return result;
}


VRIAServerSolution* VRIAServerApplication::OpenAndRetainSolutionForMaintenance( XBOX::VError& outError,  VSolutionStartupParameters *inStartupParameters)
{
	outError = VE_OK;

	VRIAServerSolution *solution = NULL;

	VRIAServerSolutionOpeningParameters openingParams( inStartupParameters);
	assert(openingParams.GetOpeningMode() == eSOM_FOR_MAINTENANCE);
	solution = VRIAServerSolution::OpenSolution( outError, inStartupParameters);

	return solution;
}


void VRIAServerApplication::SetDataCacheFlushEnabled( bool inEnabled)
{
	if (fDataCacheMutex.Lock())
	{
		if (inEnabled != fDataCacheFlushEnabled)
		{
			fDataCacheFlushEnabled = inEnabled;
			if (fDataCacheFlushEnabled)
			{
				if (fDataCacheFlushDelay < kMIN_DATA_CACHE_FLUSH_DELAY)
					fDataCacheFlushDelay = kMIN_DATA_CACHE_FLUSH_DELAY;
				
				VDataCacheFlushMessage *msg = new VDataCacheFlushMessage( this);
				if (msg != NULL)
				{
					msg->PostTo( VTaskMgr::Get()->GetMainTask(), false, fDataCacheFlushDelay);
					msg->Release();
				}
			}
		}
		fDataCacheMutex.Unlock();
	}
}


bool VRIAServerApplication::IsDataCacheFlushEnabled() const
{
	bool enabled = false;
	if (fDataCacheMutex.Lock())
	{
		enabled = fDataCacheFlushEnabled;
		fDataCacheMutex.Unlock();
	}
	return enabled;
}


void VRIAServerApplication::SetDataCacheFlushDelay( sLONG inDelay)
{
	if (fDataCacheMutex.Lock())
	{
		fDataCacheFlushDelay = (inDelay < kMIN_DATA_CACHE_FLUSH_DELAY) ? kMIN_DATA_CACHE_FLUSH_DELAY : inDelay;
		fDataCacheMutex.Unlock();
	}
}


sLONG VRIAServerApplication::GetDataCacheFlushDelay() const
{
	sLONG delay = 0;
	if (fDataCacheMutex.Lock())
	{
		delay = fDataCacheFlushDelay;
		fDataCacheMutex.Unlock();
	}
	return delay;
}


VRIAServerJSContextMgr* VRIAServerApplication::GetJSContextMgr() const
{
	return fJSContextMgr;
}


XBOX::VJSGlobalContext* VRIAServerApplication::RetainJSContext( XBOX::VError& outError, bool inReusable)
{
	return (fJSContextPool != NULL) ? fJSContextPool->RetainContext( outError, inReusable) : NULL;
}


XBOX::VError VRIAServerApplication::ReleaseJSContext( XBOX::VJSGlobalContext* inContext)
{
	VError err = VE_OK;
	
	if (fJSContextPool != NULL)
		err = fJSContextPool->ReleaseContext( inContext);

	return err;
}


void VRIAServerApplication::DoRun()
{
	fprintf ( stdout, "Welcome to Wakanda Server!\n\n" );
	inherited::DoRun();
}


void VRIAServerApplication::DoQuit()
{
	// Close the current solution
	VError err = _CloseCurrentSolution();

	inherited::DoQuit();
}


XBOX::IJSRuntimeDelegate* VRIAServerApplication::GetRuntimeDelegate()
{
	return fJSRuntimeDelegate;
}


XBOX::VError VRIAServerApplication::InitializeJSContext( XBOX::VJSGlobalContext* inContext)
{
	VError err = VE_OK;

	if (inContext != NULL)
	{
		err = VRIAJSRuntimeContext::InitializeJSContext( inContext, NULL);
	}
	return err;
}


XBOX::VError VRIAServerApplication::UninitializeJSContext( XBOX::VJSGlobalContext* inContext)
{
	VError err = VE_OK;
	
	if (inContext != NULL)
	{
		err = VRIAJSRuntimeContext::UninitializeJSContext( inContext);
	}
	return err;
}


bool VRIAServerApplication::_Init()
{
	bool ok = false;
	
    #if !VERSION_LINUX
	// pp init gdiplus
	VGraphicContext::Init();

	VPicture::Init(NULL, NULL);
	//Force le lien avec la Dll Graphics
	XBOX::VPicture* tmp=new XBOX::VPicture();
	delete tmp;
	#endif

	SetMessagingTask( VTask::GetCurrentID());
	
	// Init KernelIPC lib
	ok = (VComponentManager::Init() == 1);
	if (ok)
		ok = VCommand::Init();
	
	// Init XML lib
	if (ok)
		VXMLParser::Init();
	if (ok)
		VUTIManager::Init();

	VFolder *resFolder = RetainApplicationResourcesFolder();

	// Init localization manager
	if (ok)
	{
		ok = (fLocalizer = new VLocalizationManager( DC_ENGLISH_US)) != NULL;
		if (ok)
		{
			ok = fLocalizer->LoadDefaultLocalizationFolders( resFolder);
		}
	}

#if VERSIONWIN || VERSION_LINUX
	// Load BasicUTIs.plist
	if (ok)
	{
		VFile basicUTIsPListFile( *resFolder, CVSTR( "BasicUTIs.plist"));
		if (basicUTIsPListFile.Exists())
		{
			ok = VUTIManager::GetUTIManager()->LoadXMLFile( &basicUTIsPListFile);
		}
	}
	
	// Load Info.plist
	if (ok)
	{
		VFile infoPListFile( *resFolder, CVSTR( "Info.plist"));
		if (infoPListFile.Exists())
		{
			ok = VUTIManager::GetUTIManager()->LoadXMLFile( &infoPListFile);
		}
	}
#endif

	// Init errors manager
	if (ok)
	{
		VErrorBase::RegisterLocalizer( kXTOOLBOX_SIGNATURE, fLocalizer);
		VErrorBase::RegisterLocalizer( kSERVER_NET_SIGNATURE, fLocalizer);
		VErrorBase::RegisterLocalizer( kCOMPONENT_XML, fLocalizer);
		VErrorBase::RegisterLocalizer( kJAVASCRIPT_SIGNATURE, fLocalizer);
		VErrorBase::RegisterLocalizer( kRIA_OSTYPE_SIGNATURE, fLocalizer);
		VErrorBase::RegisterLocalizer( kXHR_SIGNATURE, fLocalizer);
		VErrorBase::RegisterLocalizer( 'CWRP' /*Curl Wrapper, used in XHR impl.*/ , fLocalizer);
	}

	// Load all built-in components here. Built-in components may be used by the ones in external dynamic libraries
	if (ok)
	{
		sLONG kCOMPONENT_TYPE_COUNT_BRIDGE = 1;
		CImpDescriptor kCOMPONENT_TYPE_LIST_BRIDGE [ ] = { { CRIAServerComponentBridge::Component_Type, VImpCreator<VRIAServerComponentBridge>::CreateImp } };
		new VComponentLibrary( kCOMPONENT_TYPE_LIST_BRIDGE, kCOMPONENT_TYPE_COUNT_BRIDGE);
		VComponentManager::RegisterComponentCreator( CRIAServerComponentBridge::Component_Type, VRIAServerComponentBridge::ComponentCreator, true);
		fComponent_Bridge = VComponentManager::RetainComponent<CRIAServerComponentBridge>();
		ok = (fComponent_Bridge != NULL);
	}

	// Init components manager
	if (ok)
	{
		VFolder* componentsFolder = RetainNativeComponentsFolder();
	
		if (testAssert( componentsFolder != NULL))
		{
			for (VFolderIterator i( componentsFolder) ; i.IsValid() ; ++i) 
			{
				VString	libName;
				i->GetName( libName);
			#if VERSIONDEBUG
				// register only needed components (the folder contains others 4D products components)
				if (	libName == CVSTR("DB4DDebug.bundle")
					||	libName == CVSTR("HttpServerDebug.bundle")
					||	libName == CVSTR("UsersAndGroupsDebug.bundle")
					||	libName == CVSTR("SecurityManagerDebug.bundle")
					||	libName == CVSTR("ZipDebug.bundle")
					||	libName == CVSTR("MySQLConnectorDebug.bundle")					
					||	libName == CVSTR("LanguageSyntaxDebug.bundle") )
			#endif
				{
					VError error = VComponentManager::RegisterComponentLibrary( i->GetPath());
					if (error == VE_OK)
						DebugMsg( "Loaded %V\n", &libName);
				}
			}
		}
		ReleaseRefCountable( &componentsFolder);
	}

	// Init DB4D component
	if (ok)
	{
		ok = (fComponent_DB4D = VComponentManager::RetainComponentOfType<CDB4DManager>()) != NULL;
		if (fComponent_DB4D != NULL)
		{
			indexProgressIndicator = new VRIAServerProgressIndicator(RIASERVER_PROGRESS_INDEX_USERINFO, GetPublishEventSignal() );
			flushProgressIndicator = new VRIAServerProgressIndicator(RIASERVER_PROGRESS_FLUSH_USERINFO, GetPublishEventSignal() );
			GetPublishEventSignal()->Connect(this, XBOX::VTask::GetCurrent(), &VRIAServerApplication::PublishServiceRecordEvent);
			
			fComponent_DB4D->SetRunningMode( DB4D_RunningWakanda);	// important so that db4D uses proper file extension
			fComponent_DB4D->SetDefaultProgressIndicator_For_Indexes(indexProgressIndicator);
			fComponent_DB4D->SetDefaultProgressIndicator_For_DataCacheFlushing(flushProgressIndicator);
		}
	}
	
	// Init Language Syntax Component
	if (ok)
		ok = (fComponent_LanguageSyntax = VComponentManager::RetainComponentOfType< CLanguageSyntaxComponent >()) != NULL;

	// Init HTTP Server Component
	if (ok)
		ok = (fComponent_HTTP = VComponentManager::RetainComponent< CHTTPServer >()) != NULL;
	
	if (ok)
		VTaskMgr::Get()->SetNeedsCheckSystemMessages( true);
		
	// Init ServerNet
	if (ok)
		VServerNetManager::Init(NULL /*ICriticalError*/, IpAnyIsV6 /*IP V4 or V6 policy*/);
	
	// Init design solution manager
	if (ok)
		VSolutionManager::Init();

	// Init messages logger
	if (ok)
		ok = VRIAMessageLogger::Init();
	
	// Init service discovery.
	if (ok) {
		
		if ((fServiceDiscoveryServer = VServiceDiscoveryServer::GetInstance()) == NULL) 
			
			ok = false;

		else

			fServiceDiscoveryServer->Start();
	}
	
	if (ok)
	{
		fJSContextMgr = new VRIAServerJSContextMgr();
		ok = (fJSContextMgr != NULL);
	}

	if (ok)
	{
		VJSWorker::SetDelegate( fJSContextMgr);
	}

	if (fComponent_Bridge != NULL)
	{
		VRIAServerComponentBridge *bridge = XBOX::VImpCreator<VRIAServerComponentBridge>::GetImpObject(fComponent_Bridge);
		if ( fComponent_DB4D != NULL )
		{
			fComponent_DB4D->SetGraphicsInterface( bridge);
			fComponent_DB4D->SetApplicationInterface( bridge);
		}
	}


	if (ok)
		ok = VJSContextPool::Init();	// sc 20/04/2011, initialize the global object class here in case of a JavaScript context is created outside the VJSContextPool.

	QuickReleaseRefCountable( resFolder);
	
#if VERSIONMAC && USE_HELPER_TOOLS
	if (ok)
	{
		AuthorizationHelpers::Init();

		// Helper Tools is not installed. Let's try to do it...
		if (!AuthorizationHelpers::IsHelperToolInstalled())
			AuthorizationHelpers::InstallHelperTool();
	}
#endif

#ifdef TEST_MYSQL_CONNECTOR

	MySQLConnectorBench();

	testMySQLConnectorCreateSessionWithValidParams();

	testMySQLConnectorCreateSessionWithInCorrectPassword();

	testMySQLConnectorExecuteQuerySelect();

	testMySQLConnectorStatement();

	testMySQLConnectorPreparedStatementWithIntegerParam();

	testMySQLConnectorPreparedStatementWithStringParam();

	testMySQLConnectorPreparedStatementWithDateParam();

	testMySQLConnectorPreparedStatementWithTypeTinyInt();

	testMySQLConnectorPreparedStatementWithTypeSmallInt();

	testMySQLConnectorPreparedStatementWithTypeMediumInt();

	testMySQLConnectorPreparedStatementWithTypeInt();

	testMySQLConnectorPreparedStatementWithTypeBigInt();
	
	testMySQLConnectorPreparedStatementWithTypeFloat();

	testMySQLConnectorPreparedStatementWithTypeDouble();

	testMySQLConnectorPreparedStatementWithTypeString();

	testMySQLConnectorPreparedStatementWithTypeDateTime();

	testMySQLConnectorPreparedStatementWithTypeBlob();

#endif

	return ok;
}


void VRIAServerApplication::_DeInit()
{
	xbox_assert(fSolution == NULL);

	VJSWorker::SetDelegate( NULL);

	delete fJSContextMgr;
	fJSContextMgr = NULL;

	if (fServiceDiscoveryServer != NULL) {
		
		fServiceDiscoveryServer->KillAndWaitTermination();
		fServiceDiscoveryServer->Release();

		fServiceDiscoveryServer = NULL;	
		
	}
 
	ReleaseRefCountable( &fStartupParameters);

	// DeInit the component bridge
	if (fComponent_Bridge != NULL)
	{
		fComponent_Bridge->StopSharedWorkerPool();
		fComponent_Bridge->StopSharedSelectIOPool();
	}
	
	// Stop the language syntax component
	if (fComponent_LanguageSyntax != NULL)
		fComponent_LanguageSyntax->Stop();
	
	// DeInit messages logger
	VRIAMessageLogger::DeInit();

	// DeInit design solution manager
	VSolutionManager::DeInit();

	VServerNetManager::DeInit();
	
	// DeInit native components
	ReleaseRefCountable( &fComponent_DB4D);
	ReleaseRefCountable( &fComponent_LanguageSyntax);
	ReleaseRefCountable( &fComponent_HTTP);
	ReleaseRefCountable( &fComponent_Bridge);	// must be released after db4d that uses it

	// DeInit errors manager
	VErrorBase::UnregisterLocalizer( kRIA_OSTYPE_SIGNATURE);
	
	// DeInit localization manager
	ReleaseRefCountable( &fLocalizer);

	// Deinit XML lib
	VUTIManager::DeInit();
	VXMLParser::DeInit();
	
	// Deinit KernelIPC lib
	VCommand::DeInit();
	VComponentManager::DeInit();
	
    #if !VERSION_LINUX
	//JQ 13/12/2010: fixed crash
	VGraphicContext::DeInit();
	#endif

	// Finally, kill remaining tasks
	sLONG taskCount = 0;
	
	VTaskMgr::Get()->KillAllTasks( 3000);
	
	std::vector<VString> taskNames;
	std::vector< VRefPtr<VTask> > tasks;
	VTaskMgr::Get()->GetTasks( tasks);
	for (std::vector< VRefPtr<VTask> >::iterator i = tasks.begin() ; i != tasks.end() ; ++i)
	{
		if ( ((*i)->GetState() != TS_DEAD) && !(*i)->IsMain())
		{
			VString taskName;
			(*i)->GetName( taskName);
			taskNames.push_back( taskName);
			++taskCount;
		}
	}
	
	if (taskCount > 0)
	{
		for (std::vector<VString>::iterator iter = taskNames.begin() ; iter != taskNames.end() ; ++iter)
		{
			VString msg;
			msg.FromCString( "Task \"");
			msg.AppendString( *iter);
			msg.AppendCString( "\" is still running.\n");
			DebugMsg( msg);
		}
	}

	GetPublishEventSignal()->Disconnect(this);
	
	indexProgressIndicator->Release();
	flushProgressIndicator->Release();

#if VERSIONMAC && USE_HELPER_TOOLS
	AuthorizationHelpers::DeInit();
#endif
}


void VRIAServerApplication::_OnStartup( VRIAServerStartupParameters *inStartupParameters)
{
	bool continueRunning = false;

	if (testAssert(fStartupParameters == NULL))
	{
		CopyRefCountable( &fStartupParameters, inStartupParameters);
		if (fStartupParameters != NULL)
		{
			VSolutionStartupParameters *solutionStartupParameters = NULL;
			
			VFile *solutionFile = fStartupParameters->GetSolutionToLaunch();
			if (solutionFile != NULL)
			{
				solutionStartupParameters = new VSolutionStartupParameters();
				if (solutionStartupParameters != NULL)
				{
					VRIAServerSolutionOpeningParameters openingParams( solutionStartupParameters);
					openingParams.SetOpeningMode( eSOM_FOR_RUNNING);
					openingParams.UpdateStartupParameters( solutionStartupParameters);
					solutionStartupParameters->SetSolutionFileToOpen( solutionFile);
					solutionStartupParameters->SetOpenProjectSymbolsTable( false);	// sc 25/05/2012, on Server, do not use the symbols table anymore
				}
			}
			else
			{
				VFile *jsFile = fStartupParameters->GetJavaScriptFileToExecute();
				if (jsFile != NULL)
				{
					VError err = VE_OK;

					assert(fJSContextPool == NULL && fJSRuntimeDelegate == NULL);

					VFolder *parentFolder = jsFile->RetainParentFolder();
					
					fJSRuntimeDelegate = new VRIAServerJSRuntimeDelegate( parentFolder);
					if (fJSRuntimeDelegate != NULL)
					{
						fJSContextPool = fJSContextMgr->CreateJSContextPool( err, this);
						if ((err == VE_OK) && (fJSContextPool != NULL))
						{
							// Module support: require.js must be included into each JavaScript context
							VFilePath requirePath;
							GetWAFrameworkFolderPath( requirePath);
							requirePath.ToSubFolder( L"Core");
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
								ThrowError( VE_RIA_JS_FILE_NOT_FOUND, &CVSTR("require.js"), NULL);
							}
						}
						else
						{
							err = ThrowError( VE_MEMORY_FULL);
						}

						if (err == VE_OK)
						{
							VJSGlobalContext *globalContext = RetainJSContext( err, false);
							if (globalContext != NULL)
							{
								if (err == VE_OK)
								{
									VValueSingle *result = NULL;
									StErrorContextInstaller errorContext;

									globalContext->EvaluateScript( jsFile, &result, true);

									if (errorContext.GetLastError() != VE_OK)
									{
										VErrorContext *context = errorContext.GetContext();
										if (context != NULL)
										{
											VString errorMessage;
											for (std::vector<VRefPtr<VErrorBase> >::const_iterator iter = context->GetErrorStack().begin() ; iter != context->GetErrorStack().end() ; ++iter)
											{
												(*iter)->GetErrorDescription( errorMessage);
												errorMessage.AppendUniChar( L'\n');
												StStringConverter<char> stringConverter( VTC_StdLib_char);
												fputs( stringConverter.ConvertString( errorMessage), stdout);
											}
										}
									}
									else if (result != NULL)
									{
										VString stringResult;
										result->GetString( stringResult);
										stringResult.AppendUniChar( L'\n');
										StStringConverter<char> stringConverter( VTC_StdLib_char);
										fputs( stringConverter.ConvertString( stringResult), stdout);
									}
								}

								err = ReleaseJSContext( globalContext);
								globalContext = NULL;
							}

							fJSContextPool->SetEnabled( false);
							fJSContextPool->Clear();

							delete fJSContextPool;
							fJSContextPool = NULL;
						}

						delete fJSRuntimeDelegate;
						fJSRuntimeDelegate = NULL;
					}
					else
					{
						err = ThrowError( VE_MEMORY_FULL);
					}
					
					ReleaseRefCountable( &parentFolder);
				}
				else
				{
					solutionStartupParameters = RetainDefaultSolutionStartupParameters();
				}
			}

			if (solutionStartupParameters != NULL)
			{
				VError err = _OpenSolutionAsCurrentSolution( solutionStartupParameters);
				continueRunning = (err == VE_OK);	// sc 13/02/2012, quit the server if none solution is opened
			}

			ReleaseRefCountable( &solutionStartupParameters);
		}
	}

	if (!continueRunning)
		QuitAsynchronously();
}


VError VRIAServerApplication::_OpenSolutionAsCurrentSolution( VSolutionStartupParameters *inStartupParameters)
{
	xbox_assert(VTaskMgr::Get()->GetCurrentTaskID() == VTaskMgr::Get()->GetMainTask()->GetID());

	VError err = VE_OK;

	if (fIsOpeningOrClosingCurrentSolution == 0)	// sc 21/06/2012 reentrance safeguard
	{
		++fIsOpeningOrClosingCurrentSolution;

		// first, close previous opened solution
		// sc 21/01/2010, to avoid dead locks, never lock the solution mutex during the solution stopping.
		if (fSolution != NULL)
		{
			VSolution *designSolution = fSolution->GetDesignSolution();
			if (designSolution != NULL)
			{
				designSolution->StopWatchingFileSystem();
				designSolution->StopUpdatingSymbolTable();
			}

			err = fSolution->Stop();
			xbox_assert(err == VE_OK);
		}

		if (fSolutionMutex.Lock())
		{
			if (fSolution != NULL)
			{
				VString solutionName;
				fSolution->GetName( solutionName );
				err = fSolution->Close();
				_WithdrawServiceRecord(DEFAULT_SERVICE_NAME, solutionName);
				xbox_assert(err == VE_OK);
				ReleaseRefCountable( &fSolution);
			}

			VRIAServerSolution *solution = NULL;
			
			VRIAServerSolutionOpeningParameters openingParams( inStartupParameters);
			sLONG adminHttpPort = -1, adminSSLPort = -1;
			
			assert(openingParams.GetOpeningMode() == eSOM_FOR_RUNNING);
			if (fStartupParameters->GetAdministratorHttpPort( adminHttpPort))
				openingParams.SetCustomAdministratorHttpPort( adminHttpPort);
			if (fStartupParameters->GetAdministratorSSLPort( adminSSLPort))
				openingParams.SetCustomAdministratorSSLPort( adminSSLPort);
			openingParams.UpdateStartupParameters( inStartupParameters);

			solution = VRIAServerSolution::OpenSolution( err, inStartupParameters);

			if (err == VE_OK)
			{
				if (solution != NULL)
				{
					// sc 10/02/2010 keep informations about recent opened solutions: save the startup parameters in the solution link file
					if ((inStartupParameters != NULL) && inStartupParameters->GetStoreInLinkFile())
					{
						VString name;
						solution->GetName( name);
						SaveSolutionStartupParametersToLinkFile( name, *inStartupParameters);
					}

					VSolution *designSolution = solution->GetDesignSolution();
					if (designSolution != NULL)
					{
						designSolution->StartWatchingFileSystem();
						if ((inStartupParameters != NULL) ? inStartupParameters->GetOpenProjectSymbolsTable() : true)
							designSolution->StartUpdatingSymbolTable();
					}
					
					err = solution->Start();
					if (err != VE_OK)
					{
						// sc 19/01/2011 if the solution started with errors, the solution must be stopped
						designSolution->StopWatchingFileSystem();
						designSolution->StopUpdatingSymbolTable();
						solution->Stop();
					}
				}
			}

			if (err == VE_OK)
			{
				fSolution = solution;
			}
			else
			{
				if (solution != NULL)
				{
					solution->Close();
					ReleaseRefCountable( &solution);
				}
			}

			if ((fSolution == NULL) && openingParams.GetOpenDefaultSolutionWhenOpeningFails())
			{
				VSolutionStartupParameters *startupParams  = RetainDefaultSolutionStartupParameters();
				OpenSolutionAsCurrentSolution( startupParams);
				QuickReleaseRefCountable( startupParams);
			}

			
			if (fSolution != NULL)
				_PublishServiceRecord(DEFAULT_SERVICE_NAME);

			fSolutionMutex.Unlock();
		}

		--fIsOpeningOrClosingCurrentSolution;
	}
	else
	{
		err = vThrowError( VE_RIA_CURRENT_SOLUTION_ALREADY_BEING_OPENED);
	}

	return err;
}

VError VRIAServerApplication::_CloseCurrentSolution()
{
	xbox_assert(VTaskMgr::Get()->GetCurrentTaskID() == VTaskMgr::Get()->GetMainTask()->GetID());
	
	VError err = VE_OK;

	if (fIsOpeningOrClosingCurrentSolution == 0)	// sc 21/06/2012 reentrance safeguard
	{
		++fIsOpeningOrClosingCurrentSolution;

		// sc 21/06/2012, to avoid dead locks, never lock the solution mutex during the solution stopping.
		if (fSolution != NULL)
		{
			VSolution *designSolution = fSolution->GetDesignSolution();
			if (designSolution != NULL)
			{
				designSolution->StopWatchingFileSystem();
				designSolution->StopUpdatingSymbolTable();
			}

			VJSGlobalContext::AbortAllDebug ( );

			err = fSolution->Stop();

			xbox_assert(err == VE_OK);
		}

		if (fSolutionMutex.Lock())
		{
			if (fSolution != NULL)
			{
				VString solutionName;
				fSolution->GetName( solutionName );
				err = fSolution->Close();
				_WithdrawServiceRecord(DEFAULT_SERVICE_NAME, solutionName);
				xbox_assert(err == VE_OK);
				ReleaseRefCountable( &fSolution);
			}

			fSolutionMutex.Unlock();
		}

		--fIsOpeningOrClosingCurrentSolution;
	}
	else
	{
		err = vThrowError( VE_RIA_CURRENT_SOLUTION_ALREADY_BEING_CLOSED);
	}

	return err;
}

void VRIAServerApplication::_FlushDataCache()
{
	xbox_assert(VTaskMgr::Get()->GetCurrentTaskID() == VTaskMgr::Get()->GetMainTask()->GetID());

	if (fDataCacheMutex.Lock())
	{
		if (fDataCacheFlushEnabled)
		{
			if (fComponent_DB4D != NULL)
				fComponent_DB4D->FlushCache( false);

			VDataCacheFlushMessage *msg = new VDataCacheFlushMessage( this);
			if (msg != NULL)
			{
				msg->PostTo( VTaskMgr::Get()->GetMainTask(), false, fDataCacheFlushDelay);
				msg->Release();
			}
		}
		fDataCacheMutex.Unlock();
	}
}

void VRIAServerApplication::_PublishServiceRecord (const XBOX::VString &inServiceName)
{
	if (fPublishMutex.TryToLock())
	{
		if (NULL != fSolution)
		{
			VServiceRecord		serviceRecord;

			// MD5 sum of solution path
			VValueBag::StKey	solutionPathKey(CVSTR("solutionPosixPathHash"));
			VFilePath			solutionFilePath;
			VString				solutionPosixPath, solutionPosixPathHash;

			fSolution->GetDesignSolution()->GetSolutionFilePath(solutionFilePath);
			solutionFilePath.GetPosixPath(solutionPosixPath);
			VChecksumMD5::GetChecksumFromStringUTF8Hexa(solutionPosixPath, solutionPosixPathHash);
			serviceRecord.fValueBag.SetString(solutionPathKey, solutionPosixPathHash);

			// Calculate server process ID
			VValueBag::StKey	serverPIDKey(CVSTR("serverPID"));
			VLong				processID(VProcess::GetSystemID());
			VString				strProcessID;

			processID.GetString(strProcessID);
			serviceRecord.fValueBag.SetString(serverPIDKey, strProcessID);

			// Calculate admin project IP and port
			VectorOfApplication appCollection;
			VString				adminIP, adminPattern, adminHostName, publishName;
			sLONG				adminPort = 0;
			sLONG				adminSSLPort = 0;

			fSolution->GetApplications(appCollection);
			for (VectorOfApplication_iter iter = appCollection.begin() ; iter != appCollection.end() ; ++iter)
			{
				if ((*iter)->IsAdministrator())
					(*iter)->GetPublicationSettings( adminHostName, adminIP, adminPort, adminSSLPort, adminPattern, publishName);
			}

			// Construct a service record
			if (adminPort)
			{				
				VString				providerName;
			
				fSolution->GetName(providerName);
				if ( providerName.IsEmpty() )
					providerName = DEFAULT_NAME;

				// Retrieve first IPv4 and IPv6 address, use them as addresses published by server.
				// Should actually let user decide which interface to use.

				serviceRecord.fIPv4Address = serviceRecord.fIPv6Address = "";

				VNetAddressList					addressList;
				VNetAddressList::const_iterator	addressIt;
				
				//IPv6-TODO - On ne veut qu'une addresse, et de préférence pas loopback

				addressList.FromLocalInterfaces();
				for (addressIt = addressList.begin(); addressIt != addressList.end(); addressIt++) {

					
					if(addressIt->IsLoopBack() /*|| addressIt->IsLocal()*/ )
						continue;
					
					sLONG	version;

					if (addressIt->IsV4()) {

						if (!serviceRecord.fIPv4Address.GetLength()) {
							
							serviceRecord.fIPv4Address = addressIt->GetIP(&version);
							xbox_assert(version == 4);

						}

					} else {

						xbox_assert(addressIt->IsV6());
						if (!serviceRecord.fIPv6Address.GetLength()) {
							
							serviceRecord.fIPv6Address = addressIt->GetIP(&version);
							xbox_assert(version == 6);
						}

					}

				}

				xbox_assert(serviceRecord.fIPv4Address.GetLength() || serviceRecord.fIPv6Address.GetLength());

				serviceRecord.fPort = adminPort;

				serviceRecord.fServiceName = inServiceName;
				serviceRecord.fProviderName = publishName.GetLength() ? publishName : providerName;

				serviceRecord.SetHostName();
				if (providerName.EqualToString("DefaultSolution", true))
				{
					XBOX::VString	suffix;

					serviceRecord.fHostName.GetSubString(1, serviceRecord.fHostName.GetLength() - 6, suffix);
					serviceRecord.fProviderName.AppendString("-");							
					serviceRecord.fProviderName.AppendString(suffix);
				}				

				VValueBag::StKey	httpPath(CVSTR("path"));

				serviceRecord.fValueBag.SetString("path", "index.html");
				VString adminSSLPortStr;
				adminSSLPortStr.FromLong( adminSSLPort );
				serviceRecord.fValueBag.SetString("_SSLPORT", adminSSLPortStr );	

				fServiceDiscoveryServer->AddServiceRecord(serviceRecord);	
				
				fServiceDiscoveryServer->PublishServiceRecord(serviceRecord.fServiceName, serviceRecord.fProviderName);

				VNetAddress	address(serviceRecord.fIPv4Address);
				uLONG		binaryAddress;

				address.FillIpV4((IP4 *) &binaryAddress);

				serviceRecord.fValueBag.SetLong("_ADDRESS", binaryAddress);	
				serviceRecord.fValueBag.SetString("_ADDRESS_IPV6", serviceRecord.fIPv6Address );

				VString adminPortStr;
				adminPortStr.FromLong( serviceRecord.fPort );
				serviceRecord.fValueBag.SetString("_PORT", adminPortStr );	
				serviceRecord.fValueBag.SetString("_NAME", serviceRecord.fProviderName);

				// DB index and flush infos
				VLong indexProgress, indexSessions, flushProgress, flushSessions;

				GetProgressInfos(RIASERVER_PROGRESS_INDEX_USERINFO, indexProgress, indexSessions);
				serviceRecord.fValueBag.SetLong("_INDEX", indexProgress);
				serviceRecord.fValueBag.SetLong("_INDEX_SESSIONS", indexSessions);
				GetProgressInfos(RIASERVER_PROGRESS_FLUSH_USERINFO, flushProgress, flushSessions);
				serviceRecord.fValueBag.SetLong("_FLUSH", flushProgress);
				serviceRecord.fValueBag.SetLong("_FLUSH_SESSIONS", flushSessions);

				// Storing server executable path
				VFolder*	appFolder = VProcess::Get()->RetainFolder( VProcess::eFS_Bundle);
				VFilePath	exeFilePath = appFolder->GetPath();
				
#if VERSIONWIN
				exeFilePath = exeFilePath.ToSubFile( CVSTR( "Wakanda Server.exe" ) );
#endif
				serviceRecord.fValueBag.SetString("_EXE_PATH", exeFilePath.GetPath() );
				appFolder->Release();

				// Writing publish file
				VFileStream	*fileStream;
				VFile		*file;

				if ((file = VSolution::RetainRunningServerFile()) != NULL)
				{
					file->Create(FCR_Overwrite);
					if ((fileStream = new XBOX::VFileStream(file)) != NULL)
					{
						fileStream->OpenWriting();					
						serviceRecord.fValueBag.WriteToStream(fileStream);				
						fileStream->CloseWriting(true);
						delete fileStream;
					}				
					delete file;
				}
			}
		}

		fPublishMutex.Unlock();
	}
}

void VRIAServerApplication::_WithdrawServiceRecord (const XBOX::VString &inServiceName, const XBOX::VString &inProviderName)
{
	VString	providerName( inProviderName );
	VFile	*file;

	if (NULL != fSolution)
	{
		if (providerName.IsEmpty())
			providerName = DEFAULT_NAME;

		if (providerName.EqualToString("DefaultSolution", true))
		{
			VServiceRecord serviceRecord;
			serviceRecord.SetHostName();
			XBOX::VString	suffix;

			serviceRecord.fHostName.GetSubString(1, serviceRecord.fHostName.GetLength() - 6, suffix);
			providerName.AppendString("-");							
			providerName.AppendString(suffix);
		}				

		fServiceDiscoveryServer->RemoveServiceRecord(inServiceName, providerName);	//** Check successful completion.
		
		if ((file = VSolution::RetainRunningServerFile()) != NULL)
		{	
			file->Delete();
			delete file;
		}
	}
}

void VRIAServerApplication::PublishServiceRecordEvent ()
{
	_PublishServiceRecord(DEFAULT_SERVICE_NAME);
}

void VRIAServerApplication::GetProgressInfos(const VString& inServiceName, VLong& outProgressInfos, VLong& outProgressSessions)
{
	VString serviceName(inServiceName);
	VValueBag bag;

	outProgressInfos = -1;
	outProgressSessions = -1;

	VProgressManager::GetProgressInfo(bag, &serviceName);

	if ( ! bag.IsEmpty() )
	{
		VBagArray *progressBag = bag.GetElements("ProgressInfo");
		if (progressBag)
		{
			VValueBag *resultValueBag = progressBag->GetNth(1);
			if (resultValueBag)
			{
				resultValueBag->GetAttribute("percent", outProgressInfos);
				resultValueBag->GetAttribute("sessions", outProgressSessions);
			}
		}
	}
}



// ----------------------------------------------------------------------------



VRIAServerJSRuntimeDelegate::VRIAServerJSRuntimeDelegate( XBOX::VFolder *inScriptFolder)
{
	fScriptFolder = RetainRefCountable( inScriptFolder);
}


VRIAServerJSRuntimeDelegate::~VRIAServerJSRuntimeDelegate()
{
	ReleaseRefCountable( &fScriptFolder);
}


VFolder* VRIAServerJSRuntimeDelegate::RetainScriptsFolder()
{
	return RetainRefCountable( fScriptFolder);
}


VProgressIndicator* VRIAServerJSRuntimeDelegate::CreateProgressIndicator( const VString& inTitle)
{
	return NULL;
}



//**

