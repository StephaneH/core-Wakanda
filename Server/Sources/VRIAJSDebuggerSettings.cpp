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
#include "VRIAJSDebuggerSettings.h"
#include "VSolution.h"
#include "VRIAServerSolution.h"
#include "VRIAServerProject.h"
#include "VProjectItem.h"
#include "VRIAServerTools.h"
#include "UsersAndGroups/Sources/UsersAndGroups.h"


USING_TOOLBOX_NAMESPACE
using namespace std;


VJSDebuggerSettings::VJSDebuggerSettings ( VRIAServerSolution* inServerSolution )
{
	fNeedsAuthentication = true;
	fServerSolution = inServerSolution;
	if ( fServerSolution != 0 )
		fServerSolution-> Retain ( );
}

VJSDebuggerSettings::~VJSDebuggerSettings ( )
{
	if ( fServerSolution != 0 )
		fServerSolution-> Release ( );
}

VError VJSDebuggerSettings::Init ( )
{
	if ( fServerSolution == 0 )
		return ThrowError ( VE_RIA_INVALID_DESIGN_SOLUTION );

	VSolution*					vSolution = fServerSolution-> GetDesignSolution ( );
	if ( vSolution == NULL )
		return ThrowError ( VE_RIA_INVALID_DESIGN_SOLUTION );

	VProjectItem*				pitemDirectory = vSolution-> GetProjectItemFromTag ( kUAGDirectoryTag );
	VProjectItem*				pitemPerms = vSolution-> GetProjectItemFromTag ( kPermissionsTag );

	fNeedsAuthentication = ( pitemDirectory != NULL && pitemPerms != NULL ); // If no user directory then no access rights defined

	return VE_OK;
}

bool VJSDebuggerSettings::UserCanDebug(IAuthenticationInfos* inAuthenticationInfos) const
{
	bool			canDebug = false;
	CUAGSession*	uagSession;

	uagSession = inAuthenticationInfos->GetUAGSession();

	if (!uagSession)
	{
		CUAGDirectory*	uagDirectory = fServerSolution->RetainUAGDirectory();
		if (!uagDirectory)
		{
			// No directory defined at all so access is not protected
			canDebug = true;
		}
		else
		{
			VError			vError = VE_OK;

			uagSession = uagDirectory->MakeDefaultSession(&vError);
			xbox_assert( vError == VE_OK );
			inAuthenticationInfos->SetUAGSession(uagSession);
			//inAuthenticationInfos->UAGSessionHasChanged();
		}
		ReleaseRefCountable( &uagDirectory );
	}

	if (!canDebug && uagSession)
	{
		CUAGDirectory*		uagDir = uagSession->GetDirectory();
		XBOX::VUUID			uuid;
		if (!uagDir->GetSpecialGroupID(CUAGDirectory::DebuggerGroup, uuid))
		{
			xbox_assert(false);
		}
		else
		{
			if (uagSession->BelongsTo(uuid))
			{
				canDebug = true;
			}
		}
	}
	return canDebug;
}

bool VJSDebuggerSettings::UserCanDebug ( const UniChar* inUserName, const UniChar* inUserPassword ) const
{
	if ( fServerSolution == 0 )
	{
		xbox_assert ( false );

		return false; // Something went really wrong
	}

	if ( !NeedsAuthentication ( ) )
		return true;

	CUAGDirectory*						uagDirectory = fServerSolution-> RetainUAGDirectory ( );
	if ( uagDirectory == 0 )
		return true; // No directory defined at all so access is not protected

	VString								vstrUserName ( inUserName );
	VString								vstrUserPassword ( inUserPassword );

	bool								bCanDebug = false;
	VError								vError = VE_OK;
	CUAGSession*						cSession = NULL;

	if ((uagDirectory != NULL) && uagDirectory->HasLoginListener())
	{
		// sc 22/06/2012, custom JavaScript authentication support
		VectorOfApplication applications;
		fServerSolution->GetApplications( applications);
		VRIAServerProject *app = (!applications.empty()) ? applications.front() : NULL;
		if (app != NULL)
		{
			VJSGlobalContext *globalContext = app->RetainJSContext( vError, true, NULL);
			if (vError == VE_OK)
			{
				if (testAssert(globalContext != NULL))
				{
					VJSContext jsContext( globalContext);
					cSession = uagDirectory-> OpenSession ( inUserName, inUserPassword, &vError, &jsContext );
				}
				else
				{
					vError = VE_UNKNOWN_ERROR;
				}
			}
			app->ReleaseJSContext( globalContext, NULL);
		}
	}
	else
	{
		cSession = uagDirectory-> OpenSession ( inUserName, inUserPassword, &vError, NULL );
	}
	
	if ( cSession != 0 && vError  == VE_OK )
	{
		VUUID			vuuidAdminGroup;
		bool			bOK = uagDirectory-> GetSpecialGroupID ( CUAGDirectory::AdminGroup, vuuidAdminGroup );
		xbox_assert ( bOK );
		if ( cSession-> BelongsTo ( vuuidAdminGroup ) )
			bCanDebug = true;
	}

	ReleaseRefCountable ( &cSession );
	ReleaseRefCountable ( &uagDirectory );
	
	return bCanDebug;
}

bool VJSDebuggerSettings::NeedsAuthentication ( ) const
{
	xbox_assert ( fServerSolution != 0 );

	if ( !fNeedsAuthentication )
		return false;

	bool								bResult = true;

	CUAGDirectory*						uagDirectory = fServerSolution-> RetainUAGDirectory ( );
	xbox_assert ( uagDirectory != 0 );
	if ( uagDirectory == 0 )
		return fNeedsAuthentication;
	else
	{
		// Let's verify the special case when the default session can debug
		VError							vError = VE_OK;
		CUAGSession*					cSession = uagDirectory-> MakeDefaultSession ( &vError );
		xbox_assert ( vError == VE_OK );
		VUUID							vuuidAdminGroup;
		bool							bOK = uagDirectory-> GetSpecialGroupID ( CUAGDirectory::AdminGroup, vuuidAdminGroup );
		xbox_assert ( bOK );
		if ( cSession-> BelongsTo ( vuuidAdminGroup ) )
			bResult = false;

		ReleaseRefCountable ( &cSession );
	}

	ReleaseRefCountable ( &uagDirectory );

	return bResult;
}

bool VJSDebuggerSettings::HasDebuggerUsers ( ) const
{
	bool								bResult = false;

	CUAGDirectory*						uagDirectory = fServerSolution-> RetainUAGDirectory ( );
	xbox_assert ( uagDirectory != 0 );
	if ( uagDirectory == 0 )
		return false;

	VError								vError = VE_OK;
	CUAGGroup*							groupDebuggers = uagDirectory-> RetainSpecialGroup ( CUAGDirectory::AdminGroup, &vError );
	xbox_assert ( vError == VE_OK );
	if ( vError == VE_OK && groupDebuggers != 0 )
	{
		CUAGUserVector					vctrUsers;
		groupDebuggers-> RetainUsers ( vctrUsers, false );
		bResult = ( vctrUsers. size ( ) > 0 );
	}

	ReleaseRefCountable ( &groupDebuggers );
	ReleaseRefCountable ( &uagDirectory );

	return bResult;
}

