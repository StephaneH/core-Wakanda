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
#include "VRIAServerSupervisor.h"
#include "VRIAServerTools.h"

#include "../Projet/Visual/WakandaVersNum.h"


USING_TOOLBOX_NAMESPACE


const VString kARG_ADMINISTRATOR_PORT( "--admin-port");
const VString kARG_ADMINISTRATOR_SSL_PORT( "--admin-ssl-port");
const VString kVERSION_NUMBER("--version");
const VString kLOG_DUMP("--netdump");
const VString kARG_DEBUG_OFF("--debug-off");
const VString kARG_SYSLOG("--syslog");
const VString kARG_DEBUGGER_TYPE("--debugger");
const VString kARG_ALLOW_DEBUG_ADMIN("--debug-admin");
const VString kARG_ADMIN_LOGIN("--admin-login");
const VString kARG_ADMIN_PASSWORD("--admin-password");
const VString kARG_JOB_ID("--job-id");


inline VError GetArgumentValue( const VString& inArgument, const VString& inArgumentName, VString& outValue)
{
	outValue.Clear();
	VError err = VE_OK;

	VString argument = inArgument;
	argument.Remove( 1, inArgumentName.GetLength());
	if (!argument.IsEmpty() && argument.GetUniChar(1) == '=')
	{
		argument.Remove( 1, 1);
		if (!argument.IsEmpty())
			outValue = argument;
		else
			err = VE_RIA_INVALID_COMMAND_LINE_ARGUMENTS;
	}
	else
	{
		err = VE_RIA_INVALID_COMMAND_LINE_ARGUMENTS;
	}

	return err;
}


inline void GetInvalidArgumentErrorString( const VString& inArgument, VString& outString)
{
	outString.Printf( "Error: %S parameter is invalid\n", &inArgument);
}


int main (int inArgc, char * const inArgv[])
{
	// set pattern matching wild char asap
	VCollator::SetDefaultWildChar( '*');	
	
	// First, create the application. So, everything is initialized and ready to use
	VRIAServerApplication application;
	VProcess::InitOptions initOptions = VProcess::Init_Default & ~VProcess::Init_WithQuickTime;

#if VERSION_LINUX
	XBOX::VString versionString;
	versionString.FromCString (STRPRODUCTVER); // 	YT 18-May-2012 - WAK0076647
    VRIAServerApplication::Get()->SetProductVersion (versionString);
#endif
	
    //jmo - We may want to quit after parsing the command line
    bool shouldQuit=false;

	VString errorString;

	if (application.Init( initOptions))
	{
		// Parse the command line argument
		VError err = VE_OK;

		// remote admin: feature development in progress
		//VRIAServerSupervisor*	srvSup = VRIAServerSupervisor::Get();

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

					// kARG_ADMINISTRATOR_PORT
					if (argument.BeginsWith( kARG_ADMINISTRATOR_PORT))
					{
						++curArg;
						VString value;
						err = GetArgumentValue( argument, kARG_ADMINISTRATOR_PORT, value);
						if (err == VE_OK)
						{
							sLONG port = value.GetLong();
							if (port > 0)
								startupParameters->SetAdministratorHttpPort( port);
							else
								err = VE_RIA_INVALID_COMMAND_LINE_ARGUMENTS;
						}
						if (err != VE_OK)
							GetInvalidArgumentErrorString( kARG_ADMINISTRATOR_PORT, errorString);
					}

					// kARG_ADMINISTRATOR_SSL_PORT
					else if (argument.BeginsWith( kARG_ADMINISTRATOR_SSL_PORT))
					{
						++curArg;
						VString value;
						err = GetArgumentValue( argument, kARG_ADMINISTRATOR_SSL_PORT, value);
						if (err == VE_OK)
						{
							sLONG port = value.GetLong();
							if (port > 0)
								startupParameters->SetAdministratorSSLPort( port);
							else
								err = VE_RIA_INVALID_COMMAND_LINE_ARGUMENTS;
						}
						if (err != VE_OK)
							GetInvalidArgumentErrorString( kARG_ADMINISTRATOR_SSL_PORT, errorString);
					}

					// kVERSION_NUMBER
                    else if (argument.BeginsWith( kVERSION_NUMBER))
					{
						++curArg;
						argument.Remove(1, kVERSION_NUMBER.GetLength());

						VString version;
						
						VRIAServerApplication::Get()->GetProductVersion(version);
						
						char buf[100];
						
						version.ToCString(buf, sizeof(buf));
						
                        printf("Wakanda Server %s\n", buf);

                        shouldQuit=true;
					}

					// kLOG_DUMP
					else if (argument.BeginsWith( kLOG_DUMP))
					{
						++curArg;
						argument.Remove(1, kLOG_DUMP.GetLength());
						
						startupParameters->SetNetDump(true);
					}

					// kARG_DEBUG_OFF
					else if (argument.EqualToString( kARG_DEBUG_OFF))
					{
						++curArg;
						startupParameters->SetDebuggingAuthorized( false);
					}

					// kARG_SYSLOG
					else if (argument.EqualToString( kARG_SYSLOG))
					{
						++curArg;

					#if VERSIONMAC || VERSION_LINUX
						VSysLogOutput *syslogOutput = new VSysLogOutput( L"Wakanda Server");
						application.GetLogger()->AddLogListener( syslogOutput);
						syslogOutput->Release();
					#else
						VString warningMsg;
						warningMsg.Printf( "Warning: %S parameter is ignored\n", &kARG_SYSLOG);
						fputs_VString( warningMsg, stdout);
					#endif
					}

					// kARG_DEBUGGER_TYPE
					else if (argument.BeginsWith( kARG_DEBUGGER_TYPE))
					{
						++curArg;
						VString value;
						err = GetArgumentValue( argument, kARG_DEBUGGER_TYPE, value);
						if (err == VE_OK)
						{
							if (IsValidDebuggerParam( value))
								startupParameters->SetDebuggerType( DebuggerParamToDebuggerType( value));
							else
								err = VE_RIA_INVALID_COMMAND_LINE_ARGUMENTS;
						}
						if (err != VE_OK)
							GetInvalidArgumentErrorString( kARG_DEBUGGER_TYPE, errorString);
					}

					// kARG_ALLOW_DEBUG_ADMIN
					else if (argument.EqualToString( kARG_ALLOW_DEBUG_ADMIN))
					{
						++curArg;
						startupParameters->SetAllowDebugAdministrator( true);
					}

					// kARG_ADMIN_LOGIN
					else if (argument.BeginsWith( kARG_ADMIN_LOGIN))
					{
						++curArg;
						VString value;
						err = GetArgumentValue( argument, kARG_ADMIN_LOGIN, value);
						if (err == VE_OK)
							startupParameters->SetAdminLogin( value);
						if (err != VE_OK)
							GetInvalidArgumentErrorString( kARG_ADMIN_LOGIN, errorString);
					}

					// kARG_ADMIN_PASSWORD
					else if (argument.BeginsWith( kARG_ADMIN_PASSWORD))
					{
						++curArg;
						VString value;
						err = GetArgumentValue( argument, kARG_ADMIN_PASSWORD, value);
						if (err == VE_OK)
							startupParameters->SetAdminPassword( value);
						if (err != VE_OK)
							GetInvalidArgumentErrorString( kARG_ADMIN_PASSWORD, errorString);
					}

					// kARG_JOB_ID
					else if (argument.BeginsWith( kARG_JOB_ID))
					{
						++curArg;
						VString value;
						err = GetArgumentValue( argument, kARG_JOB_ID, value);
						if (err == VE_OK)
							startupParameters->SetJobID( value);
						if (err != VE_OK)
							GetInvalidArgumentErrorString( kARG_JOB_ID, errorString);
					}
					else
					{
						++curArg;
						bool ignoreArgument = false;

						// either it's a solution file or a JavaScript file

						if (	(startupParameters->GetSolutionToLaunch() == NULL)
							&&	(startupParameters->GetJavaScriptFileToExecute() == NULL))
						{
							VFilePath fullPath;
						#if VERSIONWIN
							fullPath.FromFullPath( argument, FPS_SYSTEM);
						#elif VERSIONMAC
							VURL::Decode( argument);
							fullPath.FromFullPath( argument, FPS_POSIX);
						#else
							PathBuffer buf;
							VError verr=buf.Init(argument, PathBuffer::withRealPath);

							if(testAssert(verr==VE_OK))
								verr=buf.ToPath(&fullPath);

							assert(verr==VE_OK);
						#endif

							if (fullPath.IsValid() && fullPath.IsFile())
							{
								VFile *file = new VFile( fullPath);
								if (file != NULL)
								{
									if (	file->ConformsTo( RIAFileKind::kSolutionFileKind)
										||	file->ConformsTo( L"com.netscape.javascript-source"))
									{
										if (file->Exists())
										{
											if (file->ConformsTo( RIAFileKind::kSolutionFileKind))
												startupParameters->SetSolutionToLaunch( file);
											else if (file->ConformsTo( L"com.netscape.javascript-source"))
												startupParameters->SetJavaScriptFileToExecute( file);
										}
										else
										{
											err = VE_RIA_INVALID_COMMAND_LINE_ARGUMENTS;
										}
									}
									else
									{
											// sc 06/08/2013 ignore unusable files
											ignoreArgument = true;
									}
								}
								else
								{
									err = VE_MEMORY_FULL;
								}
								ReleaseRefCountable( &file);
								
								if (err != VE_OK)
									GetInvalidArgumentErrorString( L"file", errorString);
							}
							else
							{
								// sc 05/08/2013 ignore invalid paths and folder paths
								ignoreArgument = true;
							}
						}
						else
						{
							ignoreArgument = true;
						}

						if (ignoreArgument)
						{
							// Skip unknown argument without generate an error
							VString warningMsg;
							warningMsg.Printf( "Warning: %S parameter is ignored\n", &argument);
							fputs_VString( warningMsg, stdout);
						}
					}
				}
			}

			if ((err != VE_OK) && !errorString.IsEmpty())
				fputs_VString( errorString, stdout);

			if (err == VE_OK && shouldQuit == false)
			{
				VRIAServerStartupMessage *msg = new VRIAServerStartupMessage( &application, startupParameters);
				if (msg != NULL)
				{
					msg->PostTo( VTaskMgr::Get()->GetMainTask());
					msg->Release();
				}
				ReleaseRefCountable( &startupParameters);
				
				VString version, name, welcome;
				application.GetProductVersion( version);
				application.GetProductName( name);
				welcome.Printf( "Welcome to %S version %S\n\n", &name, &version);
				fputs_VString( welcome, stdout);
				
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
