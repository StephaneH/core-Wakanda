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
#include <../../JavaScriptCore/4D/4DDebuggerServer.h>


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
		{ "setBreakpoints", js_callStaticFunction<_setBreakpoints>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "removeBreakpoints", js_callStaticFunction<_removeBreakpoints>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getDebuggerStatus", js_callStaticFunction<_getDebuggerStatus>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getBreakpoints", js_callStaticFunction<_getBreakpoints>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	outDefinition.className = "ServerCore";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
}

void VRIAServerJSCore::_canSetDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	sLONG result = 0;

	if (inApplication != NULL)
	{
		VRIAContext* riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);
		sLONG	dbgType;
		if (ioParms.GetLongParam( 1, &dbgType ))
		{
			result = inApplication->CanSetDebuggerServer( riaContext, (WAKDebuggerType_t)dbgType);
		}
	}

	ioParms.ReturnNumber( result);
}

void VRIAServerJSCore::_setBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	sLONG result = 0;

	if (inApplication != NULL)
	{
		VRIAContext*	riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);
		std::size_t		nbParams = ioParms.CountParams();
		VJSContext		ctx = ioParms.GetContext();

		for( std::size_t idx=1; idx<=nbParams; idx++ )
		{
			VJSArray		jsArray(ctx);
			VJSValue		jsValue(ctx);
			VJSObject		jsObj(ctx);

			if (ioParms.IsArrayParam(idx))
			{

				ioParms.GetParamArray(idx,jsArray);
				
				for ( std::size_t fieldIdx = 0; fieldIdx < jsArray.GetLength(); fieldIdx++ )
				{
					jsValue = jsArray.GetValueAt(fieldIdx);
					if (jsValue.GetType() == JS4D::eTYPE_OBJECT)
					{
						jsObj = jsValue.GetObject();
						sLONG lineNb = jsObj.GetPropertyAsLong(CVSTR("lineNb"),NULL,NULL);

						if (jsObj.HasProperty(CVSTR("file")))
						{
							VString url;
							jsObj.GetPropertyAsString(CVSTR("file"),NULL,url);

							result = inApplication->SetBreakpoint( riaContext, url, lineNb );
							if (!result)
							{
								break;
							}
						}
					}
				}
			}

		}
	}

	ioParms.ReturnNumber( result);
}

void VRIAServerJSCore::_removeBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	sLONG result = 0;

	if (inApplication != NULL)
	{
		VRIAContext*	riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);
		std::size_t		nbParams = ioParms.CountParams();
		VJSContext		ctx = ioParms.GetContext();

		for( std::size_t idx=1; idx<=nbParams; idx++ )
		{
			VJSArray		jsArray(ctx);
			VJSValue		jsValue(ctx);
			VJSObject		jsObj(ctx);

			if (ioParms.IsArrayParam(idx))
			{

				ioParms.GetParamArray(idx,jsArray);
				
				for ( std::size_t fieldIdx = 0; fieldIdx < jsArray.GetLength(); fieldIdx++ )
				{
					jsValue = jsArray.GetValueAt(fieldIdx);
					if (jsValue.GetType() == JS4D::eTYPE_OBJECT)
					{
						jsObj = jsValue.GetObject();
						sLONG lineNb = jsObj.GetPropertyAsLong(CVSTR("lineNb"),NULL,NULL);

						if (jsObj.HasProperty(CVSTR("file")))
						{
							VString url;
							jsObj.GetPropertyAsString(CVSTR("file"),NULL,url);

							result = inApplication->RemoveBreakpoint( riaContext, url, lineNb );
							if (!result)
							{
								break;
							}
						}
					}
				}
			}

		}
	}

	ioParms.ReturnNumber( result);
}

void VRIAServerJSCore::_getDebuggerStatus( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	bool		started;
	sLONG		breakpointsTimeStamp;
	bool		connected;
	bool		pendingContexts;
	sLONG		debuggingEventsTimeStamp;
	WAKDebuggerType_t	WAKDebuggerType;

	if (inApplication != NULL)
	{
		//VRIAContext*	riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);
		inApplication->GetDebuggerStatus( WAKDebuggerType, started, breakpointsTimeStamp, connected, debuggingEventsTimeStamp, pendingContexts);
	}
	VString		result("{\"started\":");
	if (started)
	{
		result += "true";
	}
	else
	{
		result += "false";
	}
	result += ",\"debuggerType\":";
	switch(WAKDebuggerType)
	{
	case WEB_INSPECTOR_TYPE:
		result += "\"REMOTE_DEBUGGER\"";
		break;
	case REGULAR_DBG_TYPE:
		result += "\"WAKANDA_DEBUGGER\"";
		break;
	default:
		result += "\"NO_DEBUGGER\"";
	}
	result += ",\"breakpointsTimeStamp\":";
	result.AppendLong8(breakpointsTimeStamp);
	result += ",\"debuggerConnected\":";
	if (connected)
	{
		result += "true";
	}
	else
	{
		result += "false";
	}
	result += ",\"debuggingPendingContexts\":";
	if (pendingContexts)
	{
		result += "true";
	}
	else
	{
		result += "false";
	}
	result += ",\"debuggingEventsTimeStamp\":";
	result.AppendLong8(debuggingEventsTimeStamp);
	result += "}";
	ioParms.ReturnString( result );
}
void VRIAServerJSCore::_getBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	sLONG result = 0;
	VString	vstrInput,vstrOutput;
	VJSArray	jsArray(ioParms.GetContext());

	XBOX::VJSContext	ctx = ioParms.GetContext();
	inApplication->GetBreakpoints(&ctx,jsArray);
	ioParms.ReturnValue(jsArray);

}

void VRIAServerJSCore::_setDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{

	if (!inApplication)
	{
		ioParms.ReturnUndefinedValue();
		return;
	}
	
	VRIAContext* riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);

	sLONG	dbgType;
	DebugMsg("\n\n !!!! \n VRIAServerJSCore::_setDebuggerServer CALLED!!!!!\n\n\n");
	if (ioParms.GetLongParam( 1, &dbgType ))
	{
		WAKDebuggerType_t	l_type = REGULAR_DBG_TYPE;
		if (dbgType)
		{
			l_type = WEB_INSPECTOR_TYPE;
		}

		VSetDebuggerServerMessage *setDebuggerMsg = new VSetDebuggerServerMessage( inApplication, riaContext, l_type);
		setDebuggerMsg->PostTo( VTask::GetMain());
		ReleaseRefCountable( &setDebuggerMsg);
		ioParms.ReturnNullValue();
	}
	else
	{
		ioParms.ReturnUndefinedValue();
	}

}


void VRIAServerJSCore::_startDebugger( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	if (!inApplication)
	{
		ioParms.ReturnUndefinedValue();
		return;
	}

	VRIAContext* riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);

	ioParms.ReturnNumber( inApplication->StartDebugger(riaContext) );
}

void VRIAServerJSCore::_stopDebugger( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	if (!inApplication)
	{
		ioParms.ReturnUndefinedValue();
		return;
	}

	VRIAContext* riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);

	ioParms.ReturnNumber( inApplication->StopDebugger(riaContext) );
}

void VRIAServerJSCore::_isDebugging( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	if (!inApplication)
	{
		ioParms.ReturnUndefinedValue();
		return;
	}

	VRIAContext* riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);

	ioParms.ReturnNumber( inApplication->IsDebugging(riaContext) );
}

void VRIAServerJSCore::_getDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	if (!inApplication)
	{
		ioParms.ReturnUndefinedValue();
		return;
	}

	VRIAContext* riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);

	ioParms.ReturnNumber( inApplication->GetDebuggerServer(riaContext) );
}

void VRIAServerJSCore::_openSolution( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
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
				openingParams.UpdateStartupParameters( startupParams);
				VRIAServerApplication::Get()->OpenSolutionAsCurrentSolution( startupParams);
				ioParms.ReturnNullValue();
				done = true;
			}
			else if (openingMode == 2)
			{
				VError err = VE_OK;
				openingParams.SetOpeningMode( eSOM_FOR_MAINTENANCE);
				openingParams.UpdateStartupParameters( startupParams);
				VRIAServerSolution *solution = VRIAServerApplication::Get()->OpenAndRetainSolutionForMaintenance( err, startupParams);
				if (solution != NULL)
				{
					VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( ioParms.GetContext());
					if (rtContext != NULL)
					{
						rtContext->AttachSolution( ioParms.GetContext(), solution);
					}

					ioParms.ReturnValue( VJSSolution::CreateInstance( ioParms.GetContextRef(), solution));
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


void VRIAServerJSCore::_getRecentSolution( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VJSArray result( ioParms.GetContextRef());

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

