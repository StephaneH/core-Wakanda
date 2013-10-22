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


#define K_BUFFER_MAX_SIZE					(4096)

const XBOX::VString							K_REMOTE_ADMIN_WS("/remote_admin_ws");

VRIAServerSupervisor*						VRIAServerSupervisor::sRIAServerSupervisor = NULL;
sLONG										VRIAServerSupervisor::sJobID = 1;



VRIAServerJob::VRIAServerJob(const VString& inJobId) : fState(JOB_CREATED_STATE)
{
	if (testAssert(inJobId.GetLength() > 0))
	{
		fJobId = inJobId;
	}
	else
	{
		fJobId = "__BAD_JOB_ID";
	}
}

VRIAServerJob::~VRIAServerJob()
{
}

VRIAServerJob* VRIAServerSupervisor::RetainJob(const XBOX::VString& inJobId, bool inSubscribeForEvents)
{
	VRIAServerJob*	newJob = NULL;
	
	fLock.Lock();
	
	if (inJobId.GetLength() > 0)
	{
		std::map< const XBOX::VString, VRIAServerJob* >::const_iterator		itJob = fJobMap.find(inJobId);
		if (itJob != fJobMap.end())
		{
			newJob = (*itJob).second;
			newJob->Retain();
		}
	}
	if (!newJob)
	{
		VString		newJobId;
		newJobId.AppendLong(sJobID++);
		newJob = new VRIAServerJob(newJobId);

		if (newJob && inSubscribeForEvents)
		{
			newJob->Retain();
			fJobMap.insert( std::pair< const XBOX::VString, VRIAServerJob*>( newJob->GetId(), newJob ) );
			newJob->Log( " created " );
		}
	}

	fLock.Unlock();

	return newJob;
}


void VRIAServerJob::Log( const XBOX::VString& inMessage ) const
{

	VValueBag*	bag = new VValueBag;
	ILoggerBagKeys::source.Set( bag, "VRIAServerSupervisor");
	ILoggerBagKeys::level.Set( bag, EML_Warning);
	ILoggerBagKeys::message.Set( bag, inMessage);

	ILoggerBagKeys::job_id.Set( bag, fJobId );
	ILoggerBagKeys::job_state.Set( bag, fState );		
	VProcess::Get()->GetLogger()->LogBag(bag);
	ReleaseRefCountable(&bag);
}


XBOX::VError VRIAServerSupervisor::TerminateJob(const XBOX::VString& inJobId, const XBOX::VString& inMessage )
{
	VError				err = VE_INVALID_PARAMETER;
	VRIAServerJob*		job = NULL;

	fLock.Lock();

	std::map< const XBOX::VString, VRIAServerJob* >::const_iterator		itJob = fJobMap.find(inJobId);
	
	if (itJob != fJobMap.end())
	{
		if ( (*itJob).second->fState == VRIAServerJob::JOB_CREATED_STATE)
		{
			err = VE_OK;

			(*itJob).second->fState = VRIAServerJob::JOB_TERMINATED_STATE;

			job = (*itJob).second;
			fJobMap.erase(itJob->first);

		}
	}

	fLock.Unlock();

	if (!err)
	{
		job->Log( inMessage );
		job->Release();
	}
	return err;
}

#define K_PAUSE_DELAY_MS	(500)


VRIAServerSupervisor::VRIAServerSupervisor()
{
}

VRIAServerSupervisor::~VRIAServerSupervisor()
{
}

bool VRIAServerSupervisor::Init()
{
	if (sRIAServerSupervisor == NULL)
	{
		sRIAServerSupervisor = new VRIAServerSupervisor();
		VProcess::Get()->GetLogger()->AddLogListener( sRIAServerSupervisor);
	}
	return (sRIAServerSupervisor != NULL);
}

void VRIAServerSupervisor::DeInit()
{
	if (sRIAServerSupervisor != NULL)
	{
		VProcess::Get()->GetLogger()->RemoveLogListener( sRIAServerSupervisor);
		sRIAServerSupervisor->fClientSetLock.Lock();
		for(	std::set< VRIAServerSupervisorClient* >::iterator itClient = sRIAServerSupervisor->fClientSet.begin();
				(itClient != sRIAServerSupervisor->fClientSet.end());
				itClient++ )
		{
			(*itClient)->Stop();
		}
		sRIAServerSupervisor->fClientSetLock.Unlock();
		delete sRIAServerSupervisor;
		sRIAServerSupervisor = NULL;
	}
}

VRIAServerSupervisor* VRIAServerSupervisor::Get()
{
	if (!sRIAServerSupervisor)
	{
		sRIAServerSupervisor = new VRIAServerSupervisor();
	}
	return sRIAServerSupervisor;
}

VError VRIAServerSupervisor::Attach( IHTTPServerProject *inHTTPServerProject)
{
	VError err = VE_OK;

	if (inHTTPServerProject != NULL)
	{
		err = inHTTPServerProject->AddHTTPRequestHandler( this);
	}
	else
	{
		err = VE_INVALID_PARAMETER;
	}

	return err;
}

VError VRIAServerSupervisor::Detach( IHTTPServerProject *inHTTPServerProject)
{
	VError err = VE_OK;

	if (inHTTPServerProject != NULL)
	{
		err = inHTTPServerProject->RemoveHTTPRequestHandler( this);
	}
	else
	{
		err = VE_INVALID_PARAMETER;
	}

	return err;
}

void VRIAServerSupervisor::Put( std::vector< const XBOX::VValueBag* >& inValuesVector )
{

	fClientSetLock.Lock();

	// jobs are only treated if somebody's connected
	if (fClientSet.size() > 0)
	{
		for( std::vector< const XBOX::VValueBag* >::size_type idx = 0; idx < inValuesVector.size(); idx++ )
		{
			VString		jobId;
			if ( ILoggerBagKeys::job_id.Get( inValuesVector[idx], jobId ) )
			{

				for( std::set< VRIAServerSupervisorClient* >::iterator itClient = fClientSet.begin(); (itClient != fClientSet.end()); itClient++ )
				{
					if ((*itClient)->IsStarted())
					{
						inValuesVector[idx]->Retain();
						(*itClient)->fBagsVector.push_back(inValuesVector[idx]);
					}
				}

			}
		}
	}

	fClientSetLock.Unlock();
}




void VRIAServerSupervisor::RetainJobs( std::vector< VRefPtr< VRIAServerJob > >& outJobs ) const
{

	fLock.Lock();

	std::map< const XBOX::VString, VRIAServerJob* >::const_iterator		itJob = fJobMap.begin();
	while( itJob != fJobMap.end() )
	{
		outJobs.push_back( VRefPtr< VRIAServerJob >( (*itJob).second ) );
		itJob++;
	}

	fLock.Unlock();

}

XBOX::VError VRIAServerSupervisor::GetPatterns(XBOX::VectorOfVString* outPatterns) const
{
	if (NULL == outPatterns)
		return VE_HTTP_INVALID_ARGUMENT;
	outPatterns->clear();
	outPatterns->push_back(K_REMOTE_ADMIN_WS);
	return XBOX::VE_OK;
}

sLONG VRIAServerSupervisor::VRIAServerSupervisorClient::InnerTaskProc(XBOX::VTask* inTask)
{
	VRIAServerSupervisorClient*		l_this = (VRIAServerSupervisorClient*)inTask->GetKindData();
	VTask*							curtTask = VTask::GetCurrent();
	sBYTE*							tmpData = new sBYTE[K_BUFFER_MAX_SIZE];
	VectorOfBags					tmpBags;

#if 1
start:
	VError err = VE_OK;

	while (!l_this->fStarted)
	{
		if (curtTask->IsDying())
		{
			l_this->fExitTask = true;
			break;
		}
		curtTask->ExecuteMessagesWithTimeout(K_PAUSE_DELAY_MS);
	}

	while(!err && !l_this->fExitTask)
	{
		if (curtTask->IsDying())
		{
			l_this->fExitTask = true;
			break;
		}

		VSize	msgLen = K_BUFFER_MAX_SIZE;
		bool	isTerminated = false;
		while (!isTerminated)
		{
			err = l_this->fWS->ReadMessage(tmpData,msgLen,isTerminated);
			if (err)
			{
				break;
			}
			xbox_assert(isTerminated); // TBC for framed msgs
			msgLen = K_BUFFER_MAX_SIZE;
		}

		sRIAServerSupervisor->fClientSetLock.Lock();
		for( VectorOfBags::size_type idx = 0; idx < l_this->fBagsVector.size(); idx ++ )
		{
			tmpBags.push_back(l_this->fBagsVector[idx]);
		}
		l_this->fBagsVector.clear();
		sRIAServerSupervisor->fClientSetLock.Unlock();
		
		for( VectorOfBags::size_type idx = 0; idx < tmpBags.size(); idx ++ )
		{
			if ( !err )
			{
				VString		msg;
				tmpBags[idx]->GetJSONString(msg);
				XBOX::VStringConvertBuffer	buffer( msg, XBOX::VTC_UTF_8);
				err = l_this->fWS->WriteMessage(buffer.GetCPointer(),buffer.GetLength(),true);
				/*if (err)
				{
					l_this->fWS->Close(); 
				}*/
			}
			tmpBags[idx]->Release();
		}
		tmpBags.clear();

		//if (!err)
		{
			curtTask->ExecuteMessagesWithTimeout(K_PAUSE_DELAY_MS);
		}
	}

	if (l_this->fWS != NULL)
	{
		l_this->fWS->Close();
		delete l_this->fWS;
		l_this->fWS = NULL;
	}

	l_this->fStarted = false;
	if (!l_this->fExitTask)
	{
		goto start;
	}

#endif
	delete tmpData;
	return 0;
}

VRIAServerSupervisor::VRIAServerSupervisorClient::VRIAServerSupervisorClient() : fWS(NULL)
{
	fStarted = false;
	fExitTask = false;
	fTask = new XBOX::VTask(this, 64000, XBOX::eTaskStylePreemptive, &VRIAServerSupervisorClient::InnerTaskProc);

	fTask->SetName("RIAServerSupervisor");
	fTask->SetKindData((sLONG_PTR)this);
	fTask->Run();
}

VRIAServerSupervisor::VRIAServerSupervisorClient::~VRIAServerSupervisorClient()
{
}


void VRIAServerSupervisor::VRIAServerSupervisorClient::Start(IHTTPWebsocketServer* inWS)
{
	VStartMessage*	startMsg = new VStartMessage(this,inWS);
	startMsg->SendTo( fTask );
	ReleaseRefCountable(&startMsg);
}

void VRIAServerSupervisor::VRIAServerSupervisorClient::VStartMessage::DoExecute()
{
	if (!fClient->IsStarted())
	{
		fClient->fWS = fWS;
		//fClient->fBagsVector.clear();
		fClient->fStarted = true;
	}
}


bool VRIAServerSupervisor::VRIAServerSupervisorClient::IsStarted()
{
	return fStarted;
}

void VRIAServerSupervisor::VRIAServerSupervisorClient::Stop()
{
	VStopMessage*	stopMsg = new VStopMessage(this);
	stopMsg->SendTo( fTask );
	ReleaseRefCountable(&stopMsg);
}

void VRIAServerSupervisor::VRIAServerSupervisorClient::VStopMessage::DoExecute()
{
	fClient->fExitTask = true;
}


XBOX::VError VRIAServerSupervisor::HandleRequest(IHTTPResponse* ioResponse)
{
	VError err = VE_OK;

	CHTTPServer *httpServer = VRIAServerApplication::Get()->GetComponentHTTP();
	if (testAssert(httpServer != NULL))
	{
		IHTTPWebsocketServer *webSocket = httpServer->NewHTTPWebsocketServerHandler();
		if (testAssert(webSocket != NULL))
		{
			err = webSocket->TreatNewConnection(ioResponse,true);
			if (!err)
			{
				fClientSetLock.Lock();
				for( std::set< VRIAServerSupervisorClient* >::iterator itClient = fClientSet.begin(); (itClient != fClientSet.end()); itClient++ )
				{
					if (!(*itClient)->IsStarted())
					{
						(*itClient)->Start(webSocket);
						webSocket = NULL;
						break;
					}
				}
				if (webSocket)
				{
					VRIAServerSupervisorClient*		newClt = new VRIAServerSupervisorClient();
					if (newClt)
					{
						fClientSet.insert( newClt );
						newClt->Start(webSocket);
					}
				}
				fClientSetLock.Unlock();
			}
		}
		else
		{
			err = VE_UNKNOWN_ERROR;
		}
	}
	else
	{
		err = vThrowError( VE_RIA_HTTP_SERVER_NOT_FOUND);
	}

	return err;
}

