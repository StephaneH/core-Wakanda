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
#include "VRIAServerLogger.h"
#include "VRIAServerJSContextMgr.h"
#include "VSolutionStartupParameters.h"
#include "VRIAServerHTTPRequestHandler.h"
#include "VJSApplication.h"
#include "VRIAServerJSAPI.h"
#include "JavaScript/Sources/VJSJSON.h"
#include "Language Syntax/CLanguageSyntax.h"
#include "JSDebugger/Interfaces/CJSWDebuggerFactory.h"
#include "commonJSAPI.h"

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
const char kSSJS_PROPERTY_NAME_RPCCatalog[] = "rpcCatalog";
const char kSSJS_PROPERTY_NAME_wildchar[] = "wildchar";

const char kSSJS_PROPERTY_NAME_verifyDataStore[] = "verifyDataStore";
const char kSSJS_PROPERTY_NAME_repairDataStore[] = "repairDataStore";
const char kSSJS_PROPERTY_NAME_compactDataStore[] = "compactDataStore";

const char kSSJS_PROPERTY_NAME_setCurrentUser[] = "setCurrentUser";
const char kSSJS_PROPERTY_NAME_loginByKey[] = "loginByKey";
const char kSSJS_PROPERTY_NAME_loginByPassword[] = "loginByPassword";
const char kSSJS_PROPERTY_NAME_currentUser[] = "currentUser";
const char kSSJS_PROPERTY_NAME_currentSession[] = "currentSession";
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
	else
	{
		XBOX::VValueSingle *value = inValue.CreateVValue();

		if (NULL != value)
		{
			XBOX::VError		error = XBOX::VE_OK;
			XBOX::VPtrStream	stream;

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
					VJSObject object = inValue.GetObject();
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

			if (XBOX::VE_OK == error)
			{
				if (XBOX::VE_OK == (error = stream.OpenReading()))
					error = ioResponse->SendData (stream.GetDataPtr(), stream.GetDataSize(), true);
				stream.CloseReading();
			}

			result = (XBOX::VE_OK == error);
		}
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


void VJSHTTPRequestHeader::Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPHeader *inHeader)
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


void VJSHTTPRequestHeader::Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPHeader *inHeader)
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


void VJSHTTPRequestHeader::GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTTPHeader *inHeader)
{
	if (NULL == inHeader)
		return;

	XBOX::VString propertyName;
	XBOX::VString headerName;
	XBOX::VString headerValue;

	ioParms.GetPropertyName (propertyName);
	_GetHeaderNameFromPropertyName (propertyName, headerName);

	if (inHeader->GetHeaderValue (headerName, headerValue))
		ioParms.ReturnString (headerValue);
}


bool VJSHTTPRequestHeader::SetProperty (XBOX::VJSParms_setProperty& ioParms, IHTTPHeader *inHeader)
{
	return false;
}


void VJSHTTPRequestHeader::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTTPHeader *inHeader)
{
	if (NULL == inHeader)
		return;

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
		ioParms.AddPropertyName ((*it).second);
}


void VJSHTTPRequestHeader::_GetHeaderValue (VJSParms_callStaticFunction& ioParms, IHTTPHeader *inHeader)
{
	if (NULL == inHeader)
		return;

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


void VJSHTTPResponseHeader::Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPHeader *inHeader)
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


void VJSHTTPResponseHeader::Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPHeader *inHeader)
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


void VJSHTTPResponseHeader::GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTTPHeader *inHeader)
{
	if (NULL == inHeader)
		return;

	XBOX::VString propertyName;
	XBOX::VString headerName;
	XBOX::VString headerValue;

	ioParms.GetPropertyName (propertyName);
	_GetHeaderNameFromPropertyName (propertyName, headerName);

	if (inHeader->GetHeaderValue (headerName, headerValue))
		ioParms.ReturnString (headerValue);
}


bool VJSHTTPResponseHeader::SetProperty (XBOX::VJSParms_setProperty& ioParms, IHTTPHeader *inHeader)
{
	if (NULL == inHeader)
		return false;

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


void VJSHTTPResponseHeader::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTTPHeader* inHeader)
{
	if (NULL == inHeader)
		return;

	for (std::map<XBOX::VString, XBOX::VString>::const_iterator it = fCommonHeaders.begin(); it != fCommonHeaders.end(); ++it)
		ioParms.AddPropertyName ((*it).second);
}


void VJSHTTPResponseHeader::_GetHeaderValue (VJSParms_callStaticFunction& ioParms, IHTTPHeader *inHeader)
{
	if (NULL == inHeader)
		return;

	XBOX::VString headerName;
	XBOX::VString headerValue;

	if (ioParms.GetStringParam (1, headerName))
		inHeader->GetHeaderValue (headerName, headerValue);

	ioParms.ReturnString (headerValue);
}


void VJSHTTPResponseHeader::_SetHeaderValue (VJSParms_callStaticFunction& ioParms, IHTTPHeader *inHeader)
{
	if (NULL == inHeader)
		return;

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
	if (NULL != inRequest)
		ioParms.ReturnString (inRequest->GetURL());
}


void VJSHTTPRequest::_GetRawURL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
		ioParms.ReturnString (inRequest->GetRawURL());
}


void VJSHTTPRequest::_GetURLPath (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
		ioParms.ReturnString (inRequest->GetURLPath());
}


void VJSHTTPRequest::_GetURLQuery (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
		ioParms.ReturnString (inRequest->GetURLQuery());
}


void VJSHTTPRequest::_GetHost (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
		ioParms.ReturnString (inRequest->GetHost());
}


void VJSHTTPRequest::_GetMethod (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
	{
		XBOX::VString valueString;
		inRequest->GetRequestMethodString (valueString);
		ioParms.ReturnString (valueString);
	}
}


void VJSHTTPRequest::_GetVersion (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
	{
		XBOX::VString valueString;
		inRequest->GetRequestHTTPVersionString (valueString);
		ioParms.ReturnString (valueString);
	}
}


void VJSHTTPRequest::_GetUser (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
	{
		XBOX::VString valueString;
		inRequest->GetAuthenticationInfos()->GetUserName (valueString);
		ioParms.ReturnString (valueString);
	}
}


void VJSHTTPRequest::_GetPassword (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
	{
		XBOX::VString valueString;
		inRequest->GetAuthenticationInfos()->GetPassword (valueString);
		ioParms.ReturnString (valueString);
	}
}


void VJSHTTPRequest::_GetRequestLine (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
		ioParms.ReturnString (inRequest->GetRequestLine());
}


void VJSHTTPRequest::_GetHeaders (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
	{
		IHTTPHeader *header = const_cast<IHTTPHeader *> (&inRequest->GetHTTPHeaders());
		VJSObject	resultObject = VJSHTTPRequestHeader::CreateInstance (ioParms.GetContext(), header);
		ioParms.ReturnValue (resultObject);
	}
}


void VJSHTTPRequest::_GetBody (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL == inRequest)
		return;

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
	if (NULL != inRequest)
	{
		IHTMLForm *	form = const_cast<IHTMLForm *> (inRequest->GetHTMLForm());
		VJSObject	resultObject = VJSHTMLForm::CreateInstance (ioParms.GetContext(), form);
		ioParms.ReturnValue (resultObject);
	}
}


void VJSHTTPRequest::_GetContentType (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest)
{
	if (NULL != inRequest)
	{
		XBOX::VString contentType;
		inRequest->GetHTTPHeaders().GetHeaderValue (HEADER_CONTENT_TYPE, contentType);
		ioParms.ReturnString (contentType);
	}
}


void VJSHTTPRequest::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
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
		return;

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
		IHTTPHeader *header = const_cast<IHTTPHeader *>(&inResponse->GetResponseHeader());
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
		return false;

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
		return;

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


void VJSHTMLForm::Initialize (const XBOX::VJSParms_initialize& inParms, IHTMLForm *inHTMLForm)
{
}


void VJSHTMLForm::Finalize (const XBOX::VJSParms_finalize& inParms, IHTMLForm *inHTMLForm)
{
}


void VJSHTMLForm::GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTMLForm *inHTMLForm)
{
	sLONG num = 0;

	if ((NULL != inHTMLForm) && ioParms.GetPropertyNameAsLong (&num))
	{
		std::vector<IHTMLFormPart *> formPartsList;

		inHTMLForm->GetFormPartsList (formPartsList);
		if ((formPartsList.size() > 0) && (num >= 0) && (num <= formPartsList.size()))
		{
			IHTMLFormPart *	formPart = const_cast<IHTMLFormPart *> (formPartsList.at (num));
			VJSObject		resultObject = VJSHTMLFormPart::CreateInstance (ioParms.GetContext(), formPart);
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

		if (propertyName.EqualToUSASCIICString ("count"))
		{
			_GetCount (ioParms, inHTMLForm);
		}
		else if (propertyName.EqualToUSASCIICString ("encoding"))
		{
			_GetEncoding (ioParms, inHTMLForm);
		}
		else if (propertyName.EqualToUSASCIICString ("boundary"))
		{
			_GetBoundary (ioParms, inHTMLForm);
		}
		else
		{
			ioParms.ReturnUndefinedValue();
		}
	}
}


void VJSHTMLForm::GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTMLForm *inHTMLForm)
{
	ioParms.AddPropertyName (CVSTR ("count"));
	ioParms.AddPropertyName (CVSTR ("encoding"));
	ioParms.AddPropertyName (CVSTR ("boundary"));
}


void VJSHTMLForm::_GetCount (XBOX::VJSParms_getProperty& ioParms, IHTMLForm *inHTMLForm)
{
	if (NULL != inHTMLForm)
	{
		std::vector<IHTMLFormPart *> formPartsList;

		inHTMLForm->GetFormPartsList (formPartsList);
		ioParms.ReturnNumber (formPartsList.size());
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLForm::_GetBoundary (XBOX::VJSParms_getProperty& ioParms, IHTMLForm *inHTMLForm)
{
	if (NULL != inHTMLForm)
	{
		ioParms.ReturnString (inHTMLForm->GetBoundary());
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLForm::_GetEncoding (XBOX::VJSParms_getProperty& ioParms, IHTMLForm *inHTMLForm)
{
	if (NULL != inHTMLForm)
	{
		ioParms.ReturnString (inHTMLForm->GetEncoding());
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLForm::GetDefinition (ClassDefinition& outDefinition)
{
	static inherited::StaticFunction functions[] =
	{
		{ 0, 0, 0}
	};

	outDefinition.className = "HTMLForm";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.getProperty = js_getProperty<GetProperty>;
	outDefinition.getPropertyNames = js_getPropertyNames<GetPropertyNames>;
	outDefinition.staticFunctions = functions;
}


// ----------------------------------------------------------------------------


void VJSHTMLFormPart::Initialize (const XBOX::VJSParms_initialize& inParms, IHTMLFormPart *inHTMLFormPart)
{
}


void VJSHTMLFormPart::Finalize (const XBOX::VJSParms_finalize& inParms, IHTMLFormPart *inHTMLFormPart)
{
}


void VJSHTMLFormPart::_GetName (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart)
{
	if (NULL != inHTMLFormPart)
	{
		ioParms.ReturnString (inHTMLFormPart->GetName());
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLFormPart::_GetFileName (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart)
{
	if (NULL != inHTMLFormPart)
	{
		ioParms.ReturnString (inHTMLFormPart->GetFileName());
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLFormPart::_GetMediaType (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart)
{
	if (NULL != inHTMLFormPart)
	{
		ioParms.ReturnString (inHTMLFormPart->GetMediaType());
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLFormPart::_GetSize (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart)
{
	if (NULL != inHTMLFormPart)
	{
		ioParms.ReturnNumber (inHTMLFormPart->GetSize());
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLFormPart::_GetBodyAsText (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart)
{
	if (NULL != inHTMLFormPart)
	{
		XBOX::VPtrStream&	stream = const_cast<XBOX::VPtrStream &>(inHTMLFormPart->GetData());
		XBOX::VString		contentType = inHTMLFormPart->GetMediaType();
		MimeTypeKind		mimeTypeKind = inHTMLFormPart->GetMediaTypeKind();
		XBOX::CharSet		charSet = inHTMLFormPart->GetMediaTypeCharSet();

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
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLFormPart::_GetBodyAsPicture (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart)
{
	if (NULL != inHTMLFormPart)
	{
		XBOX::VPtrStream&	stream = const_cast<XBOX::VPtrStream &>(inHTMLFormPart->GetData());
		XBOX::VString		contentType = inHTMLFormPart->GetMediaType();
		MimeTypeKind		mimeTypeKind = inHTMLFormPart->GetMediaTypeKind();

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
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLFormPart::_GetBodyAsBlob (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart)
{
	if (NULL != inHTMLFormPart)
	{
		XBOX::VPtrStream&	stream = const_cast<XBOX::VPtrStream &>(inHTMLFormPart->GetData());
		XBOX::VString		contentType = inHTMLFormPart->GetMediaType();

		XBOX::VJSValue result = GetJSValueFromHTTPMessageBody (ioParms.GetContextRef(), MIMETYPE_BINARY, XBOX::VTC_UNKNOWN, &stream);
		ioParms.ReturnValue (result);
	}
	else
	{
		ioParms.ReturnNullValue();
	}
}


void VJSHTMLFormPart::_Save (XBOX::VJSParms_callStaticFunction& ioParms, IHTMLFormPart *inHTMLFormPart)
{
	XBOX::VString	string;
	XBOX::VError	error = XBOX::VE_INVALID_PARAMETER;
	
	if ((NULL != inHTMLFormPart) && ioParms.GetStringParam (1, string))
	{
		XBOX::VFilePath filePath (string, FPS_POSIX);
		
		if (filePath.IsFolder())
			filePath.ToSubFile (inHTMLFormPart->GetFileName());

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
						XBOX::VPtrStream& stream = const_cast<XBOX::VPtrStream &>(inHTMLFormPart->GetData());

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


void VJSHTMLFormPart::GetDefinition (ClassDefinition& outDefinition)
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

	outDefinition.className = "HTMLFormPart";
	outDefinition.initialize = js_initialize<Initialize>;
	outDefinition.finalize = js_finalize<Finalize>;
	outDefinition.staticValues = values;
	outDefinition.staticFunctions = functions;
}



// ----------------------------------------------------------------------------



void VJSHTTPServer::Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Retain();
}


void VJSHTTPServer::Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Release();
}


void VJSHTTPServer::GetDefinition( ClassDefinition& outDefinition)
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


void VJSHTTPServer::_start( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
	inApplication->StartHTTPServerProject (riaContext);
}


void VJSHTTPServer::_stop( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
	inApplication->StopHTTPServerProject (riaContext);
}


void VJSHTTPServer::_getStarted( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext( ioParms.GetContext(), inApplication);
	ioParms.ReturnBool (inApplication->IsHTTPServerProjectStarted (riaContext));
}


void VJSHTTPServer::_getPort( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inApplication);
	IHTTPServerProject *			serverProject = inApplication->RetainHTTPServerProject (riaContext);
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


void VJSHTTPServer::_getIpAddress (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inApplication);
	IHTTPServerProject *			serverProject = inApplication->RetainHTTPServerProject (riaContext);
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
	
#elif DEPRECATED_IPV4_API_SHOULD_NOT_COMPILE
	#error NEED AN IP V6 UPDATE
#endif
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable (serverProject);
}


void VJSHTTPServer::_getHostName( VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VString hostName;
	inApplication->GetHostName( hostName);
	ioParms.ReturnString( hostName);
}


void VJSHTTPServer::_getDefaultCharSet (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inApplication);
	IHTTPServerProject *			serverProject = inApplication->RetainHTTPServerProject (riaContext);
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


void VJSHTTPServer::_getSSL( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSSSL::CreateInstance( ioParms.GetContextRef(), inApplication));
}


void VJSHTTPServer::_getCache( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	ioParms.ReturnValue( VJSHTTPServerCache::CreateInstance( ioParms.GetContextRef(), inApplication));
}



// ----------------------------------------------------------------------------



void VJSHTTPServerCache::Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Retain();
}


void VJSHTTPServerCache::Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Release();
}


void VJSHTTPServerCache::GetDefinition( ClassDefinition& outDefinition)
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


void VJSHTTPServerCache::_getEnabled( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inApplication);
	IHTTPServerProject *			serverProject = inApplication->RetainHTTPServerProject (riaContext);
#if HTTP_SERVER_GLOBAL_SETTINGS
	IHTTPServerSettings *			settings = (serverProject != NULL) ? serverProject->GetHTTPServerSettings() : NULL;
#else
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;
#endif

	if (settings != NULL)
	{
		ioParms.ReturnBool (settings->GetEnableCache());
	}
	else
	{
		ioParms.ReturnNullValue();
	}

	QuickReleaseRefCountable( serverProject);
}


void VJSHTTPServerCache::_getMemorySize (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inApplication);
	IHTTPServerProject *			serverProject = inApplication->RetainHTTPServerProject (riaContext);
#if HTTP_SERVER_GLOBAL_SETTINGS
	IHTTPServerSettings *			settings = (serverProject != NULL) ? serverProject->GetHTTPServerSettings() : NULL;
#else
	IHTTPServerProjectSettings *	settings = (serverProject != NULL) ? serverProject->GetSettings() : NULL;
#endif

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



void VJSSSL::Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Retain();
}


void VJSSSL::Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication)
{
	inApplication->Release();
}


void VJSSSL::GetDefinition( ClassDefinition& outDefinition)
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


void VJSSSL::_getCertificatePath (XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inApplication);
	IHTTPServerProject *			serverProject = inApplication->RetainHTTPServerProject (riaContext);
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


void VJSSSL::_getEnabled (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inApplication);
	IHTTPServerProject *			serverProject = inApplication->RetainHTTPServerProject (riaContext);
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


void VJSSSL::_getPort (XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication)
{
	VRIAContext *					riaContext = VRIAJSRuntimeContext::GetApplicationContextFromJSContext (ioParms.GetContext(), inApplication);
	IHTTPServerProject *			serverProject = inApplication->RetainHTTPServerProject (riaContext);
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

