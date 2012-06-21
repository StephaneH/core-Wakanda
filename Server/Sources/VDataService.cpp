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
#include "VRIAServerProject.h"
#include "VRIAServerTools.h"
#include "VDataService.h"


USING_TOOLBOX_NAMESPACE


VDataService::VDataService( VRIAServerProject *inApplication, IHTTPServerProject *inHTTPServerProject)
{
	fApplication = inApplication;
	fDatabase = NULL;
	fHTTPServerProject = inHTTPServerProject;
	fRequestHandler = NULL;
	fPattern = L"/rest/"; // also hard-coded into DB4D
}


VDataService::~VDataService()
{
	xbox_assert(fRequestHandler == NULL);

	ReleaseRefCountable( &fRequestHandler);
}


void VDataService::GetPattern( XBOX::VString& outPattern) const
{
	if (fMutex.Lock())
	{
		outPattern = fPattern;
		fMutex.Unlock();
	}
}


VError VDataService::SetEnabled( bool inEnabled)
{
	if (!testAssert(fApplication != NULL))
		return VE_UNKNOWN_ERROR;

	if (fHTTPServerProject == NULL)
		return ThrowError( VE_RIA_HTTP_SERVER_PROJECT_NOT_FOUND);

	VError err = VE_OK;

	if (fMutex.Lock())
	{
		if (inEnabled)
		{
			if (fRequestHandler == NULL)
			{
				if (fDatabase != NULL)
				{
					fRequestHandler = fDatabase->AddRestRequestHandler( err, fHTTPServerProject, (RIApplicationRef)fApplication, fPattern, true);
					if (err != VE_OK)
						ReleaseRefCountable( &fRequestHandler);
				}
				else
				{
					err = ThrowError( VE_RIA_NONE_OPENED_DATABASE_FOUND);
				}
			}
		}
		else 
		{
			if (fRequestHandler != NULL)
			{
				err = fHTTPServerProject->RemoveHTTPRequestHandler( fRequestHandler);
				ReleaseRefCountable( &fRequestHandler);
			}
		}
		fMutex.Unlock();
	}
	return err;
}


bool VDataService::IsEnabled() const
{
	bool result = false;

	if (fMutex.Lock())
	{
		result = (fRequestHandler != NULL);
		fMutex.Unlock();
	}
	return result;
}


void VDataService::SetDatabase( CDB4DBase *inDatabase)
{
	if (fMutex.Lock())
	{
		xbox_assert(fRequestHandler == NULL);
		fDatabase = inDatabase;
		fMutex.Unlock();
	}
}