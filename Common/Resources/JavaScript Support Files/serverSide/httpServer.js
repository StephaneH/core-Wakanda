/**
 *
 * 
 *
 * @class HTTP Server
 * @extends Object
 *
 */
HttpServer = function HttpServer() {
    
    
    /**
     * 
     *
     * @property started
     * @attributes ReadOnly
     * @type Boolean
     */
    this.started =  true; 
    
    /**
     * 
     *
     * @property ssl
     * @attributes ReadOnly
     * @type HttpServerSSL
     */
    this.ssl =  new HttpServerSSL( ); 
    
    /**
     * 
     *
     * @property port
     * @attributes ReadOnly
     * @type Number
     */
    this.port =  0; 
    
    /**
     * 
     *
     * @property ipAddress
     * @attributes ReadOnly
     * @type String
     */
    this.ipAddress =  ''; 
    
    /**
     * 
     *
     * @property hostName
     * @attributes ReadOnly
     * @type String
     */
    this.hostName =  ''; 
    
    /**
     * 
     *
     * @property defaultCharSet
     * @attributes ReadOnly
     * @type String
     */
    this.defaultCharSet =  ''; 
    
    /**
     * 
     *
     * @property cache
     * @attributes 
     * @type HttpServerCache
     */
    this.cache =  new HttpServerCache( ); 
    
    
    /**
     * stops the Wakanda HTTP server
     *
     * @method stop
     */
    this.stop = function stop() {             };
    
    /**
     * starts the Wakanda HTTP server
     *
     * @method start
     */
    this.start = function start() {             };
    
    /**
     * executes a sequence that stops and starts the Wakanda HTTP server
     *
     * @method restart
     */
    this.restart = function restart() {             };
    

};


HttpServerSSL = function HttpServerSSL() {
    
    
    /**
     * 
     *
     * @property enabled
     * @attributes 
     * @type Boolean
     */
    this.enabled =  true; 
    
    /**
     * 
     *
     * @property port
     * @attributes ReadOnly
     * @type Number
     */
    this.port =  0; 
    
    
    /**
     * returns the path to the SSL certificate used by the server (if any)
     *
     * @method getCertificatePath
     * @return {String}
     */
    this.getCertificatePath = function getCertificatePath() {        return '';     };
    

};


HttpServerCache = function HttpServerCache() {
    
    
    /**
     * 
     *
     * @property enabled
     * @attributes 
     * @type Boolean
     */
    this.enabled =  true; 
    
    /**
     * 
     *
     * @property memorySize
     * @attributes 
     * @type Number
     */
    this.memorySize =  0; 
    
    

};

