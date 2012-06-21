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
 * 
 *
 * @class XMLHttpRequest
 * @extends Object
 *
 */
XMLHttpRequest = function XMLHttpRequest() {
    
    
    /**
     * 
     *
     * @property responseText
     * @attributes 
     * @type String
     */
    this.responseText =  ''; 
    
    /**
     * returns the HTTP status text of the XMLHttpRequest
     *
     * @property statusText
     * @attributes 
     * @type String
     */
    this.statusText =  ''; 
    
    /**
     * returns the HTTP status code of the XMLHttpRequest
     *
     * @property status
     * @attributes 
     * @type Number
     */
    this.status =  0; 
    
    /**
     * 
     *
     * @property readyState
     * @attributes ReadOnly
     * @type Number
     */
    this.readyState =  0; 
    
    /**
     * defines the event listener function that will handle the various states of the XMLHttpRequest
     *
     * @property onreadystatechange
     * @attributes 
     * @type Function
     */
    this.onreadystatechange =  new Function( ); 
    
    
    /**
     * returns all HTTP headers from the response of the XMLHttprequest
     *
     * @method getAllResponseHeaders
     * @return {String}
     */
    this.getAllResponseHeaders = function getAllResponseHeaders() {        return '';     };
    
    /**
     * returns the value of a specific header field in the response of the XMLHttpRequest
     *
     * @method getResponseHeader
     * @param {String} header
     * @return {String | Null}
     */
    this.getResponseHeader = function getResponseHeader(header) {        return '' || new Null( );     };
    
    /**
     * initiates the request defined in the XMLHttpRequest
     *
     * @method send
     * @param {String} data
     */
    this.send = function send(data) {             };
    
    /**
     * declares the HTTP method and the URL of the XMLHttpRequest
     *
     * @method open
     * @param {String} method
     * @param {String} url
     * @param {Boolean} async
     */
    this.open = function open(method, url, async) {             };
    
    /**
     * set the value of a specific header field of the XMLHttpRequest
     *
     * @method setRequestHeader
     * @param {String} header
     * @param {String} value
     */
    this.setRequestHeader = function setRequestHeader(header, value) {             };
    

};

