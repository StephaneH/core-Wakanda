/**
 *
 * Functions and methods at the global application level of Wakanda Server.
 *
 * @class Global Application
 * @extends Object
 *
 */
Solution = function Solution() {
    
    
    /**
     * 
     *
     * @property recentlyOpened
     * @attributes ReadOnly
     * @type Array
     */
    this.recentlyOpened =  []; 
    
    /**
     * 
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    /**
     * 
     *
     * @property applications
     * @attributes ReadOnly
     * @type Array
     */
    this.applications =  []; 
    
    
    /**
     * quits Wakanda Server
     *
     * @method quitServer
     */
    this.quitServer = function quitServer() {             };
    
    /**
     * opens the solution whose name you pass in the solutionName parameter
     *
     * @method openRecent
     * @param {String} solutionName
     */
    this.openRecent = function openRecent(solutionName) {             };
    
    /**
     * opens the solution designated by the solutionPath parameter
     *
     * @method open
     * @param {String} solutionPath
     */
    this.open = function open(solutionPath) {             };
    
    /**
     * returns Wakanda Server&#39;s &quot;walib&quot; folder, containing the libraries and services available client-side
     *
     * @method getWalibFolder
     * @param {String} kind
     * @param {Boolean | String} encodeURL
     * @return {String | Folder}
     */
    this.getWalibFolder = function getWalibFolder(kind, encodeURL) {        return '' || new Folder( );     };
    
    /**
     * returns a reference or the path to the file containing the solution setting whose ID you passed in settingID
     *
     * @method getSettingFile
     * @param {String} settingID
     * @param {String} kind
     * @param {Boolean} format
     */
    this.getSettingFile = function getSettingFile(settingID, kind, format) {             };
    
    /**
     * returns the folder containing the solution file (named &#39;SolutionName.waSolution&#39;)
     *
     * @method getFolder
     * @param {String} kind
     * @param {Boolean | String} encodeURL
     * @return {String | Folder}
     */
    this.getFolder = function getFolder(kind, encodeURL) {        return '' || new Folder( );     };
    
    /**
     * returns a reference to the application object whose name you passed in the name parameter
     *
     * @method getApplicationByName
     * @param {String} name
     * @return {Object}
     */
    this.getApplicationByName = function getApplicationByName(name) {        return {};     };
    
    /**
     * closes the current solution and reopens the default solution
     *
     * @method close
     */
    this.close = function close() {             };
    
    /**
     * method returns the port number on which Wakanda Server&#39;s debug service is listening for the solution
     *
     * @method getDebuggerPort
     * @return {Number}
     */
    this.getDebuggerPort = function getDebuggerPort() {        return 0;     };
    

};


Application = function Application() {
    
    
    /**
     * 
     *
     * @property directory
     * @attributes ReadOnly
     * @type Directory
     */
    this.directory =  new Directory( ); 
    
    /**
     * 
     *
     * @property application
     * @attributes ReadOnly
     * @type Application
     */
    this.application =  new Application( ); 
    
    /**
     * 
     *
     * @property solution
     * @attributes ReadOnly
     * @type Solution
     */
    this.solution =  new Solution( ); 
    
    /**
     * 
     *
     * @property sessionStorage
     * @attributes ReadOnly
     * @type Storage
     */
    this.sessionStorage =  new Storage( ); 
    
    /**
     * 
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    /**
     * 
     *
     * @property httpServer
     * @attributes ReadOnly
     * @type HttpServer
     */
    this.httpServer =  new HttpServer( ); 
    
    /**
     * 
     *
     * @property ds
     * @attributes ReadOnly
     * @type Datastore
     */
    this.ds =  new Datastore( ); 
    
    /**
     * 
     *
     * @property administrator
     * @attributes ReadOnly
     * @type Boolean
     */
    this.administrator =  true; 
    
    /**
     * 
     *
     * @property console
     * @attributes ReadOnly
     * @type Console
     */
    this.console =  new Console( ); 
    
    /**
     * returns an object containing information about the current operating system
     *
     * @property os
     * @attributes ReadOnly
     * @type Object
     */
    this.os =  {}; 
    
    /**
     * contains the application&#39;s current project settings in the form of a Storage object
     *
     * @property settings
     * @attributes ReadOnly
     * @type Storage
     */
    this.settings =  new Storage( ); 
    
    /**
     * 
     *
     * @property storage
     * @attributes ReadOnly
     * @type Storage
     */
    this.storage =  new Storage( ); 
    
    /**
     * returns an object containing some information about the running version of Wakanda
     *
     * @property process
     * @attributes 
     * @type Object
     */
    this.process =  {}; 
    
    /**
     * 
     *
     * @property wildchar
     * @attributes 
     * @type String
     */
    this.wildchar =  ''; 
    
    
    /**
     * constructor of the class objects of the XMLHttpRequest type
     *
     * @method XMLHttpRequest
     * @param {Object} proxy
     */
    this.XMLHttpRequest = function XMLHttpRequest(proxy) {             };
    
    /**
     * constructor of the class objects of type Blob
     *
     * @method Blob
     * @param {Number} size
     * @param {Number} filler
     * @param {String} mimeType
     */
    this.Blob = function Blob(size, filler, mimeType) {             };
    
    /**
     * returns an object of the ConnectionSession type identifying the current session under which the current user is actually running on the server
     *
     * @method currentSession
     * @return {ConnectionSession}
     */
    this.currentSession = function currentSession() {        return new ConnectionSession( );     };
    
    /**
     * logs out the user running the current session on the Wakanda server
     *
     * @method logout
     * @return {Boolean}
     */
    this.logout = function logout() {        return true;     };
    
    /**
     * constructor of the SystemWorker type class objects
     *
     * @method SystemWorker
     * @param {String} commandLine
     * @param {String} executionPath
     */
    this.SystemWorker = function SystemWorker(commandLine, executionPath) {             };
    
    /**
     * stops all pending wait( ) loops in the thread from which it is called
     *
     * @method exitWait
     */
    this.exitWait = function exitWait() {             };
    
    /**
     * constructor of the class objects of the Buffer type
     *
     * @method Buffer
     * @param {Number | Array | String} definition
     * @param {String} encoding
     */
    this.Buffer = function Buffer(definition, encoding) {             };
    
    /**
     * cancels the timerID scheduler previously set by the setInterval( ) method
     *
     * @method clearInterval
     * @param {Number} timerID
     */
    this.clearInterval = function clearInterval(timerID) {             };
    
    /**
     * schedules JavaScript code to be run every timeout milliseconds
     *
     * @method setInterval
     * @param {Function} handler
     * @param {Number} timeout
     * @param {Mixed} args
     * @return {Number}
     */
    this.setInterval = function setInterval(handler, timeout, args) {        return 0;     };
    
    /**
     * cancels the timerID timeout previously set by the setTimeout( ) method
     *
     * @method clearTimeout
     * @param {Number} timerID
     */
    this.clearTimeout = function clearTimeout(timerID) {             };
    
    /**
     * to schedule JavaScript code to be executed after a given delay
     *
     * @method setTimeout
     * @param {Function} handler
     * @param {Number} timeout
     * @param {Mixed} args
     * @return {Number}
     */
    this.setTimeout = function setTimeout(handler, timeout, args) {        return 0;     };
    
    /**
     * returns a reference or the path to the file containing the application setting whose ID you passed in settingID
     *
     * @method getSettingFile
     * @param {String} settingID
     * @param {String} kind
     * @param {Boolean | String} format
     * @return {File | String}
     */
    this.getSettingFile = function getSettingFile(settingID, kind, format) {        return new File( ) || '';     };
    
    /**
     * returns Wakanda Server&#39;s &quot;walib&quot; folder, containing the libraries and services available client-side
     *
     * @method getWalibFolder
     * @param {String} kind
     * @param {Boolean | String} format
     * @return {Folder | String}
     */
    this.getWalibFolder = function getWalibFolder(kind, format) {        return new Folder( ) || '';     };
    
    /**
     * returns the folder containing the application file (i.e., the project file with the .waSettings extension)
     *
     * @method getFolder
     * @param {String} kind
     * @param {Boolean | String} format
     * @return {Folder | String}
     */
    this.getFolder = function getFolder(kind, format) {        return new Folder( ) || '';     };
    
    /**
     * creates a new Datastore object based on the model passed as a parameter and returns a reference to this datastore
     *
     * @method createDataStore
     * @param {File} model
     * @param {File} data
     * @return {Datastore}
     */
    this.createDataStore = function createDataStore(model, data) {        return new Datastore( );     };
    
    /**
     * returns a reference to the current datastore of the project whose name you passed in projectName
     *
     * @method getDataStore
     * @param {} 
     * @return {Datastore}
     */
    this.getDataStore = function getDataStore() {        return new Datastore( );     };
    
    /**
     * launches the garbage collector on all sleeping contexts
     *
     * @method garbageCollect
     */
    this.garbageCollect = function garbageCollect() {             };
    
    /**
     * allows you to display a system notification window on the server machine
     *
     * @method displayNotification
     * @param {} 
     * @param {} 
     * @param {Boolean} critical
     */
    this.displayNotification = function displayNotification(critical) {             };
    
    /**
     * converts the ISO date string passed in the isoDate parameter into a standard JavaScript format
     *
     * @method isoToDate
     * @param {String} isoDate
     * @return {Date}
     */
    this.isoToDate = function isoToDate(isoDate) {        return new Date( );     };
    
    /**
     * installs a request handler function on the server
     *
     * @method addHttpRequestHandler
     * @param {String} pattern
     * @param {String} filePath
     * @param {String} functionName
     */
    this.addHttpRequestHandler = function addHttpRequestHandler(pattern, filePath, functionName) {             };
    
    /**
     * converts the JavaScript date object you passed in the dateObject parameter into an ISO format string
     *
     * @method dateToIso
     * @param {Date} dateObject
     * @return {String}
     */
    this.dateToIso = function dateToIso(dateObject) {        return '';     };
    
    /**
     * returns in an object the contents of the url&#39;s&quot;query string&quot;, which was passed as a parameter
     *
     * @method getURLQuery
     * @param {} 
     * @return {Object}
     */
    this.getURLQuery = function getURLQuery() {        return {};     };
    
    /**
     * returns the url passed in the parameter as an array of strings
     *
     * @method getURLPath
     * @param {} 
     * @return {Array}
     */
    this.getURLPath = function getURLPath() {        return [];     };
    
    /**
     * returns a JSON string converted into an XML string
     *
     * @method JSONToXml
     * @param {String} jsonText
     * @param {String} jsonFormat
     * @param {String} rootElement
     * @return {String}
     */
    this.JSONToXml = function JSONToXml(jsonText, jsonFormat, rootElement) {        return '';     };
    
    /**
     * compacts the datastore&#39;s data file designated by model and data, and generates the compactedData data file.
     *
     * @method compactDataStore
     * @param {File} model
     * @param {File} data
     * @param {Object} options
     * @param {File} compactedData
     */
    this.compactDataStore = function compactDataStore(model, data, options, compactedData) {             };
    
    /**
     * allows a thread to handle events and to continue to exist after the complete code executes
     *
     * @method wait
     * @param {Number} timeout
     * @return {Boolean}
     */
    this.wait = function wait(timeout) {        return true;     };
    
    /**
     * authenticates a user by their name and HA1 key and, in case of success, opens a new user session on the server
     *
     * @method loginByKey
     * @param {String} name
     * @param {String} key
     * @param {Number} timeOut
     * @return {Boolean}
     */
    this.loginByKey = function loginByKey(name, key, timeOut) {        return true;     };
    
    /**
     * authenticates a user by their name and password and, in case of success, opens a new user session on the server
     *
     * @method loginByPassword
     * @param {String} name
     * @param {String} password
     * @param {Number} timeOut
     * @return {Boolean}
     */
    this.loginByPassword = function loginByPassword(name, password, timeOut) {        return true;     };
    
    /**
     * returns the user who opened the current user session on the server
     *
     * @method currentUser
     * @return {User}
     */
    this.currentUser = function currentUser() {        return new User( );     };
    
    /**
     * returns a valid UUID string (32 chars) that you can use for your application needs
     *
     * @method generateUUID
     * @return {String}
     */
    this.generateUUID = function generateUUID() {        return '';     };
    
    /**
     * ends the thread from which it is called
     *
     * @method close
     */
    this.close = function close() {             };
    
    /**
     * constructor of the SharedWorker  type class objects
     *
     * @method SharedWorker
     * @param {String} scriptPath
     * @param {String} workerName
     */
    this.SharedWorker = function SharedWorker(scriptPath, workerName) {             };
    
    /**
     * loads the text stored in a file referenced by the file parameter and returns a string containing the text
     *
     * @method loadText
     * @param {File | String} file
     * @param {Number} charset
     * @return {String}
     */
    this.loadText = function loadText(file, charset) {        return '';     };
    
    /**
     * loads the image stored in a file referenced by the file parameter and returns an image object
     *
     * @method loadImage
     * @param {File | String} file
     * @return {Image}
     */
    this.loadImage = function loadImage(file) {        return new Image( );     };
    
    /**
     * opens a datastore in the current solution and returns a reference to it
     *
     * @method openDataStore
     * @param {File} model
     * @param {File} data
     * @return {Datastore}
     */
    this.openDataStore = function openDataStore(model, data) {        return new Datastore( );     };
    
    /**
     * creates a temporary internal Wakanda datastore based on the 4D database designated by the structure4D and data4D parameters
     *
     * @method open4DBase
     * @param {File} structure4D
     * @param {File} data4D
     * @return {Datastore}
     */
    this.open4DBase = function open4DBase(structure4D, data4D) {        return new Datastore( );     };
    
    /**
     * returns the ProgressIndicator type object whose name you passed in the name parameter
     *
     * @method getProgressIndicator
     * @param {String} name
     * @return {ProgressIndicator}
     */
    this.getProgressIndicator = function getProgressIndicator(name) {        return new ProgressIndicator( );     };
    
    /**
     * uninstalls an existing HTTP request handler  function running on the server
     *
     * @method removeHttpRequestHandler
     * @param {String} pattern
     * @param {String} filePath
     * @param {String} functionName
     */
    this.removeHttpRequestHandler = function removeHttpRequestHandler(pattern, filePath, functionName) {             };
    
    /**
     * returns an XML string converted into a JSON string
     *
     * @method XmlToJSON
     * @param {String} xmlText
     * @param {String} jsonFormat
     * @param {String} rootElement
     * @return {String}
     */
    this.XmlToJSON = function XmlToJSON(xmlText, jsonFormat, rootElement) {        return '';     };
    
    /**
     * returns the item associated with the role you passed as a parameter
     *
     * @method getItemsWithRole
     * @param {String} role
     * @return {File | Folder | Array}
     */
    this.getItemsWithRole = function getItemsWithRole(role) {        return new File( ) || new Folder( ) || [];     };
    
    /**
     * creates a new object of type ProgressIndicator on the server and specifies its properties
     *
     * @method ProgressIndicator
     * @param {Number} numElements
     * @param {String} sessionName
     * @param {Boolean | String} stoppable
     * @param {String} unused
     * @param {String} name
     * @return {ProgressIndicator}
     */
    this.ProgressIndicator = function ProgressIndicator(numElements, sessionName, stoppable, unused, name) {        return new ProgressIndicator( );     };
    
    /**
     * returns the exported API of a CommonJS compliant Module whose identifier you pass in id
     *
     * @method require
     * @param {String} id
     * @return {Module}
     */
    this.require = function require(id) {        return new Module( );     };
    
    /**
     * saves the text you passed to the textToSave parameter in the file parameter
     *
     * @method saveText
     * @param {String} textToSave
     * @param {File | String} file
     * @param {Number} charset
     */
    this.saveText = function saveText(textToSave, file, charset) {             };
    
    /**
     * constructor of the dedicated class objects of the Worker type
     *
     * @method Worker
     * @param {String} scriptPath
     */
    this.Worker = function Worker(scriptPath) {             };
    
    /**
     * constructor of the File type objects
     *
     * @method File
     * @param {String} absolutePath
     * @return {File}
     */
    this.File = function File(absolutePath) {        return new File( );     };
    
    /**
     * creates a new object of type Folder
     *
     * @method Folder
     * @param {String} path
     * @return {Folder}
     */
    this.Folder = function Folder(path) {        return new Folder( );     };
    
    /**
     * 
     *
     * @method BinaryStream
     * @param {String | File} file
     * @param {} 
     * @return {BinaryStream}
     */
    this.BinaryStream = function BinaryStream(file, ) {        return new BinaryStream( );     };
    
    /**
     * creates a new TextStream object
     *
     * @method TextStream
     * @param {String | File} file
     * @param {String} readMode
     * @param {Number} charset
     * @return {TextStream}
     */
    this.TextStream = function TextStream(file, readMode, charset) {        return new TextStream( );     };
    
    /**
     * allows the user to look up the filesystem for a file or directory referred to by a local url
     *
     * @method resolveLocalFileSystemSyncURL
     * @param {String} url
     * @return {EntrySync}
     */
    this.resolveLocalFileSystemSyncURL = function resolveLocalFileSystemSyncURL(url) {        return new EntrySync( );     };
    
    /**
     * requests a FileSystemSync object in which application data can be stored
     *
     * @method requestFileSystemSync
     * @param {Number} type
     * @param {Number} size
     * @return {FileSystemSync}
     */
    this.requestFileSystemSync = function requestFileSystemSync(type, size) {        return new FileSystemSync( );     };
    
    /**
     * requests a FileSystemSync object in which application data can be stored
     *
     * @method FileSystemSync
     * @param {Number} type
     * @param {Number} size
     * @return {FileSystemSync}
     */
    this.FileSystemSync = function FileSystemSync(type, size) {        return new FileSystemSync( );     };
    
    /**
     * references a JavaScript file from a parent JavaScript file
     *
     * @method include
     * @param {File | String} file
     * @param {String | Boolean} refresh
     */
    this.include = function include(file, refresh) {             };
    
    /**
     * import and execute any JavaScript file(s) in the current JavaScript context
     *
     * @method importScripts
     * @param {String} scriptPath
     */
    this.importScripts = function importScripts(scriptPath) {             };
    
    /**
     * repairs the datastore&#39;s data file defined by model and data, and generates the repairedData data file.
     *
     * @method repairDataStore
     * @param {File} model
     * @param {File} data
     * @param {Object} options
     * @param {File} repairedData
     */
    this.repairDataStore = function repairDataStore(model, data, options, repairedData) {             };
    
    /**
     * verifies the internal structure of the objects contained in the datastore designated by model and data.
     *
     * @method verifyDataStore
     * @param {File} model
     * @param {File} data
     * @param {Object} options
     */
    this.verifyDataStore = function verifyDataStore(model, data, options) {             };
    

};

