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
#include "VRIAServerJSDebugger.h"
#include "VRIAServerProject.h"
#include "VJSApplication.h"
#include "VRIAServerTools.h"
#if USE_V8_ENGINE
#else
#include <../../JavaScriptCore/4D/4DDebuggerServer.h>
#endif



void VRIAServerJSDebugger::Initialize( const VJSParms_initialize& inParms, VRIAServerProject* inApplication)
{
	if (inApplication != NULL)
		inApplication->Retain();
}


void VRIAServerJSDebugger::Finalize( const VJSParms_finalize& inParms, VRIAServerProject* inApplication)
{
	if (inApplication != NULL)
		inApplication->Release();
}


void VRIAServerJSDebugger::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
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
		{ "getDebuggerPort", js_callStaticFunction<_getDebuggerPort>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	outDefinition.className = "Debugger";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
}


void VRIAServerJSDebugger::_canSetDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	sLONG result = 0;

	if (inApplication != NULL)
	{
		sLONG	dbgType;
		if (ioParms.GetLongParam( 1, &dbgType ))
		{
			result = inApplication->CanSetDebuggerServer( (WAKDebuggerType_t)dbgType);
		}
	}

	ioParms.ReturnNumber( result);
}


void VRIAServerJSDebugger::_updateBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_OK;

	if (inApplication != NULL)
	{
		VRIAContext*	riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);
		std::size_t		nbParams = ioParms.CountParams();
		VJSContext		ctx = ioParms.GetContext();

		if ( ioParms.IsStringParam(1) )
		{
			VString url;
			ioParms.GetStringParam( 1, url );

			VJSArray		jsArray(ctx);
			VJSValue		jsValue(ctx);
			VJSObject		jsObj(ctx);

			if (ioParms.IsArrayParam(2))
			{
				// removing all the existing breakpoints
				inApplication->RemoveAllBreakpoints( riaContext, url );

				ioParms.GetParamArray(2,jsArray);
				
				for ( std::size_t fieldIdx = 0; fieldIdx < jsArray.GetLength(); fieldIdx++ )
				{
					jsValue = jsArray.GetValueAt(fieldIdx);
					if (jsValue.GetType() == JS4D::eTYPE_NUMBER)
					{
						sLONG lineNb;
						jsValue.GetLong( &lineNb );
						err = inApplication->SetBreakpoint( riaContext, url, lineNb );
						if (err != VE_OK)
						{
							break;
						}
					}
				}
				VChromeDebugHandler::StaticSendBreakpointsUpdated();
			}

		}
	}

	ioParms.ReturnNumber( (err == VE_OK) ? 1 : 0);
}


void VRIAServerJSDebugger::_setBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_OK;

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

							err = inApplication->SetBreakpoint( riaContext, url, lineNb );
							if (err != VE_OK)
							{
								break;
							}
						}
					}
				}
				VChromeDebugHandler::StaticSendBreakpointsUpdated();
			}

		}
	}

	ioParms.ReturnNumber( (err == VE_OK) ? 1 : 0);
}


void VRIAServerJSDebugger::_removeBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_OK;

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

							err = inApplication->RemoveBreakpoint( riaContext, url, lineNb );
							if (err != VE_OK)
							{
								break;
							}
							VChromeDebugHandler::StaticSendBreakpointsUpdated();
						}
					}
				}
			}

		}
	}

	ioParms.ReturnNumber( (err == VE_OK) ? 1 : 0);
}


void VRIAServerJSDebugger::_getDebuggerStatus( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext*	riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);
	
	bool		started = false;
	sLONG		breakpointsTimeStamp = 0;
	bool		connected = false;;
	bool		pendingContexts = false;
	sLONG		debuggingEventsTimeStamp = 0;
	WAKDebuggerType_t	WAKDebuggerType = UNKNOWN_DBG_TYPE;

	if (inApplication != NULL)
	{
		inApplication->GetDebuggerStatus( riaContext, WAKDebuggerType, started, breakpointsTimeStamp, connected, debuggingEventsTimeStamp, pendingContexts);
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
	case NO_DEBUGGER_TYPE:
		result += "\"NO_DEBUGGER\"";
		break;
	default:
		result += "\"UNKNOWN_DEBUGGER\"";
		break;

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


void VRIAServerJSDebugger::_getBreakpoints( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext* riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);
	VJSArray	jsArray(ioParms.GetContext());
	inApplication->GetBreakpoints( riaContext, ioParms.GetContext(), jsArray);
	ioParms.ReturnValue(jsArray);
}


void VRIAServerJSDebugger::_setDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
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
		if (IsValidDebuggerType((WAKDebuggerType_t)dbgType))
		{
			VRIAServerJob *job = VJSJobClass::GetJobParam( ioParms, 2);
			inApplication->SetDebuggerServer( riaContext, (WAKDebuggerType_t)dbgType, true, job);
			ioParms.ReturnNullValue();
		}
		else
		{
			ioParms.ReturnUndefinedValue();
		}
	}
	else
	{
		ioParms.ReturnUndefinedValue();
	}

}


void VRIAServerJSDebugger::_startDebugger( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{

	if (!inApplication)
	{
		ioParms.ReturnUndefinedValue();
		return;
	}

	VRIAContext* riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);
	inApplication->StartDebugger( riaContext);
	ioParms.ReturnNumber( 0);
}


void VRIAServerJSDebugger::_stopDebugger( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	if (!inApplication)
	{
		ioParms.ReturnUndefinedValue();
		return;
	}

	VRIAContext* riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext(ioParms.GetContext(), inApplication);
	inApplication->StopDebugger( riaContext);
	ioParms.ReturnNumber( 0);
}


void VRIAServerJSDebugger::_isDebugging( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	if (!inApplication)
	{
		ioParms.ReturnUndefinedValue();
		return;
	}

	ioParms.ReturnNumber( inApplication->IsDebugging() );
}


void VRIAServerJSDebugger::_getDebuggerServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	if (!inApplication)
	{
		ioParms.ReturnUndefinedValue();
		return;
	}

	ioParms.ReturnNumber( inApplication->GetDebuggerServer() );
}


void VRIAServerJSDebugger::_getDebuggerConnection( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	JSWDebuggerFactory fctry;
	IRemoteDebuggerServer *jswDebugger = fctry.Get();
	short port = (jswDebugger != NULL) ? jswDebugger->GetServerPort() : -1;
	bool secured = (jswDebugger != NULL) ? jswDebugger->IsSecuredConnection() : false;
	
	VJSONValue result;
	
	VJSONObject *obj = new VJSONObject();
	if (obj != NULL)
	{
		obj->SetPropertyAsNumber( L"port", port);
		obj->SetPropertyAsBool( L"secured", secured);
		result.SetObject( obj);
		ReleaseRefCountable( &obj);
	}

	ioParms.ReturnJSONValue( result);
}


void VRIAServerJSDebugger::_getDebuggerPort( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	JSWDebuggerFactory		fctry;

	IRemoteDebuggerServer*	jswDebugger = fctry.Get();

	short					nDebuggerPort = -1;
	if ( jswDebugger != 0 )
		nDebuggerPort = jswDebugger-> GetServerPort ( );

	ioParms. ReturnNumber ( nDebuggerPort );
}