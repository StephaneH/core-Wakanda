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
#include "VRIAServerSolution.h"
#include "VRIAServerProject.h"
#include "VRIAServerTools.h"
#include "VRIAServerApplication.h"
#include "VRIAServerProjectContext.h"
#include "VRIAServerJSContextMgr.h"
#include "VRIAServerHTTPRequestHandler.h"
#include "VRIAServerJSAPI.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "VSolution.h"
#include "VProject.h"
#include "VProjectItem.h"
#include "VJSApplication.h"
#include "VRIAServerJSCore.h"
#include "VJSConsole.h"
#include "commonJSAPI.h"
#include "VJSSolution.h"
#include "VRIAPermissions.h"
#include "VJSPermissions.h"
#include "VRPCCatalog.h"
#include "VJSRPCCatalog.h"
#include "VRIAServerComponentBridge.h"


USING_TOOLBOX_NAMESPACE



void VJSApplicationGlobalObject::_addHttpRequestHandler( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_addHttpRequestHandler( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ThrowError( VE_RIA_JS_CANNOT_BE_USED_IN_THIS_CONTEXT);
	}
}


void VJSApplicationGlobalObject::_removeHttpRequestHandler( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_removeHttpRequestHandler( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ThrowError( VE_RIA_JS_CANNOT_BE_USED_IN_THIS_CONTEXT);
	}
}


void VJSApplicationGlobalObject::_getFolder( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getFolder( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getSettingFile( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getSettingFile( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getWalibFolder( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getWalibFolder( ioParms, application);
		}
		else
		{
			VFilePath path;
			VRIAServerApplication::Get()->GetWALibraryFolderPath( path);
			JSReturnFolderOrFile( path, NULL, ioParms, 1, 2);
		}
		done = true;
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getItemsWithRole( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getItemsWithRole( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}



void VJSApplicationGlobalObject::_verifyDataStore( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_verifyDataStore( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_repairInto( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_repairInto( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_compactInto( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_compactInto( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_login( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_login( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_unsecureLogin( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_unsecureLogin( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getCurrentUser( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getCurrentUser( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getConnectionSession( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getConnectionSession( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_logout( XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_logout( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getSolution( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getSolution( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getName( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getName( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getWildChar( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getWildChar( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getIsAdministrator( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getIsAdministrator( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getHttpServer( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getHttpServer( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getWebAppService( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getWebAppService( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getDataService( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getDataService( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getRPCService( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getRPCService( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getConsole( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getConsole( ioParms, application);
		}
		else
		{
			ioParms.ReturnValue( VJSConsole::CreateInstance( ioParms.GetContextRef(), NULL));
		}
		done = true;
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getPattern( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getPattern( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}

void VJSApplicationGlobalObject::_getStorage( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getStorage( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}

void VJSApplicationGlobalObject::_getSettings( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getSettings( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getDirectory( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getDirectory( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getInternal( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getInternal( ioParms, application);
		}
		else
		{
			ioParms.ReturnValue( VRIAServerJSCore::CreateInstance( ioParms.GetContextRef(), NULL));
		}
		done = true;
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getPermissions( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getPermissions( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplicationGlobalObject::_getRPCCatalog( XBOX::VJSParms_getProperty& ioParms, XBOX::VJSGlobalObject* inGlobalObject)
{
	bool done = false;
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSGlobalObject( inGlobalObject);
	if (rtContext != NULL)
	{
		VRIAServerProject *application = rtContext->GetRootApplication();
		if (application != NULL)
		{
			VJSApplication::_getRPCCatalog( ioParms, application);
			done = true;
		}
	}

	if (!done)
	{
		ioParms.ReturnUndefinedValue();
	}
}



// ----------------------------------------------------------------------------



void VJSApplication::Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Retain();
}


void VJSApplication::Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Release();
}


void VJSApplication::GetProperty( VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VString propName;

	if (ioParms.GetPropertyName( propName))
	{
		VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
		CDB4DBaseContext *baseContext = (riaContext != NULL) ? riaContext->GetBaseContext() : NULL;
		CDB4DManager *db4d = VRIAServerApplication ::Get()->GetComponentDB4D();
		if (propName.EqualToString( kSSJS_PROPERTY_NAME_Database, true) || propName.EqualToString( kSSJS_PROPERTY_NAME_DataStore, true))
		{
			if (db4d != NULL && baseContext != NULL)
			{				
				ioParms.ReturnValue( db4d->CreateJSDatabaseObject( ioParms.GetContext(), baseContext));
			}
			else
			{
				ioParms.ReturnUndefinedValue();
			}
		}
		else
		{
			if (db4d != NULL && baseContext != NULL)
			{
				// sc 25/11/2011, return nothing for unhandled properties cause the static value callback to be called
				VJSValue result( db4d->CreateJSEMObject( propName, ioParms.GetContext(), baseContext));
				if (!result.IsNull() && !result.IsUndefined())
					ioParms.ReturnValue( result);
			}
		}
	}
}


bool VJSApplication::SetProperty( VJSParms_setProperty& ioParms, VRIAServerProject* inApplication)
{
	return false;
}


void VJSApplication::GetPropertyNames( VJSParms_getPropertyNames& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
	CDB4DBaseContext *baseContext = (riaContext != NULL) ? riaContext->GetBaseContext() : NULL;
	if (baseContext != NULL)
	{
		ioParms.AddPropertyName( kSSJS_PROPERTY_NAME_Database);
		ioParms.AddPropertyName( kSSJS_PROPERTY_NAME_DataStore);
	}
}


void VJSApplication::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ kSSJS_PROPERTY_NAME_AddHttpRequestHandler, js_callStaticFunction<_addHttpRequestHandler>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_RemoveHttpRequestHandler, js_callStaticFunction<_removeHttpRequestHandler>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_GetFolder, js_callStaticFunction<_getFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_GetSettingFile, js_callStaticFunction<_getSettingFile>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_GetWalibFolder, js_callStaticFunction<_getWalibFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_GetItemsWithRole, js_callStaticFunction<_getItemsWithRole>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_verifyDataStore, js_callStaticFunction<_verifyDataStore>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_repairDataStore, js_callStaticFunction<_repairInto>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_compactDataStore, js_callStaticFunction<_compactInto>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_loginByKey, js_callStaticFunction<_login>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_loginByPassword, js_callStaticFunction<_unsecureLogin>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_currentUser, js_callStaticFunction<_getCurrentUser>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_currentSession, js_callStaticFunction<_getConnectionSession>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_logout, js_callStaticFunction<_logout>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};
	
	static inherited::StaticValue values[] =
	{
		{ kSSJS_PROPERTY_NAME_Solution, js_getProperty<_getSolution>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Name, js_getProperty<_getName>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Administrator, js_getProperty<_getIsAdministrator>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_HTTPServer, js_getProperty<_getHttpServer>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_WebAppService, js_getProperty<_getWebAppService>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_DataService, js_getProperty<_getDataService>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_RPCService, js_getProperty<_getRPCService>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Console, js_getProperty<_getConsole>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Pattern, js_getProperty<_getPattern>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Storage, js_getProperty<_getStorage>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Settings, js_getProperty<_getSettings>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Directory, js_getProperty<_getDirectory>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Internal, js_getProperty<_getInternal>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_Permissions, js_getProperty<_getPermissions>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_RPCCatalog, js_getProperty<_getRPCCatalog>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_wildchar, js_getProperty<_getWildChar>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	outDefinition.className = kSSJS_CLASS_NAME_Application;
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.setProperty = js_setProperty<SetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


CUAGSession* MakeDefaultSessionIfEmpty(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	CUAGSession* session = nil;
	VJSContext jsContext(ioParms.GetContextRef());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		session = rtContext->RetainUAGSession();
		if (session == NULL)
		{
			VError err = VE_OK;
			CUAGDirectory* directory = inApplication->RetainUAGDirectory(err);
			if (directory != NULL)
			{
				session = directory->MakeDefaultSession(nil, (VJSContext*)&(ioParms.GetContext()));
				rtContext->SetUAGSession(session, true);
			}
			QuickReleaseRefCountable(directory);
		}
	}
	return session;
}


void VJSApplication::_unsecureLogin( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VString username;
	VString password;
	bool result = false;

	VError err = VE_OK;
	CUAGDirectory* directory = inApplication->RetainUAGDirectory(err);
	sLONG nbsecs = 0;
	if (ioParms.CountParams() > 2)
		ioParms.GetLongParam(3, &nbsecs);
	if (nbsecs <= 0)
		nbsecs = 60 * 60; // 1 hour

	if (directory != nil)
	{
		StErrorContextInstaller errs(false);
		ioParms.GetStringParam(1, username);
		ioParms.GetStringParam(2, password);
		CUAGSession* session = directory->OpenSession(username, password, nil, (VJSContext*)&(ioParms.GetContext()));
		if (session != nil)
		{
			session->SetLifeTime(nbsecs);
			VJSContext jsContext(ioParms.GetContextRef());

			VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
			if (rtContext != NULL)
			{
				rtContext->SetUAGSession(session, true);
			}

			session->Release();
			result = true;
		}
	}
	ioParms.ReturnBool(result);

	QuickReleaseRefCountable(directory);
}


void VJSApplication::_login( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VString username;
	bool result = false;
	VError err = VE_OK;
	CUAGDirectory* directory = inApplication->RetainUAGDirectory(err);
	sLONG nbsecs = 0;
	if (directory != nil)
	{
		StErrorContextInstaller errs(false);
		ioParms.GetStringParam(1, username);
		if (!username.IsEmpty())
		{
			CUAGUser* user = directory->RetainUser(username);
			if (user != nil)
			{
				VString ha1;
				VString inHa1;
				ioParms.GetStringParam(2, inHa1);
				user->GetHA1(ha1);
				if (ha1 == inHa1)
				{
					CUAGSession* session = directory->OpenSession(user);
					if (session != nil)
					{
						VUUID userID;
						user->GetID(userID);
						if (ioParms.CountParams() > 2)
							ioParms.GetLongParam(3, &nbsecs);
						if (nbsecs <= 0)
							nbsecs = 60 * 60; // 1 hour

						session->SetLifeTime(nbsecs);
						VJSContext jsContext(ioParms.GetContextRef());

						VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
						if (rtContext != NULL)
						{
							rtContext->SetUAGSession(session, true);
						}

						session->Release();
						result = true;
					}
				}
				user->Release();
			}
		}
	}
	ioParms.ReturnBool(result);

	QuickReleaseRefCountable(directory);
}



void VJSApplication::_logout( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VString username;
	bool result = false;

	CUAGSession* session = NULL;
	VJSContext jsContext(ioParms.GetContextRef());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		VError err = VE_OK;
		CUAGDirectory* directory = inApplication->RetainUAGDirectory(err);
		if (directory != NULL)
		{
			session = directory->MakeDefaultSession(nil, (VJSContext*)&(ioParms.GetContext()));
			directory->Release();
		}
		rtContext->SetUAGSession(session, true);
		ReleaseRefCountable( &session);
	}
}


void VJSApplication::_getCurrentUser( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VString username;
	bool ok = false;

	VJSContext jsContext(ioParms.GetContextRef());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		CUAGSession* session = MakeDefaultSessionIfEmpty(ioParms, inApplication); // rtContext->RetainUAGSession();
		if (session != nil)
		{
			CUAGUser* user = session->RetainUser();
			if (user != nil)
			{
				ioParms.ReturnValue(user->CreateJSUserObject(ioParms.GetContextRef()));
				ok = true;
				user->Release();
			}
			session->Release();
		}
	}

	if (!ok)
		ioParms.ReturnNullValue();
}


void VJSApplication::_getConnectionSession( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	bool ok = false;
	VJSContext jsContext(ioParms.GetContextRef());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
	if (rtContext != NULL)
	{
		CUAGSession* session = MakeDefaultSessionIfEmpty(ioParms, inApplication); // rtContext->RetainUAGSession();
		if (session != nil)
		{
			ok = true;
			ioParms.ReturnValue(session->CreateJSSessionObject(ioParms.GetContextRef()));
			session->Release();
		}
	}
	if (!ok)
		ioParms.ReturnNullValue();
}


void callToolsOnDB(XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication, bool isRepair)
{
	StErrorContextInstaller errs(false);
	bool ok = false;
	VFile* catalogFile = ioParms.RetainFileParam(1);
	VFile* dataFile = ioParms.RetainFileParam(2);
	VFile* outFile = ioParms.RetainFileParam(4);
	if (catalogFile != nil && dataFile != nil && outFile != nil &&  catalogFile->Exists() && dataFile->Exists())
	{
		VJSObject paramObj(ioParms.GetContextRef());
		if (ioParms.IsObjectParam(3))
		{
			ioParms.GetParamObject(3, paramObj);
		}
		else
			paramObj.MakeEmpty();

		CDB4DManager* db4D = VComponentManager::RetainComponentOfType<CDB4DManager>();
		VError err = VE_OK;
		CDB4DBase* newdb = db4D->OpenBase(*catalogFile, DB4D_Open_WithSeparateIndexSegment | DB4D_Open_As_XML_Definition | DB4D_Open_No_Respart, &err, FA_READ);
		if (err == VE_OK)
		{
			VJSContext jsContext(ioParms.GetContextRef());
			IDB4D_DataToolsIntf* toolintf = db4D->CreateJSDataToolsIntf(jsContext, paramObj);
			CDB4DRawDataBase* dataDB = db4D->OpenRawDataBaseWithEm(newdb, dataFile, toolintf, err, FA_READ);
			if (dataDB != nil)
			{
				/*
				if (outFile->Exists())
					err = outFile->Delete();
					*/
				err = db4D->EraseDataStore(outFile);
				if (err == VE_OK)
				{
					CDB4DBase* outDB = db4D->OpenBase(*catalogFile, DB4D_Open_WithSeparateIndexSegment | DB4D_Open_As_XML_Definition | DB4D_Open_No_Respart | DB4D_Open_DelayLoadIndex, &err);
					if (outDB != nil)
					{
						CDB4DBaseContext* dbcontext = NULL;
						VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);
						if (rtContext != NULL)
						{
							CDB4DContext* ownercontext = rtContext->RetainDB4DContext(inApplication);
							if (ownercontext != NULL)
							{
								dbcontext = ownercontext->RetainDataBaseContext(outDB, true);
								ownercontext->Release();
							}
						}

						if (outDB->CreateData(*outFile, DB4D_Create_WithSeparateIndexSegment | DB4D_Open_DelayLoadIndex, nil, dbcontext, &err))
						{
							err = dataDB->CompactInto(outDB, toolintf, false, false, true, true);
							if (err == VE_OK)
							{
								err = outDB->LoadIndexesAfterCompacting(0);
							}
							outDB->Flush(true);
							ok = err == VE_OK;
						}

						QuickReleaseRefCountable(dbcontext);
						//outDB->CloseAndRelease();
						outDB->Close();
						outDB->Release();
					}
					
				}
				dataDB->Release();
			}
			delete toolintf;
			newdb->Close();
		}
		QuickReleaseRefCountable(newdb);
		ReleaseRefCountable( &db4D);
	}	
	ioParms.ReturnBool(ok);
}




void VJSApplication::_verifyDataStore( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	StErrorContextInstaller errs(false);
	bool ok = false;
	VFile* catalogFile = ioParms.RetainFileParam(1);
	VFile* dataFile = ioParms.RetainFileParam(2);
	if (catalogFile != nil && dataFile != nil && catalogFile->Exists() && dataFile->Exists())
	{
		VJSObject paramObj(ioParms.GetContextRef());
		if (ioParms.IsObjectParam(3))
		{
			ioParms.GetParamObject(3, paramObj);
		}
		else
			paramObj.MakeEmpty();

		CDB4DManager* db4D = VComponentManager::RetainComponentOfType<CDB4DManager>();
		VError err = VE_OK;
		CDB4DBase* newdb = db4D->OpenBase(*catalogFile, DB4D_Open_WithSeparateIndexSegment | DB4D_Open_As_XML_Definition | DB4D_Open_No_Respart, &err, FA_READ);
		if (err == VE_OK)
		{
			VJSContext jsContext(ioParms.GetContextRef());
			IDB4D_DataToolsIntf* toolintf = db4D->CreateJSDataToolsIntf(jsContext, paramObj);
			CDB4DRawDataBase* dataDB = db4D->OpenRawDataBaseWithEm(newdb, dataFile, toolintf, err, FA_READ);
			if (dataDB != nil)
			{
				err = dataDB->CheckAll(toolintf);
				ok = err == VE_OK;
				dataDB->Release();
			}
			newdb->Close();
			delete toolintf;
		}
		QuickReleaseRefCountable( newdb);
		ReleaseRefCountable( &db4D);

	}
	ioParms.ReturnBool(ok);
}


void VJSApplication::_repairInto( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	callToolsOnDB(ioParms, inApplication, true);
}


void VJSApplication::_compactInto( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	callToolsOnDB(ioParms, inApplication, false);
}


void VJSApplication::_addHttpRequestHandler( VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_UNKNOWN_ERROR;
	StErrorContextInstaller errContext(false);
	
	VString httpPattern, param, function;
	if (ioParms.GetStringParam( 1, httpPattern) && ioParms.GetStringParam( 2, param) && ioParms.GetStringParam( 3, function))
	{
		if (!param.IsEmpty() && !function.IsEmpty())
		{
			VFilePath path;
			VString extension;
			IRIAJSCallback *callback = NULL;
			VJSRequestHandler *handler = NULL;
		
			inApplication->BuildPathFromRelativePath( path, param, FPS_POSIX);
			path.GetExtension( extension);

			if (extension.IsEmpty())
			{
				// It's a module path
				VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);

				callback = new VRIAJSCallbackModuleFunction( param, function);
				handler = inApplication->AddJSHTTPRequestHandler( err, riaContext, httpPattern, callback);
			}
			else
			{
				if (path.IsFile())
				{
					VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);

					callback = new VRIAJSCallbackGlobalFunction( function);
					VJSRequestHandler *handler = inApplication->AddJSHTTPRequestHandler( err, riaContext, httpPattern, callback);
					
					if (handler != NULL)
					{
						VFile *file = new VFile( path);
						handler->RegisterIncludedFile( file);
						QuickReleaseRefCountable( file);
					}
				}
			}

			QuickReleaseRefCountable( handler);
			QuickReleaseRefCountable( callback);
		}
	}

	if (err != VE_OK)
		ThrowError( VE_RIA_JS_CANNOT_ADD_REQUEST_HANDLER);
}


void VJSApplication::_removeHttpRequestHandler( VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_UNKNOWN_ERROR;
	StErrorContextInstaller errContext(false);
	
	VString httpPattern, param, function;
	if (ioParms.GetStringParam( 1, httpPattern) && ioParms.GetStringParam( 2, param) && ioParms.GetStringParam( 3, function))
	{
		IRIAJSCallback *callback = NULL;

		if (param.BeginsWith( L"Modules/", false))
		{
			param.SubString( 9, param.GetLength());
			if (!param.IsEmpty() && !httpPattern.IsEmpty() && !function.IsEmpty())
			{
				callback = new VRIAJSCallbackModuleFunction( param, function);
			}
		}
		else
		{
			VFilePath path;
			inApplication->BuildPathFromRelativePath( path, param, FPS_POSIX);

			if (path.IsFile() && !httpPattern.IsEmpty() && !function.IsEmpty())
			{
				callback = new VRIAJSCallbackGlobalFunction( function);
			}
		}

		VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
		err = inApplication->RemoveJSHTTPRequestHandler( riaContext, httpPattern, callback);
		QuickReleaseRefCountable( callback);
	}

	if (err != VE_OK)
		ThrowError( VE_RIA_JS_CANNOT_REMOVE_REQUEST_HANDLER);
}


void VJSApplication::_getFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VFilePath path;
	VFolder *folder = inApplication->RetainFolder();
	if (folder != NULL)
	{
		folder->GetPath( path);
		folder->Release();
	}
	JSReturnFolderOrFile( path, NULL, ioParms, 1, 2);
}


void VJSApplication::_getSettingFile( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VFilePath settingFilePath;
	VString settingID;
	VFolder *folder = inApplication->RetainFolder();

	if (ioParms.GetStringParam( 1, settingID))
	{
		const VRIASettingsFile *settingFile = inApplication->RetainSettingsFile( settingID);
		if (settingFile != NULL)
		{
			settingFile->GetFilePath( settingFilePath);
			settingFile->Release();
		}
	}
	
	JSReturnFolderOrFile( settingFilePath, folder, ioParms, 2, 3);

	QuickReleaseRefCountable( folder);
}


void VJSApplication::_getWalibFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VFilePath path;
	VRIAServerApplication::Get()->GetWALibraryFolderPath( path);
	JSReturnFolderOrFile( path, NULL, ioParms, 1, 2);
}


void VJSApplication::_getItemsWithRole( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	bool done = false;
	VString tag;
	if (ioParms.GetStringParam( 1, tag))
	{
		VectorOfProjectItems itemsVector;
		inApplication->GetDesignProject()->GetProjectItemsFromTag( tag, itemsVector);

		if (!itemsVector.empty())
		{
			if (itemsVector.size() == 1)
			{
				VProjectItem *projectItem = *itemsVector.begin();
				if (projectItem != NULL)
				{
					VFilePath path;
					projectItem->GetFilePath( path);
					ioParms.ReturnFilePathAsFileOrFolder( path);
					done = true;
				}
			}
			else
			{
				VJSArray result( ioParms.GetContextRef());

				for (VectorOfProjectItemsIterator iter = itemsVector.begin() ; iter != itemsVector.end() ; ++iter)
				{
					VProjectItem *projectItem = *iter;
					if (projectItem != NULL)
					{
						VFilePath path;
						projectItem->GetFilePath( path);
						result.PushFilePathAsFileOrFolder( path);
					}
				}

				ioParms.ReturnValue( result);
				done = true;
			}
		}
	}

	if (!done)
		ioParms.ReturnNullValue();
}


void VJSApplication::_getSolution( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSSolution::CreateInstance( ioParms.GetContextRef(), inApplication->GetSolution()));
}


void VJSApplication::_getName( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VString name;
	inApplication->GetName( name);
	ioParms.ReturnString( name);
}


void VJSApplication::_getWildChar( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VString s;
	s.AppendUniChar(ioParms.GetWildChar());
	ioParms.ReturnString( s);
}


void VJSApplication::_getIsAdministrator( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnBool( inApplication->IsAdministrator());
}


void VJSApplication::_getHttpServer( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSHTTPServer::CreateInstance( ioParms.GetContextRef(), inApplication));
}


void VJSApplication::_getWebAppService( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSWebAppService::CreateInstance( ioParms.GetContextRef(), inApplication));
}


void VJSApplication::_getDataService( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSDataService::CreateInstance( ioParms.GetContextRef(), inApplication));
}


void VJSApplication::_getRPCService( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSRPCService::CreateInstance( ioParms.GetContextRef(), inApplication));
}


void VJSApplication::_getConsole( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSConsole::CreateInstance( ioParms.GetContextRef(), inApplication));
}


void VJSApplication::_getPattern( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VString pattern;
	inApplication->GetPattern( pattern);
	ioParms.ReturnString( pattern);
}

void VJSApplication::_getStorage(XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue(VJSStorageClass::CreateInstance(ioParms.GetContextRef(), inApplication->GetApplicationStorage()));
}

void VJSApplication::_getSettings(XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue(VJSStorageClass::CreateInstance(ioParms.GetContextRef(), inApplication->GetApplicationSettings()));
}


void VJSApplication::_getDirectory(XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VError err = VE_OK;
	CUAGDirectory* directory = inApplication->RetainUAGDirectory(err);
	if (directory)
	{				
		ioParms.ReturnValue( directory->CreateJSDirectoryObject( ioParms.GetContext()));
		directory->Release();
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSApplication::_getInternal( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VRIAServerJSCore::CreateInstance( ioParms.GetContextRef(), inApplication));
}


void VJSApplication::_getPermissions( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
	VRIAPermissions *permissions = inApplication->RetainPermissions( riaContext, NULL);
	if (permissions != NULL)
	{
		ioParms.ReturnValue( VJSPermissions::CreateInstance( ioParms.GetContext(), permissions));
		permissions->Release();
	}
	else
	{
		ioParms.ReturnUndefinedValue();
	}
}


void VJSApplication::_getRPCCatalog( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
	VRPCCatalog *rpcCatalog = inApplication->RetainRPCCatalog( riaContext, NULL, NULL, NULL);
	if (rpcCatalog != NULL)
	{
		ioParms.ReturnValue( VJSRPCCatalog::CreateInstance( ioParms.GetContext(), rpcCatalog));
		rpcCatalog->Release();
	}
	else
	{
		ioParms.ReturnUndefinedValue();
	}
}