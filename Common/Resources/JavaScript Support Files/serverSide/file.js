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
 * This API provides you with useful tools to handle files, folders, and streams on the Wakanda Server.
 *
 * @class Files and Folders
 * @extends Object
 *
 */
BinaryStream = function BinaryStream() {
    
    
    
    /**
     * returns a number representing the next byte from the BinaryStream object
     *
     * @method getByte
     * @return {Number}
     */
    this.getByte = function getByte() {        return 0;     };
    
    /**
     * saves the buffer contents to the disk file referenced in the BinaryStream  object
     *
     * @method flush
     */
    this.flush = function flush() {             };
    
    /**
     * writes the byte value you passed as the parameter in the BinaryStream object at the current cursor location
     *
     * @method putByte
     * @param {Number} byteValue
     */
    this.putByte = function putByte(byteValue) {             };
    
    /**
     * returns the next long number (if present) from the BinaryStream object
     *
     * @method getLong
     * @return {Number}
     */
    this.getLong = function getLong() {        return 0;     };
    
    /**
     * moves the stream cursor to the position you passed in offset in the BinaryStream  object
     *
     * @method setPos
     * @param {Number} offset
     */
    this.setPos = function setPos(offset) {             };
    
    /**
     * writes the byte word (i.e., an integer value) you passed as the parameter in the BinaryStream  object at the current cursor location
     *
     * @method putWord
     * @param {Number} wordValue
     */
    this.putWord = function putWord(wordValue) {             };
    
    /**
     * writes the string value you passed as the parameter in the BinaryStream  object at the current cursor location
     *
     * @method putString
     * @param {String} stringValue
     */
    this.putString = function putString(stringValue) {             };
    
    /**
     * writes the real value you passed as the parameter in the BinaryStream  object at the current cursor location
     *
     * @method putReal
     * @param {Number} realValue
     */
    this.putReal = function putReal(realValue) {             };
    
    /**
     * writes the long64 value you passed as the parameter in the BinaryStream  object at the current cursor location
     *
     * @method putLong64
     * @param {Number} long64Value
     */
    this.putLong64 = function putLong64(long64Value) {             };
    
    /**
     * writes the long value you passed as the parameter in the BinaryStream  object at the current cursor location
     *
     * @method putLong
     * @param {Number} longValue
     */
    this.putLong = function putLong(longValue) {             };
    
    /**
     * returns True if the current data reading in the BinaryStream object is in byte swap mode
     *
     * @method isByteSwapping
     * @return {Boolean}
     */
    this.isByteSwapping = function isByteSwapping() {        return true;     };
    
    /**
     * returns the next word, i.e., a binary integer (if present) from the BinaryStream object
     *
     * @method getWord
     * @return {Number}
     */
    this.getWord = function getWord() {        return 0;     };
    
    /**
     * returns the next string (if present) from the BinaryStream object
     *
     * @method getString
     * @return {String}
     */
    this.getString = function getString() {        return '';     };
    
    /**
     * returns the size of the stream
     *
     * @method getSize
     * @return {Number}
     */
    this.getSize = function getSize() {        return 0;     };
    
    /**
     * returns the next real (if present) from the BinaryStream object
     *
     * @method getReal
     * @return {Number}
     */
    this.getReal = function getReal() {        return 0;     };
    
    /**
     * returns the current position of the cursor in the BinaryStream object
     *
     * @method getPos
     * @return {Number}
     */
    this.getPos = function getPos() {        return 0;     };
    
    /**
     * returns the next long64 number (if present) from the BinaryStream object
     *
     * @method getLong64
     * @return {Number}
     */
    this.getLong64 = function getLong64() {        return 0;     };
    
    /**
     * indicates that the next reading of structured values in the BinaryStream object requires a byte swap
     *
     * @method changeByteOrder
     */
    this.changeByteOrder = function changeByteOrder() {             };
    
    /**
     * closes the file referenced in the BinaryStream object
     *
     * @method close
     */
    this.close = function close() {             };
    

};


TextStream = function TextStream() {
    
    
    
    /**
     * moves the stream cursor to the beginning of the TextStream  object
     *
     * @method rewind
     */
    this.rewind = function rewind() {             };
    
    /**
     * closes the file referenced in the TextStream object
     *
     * @method close
     */
    this.close = function close() {             };
    
    /**
     * writes the data you passed in the text parameter in the TextStream  object
     *
     * @method write
     * @param {String} text
     */
    this.write = function write(text) {             };
    
    /**
     * reads characters from the file referenced in the TextStream object
     *
     * @method read
     * @param {Number | String} numBytesOrDelimiter
     * @return {String}
     */
    this.read = function read(numBytesOrDelimiter) {        return '';     };
    
    /**
     * returns the current size  of the stream
     *
     * @method getSize
     * @return {Number}
     */
    this.getSize = function getSize() {        return 0;     };
    
    /**
     * returns the current position of the cursor in the TextStream object
     *
     * @method getPos
     * @return {Number}
     */
    this.getPos = function getPos() {        return 0;     };
    
    /**
     * returns true if the cursor position is after the last character of the file referenced in the TextStream object
     *
     * @method end
     * @return {Boolean}
     */
    this.end = function end() {        return true;     };
    
    /**
     * saves the contents of the buffer to the disk file referenced in the TextStream  object
     *
     * @method flush
     */
    this.flush = function flush() {             };
    

};


File = function File() {
    
    
    /**
     * returns the creation date for the File object
     *
     * @property creationDate
     * @attributes ReadOnly
     * @type Date
     */
    this.creationDate =  new Date( ); 
    
    /**
     * returns true if the file referenced in the File object already exists at the defined path
     *
     * @property exists
     * @attributes ReadOnly
     * @type Boolean
     */
    this.exists =  true; 
    
    /**
     * returns the file name extension of the File object
     *
     * @property extension
     * @attributes ReadOnly
     * @type String
     */
    this.extension =  ''; 
    
    /**
     * returns the last modification date for the File object
     *
     * @property lastModifiedDate
     * @attributes 
     * @type Date
     */
    this.lastModifiedDate =  new Date( ); 
    
    /**
     * gets or sets the short name of the File object without the path information
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    /**
     * returns the short name of the File object without its path information or extension
     *
     * @property nameNoExt
     * @attributes ReadOnly
     * @type String
     */
    this.nameNoExt =  ''; 
    
    /**
     * returns a new Folder object containing the parent folder of the File or Folder object
     *
     * @property parent
     * @attributes ReadOnly
     * @type Folder
     */
    this.parent =  new Folder( ); 
    
    /**
     * returns the full path of the File or Folder object, including the file or folder name itself
     *
     * @property path
     * @attributes ReadOnly
     * @type String
     */
    this.path =  ''; 
    
    /**
     * gets or sets the read-only status of the File or Folder object
     *
     * @property readOnly
     * @attributes ReadOnly
     * @type Boolean
     */
    this.readOnly =  true; 
    
    /**
     * returns the size of the File object expressed in bytes
     *
     * @property size
     * @attributes ReadOnly
     * @type Number
     */
    this.size =  0; 
    
    /**
     * gets or sets the visibility status of the File or Folder object
     *
     * @property visible
     * @attributes ReadOnly
     * @type Boolean
     */
    this.visible =  true; 
    
    
    /**
     * class method    can be used with the File( ) constructor to know if path corresponds to a file on disk
     *
     * @method isFile
     * @param {String} path
     * @return {Boolean}
     */
    this.isFile = function isFile(path) {        return true;     };
    
    /**
     * copies the file referenced in the File object (the source object) into the specified destination
     *
     * @method copyTo
     * @param {File | String} destination
     * @param {Boolean | String} overwrite
     */
    this.copyTo = function copyTo(destination, overwrite) {             };
    
    /**
     * stores the file referenced in the File on disk
     *
     * @method create
     * @return {Boolean}
     */
    this.create = function create() {        return true;     };
    
    /**
     * returns the size of the free space (expressed in bytes) available on the volume where the File or Folder object is stored
     *
     * @method getFreeSpace
     * @param {Boolean | String} quotas
     * @return {Number}
     */
    this.getFreeSpace = function getFreeSpace(quotas) {        return 0;     };
    
    /**
     * returns the absolute URL of the File or Folder object
     *
     * @method getURL
     * @param {Boolean | String} encoding
     * @return {String}
     */
    this.getURL = function getURL(encoding) {        return '';     };
    
    /**
     * returns the size (expressed in bytes) of the volume where the File or Folder object is stored
     *
     * @method getVolumeSize
     * @param {Boolean | String} quotas
     * @return {Number}
     */
    this.getVolumeSize = function getVolumeSize(quotas) {        return 0;     };
    
    /**
     * moves the file referenced in the File object (the source object) to the specified destination
     *
     * @method moveTo
     * @param {File | String} destination
     * @param {Boolean | String} overwrite
     */
    this.moveTo = function moveTo(destination, overwrite) {             };
    
    /**
     * removes the file or folder referenced in the File or Folder object from the storage volume
     *
     * @method remove
     * @return {Boolean}
     */
    this.remove = function remove() {        return true;     };
    
    /**
     * allows you to rename a file on disk referenced in the File object
     *
     * @method setName 
     * @param {String} newName
     * @return {Boolean}
     */
    this.setName  = function setName (newName) {        return true;     };
    
    /**
     * checks the validity of the pointer to the current File object within an iteration of files
     *
     * @method valid
     * @return {Boolean}
     */
    this.valid = function valid() {        return true;     };
    
    /**
     * puts the file pointer on the next file within an iteration  of files
     *
     * @method next
     * @return {Boolean}
     */
    this.next = function next() {        return true;     };
    

};


Folder = function Folder() {
    
    
    /**
     * returns the creation date for the folder referenced in the Folder object
     *
     * @property creationDate
     * @attributes ReadOnly
     * @type Date
     */
    this.creationDate =  new Date( ); 
    
    /**
     * returns the list of the files located at the first level of the Folder object
     *
     * @property files
     * @attributes ReadOnly
     * @type Array
     */
    this.files =  []; 
    
    /**
     * returns a new File object referencing the file found in the first position of the Folder object
     *
     * @property firstFile
     * @attributes ReadOnly
     * @type File
     */
    this.firstFile =  new File( ); 
    
    /**
     * returns a new Folder object containing the subfolder found in the first position of the Folder object
     *
     * @property firstFolder
     * @attributes ReadOnly
     * @type Folder
     */
    this.firstFolder =  new Folder( ); 
    
    /**
     * returns the list of the subfolders located at the first level of the Folder object
     *
     * @property folders
     * @attributes ReadOnly
     * @type Array
     */
    this.folders =  []; 
    
    /**
     * returns the last modification date for the folder referenced in the Folder object
     *
     * @property modificationDate
     * @attributes ReadOnly
     * @type Date
     */
    this.modificationDate =  new Date( ); 
    
    /**
     * gets or sets the name of the Folder object without the path information
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    /**
     * returns a new Folder object containing the parent folder of the File or Folder object
     *
     * @property parent
     * @attributes ReadOnly
     * @type Folder
     */
    this.parent =  new Folder( ); 
    
    /**
     * returns the full path of the File or Folder object, including the file or folder name itself
     *
     * @property path
     * @attributes ReadOnly
     * @type String
     */
    this.path =  ''; 
    
    /**
     * gets or sets the read-only status of the File or Folder object
     *
     * @property readOnly
     * @attributes ReadOnly
     * @type Boolean
     */
    this.readOnly =  true; 
    
    /**
     * gets or sets the visibility status of the File or Folder object
     *
     * @property visible
     * @attributes ReadOnly
     * @type Boolean
     */
    this.visible =  true; 
    
    /**
     * returns the name of the Folder object without path information and without the main extension (if any)
     *
     * @property nameNoExt
     * @attributes ReadOnly
     * @type String
     */
    this.nameNoExt =  ''; 
    
    /**
     * returns the folder name extension of the Folder object
     *
     * @property extension
     * @attributes PrivateReadOnly
     * @type String
     */
    this.extension =  ''; 
    
    /**
     * returns true if the folder referenced in the Folder object already exists at the defined path
     *
     * @property exists
     * @attributes ReadOnly
     * @type Boolean
     */
    this.exists =  true; 
    
    
    /**
     * class method     can be used with the Folder( ) constructor to know if path corresponds to a folder on disk
     *
     * @method isFolder
     * @param {String} path
     * @return {Boolean}
     */
    this.isFolder = function isFolder(path) {        return true;     };
    
    /**
     * creates the folder referenced in the Folder object on disk
     *
     * @method create
     * @return {Boolean}
     */
    this.create = function create() {        return true;     };
    
    /**
     * executes the callbackFn function once for each file present at the first level of the Folder object
     *
     * @method forEachFile
     * @param {Function} callbackFn
     * @param {Object} thisArg
     */
    this.forEachFile = function forEachFile(callbackFn, thisArg) {             };
    
    /**
     * executes the callbackFn function once for each subfolder present at the first level of the Folder  object
     *
     * @method forEachFolder
     * @param {Function} callbackFn
     * @param {Object} thisArg
     */
    this.forEachFolder = function forEachFolder(callbackFn, thisArg) {             };
    
    /**
     * returns the size of the free space (expressed in bytes) available on the volume where the File or Folder object is stored
     *
     * @method getFreeSpace
     * @param {Boolean | String} quotas
     * @return {Number}
     */
    this.getFreeSpace = function getFreeSpace(quotas) {        return 0;     };
    
    /**
     * returns the absolute URL of the File or Folder object
     *
     * @method getURL
     * @param {Boolean | String} encoding
     * @return {String}
     */
    this.getURL = function getURL(encoding) {        return '';     };
    
    /**
     * returns the size (expressed in bytes) of the volume where the File or Folder object is stored
     *
     * @method getVolumeSize
     * @param {Boolean | String} quotas
     * @return {Number}
     */
    this.getVolumeSize = function getVolumeSize(quotas) {        return 0;     };
    
    /**
     * executes the callbackFn function once for each file or subfolder present in the Folder  object
     *
     * @method parse
     * @param {Function} callbackFn
     * @param {Object} thisArg
     */
    this.parse = function parse(callbackFn, thisArg) {             };
    
    /**
     * removes the file or folder referenced in the File or Folder object from the storage volume
     *
     * @method remove
     * @return {Boolean}
     */
    this.remove = function remove() {        return true;     };
    
    /**
     * removes the contents of the folder referenced in the Folder  object from the storage volume
     *
     * @method removeContent
     * @return {Boolean}
     */
    this.removeContent = function removeContent() {        return true;     };
    
    /**
     * allows you to rename the folder referenced in the Folder object on disk
     *
     * @method setName
     * @param {String} newName
     */
    this.setName = function setName(newName) {             };
    
    /**
     * checks the validity of the pointer to the current folder within an iteration of folders
     *
     * @method valid
     * @return {Boolean}
     */
    this.valid = function valid() {        return true;     };
    
    /**
     * puts the folder pointer on the next subfolder in an iteration  of subfolders
     *
     * @method next
     * @return {Boolean}
     */
    this.next = function next() {        return true;     };
    

};

