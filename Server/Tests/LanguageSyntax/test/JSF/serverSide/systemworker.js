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
 * Use System workers to call external processes on the server machine
 *
 * @class System Workers
 * @extends Object
 *
 */
SystemWorker = function SystemWorker() {
    
    
    /**
     * contains the function to call when the external process sent a termination message
     *
     * @property onterminated
     * @attributes ReadOnly
     * @type Function
     */
    this.onterminated =  new Function( ); 
    
    /**
     * contains the function to call when an error is received from the external process
     *
     * @property onerror
     * @attributes ReadOnly
     * @type Function
     */
    this.onerror =  new Function( ); 
    
    /**
     * contains the function to call when a message is received from the external process
     *
     * @property onmessage
     * @attributes ReadOnly
     * @type Function
     */
    this.onmessage =  new Function( ); 
    
    
    /**
     * returns an object containing information about the SystemWorker
     *
     * @method getInfos
     * @return {Object}
     */
    this.getInfos = function getInfos() {        return {};     };
    
    /**
     * returns the number of SystemWorker objects currently running on the server
     *
     * @method getNumberRunning
     * @return {Number}
     */
    this.getNumberRunning = function getNumberRunning() {        return 0;     };
    
    /**
     * allows you to set a waiting time for the external process to execute
     *
     * @method wait
     * @param {Number} duration
     * @return {Number}
     */
    this.wait = function wait(duration) {        return 0;     };
    
    /**
     * closes the input stream (stdin) of the external process
     *
     * @method endOfInput
     */
    this.endOfInput = function endOfInput() {             };
    
    /**
     * write on the input stream (stdin) of the external process
     *
     * @method postMessage
     * @param {String} stdin
     */
    this.postMessage = function postMessage(stdin) {             };
    
    /**
     * forces the external process to terminate its execution
     *
     * @method terminate
     * @param {Boolean} waitForTermination
     */
    this.terminate = function terminate(waitForTermination) {             };
    

};

