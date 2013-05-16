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
     *  writes message to the log and Wakanda Studio Debugger&#39;s Console with the visual &quot;INFO&quot; label
     *
     * @method info
     * @param {Object} message
     */
    this.info = function info(message) {             };
    
    /**
     * writes message to the log file and Wakanda Studio&#39;s Debugger console with the visual &quot;WARNING&quot; label
     *
     * @method warn
     * @param {Object} message
     */
    this.warn = function warn(message) {             };
    
    /**
     * writes message to the log file and Wakanda Studio Debugger&#39;s console with the visual &quot;TRACE&quot; label
     *
     * @method log
     * @param {Object} message
     */
    this.log = function log(message) {             };
    
    /**
     * writes message to the log file and Wakanda Studio Debugger&#39;s Console with the visual &quot;ERROR&quot; label
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

