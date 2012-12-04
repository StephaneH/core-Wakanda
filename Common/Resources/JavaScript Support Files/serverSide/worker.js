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

