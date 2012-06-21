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
#include "VProjectItem.h"
#include "VRIAServerTools.h"
#include "UsersAndGroups/Sources/UsersAndGroups.h"


USING_TOOLBOX_NAMESPACE
using namespace std;


VJSDebuggerSettings::VJSDebuggerSettings ( VRIAServerSolution* inServerSolution )
{
	fServerSolution = inServerSolution;
	if ( fServerSolution != 0 )
		fServerSolution-> Retain ( );
}

VJSDebuggerSettings::~VJSDebuggerSettings ( )
{
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
	//VProjectItem*				pitemPerms = fDesignSolution-> GetProjectItemFromTag ( kPermissionsTag );
	if ( pitemDirectory == NULL )
		return VE_OK; // No user directory so no access rights defined

	CUAGManager*				cmpUAGManager = VComponentManager::RetainComponentOfType <CUAGManager> ( );
	if ( cmpUAGManager == 0 )
		return ThrowError ( VE_RIA_UAG_COMPONENT_NOT_FOUND );

	VError						vError = VE_OK;

	CUAGDirectory*				uagDirectory = fServerSolution-> RetainUAGDirectory ( );
	if ( uagDirectory != 0 )
	{
		VFilePath				pathPerms;
		pitemDirectory-> GetFilePath ( pathPerms );
		/*VFilePath	pathPerms;
		if ( pitemPerms != NULL )
			pitemPerms-> GetFilePath ( pathPerms );*/

		// Load and parse premissions file
		pathPerms. SetExtension ( CVSTR ( "waPerm" ) ); // Hardcoded to be at the same level as the directory file and to have the same name but different extension
		VFile					vfPerms ( pathPerms );
		VValueBag				vvbagPerms;
		vError = LoadBagFromXML ( vfPerms, L"Permissions", vvbagPerms );
		if ( vError == VE_OK )
		{
			const VBagArray*	bgaPerms = vvbagPerms. GetElements ( CVSTR ( "allow" ) ); // Use namespaced bag keys instead, like SolutionPerms::allow
			if ( bgaPerms != 0 )
			{
				VIndex			nCount = bgaPerms-> GetCount ( );
				for ( VIndex i = 1; i <= nCount && vError == VE_OK; i++ )
				{
					const VValueBag*		vvbagOnePerm = bgaPerms-> GetNth ( i );
					if ( vvbagOnePerm == NULL )
						continue;

					VString		vstrAction;
					vvbagOnePerm-> GetString ( CVSTR ( "action" ), vstrAction ); // Use namespaced bag keys instead, like SolutionPerms::action
					VString		vstrGroupID;
					vvbagOnePerm-> GetString ( CVSTR ( "groupID" ), vstrGroupID ); // Use namespaced bag keys instead, like SolutionPerms::groupID
					//::DebugMsg ( CVSTR ( "Action is \"" ) + vstrAction + CVSTR ( "\"\r\n" ) );
					//::DebugMsg ( CVSTR ( "GroupID is \"" ) + vstrGroupID + CVSTR ( "\"\r\n" ) );

					if ( vstrAction. EqualToString ( CVSTR ( "debug" ) ) )
					{
						VUUID		vidGroup;
						vidGroup. FromString ( vstrGroupID );
						fDebuggerGroups. push_back ( vidGroup );
					}
				}
			}
		}
		else
			vError = VE_OK; // Failed to load file so no restrictions (SHOULD PROBABLY FILTER FILE_NOT_FOUND ONLY AND TREAT OTHER ERRORS AS REAL ERRORS)

		uagDirectory-> Release ( );
	}

	ReleaseRefCountable ( &cmpUAGManager );

	return vError;
}

bool VJSDebuggerSettings::UserCanDebug ( const UniChar* inUserName, const UniChar* inSeededHA1, const UniChar* inSeed ) const
{
	if ( fServerSolution == 0 )
	{
		xbox_assert ( false );

		return false; // Something went really wrong
	}

	if ( fDebuggerGroups. size ( ) == 0 )
		return true; // No debugger groups defined at all so access is not protected

	CUAGDirectory*						uagDirectory = fServerSolution-> RetainUAGDirectory ( );
	if ( uagDirectory == 0 )
		return true; // // No directory defined at all so access is not protected

	VString								vstrUserName ( inUserName );
	VString								vstrSeededHA1 ( inSeededHA1 );
	VString								vstrSeed ( inSeed );

	bool								bCanDebug = false;
	VError								vError = VE_OK;

	CUAGUser*							cUser = uagDirectory-> RetainUser ( vstrUserName, &vError );
	if ( cUser != 0 && vError == VE_OK )
	{
		// TODO: MUST STILL VERIFY THE HA1
		VString							vstrValidHA1;
		vError = cUser-> GetHA1 ( vstrValidHA1 );
		if ( vError == VE_OK )
		{
			// Calculate seeded HA1
			CSecurityManager*			cmpSecurityManager = ( CSecurityManager* ) VComponentManager::RetainUniqueComponent ( CSecurityManager::Component_Type );
			if ( cmpSecurityManager != 0 )
			{
				VString					vstrValidHA1Seeded = cmpSecurityManager-> ComputeDigestHA1 ( vstrValidHA1, vstrSeed, CVSTR ( "Wakanda" ) );
				if ( vstrValidHA1Seeded. EqualToString ( vstrSeededHA1 ) )
				{
					CUAGSession*		cSession = uagDirectory-> OpenSession ( cUser, &vError );
					if ( cSession != 0 && vError  == VE_OK )
					{
						vector<VUUID>::const_iterator		iter = fDebuggerGroups. begin ( );
						while ( iter != fDebuggerGroups. end ( ) )
						{
							if ( cSession-> BelongsTo ( *iter ) )
							{
								bCanDebug = true;

								break;
							}

							iter++;
						}
					}
					ReleaseRefCountable ( &cSession );
				}
			}
			ReleaseRefCountable ( &cmpSecurityManager );
		}
	}

	ReleaseRefCountable ( &cUser );
	ReleaseRefCountable ( &uagDirectory );

	return bCanDebug;
}

bool VJSDebuggerSettings::NeedsAuthentication ( ) const
{
	xbox_assert ( fServerSolution != 0 );

	// NOT A  FINAL VERSION
	return fDebuggerGroups. size ( ) != 0;
}

