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
#include "VProjectItem.h"
#include "VRIAServerSolution.h"
#include "VRIAServerProject.h"
#include "VRIAServerTools.h"
#include "VRIAServerJSAPI.h"
#include "VRIAServerLogger.h"
#include "VRIAPermissions.h"
#include "VRIAServerHTTPSession.h"
#include "VRIAServerHTTPRequestHandler.h"


USING_TOOLBOX_NAMESPACE



VHTTPRequestHandler::VHTTPRequestHandler( VRIAServerProject *inApplication, const VString& inPattern)
: fApplication(inApplication)
{
	fPatterns.push_back( inPattern);
}


VHTTPRequestHandler::~VHTTPRequestHandler()
{
	fPatterns.clear();
}


VError VHTTPRequestHandler::GetPatterns( VectorOfVString* outPatterns) const
{
	if (outPatterns != NULL)
	{
		outPatterns->clear();
		outPatterns->insert( outPatterns->begin(), fPatterns.begin(), fPatterns.end());
	}
	return VE_OK;
}



// ----------------------------------------------------------------------------



VJSRequestHandler::VJSRequestHandler( VRIAServerProject *inApplication, const VString& inPattern, IRIAJSCallback* inCallback)
: VHTTPRequestHandler( inApplication, inPattern)
{
	fCallback = RetainRefCountable( inCallback);
}


VJSRequestHandler::~VJSRequestHandler()
{
	QuickReleaseRefCountable( fCallback);
}


IRIAJSCallback* VJSRequestHandler::RetainCallback() const
{
	return RetainRefCountable( fCallback);
}


VError VJSRequestHandler::HandleRequest( IHTTPResponse* inResponse)
{
	if (inResponse == NULL || fApplication == NULL || fCallback == NULL)
		return ThrowError( VE_RIA_JS_CANNOT_CALL_REQUEST_HANDLER);

	VError err = VE_OK;
	StErrorContextInstaller errorContext;

	VJSGlobalContext *globalContext = fApplication->RetainJSContext( err, true, &inResponse->GetRequest());
	if (globalContext != NULL && err == VE_OK)
	{
		VJSContext jsContext( globalContext);
		VJSGlobalObject *jsGlobalObject = jsContext.GetGlobalObjectPrivateInstance();

		if (testAssert(jsGlobalObject != NULL))
		{
			// Evaluate required file
			for (MapOfIncludedFiles::iterator iter = fIncludedFiles.begin() ; iter != fIncludedFiles.end() ; ++iter)
			{
				if (jsGlobalObject->RegisterIncludedFile( iter->second))	// RegisterIncludedFile() returns false if the file is aready included
				{
					globalContext->EvaluateScript( iter->second, NULL);
				}
			}
		}

		// Create request and response JavaScript parameters
		VJSObject request( jsContext, VJSHTTPRequest::CreateInstance( jsContext, (IHTTPRequest*) &(inResponse->GetRequest())));
		std::vector<VJSValue> params;
		params.push_back( request);

		VJSObject response( jsContext, VJSHTTPResponse::CreateInstance( jsContext, inResponse));
		params.push_back( response);

		VJSValue result( jsContext);
		err = fCallback->Call( jsContext, &params, &result);
		if (err == VE_OK)
		{
			// If body has NOT already been set by SSJS API (using "response.body = myVar;" for example)...
			if (0 == inResponse->GetResponseBody().GetDataSize())
			{
				SetHTTPResponseFromJSValue (result, inResponse);
			}
		}
	}

	fApplication->ReleaseJSContext( globalContext, inResponse);

	if (err != VE_OK)
	{
		VString loggerID, name;
		fApplication->GetMessagesLoggerID( loggerID);
		fApplication->GetName( name);
		StUseLogger logger;

		logger.Log( loggerID, XBOX::eL4JML_Information, L"Calling JavaScript request handler");
		logger.LogMessagesFromErrorContext( loggerID, errorContext.GetContext());
	}

	return err;
}


void VJSRequestHandler::RegisterIncludedFile( VFile* inFile)
{
	if (inFile != NULL)
	{
		VString posixPath;
		VFilePath path;
		inFile->GetPath( path);
		VURL url( path);
		url.GetPath( posixPath, eURL_POSIX_STYLE, false);
	
		fIncludedFiles.insert( MapOfIncludedFiles::value_type( posixPath, inFile));
	}
}



// --------------------------------------------------------------------------



VDebugHTTPRequestHandler::VDebugHTTPRequestHandler( VRIAServerProject* inApplication, const VString& inPattern)
: VHTTPRequestHandler( inApplication, inPattern)
{
}


VDebugHTTPRequestHandler::~VDebugHTTPRequestHandler()
{
}


VError VDebugHTTPRequestHandler::HandleRequest( IHTTPResponse* inResponse)
{
	if (inResponse == NULL)
		return VE_INVALID_PARAMETER;

	VError err = VE_OK;
	bool handled = false;

	if (fApplication != NULL)
	{
		// sc 16/05/2012, the debug handler is only available for users which are belong to Debugger group
		bool accessGranted = false;

		VRIAHTTPSessionManager *sessionMgr = fApplication->RetainSessionMgr();
		if (sessionMgr != NULL)
		{
			CUAGDirectory *uagDirectory = fApplication->GetSolution()->RetainUAGDirectory();
			if (uagDirectory != NULL)
			{
				// sc 09/08/2012, retreive the session from the authentication infos instead of the cookie
				CUAGSession *uagSession = NULL;
				IAuthenticationInfos *authInfo = inResponse->GetRequest().GetAuthenticationInfos();
				if (authInfo != nil)
					uagSession = RetainRefCountable( authInfo->GetUAGSession());

				if (uagSession != NULL)
				{
					if (uagSession->hasExpired())
					{
						sessionMgr->RemoveSession( uagSession);
						ReleaseRefCountable( &uagSession);
					}
				}

				if (uagSession != NULL)
				{
					CUAGGroup *uagDebuggerGroup = uagDirectory->RetainSpecialGroup( CUAGDirectory::AdminGroup);
					if (uagDebuggerGroup != NULL)
					{
						accessGranted = uagSession->BelongsTo( uagDebuggerGroup);
						
						if (!accessGranted)
						{
							handled = true;
							err = inResponse->ReplyWithStatusCode( HTTP_FORBIDDEN);
						}

						uagDebuggerGroup->Release();
					}
				}
				else
				{
					handled = true;
					err = inResponse->ReplyWithStatusCode( HTTP_UNAUTHORIZED);
				}

				ReleaseRefCountable( &uagSession);
				uagDirectory->Release();
			}
			else
			{
				handled = true;
				err = inResponse->ReplyWithStatusCode( HTTP_INTERNAL_SERVER_ERROR);
			}

			sessionMgr->Release();
		}
		else
		{
			handled = true;
			err = inResponse->ReplyWithStatusCode( HTTP_INTERNAL_SERVER_ERROR);
		}

		if ((err == VE_OK) && accessGranted && !handled)
		{
		#if 1

			if (inResponse->GetRequest().GetURL().EqualToUSASCIICString( "/debug/eval/file"))
			{
				// the parameter is a posix path relative to the application folder
				VString param;
				param.FromBlock( inResponse->GetRequest().GetRequestBody().GetDataPtr(), inResponse->GetRequest().GetRequestBody().GetDataSize(), VTC_UTF_8);

		#else
			// to make easy test from the browser
			if (inResponse->GetRequest().GetURL().BeginsWith( L"/debug/eval/file/"))
			{
				// the parameter is a posix path relative to the application folder
				VString param;
				VIndex len = VString( L"/debug/eval/file/").GetLength();
				inResponse->GetRequest().GetURL().GetSubString( len + 1, inResponse->GetRequest().GetURL().GetLength() - len, param);

		#endif

				if (!param.IsEmpty())
				{
					VFilePath path;
					fApplication->BuildPathFromRelativePath( path, param, FPS_POSIX);
					if (!path.IsEmpty() && path.IsFile())
					{
						VFile script( path);
						if (script.Exists())
						{
							VJSGlobalContext *globalContext = fApplication->RetainJSContext( err, false, &inResponse->GetRequest());
							if (globalContext != NULL && err == VE_OK)
							{
								StErrorContextInstaller errorContext;

								VString loggerID, result, format( L"text/plain");
								VValueSingle *xvalue = NULL;

								fApplication->GetMessagesLoggerID( loggerID);
								StUseLogger logger;

								globalContext->EvaluateScript( &script, &xvalue, true );

								if (errorContext.GetLastError() != VE_OK)
								{
									// sc 02/06/2010 returns the error
									/*
									VErrorContext *context = errorContext.GetContext();
									if (context != NULL)
									{
										VString errorMessage;
										for (std::vector<VRefPtr<VErrorBase> >::const_iterator iter = context->GetErrorStack().begin() ; iter != context->GetErrorStack().end() ; ++iter)
										{
											if (iter != context->GetErrorStack().begin())
												result.AppendCString( "\r\n");

											(*iter)->GetErrorDescription( errorMessage);
											result.AppendString( errorMessage);
										}
									}
									*/
									VValueBag errorBag;
									VErrorTaskContext::BuildErrorStack(errorBag);
									errorBag.GetJSONString(result);

									err = inResponse->ReplyWithStatusCode( HTTP_INTERNAL_SERVER_ERROR);
								}
								else if (xvalue != NULL)
								{
									xvalue->GetString( result);
								}
									
								//if (err == VE_OK)
									err = SetHTTPResponseString( inResponse, result, &format);

								logger.LogMessagesFromErrorContext( loggerID, errorContext.GetContext());

								delete xvalue;

								handled = true;
							}

							fApplication->ReleaseJSContext( globalContext, inResponse);
						}
					}
				}
			}
			else if (inResponse->GetRequest().GetURL().EqualToUSASCIICString( "/debug/isOpenedSolution"))
			{
				// the parameter is the full posix path of the solution file
				VString param;
				param.FromBlock( inResponse->GetRequest().GetRequestBody().GetDataPtr(), inResponse->GetRequest().GetRequestBody().GetDataSize(), VTC_UTF_8);

				if (!param.IsEmpty())
				{
					VFilePath path( param, FPS_POSIX);
					if (!path.IsEmpty() && path.IsFile())
					{
						VFile fileParam( path);
						bool sameFile = false;

						VSolution *solution = fApplication->GetSolution()->GetDesignSolution();
						if (solution != NULL)
						{
							VProjectItem *item = solution->GetSolutionFileProjectItem();
							if (item != NULL)
							{
								item->GetFilePath( path);
								VFile openedFile( path);
								sameFile = openedFile.IsSameFile( &fileParam);
							}
						}

						handled = true;
						VString format( L"text/plain"), result( (sameFile) ? L"yes" : L"no");
						err = SetHTTPResponseString( inResponse, result, &format);
					}
				}
			}
			else if (inResponse->GetRequest().GetURL().EqualToUSASCIICString( "/debug/reloadCatalog"))
			{
				handled = true;
				
				err = fApplication->ReloadCatalog( NULL);
				if (err == VE_OK)
					err = inResponse->ReplyWithStatusCode( HTTP_OK);
				else
					err = inResponse->ReplyWithStatusCode( HTTP_INTERNAL_SERVER_ERROR);
			}
		}
	}

	if (!handled)
	{
		err = inResponse->ReplyWithStatusCode( HTTP_NOT_FOUND);
	}

	return err;
}

