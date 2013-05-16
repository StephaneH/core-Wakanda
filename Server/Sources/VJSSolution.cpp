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
#include "VJSSolution.h"



USING_TOOLBOX_NAMESPACE


#if 1

void VJSSolution::Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerSolution* inSolution)
{
	inSolution->Retain();
}


void VJSSolution::Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerSolution* inSolution)
{
	inSolution->Release();
}


void VJSSolution::GetDefinition( ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getApplicationByName", js_callStaticFunction<_getApplicationByName>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getFolder", js_callStaticFunction<_getFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getWalibFolder", js_callStaticFunction<_getWalibFolder>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "open", js_callStaticFunction<_open>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "openRecent", js_callStaticFunction<_openRecent>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
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
		{ "recentlyOpened", js_getProperty<_getRecentlyOpened>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
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
	
	if (testAssert(inSolution != NULL))
	{
		VString name;

		if (ioParms.GetStringParam( 1, name))
		{
			application = inSolution->RetainApplicationByName( name);
		}
	}

	if (application != NULL)
	{
		VJSContext jsContext( ioParms.GetContextRef());
		VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( ioParms.GetContext());
		
		if (rtContext != NULL && rtContext->GetRootApplication() == application)
			ioParms.ReturnValue( jsContext.GetGlobalObject());	// the root application references the global object
		else
			ioParms.ReturnValue( VJSApplication::CreateInstance( jsContext, application));
		
		application->Release();
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSSolution::_getFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	VFilePath path;
	VFolder *folder = inSolution->RetainFolder();
	if (folder != NULL)
	{
		folder->GetPath( path);
		folder->Release();
	}
	JSReturnFolderOrFile( path, NULL, ioParms, 1, 2);
}


void VJSSolution::_getWalibFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	VFilePath path;
	VRIAServerApplication::Get()->GetWALibraryFolderPath( path);
	JSReturnFolderOrFile( path, NULL, ioParms, 1, 2);
}


void VJSSolution::_open( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	VString param;
	if (ioParms.GetStringParam( 1, param))
	{
		// param is the full posix path of a solution file
		VSolutionStartupParameters *startupParams = NULL;

		VFilePath path( param, FPS_POSIX);
		if (!path.IsEmpty() && path.IsFile())
		{
			VFile *file = new VFile( path);
			if (file != NULL && file->Exists() && file->ConformsTo(RIAFileKind::kSolutionFileKind))
			{
				startupParams = new VSolutionStartupParameters();
				if (startupParams != NULL)
				{
					startupParams->SetSolutionFileToOpen( file);
					startupParams->SetOpenProjectSymbolsTable( false);	// sc 25/05/2012, on Server, do not use the symbols table anymore
				}
			}
			QuickReleaseRefCountable( file);
		}

		if (startupParams != NULL)
		{
			VRIAServerApplication::Get()->OpenSolutionAsCurrentSolution( startupParams);
			startupParams->Release();
		}
	}
}


void VJSSolution::_openRecent( VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	VString param;
	if (ioParms.GetStringParam( 1, param))
	{
		// param is the name of a recently opened solution
		VSolutionStartupParameters *startupParams = NULL;
		TimeToStringsPairMultimap recentSolutions;
		GetMapOfRecentSolutionFiles( recentSolutions);

		for (TimeToStringsPairMultimap::iterator iter = recentSolutions.begin() ; iter != recentSolutions.end() && startupParams == NULL ; ++iter)
		{
			if (iter->second.first == param)
			{
				startupParams = new VSolutionStartupParameters();
				if (startupParams != NULL)
				{
					startupParams->SetOpenProjectSymbolsTable( false);	// sc 25/05/2012, on Server, do not use the symbols table anymore

					VFile file( iter->second.second);
					if (LoadSolutionStartupParametersFromLinkFile( file, *startupParams) != VE_OK)
					{
						ReleaseRefCountable( &startupParams);
					}
				}
			}
		}

		if (startupParams != NULL)
		{
			VRIAServerApplication::Get()->OpenSolutionAsCurrentSolution( startupParams);
			startupParams->Release();
		}
	}
}


void VJSSolution::_close( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	if (VRIAServerApplication::Get()->IsCurrentSolution( inSolution))
	{
		// sc 10/02/2010 now, close function open the default solution
		VSolutionStartupParameters *startupParams = VRIAServerApplication::Get()->RetainDefaultSolutionStartupParameters();

		if (startupParams != NULL)
			VRIAServerApplication::Get()->OpenSolutionAsCurrentSolution( startupParams);

		ReleaseRefCountable( &startupParams);
	}
	else
	{
		VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( ioParms.GetContext());
		if (rtContext != NULL)
		{
			rtContext->DetachSolution( ioParms.GetContext(), inSolution);
		}

		inSolution->Close();
	}
}


void VJSSolution::_getSettingFile( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
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

	JSReturnFolderOrFile( settingFilePath, folder, ioParms, 2, 3);

	QuickReleaseRefCountable( folder);
}


void VJSSolution::_quitServer( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	VRIAServerApplication::Get()->QuitAsynchronously();
}


void VJSSolution::_getDebuggerPort( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{

	JSWDebuggerFactory		fctry;

	IRemoteDebuggerServer*	jswDebugger = fctry.Get();

	short					nDebuggerPort = -1;
	if ( jswDebugger != 0 )
		nDebuggerPort = jswDebugger-> GetServerPort ( );

	ioParms. ReturnNumber ( nDebuggerPort );

}


void VJSSolution::_getItemsWithRole( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerSolution* inSolution)
{
	bool done = false;
	VString tag;
	if (ioParms.GetStringParam( 1, tag))
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


void VJSSolution::_getName( XBOX::VJSParms_getProperty& ioParms, VRIAServerSolution* inSolution)
{
	VString name;
	inSolution->GetName( name);
	ioParms.ReturnString( name);
}


void VJSSolution::_getApplications( XBOX::VJSParms_getProperty& ioParms, VRIAServerSolution* inSolution)
{
	VJSArray apps( ioParms.GetContextRef());
	VJSContext jsContext( ioParms.GetContextRef());
	VRIAJSRuntimeContext *rtContext = VRIAJSRuntimeContext::GetFromJSContext( jsContext);

	VectorOfApplication applications;

	inSolution->GetApplications( applications);
	for (VectorOfApplication_iter iter = applications.begin() ; iter != applications.end() ; ++iter)
	{
		if (!(*iter).IsNull())
		{
			VRIAServerProject *application = (*iter).Get();

			if (rtContext != NULL && rtContext->GetRootApplication() == application)
				apps.PushValue( jsContext.GetGlobalObject());	// the root application references the global object
			else
				apps.PushValue( VJSApplication::CreateInstance( ioParms.GetContextRef(), application));
		}
	}
	applications.clear();

	ioParms.ReturnValue( apps);
}


void VJSSolution::_getRecentlyOpened( XBOX::VJSParms_getProperty& ioParms, VRIAServerSolution* inSolution)
{
	VJSArray result( ioParms.GetContextRef());

	TimeToStringsPairMultimap recentSolutions;
	GetMapOfRecentSolutionFiles( recentSolutions);

	TimeToStringsPairMultimap::reverse_iterator iter = recentSolutions.rbegin();
	while (iter != recentSolutions.rend()) 
	{
		VJSValue value( ioParms.GetContext());
		value.SetString( iter->second.first);
		result.PushValue( value);
		
		++iter;
	}

	ioParms.ReturnValue( result);
}

#endif
