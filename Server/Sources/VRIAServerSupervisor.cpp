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
#include "VRIAServerSupervisor.h"



USING_TOOLBOX_NAMESPACE
using namespace std;


const XBOX::VString			K_REMOTE_ADMIN_WS("/remote_admin_ws");

VRIAServerSupervisor*		VRIAServerSupervisor::sRIAServerSupervisor = NULL;
sLONG						VRIAServerSupervisor::VRIAServerJob::sJobID = 1;
XBOX::VCriticalSection		VRIAServerSupervisor::VRIAServerJob::sLock;

VRIAServerSupervisor::VRIAServerSupervisorTreatWSMessage::VRIAServerSupervisorTreatWSMessage(
										IHTTPResponse*			ioResponse,
										VRIAServerSupervisor*	inSrvSup ) :
			fResponse(ioResponse),
			fSrvSup(inSrvSup)
{
}

VRIAServerSupervisor::VRIAServerSupervisorTreatWSMessage::~VRIAServerSupervisorTreatWSMessage()
{
}

void VRIAServerSupervisor::VRIAServerSupervisorTreatWSMessage::DoExecute()
{
	fStatus = VE_INVALID_PARAMETER;
	if (testAssert(fSrvSup->fState == STARTED_STATE))
	{
		fStatus = fSrvSup->fWS->TreatNewConnection(fResponse);
	}
	if (fStatus)
	{
		fSrvSup->fState = CONNECTED_STATE;
		fSrvSup->fClientCompletedSemaphore.Unlock();
	}
}

VRIAServerSupervisor::VRIAServerJob::VRIAServerJob() : fState(JOB_UNDEFINED_STATE)
{
	sLock.Lock();
	fJobId = sJobID++;
	sLock.Unlock();
	SetState( JOB_CREATED_STATE, "" );
}
VRIAServerSupervisor::VRIAServerJob::~VRIAServerJob()
{
}

XBOX::VError VRIAServerSupervisor::VRIAServerJob::SetState(VRIAServerJobState inNewState, XBOX::VString inMessage)
{
	VError		err = VE_INVALID_PARAMETER;
	switch(inNewState)
	{
	case JOB_UNDEFINED_STATE:
		break;
	case JOB_CREATED_STATE:
		if (fState == JOB_UNDEFINED_STATE)
		{
			err = VE_OK;
		}
		break;
	case JOB_STARTED_STATE:
		if (fState == JOB_CREATED_STATE)
		{
			err = VE_OK;
		}
		break;
	case JOB_COMPLETED_STATE:
		if (fState == JOB_STARTED_STATE)
		{
			err = VE_OK;
		}
		break;
	case JOB_FAILED_STATE:
		if ( (fState == JOB_CREATED_STATE) || (fState == JOB_STARTED_STATE) )
		{
			err = VE_OK;
		}
		break;
	}
	if (!err)
	{
		fState = inNewState;

		VValueBag*	bag = new VValueBag;
		ILoggerBagKeys::source.Set( bag, "VRIAServerSupervisor");
		ILoggerBagKeys::level.Set( bag, EML_Warning);
		ILoggerBagKeys::message.Set( bag, inMessage);

		ILoggerBagKeys::job_id.Set( bag, fJobId );
		ILoggerBagKeys::job_state.Set( bag, fState );		
		VProcess::Get()->GetLogger()->LogBag(bag);
		ReleaseRefCountable(&bag);
	}
	return err;
}

#define K_PAUSE_DELAY_MS	(500)
sLONG VRIAServerSupervisor::InnerTaskProc(XBOX::VTask* inTask)
{
	VError	err = VE_OK;
	VRIAServerSupervisor*	lThis = (VRIAServerSupervisor*)inTask->GetKindData();

	lThis->fState = STARTED_STATE;
	while(!inTask->IsDying())
	{
		if (lThis->fState == CONNECTED_STATE)
		{
			VTask::Sleep(K_PAUSE_DELAY_MS);
		}
		else
		{
			VTask::Sleep(K_PAUSE_DELAY_MS);
		}
		lThis->fLock.Lock();
		for( std::vector< const XBOX::VValueBag* >::size_type idx = 0; idx < lThis->fBagsVector.size(); idx ++ )
		{
			VString		msg;
			lThis->fBagsVector[idx]->GetJSONString(msg);
			XBOX::VStringConvertBuffer	buffer( msg, XBOX::VTC_UTF_8);
			err = lThis->fWS->WriteMessage(buffer.GetCPointer(),buffer.GetLength(),true);
			if (err)
			{
			}
			/*msg += "\"jobid\":";
			sLONG				jobId;
			VRIAServerJobState	jobState;
			if (ILoggerBagKeys::job_id.Get( lThis->fBagsVector[idx], jobId ))
			{
				msg.AppendLong(jobId);
				msg += ",\"jobstate\":\"";
				if (ILoggerBagKeys::job_state.Get( lThis->fBagsVector[idx], jobState ))
				{
					switch(jobState)
					{
					case JOB_CREATED_STATE:
						break;
					case JOB_STARTED_STATE:
						break;
					case JOB_COMPLETED_STATE:
						break;
					case JOB_FAILED_STATE:
						break;
					case JOB_UNDEFINED_STATE:
					default:
						msg += "JOB_UNDEFINED_STATE";
						break;
					}
				}
			}*/
			lThis->fBagsVector[idx]->Release();
		}
		lThis->fBagsVector.clear();
		lThis->fLock.Unlock();
		inTask->ExecuteMessages();
	}
	lThis->fState = STOPPED_STATE;
	return 0;
}

VRIAServerSupervisor::VRIAServerSupervisor() :
	fState(STOPPED_STATE),
	fUniqueClientConnexionSemaphore(1),
	fClientCompletedSemaphore(0)
{
	XBOX::VFilePath		resourcesPath;
	XBOX::VFolder		*folder = VRIAServerApplication::Get()->RetainApplicationResourcesFolder();
	resourcesPath = folder->GetPath();
	folder->Release();

	fServer = VRIAServerApplication::Get()->GetComponentHTTP();
	fProject = fServer->NewHTTPServerProject(NULL, resourcesPath.GetPath());
	fWS = fServer->NewHTTPWebsocketServerHandler();
	IHTTPServerProjectSettings*	settings = fProject->GetSettings();
	settings->SetListeningAddress("127.0.0.1");
	settings->SetListeningPort(9222); 
	settings->SetEnableCache(false);
	settings->SetWebFolderPath(resourcesPath);
	//settings->SetWebFolderPath("/tmp");
	fProject->AddHTTPRequestHandler(this);

	if ( testAssert( fProject->StartProcessing() == VE_OK ) )
	{
		VProcess::Get()->GetLogger()->AddLogListener(this);
		fTask = new XBOX::VTask(this, 64000, XBOX::eTaskStylePreemptive, &VRIAServerSupervisor::InnerTaskProc);
		if (fTask)
		{
			fTask->SetKindData((sLONG_PTR)this);
			fTask->Run();
		}
	}
}

VRIAServerSupervisor::~VRIAServerSupervisor()
{
	fProject->StopProcessing();
	fServer->RemoveHTTPServerProject(fProject);
}

VRIAServerSupervisor* VRIAServerSupervisor::Get()
{
	if (!sRIAServerSupervisor)
	{
		sRIAServerSupervisor = new VRIAServerSupervisor();
	}
	return sRIAServerSupervisor;
}

void VRIAServerSupervisor::Put( std::vector< const XBOX::VValueBag* >& inValuesVector )
{
	sLONG	jobId;
	fLock.Lock();
	for( std::vector< const XBOX::VValueBag* >::size_type idx = 0; idx < inValuesVector.size(); idx ++ )
	{
		if ( ILoggerBagKeys::job_id.Get( inValuesVector[idx], jobId ) && ( fJobSet.find(jobId) != fJobSet.end() ) )
		{
			sLONG		jobState;
			inValuesVector[idx]->Retain();
			if ( ILoggerBagKeys::job_state.Get( inValuesVector[idx], jobState ) )
			{
				if ( (jobState == (sLONG)VRIAServerJob::JOB_COMPLETED_STATE) || (jobState == (sLONG)VRIAServerJob::JOB_FAILED_STATE) )
				{
					fJobSet.erase(jobId);
				}
			}
			fBagsVector.insert(fBagsVector.end(),inValuesVector[idx]);
		}
	}
	fLock.Unlock();
}

VRIAServerSupervisor::VRIAServerJob* VRIAServerSupervisor::GetNewJob(bool inSubscribeForEvents)
{
	VRIAServerJob*		newJob = new VRIAServerJob();

	if (inSubscribeForEvents)
	{
		fLock.Lock();
		fJobSet.insert( newJob->GetId() );
		fLock.Unlock();
	}
	return newJob;
}

XBOX::VError VRIAServerSupervisor::GetPatterns(XBOX::VectorOfVString* outPatterns) const
{
	if (NULL == outPatterns)
		return VE_HTTP_INVALID_ARGUMENT;
	outPatterns->clear();
	outPatterns->push_back(K_REMOTE_ADMIN_WS);
	return XBOX::VE_OK;
}

XBOX::VError VRIAServerSupervisor::HandleRequest(IHTTPResponse* ioResponse)
{
	VError	err = VE_OK;
	if (!fUniqueClientConnexionSemaphore.TryToLock())
	{
		DebugMsg("VRIAServerSupervisor::HandleRequest already in use\n"); 
		return VE_UNKNOWN_ERROR;
	}
	VRIAServerSupervisorTreatWSMessage*	msg = new VRIAServerSupervisorTreatWSMessage(ioResponse,this);
	msg->SendTo( fTask );
	if (!msg->fStatus)
	{
		fClientCompletedSemaphore.Lock();
	}
	msg->Release();

	fUniqueClientConnexionSemaphore.Unlock();
	return err;
}

