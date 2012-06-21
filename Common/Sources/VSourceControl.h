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
#ifndef __VSOURCE_CONTROL__
#define __VSOURCE_CONTROL__

extern "C"
{
	typedef sLONG (*LPSCTEXTOUTPROC) (const char*, uLONG);
}

#if VERSIONWIN
typedef HWND NativeWindowRef;
#else
typedef void* NativeWindowRef;
#endif

class CDB4DBaseContext;
class CDB4DSelection;

#define SCC_4D_ID "4D Source control"
#define SCC_4D_STATUS_FILE  "FOURDPRJ.SCC"

class VSourceControl;

typedef std::map<XBOX::VString,XBOX::VRefPtr<VSourceControl> >	MapOfSourceControl;

#define SC_GET_MAJOR_VER(ver)  (ver >> 16)
#define SC_GET_MINOR_VER(ver)  (ver & 0xffff)


namespace SettingsSourceControl
{
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( name, XBOX::VString, XBOX::VString);	
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( server_path, XBOX::VString, XBOX::VString);	
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( aux_project_path, XBOX::VString, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR( project_name, XBOX::VString, XBOX::VString);
};

enum  SccState 
{
    kSccStateInvalid          = -1L,			// Status could not be obtained, don't rely on it
    kSccStateNotControlled    = 0x00000000L,	// File is not under source control
    kSccStateControlled       = 0x00000001L,	// File is under source code control
    kSccStateCheckedOut       = 0x00000002L,	// Checked out to current user at local path
    kSccStateOutOther         = 0x00000004L,	// File is checked out to another user
    kSccStateOutExclusive     = 0x00000008L,	// File is exclusively check out
    kSccStateOutMultiple      = 0x00000010L,	// File is checked out to multiple people
    kSccStateOutOfdate        = 0x00000020L,	// The file is not the most recent
    kSccStateDeleted          = 0x00000040L,	// File has been deleted from the project
    kSccStateLocked           = 0x00000080L,	// No more versions allowed
    kSccStateMerged           = 0x00000100L,	// File has been merged but not yet fixed/verified
    kSccStateShared           = 0x00000200L,	// File is shared between projects
    kSccStatePinned           = 0x00000400L,	// File is shared to an explicit version
    kSccStateModified         = 0x00000800L,	// File has been modified/broken/violated
    kSccStateOutByUser        = 0x00001000L,	// File is checked out by current user someplace
    kSccStateNoMerge          = 0x00002000L,	// File is never mergeable and need not be saved before a GET
};

enum SccCallbackMessage
{
	// Return codes
	kSccMsgReturnCancel=-1,				// Returned from call-back to indicate cancel
	kSccMsgReturnOk=0,					// Returned from call-back to continue
	// Message types
	kSccMsgInfo=1,						// Message is informational
	kSccMsgWarning,						// Message is a warning
	kSccMsgError,						// Message is an error
	kSccMsgtatus,						// Message is meant for status bar
	// IDE supports Cancel operation
	kSccMsgDocancel,					// No text, IDE returns 0 or SCC_MSG_RTN_CANCEL
	kSccMsg_Startcancel,				// Start a cancel loop
	kSccMsg_Stopcancel,					// Stop the cancel loop

	// Background processing operations
	kSccMsgBackgroundCanceled,			// IDE returns 0 if the operation is not cancelled or SCC_MSG_RTN_CANCEL if it is.
											// Cast first argument to SccMsgDataIsCancelled structure pointer. 
	kSccMsgBackgroundOnBeforeGetFile,	// Called before file file is retrived. Cast first argument to SccMsgDataOnBeforeGetFile structure pointer. 
	kSccMsgBackgroundOnAfterGetFile,	// Called after file was processed. Cast first argument to SccMsgDataOnAfterGetFile structure pointer.
	kSccMsgBackgroundOnMessage			// Called to provide information about background processing. Cast first argument to SccMsgDataOnMessage structure pointer.
};

#define SCC_OK                                  0

#define SCC_E_INITIALIZEFAILED                  -1
#define SCC_E_UNKNOWNPROJECT                    -2
#define SCC_E_COULDNOTCREATEPROJECT             -3
#define SCC_E_NOTCHECKEDOUT                     -4
#define SCC_E_ALREADYCHECKEDOUT                 -5
#define SCC_E_FILEISLOCKED                      -6
#define SCC_E_FILEOUTEXCLUSIVE                  -7
#define SCC_E_ACCESSFAILURE                     -8
#define SCC_E_CHECKINCONFLICT                   -9
#define SCC_E_FILEALREADYEXISTS                 -10
#define SCC_E_FILENOTCONTROLLED                 -11
#define SCC_E_FILEISCHECKEDOUT                  -12
#define SCC_E_NOSPECIFIEDVERSION                -13
#define SCC_E_OPNOTSUPPORTED                    -14
#define SCC_E_NONSPECIFICERROR                  -15
#define SCC_E_OPNOTPERFORMED                    -16
#define SCC_E_TYPENOTSUPPORTED                  -17
#define SCC_E_VERIFYMERGE                       -18
#define SCC_E_FIXMERGE                          -19
#define SCC_E_SHELLFAILURE                      -20
#define SCC_E_INVALIDUSER                       -21
#define SCC_E_PROJECTALREADYOPEN                -22
#define SCC_E_PROJSYNTAXERR                     -23
#define SCC_E_INVALIDFILEPATH                   -24
#define SCC_E_PROJNOTOPEN                       -25
#define SCC_E_NOTAUTHORIZED                     -26
#define SCC_E_FILESYNTAXERR                     -27
#define SCC_E_FILENOTEXIST                      -28
#define SCC_E_CONNECTIONFAILURE                 -29
#define SCC_E_UNKNOWNERROR                      -30
#define SCC_E_BACKGROUNDGETINPROGRESS           -31


enum SccSupportedCommandFlag
{
	kSccRemoveCapability =            0x00000001L,   // Supports the SCC_Remove command
	kSccRenameCapability =            0x00000002L,   // Supports the SCC_Rename command
	kSccDiffCapability =              0x00000004L,   // Supports the SCC_Diff command
	kSccHistoryCapability =           0x00000008L,   // Supports the SCC_History command
	kSccPropertiesCapability =        0x00000010L,   // Supports the SCC_Properties command
	kSccRunsccCapability =            0x00000020L,   // Supports the SCC_RunScc command
	kSccGetcommandoptionsCapability = 0x00000040L,   // Supports the SCC_GetCommandOptions command
	kSccQueryinfoCapability =         0x00000080L,   // Supports the SCC_QueryInfo command
	kSccGeteventsCapability =         0x00000100L,   // Supports the SCC_GetEvents command
	kSccGetprojpathCapability =       0x00000200L,   // Supports the SCC_GetProjPath command
	kSccAddfromsccCapability =        0x00000400L,   // Supports the SCC_AddFromScc command
	kSccCommentcheckoutCapability =   0x00000800L,   // Supports a comment on Checkout
	kSccCommentcheckinCapability =    0x00001000L,   // Supports a comment on Checkin
	kSccCommentaddCapability =        0x00002000L,   // Supports a comment on Add
	kSCCCommentremoveCapability =     0x00004000L,   // Supports a comment on Remove
	kSccTextoutCapability =           0x00008000L,   // Writes text to an IDE-provided output function
	kSccCreatesubprojectCapability =  0x00010000L,   // Supports the SccCreateSubProject command
	kSccGEetparentprojectCapability = 0x00020000L,   // Supports the SccGetParentProjectPath command
	kSccBatchCapability =             0x00040000L,   // Supports the SccBeginBatch and SccEndBatch commands
	kSccDirectorystatusCapability =   0x00080000L,   // Supports the querying of directory status
	kSccDirectorydiffCapability =     0x00100000L,   // Supports differencing on directories
	kSccAddstorelatestCapability =	  0x00200000L,   // Supports storing files without deltas
	kSccHistorymultifileCapability =  0x00400000L,   // Multiple file history is supported
	kSccIgnorcaseCapability =         0x00800000L,   // Supports case insensitive file comparison
	kSccIgnorespaceCapability =       0x01000000L,   // Supports file comparison that ignores white space
	kSccPopulatelistCapability =      0x02000000L,   // Supports finding extra files
	kSccCommentprojectCapability =    0x04000000L,   // Supports comments on create project
	kSccMulticheckoutCapability =     0x08000000L,   // Supports multiple checkouts on a file
													//   (subject to administrator override)
	kSccDiffalwaysCapability =        0x10000000L,   // Supports diff in all states if under control
	kSccGetNOUICapability =           0x20000000L,	// Provider doesn't support a UI for SccGet,
													//   but IDE may still call SccGet function.
	kSccReentrantCapability =		  0x40000000L,	// Provider is reentrant and thread safe.
	kSccSccfileCapability =           0x80000000L,   // Supports the MSSCCPRJ.SCC file
};											//   (subject to user/administrator override)

/****************************************************************************
    Add flags
****************************************************************************/
#define SCC_ADD_STORELATEST     0x04	// Store only the latest version of the file(s).
#define SCC_FILETYPE_AUTO       0x00	// Auto-detect type of the file(s).
/****************************************************************************
 Keep checked out
 ****************************************************************************/
#define SCC_KEEP_CHECKEDOUT     0x1000

// The following flags are mutually exculsive.
#define SCC_FILETYPE_TEXT       0x01	// Obsolete. Use SCC_FILETYPE_TEXT_ANSI instead.
#define SCC_FILETYPE_BINARY     0x02	// Treat the file(s) as binary.
#define SCC_FILETYPE_TEXT_ANSI  0x08	// Treat the file(s) as ANSI.
#define SCC_FILETYPE_UTF8       0x10	// Treat the file(s) as Unicode in UTF8 format.
#define SCC_FILETYPE_UTF16LE    0x20	// Treat the file(s) as Unicode in UTF16 Little Endian format.
#define SCC_FILETYPE_UTF16BE    0x40	// Treat the file(s) as Unicode in UTF16 Big Endian format.

/****************************************************************************
 Following strings are the keys for accessing the registry to find
 the SCC provider.
 ****************************************************************************/
#define SCC_PROJECTNAME_KEY             "SCC_Project_Name"
#define SCC_PROJECTAUX_KEY              "SCC_Aux_Path"
#define SCC_STATUS_FILE                 "MSSCCPRJ.SCC"
#define SCC_KEY                         "SCC"
#define SCC_FILE_SIGNATURE              "This is a source code control file"

typedef sLONG	ESCCStatus;
typedef void*	SCCContext;
typedef void*	SCCCMDOPTS;
typedef sLONG	SCCERROR;

enum  SCCCOMMAND 
{
	SCC_COMMAND_GET,
	SCC_COMMAND_CHECKOUT,
	SCC_COMMAND_CHECKIN,
	SCC_COMMAND_UNCHECKOUT,
  	SCC_COMMAND_ADD,
	SCC_COMMAND_REMOVE,
	SCC_COMMAND_DIFF,
	SCC_COMMAND_HISTORY,
	SCC_COMMAND_RENAME,
	SCC_COMMAND_PROPERTIES,
	SCC_COMMAND_OPTIONS
};


#define SCC_ONEDITACTION_PROMPT		1
#define SCC_ONEDITACTION_AUTO		2	
#define SCC_ONEDITACTION_NOTHING	3	
#define SCC_ONSAVEACTION_PROMPT		1
#define SCC_ONSAVEACTION_AUTO		2	
#define SCC_ONSAVEACTION_SAVEAS		3


class ISourceControl : public XBOX::IRefCountable
{
public:
	virtual bool Connect(const XBOX::VString& inLocalPath,LPSCTEXTOUTPROC lpTextOutProc = NULL) = 0;
	virtual void Deconnect() = 0;
	virtual bool Add(const std::vector<XBOX::VFilePath>& inFilesFullPath, std::vector<sLONG>& inFilesType) = 0;
	virtual bool Get(const std::vector<XBOX::VFilePath>& inFilesFullPath) = 0;
	virtual bool AddToSourceControl(const std::vector<XBOX::VFilePath>& inFilesFullPath, std::vector<sLONG>& inFilesType) = 0;
	virtual bool GetLatestVersion(const std::vector<XBOX::VFilePath>& inFilesFullPath) = 0;
	virtual bool CheckOut(const std::vector<XBOX::VFilePath>& inFilesFullPath, bool inEdit = false) = 0;
	virtual bool CheckIn(const std::vector<XBOX::VFilePath>& inFilesFullPath) = 0;
	virtual bool Revert(const std::vector<XBOX::VFilePath>& inFilesFullPath) = 0;
	virtual bool QueryInfo(const std::vector<XBOX::VFilePath>& inTabFile, std::vector<ESCCStatus>& ioTabInfo) = 0;
};

class ISourceControlManager : public XBOX::IRefCountable
{
public:
	virtual ISourceControl* RetainSourceControl(XBOX::VString& inID) = 0;
};

class ISourceControlConnector
{
public:
	virtual bool ConnectToSourceControl(XBOX::VString& inSourceControlId, bool inVirtualConnection = false) = 0;
	virtual ISourceControl*	GetSourceControl() const = 0;
	virtual void SetSourceControlID(XBOX::VString& inSourceControlID) = 0;
	virtual XBOX::VString GetSourceControlID() const = 0;
	virtual bool IsConnectedToSourceControl() const = 0;
	virtual class ISourceControlInterface* GetSCCInterfaceForCodeEditor() = 0;
};

class VSourceControlManager : public XBOX::VObject, public ISourceControlManager
{
public:
			VSourceControlManager();
	virtual	~VSourceControlManager();

	ISourceControl* RetainSourceControl(XBOX::VString& inID);
	void ForceDeconnectAllSourceControl();

	void GetArraySourceControlID(std::vector<XBOX::VString>& outTabSCId);
protected:
	MapOfSourceControl	fTabscc;
};

class VSourceControl : public XBOX::VObject, public ISourceControl
{
public:	
	virtual	~VSourceControl();

	bool AddToSourceControl(const std::vector<XBOX::VFilePath>& inFilesFullPath, std::vector<sLONG>& inFilesType) {return true;}
	bool GetLatestVersion(const std::vector<XBOX::VFilePath>& inFilesFullPath) {return true;}
	
	bool CheckOut(const XBOX::VFilePath& inFileFullPath, bool inEdit = false);
	bool CheckOut(const std::vector<XBOX::VFilePath>& inFilesFullPath, bool inEdit = false);
	bool Add(const XBOX::VFilePath& inFileFullPath, sLONG& inFileType);
	bool Add(const std::vector<XBOX::VFilePath>& inFilesFullPath, std::vector<sLONG>& inFilesType);
	bool Get(const XBOX::VFilePath& inFileFullPath);
	bool Get(const std::vector<XBOX::VFilePath>& inFilesFullPath);
	bool CheckIn(const XBOX::VFilePath& inFileFullPath);
	bool CheckIn(const std::vector<XBOX::VFilePath>& inFilesFullPath);
	bool QueryInfo(const XBOX::VFilePath& inFile, ESCCStatus& ioInfo );//info is a combination of SccState
	bool QueryInfo(const std::vector<XBOX::VFilePath>& inTabFile, std::vector<ESCCStatus>& ioTabInfo );//info is a combination of SccStatus
	bool Revert(const XBOX::VFilePath& inFileFullPath);
	bool Revert(const std::vector<XBOX::VFilePath>& inFilesFullPath);
	bool Remove(const XBOX::VFilePath& inFileFullPath);
	bool Remove(const std::vector<XBOX::VFilePath>& inFilesFullPath);
	bool RenameOrMove(const XBOX::VFilePath& inFileFullPath,const XBOX::VFilePath& inNewFileFullPath);
	bool RenameOrMove(const std::vector<XBOX::VFilePath>& inFilesFullPath, const std::vector<XBOX::VFilePath>& inNewFilesFullPath);
	bool Connect(const XBOX::VString& inLocalPath,LPSCTEXTOUTPROC lpTextOutProc = NULL);
	void Deconnect();

	sLONG GetCapability(){return fSccCaps;};//le resultat est une combinaison de SccSupportedCommandFlag. Ce flag est à 0 avant le connect. C'est just apres l appel du connect qu'il est initialiser et il est remis à 0 apres le deconnect.
protected:
	VSourceControl(XBOX::VString &inSccName, XBOX::VFilePath &inSccDllPath);
	VSourceControl(VSourceControl* inSourceControl);

	//
	void SetSccConnexionInfoToFileProject( XBOX::VPreferences *inPreferences, const XBOX::VString& inProjname, const XBOX::VString& inAuxProjPath);
	bool GetSccConnexionInfoFromFileProject( XBOX::VPreferences *inPreferences, XBOX::VString& outProjname, XBOX::VString& outAuxProjPath);
	
	//void SaveSccPrefs();
	void LoadSccPrefs();
	void _initPref();

	//
	virtual void _LoadLibrary() = 0;
	virtual void _FreeLibrary() = 0;

	virtual sLONG GetVersion() = 0;
	virtual SCCERROR Uninitialize(SCCContext pContext) = 0;
	virtual SCCERROR Initialize(SCCContext* ppvContext, NativeWindowRef hWnd, const XBOX::VString&  lpCallerName, XBOX::VString&   lpSccName, sLONG&  lpSccCaps, XBOX::VString&   lpAuxPathLabel, sLONG&  pnCheckoutCommentLen, sLONG&  pnCommentLen) = 0;
	virtual SCCERROR OpenProject(SCCContext pvContext, NativeWindowRef hWnd, XBOX::VString& lpUser,const XBOX::VString& lpProjName,const XBOX::VString& lpLocalProjPath,XBOX::VString& lpAuxProjPath,XBOX::VString& lpComment,LPSCTEXTOUTPROC lpTextOutProc,sLONG dwFlags) = 0;
	virtual SCCERROR CloseProject (SCCContext pvContext) = 0;
	virtual SCCERROR GetProjPath (SCCContext pvContext,NativeWindowRef hWnd,XBOX::VString&  lpUser,XBOX::VString&  lpProjName,XBOX::VString&  lpLocalPath,XBOX::VString&  lpAuxProjPath,bool   bAllowChangePath,bool* pbNew) = 0;
	virtual SCCERROR WillCreateSccFile (SCCContext  pContext,const std::vector<XBOX::VFilePath>& lpFileNames,std::vector<bool>&  pbSccFiles) = 0;
	virtual SCCERROR Checkout (SCCContext    pvContext,NativeWindowRef hWnd,const std::vector<XBOX::VFilePath>&   lpFileNames,const XBOX::VString&    lpComment,sLONG      fOptions,SCCCMDOPTS pvOptions) = 0;
	virtual SCCERROR Checkin (SCCContext    pvContext,NativeWindowRef hWnd,const std::vector<XBOX::VFilePath>&    lpFileNames,const XBOX::VString& lpComment,sLONG      fOptions,SCCCMDOPTS pvOptions) = 0;
	virtual SCCERROR Add(SCCContext    pvContext,NativeWindowRef hWnd,const std::vector<XBOX::VFilePath>&   lpFileNames,const XBOX::VString&    lpComment,std::vector<sLONG>&     pfOptions,SCCCMDOPTS pvOptions) = 0;
	virtual SCCERROR Get(SCCContext    pvContext,NativeWindowRef hWnd,const std::vector<XBOX::VFilePath>&   lpFileNames,sLONG      fOptions,SCCCMDOPTS pvOptions) = 0;
	virtual SCCERROR GetCommandOptions (SCCContext pvContext,NativeWindowRef hWnd,SCCCOMMAND iCommand,SCCCMDOPTS* ppvOptions) = 0;
	virtual SCCERROR QueryInfo (SCCContext  pvContext, const std::vector<XBOX::VFilePath>& lpFileNames, std::vector<sLONG>&  lpStatus) = 0;
	virtual SCCERROR Revert(SCCContext    pvContext,NativeWindowRef hWnd,const std::vector<XBOX::VFilePath>&   lpFileNames,const XBOX::VString&    lpComment,sLONG      fOptions,SCCCMDOPTS pvOptions) = 0;
	virtual SCCERROR Remove(SCCContext    pvContext,NativeWindowRef hWnd,const std::vector<XBOX::VFilePath>&   lpFileNames,const XBOX::VString&    lpComment,sLONG      fOptions,SCCCMDOPTS pvOptions) = 0;
	virtual SCCERROR RenameOrMove(SCCContext    pvContext,NativeWindowRef hWnd,const std::vector<XBOX::VFilePath>&   lpFileNames, const std::vector<XBOX::VFilePath>&   lpNewFileNames,const XBOX::VString&    lpComment,sLONG      fOptions,SCCCMDOPTS pvOptions) = 0;

	friend class VSourceControlManager;

	SCCContext	fContext;
	XBOX::VString	fsccName;
	XBOX::VString	fAuxlabel;
	sLONG	fSccCaps, fCheckoutCommentLen, fCommentLen;
	XBOX::VString	fUser;
	XBOX::VString fSccRegName;
	XBOX::VString fSccDllPath;
	XBOX::VString fLocalPath;

	//prefs
	bool	fGetEverything;
	bool	fCheckinEverything;
	bool	fDontShowCheckoutDialog;
	bool	fDontShowCheckinDialog;
	
	sLONG	fOnEditAction;
	sLONG	fOnSaveAction;
};

#endif