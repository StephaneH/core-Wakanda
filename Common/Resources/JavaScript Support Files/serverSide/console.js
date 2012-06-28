/**
 *
 * Console module provides an interface to log JavaScript actions.
 *
 * @class Console
 * @extends Object
 *
 */
Console = function Console() {
    
    
    /**
     * 
     *
     * @property content
     * @attributes ReadOnlyPrivate
     * @type Array
     */
    this.content =  []; 
    
    
    /**
     * 
     *
     * @method info
     * @param {Object} message
     */
    this.info = function info(message) {             };
    
    /**
     * 
     *
     * @method warn
     * @param {Object} message
     */
    this.warn = function warn(message) {             };
    
    /**
     * 
     *
     * @method log
     * @param {Object} message
     */
    this.log = function log(message) {             };
    
    /**
     * 
     *
     * @method error
     * @param {Object} message
     */
    this.error = function error(message) {             };
    
    /**
     * 
     *
     * @method debug
     * @param {Object} message
     */
    this.debug = function debug(message) {             };
    

};

