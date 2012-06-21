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
#include "UsersAndGroups/Sources/UsersAndGroups.h"
#include "VRIAServerHTTPSession.h"


USING_TOOLBOX_NAMESPACE



const VString kHTTP_SESSION_COOKIE_NAME( "WASID");



// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------



VRIAHTTPSessionManager::VRIAHTTPSessionManager()
{
}


VRIAHTTPSessionManager::~VRIAHTTPSessionManager()
{
	xbox_assert( fSessions.empty());
}

/*
VRIAHTTPSession* VRIAHTTPSessionManager::CreateAndRetainSession( CUAGSession *inUAGSession, XBOX::VJSSessionStorageObject *inSessionStorageObject, sLONG inLifeTime)
{
	VRIAHTTPSession *session = new VRIAHTTPSession();
	if (session != NULL)
	{
		AddSession( session);
		session->SetUAGSession( inUAGSession);
		session->SetSessionStorageObject( inSessionStorageObject);
		session->SetLifeTime( inLifeTime);
		if (inSessionStorageObject == NULL)
		{
			VJSSessionStorageObject *sessionStorageObject = new VJSSessionStorageObject();
			session->SetSessionStorageObject( sessionStorageObject);
			ReleaseRefCountable( &sessionStorageObject);
		}
	}
	return session;

}
*/


void VRIAHTTPSessionManager::AddSession( CUAGSession* inSession)
{
	if (inSession != NULL)
	{
		if (fMutex.Lock())
		{
			VUUID id;
			inSession->GetID( id);
			MapOfSession_iter found = fSessions.find( id);
			if (found == fSessions.end())
			{
				fSessions[id] = VRefPtr<CUAGSession>( inSession);
			}
			fMutex.Unlock();
		}
	}
}


void VRIAHTTPSessionManager::RemoveSession( CUAGSession* inSession)
{
	if (inSession != NULL)
	{
		if (fMutex.Lock())
		{
			VUUID id;
			inSession->GetID( id);
			MapOfSession_iter found = fSessions.find( id);
			if (found != fSessions.end())
			{
				fSessions.erase( found);
			}
			fMutex.Unlock();
		}
	}
}


void VRIAHTTPSessionManager::RemoveSession( const VUUID& inID)
{
	if (fMutex.Lock())
	{
		MapOfSession_iter found = fSessions.find( inID);
		if (found != fSessions.end())
		{
			fSessions.erase( found);
		}
		fMutex.Unlock();
	}
}


CUAGSession* VRIAHTTPSessionManager::RetainSession( const VUUID& inID) const
{
	CUAGSession *session = NULL;

	if (fMutex.Lock())
	{
		MapOfSession_citer found = fSessions.find( inID);
		if (found != fSessions.end())
		{
			session = RetainRefCountable( found->second.Get());
		}
		fMutex.Unlock();
	}
	return session;
}


void VRIAHTTPSessionManager::Clear()
{
	if (fMutex.Lock())
	{
		fSessions.clear();
		fMutex.Unlock();
	}
}


CUAGSession* VRIAHTTPSessionManager::RetainSessionFromCookie( const IHTTPRequest& inRequest) const
{
	bool done = false;
	CUAGSession *session = NULL;

	IAuthenticationInfos* authInfo = inRequest.GetAuthenticationInfos();
	if (authInfo != nil)
		session = RetainRefCountable(authInfo->GetUAGSession());

	if (session == nil)
	{
		std::vector<IHTTPCookie*> cookies;
		inRequest.GetCookies( cookies);

		for (std::vector<IHTTPCookie*>::iterator iter = cookies.begin() ; iter != cookies.end() && !done ; ++iter)
		{
			if (*iter != NULL)
			{
				if ((*iter)->GetName().EqualToString( kHTTP_SESSION_COOKIE_NAME, true))
				{
					VUUID uuid;
					uuid.FromString( (*iter)->GetValue());
					session = RetainSession( uuid);
					done = true;
				}
			}
		}
	}

	return session;
}
