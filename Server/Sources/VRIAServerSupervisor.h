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
#ifndef __VRIASERVERSUPERVISOR__H__
#define __VRIASERVERSUPERVISOR__H__

#include "HTTPServer/Interfaces/CHTTPServer.h"
#include "VRIAServerApplication.h"

class VRIAServerSupervisor : public IHTTPRequestHandler, public XBOX::VObject, private XBOX::ILogListener
{
public:

	static	VRIAServerSupervisor*		Get();

	virtual XBOX::VError				GetPatterns(XBOX::VectorOfVString* outPatterns) const;
	virtual XBOX::VError				HandleRequest(IHTTPResponse* ioResponse);

	class VRIAServerJob : public XBOX::VObject, XBOX::IRefCountable
	{
	public:

			typedef enum VRIAServerJobState_enum 
			{
				JOB_UNDEFINED_STATE,
				JOB_CREATED_STATE,
				JOB_STARTED_STATE,
				JOB_COMPLETED_STATE,
				JOB_FAILED_STATE
			} VRIAServerJobState;
			
			sLONG						GetId() { return fJobId; }

			VRIAServerJobState			GetState() {return fState;}

			XBOX::VError				SetState(VRIAServerJobState inNewState, XBOX::VString inMessage);

	private:
		friend class VRIAServerSupervisor;

										VRIAServerJob();
										~VRIAServerJob();

				sLONG									fJobId;
				VRIAServerJobState						fState;
		static	sLONG									sJobID;
		static	XBOX::VCriticalSection					sLock;
	};

			VRIAServerJob*				GetNewJob(bool inSubscribeForEvents=true);

private:
	typedef enum VRIAServerSupervisorState_enum {
		STOPPED_STATE,
		STARTED_STATE,
		CONNECTED_STATE,
	} VRIAServerSupervisorState;
										VRIAServerSupervisor();
	virtual								~VRIAServerSupervisor();

	virtual	void						Put( std::vector< const XBOX::VValueBag* >& inValuesVector );

	static	sLONG						InnerTaskProc(XBOX::VTask* inTask);

			XBOX::VTask*								fTask;
			std::set< sLONG >							fJobSet;
			XBOX::VCriticalSection						fLock;
			std::vector< const XBOX::VValueBag* >		fBagsVector;
			CHTTPServer*								fServer;
			IHTTPServerProject*							fProject;
			IHTTPWebsocketServer*						fWS;
			XBOX::VSemaphore							fUniqueClientConnexionSemaphore;
			XBOX::VSemaphore							fClientCompletedSemaphore;
			VRIAServerSupervisorState					fState;

	static	VRIAServerSupervisor*						sRIAServerSupervisor;


class VRIAServerSupervisorTreatWSMessage : public XBOX::VMessage
{
public:
									VRIAServerSupervisorTreatWSMessage(
										IHTTPResponse*			ioResponse,
										VRIAServerSupervisor*	inSrvSup );

	virtual							~VRIAServerSupervisorTreatWSMessage();

			XBOX::VError			fStatus;

protected:
	virtual void					DoExecute();

private:

	IHTTPResponse*					fResponse;
	VRIAServerSupervisor*			fSrvSup;
};

};

#endif
