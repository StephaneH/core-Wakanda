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
#include "UsersAndGroups/Sources/UsersAndGroups.h"
#include "VRIAPermissions.h"



USING_TOOLBOX_NAMESPACE



namespace RIAPermissionsKeys
{
	CREATE_BAGKEY( allow);
	CREATE_BAGKEY( resource);
	CREATE_BAGKEY( type);
	CREATE_BAGKEY( action);
	CREATE_BAGKEY( groupID);
}



VRIAPermissions::VRIAPermissions()
{
}


VRIAPermissions::~VRIAPermissions()
{
}


VError VRIAPermissions::LoadPermissionFile( const VFile& inFile, VFolder* inDTDsFolder)
{
	VError err = VE_OK;

	fPermissions.clear();

	if (inFile.Exists())
	{
		VValueBag bag;
		err = LoadBagFromXML( inFile, L"permissions", bag, XML_ValidateNever, NULL, inDTDsFolder);
		if (err == VE_OK)
		{
			VBagArray *bagArray = bag.GetElements( RIAPermissionsKeys::allow);
			if (bagArray != NULL)
			{
				VIndex permCount = bagArray->GetCount();
				for (VIndex permIter = 1 ; permIter <= permCount ; ++permIter)
				{
					VValueBag *permissionBag = bagArray->GetNth( permIter);
					if (permissionBag != NULL)
					{
						VString type, resource, action, groupID;

						if (	!permissionBag->GetString( RIAPermissionsKeys::type, type)
							||	!permissionBag->GetString( RIAPermissionsKeys::resource, resource)
							||	!permissionBag->GetString( RIAPermissionsKeys::action, action) )
							continue;

						if (type.IsEmpty() || resource.IsEmpty() || action.IsEmpty())
							continue;

						fPermissions.push_back( VRefPtr<VValueBag>(permissionBag));
					}
				}
			}
		}
	}
	else
	{
		err = VE_FILE_NOT_FOUND;
	}

	return err;
}
	

const VValueBag* VRIAPermissions::RetainResourcePermission( const VString& inType, const VString& inResource, const VString& inAction) const
{
	if (inType.IsEmpty() || inResource.IsEmpty() || inAction.IsEmpty())
		return NULL;

	VValueBag *permissionBag = NULL;

	for (std::vector< XBOX::VRefPtr<XBOX::VValueBag> >::const_iterator permIter = fPermissions.begin() ; (permIter != fPermissions.end()) && (permissionBag == NULL) ; ++permIter)
	{
		VString resource, type, action;
		
		(*permIter)->GetString( RIAPermissionsKeys::type, type);
		if (!inType.EqualToString( type, true))
			continue;

		(*permIter)->GetString( RIAPermissionsKeys::resource, resource);
		if (!inResource.EqualToString( resource, true))
			continue;

		(*permIter)->GetString( RIAPermissionsKeys::action, action);
		if (!inAction.EqualToString( action, true))
			continue;

		permissionBag = (*permIter).Retain();
	}

	return permissionBag;
}


XBOX::VError VRIAPermissions::RetainResourcesPermission( std::vector< XBOX::VRefPtr<XBOX::VValueBag> >& outPermissions, const XBOX::VString* inType, const XBOX::VString* inResource, const XBOX::VString* inAction) const
{
	VError err = VE_OK;

	if (inType == NULL && inResource == NULL && inAction == NULL)
	{
		outPermissions.insert( outPermissions.end(), fPermissions.begin(), fPermissions.end());
	}
	else
	{
		for (std::vector< XBOX::VRefPtr<XBOX::VValueBag> >::const_iterator permIter = fPermissions.begin() ; permIter != fPermissions.end() ; ++permIter)
		{
			if (inType != NULL)
			{
				VString type;
				(*permIter)->GetString( RIAPermissionsKeys::type, type);
				if (!inType->EqualToString( type, true))
					continue;
			}

			if (inResource != NULL)
			{
				VString resource;
				(*permIter)->GetString( RIAPermissionsKeys::resource, resource);
				if (!inResource->EqualToString( resource, true))
					continue;
			}

			if (inAction != NULL)
			{
				VString action;
				(*permIter)->GetString( RIAPermissionsKeys::action, action);
				if (!inAction->EqualToString( action, true))
					continue;
			}

			outPermissions.push_back( *permIter);
		}
	}

	return err;
}


bool VRIAPermissions::IsResourceAccessGrantedForSession( const VString& inType, const VString& inResource, const VString& inAction, CUAGSession *inUAGSession) const
{
	const VValueBag *permissionBag = RetainResourcePermission( inType, inResource, inAction);
	if (permissionBag == NULL)
		return true;

	bool accessGranted = false;
	VString uuidStr;
	VUUID groupID;

	permissionBag->GetString( RIAPermissionsKeys::groupID, uuidStr);
	groupID.FromString( uuidStr);

	if (inUAGSession != NULL)
		accessGranted = inUAGSession->BelongsTo( groupID);

	ReleaseRefCountable( &permissionBag);

	return accessGranted;
}