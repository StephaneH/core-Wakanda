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


class VRIAServerJob : public XBOX::VObject, public XBOX::IRefCountable
{
public:
		
		typedef enum VRIAServerJobState_enum 
		{
			JOB_CREATED_STATE,
			JOB_TERMINATED_STATE
			/*JOB_UNDEFINED_STATE,
			JOB_CREATED_STATE,
			JOB_STARTED_STATE,
			JOB_COMPLETED_STATE,
			JOB_FAILED_STATE*/
		} VRIAServerJobState;
		
		XBOX::VString const						GetId() const { return fJobId; } 

		VRIAServerJobState						GetState() const {return fState;}

		void									Log( const XBOX::VString& inMessage ) const;

private:
	friend	class VRIAServerSupervisor;

												VRIAServerJob(const XBOX::VString& inJobId);
												~VRIAServerJob();

			XBOX::VString						fJobId;
			VRIAServerJobState					fState;

};


class VRIAServerSupervisor : public IHTTPRequestHandler, public XBOX::VObject, private XBOX::ILogListener
{
public:

	static	bool								Init();
	static	void								DeInit();
	static	VRIAServerSupervisor*				Get();

			XBOX::VError						Attach( IHTTPServerProject *inHTTPServerProject);
			XBOX::VError						Detach( IHTTPServerProject *inHTTPServerProject);

			VRIAServerJob*						RetainJob(const XBOX::VString& inJobId, bool inSubscribeForEvents=true);

			XBOX::VError						TerminateJob( const XBOX::VString& inJobId, const XBOX::VString& inMessage );

			void								RetainJobs( std::vector< XBOX::VRefPtr< VRIAServerJob > >& outJobs) const;

private:

												VRIAServerSupervisor();
	virtual										~VRIAServerSupervisor();
	
	// from IHTTPRequestHandler
	virtual XBOX::VError						GetPatterns(XBOX::VectorOfVString* outPatterns) const;
	virtual XBOX::VError						HandleRequest(IHTTPResponse* ioResponse);

	// from ILogListener
	virtual	void								Put( std::vector< const XBOX::VValueBag* >& inValuesVector );

	mutable XBOX::VCriticalSection									fLock;
			std::map< const XBOX::VString, VRIAServerJob* >			fJobMap;

	typedef std::vector< const XBOX::VValueBag* > VectorOfBags;
	class VRIAServerSupervisorClient : public XBOX::VObject
	{
	public:
														VRIAServerSupervisorClient();
				void									Start(IHTTPWebsocketServer* inWS);
				void									Stop();
				bool									IsStarted();
				VectorOfBags							fBagsVector;
	private:
		
		class VStartMessage : public XBOX::VMessage
		{
		public:
			VStartMessage(VRIAServerSupervisorClient* inClient, IHTTPWebsocketServer* inWS) : fClient(inClient), fWS(inWS) {;}
		private:
					void								DoExecute();
			VRIAServerSupervisorClient*					fClient;
			IHTTPWebsocketServer*						fWS;
		};

		class VStopMessage : public XBOX::VMessage
		{
		public:
			VStopMessage(VRIAServerSupervisorClient* inClient) : fClient(inClient) {;}
		private:
					void								DoExecute();
			VRIAServerSupervisorClient*					fClient;
		};

		virtual												~VRIAServerSupervisorClient();

				bool										fStarted;
				bool										fExitTask;
				IHTTPWebsocketServer*						fWS;
				XBOX::VTask*								fTask;
				static	sLONG								InnerTaskProc(XBOX::VTask* inTask);
	};

			std::set< VRIAServerSupervisorClient* >					fClientSet;

			XBOX::VCriticalSection									fClientSetLock;
	//static	XBOX::VCriticalSection									sClientSetLock;
			
	static	VRIAServerSupervisor*									sRIAServerSupervisor;

	static	sLONG													sJobID;
		

};

#endif
