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
#include "VRIAServerTools.h"
#include "VRIAServerLogger.h"


USING_TOOLBOX_NAMESPACE


VOutputLogListener::VOutputLogListener()
: fFilteredLevels(0)
{
}


VOutputLogListener::VOutputLogListener( EMessageLevel inFirstFilteredLevel, ...)
: fFilteredLevels(0)
{
	va_list argList;
	va_start(argList, inFirstFilteredLevel);

	for( EMessageLevel level = inFirstFilteredLevel ; level != -1 ; level = va_arg(argList, EMessageLevel))
	{
		fFilteredLevels |= (1 << level);
	}

	va_end( argList);
}


VOutputLogListener::~VOutputLogListener()
{
}


void VOutputLogListener::Put( std::vector< const VValueBag* >& inBags)
{
	VString outputString;
	for( std::vector< const VValueBag* >::iterator iter = inBags.begin() ; iter != inBags.end() ; ++iter)
	{
		EMessageLevel level = 0;
		if ((*iter)->GetLong( ILoggerBagKeys::level, level))
		{
			if ((fFilteredLevels & (1 << level)) == 0)
			{
				VString message;
				ILoggerBagKeys::message.Get( *iter, message);
				if (!message.IsEmpty())
				{
					outputString.AppendString( message);
					outputString.AppendString( L"\n\n");
				}
			}
		}
	}

	if (!outputString.IsEmpty())
		fputs_VString( outputString, stdout);
}



