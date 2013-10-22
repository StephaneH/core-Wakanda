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
#include "DB4D/Headers/DB4D.h"
#include "VRPCCatalog.h"
#include "VRPCService.h"
#include "VRIAServerJSContextMgr.h"
#include "VSolutionStartupParameters.h"
#include "VRIAServerHTTPRequestHandler.h"
#include "VJSApplication.h"
#include "VRIAServerJSAPI.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "JSDebugger/Interfaces/CJSWDebuggerFactory.h"
#include "commonJSAPI.h"
#include "ServerNet/Sources/HTTPTools.h"

USING_TOOLBOX_NAMESPACE



// Classes names constants
const char kSSJS_CLASS_NAME_Solution[] = "Solution";
const char kSSJS_CLASS_NAME_Application[] = "Application";
const char kSSJS_CLASS_NAME_HTTPServer[] = "HttpServer";
const char kSSJS_CLASS_NAME_SSL[] = "SSL";
const char kSSJS_CLASS_NAME_HTTPServerCache[] = "HttpServerCache";
const char kSSJS_CLASS_NAME_Console[] = "Console";
const char kSSJS_CLASS_NAME_OS[] = "os";

// Properties names constants
const char kSSJS_PROPERTY_NAME_Solution[] = "solution";
const char kSSJS_PROPERTY_NAME_Application[] = "application";
const char kSSJS_PROPERTY_NAME_Database[] = "db";
const char kSSJS_PROPERTY_NAME_DataStore[] = "ds";
const char kSSJS_PROPERTY_NAME_HTTPServer[] = "httpServer";
const char kSSJS_PROPERTY_NAME_SSL[] = "ssl";
const char kSSJS_PROPERTY_NAME_HTTPServerCache[] = "cache";
const char kSSJS_PROPERTY_NAME_Console[] = "console";
const char kSSJS_PROPERTY_NAME_SessionStorage[] = "oldSessionStorage";
const char kSSJS_PROPERTY_NAME_AddHttpRequestHandler[] = "addHttpRequestHandler";
const char kSSJS_PROPERTY_NAME_RemoveHttpRequestHandler[] = "removeHttpRequestHandler";
const char kSSJS_PROPERTY_NAME_GetFolder[] = "getFolder";
const char kSSJS_PROPERTY_NAME_GetSettingFile[] = "getSettingFile";
const char kSSJS_PROPERTY_NAME_GetWalibFolder[] = "getWalibFolder";
const char kSSJS_PROPERTY_NAME_GetItemsWithRole[] = "getItemsWithRole";
const char kSSJS_PROPERTY_NAME_Name[] = "name";
const char kSSJS_PROPERTY_NAME_Administrator[] = "administrator";
const char kSSJS_PROPERTY_NAME_Pattern[] = "pattern";
const char kSSJS_PROPERTY_NAME_Storage[] = "storage";
const char kSSJS_PROPERTY_NAME_Settings[] = "settings";
const char kSSJS_PROPERTY_NAME_Type[] = "type";
const char kSSJS_PROPERTY_NAME_Internal[] = "internal";
const char kSSJS_PROPERTY_NAME_Directory[] = "directory";
const char kSSJS_PROPERTY_NAME_OS[] = "os";
const char kSSJS_PROPERTY_NAME_Permissions[] = "permissions";
const char kSSJS_PROPERTY_NAME_backupSettings[] = "backupSettings";
const char kSSJS_PROPERTY_NAME_wildchar[] = "wildchar";

const char kSSJS_PROPERTY_NAME_verifyDataStore[] = "verifyDataStore";
const char kSSJS_PROPERTY_NAME_repairDataStore[] = "repairDataStore";
const char kSSJS_PROPERTY_NAME_compactDataStore[] = "compactDataStore";
const char kSSJS_PROPERTY_NAME_backupDataStore[] = "backupDataStore";

const char kSSJS_PROPERTY_NAME_setCurrentUser[] = "setCurrentUser";
const char kSSJS_PROPERTY_NAME_loginByKey[] = "loginByKey";
const char kSSJS_PROPERTY_NAME_loginByPassword[] = "loginByPassword";
const char kSSJS_PROPERTY_NAME_currentUser[] = "currentUser";
const char kSSJS_PROPERTY_NAME_currentSession[] = "currentSession";
const char kSSJS_PROPERTY_NAME_getUserSessions[] = "getUserSessions";
const char kSSJS_PROPERTY_NAME_logout[] = "logout";



// ----------------------------------------------------------------------------
// Utilities

bool SetHTTPResponseFromJSValue (const XBOX::VJSValue& inValue, IHTTPResponse *ioResponse)
{
	if (inValue.IsNull() || inValue.IsUndefined())
		return false;

	bool result = false;

	if (inValue.IsString())
	{
		XBOX::VString valueString;

		if (inValue.GetString (valueString))
		{
			XBOX::VString	contentType;
			XBOX::CharSet	charSet = XBOX::VTC_UNKNOWN;

			ioResponse->GetContentTypeHeader (contentType, &charSet);

			if (contentType.IsEmpty())
				contentType.FromCString ("text/plain");

			if (XBOX::VTC_UNKNOWN == charSet)
				charSet = XBOX::VTC_UTF_8;

			XBOX::StStringConverter<char> buffer (valueString, charSet);
			ioResponse->SetResponseBody (buffer.GetCPointer(), buffer.GetLength());
			ioResponse->SetContentTypeHeader (contentType, charSet);
			ioResponse->SetContentLengthHeader (buffer.GetLength());

			result = true;
		}
	}
	else
	{
		XBOX::VValueSingle *value = inValue.CreateVValue();

		if (NULL != value)
		{
			XBOX::VError error = XBOX::VE_OK;

			if (VK_IMAGE == value->GetValueKind())
			{
#if !VERSION_LINUX
				XBOX::VPicture *picture = (XBOX::VPicture *)value;
				XBOX::VString mimeType;
				XBOX::VString contentType;

				if (!ioResponse->GetContentTypeHeader (contentType) || contentType.IsEmpty())
					contentType.FromCString ("image/png;image/jpeg;image/gif");

				if (XBOX::VE_OK == ioResponse->GetResponseBody().OpenWriting())
				{
					error = ExtractBestPictureForWeb (*picture, ioResponse->GetResponseBody(), contentType, true, mimeType);
					ioResponse->GetResponseBody().CloseWriting();
				}

				if (contentType != mimeType)
					ioResponse->SetContentTypeHeader (mimeType);

				ioResponse->SetContentLengthHeader (ioResponse->GetResponseBody().GetDataSize());
#endif
			}
			else if (VK_BLOB == value->GetValueKind())
			{
				XBOX::VString	contentType;

				if (!ioResponse->GetContentTypeHeader (contentType))
				{
					VJSObject object = inValue.GetObject();
					if (!object.GetPropertyAsString (CVSTR ("type"), NULL, contentType) || contentType.IsEmpty())
						contentType.FromString (CVSTR ("application/octet-stream"));

					ioResponse->SetContentTypeHeader (contentType);
				}

				if (XBOX::VE_OK == ioResponse->GetResponseBody().OpenWriting())
				{
					XBOX::VBlobWithPtr *blob = dynamic_cast<XBOX::VBlobWithPtr *>(value);

					error = ioResponse->GetResponseBody().PutData (blob->GetDataPtr(), blob->GetSize());

					ioResponse->GetResponseBody().CloseWriting();
					ioResponse->SetContentLengthHeader (blob->GetSize());
				}
			}
			else
			{
				error = XBOX::VE_INVALID_PARAMETER;
			}

			result = (XBOX::VE_OK == error);
		}
		else // Object is null... Try to get a string value (probably something like "undefined")
		{
			XBOX::VString valueString;

			if (inValue.GetString (valueString))
			{
				XBOX::StStringConverter<char> buffer (valueString, XBOX::VTC_UTF_8);
				ioResponse->SetResponseBody (buffer.GetCPointer(), buffer.GetLength());
				ioResponse->SetContentTypeHeader (CVSTR ("text/plain"), XBOX::VTC_UTF_8);
				ioResponse->SetContentLengthHeader (buffer.GetLength());

				result = true;
			}
		}
	}

//	ioResponse->AllowCompression (false);
	if (!ioResponse->CanCacheBodyMessage())
	{
		ioResponse->SetExpiresHeader (GMT_NOW);
		ioResponse->AddResponseHeader (HEADER_PRAGMA, CVSTR ("no-cache"));
	}

	return result;
}


bool SendChunkedResponseFromJSValue (const XBOX::VJSValue& inValue, IHTTPResponse *ioResponse)
{
	if (inValue.IsNull())
		return false;

	bool result = false;

	if (inValue.IsString())
	{
		XBOX::VString valueString;

		if (inValue.GetString (valueString))
		{
			XBOX::VString	contentType;
			XBOX::CharSet	charSet = XBOX::VTC_UNKNOWN;

			ioResponse->GetContentTypeHeader (contentType, &charSet);

			if (contentType.IsEmpty())
				contentType.FromCString ("text/plain");

			if (XBOX::VTC_UNKNOWN == charSet)
				charSet = XBOX::VTC_UTF_8;

			if (!ioResponse->IsResponseHeaderSet (HEADER_CONTENT_TYPE))
				ioResponse->SetContentTypeHeader (contentType, charSet);

			XBOX::StStringConverter<char> buffer (valueString, charSet);
			ioResponse->SendData ((void *)buffer.GetCPointer(), buffer.GetLength(), true);
			result = true;
		}
	}
	else if (inValue.IsObject())
	{
		XBOX::VError	error = XBOX::VE_OK;
		VJSObject		object = inValue.GetObject();

		if (object.IsOfClass (VJSFileIterator::Class()))
		{
			JS4DFileIterator *	fileObject = object.GetPrivateData<VJSFileIterator>();
			XBOX::VFile *		file = (fileObject) ? fileObject->GetFile() : NULL;

			xbox_assert (fileObject != NULL);
			xbox_assert (file != NULL);	

			if (file->Exists())
			{
				ioResponse->AllowCompression (false);
				ioResponse->SetCacheBodyMessage (false);
				ioResponse->SetFileToSend (file);
			}
			else
			{
				ioResponse->ReplyWithStatusCode (HTTP_NOT_FOUND);
			}
		}
		else
		{
			XBOX::VPtrStream		stream;
			XBOX::VValueSingle *	value = inValue.CreateVValue();

			if (NULL != value)
			{
				if (VK_IMAGE == value->GetValueKind())
				{
#if !VERSION_LINUX
					XBOX::VPicture *picture = (XBOX::VPicture *)value;
					XBOX::VString	mimeType;
					XBOX::VString	contentType;

					if (!ioResponse->GetContentTypeHeader (contentType) || contentType.IsEmpty())
						contentType.FromCString ("image/png;image/jpeg;image/gif");

					if (XBOX::VE_OK == stream.OpenWriting())
					{
						error = ExtractBestPictureForWeb (*picture, stream, contentType, true, mimeType);
						stream.CloseWriting();
					}

					if (contentType != mimeType)
						ioResponse->SetContentTypeHeader (mimeType);
#endif
				}
				else if (VK_BLOB == value->GetValueKind())
				{
					XBOX::VString	contentType;

					if (!ioResponse->GetContentTypeHeader (contentType))
					{
						if (!object.GetPropertyAsString (CVSTR ("type"), NULL, contentType) || contentType.IsEmpty())
							contentType.FromString (CVSTR ("application/octet-stream"));

						ioResponse->SetContentTypeHeader (contentType);
					}

					if (XBOX::VE_OK == stream.OpenWriting())
					{
						XBOX::VBlobWithPtr *blob = dynamic_cast<XBOX::VBlobWithPtr *>(value);

						error = stream.PutData (blob->GetDataPtr(), blob->GetSize());

						stream.CloseWriting();
					}
				}
				else
				{
					error = XBOX::VE_INVALID_PARAMETER;
				}
			}
			else
			{
				error = XBOX::VE_INVALID_PARAMETER;
			}

			if (XBOX::VE_OK == error)
			{
				if (XBOX::VE_OK == (error = stream.OpenReading()))
					error = ioResponse->SendData (stream.GetDataPtr(), stream.GetDataSize(), true);
				stream.CloseReading();
			}
			else
			{
				ioResponse->ReplyWithStatusCode (HTTP_INTERNAL_SERVER_ERROR);
			}
		}

		result = (XBOX::VE_OK == error);
	}

	return result;
}


static
XBOX::VJSValue GetJSValueFromHTTPMessageBody (JS4D::ContextRef inContext, const MimeTypeKind& inContentKind, const XBOX::CharSet& inCharSet, XBOX::VPtrStream *ioStream)
{
	XBOX::VJSValue		result (inContext);
	MimeTypeKind		contentTypeKind = inContentKind;
	XBOX::CharSet		charSet = inCharSet;

	if (MIMETYPE_UNDEFINED == contentTypeKind)
		contentTypeKind = MIMETYPE_BINARY;

	if (MIMETYPE_UNDEFINED != contentTypeKind)
	{
		if (XBOX::VE_OK == ioStream->OpenReading())
		{
			switch (contentTypeKind)
			{
			case MIMETYPE_TEXT:
				{
					XBOX::VString	stringValue;

					if (XBOX::VTC_UNKNOWN == charSet)
						charSet = XBOX::VTC_UTF_8;

					stringValue.FromBlock (ioStream->GetDataPtr(), ioStream->GetDataSize(), charSet);

					result.SetString (stringValue);
					break;
				}

			case MIMETYPE_IMAGE:
				{
#if !VERSION_LINUX
					XBOX::VPicture image;

					if (XBOX::VE_OK == ReadPictureFromStream (image, *ioStream))
						result.SetVValue (image);
					else
						result.SetNull();
					break;
#else
                    result.SetNull();
#endif
				}

			case MIMETYPE_BINARY:
				{
					XBOX::VBlobWithPtr blob (ioStream->GetDataPtr(), ioStream->GetDataSize());

					if (!blob.IsNull())
						result.SetVValue (blob);
					else
						result.SetNull();
					break;
				}
			}

			ioStream->CloseReading();
		}
		else
		{
			result.SetNull();
		}
	}

	return result;
}


// ----------------------------------------------------------------------------
// JavaScript API


std::map<XBOX::VString, XBOX::VString> VJSHTTPRequestHeader::fCommonHeaders;


void VJSHTTPRequestHeader::Initialize (const XBOX::VJSParms_initialize& inParms, XBOX::VHTTPHeader *inHeader)
{
	if (!fCommonHeaders.empty())
		return;

	fCommonHeaders[CVSTR ("Accept")] = CVSTR ("ACCEPT");
	fCommonHeaders[CVSTR ("Accept-Charset")] = CVSTR ("ACCEPT_CHARSET");
	fCommonHeaders[CVSTR ("Accept-Encoding")] = CVSTR ("ACCEPT_ENCODING");
	fCommonHeaders[CVSTR ("Accept-Language")] = CVSTR ("ACCEPT_LANGUAGE");
	fCommonHeaders[CVSTR ("Authorization")] = CVSTR ("AUTHORIZATION");
	fCommonHeaders[CVSTR ("Cache-Control")] = CVSTR ("CACHE_CONTROL");
	fCommonHeaders[CVSTR ("Content-Length")] = CVSTR ("CONTENT_LENGTH");
	fCommonHeaders[CVSTR ("Content-Type")] = CVSTR ("CONTENT_TYPE");
	fCommonHeaders[CVSTR ("Cookie")] = CVSTR ("COOKIE");
	fCommonHeaders[CVSTR ("Expect")] = CVSTR ("EXPECT");
	fCommonHeaders[CVSTR ("From")] = CVSTR ("FROM");
	fCommonHeaders[CVSTR ("Host")] = CVSTR ("HOST");
	fCommonHeaders[CVSTR ("If-Match")] = CVSTR ("IF_MATCH");
	fCommonHeaders[CVSTR ("If-Modified-Since")] = CVSTR ("IF_MODIFIED_SINCE");
	fCommonHeaders[CVSTR ("If-None-Match")] = CVSTR ("IF_NONE_MATCH");
	fCommonHeaders[CVSTR ("If-Range")] = CVSTR ("IF_RANGE");
	fCommonHeaders[CVSTR ("If-Unmodified-Since")] = CVSTR ("IF_UNMODIFIED_SINCE");
	fCommonHeaders[CVSTR ("Keep-Alive")] = CVSTR ("KEEP_ALIVE");
	fCommonHeaders[CVSTR ("Max-Forwards")] = CVSTR ("MAX_FORWARDS");
	fCommonHeaders[CVSTR ("Pragma")] = CVSTR ("PRAGMA");
	fCommonHeaders[CVSTR ("Proxy-Authorization")] = CVSTR ("PROXY_AUTHORIZATION");
	fCommonHeaders[CVSTR ("Range")] = CVSTR ("RANGE");
	fCommonHeaders[CVSTR ("Referer")] = CVSTR ("REFERER");
	fCommonHeaders[CVSTR ("TE")] = CVSTR ("TE");
	fCommonHeaders[CVSTR ("User-Agent")] = CVSTR ("USER_AGENT");
}


void VJSHTTPRequestHeader::Finalize (const XBOX::VJSParms_finalize& inParms, XBOX::VHTTPHeader *inHeader)
{
}


void VJSHTTPRequestHeader::_GetHeaderNameFromPropertyName (const XBOX::VString& inPropertyName, XBOX::VString& outHeaderName)
{
	outHeaderName.Clear();

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
	{
		if ((*it).second.EqualToString (inPropertyName))
		{
			outHeaderName.FromString ((*it).first);
			break;
		}
	}

	if (outHeaderName.IsEmpty())
		outHeaderName.FromString (inPropertyName);
}


void VJSHTTPRequestHeader::GetProperty (XBOX::VJSParms_getProperty& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString propertyName;
	XBOX::VString headerName;
	XBOX::VString headerValue;

	ioParms.GetPropertyName (propertyName);
	_GetHeaderNameFromPropertyName (propertyName, headerName);

	if (inHeader->GetHeaderValue (headerName, headerValue))
		ioParms.ReturnString (headerValue);
}


bool VJSHTTPRequestHeader::SetProperty (XBOX::VJSParms_setProperty& ioParms, XBOX::VHTTPHeader *inHeader)
{
	return false;
}


void VJSHTTPRequestHeader::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
		ioParms.AddPropertyName ((*it).second);
}


void VJSHTTPRequestHeader::_GetHeaderValue (VJSParms_callStaticFunction& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString headerName;
	XBOX::VString headerValue;

	if (ioParms.GetStringParam (1, headerName))
		inHeader->GetHeaderValue (headerName, headerValue);

	ioParms.ReturnString (headerValue);
}


void VJSHTTPRequestHeader::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getHeaderValue", js_callStaticFunction<_GetHeaderValue>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};
	
	outDefinition.className = "HttpRequestHeader";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.setProperty = js_setProperty<SetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
}


//--------------------------------------------------------------------------------------------------


std::map<XBOX::VString, XBOX::VString> VJSHTTPResponseHeader::fCommonHeaders;


void VJSHTTPResponseHeader::Initialize (const XBOX::VJSParms_initialize& inParms, XBOX::VHTTPHeader *inHeader)
{
	if (!fCommonHeaders.empty())
		return;

	fCommonHeaders[CVSTR ("Accept-Ranges")] = CVSTR ("ACCEPT_RANGES");
	fCommonHeaders[CVSTR ("Age")] = CVSTR ("AGE");
	fCommonHeaders[CVSTR ("Allow")] = CVSTR ("ALLOW");
	fCommonHeaders[CVSTR ("Cache-Control")] = CVSTR ("CACHE_CONTROL");
	fCommonHeaders[CVSTR ("Connection")] = CVSTR ("CONNECTION");
	fCommonHeaders[CVSTR ("Date")] = CVSTR ("DATE");
	fCommonHeaders[CVSTR ("ETag")] = CVSTR ("ETAG");
	fCommonHeaders[CVSTR ("Content-Encoding")] = CVSTR ("CONTENT_ENCODING");
	fCommonHeaders[CVSTR ("Content-Language")] = CVSTR ("CONTENT_LANGUAGE");
	fCommonHeaders[CVSTR ("Content-Length")] = CVSTR ("CONTENT_LENGTH");
	fCommonHeaders[CVSTR ("Content-Location")] = CVSTR ("CONTENT_LOCATION");
	fCommonHeaders[CVSTR ("Content-MD5")] = CVSTR ("CONTENT_MD5");
	fCommonHeaders[CVSTR ("Content-Range")] = CVSTR ("CONTENT_RANGE");
	fCommonHeaders[CVSTR ("Content-Type")] = CVSTR ("CONTENT_TYPE");
	fCommonHeaders[CVSTR ("Expires")] = CVSTR ("EXPIRES");
	fCommonHeaders[CVSTR ("Last-Modified")] = CVSTR ("LAST_MODIFIED");
	fCommonHeaders[CVSTR ("Location")] = CVSTR ("LOCATION");
	fCommonHeaders[CVSTR ("Pragma")] = CVSTR ("PRAGMA");
	fCommonHeaders[CVSTR ("Proxy-Authenticate")] = CVSTR ("PROXY_AUTHENTICATE");
	fCommonHeaders[CVSTR ("Retry-After")] = CVSTR ("RETRY_AFTER");
	fCommonHeaders[CVSTR ("Server")] = CVSTR ("SERVER");
	fCommonHeaders[CVSTR ("Set-Cookie")] = CVSTR ("SET_COOKIE");
	fCommonHeaders[CVSTR ("Status")] = CVSTR ("STATUS");
	fCommonHeaders[CVSTR ("Vary")] = CVSTR ("VARY");
	fCommonHeaders[CVSTR ("WWW-Authenticate")] = CVSTR ("WWW_AUTHENTICATE");
	fCommonHeaders[CVSTR ("X-Status")] = CVSTR ("X_STATUS");
	fCommonHeaders[CVSTR ("X-Powered-By")] = CVSTR ("X_POWERED_BY");
	fCommonHeaders[CVSTR ("X-Version")] = CVSTR ("X_VERSION");
}


void VJSHTTPResponseHeader::Finalize (const XBOX::VJSParms_finalize& inParms, XBOX::VHTTPHeader *inHeader)
{
}


void VJSHTTPResponseHeader::_GetHeaderNameFromPropertyName (const XBOX::VString& inPropertyName, XBOX::VString& outHeaderName)
{
	outHeaderName.Clear();

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
	{
		if ((*it).second.EqualToString (inPropertyName))
		{
			outHeaderName.FromString ((*it).first);
			break;
		}
	}

	if (outHeaderName.IsEmpty())
		outHeaderName.FromString (inPropertyName);
}


void VJSHTTPResponseHeader::GetProperty (XBOX::VJSParms_getProperty& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString propertyName;
	XBOX::VString headerName;
	XBOX::VString headerValue;

	ioParms.GetPropertyName (propertyName);
	_GetHeaderNameFromPropertyName (propertyName, headerName);

	if (inHeader->GetHeaderValue (headerName, headerValue))
		ioParms.ReturnString (headerValue);
}


bool VJSHTTPResponseHeader::SetProperty (XBOX::VJSParms_setProperty& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return false;
	}

	XBOX::VString propertyName;
	XBOX::VString headerName;
	XBOX::VString headerValue;

	ioParms.GetPropertyName (propertyName);
	ioParms.GetPropertyValue().GetString (headerValue);

	_GetHeaderNameFromPropertyName (propertyName, headerName);

	if (inHeader->SetHeaderValue (headerName, headerValue))
		return true;

	return false;
}


void VJSHTTPResponseHeader::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, XBOX::VHTTPHeader* inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
		ioParms.AddPropertyName ((*it).second);
}


void VJSHTTPResponseHeader::_GetHeaderValue (VJSParms_callStaticFunction& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString headerName;
	XBOX::VString headerValue;

	if (ioParms.GetStringParam (1, headerName))
		inHeader->GetHeaderValue (headerName, headerValue);

	ioParms.ReturnString (headerValue);
}


void VJSHTTPResponseHeader::_SetHeaderValue (VJSParms_callStaticFunction& ioParms, XBOX::VHTTPHeader *inHeader)
{
	if (NULL == inHeader)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString headerName;
	XBOX::VString headerValue;

	if (ioParms.GetStringParam (1, headerName) && ioParms.GetStringParam (2, headerValue))
		inHeader->SetHeaderValue (headerName, headerValue);
}


void VJSHTTPResponseHeader::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getHeaderValue", js_callStaticFunction<_GetHeaderValue>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "setHeaderValue", js_callStaticFunction<_SetHeaderValue>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};
	
	outDefinition.className = "HttpResponseHeader";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.setProperty = js_setProperty<SetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
}


//--------------------------------------------------------------------------------------------------


void VJSHTTPRequest::Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPRequest *inRequest)
{
}


void VJSHTTPRequest::Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPRequest *inRequest)
{
}


void VJSHTTPRequest::_GetURL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetURL());
}


void VJSHTTPRequest::_GetRawURL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetRawURL());
}


void VJSHTTPRequest::_GetURLPath (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetURLPath());
}


void VJSHTTPRequest::_GetURLQuery (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetURLQuery());
}


void VJSHTTPRequest::_GetHost (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetHost());
}


void VJSHTTPRequest::_GetMethod (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString valueString;
	inRequest->GetRequestMethodString (valueString);
	ioParms.ReturnString (valueString);
}


void VJSHTTPRequest::_GetVersion (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString valueString;
	inRequest->GetRequestHTTPVersionString (valueString);
	ioParms.ReturnString (valueString);
}


void VJSHTTPRequest::_GetUser (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString valueString;
	inRequest->GetAuthenticationInfos()->GetUserName (valueString);
	ioParms.ReturnString (valueString);
}


void VJSHTTPRequest::_GetPassword (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString valueString;
	inRequest->GetAuthenticationInfos()->GetPassword (valueString);
	ioParms.ReturnString (valueString);
}


void VJSHTTPRequest::_GetRequestLine (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetRequestLine());
}


void VJSHTTPRequest::_GetHeaders (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VHTTPHeader *header = const_cast<XBOX::VHTTPHeader *> (&inRequest->GetHTTPHeaders());
	VJSObject	resultObject = VJSHTTPRequestHeader::CreateInstance (ioParms.GetContext(), header);
	ioParms.ReturnValue (resultObject);
}


void VJSHTTPRequest::_GetBody (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	MimeTypeKind		contentTypeKind = inRequest->GetContentTypeKind();
	XBOX::VPtrStream *	stream = const_cast<XBOX::VPtrStream*> (&inRequest->GetRequestBody());
	XBOX::VString		contentType;
	XBOX::CharSet		charSet = XBOX::VTC_UNKNOWN;

	inRequest->GetContentTypeHeader (contentType, &charSet);

	XBOX::VJSValue result = GetJSValueFromHTTPMessageBody (ioParms.GetContextRef(), contentTypeKind, charSet, stream);
	ioParms.ReturnValue (result);
}


void VJSHTTPRequest::_GetParts (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VMIMEMessage * form = const_cast<XBOX::VMIMEMessage *> (inRequest->GetHTMLForm());
	VJSObject	resultObject = VJSMIMEMessage::CreateInstance (ioParms.GetContext(), form);
	ioParms.ReturnValue (resultObject);
}


void VJSHTTPRequest::_GetContentType (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString contentType;
	inRequest->GetHTTPHeaders().GetHeaderValue (HEADER_CONTENT_TYPE, contentType);
	ioParms.ReturnString (contentType);
}


void VJSHTTPRequest::_GetLocalAddress (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetLocalIP());
}


void VJSHTTPRequest::_GetLocalPort (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnNumber (inRequest->GetLocalPort());
}


void VJSHTTPRequest::_GetIsSSL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnBool (inRequest->IsSSL());
}


void VJSHTTPRequest::_GetRemoteAddress (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnString (inRequest->GetPeerIP());
}


void VJSHTTPRequest::_GetRemotePort (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnNumber (inRequest->GetPeerPort());
}


/*
 *	Internal Use Only - Do NOT document the following function
 */
void VJSHTTPRequest::_ResolveURL (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPRequest *inRequest)
{
	/*
	 *	JS Sample code usage:
	 *	var filePath = request.resolveURL ('/', 'path', 'system');
	 *	var filePath = request.resolveURL ('/', 'path', 'posix');
	 *	var filePath = request.resolveURL ('/', 'url', 'encoded');
	 *	var filePath = request.resolveURL ('/', 'url', 'notEncoded');
	 *	var filePath = request.resolveURL ('/', 'relativePath', 'system');
	 *	var filePath = request.resolveURL ('/', 'relativePath', 'posix');
	 */
	XBOX::VString	URLString;

	if (NULL != inRequest && (ioParms.GetStringParam (1, URLString)))
	{
		XBOX::VFilePath	filePath;
		XBOX::VFilePath	webFolderPath;
		XBOX::VError	error = VRoutingPreProcessingHandler::ResolveURL (inRequest, URLString, filePath, webFolderPath);
		XBOX::VFolder	webFolder (webFolderPath);

		if (XBOX::VE_OK == error)
			JSReturnFolderOrFile (filePath, &webFolder, ioParms, 2, 3);
		else
			XBOX::vThrowError (error);
	}	
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
	}
}


void VJSHTTPRequest::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "resolveURL", js_callStaticFunction<_ResolveURL>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] = 
	{
		{ "url", js_getProperty<_GetURL>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "rawURL", js_getProperty<_GetRawURL>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "urlPath", js_getProperty<_GetURLPath>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "urlQuery", js_getProperty<_GetURLQuery>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "host", js_getProperty<_GetHost>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "method", js_getProperty<_GetMethod>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "version", js_getProperty<_GetVersion>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "user", js_getProperty<_GetUser>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "password", js_getProperty<_GetPassword>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "requestLine", js_getProperty<_GetRequestLine>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "headers", js_getProperty<_GetHeaders>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "body", js_getProperty<_GetBody>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "parts", js_getProperty<_GetParts>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "contentType", js_getProperty<_GetContentType>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "localAddress", js_getProperty<_GetLocalAddress>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "localPort", js_getProperty<_GetLocalPort>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "isSSL", js_getProperty<_GetIsSSL>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "remoteAddress", js_getProperty<_GetRemoteAddress>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "remotePort", js_getProperty<_GetRemotePort>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0, 0}
	};
	
	outDefinition.className = "HttpRequest";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticValues = values;
	outDefinition.staticFunctions = functions;
}


//--------------------------------------------------------------------------------------------------


void VJSHTTPResponse::Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPResponse* inResponse)
{
}


void VJSHTTPResponse::Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPResponse* inResponse)
{
}


void VJSHTTPResponse::GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTTPResponse* inResponse)
{
	if (NULL == inResponse)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString propertyName;
	XBOX::VString stringValue;

	ioParms.GetPropertyName (propertyName);

	if (propertyName.EqualToUSASCIICString ("statusCode"))
	{
		ioParms.ReturnNumber ((sLONG)inResponse->GetResponseStatusCode());
	}
	else if (propertyName.EqualToUSASCIICString ("body"))
	{
		MimeTypeKind		contentTypeKind = inResponse->GetContentTypeKind();
		XBOX::VPtrStream *	stream = const_cast<XBOX::VPtrStream*> (&inResponse->GetResponseBody());
		XBOX::VString		contentType;
		XBOX::CharSet		charSet = XBOX::VTC_UNKNOWN;

		inResponse->GetContentTypeHeader (contentType, &charSet);

		XBOX::VJSValue result = GetJSValueFromHTTPMessageBody (ioParms.GetContextRef(), contentTypeKind, charSet, stream);
		ioParms.ReturnValue (result);
	}
	else if (propertyName.EqualToUSASCIICString ("headers"))
	{
		XBOX::VHTTPHeader *header = const_cast<XBOX::VHTTPHeader *>(&inResponse->GetResponseHeader());
		VJSObject	resultObject = VJSHTTPResponseHeader::CreateInstance (ioParms.GetContext(), header);
		ioParms.ReturnValue (resultObject);
	}
	else if (propertyName.EqualToUSASCIICString ("contentType"))
	{
		XBOX::VString contentType;
		inResponse->GetResponseHeader (HEADER_CONTENT_TYPE, contentType);
		ioParms.ReturnString (contentType);
	}
}


bool VJSHTTPResponse::SetProperty (XBOX::VJSParms_setProperty& ioParms, IHTTPResponse *inResponse)
{
	if (NULL == inResponse)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return false;
	}

	bool			result = false;
	XBOX::VString	propertyName;
	XBOX::VString	valueString;

	ioParms.GetPropertyName (propertyName);

	if (propertyName.EqualToUSASCIICString ("statusCode"))
	{
		sLONG statusCode = 0;
		if (ioParms.GetPropertyValue().GetLong (&statusCode))
		{
			if (((HTTPStatusCode)statusCode > HTTP_UNDEFINED) && ((HTTPStatusCode)statusCode <= HTTP_HTTP_VERSION_NOT_SUPPORTED))
				inResponse->SetResponseStatusCode ((HTTPStatusCode)statusCode);
			result = true;
		}
	}
	else if (propertyName.EqualToUSASCIICString ("body"))
	{
		result = SetHTTPResponseFromJSValue (ioParms.GetPropertyValue(), inResponse);
	}
	else if (propertyName.EqualToUSASCIICString ("contentType"))
	{
		XBOX::VString contentType;

		if (ioParms.GetPropertyValue().GetString (contentType) && !contentType.IsEmpty())
			result = inResponse->AddResponseHeader (HEADER_CONTENT_TYPE, contentType);
	}

	return result;
}


void VJSHTTPResponse::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTTPResponse *inResponse)
{
	ioParms.AddPropertyName (CVSTR ("statusCode"));
	ioParms.AddPropertyName (CVSTR ("body"));
	ioParms.AddPropertyName (CVSTR ("headers"));
	ioParms.AddPropertyName (CVSTR ("contentType"));
}


void VJSHTTPResponse::_SendChunkedData (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse)
{
	if (NULL == inResponse)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	SendChunkedResponseFromJSValue (ioParms.GetParamValue (1), inResponse);
}


void VJSHTTPResponse::_SetCompression (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse)
{
	if (NULL != inResponse)
	{
		sLONG minThreshold = -1, maxThreshold = -1;
		if (ioParms.IsNumberParam(1))
		{
			ioParms.GetLongParam(1, &minThreshold);
		}
		if (ioParms.IsNumberParam(2))
		{
			ioParms.GetLongParam(2, &maxThreshold);
		}
		inResponse->AllowCompression(true, minThreshold, maxThreshold);
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
	}
}


void VJSHTTPResponse::_SetCacheBodyMessage (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse)
{
	if (NULL != inResponse)
	{
		bool bValue = false;

		if (ioParms.IsBooleanParam (1))
		{
			ioParms.GetBoolParam (1, &bValue);
		}

		inResponse->SetCacheBodyMessage (bValue);
	}	
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
	}
}


void VJSHTTPResponse::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "sendChunkedData", js_callStaticFunction<_SendChunkedData>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "allowCompression", js_callStaticFunction<_SetCompression>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ "allowCache", js_callStaticFunction<_SetCacheBodyMessage>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontEnum | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};
	
	outDefinition.className = "HttpResponse";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.setProperty = js_setProperty<SetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
}


// ----------------------------------------------------------------------------


void VJSMIMEMessage::Initialize (const XBOX::VJSParms_initialize& inParms, XBOX::VMIMEMessage *inMIMEMessage)
{
}


void VJSMIMEMessage::Finalize (const XBOX::VJSParms_finalize& inParms, XBOX::VMIMEMessage *inMIMEMessage)
{
}


void VJSMIMEMessage::GetProperty (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessage *inMIMEMessage)
{
	sLONG num = 0;

	if ((NULL != inMIMEMessage) && ioParms.GetPropertyNameAsLong (&num))
	{
		const XBOX::VectorOfMIMEPart partsList = inMIMEMessage->GetMIMEParts();
		if ((partsList.size() > num) && (num >= 0))
		{
			XBOX::VMIMEMessagePart	*	formPart = const_cast<XBOX::VMIMEMessagePart *> (partsList.at (num).Get());
			VJSObject					resultObject = VJSMIMEMessagePart::CreateInstance (ioParms.GetContext(), formPart);
			ioParms.ReturnValue (resultObject);
		}
		else
		{
			ioParms.ReturnNullValue();
		}
	}
	else
	{
		XBOX::VString	propertyName;

		ioParms.GetPropertyName (propertyName);

		if (propertyName.EqualToUSASCIICString ("count") || propertyName.EqualToUSASCIICString ("length"))
		{
			_GetCount (ioParms, inMIMEMessage);
		}
		else if (propertyName.EqualToUSASCIICString ("encoding"))
		{
			_GetEncoding (ioParms, inMIMEMessage);
		}
		else if (propertyName.EqualToUSASCIICString ("boundary"))
		{
			_GetBoundary (ioParms, inMIMEMessage);
		}
	}
}


void VJSMIMEMessage::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, XBOX::VMIMEMessage *inMIMEMessage)
{
	ioParms.AddPropertyName (CVSTR ("count"));
	ioParms.AddPropertyName (CVSTR ("length"));
	ioParms.AddPropertyName (CVSTR ("encoding"));
	ioParms.AddPropertyName (CVSTR ("boundary"));
}


void VJSMIMEMessage::_GetCount (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessage *inMIMEMessage)
{
	if (NULL != inMIMEMessage)
	{
		const XBOX::VectorOfMIMEPart partsList = inMIMEMessage->GetMIMEParts();
		ioParms.ReturnNumber (partsList.size());
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessage::_GetBoundary (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessage *inMIMEMessage)
{
	if (NULL != inMIMEMessage)
	{
		ioParms.ReturnString (inMIMEMessage->GetBoundary());
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessage::_GetEncoding (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessage *inMIMEMessage)
{
	if (NULL != inMIMEMessage)
	{
		ioParms.ReturnString (inMIMEMessage->GetEncoding());
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessage::_ToBlob (XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VMIMEMessage *inMIMEMessage)
{
	if (NULL == inMIMEMessage)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	XBOX::VString		mimeType;
	XBOX::VPtrStream	stream;
	XBOX::VError		error = XBOX::VE_OK;
	
	if (ioParms.CountParams() > 0)
		ioParms.GetStringParam (1, mimeType);

	if (mimeType.IsEmpty())
		mimeType.FromCString ("application/octet-stream");

	if (XBOX::VE_OK == (error = inMIMEMessage->ToStream (stream, XBOX::VMIMEMessage::ENCODING_BINARY_ONLY)))	// YT 13-Sep-2012 - WAK0078232
	{
		VJSBlobValue_Slice * blob = VJSBlobValue_Slice::Create (stream.GetDataPtr(), stream.GetSize(), mimeType);
		if (NULL == blob)
		{
			XBOX::vThrowError (VE_MEMORY_FULL);
			ioParms.ReturnUndefinedValue();
		}
		else
		{
			ioParms.ReturnValue (VJSBlob::CreateInstance (ioParms.GetContextRef(), blob));
		}

		XBOX::ReleaseRefCountable( &blob);
	}

	XBOX::vThrowError (error);
}

void VJSMIMEMessage::_ToBuffer (XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VMIMEMessage *inMIMEMessage)
{
	xbox_assert(inMIMEMessage != NULL);
	
	sLONG	encoding	= 0;

	if (ioParms.CountParams() > 0 && !ioParms.GetLongParam(1, &encoding) || encoding < 0 || encoding > 2) {

		XBOX::vThrowError(XBOX::VE_JVSC_WRONG_PARAMETER_TYPE_NUMBER, "1");
		return;	

	}

	XBOX::VError		error;
	XBOX::VPtrStream	stream;

	if ((error = inMIMEMessage->ToStream(stream, encoding)) == XBOX::VE_OK) {

		VJSBufferObject	*bufferObject;
		
		if ((bufferObject = new VJSBufferObject(stream.GetDataSize(), stream.GetDataPtr(), true)) != NULL) {

			ioParms.ReturnValue(VJSBufferClass::CreateInstance(ioParms.GetContext(), bufferObject));
			stream.StealData();
			XBOX::ReleaseRefCountable<VJSBufferObject>(&bufferObject);

		} else 

			XBOX::vThrowError(XBOX::VE_MEMORY_FULL);
		
	} else

		XBOX::vThrowError(error);
}

void VJSMIMEMessage::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "toBlob", js_callStaticFunction<_ToBlob>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "toBuffer", js_callStaticFunction<_ToBuffer>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] = 
	{
		{ 0, 0, 0, 0}
	};

	outDefinition.className = "MIMEMessage";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


// ----------------------------------------------------------------------------


void VJSMIMEMessagePart::Initialize (const XBOX::VJSParms_initialize& inParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
}


void VJSMIMEMessagePart::Finalize (const XBOX::VJSParms_finalize& inParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
}


void VJSMIMEMessagePart::_GetName (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
	if (NULL != inMIMEPart)
	{
		ioParms.ReturnString (inMIMEPart->GetName());
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessagePart::_GetFileName (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
	if (NULL != inMIMEPart)
	{
		ioParms.ReturnString (inMIMEPart->GetFileName());
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessagePart::_GetMediaType (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
	if (NULL != inMIMEPart)
	{
		ioParms.ReturnString (inMIMEPart->GetMediaType());
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessagePart::_GetSize (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
	if (NULL != inMIMEPart)
	{
		ioParms.ReturnNumber (inMIMEPart->GetSize());
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessagePart::_GetBodyAsText (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
	if (NULL != inMIMEPart)
	{
		XBOX::VPtrStream&	stream = const_cast<XBOX::VPtrStream &>(inMIMEPart->GetData());
		XBOX::VString		contentType = inMIMEPart->GetMediaType();
		MimeTypeKind		mimeTypeKind = inMIMEPart->GetMediaTypeKind();
		XBOX::CharSet		charSet = inMIMEPart->GetMediaTypeCharSet();

		if (MIMETYPE_TEXT == mimeTypeKind)
		{
			XBOX::VJSValue result = GetJSValueFromHTTPMessageBody (ioParms.GetContextRef(), mimeTypeKind, charSet, &stream);
			ioParms.ReturnValue (result);
		}
		else
		{
			ioParms.ReturnUndefinedValue();
		}
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessagePart::_GetBodyAsPicture (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
	if (NULL != inMIMEPart)
	{
		XBOX::VPtrStream&	stream = const_cast<XBOX::VPtrStream &>(inMIMEPart->GetData());
		XBOX::VString		contentType = inMIMEPart->GetMediaType();
		MimeTypeKind		mimeTypeKind = inMIMEPart->GetMediaTypeKind();

		if (MIMETYPE_IMAGE == mimeTypeKind)
		{
			XBOX::VJSValue result = GetJSValueFromHTTPMessageBody (ioParms.GetContextRef(), mimeTypeKind, XBOX::VTC_UNKNOWN, &stream);
			ioParms.ReturnValue (result);
		}
		else
		{
			ioParms.ReturnUndefinedValue();
		}
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessagePart::_GetBodyAsBlob (XBOX::VJSParms_getProperty& ioParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
	if (NULL != inMIMEPart)
	{
		XBOX::VPtrStream&	stream = const_cast<XBOX::VPtrStream &>(inMIMEPart->GetData());
		XBOX::VString		contentType = inMIMEPart->GetMediaType();

		XBOX::VJSValue result = GetJSValueFromHTTPMessageBody (ioParms.GetContextRef(), MIMETYPE_BINARY, XBOX::VTC_UNKNOWN, &stream);
		ioParms.ReturnValue (result);
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEMessagePart::_Save (XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VMIMEMessagePart *inMIMEPart)
{
	XBOX::VString	string;
	XBOX::VError	error = XBOX::VE_INVALID_PARAMETER;
	
	if ((NULL != inMIMEPart) && ioParms.GetStringParam (1, string))
	{
		XBOX::VFilePath filePath (string, FPS_POSIX);
		
		if (filePath.IsFolder())
			filePath.ToSubFile (inMIMEPart->GetFileName());

		if (!filePath.IsEmpty() && filePath.IsFile())
		{
			XBOX::StErrorContextInstaller errorContext (XBOX::VE_FILE_CANNOT_CREATE, XBOX::VE_OK);

			XBOX::VFile *file = new XBOX::VFile (filePath);
			if (file != NULL)
			{
				bool bOverwrite = false;
				
				if (!ioParms.GetBoolParam (2, &bOverwrite))
					bOverwrite = false;

				XBOX::VFileStream *	fileStream = NULL;
				if (XBOX::VE_OK == (error = file->Create (bOverwrite ? FCR_Overwrite : FCR_Default)))
				{
					if ((fileStream = new XBOX::VFileStream (file)) != NULL)
					{
						XBOX::VPtrStream& stream = const_cast<XBOX::VPtrStream &>(inMIMEPart->GetData());

						if (XBOX::VE_OK == (error = fileStream->OpenWriting()))
						{
							if (XBOX::VE_OK == (error = stream.OpenReading()))
								error = fileStream->PutData (stream.GetDataPtr(), stream.GetDataSize());
							stream.CloseReading();
							fileStream->CloseWriting (true);
						}

						delete fileStream;
					}				
					else
					{
						error = XBOX::VE_MEMORY_FULL;
					}
				}
			}
			else
			{
				error = XBOX::VE_MEMORY_FULL;
			}
			
			XBOX::QuickReleaseRefCountable (file);
		}
		else
		{
			error = XBOX::VE_FOLDER_NOT_FOUND;
		}
	}

	if (XBOX::VE_OK != error)
		XBOX::vThrowError (error);
}


void VJSMIMEMessagePart::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "save", js_callStaticFunction<_Save>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] = 
	{
		{ "name", js_getProperty<_GetName>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "fileName", js_getProperty<_GetFileName>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "mediaType", js_getProperty<_GetMediaType>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "size", js_getProperty<_GetSize>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "asText", js_getProperty<_GetBodyAsText>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "asPicture", js_getProperty<_GetBodyAsPicture>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "asBlob", js_getProperty<_GetBodyAsBlob>, nil, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0, 0}
	};

	outDefinition.className = "MIMEMessagePart";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticValues = values;
	outDefinition.staticFunctions = functions;
}


// ----------------------------------------------------------------------------



void VJSMIMEWriter::Initialize (const XBOX::VJSParms_initialize& inParms, XBOX::VMIMEWriter *inMIMEWriter)
{
}


void VJSMIMEWriter::Finalize (const XBOX::VJSParms_finalize& inParms, XBOX::VMIMEWriter *inMIMEWriter)
{
}


void VJSMIMEWriter::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getMIMEBoundary", js_callStaticFunction<_GetMIMEBoundary>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "getMIMEMessage", js_callStaticFunction<_GetMIMEMessage>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "addPart", js_callStaticFunction<_AddPart>, JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] = 
	{
		{ 0, 0, 0, 0}
	};

	outDefinition.className = "MIMEWriter";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticValues = values;
	outDefinition.staticFunctions = functions;
}


void VJSMIMEWriter::_GetMIMEBoundary (XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VMIMEWriter *inMIMEWriter)
{
	if (NULL != inMIMEWriter)
	{
		ioParms.ReturnString (inMIMEWriter->GetBoundary());
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEWriter::_GetMIMEMessage (XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VMIMEWriter *inMIMEWriter)
{
	if (NULL != inMIMEWriter)
	{
		XBOX::VMIMEMessage *	message = const_cast<XBOX::VMIMEMessage *> (&inMIMEWriter->GetMIMEMessage());
		VJSObject				resultObject = VJSMIMEMessage::CreateInstance (ioParms.GetContext(), message);

		ioParms.ReturnValue (resultObject);
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		ioParms.ReturnUndefinedValue();
	}
}


void VJSMIMEWriter::_AddPart (XBOX::VJSParms_callStaticFunction& ioParms, XBOX::VMIMEWriter *inMIMEWriter)
{
	XBOX::VError	error = XBOX::VE_INVALID_PARAMETER;

	if ((NULL != inMIMEWriter) && (ioParms.CountParams() > 0))
	{
		XBOX::VJSValue		jsValue = ioParms.GetParamValue (1);
		XBOX::VString		name;
		XBOX::VString		fileName;
		XBOX::VString		mimeType;
		XBOX::VString		contentID;
		bool				isInline;
		XBOX::VPtrStream	stream;

// 		if (!ioParms.GetStringParam (2, name) || name.IsEmpty())
// 			name.FromCString ("Untitled");
		if (!ioParms.GetStringParam (2, name)) {

			XBOX::vThrowError(XBOX::VE_JVSC_WRONG_PARAMETER_TYPE_STRING, "2");
			return;

		}

		if (!ioParms.GetStringParam (3, mimeType)) {

			XBOX::vThrowError(XBOX::VE_JVSC_WRONG_PARAMETER_TYPE_STRING, "3");
			return;

		}

		if (ioParms.CountParams() >= 4 && ioParms.IsStringParam(4) && !ioParms.GetStringParam(4, contentID)) {

			XBOX::vThrowError(XBOX::VE_JVSC_WRONG_PARAMETER_TYPE_STRING, "4");
			return;

		}

		if (ioParms.CountParams() >= 5) {

			if (!ioParms.GetBoolParam(5, &isInline))

				isInline = false;

		} else

			isInline = false;

		if (XBOX::VE_OK == (error = stream.OpenWriting()))
		{
			if (jsValue.IsString())
			{
				XBOX::VString valueString;

				if (jsValue.GetString (valueString))
				{
					XBOX::CharSet	charset = XBOX::VTC_UTF_8;

					if (mimeType.IsEmpty())
						mimeType.FromCString ("text/plain");

					XBOX::StStringConverter<char> buffer (valueString, charset);
					error = stream.PutData (buffer.GetCPointer(), buffer.GetSize());
				}				
			}
			else if (!jsValue.IsObject()) 
			{
				// All other supported types are objects.

				error = XBOX::VE_JVSC_WRONG_PARAMETER;
			}
			else
			{
				XBOX::VJSObject	object(ioParms.GetContext());
				
				jsValue.GetObject(object);
				if (object.IsOfClass(VJSBufferClass::Class())) {

					VJSBufferObject	*bufferObject	= object.GetPrivateData<VJSBufferClass>();

					xbox_assert(bufferObject != NULL);
					error = stream.PutData(bufferObject->GetDataPtr(), bufferObject->GetDataSize());

					fileName.FromString(name);

				} else if (object.IsOfClass(VJSFileIterator::Class())) {

					JS4DFileIterator	*fileObject;
					XBOX::VFile			*file;
					VMemoryBuffer<>		buffer;

					fileObject = object.GetPrivateData<VJSFileIterator>();
					xbox_assert(fileObject != NULL);

					file = fileObject->GetFile();
					xbox_assert(file != NULL);			

					if ((error = file->GetContent(buffer)) == XBOX::VE_OK && stream.CloseWriting() == XBOX::VE_OK) {
						
						stream.SetDataPtr(buffer.GetDataPtr(), buffer.GetDataSize());							
						buffer.ForgetData();
						file->GetName(fileName);

					}
								
				} else {

					XBOX::VValueSingle *value = jsValue.CreateVValue();

					if (NULL != value)
					{
						if (VK_IMAGE == value->GetValueKind())
						{
	#if !VERSION_LINUX
							XBOX::VPicture *	picture = (XBOX::VPicture *)value;
							XBOX::VString		contentType;

							contentType.FromCString ("image/png;image/jpeg;image/gif");

							error = ExtractBestPictureForWeb (*picture, stream, contentType, true, mimeType);

							if (contentType != mimeType)
								mimeType.FromString (contentType);

							fileName.FromString (name);
	#endif						
						}
						else if (VK_BLOB == value->GetValueKind())
						{
							if (mimeType.IsEmpty())
							{
								VJSObject object = jsValue.GetObject();
								if (!object.GetPropertyAsString (CVSTR ("type"), NULL, mimeType) || mimeType.IsEmpty())
									mimeType.FromCString ("application/octet-stream");
							}

							XBOX::VBlobWithPtr *blob = dynamic_cast<XBOX::VBlobWithPtr *>(value);
							error = stream.PutData (blob->GetDataPtr(), blob->GetSize());

							fileName.FromString (name);
						}
						else
						{
							error = XBOX::VE_JVSC_WRONG_PARAMETER;
						}
					}
					else // Object is null...
					{
						error = XBOX::VE_JVSC_WRONG_PARAMETER;
					}
				}

			}

			if (stream.IsWriting()) {

				if (error == XBOX::VE_OK)

					error = stream.CloseWriting();

				else

					stream.CloseWriting();				

			}

		}

		if (XBOX::VE_OK == error) {

			if (fileName.GetLength())

				inMIMEWriter->AddFilePart(name, fileName, isInline, mimeType, contentID, stream);

			else 

				inMIMEWriter->AddTextPart(name, isInline, mimeType, contentID, stream);

		}
	}

	XBOX::vThrowError (error);
}


void VJSMIMEWriter::_Construct (XBOX::VJSParms_construct& ioParms)
{
	XBOX::VString		boundary;
	XBOX::VMIMEWriter *	mimeWriter = NULL;

	if (ioParms.CountParams() > 0)
		ioParms.GetStringParam (1, boundary);

	mimeWriter = new XBOX::VMIMEWriter (boundary);

	if (NULL != mimeWriter)
	{
		ioParms.ReturnConstructedObject (VJSMIMEWriter::CreateInstance (ioParms.GetContextRef(), mimeWriter));
	}
	else
	{
		XBOX::vThrowError (XBOX::VE_MEMORY_FULL);
		ioParms.ReturnUndefined();
	}
}


// ----------------------------------------------------------------------------



void VJSHTTPServer::Initialize (const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Retain();
}


void VJSHTTPServer::Finalize (const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Release();
}


void VJSHTTPServer::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "start", js_callStaticFunction<_start>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "stop", js_callStaticFunction<_stop>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] =
	{
		{ "started", js_getProperty<_getStarted>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "port", js_getProperty<_getPort>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "ipAddress", js_getProperty<_getIpAddress>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "hostName", js_getProperty<_getHostName>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "defaultCharSet", js_getProperty<_getDefaultCharSet>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_SSL, js_getProperty<_getSSL>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ kSSJS_PROPERTY_NAME_HTTPServerCache, js_getProperty<_getCache>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	outDefinition.className = kSSJS_CLASS_NAME_HTTPServer;
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


void VJSHTTPServer::_start (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	inRIAServerProject->StartHTTPServerProject (riaContext);
}


void VJSHTTPServer::_stop (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	inRIAServerProject->StopHTTPServerProject (riaContext);
}


void VJSHTTPServer::_getStarted (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	ioParms.ReturnBool (inRIAServerProject->IsHTTPServerProjectStarted (riaContext));
}


void VJSHTTPServer::_getPort (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnNumber (settings->GetListeningPort());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSHTTPServer::_getIpAddress (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
#if WITH_DEPRECATED_IPV4_API

		sLONG ip = settings->GetListeningAddress();
		if (ip == 0)
		{
			std::vector<IP4> ipv4Addresses;
			if (ServerNetTools::GetLocalIPv4Addresses (ipv4Addresses) > 0)
				ip = ipv4Addresses.front();
		}
		VString dottedIp;
		ServerNetTools::GetIPAdress (ip, dottedIp);
		ioParms.ReturnString (dottedIp);
	
#else
		VString ip=ServerNetTools::GetFirstLocalAddress();
		ioParms.ReturnString (ip);
#endif
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSHTTPServer::_getHostName (VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VString hostName;
	inRIAServerProject->GetHostName (hostName);
	ioParms.ReturnString (hostName);
}


void VJSHTTPServer::_getDefaultCharSet (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnString ((settings->GetDefaultCharSet() == VTC_UTF_8) ? RIASettingsKeys::HTTP::kCHARSET_UTF8 : RIASettingsKeys::HTTP::kCHARSET_UTF16);
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSHTTPServer::_getSSL (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnValue (VJSSSL::CreateInstance (ioParms.GetContextRef(), inRIAServerProject));
}


void VJSHTTPServer::_getCache (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	ioParms.ReturnValue (VJSHTTPServerCache::CreateInstance (ioParms.GetContextRef(), inRIAServerProject));
}



// ----------------------------------------------------------------------------



void VJSHTTPServerCache::Initialize (const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Retain();
}


void VJSHTTPServerCache::Finalize (const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Release();
}


void VJSHTTPServerCache::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticValue values[] =
	{
		{ "enabled", js_getProperty<_getEnabled>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "memorySize", js_getProperty<_getMemorySize>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	outDefinition.className = kSSJS_CLASS_NAME_HTTPServerCache;
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticValues = values;
}


void VJSHTTPServerCache::_getEnabled (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnBool (settings->GetEnableCache());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSHTTPServerCache::_getMemorySize (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnNumber (settings->GetCacheMaxSize());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


// ----------------------------------------------------------------------------



void VJSSSL::Initialize (const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Retain();
}


void VJSSSL::Finalize (const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inRIAServerProject)
{
	inRIAServerProject->Release();
}


void VJSSSL::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ "getCertificatePath", js_callStaticFunction<_getCertificatePath>, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	static inherited::StaticValue values[] =
	{
		{ "enabled", js_getProperty<_getEnabled>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ "port", js_getProperty<_getPort>, NULL, JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete },
		{ 0, 0, 0}
	};

	outDefinition.className = kSSJS_CLASS_NAME_SSL;
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticFunctions = functions;
	outDefinition.staticValues = values;
}


void VJSSSL::_getCertificatePath (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		VFilePath path = settings->GetSSLCertificatesFolderPath();
		ioParms.ReturnString (path.GetPath());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSSSL::_getEnabled (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnBool (settings->GetAllowSSL());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSSSL::_getPort (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inRIAServerProject)
{
	if (NULL == inRIAServerProject)
	{
		XBOX::vThrowError (XBOX::VE_INVALID_PARAMETER);
		return;
	}

	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inRIAServerProject);
	IHTTPServerProject *			serverProject = inRIAServerProject->RetainHTTPServerProject (riaContext);
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;

	if (settings != NULL)
	{
		ioParms.ReturnNumber (settings->GetListeningSSLPort());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}

void VJSMIMEReader::GetDefinition (ClassDefinition& outDefinition)
{
	static XBOX::VJSClass<VJSMIMEReader, void>::StaticFunction functions[] = {

		{	"parseMail",			js_callStaticFunction<_ParseMail>,			JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete	},
		{	"parseEncodedWords",	js_callStaticFunction<_ParseEncodedWords>,	JS4D::PropertyAttributeReadOnly | JS4D::PropertyAttributeDontDelete	},
		{	0,						0,											0																	},

	};

	outDefinition.className = "MIMEReader";
	outDefinition.staticFunctions = functions;
}

void VJSMIMEReader::Construct (XBOX::VJSParms_construct& inParms)
{
	XBOX::VJSObject	createdObject(inParms.GetContext());

	createdObject = VJSMIMEReader::CreateInstance(inParms.GetContext(), NULL);
	inParms.ReturnConstructedObject(createdObject);		
}

void VJSMIMEReader::_ParseMail (XBOX::VJSParms_callStaticFunction &ioParms, void *)
{
	XBOX::VJSObject	mailObject(ioParms.GetContext());

	if (!ioParms.GetParamObject(1, mailObject)) {

		XBOX::vThrowError(XBOX::VE_JVSC_WRONG_PARAMETER_TYPE_OBJECT, "1");
		return;

	}

	// Retrieve the addField() method from Mail object. Use it as a (poor) way to check 
	// that object given is indeed a Mail object.

	XBOX::VJSObject	addFieldFunction	= mailObject.GetPropertyAsObject("addField");

	if (!addFieldFunction.IsFunction()) {

		XBOX::vThrowError(XBOX::VE_JVSC_WRONG_PARAMETER_TYPE_OBJECT, "1");
		return;

	}

	XBOX::VJSArray	memoryBufferArray(ioParms.GetContext());

	if (!ioParms.GetParamArray(2, memoryBufferArray) || !memoryBufferArray.GetLength()) {

		XBOX::vThrowError(XBOX::VE_JVSC_WRONG_PARAMETER_TYPE_ARRAY, "2");
		return;

	}
	
	XBOX::VMemoryBuffer<>	*memoryBuffers;

	if ((memoryBuffers = new XBOX::VMemoryBuffer<>[memoryBufferArray.GetLength()]) == NULL) {

		XBOX::vThrowError(XBOX::VE_MEMORY_FULL);
		return;

	}

	sLONG	i;

	for (i = 0; i < memoryBufferArray.GetLength(); i++) {

		XBOX::VJSValue	value	= memoryBufferArray.GetValueAt(i);

		if (!value.IsObject())
			
			break;

		else {

			XBOX::VJSObject	bufferObject	= value.GetObject();

			if (!bufferObject.IsOfClass(XBOX::VJSBufferClass::Class()))

				break;

			else {

				XBOX::VJSBufferObject	*buffer;

				buffer = bufferObject.GetPrivateData<XBOX::VJSBufferClass>();
				xbox_assert(buffer != NULL);

				memoryBuffers[i].SetDataPtr(buffer->GetDataPtr(), buffer->GetDataSize(), buffer->GetDataSize());

			}

		}

	}

	// Parse mail.

	if (i == memoryBufferArray.GetLength()) {

		XBOX::VMemoryBufferStream	stream(memoryBuffers, i);
		bool						isMIME;
		XBOX::VString				boundary;
	
		if (stream.OpenReading() == XBOX::VE_OK) {

			XBOX::VMIMEMailHeader	header;

			if (_ParseMailHeader(ioParms.GetContext(), mailObject, &stream, &isMIME, &header)) {

				if (isMIME) {

					// Make an XBOX::VMemoryBufferStream that "contains" only the MIME stream.
					// Patch the memory buffers to make it starts at MIME boundary.

					VSize	index, total, offset, size;
					sLONG	j;
					uBYTE	*p;

					index = stream.GetPos();
					total = 0;
					j = 0;
					for ( ; ; ) {

						total += memoryBuffers[j].GetDataSize();
						if (index < total)

							break;

						if (j == i) {
	
							// Impossible, stream.GetPos() should return an index within bound.

							xbox_assert(false);

						} else

							j++;

					}

					total -= memoryBuffers[j].GetDataSize();
					offset = index - total;
					size = memoryBuffers[j].GetDataSize() - offset;
					p = (uBYTE *) memoryBuffers[j].GetDataPtr() + offset;

					memoryBuffers[j].ForgetData();	// Prevent memory from being freed.
					memoryBuffers[j].SetDataPtr(p, size, size);		

					XBOX::VMemoryBufferStream	mimeStream(&memoryBuffers[j], i - j);

					// _ParseMIMEBody() will open mimeStream and then close it when done.

					_ParseMIMEBody(ioParms.GetContext(), mailObject, &mimeStream, &header);

				} else {

					_ParseTextBody(ioParms.GetContext(), mailObject, &stream);
				
				}

			}
			stream.CloseReading();

		} else {

			//** stream opening failed

		}

	}

	for (i = 0; i < memoryBufferArray.GetLength(); i++)

		memoryBuffers[i].ForgetData();

	delete[] memoryBuffers;
}

void VJSMIMEReader::_ParseEncodedWords (XBOX::VJSParms_callStaticFunction &ioParms, void *)
{
	bool			isOk, isAllocated;
	uBYTE			*data;
	VSize			dataSize;
	XBOX::VString	result;

	result.Clear();
	if (ioParms.IsStringParam(1)) {

		XBOX::VString	string;

		if (!ioParms.GetStringParam(1, string))

			isOk = false;

		else {

			if ((dataSize = string.GetLength())) {

				if ((data = new uBYTE[dataSize]) == NULL) {

					XBOX::vThrowError(XBOX::VE_MEMORY_FULL);
					return;

				} else {

					// Data is supposed to be 7-bit ASCII characters.

					VSize			i;
					uBYTE			*p;
					const UniChar	*q;
					
					for (i = 0, p = data, q = string.GetCPointer(); i < dataSize; i++, p++, q++)

						*p = *q;	

				}

			}
			isOk = isAllocated = true;

		}

	} else if (ioParms.IsObjectParam(1)) {

		XBOX::VJSObject	jsBuffer(ioParms.GetContext());

		if (!ioParms.GetParamObject(1, jsBuffer) || !jsBuffer.IsOfClass(VJSBufferClass::Class())) 

			isOk = false;

		else {
	
			XBOX::VJSBufferObject	*buffer;

			buffer = jsBuffer.GetPrivateData<VJSBufferClass>();
			xbox_assert(buffer != NULL);

			data = (uBYTE *) buffer->GetDataPtr();
			dataSize = buffer->GetDataSize();
		
			isOk = true;
			isAllocated = false;

		}

	} else 

		isOk = false;

	if (!isOk) 

		XBOX::vThrowError(XBOX::VE_JVSC_WRONG_PARAMETER, "1");
		
	else if (dataSize) {

		xbox_assert(data != NULL);

		XBOX::VMIMEReader::DecodeEncodedWords(data, dataSize, &result);

		if (isAllocated)

			delete[] data;

	}

	ioParms.ReturnString(result);
}

// Return true if header was parsed successfully. Returned values are valid only if parsing was successful. 
// If *outIsMultiPart is true, then *outBoundary must contain the "boundary" string.

bool VJSMIMEReader::_ParseMailHeader (XBOX::VJSContext inContext, 
	XBOX::VJSObject &inMailObject, XBOX::VMemoryBufferStream *inStream, 
	bool *outIsMIME, 
	XBOX::VMIMEMailHeader *outHeader)
{
	xbox_assert(inStream != NULL);
	xbox_assert(outIsMIME != NULL);
	xbox_assert(outHeader != NULL);

	XBOX::VString	line;

	// Skip "+OK" line from POP server.

	if (!_GetLine(&line, inStream, false))

		return false;

	// Parse header fields.

	XBOX::VJSObject			addFieldFunction(inContext);
	std::vector<VJSValue>	arguments;
	XBOX::VJSValue			result(inContext);
	
	addFieldFunction = inMailObject.GetPropertyAsObject("addField");	// Must succeed.
	arguments.push_back(XBOX::VJSValue(inContext));
	arguments.push_back(XBOX::VJSValue(inContext));

	sLONG			i, j, k;
	XBOX::VString	fieldName, fieldBody;

	*outIsMIME = false;
	for ( ; ; ) {

		bool	isFullLine;

		isFullLine = _GetLine(&line, inStream, true);

		// A blank line separate the header from the body.

		if (line.IsEmpty())

			break;

		// Read field name, skipping leading spaces.

		for (i = 0; i < line.GetLength(); i++)

			if (line.GetUniChar(i + 1) != ' ' || line.GetUniChar(i + 1) != '\t')

				break;

		for (j = i; j < line.GetLength(); j++)

			if (line.GetUniChar(j + 1) == ':')

				break;

		// If field name is zero length or there is no ':' then skip and ignore line.

		if (i == j || j == line.GetLength())

			continue;
	
		line.GetSubString(1, j - i, fieldName);
		fieldName.RemoveWhiteSpaces(false, true);

		// If mail has an "MIME-Version" header field, consider it as MIME. 
		// Do not check version number.

		if (fieldName.EqualToString("MIME-Version"))

			*outIsMIME = true;

		// Read field body, skipping leading spaces. An empty field body is possible.

		for (k = j + 2; k < line.GetLength(); k++)

			if (line.GetUniChar(k + 1) != ' ' || line.GetUniChar(k + 1) != '\t')

				break;
		
		if (k < line.GetLength()) {

			line.GetSubString(k + 1, line.GetLength() - k, fieldBody);
			fieldBody.RemoveWhiteSpaces(false, true);

		} else

			fieldBody.Clear();

		// Try to find boundary string, do not care if mail is MIME. 
		// Also save field bodies for "single part" MIME mails.

		if (fieldName.EqualToString("Content-Type")) {

			outHeader->fIsMultiPart = _IsMultiPart(fieldBody);
			_ParseBoundary(fieldBody, &outHeader->fBoundary);

			outHeader->fContentType = fieldBody;

		} else if (fieldName.EqualToString("Content-Disposition"))

			outHeader->fContentDisposition = fieldBody;

		else if (fieldName.EqualToString("Content-Transfer-Encoding"))

			outHeader->fContentTransferEncoding = fieldBody;

		// Add field to Mail object.

		arguments[0].SetString(fieldName);
		arguments[1].SetString(fieldBody);
		inMailObject.CallFunction(addFieldFunction, &arguments, &result, NULL);

	}

	return true;
}

// Parse basic mail body, that is a sequence of lines. Set the body property as an array of string(s) (lines).
// Return true if successful.

bool VJSMIMEReader::_ParseTextBody (XBOX::VJSContext inContext, XBOX::VJSObject &inMailObject, XBOX::VMemoryBufferStream *inStream)
{
	xbox_assert(inStream != NULL);

	XBOX::VJSArray	lines(inContext);
	XBOX::VJSObject	arrayObject	= lines;

	if (!arrayObject.IsArray())

		return false;	// This check for successful creation of Array object.

	bool			isOk;
	XBOX::VString	line;

	for ( ; ; ) {

		if (!_GetLine(&line, inStream, false)) {

			isOk = line.EqualToUSASCIICString(".");
			break;

		} else if (line.EqualToUSASCIICString(".")) {

			// Last line should also be the end of stream. 
			// But still consider that as ok.

			isOk = true;
			break;

		} else 

			lines.PushString(line);

	}

	inMailObject.SetProperty("body", arrayObject);
	
	return isOk;
}

bool VJSMIMEReader::_ParseMIMEBody (
	XBOX::VJSContext inContext, 
	XBOX::VJSObject &inMailObject, 
	XBOX::VMemoryBufferStream *inStream, 
	const XBOX::VMIMEMailHeader *inHeader)
{
	xbox_assert(inHeader != NULL);

	// Messages using MIME extensions are not necessarly multi-part. For instance, it can 
	// be a single "text/plain" with a UTF-8 charset encoded using base64.

	if (inHeader->fIsMultiPart && inHeader->fBoundary.IsEmpty()) {

		//** No boundary string found in header ! Will be unable to parse MIME parts.

	}

	VMIMEMessage	*mimeMessage;

	if ((mimeMessage = new VMIMEMessage()) == NULL) {

		XBOX::vThrowError(XBOX::VE_MEMORY_FULL);
		return false; 

	} else {

		XBOX::VJSObject	mimeMessageObject(inContext);

		mimeMessage->LoadMail(inHeader, *inStream);

		mimeMessageObject = VJSMIMEMessage::CreateInstance(inContext, mimeMessage);
		inMailObject.SetProperty("messageParts", mimeMessageObject);

		return true;

	}
}

// Return a line. Return true if it is a full line, with carriage return. Return false if end of stream
// has been reached. Set inUnfoldLines to true for header parsing.

bool VJSMIMEReader::_GetLine (XBOX::VString *outString, XBOX::VMemoryBufferStream *inStream, bool inUnfoldLines)
{
	xbox_assert(outString != NULL);
	xbox_assert(inStream != NULL);

	bool	isFullLine;

	isFullLine = false;
	outString->Clear();	
	for ( ; ; ) {

		sLONG	c;

		if ((c = inStream->GetNextByte()) < 0)

			break;

		if (c != '\r') {

			outString->AppendChar(c);
			continue;

		} 

		if ((c = inStream->GetNextByte()) < 0)

			break;

		if (c != '\n') {

			outString->AppendChar('\r');
			outString->AppendChar(c);
			continue;

		}

		// A full line has been read, check for lines to fold if needed.

		isFullLine = true;
		if (inUnfoldLines) {
			
			if ((c = inStream->GetNextByte()) < 0) 
				
				break;

			if (c == ' ' || c == '\t') {

				// Fold line, replacing leading space(s) with a single space.

				outString->AppendChar(' ');
				for ( ; ; ) {

					if ((c = inStream->GetNextByte()) < 0) 
				
						break;

					if (c != ' ' && c != '\t') {

						inStream->PutBackByte(c);
						break;

					}

				}
				continue;

			} else {

				inStream->PutBackByte(c);				
				break;

			}

		} else

			break;
	
	}

	return isFullLine;
}

// Check "Content-Type" field for "multipart/*".

bool VJSMIMEReader::_IsMultiPart (const XBOX::VString &inContentTypeBody)
{
	VSize	length;
	VIndex	i;
	UniChar	c;
	
	length = inContentTypeBody.GetLength();
	i = 1;
	for ( ; ; ) {

		if (i > length)

			return false;
		
		c = inContentTypeBody.GetUniChar(i);
		i++;
		if (c != ' ' && c != '\t')

			break;

	}

	XBOX::VString	type(c);

	for ( ; ; ) {

		if (i > length)

			break;

		c = inContentTypeBody.GetUniChar(i);
		i++;
		if (!::isalpha(c))

			break;

		else

			type.AppendUniChar(c);

	}

	return type.EqualToString("multipart");
}

// Parse the field body of "Content-Type". Look for boundary="<boundary string>". 
// Return the boundary string in *outBoundary, or leave it untouched if not found.

void VJSMIMEReader::_ParseBoundary (const XBOX::VString &inContentTypeBody, XBOX::VString *outBoundary)
{
	xbox_assert(outBoundary != NULL);

	VIndex	i;

	if (!(i = inContentTypeBody.Find("boundary")))

		return;

	VSize	length;
	UniChar	c;
	
	length = inContentTypeBody.GetLength();
	i += 8;	
	for ( ; ; )

		if (i > length)

			return;

		else if ((c = inContentTypeBody.GetUniChar(i)) == '=')

			break;

		else

			i++;

	// Read boundary string, quotes are optionnal.

	outBoundary->Clear();

	i++;
	for ( ; ; )

		if (i > length)

			return;

		else if ((c = inContentTypeBody.GetUniChar(i)) == '\"') 
		
			break;

		else if (c != ' ' && c != '\t') {

			// Variable i will be incremented below, out of loop.

			outBoundary->AppendUniChar(c);
			break;

		} else

			i++;

	i++;	
	for ( ; ; ) 

		if (i > length 
		|| (c = inContentTypeBody.GetUniChar(i)) == '\"'
		|| c == ' ' || c == '\t')

			break;

		else {

			outBoundary->AppendUniChar(c);
			i++;
		
		}
}