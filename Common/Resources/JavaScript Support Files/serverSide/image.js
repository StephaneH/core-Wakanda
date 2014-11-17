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
 * The Image API provides an interface to load, handle or create image objects from files and datastore attributes
 *
 * @class Images
 * @extends Object
 *
 */
Image = function Image() {
    
    
    /**
     * returns the height (in pixels) of the Image object to which it is applied
     *
     * @property height
     * @attributes ReadOnly
     * @type Number
     */
    this.height =  0; 
    
    /**
     * returns the size in bytes of the Image type object to which it is applied
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length =  0; 
    
    /**
     * returns the size in bytes of the Image type object to which it is applied
     *
     * @property size
     * @attributes ReadOnly
     * @type Number
     */
    this.size =  0; 
    
    /**
     * returns the width (in pixels) of the Image object to which it is applied
     *
     * @property width
     * @attributes ReadOnly
     * @type Number
     */
    this.width =  0; 
    
    /**
     * returns an object made up of one or more sub-object(s) containing the metadata associated with the Image object to which it is applied
     *
     * @property meta
     * @attributes ReadOnly
     * @type Object
     */
    this.meta =  {}; 
    
    
    /**
     * stores in a file the Image object to which it is applied
     *
     * @method save
     * @param {String | File} file
     * @param {String} type
     */
    this.save = function save(file, type) {             };
    
    /**
     * modifies metadata found in the Image object to which it is applied
     *
     * @method saveMeta
     * @param {Object} meta
     */
    this.saveMeta = function saveMeta(meta) {             };
    
    /**
     * returns a thumbnail from the source picture to which it is applied
     *
     * @method thumbnail
     * @param {Number} width
     * @param {Number} height
     * @param {Number} mode
     * @return {Number}
     */
    this.thumbnail = function thumbnail(width, height, mode) {        return 0;     };
    

};

