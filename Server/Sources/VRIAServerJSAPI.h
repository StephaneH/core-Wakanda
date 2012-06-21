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
#ifndef __RIAServer_ServerSideJavaScriptAPI__
#define __RIAServer_ServerSideJavaScriptAPI__


class IHTTPResponse;
class IHTTPHeader;
class IHTTPRequest;
class VRIAServerProject;
class IHTMLForm;
class IHTMLFormPart;
class VRIAServerSolution;
class VRIAServerApplication;



// Classes names constants
extern const char kSSJS_CLASS_NAME_Solution[];
extern const char kSSJS_CLASS_NAME_Application[];
extern const char kSSJS_CLASS_NAME_HTTPServer[];
extern const char kSSJS_CLASS_NAME_SSL[];
extern const char kSSJS_CLASS_NAME_HTTPServerCache[];
extern const char kSSJS_CLASS_NAME_Console[];
extern const char kSSJS_CLASS_NAME_WebAppService[];
extern const char kSSJS_CLASS_NAME_DataService[];
extern const char kSSJS_CLASS_NAME_RPCService[];
extern const char kSSJS_CLASS_NAME_OS[];
extern const char kSSJS_CLASS_NAME_Process[];

// Properties names constants
extern const char kSSJS_PROPERTY_NAME_Solution[];
extern const char kSSJS_PROPERTY_NAME_Application[];
extern const char kSSJS_PROPERTY_NAME_Database[];
extern const char kSSJS_PROPERTY_NAME_DataStore[];
extern const char kSSJS_PROPERTY_NAME_HTTPServer[];
extern const char kSSJS_PROPERTY_NAME_SSL[];
extern const char kSSJS_PROPERTY_NAME_HTTPServerCache[];
extern const char kSSJS_PROPERTY_NAME_Console[];
extern const char kSSJS_PROPERTY_NAME_WebAppService[];
extern const char kSSJS_PROPERTY_NAME_DataService[];
extern const char kSSJS_PROPERTY_NAME_RPCService[];
extern const char kSSJS_PROPERTY_NAME_SessionStorage[];
extern const char kSSJS_PROPERTY_NAME_AddHttpRequestHandler[];
extern const char kSSJS_PROPERTY_NAME_RemoveHttpRequestHandler[];
extern const char kSSJS_PROPERTY_NAME_GetFolder[];
extern const char kSSJS_PROPERTY_NAME_GetSettingFile[];
extern const char kSSJS_PROPERTY_NAME_GetWalibFolder[];
extern const char kSSJS_PROPERTY_NAME_GetItemsWithRole[];
extern const char kSSJS_PROPERTY_NAME_Name[];
extern const char kSSJS_PROPERTY_NAME_Administrator[];
extern const char kSSJS_PROPERTY_NAME_Pattern[];
extern const char kSSJS_PROPERTY_NAME_Storage[];
extern const char kSSJS_PROPERTY_NAME_Settings[];
extern const char kSSJS_PROPERTY_NAME_Type[];
extern const char kSSJS_PROPERTY_NAME_Internal[];
extern const char kSSJS_PROPERTY_NAME_Directory[];
extern const char kSSJS_PROPERTY_NAME_OS[];
extern const char kSSJS_PROPERTY_NAME_Permissions[];
extern const char kSSJS_PROPERTY_NAME_Process[];
extern const char kSSJS_PROPERTY_NAME_RPCCatalog[];
extern const char kSSJS_PROPERTY_NAME_wildchar[];

extern const char kSSJS_PROPERTY_NAME_verifyDataStore[];
extern const char kSSJS_PROPERTY_NAME_repairDataStore[];
extern const char kSSJS_PROPERTY_NAME_compactDataStore[];

extern const char kSSJS_PROPERTY_NAME_setCurrentUser[];
extern const char kSSJS_PROPERTY_NAME_loginByKey[];
extern const char kSSJS_PROPERTY_NAME_loginByPassword[];
extern const char kSSJS_PROPERTY_NAME_currentUser[];
extern const char kSSJS_PROPERTY_NAME_currentSession[];
extern const char kSSJS_PROPERTY_NAME_logout[];

// ----------------------------------------------------------------------------
// Utilities

bool SetHTTPResponseFromJSValue (const XBOX::VJSValue& inValue, IHTTPResponse *ioResponse);


// ----------------------------------------------------------------------------
// JavaScript API


class VJSHTTPRequestHeader : public XBOX::VJSClass<VJSHTTPRequestHeader, IHTTPHeader>
{
public:
	typedef XBOX::VJSClass<VJSHTTPRequestHeader, IHTTPHeader>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPHeader *inHeader);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPHeader *inHeader);
	static	void			GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTTPHeader *inHeader);
	static	bool			SetProperty (XBOX::VJSParms_setProperty& ioParms, IHTTPHeader *inHeader);
	static	void			GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTTPHeader *inHeader);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static void				_GetHeaderValue (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPHeader *inHeader);  // headerValue : getValue(headerName)

private:
	static void				_GetHeaderNameFromPropertyName (const XBOX::VString& inPropertyName, XBOX::VString& outHeaderName);

	static std::map<XBOX::VString, XBOX::VString>	fCommonHeaders;
};


// ----------------------------------------------------------------------------


class VJSHTTPResponseHeader : public XBOX::VJSClass<VJSHTTPResponseHeader, IHTTPHeader>
{
public:
	typedef XBOX::VJSClass<VJSHTTPResponseHeader, IHTTPHeader>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPHeader *inHeader);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPHeader *inHeader);
	static	void			GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTTPHeader *inHeader);
	static	bool			SetProperty (XBOX::VJSParms_setProperty& ioParms, IHTTPHeader *inHeader);
	static	void			GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTTPHeader *inHeader);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static void				_GetHeaderValue (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPHeader *inHeader);  // headerValue : getValue(headerName)
	static void				_SetHeaderValue (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPHeader *inHeader);  // setValue(headerName, headerValue)

private:
	static void				_GetHeaderNameFromPropertyName (const XBOX::VString& inPropertyName, XBOX::VString& outHeaderName);

	static std::map<XBOX::VString, XBOX::VString>	fCommonHeaders;
};


// ----------------------------------------------------------------------------


class VJSHTTPRequest : public XBOX::VJSClass<VJSHTTPRequest, IHTTPRequest>
{
public:
	typedef XBOX::VJSClass<VJSHTTPRequest, IHTTPRequest>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPRequest *inRequest);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPRequest *inRequest);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static	void			_GetURL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetRawURL (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetURLPath (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetURLQuery (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetHost (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetMethod (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetVersion (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetUser (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetPassword (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetRequestLine (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetHeaders (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetBody (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetParts (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
	static	void			_GetContentType (XBOX::VJSParms_getProperty& ioParms, IHTTPRequest *inRequest);
};


// ----------------------------------------------------------------------------


class VJSHTTPResponse : public XBOX::VJSClass<VJSHTTPResponse, IHTTPResponse>
{
public:
	typedef XBOX::VJSClass<VJSHTTPResponse, IHTTPResponse>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, IHTTPResponse *inResponse);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, IHTTPResponse *inResponse);
	static	void			GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTTPResponse *inResponse);
	static	bool			SetProperty (XBOX::VJSParms_setProperty& ioParms, IHTTPResponse *inResponse);
	static	void			GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTTPResponse *inResponse);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static	void			_SendChunkedData (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse);
	static	void			_SetCompression (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse);
	static	void			_SetCacheBodyMessage (XBOX::VJSParms_callStaticFunction& ioParms, IHTTPResponse *inResponse);
};


// ----------------------------------------------------------------------------


class VJSHTMLForm : public XBOX::VJSClass<VJSHTMLForm, IHTMLForm>
{
public:
	typedef XBOX::VJSClass<VJSHTMLForm, IHTMLForm>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, IHTMLForm *inHTMLForm);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, IHTMLForm *inHTMLForm);
	static	void			GetProperty (XBOX::VJSParms_getProperty& ioParms, IHTMLForm *inHTMLForm);
	static	void			GetPropertyNames (XBOX::VJSParms_getPropertyNames& ioParms, IHTMLForm *inHTMLForm);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static	void			_GetCount (XBOX::VJSParms_getProperty& ioParms, IHTMLForm *inHTMLForm);
	static	void			_GetBoundary (XBOX::VJSParms_getProperty& ioParms, IHTMLForm *inHTMLForm);
	static	void			_GetEncoding (XBOX::VJSParms_getProperty& ioParms, IHTMLForm *inHTMLForm);
};


// ----------------------------------------------------------------------------


class VJSHTMLFormPart : public XBOX::VJSClass<VJSHTMLFormPart, IHTMLFormPart>
{
public:
	typedef XBOX::VJSClass<VJSHTMLFormPart, IHTMLFormPart>	inherited;

	static	void			Initialize (const XBOX::VJSParms_initialize& inParms, IHTMLFormPart *inHTMLFormPart);
	static	void			Finalize (const XBOX::VJSParms_finalize& inParms, IHTMLFormPart *inHTMLFormPart);
	static	void			GetDefinition (ClassDefinition& outDefinition);

	static	void			_GetName (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart);
	static	void			_GetFileName (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart);
	static	void			_GetMediaType (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart);
	static	void			_GetSize (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart);
	static	void			_GetBodyAsText (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart);
	static	void			_GetBodyAsPicture (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart);
	static	void			_GetBodyAsBlob (XBOX::VJSParms_getProperty& ioParms, IHTMLFormPart *inHTMLFormPart);

	static	void			_Save (XBOX::VJSParms_callStaticFunction& ioParms, IHTMLFormPart *inHTMLFormPart);
};



// ----------------------------------------------------------------------------



class VJSHTTPServer : public XBOX::VJSClass<VJSHTTPServer, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass<VJSHTTPServer, VRIAServerProject>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Functions
	static	void			_start( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_stop( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);

	// Properties getters
	static	void			_getStarted( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getPort( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getIpAddress( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getHostName( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getDefaultCharSet( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getSSL( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getCache( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
};



// ----------------------------------------------------------------------------



class VJSHTTPServerCache : public XBOX::VJSClass< VJSHTTPServerCache, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass< VJSHTTPServerCache, VRIAServerProject>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Properties getters
	static	void			_getEnabled( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getMemorySize( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
};



// ----------------------------------------------------------------------------



class VJSSSL : public XBOX::VJSClass< VJSSSL, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass< VJSSSL, VRIAServerProject>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Function
	static	void			_getCertificatePath( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);	

	// Properties getters
	static	void			_getEnabled( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getPort( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
};



// ----------------------------------------------------------------------------



class VJSWebAppService : public XBOX::VJSClass<VJSWebAppService, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass<VJSWebAppService, VRIAServerProject>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Functions
	static	void			_enable( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_disable( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getDocumentRootFolder( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);

	// Properties getters
	static	void			_getEnabled( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
	static	void			_getDirectoryIndex( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
};



// ----------------------------------------------------------------------------



class VJSDataService : public XBOX::VJSClass<VJSDataService, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass<VJSDataService, VRIAServerProject>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Functions
	static	void			_enable( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_disable( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);

	// Properties getters
	static	void			_getEnabled( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
};



// ----------------------------------------------------------------------------



class VJSRPCService : public XBOX::VJSClass<VJSRPCService, VRIAServerProject>
{
public:
	typedef XBOX::VJSClass<VJSRPCService, VRIAServerProject>	inherited;

	static	void			Initialize( const XBOX::VJSParms_initialize& inParms, VRIAServerProject* inApplication);
	static	void			Finalize( const XBOX::VJSParms_finalize& inParms, VRIAServerProject* inApplication);
	static	void			GetDefinition( ClassDefinition& outDefinition);

	// Functions
	static	void			_enable( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_disable( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getCatalog( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getCatalogByName( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getCatalogByFile( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);
	static	void			_getMethodFilePath( XBOX::VJSParms_callStaticFunction& ioParms, VRIAServerProject* inApplication);

	// Properties getters
	static	void			_getEnabled( XBOX::VJSParms_getProperty& ioParms, VRIAServerProject* inApplication);
};



// ----------------------------------------------------------------------------


#endif