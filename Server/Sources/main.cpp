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
#include "VRIAServerApplication.h"
#include "VSolutionStartupParameters.h"
#include "VRIAServerSolution.h"


USING_TOOLBOX_NAMESPACE


const VString kARG_ADMINISTRATOR_PORT( "--admin-port");


int main (int inArgc, char * const inArgv[])
{
	// set pattern matching wild char asap
	VCollator::SetDefaultWildChar( '*');	
	
	// First, create the application. So, everything is initialized and ready to use
	VRIAServerApplication application;
	VProcess::InitOptions initOptions = VProcess::Init_Default & ~VProcess::Init_WithQuickTime;
	
	if (application.Init( initOptions))
	{
		// Parse the command line argument
		VError err = VE_OK;

		VRIAServerStartupParameters *startupParameters = new VRIAServerStartupParameters();
		if (startupParameters != NULL)
		{
			// skip first argument (executable path)
			if (inArgc > 1)
			{
				int curArg = 1;

				while (curArg < inArgc && err == VE_OK)
				{
					VString argument( inArgv[curArg]);

					if (argument.BeginsWith( kARG_ADMINISTRATOR_PORT))
					{
						++curArg;
						argument.Remove( 1, kARG_ADMINISTRATOR_PORT.GetLength());
						if (!argument.IsEmpty() && argument.GetUniChar(1) == '=')
						{
							argument.Remove( 1, 1);
							if (!argument.IsEmpty())
							{
								sLONG port = argument.GetLong();
								if (port > 0)
									startupParameters->SetAdministratorHttpPort( port);
								else
									err = VE_RIA_INVALID_COMMAND_LINE_ARGUMENTS;
							}
							else
							{
								err = VE_RIA_INVALID_COMMAND_LINE_ARGUMENTS;
							}
						}
						else
						{
							err = VE_RIA_INVALID_COMMAND_LINE_ARGUMENTS;
						}
					}
					else
					{
						++curArg;

						// check whether it's a solution file path
						VFilePath fullPath;
					#if VERSIONWIN
						fullPath.FromFullPath( argument, FPS_SYSTEM);
					#else // VERSIONMAC
						VURL::Decode( argument);
						fullPath.FromFullPath( argument, FPS_POSIX);
					#endif

						if (fullPath.IsValid())
						{
							VFile *file = new VFile( fullPath);
							if (file != NULL)
							{
								if (file->Exists())
								{
									if (file->ConformsTo( RIAFileKind::kSolutionFileKind) && (startupParameters->GetSolutionToLaunch() == NULL))
									{
										startupParameters->SetSolutionToLaunch( file);
									}
									else if (file->ConformsTo( L"com.netscape.javascript-source") && (startupParameters->GetJavaScriptFileToExecute() == NULL))
									{
										startupParameters->SetJavaScriptFileToExecute( file);
									}
								}
							}
							else
							{
								err = VE_MEMORY_FULL;
							}
							ReleaseRefCountable( &file);
						}
						
						// Skip unknown argument without generate an error
					}
				}
			}

			if (err == VE_OK)
			{
				VRIAServerStartupMessage *msg = new VRIAServerStartupMessage( &application, startupParameters);
				if (msg != NULL)
				{
					msg->PostTo( VTaskMgr::Get()->GetMainTask());
					msg->Release();
				}
				ReleaseRefCountable( &startupParameters);
				
				application.Run();
			}
			else
			{
				ReleaseRefCountable( &startupParameters);
			}
		}
	}
	return 0;
}