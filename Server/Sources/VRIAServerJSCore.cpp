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
#include "VRIAServerApplication.h"
#include "VRIAServerSolution.h"
#include "VRIAServerProject.h"
#include "VRIAServerJSContextMgr.h"
#include "VRPCService.h"
#include "VJSRPCServiceCore.h"
#include "VDataService.h"
#include "VJSDataServiceCore.h"
#include "VJSWebAppServiceCore.h"
#include "VRIAServerJSCore.h"
#include "VJSSolution.h"
#if USE_V8_ENGINE
#else
#include <../../JavaScriptCore/4D/4DDebuggerServer.h>
#endif
#include "VRIAServerTools.h"
#include "VRIAServerSupervisor.h"
#include "VJSApplication.h"
#include "VRIAServerJSDebugger.h"


USING_TOOLBOX_NAMESPACE



void VRIAServerJSCore::Initialize( const VJSParms_initialize& inParms, VRIAServerProject* inApplication)
{
	if (inApplication != NULL)
	{
		inApplication->Retain();

		VJSObject object( inParms.GetObject());
		
		VError err = VE_OK;
		VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( inParms.GetContext(), inApplication);
		
		// Append the 'rpcService' property
		VRPCService *rpcService = inApplication->RetainRPCService( riaContext, &err);
		if ((rpcService != NULL) && (err == VE_OK))
		{
			object.SetProperty( L"rpcService", VJSRPCServiceCore::CreateInstance( inParms.GetContext(), rpcService), JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete);
		}
		ReleaseRefCountable( &rpcService);
		
		// Append the 'dataStoreService' property
		VDataService *dataService = inApplication->RetainDataService( riaContext, &err);
		if ((dataService != NULL) && (err == VE_OK))
		{
			object.SetProperty( L"dataStoreService", VJSDataServiceCore::CreateInstance( inParms.GetContext(), dataService), JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete);
		}
		ReleaseRefCountable( &dataService);

		// Append the 'webAppService' property
		object.SetProperty( L"webAppService", VJSWebAppServiceCore::CreateInstance( inParms.GetContext(), inApplication), JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete);
	}
}


void VRIAServerJSCore::Finalize( const VJSParms_finalize& inParms, VRIAServerProject* inApplication)
{
	if (inApplication != NULL)
	{
		inApplication->Release();
	}
}


void VRIAServerJSCore::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "openSolution", js_callStaticFunction<_openSolution>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "recentlyOpenedSolution", js_callStaticFunction<_getRecentSolution>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "setDebuggerServer", js_callStaticFunction<_setDebuggerServer>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getDebuggerServer", js_callStaticFunction<_getDebuggerServer>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "isDebugging", js_callStaticFunction<_isDebugging>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "stopDebugger", js_callStaticFunction<_stopDebugger>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "startDebugger", js_callStaticFunction<_startDebugger>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "canSetDebuggerServer", js_callStaticFunction<_canSetDebuggerServer>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "updateBreakpoints", js_callStaticFunction<_updateBreakpoints>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "setBreakpoints", js_callStaticFunction<_setBreakpoints>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "removeBreakpoints", js_callStaticFunction<_removeBreakpoints>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getDebuggerStatus", js_callStaticFunction<_getDebuggerStatus>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getBreakpoints", js_callStaticFunction<_getBreakpoints>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getDebuggerConnection", js_callStaticFunction<_getDebuggerConnection>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	outDefinition.className = "ServerCore";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
}


void VRIAServerJSCore::_canSetDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"canSetDebuggerServer");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_canSetDebuggerServer( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_updateBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"updateBreakpoints");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_updateBreakpoints( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_setBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"setBreakpoints");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_setBreakpoints( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_removeBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"removeBreakpoints");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_removeBreakpoints( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_getDebuggerStatus( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"getDebuggerStatus");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_getDebuggerStatus( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_getBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"getBreakpoints");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_getBreakpoints( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_setDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"setDebuggerServer");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_setDebuggerServer( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_startDebugger( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"startDebugger");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_startDebugger( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_stopDebugger( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"stopDebugger");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_stopDebugger( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_isDebugging( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"isDebugging");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_isDebugging( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_getDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"getDebuggerServer");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_getDebuggerServer( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_getDebuggerConnection( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"getDebuggerConnection");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_getDebuggerConnection( ioParms, inApplication);
	}
}


void VRIAServerJSCore::_openSolution( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_SERVER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"openSolution");
	}
	else
#endif
	{
		VJSServer::_openSolution( ioParms, NULL);
	}
}


void VRIAServerJSCore::_getRecentSolution( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_SERVER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"recentlyOpenedSolution");
	}
	else
#endif
	{
		VJSServer::_getRecentSolutions( ioParms, NULL);
	}
}



// ----------------------------------------------------------------------------



void VJSServer::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "quit", js_callStaticFunction<_quit>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "openSolution", js_callStaticFunction<_openSolution>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "recentlyOpenedSolutions", js_callStaticFunction<_getRecentSolutions>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getApplicationByName", js_callStaticFunction<_getApplicationByName>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
	#if WITH_SANDBOXED_PROJECT
		{ "openProject", js_callStaticFunction<_openProject>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "closeProject", js_callStaticFunction<_closeProject>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
	#endif
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] =
	{
		{ "applications", js_getProperty<_getApplications>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0,0}
	};

	outDefinition.className = "Server";
	outDefinition.staticFunctions = functions;
}


void VJSServer::_quit( XBOX::VJSParms_callStaticFunction& ioParms, void*)
{
	VRIAServerApplication::Get()->QuitAsynchronously();
}


void VJSServer::_openSolution( XBOX::VJSParms_callStaticFunction& ioParms, void*)
{
	bool done = false;
	VString jsPath;
	VJSObject jsFile( ioParms.GetContext());
	sLONG openingMode = 0;

	VFile *paramFile = ioParms.RetainFileParam( 1, true);
	if (paramFile != NULL && ioParms.GetLongParam( 2, &openingMode))
	{
		VSolutionStartupParameters *startupParams = NULL;

		if (paramFile->Exists())
		{
			if (paramFile->ConformsTo(RIAFileKind::kSolutionFileKind))
			{
				startupParams = new VSolutionStartupParameters();
				if (startupParams != NULL)	
					startupParams->SetSolutionFileToOpen( paramFile);
			}
			else if (paramFile->ConformsTo( RIAFileKind::kSolutionLinkFileKind))
			{
				startupParams = new VSolutionStartupParameters();
				if (startupParams != NULL)
				{
					if (LoadSolutionStartupParametersFromLinkFile( *paramFile, *startupParams) != VE_OK)
						ReleaseRefCountable( &startupParams);
				}
			}
		}

		if (startupParams != NULL)
		{
			startupParams->SetOpenProjectSymbolsTable( false);	// sc 25/05/2012, on Server, do not use the symbols table anymore
			
			VRIAServerSolutionOpeningParameters openingParams( startupParams);

			if (openingMode == 1)
			{
				openingParams.SetOpeningMode( eSOM_FOR_RUNNING);

				VString dbgParam;
				if (ioParms.GetStringParam( 3, dbgParam))
				{
					if (IsValidDebuggerParam( dbgParam))
						openingParams.SetDebuggerType( DebuggerParamToDebuggerType( dbgParam));
				}

			#if WITH_SANDBOXED_PROJECT
				if ((VRIAServerApplication::Get()->GetRunningMode() & eSRM_WITH_SANDBOXED_ADMINISTRATOR) != 0)
					openingParams.SetOpenDefaultSolutionWhenOpeningFails( false);
			#endif // WITH_SANDBOXED_PROJECT

				openingParams.UpdateStartupParameters( startupParams);
				VRIAServerApplication::Get()->OpenSolutionAsCurrentSolution( startupParams, VJSJobClass::GetJobParam( ioParms, 4));
				ioParms.ReturnNullValue();
				done = true;
			}
			else if (openingMode == 2)
			{
				VError err = VE_OK;
				openingParams.SetOpeningMode( eSOM_FOR_MAINTENANCE);
				openingParams.UpdateStartupParameters( startupParams);
				VRIAServerSolution *solution = VRIAServerApplication::Get()->OpenAndRetainSolutionForMaintenance( err, startupParams, VJSJobClass::GetJobParam( ioParms, 3));
				if (solution != NULL)
				{
					VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( ioParms.GetContext());
					if (rtContext != NULL)
					{
						rtContext->AttachSolution( ioParms.GetContext(), solution);
					}

					ioParms.ReturnValue( VJSSolution::CreateInstance( ioParms.GetContext(), solution));
					ReleaseRefCountable( &solution);
					done = true;
				}
			}
			startupParams->Release();
		}
	}

	ReleaseRefCountable( &paramFile);

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSServer::_getRecentSolutions( XBOX::VJSParms_callStaticFunction& ioParms, void*)
{
	VJSArray result( ioParms.GetContext());

	TimeToStringsPairMultimap recentSolutions;
	GetMapOfRecentSolutionFiles( recentSolutions);

	TimeToStringsPairMultimap::reverse_iterator iter = recentSolutions.rbegin();
	while (iter != recentSolutions.rend()) 
	{
		VSolutionStartupParameters *solutionParams = new VSolutionStartupParameters();
		if (solutionParams != NULL)
		{
			solutionParams->SetOpenProjectSymbolsTable( false);	// sc 25/05/2012, on Server, do not use the symbols table anymore

			VFile *linkFile = new VFile( iter->second.second);
			if (linkFile != NULL)
			{
				if (LoadSolutionStartupParametersFromLinkFile( *linkFile, *solutionParams) == VE_OK)
				{
					VFile *solutionFile = solutionParams->GetSolutionFileToOpen();
					if (solutionFile != NULL)
					{
						VJSValue jsSolutionFile( ioParms.GetContext());
						jsSolutionFile.SetFile( solutionFile);

						VJSValue jsLinkFile( ioParms.GetContext());
						jsLinkFile.SetFile( linkFile);

						VJSObject recentSolution( ioParms.GetContext());
						recentSolution.MakeEmpty();
						recentSolution.SetProperty( L"name", iter->second.first);
						recentSolution.SetProperty( L"solutionFile", jsSolutionFile);
						recentSolution.SetProperty( L"linkFile", jsLinkFile);
						result.PushValue( recentSolution);
					}
				}
				ReleaseRefCountable( &linkFile);
			}
			ReleaseRefCountable( &solutionParams);
		}
		++iter;
	}

	ioParms.ReturnValue( result);
}


void VJSServer::_getApplicationByName( XBOX::VJSParms_callStaticFunction& ioParms, void*)
{
	VRIAServerSolution *solution = VRIAServerApplication::Get()->RetainCurrentSolution();
	if (solution != NULL)
	{
		VJSSolution::_getApplicationByName( ioParms, solution);
		solution->Release();
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSServer::_getApplications( XBOX::VJSParms_getProperty& ioParms, void*)
{
	VRIAServerSolution *solution = VRIAServerApplication::Get()->RetainCurrentSolution();
	if (solution != NULL)
	{
		VJSSolution::_getApplications( ioParms, solution);
		solution->Release();
	}
	else
	{
		VJSArray apps( ioParms.GetContext());
		ioParms.ReturnValue( apps);
	}
}


#if WITH_SANDBOXED_PROJECT

void VJSServer::_openProject( XBOX::VJSParms_callStaticFunction& ioParms, void*)
{
	if ((VRIAServerApplication::Get()->GetRunningMode() & eSRM_WITH_SOLUTION) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"openProject");
	}
	else
	{
		// TBD
	}
}


void VJSServer::_closeProject( XBOX::VJSParms_callStaticFunction& ioParms, void*)
{
	if ((VRIAServerApplication::Get()->GetRunningMode() & eSRM_WITH_SOLUTION) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"closeProject");
	}
	else
	{
		// TBD
	}
}

#endif // WITH_SANDBOXED_PROJECT