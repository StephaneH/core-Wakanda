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
 * @class BLOB
 * @extends Object
 *
 */
Blob = function Blob() {
    
    
    /**
     * 
     *
     * @property type
     * @attributes 
     * @type String
     */
    this.type =  ''; 
    
    /**
     * returns the size of the Blob expressed in bytes
     *
     * @property size
     * @attributes ReadOnly
     * @type Number
     */
    this.size =  0; 
    
    
    /**
     * returns a Buffer object containing a copy of the Blob bytes
     *
     * @method toBuffer
     * @return {Buffer}
     */
    this.toBuffer = function toBuffer() {        return new Buffer( );     };
    
    /**
     * creates a new Blob object by referencing the contents of the bytes of the Blob to which it is applied, from start to end
     *
     * @method slice
     * @param {Number} start
     * @param {Number} end
     * @param {String} mimeType
     * @return {Blob}
     */
    this.slice = function slice(start, end, mimeType) {        return new Blob( );     };
    
    /**
     * get a string representation of the Blob contents
     *
     * @method toString
     * @param {String} stringFormat
     * @return {String}
     */
    this.toString = function toString(stringFormat) {        return '';     };
    

};

