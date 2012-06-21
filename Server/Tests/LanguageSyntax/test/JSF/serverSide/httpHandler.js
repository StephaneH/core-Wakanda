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
/**
 *
 * How to write and use HTTP incoming request handler functions. 
 *
 * @class HTTP Request Handlers
 * @extends Object
 *
 */
HTMLFormPart = function HTMLFormPart() {
    
    
    /**
     * 
     *
     * @property asBlob
     * @attributes ReadOnly
     * @type BLOB
     */
    this.asBlob =  new BLOB( ); 
    
    /**
     * 
     *
     * @property asPicture
     * @attributes ReadOnly
     * @type Image | Undefined
     */
    this.asPicture =  new Image( ) || new Undefined( ); 
    
    /**
     * 
     *
     * @property asText
     * @attributes ReadOnly
     * @type String | Undefined
     */
    this.asText =  '' || new Undefined( ); 
    
    /**
     * 
     *
     * @property size
     * @attributes ReadOnly
     * @type Number
     */
    this.size =  0; 
    
    /**
     * 
     *
     * @property mediaType
     * @attributes ReadOnly
     * @type String
     */
    this.mediaType =  ''; 
    
    /**
     * returns the name of the uploaded file
     *
     * @property fileName
     * @attributes ReadOnly
     * @type String
     */
    this.fileName =  ''; 
    
    /**
     * 
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    
    /**
     * saves the body of the part in the file whose path is passed in filePath
     *
     * @method save
     * @param {String} filePath
     * @param {Boolean} overWrite
     */
    this.save = function save(filePath, overWrite) {             };
    

};


HTTPResponse = function HTTPResponse() {
    
    
    /**
     * 
     *
     * @property headers
     * @attributes ReadOnly
     * @type HTTPResponseHeader
     */
    this.headers =  new HTTPResponseHeader( ); 
    
    /**
     * 
     *
     * @property contentType
     * @attributes ReadOnly
     * @type String
     */
    this.contentType =  ''; 
    
    /**
     * 
     *
     * @property body
     * @attributes ReadOnly
     * @type BLOB | Image | String
     */
    this.body =  new BLOB( ) || new Image( ) || ''; 
    
    /**
     * 
     *
     * @property statusCode
     * @attributes ReadOnly
     * @type Number
     */
    this.statusCode =  0; 
    
    
    /**
     * sends an HTTPResponse in chunks without knowing in advance the size of the data
     *
     * @method sendChunkedData
     * @param {String | Image | BLOB} data
     */
    this.sendChunkedData = function sendChunkedData(data) {             };
    
    /**
     * indicates if the contents of the HTTPResponse should be cached on the server
     *
     * @method allowCache
     * @param {Boolean} useCache
     */
    this.allowCache = function allowCache(useCache) {             };
    
    /**
     * sets custom compression thresholds for the HTTPResponse
     *
     * @method allowCompression
     * @param {Number} minThreshold
     * @param {Number} maxThreshold
     */
    this.allowCompression = function allowCompression(minThreshold, maxThreshold) {             };
    

};


HTMLForm = function HTMLForm() {
    
    
    /**
     * 
     *
     * @property [n]
     * @attributes ReadOnly
     * @type HTMLFormPart
     */
    this[n] =  new HTMLFormPart( ); 
    
    /**
     * 
     *
     * @property encoding
     * @attributes ReadOnly
     * @type String
     */
    this.encoding =  ''; 
    
    /**
     * 
     *
     * @property count
     * @attributes ReadOnly
     * @type Number
     */
    this.count =  0; 
    
    /**
     * 
     *
     * @property boundary
     * @attributes ReadOnly
     * @type String
     */
    this.boundary =  ''; 
    
    

};


HTTPRequestHeader = function HTTPRequestHeader() {
    
    
    /**
     * 
     *
     * @property USER_AGENT
     * @attributes ReadOnly
     * @type String
     */
    this.USER_AGENT =  ''; 
    
    /**
     * 
     *
     * @property TE
     * @attributes ReadOnly
     * @type String
     */
    this.TE =  ''; 
    
    /**
     * 
     *
     * @property REFERER
     * @attributes ReadOnly
     * @type String
     */
    this.REFERER =  ''; 
    
    /**
     * 
     *
     * @property RANGE
     * @attributes ReadOnly
     * @type String
     */
    this.RANGE =  ''; 
    
    /**
     * 
     *
     * @property PROXY_AUTHORIZATION
     * @attributes ReadOnly
     * @type String
     */
    this.PROXY_AUTHORIZATION =  ''; 
    
    /**
     * 
     *
     * @property PRAGMA
     * @attributes ReadOnly
     * @type String
     */
    this.PRAGMA =  ''; 
    
    /**
     * 
     *
     * @property MAX_FORWARDS
     * @attributes ReadOnly
     * @type String
     */
    this.MAX_FORWARDS =  ''; 
    
    /**
     * 
     *
     * @property KEEP_ALIVE
     * @attributes ReadOnly
     * @type String
     */
    this.KEEP_ALIVE =  ''; 
    
    /**
     * 
     *
     * @property IF_UNMODIFIED_SINCE
     * @attributes ReadOnly
     * @type String
     */
    this.IF_UNMODIFIED_SINCE =  ''; 
    
    /**
     * 
     *
     * @property IF_RANGE
     * @attributes ReadOnly
     * @type String
     */
    this.IF_RANGE =  ''; 
    
    /**
     * 
     *
     * @property IF_NONE_MATCH
     * @attributes ReadOnly
     * @type String
     */
    this.IF_NONE_MATCH =  ''; 
    
    /**
     * 
     *
     * @property IF_MODIFIED_SINCE
     * @attributes ReadOnly
     * @type String
     */
    this.IF_MODIFIED_SINCE =  ''; 
    
    /**
     * 
     *
     * @property IF_MATCH
     * @attributes ReadOnly
     * @type String
     */
    this.IF_MATCH =  ''; 
    
    /**
     * 
     *
     * @property HOST
     * @attributes ReadOnly
     * @type String
     */
    this.HOST =  ''; 
    
    /**
     * 
     *
     * @property FROM
     * @attributes ReadOnly
     * @type String
     */
    this.FROM =  ''; 
    
    /**
     * 
     *
     * @property EXPECT
     * @attributes ReadOnly
     * @type String
     */
    this.EXPECT =  ''; 
    
    /**
     * 
     *
     * @property COOKIE
     * @attributes ReadOnly
     * @type String
     */
    this.COOKIE =  ''; 
    
    /**
     * 
     *
     * @property CONTENT_TYPE
     * @attributes ReadOnly
     * @type String
     */
    this.CONTENT_TYPE =  ''; 
    
    /**
     * 
     *
     * @property CONTENT_LENGTH
     * @attributes ReadOnly
     * @type String
     */
    this.CONTENT_LENGTH =  ''; 
    
    /**
     * 
     *
     * @property CACHE_CONTROL
     * @attributes ReadOnly
     * @type String
     */
    this.CACHE_CONTROL =  ''; 
    
    /**
     * 
     *
     * @property AUTHORIZATION
     * @attributes ReadOnly
     * @type String
     */
    this.AUTHORIZATION =  ''; 
    
    /**
     * 
     *
     * @property ACCEPT_LANGUAGE
     * @attributes ReadOnly
     * @type String
     */
    this.ACCEPT_LANGUAGE =  ''; 
    
    /**
     * 
     *
     * @property ACCEPT_ENCODING
     * @attributes ReadOnly
     * @type String
     */
    this.ACCEPT_ENCODING =  ''; 
    
    /**
     * 
     *
     * @property ACCEPT
     * @attributes ReadOnly
     * @type String
     */
    this.ACCEPT =  ''; 
    
    /**
     * 
     *
     * @property ACCEPT_CHARSET
     * @attributes ReadOnly
     * @type String
     */
    this.ACCEPT_CHARSET =  ''; 
    
    

};


HTTPRequest = function HTTPRequest() {
    
    
    /**
     * 
     *
     * @property parts
     * @attributes ReadOnly
     * @type HTMLForm
     */
    this.parts =  new HTMLForm( ); 
    
    /**
     * 
     *
     * @property contentType
     * @attributes ReadOnly
     * @type String
     */
    this.contentType =  ''; 
    
    /**
     * 
     *
     * @property headers
     * @attributes ReadOnly
     * @type HTTPRequestHeader
     */
    this.headers =  new HTTPRequestHeader( ); 
    
    /**
     * 
     *
     * @property body
     * @attributes ReadOnly
     * @type String | Image | BLOB
     */
    this.body =  '' || new Image( ) || new BLOB( ); 
    
    /**
     * 
     *
     * @property requestLine
     * @attributes ReadOnly
     * @type String
     */
    this.requestLine =  ''; 
    
    /**
     * 
     *
     * @property password
     * @attributes ReadOnly
     * @type String
     */
    this.password =  ''; 
    
    /**
     * 
     *
     * @property user
     * @attributes ReadOnly
     * @type String
     */
    this.user =  ''; 
    
    /**
     * 
     *
     * @property version
     * @attributes ReadOnly
     * @type String
     */
    this.version =  ''; 
    
    /**
     * 
     *
     * @property method
     * @attributes ReadOnly
     * @type String
     */
    this.method =  ''; 
    
    /**
     * 
     *
     * @property host
     * @attributes ReadOnly
     * @type String
     */
    this.host =  ''; 
    
    /**
     * 
     *
     * @property urlQuery
     * @attributes ReadOnly
     * @type String
     */
    this.urlQuery =  ''; 
    
    /**
     * 
     *
     * @property url
     * @attributes ReadOnly
     * @type String
     */
    this.url =  ''; 
    
    /**
     * 
     *
     * @property rawURL
     * @attributes ReadOnly
     * @type String
     */
    this.rawURL =  ''; 
    
    /**
     * 
     *
     * @property urlPath
     * @attributes ReadOnly
     * @type String
     */
    this.urlPath =  ''; 
    
    

};

