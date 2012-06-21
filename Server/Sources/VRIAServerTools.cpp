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
#include "HTTPServer/Interfaces/CHTTPServer.h"
#include "VRIAServerApplication.h"
#include "VRIAServerTools.h"

USING_TOOLBOX_NAMESPACE


VError SetHTTPResponseString( IHTTPResponse* inResponse, const VString& inString, const VString* inContentType)
{
	if (inResponse == NULL)
		return VE_INVALID_PARAMETER;
	
	StStringConverter<char> buffer( inString, VTC_UTF_8);

	inResponse->GetResponseBody().OpenWriting();
	inResponse->GetResponseBody().PutData( buffer.GetCPointer(), buffer.GetLength());
	inResponse->GetResponseBody().CloseWriting();

	VError err = inResponse->GetResponseBody().GetLastError();
	if (err == VE_OK)
	{
		inResponse->SetExpiresHeader( GMT_NOW);
		inResponse->AddResponseHeader( HEADER_PRAGMA, CVSTR ("no-cache"));
		if (inContentType != NULL)
		{
			inResponse->AddResponseHeader( HEADER_CONTENT_TYPE, *inContentType);
		}
		/* We send a String encoded using UTF-8, so set the correct header value */
		XBOX::CharSet	charSet = XBOX::VTC_UNKNOWN;
		XBOX::VString	contentType;
		inResponse->GetContentTypeHeader (contentType, &charSet);
		if (contentType.IsEmpty() || charSet !=  VTC_UTF_8)
		{
			inResponse->SetContentTypeHeader (contentType.IsEmpty() ? CVSTR ("text/html"): contentType, VTC_UTF_8);
		}
#if HTTP_SERVER_VERBOSE_MODE
		inResponse->AddResponseHeader( HEADER_X_POWERED_BY, "RIA Server");
#endif
		inResponse->SetContentLengthHeader( buffer.GetLength());
		inResponse->AllowCompression (false);
	}
	return err;
}


VError ThrowError( VError inError)
{
	VErrorBase *errBase = new VErrorBase( inError, 0);
	if (errBase != NULL)
		VTask::GetCurrent()->PushRetainedError( errBase);
	return inError;
}


VError ThrowError( VError inError, const VValueBag& inParameters)
{
	VErrorBase *errBase = CreateErrorBase( inError, inParameters);
	if (errBase != NULL)
		VTask::GetCurrent()->PushRetainedError( errBase);
	return inError;
}


VError ThrowError( VError inError, const VString *inParam, ...)
{
	VErrorBase *errBase = new VErrorBase( inError, 0);
	if (errBase != NULL)
	{
		VValueBag *bag = errBase->GetBag();
		if (bag != NULL)
		{
			VIndex paramNum = 1;
			
			va_list argList;
			va_start( argList, inParam);
			
			for (const VString *param = inParam ; param != NULL ; param = va_arg( argList, const VString*), ++paramNum)
			{
				VString attName( "param");
				attName.AppendLong( paramNum);
				bag->SetString( attName, *param);
			}
			
			va_end( argList);
		}

		VTask::GetCurrent()->PushRetainedError( errBase);
	}
	return inError;
}


VErrorBase* CreateErrorBase( VError inError, const XBOX::VValueBag& inParameters)
{
	VErrorBase *errBase = new VErrorBase( inError, 0);
	if (errBase != NULL)
	{
		VValueBag *bag = errBase->GetBag();
		if (bag != NULL)
		{
			for (VIndex pos = 1 ; pos <= inParameters.GetAttributesCount() ; ++pos)
			{
				VString name;
				const VValueSingle* value = inParameters.GetNthAttribute( pos, &name);
				bag->SetAttribute( name, (value != NULL) ? value->Clone() : NULL);
			}
		}
	}
	return errBase;
}


VErrorBase* CreateErrorBase( VError inError, const VString *inParam, ...)
{
	VErrorBase *errBase = new VErrorBase( inError, 0);
	if (errBase != NULL)
	{
		VValueBag *bag = errBase->GetBag();
		if (bag != NULL)
		{
			VIndex paramNum = 1;
			
			va_list argList;
			va_start( argList, inParam);
			
			for (const VString *param = inParam ; param != NULL ; param = va_arg( argList, const VString*), ++paramNum)
			{
				VString attName( "param");
				attName.AppendLong( paramNum);
				bag->SetString( attName, *param);
			}

			va_end( argList);
		}
	}
	return errBase;
}



// ----------------------------------------------------------------------------


VRIAMessageLogger* VRIAMessageLogger::sLogger = NULL;

VRIAMessageLogger::VRIAMessageLogger()
{
}


VRIAMessageLogger::~VRIAMessageLogger()
{
}


VRIAMessageLogger* VRIAMessageLogger::Get()
{
	return sLogger;
}


bool VRIAMessageLogger::Init()
{
	if (sLogger == NULL)
		sLogger = new VRIAMessageLogger();

	return true;
}


void VRIAMessageLogger::DeInit()
{
	delete sLogger;
	sLogger = NULL;
}


void VRIAMessageLogger::LogMessage( const XBOX::VString& inMessage)
{
	if (fMessagesMutex.Lock())
	{
		fMessages.push_back( inMessage);
		fMessagesMutex.Unlock();
	}
}


void VRIAMessageLogger::LogMessagesFromErrorContext( XBOX::VErrorContext* inContext)
{
	if (inContext != NULL)
	{
		if (fMessagesMutex.Lock())
		{
			VString errorMessage;
			for (std::vector<VRefPtr<VErrorBase> >::const_iterator iter = inContext->GetErrorStack().begin() ; iter != inContext->GetErrorStack().end() ; ++iter)
			{
				(*iter)->GetErrorDescription( errorMessage);
				fMessages.push_back( errorMessage);
			}
			fMessagesMutex.Unlock();
		}
	}
}


void VRIAMessageLogger::GetMessages( std::vector<XBOX::VString>& outMessages, bool inClear)
{
	if (fMessagesMutex.Lock())
	{
		outMessages.clear();
		outMessages.insert( outMessages.begin(), fMessages.begin(), fMessages.end());

		if (inClear)
			fMessages.clear();

		fMessagesMutex.Unlock();
	}
}
 

