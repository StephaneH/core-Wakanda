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
 * The Workers API provides an HTML5 compliant interface for Web workers
 *
 * @class Workers
 * @extends Object
 *
 */
Worker = function Worker() {
    
    
    /**
     * contains the function to call when an uncaught runtime script error occurs in one of the Worker&#39;s scripts
     *
     * @property onerror
     * @attributes ReadOnly
     * @type Function
     */
    this.onerror =  new Function( ); 
    
    /**
     * contains the function to call when a message is received
     *
     * @property onmessage
     * @attributes ReadOnly
     * @type Function
     */
    this.onmessage =  new Function( ); 
    
    
    /**
     * terminate the dedicated worker execution
     *
     * @method terminate
     */
    this.terminate = function terminate() {             };
    
    /**
     * exchange data between a parent Worker proxy and a dedicated Web worker
     *
     * @method postMessage
     * @param {Mixed} messageData
     */
    this.postMessage = function postMessage(messageData) {             };
    

};


SharedWorker = function SharedWorker() {
    
    
    /**
     * contains the function to call when a thread creates a new SharedWorker proxy object to connect to the current shared worker
     *
     * @property onconnect
     * @attributes ReadOnly
     * @type Function
     */
    this.onconnect =  new Function( ); 
    
    /**
     * the MessagePort object of the&amp;nbsp;SharedWorker
     *
     * @property MessagePort
     * @attributes ReadOnly
     * @type Object
     */
    this.MessagePort =  {}; 
    
    

};

