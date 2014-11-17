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
#include "VRIAServerJSAPI.h"
#include "commonJSAPI.h"
#include "JSDebugger/Interfaces/CJSWDebuggerFactory.h"
#include "VSolutionStartupParameters.h"
#include "VSolution.h"
#include "VProject.h"
#include "VProjectItem.h"
#include "VRIAServerApplication.h"
#include "VRIAServerSolution.h"
#include "VRIAServerProject.h"
#include "VJSApplication.h"
#include "VRIAServerTools.h"
#include "VJSSolution.h"
#include "VRIAServerJSCore.h"
#include "VRIAServerJSDebugger.h"



USING_TOOLBOX_NAMESPACE



void VJSSolution::Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerSolution* inSolution)
{
	if (inSolution != NULL)
		inSolution->Retain();
}


void VJSSolution::Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerSolution* inSolution)
{
	if(inSolution != NULL)
		inSolution->Release();
}


void VJSSolution::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getApplicationByName", js_callStaticFunction<_getApplicationByName>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getFolder", js_callStaticFunction<_getFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getWalibFolder", js_callStaticFunction<_getWalibFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "close", js_callStaticFunction<_close>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getSettingFile", js_callStaticFunction<_getSettingFile>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "quitServer", js_callStaticFunction<_quitServer>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getDebuggerPort", js_callStaticFunction<_getDebuggerPort>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getItemsWithRole", js_callStaticFunction<_getItemsWithRole>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] =
	{
		{ "name", js_getProperty<_getName>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "applications", js_getProperty<_getApplications>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0,0}
	};

	outDefinition.className = kSSJS_CLASS_NAME_Solution;
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


void VJSSolution::_getApplicationByName( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	VRIAServerProject *application = NULL;

	VJSContext jsContext( ioParms.GetContext());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( ioParms.GetContext());

	VString name;
	if (ioParms.GetStringParam( 1, name))
	{
		if (inSolution != NULL)
		{
			application = inSolution->RetainApplicationByName( name);
		}

	#if WITH_SANDBOXED_PROJECT
		if ((application == NULL) && (VRIAServerApplication::Get()->GetRunningMode() & eSRM_WITH_SANDBOXED_ADMINISTRATOR) != 0)
		{
			if ((rtContext != NULL) && rtContext->GetRootApplication()->IsSandboxed() && rtContext->GetRootApplication()->IsAdministrator())
			{
				application = VRIAServerApplication::Get()->RetainProjectByName( name);
			}
		}
	#endif
	}

	if (application != NULL)
	{
		if (rtContext != NULL && rtContext->GetRootApplication() == application)
		{
			ioParms.ReturnValue( jsContext.GetGlobalObject());	// the root application references the global object
		}
		else
		{
		#if WITH_SANDBOXED_PROJECT
			if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_SANDBOXED_PROJECTS) != 0)
			{
				ioParms.ReturnValue( VJSSandboxedApplication::CreateInstance( ioParms.GetContext(), application));
			}
			else
		#endif
			{
				ioParms.ReturnValue( VJSApplication::CreateInstance( jsContext, application));
			}
		}
		
		application->Release();
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSSolution::_getFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	VFolder *folder = NULL;
	if (inSolution != NULL)
	{
		folder = inSolution->RetainFolder();
	}
#if WITH_SANDBOXED_PROJECT
	else if ((VRIAServerApplication::Get()->GetRunningMode() & eSRM_WITH_SANDBOXED_ADMINISTRATOR) != 0)
	{
		VJSContext jsContext( ioParms.GetContext());
		VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( ioParms.GetContext());
		if ((rtContext != NULL) && rtContext->GetRootApplication()->IsSandboxed() && rtContext->GetRootApplication()->IsAdministrator())
		{
			// for sandboxed administrator only: returns the folder of the project
			folder = rtContext->GetRootApplication()->RetainFolder();
		}
	}
#endif
	JSReturnFolder( folder, ioParms, 1, 2);
	ReleaseRefCountable( &folder);
}


void VJSSolution::_getWalibFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	VFolder *folder = VRIAServerApplication::Get()->GetFileSystemNamespace()->RetainFileSystemRootFolder( CVSTR( "WALIB"));
	JSReturnFolder( folder, ioParms, 1, 2);
	ReleaseRefCountable( &folder);
}


void VJSSolution::_close( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	if (VRIAServerApplication::Get()->IsCurrentSolution( inSolution))
	{
	#if WITH_SANDBOXED_PROJECT
		if ((VRIAServerApplication::Get()->GetRunningMode() & eSRM_WITH_SANDBOXED_ADMINISTRATOR) != 0)
		{
			VRIAServerApplication::Get()->CloseCurrentSolution();
		}
		else
	#endif // WITH_SANDBOXED_PROJECT
		{
			// sc 10/02/2010 now, close function open the default solution
			VSolutionStartupParameters *startupParams = VRIAServerApplication::Get()->RetainDefaultSolutionStartupParameters();
			VRIAServerJob *job = RetainRefCountable( VJSJobClass::GetJobParam( ioParms, 1));
		
			if (job == NULL)
				job = VRIAServerSupervisor::Get()->RetainJob( L""); // sc 23/01/2014 create a default job

			if (startupParams != NULL)
				VRIAServerApplication::Get()->OpenSolutionAsCurrentSolution( startupParams, job);

			ReleaseRefCountable( &job);
			ReleaseRefCountable( &startupParams);
		}
	}
	else
	{
		VValueBag *jobCloseBag = NULL;
		VRIAServerJob *job = VJSJobClass::GetJobParam( ioParms, 1);

		if (job != NULL)
		{
			jobCloseBag = new VValueBag;
			if (jobCloseBag != NULL)
				JobCommonBagKeys::solutionName.Set( jobCloseBag, inSolution->GetName());
		}

		VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( ioParms.GetContext());
		if (rtContext != NULL)
		{
			rtContext->DetachSolution( ioParms.GetContext(), inSolution);
		}

		LogMessage( L"", eL4JML_Information, L"Closes \"" + inSolution->GetName() + L"\" solution");

		VError err = inSolution->Close();

		if (job != NULL)
		{
			if (jobCloseBag != NULL)
			{
				JobCommonBagKeys::jobResult.Set( jobCloseBag, (err == VE_OK) ? 0 : 1);
				ILoggerBagKeys::message.Set( jobCloseBag, (err == VE_OK) ? L"solution closed" : L"cannot close the solution");
			}
			VRIAServerSupervisor::Get()->TerminateJob( job->GetId(), jobCloseBag);
		}
		ReleaseRefCountable( &jobCloseBag);
	}
}


void VJSSolution::_getSettingFile( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	if (inSolution != NULL)
	{
		VFilePath settingFilePath;
		VString settingID;
		VFolder *folder = inSolution->RetainFolder();

		if (ioParms.GetStringParam( 1, settingID))
		{
			const VRIASettingsFile *settingFile = inSolution->RetainSettingsFile( settingID);
			if (settingFile != NULL)
			{
				settingFile->GetFilePath( settingFilePath);
				settingFile->Release();
			}
		}

		JSReturnFolderOrFile( settingFilePath, folder->GetFileSystem(), ioParms, 2, 3);

		QuickReleaseRefCountable( folder);
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSSolution::_quitServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_SERVER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"quitServer");
	}
	else
#endif
	{
		VJSServer::_quit( ioParms, NULL);
	}
}


void VJSSolution::_getDebuggerPort( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_DEBUGGER_OBJECT) != 0)
	{
		vThrowError( VE_RIA_JS_DISABLED_PROPERTY, L"getDebuggerPort");
	}
	else
#endif
	{
		VRIAServerJSDebugger::_getDebuggerPort( ioParms, NULL);
	}
}


void VJSSolution::_getItemsWithRole( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	bool done = false;
	VString tag;
	if (ioParms.GetStringParam( 1, tag) && (inSolution != NULL))
	{
		VectorOfProjectItems itemsVector;
		inSolution->GetDesignSolution()->GetProjectItemsFromTag( tag, itemsVector);

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
				VJSArray result( ioParms.GetContext());

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


void VJSSolution::_getName( XBOX::VJSParms_getProperty& ioParms, VRIAServerSolution* inSolution)
{
	VString name;
	if (inSolution != NULL)
		inSolution->GetName( name);
	ioParms.ReturnString( name);
}


void VJSSolution::_getApplications( XBOX::VJSParms_getProperty& ioParms, VRIAServerSolution* inSolution)
{
	VJSArray apps( ioParms.GetContext());
	
	VJSContext jsContext( ioParms.GetContext());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);

	VectorOfApplication applications;

	if (inSolution != NULL)
	{
		inSolution->GetApplications( applications);
	}

#if WITH_SANDBOXED_PROJECT
	if ((VRIAServerApplication::Get()->GetRunningMode() & eSRM_WITH_SANDBOXED_ADMINISTRATOR) != 0)
	{
		if ((rtContext != NULL) && rtContext->GetRootApplication()->IsSandboxed() && rtContext->GetRootApplication()->IsAdministrator())
		{
			// for sandboxed administrator only: append the list of sandboxed projects
			VectorOfApplication sandboxedApps;
			VRIAServerApplication::Get()->RetainAllProjects( sandboxedApps);
			applications.insert( applications.end(), sandboxedApps.begin(), sandboxedApps.end());
		}
	}
#endif

	for (VectorOfApplication_iter iter = applications.begin() ; iter != applications.end() ; ++iter)
	{
		if (!(*iter).IsNull())
		{
			VRIAServerProject *application = (*iter).Get();

			if (rtContext != NULL && rtContext->GetRootApplication() == application)
			{
				apps.PushValue( jsContext.GetGlobalObject());	// the root application references the global object
			}
			else
			{
			#if WITH_SANDBOXED_PROJECT
				if ((VRIAServerApplication::Get()->GetJavaScriptAPIOptions() & eJAO_WITH_SANDBOXED_PROJECTS) != 0)
				{
					apps.PushValue( VJSSandboxedApplication::CreateInstance( ioParms.GetContext(), application));
				}
				else
			#endif
				{
					apps.PushValue( VJSApplication::CreateInstance( ioParms.GetContext(), application));
				}
			}
		}
	}
	applications.clear();

	ioParms.ReturnValue( apps);
}
