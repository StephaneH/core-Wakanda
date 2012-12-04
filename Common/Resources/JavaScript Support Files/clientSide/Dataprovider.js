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
 * Updated September 28, 2011 - Low-level client-side JavaScript API to manage the exchange of data between the browser, widgets, and Wakanda Server.
 *
 * @class Dataprovider
 * @extends Object
 *
 */
WAF.EntityAttributeSimple = function WAF_EntityAttributeSimple() {
    
    
    
    /**
     * returns True or False according to whether or not the entity or the attribute of the entity to which it is applied has been modified
     *
     * @method isTouched
     * @return {Boolean}
     */
    this.isTouched = function isTouched() {        return true;     };
    
    /**
     * indicates that the entity or one of its attributes where this method is applied must be saved during the next save
     *
     * @method touch
     */
    this.touch = function touch() {             };
    
    /**
     * modifies the attribute value of the entity to which it is applied
     *
     * @method setValue
     * @param {Mixed} value
     */
    this.setValue = function setValue(value) {             };
    
    /**
     * gets the value of the attribute of the entity to which it is applied
     *
     * @method getValue
     * @param {Object} options
     * @param {Object} userData
     * @return {Mixed}
     */
    this.getValue = function getValue(options, userData) {        return 0 || '' || true || {} || null;     };
    

};


WAF.EntityAttributeRelated = function WAF_EntityAttributeRelated() {
    
    
    
    /**
     * returns the datastore class related to the relation attribute to which it is applied
     *
     * @method getRelatedClass
     * @return {DatastoreClass}
     */
    this.getRelatedClass = function getRelatedClass() {        return new DatastoreClass( );     };
    
    /**
     * modifies the attribute value of the entity to which it is applied
     *
     * @method setValue
     * @param {Mixed} value
     */
    this.setValue = function setValue(value) {             };
    
    /**
     * gets the value of the attribute of the entity to which it is applied
     *
     * @method getValue
     * @param {Object} options
     * @param {Object} userData
     * @return {Mixed}
     */
    this.getValue = function getValue(options, userData) {        return 0 || '' || true || {} || null;     };
    

};


WAF.EntityAttributeRelatedSet = function WAF_EntityAttributeRelatedSet() {
    
    
    
    /**
     * modifies the attribute value of the entity to which it is applied
     *
     * @method setValue
     * @param {Mixed} value
     */
    this.setValue = function setValue(value) {             };
    
    /**
     * gets the value of the attribute of the entity to which it is applied
     *
     * @method getValue
     * @param {Object} options
     * @param {Object} userData
     * @return {Mixed}
     */
    this.getValue = function getValue(options, userData) {        return 0 || '' || true || {} || null;     };
    

};


WAF.EntityCollection = function WAF_EntityCollection() {
    
    
    /**
     * 
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length =  0; 
    
    
    /**
     * returns the internal reference of the entity collection on the server
     *
     * @method getReference
     * @return {Object}
     */
    this.getReference = function getReference() {        return {};     };
    
    /**
     * retrieves an array containing all the distinct values stored in the attribute attribute for the entity collection or datastore class to which it is applied
     *
     * @method distinctValues
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Object} options
     * @param {Object} userData
     */
    this.distinctValues = function distinctValues(attribute, options, userData) {             };
    
    /**
     * adds an object of the Entity type passed as parameter to the end of the entity collection to which it is applied
     *
     * @method add
     * @param {Entity} entity
     */
    this.add = function add(entity) {             };
    
    /**
     * returns the DatastoreClass where the entity collection to which this method is applied belongs
     *
     * @method getDataClass
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass() {        return new DatastoreClass( );     };
    
    /**
     * executes a function on each entity of the entity collection to which it is applied, in ascending order
     *
     * @method forEach
     * @param {Object} options
     * @param {Object} userData
     */
    this.forEach = function forEach(options, userData) {             };
    
    /**
     * executes a datastore class method on the entity, entity collection or datastore class to which it is applied
     *
     * @method callMethod
     * @param {Object} options
     * @param {String} params
     * @return {Mixed}
     */
    this.callMethod = function callMethod(options, params) {        return 0 || '' || true || {} || null;     };
    
    /**
     * sorts the entities of the entity collection or datastore class to which it is applied and returns a new entity collection containing sorted data
     *
     * @method orderBy
     * @param {String | DatastoreClassAttribute} attributeList
     * @param {String} sortOrder
     * @param {Object} options
     * @param {Object} userData
     */
    this.orderBy = function orderBy(attributeList, sortOrder, options, userData) {             };
    
    /**
     * retrieves the entity whose position is passed in position parameter from the entity collection to which it is applied
     *
     * @method getEntity
     * @param {Number} position
     * @param {Object} options
     * @param {Object} userData
     * @return {Entity}
     */
    this.getEntity = function getEntity(position, options, userData) {        return new Entity( );     };
    
    /**
     * creates and returns a  JavaScript array where each element is an object containing a set of  properties and values corresponding to the attribute names and values of  the datastore class to which the method is applied
     *
     * @method toArray
     * @param {String} attributeList
     * @param {Object} options
     * @param {Object} userData
     */
    this.toArray = function toArray(attributeList, options, userData) {             };
    
    /**
     * returns a new entity collection based on the entity Selection you passed in the entitySelection parameter
     *
     * @method buildFromSelection
     * @param {Selection} entitySelection
     * @param {Object} options
     * @param {Object} userData
     * @return {EntityCollection}
     */
    this.buildFromSelection = function buildFromSelection(entitySelection, options, userData) {        return new EntityCollection( );     };
    
    /**
     * searches among all the entities of the datastore class or entity collection for those meeting the search criteria specified in queryString and returns a new object containing the entities found
     *
     * @method query
     * @param {String} queryString
     * @param {Object} options
     * @param {Object} userData
     * @return {EntityCollection}
     */
    this.query = function query(queryString, options, userData) {        return new EntityCollection( );     };
    

};


WAF.DataStore = function WAF_DataStore() {
    
    
    /**
     * 
     *
     * @property ds
     * @attributes ReadOnly
     * @type Datastore
     */
    this.ds =  new Datastore( ); 
    
    /**
     * 
     *
     * @property [className]
     * @attributes ReadOnly
     * @type DatastoreClass
     */
    this[className] =  new DatastoreClass( ); 
    
    
    /**
     * returns all the datastore classes specified in the model of the current datastore, as well as their attributes and methods
     *
     * @method getDataClasses
     * @return {Object}
     */
    this.getDataClasses = function getDataClasses() {        return {};     };
    
    /**
     * returns the&amp;nbsp;DatastoreClass type object whose name is the same as the string passed in the className parameter in the current datastore
     *
     * @method getDataClass
     * @param {String} className
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass(className) {        return new DatastoreClass( );     };
    

};


WAF.DataClass = function WAF_DataClass() {
    
    
    
    /**
     * returns the name of an entity  collection of the datastore class
     *
     * @method getCollectionName
     * @return {String}
     */
    this.getCollectionName = function getCollectionName() {        return '';     };
    
    /**
     * clears the entity cache on the client for the datastore class to which it is applied
     *
     * @method clearCache
     */
    this.clearCache = function clearCache() {             };
    
    /**
     * returns the datastore of the datastore class to which it is applied
     *
     * @method getDataStore
     * @return {Datastore}
     */
    this.getDataStore = function getDataStore() {        return new Datastore( );     };
    
    /**
     * retrieves the entity whose primary key value is passed in the keyValue parameter within the datastore class to which it is applied
     *
     * @method getEntity
     * @param {Mixed} keyValue
     * @param {Object} options
     * @param {Object} userData
     * @return {Entity}
     */
    this.getEntity = function getEntity(keyValue, options, userData) {        return new Entity( );     };
    
    /**
     * sets a new size on the client for the entity cache of the datastore class to which it is applied
     *
     * @method setCacheSize
     * @param {Number} cacheSize
     */
    this.setCacheSize = function setCacheSize(cacheSize) {             };
    
    /**
     * returns the current size of the entity cache on the client for the datastore class to which it is applied
     *
     * @method getCacheSize
     * @return {Number}
     */
    this.getCacheSize = function getCacheSize() {        return 0;     };
    
    /**
     * returns an object containing the list of all the attributes of the datastore class to which it is applied
     *
     * @method getAttributes
     * @return {Object}
     */
    this.getAttributes = function getAttributes() {        return {};     };
    
    /**
     * returns an object containing the datastore attribute whose name is passed in the attributeName parameter as a string
     *
     * @method getAttributeByName
     * @param {String} attributeName
     * @return {DatastoreClassAttribute}
     */
    this.getAttributeByName = function getAttributeByName(attributeName) {        return new DatastoreClassAttribute( );     };
    
    /**
     * retrieves an array containing all the distinct values stored in the attribute attribute for the entity collection or datastore class to which it is applied
     *
     * @method distinctValues
     * @param {DatastoreClassAttribute | String} attribute
     * @param {Object} options
     * @param {Object} userData
     */
    this.distinctValues = function distinctValues(attribute, options, userData) {             };
    
    /**
     * executes a datastore class method on the entity, entity collection or datastore class to which it is applied
     *
     * @method callMethod
     * @param {Object} options
     * @param {String} params
     * @return {Mixed}
     */
    this.callMethod = function callMethod(options, params) {        return 0 || '' || true || {} || null;     };
    
    /**
     * applies the search criteria specified in the queryString to all of the entities of the DatastoreClass to which it is applied and returns the first entity found in an object of the Entity type
     *
     * @method find
     * @param {String} queryString
     * @param {Object} options
     * @param {Object} userData
     */
    this.find = function find(queryString, options, userData) {             };
    
    /**
     * searches among all the entities of the datastore class or entity collection for those meeting the search criteria specified in queryString and returns a new object containing the entities found
     *
     * @method query
     * @param {String} queryString
     * @param {Object} options
     * @param {Object} userData
     * @return {EntityCollection}
     */
    this.query = function query(queryString, options, userData) {        return new EntityCollection( );     };
    
    /**
     * creates a new blank object of the EntityCollection type attached to the datastore class to which it is applied
     *
     * @method newCollection
     * @param {Object} colRef
     * @param {Object} options
     * @param {Object} userData
     * @return {EntityCollection}
     */
    this.newCollection = function newCollection(colRef, options, userData) {        return new EntityCollection( );     };
    
    /**
     * creates a new entity in the datastore class to which it is applied and returns an empty Entity object
     *
     * @method newEntity
     * @return {Entity}
     */
    this.newEntity = function newEntity() {        return new Entity( );     };
    
    /**
     * returns, as a string, the name of the datastore class to which it is applied
     *
     * @method getName
     * @return {String}
     */
    this.getName = function getName() {        return '';     };
    

};


WAF.Entity = function WAF_Entity() {
    
    
    
    /**
     * deletes from the datastore on the server the entity to which it is applied
     *
     * @method remove
     * @param {Object} options
     * @param {Object} userData
     */
    this.remove = function remove(options, userData) {             };
    
    /**
     * saves, in the datastore, the modifications made to the entity to which it is applied
     *
     * @method save
     * @param {Object} options
     * @param {Object} userData
     */
    this.save = function save(options, userData) {             };
    
    /**
     * returns True when the entity to which it is applied has just been created on the client (and is not yet saved on the server)
     *
     * @method isNew
     * @return {Boolean}
     */
    this.isNew = function isNew() {        return true;     };
    
    /**
     * returns the current value, on the client, of the internal stamp of the entity to which it is applied
     *
     * @method getStamp
     * @return {Number}
     */
    this.getStamp = function getStamp() {        return 0;     };
    
    /**
     * returns the value of the primary key of the entity to which it is applied
     *
     * @method getKey
     * @return {String | Number}
     */
    this.getKey = function getKey() {        return '' || 0;     };
    
    /**
     * returns the DatastoreClass where the entity to which this method is applied belongs
     *
     * @method getDataClass
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass() {        return new DatastoreClass( );     };
    
    /**
     * returns True or False according to whether or not the entity or the attribute of the entity to which it is applied has been modified
     *
     * @method isTouched
     * @return {Boolean}
     */
    this.isTouched = function isTouched() {        return true;     };
    
    /**
     * indicates that the entity or one of its attributes where this method is applied must be saved during the next save
     *
     * @method touch
     */
    this.touch = function touch() {             };
    
    /**
     * executes a datastore class method on the entity, entity collection or datastore class to which it is applied
     *
     * @method callMethod
     * @param {Object} options
     * @param {String} params
     * @return {Mixed}
     */
    this.callMethod = function callMethod(options, params) {        return 0 || '' || true || {} || null;     };
    

};


WAF.Selection = function WAF_Selection() {
    
    
    
    /**
     * returns true if the entity whose position you passed in pos is currently selected in the entity collection
     *
     * @method isSelected
     * @param {Number} pos
     * @return {Boolean}
     */
    this.isSelected = function isSelected(pos) {        return true;     };
    
    /**
     * returns the number of entities in the Selection object
     *
     * @method countSelected
     * @return {Number}
     */
    this.countSelected = function countSelected() {        return 0;     };
    
    /**
     * returns true if the Selection works in single selection mode and false otherwise
     *
     * @method isSingleMode
     * @return {Boolean}
     */
    this.isSingleMode = function isSingleMode() {        return true;     };
    
    /**
     * returns true if the Selection works in multiple selection mode and false  otherwise
     *
     * @method isMultipleMode
     * @return {Boolean}
     */
    this.isMultipleMode = function isMultipleMode() {        return true;     };
    
    /**
     * adds to the Selection the entity whose position you passed in pos
     *
     * @method select
     * @param {Number} pos
     * @param {Boolean} addToSel
     */
    this.select = function select(pos, addToSel) {             };
    
    /**
     * adds to the Selection the entities whose range you defined using the startPos and endPos
     *
     * @method selectRange
     * @param {Number} startPos
     * @param {Number} endPos
     * @param {Boolean} addToSel
     */
    this.selectRange = function selectRange(startPos, endPos, addToSel) {             };
    
    /**
     * returns an array of the selected entity positions in the parent entity collection
     *
     * @method getSelectedRows
     * @return {Array}
     */
    this.getSelectedRows = function getSelectedRows() {        return [];     };
    
    /**
     * executes a function on each entity of the Selection to which it is applied, in ascending order
     *
     * @method forEach
     * @param {Object} options
     * @param {Object} userData
     */
    this.forEach = function forEach(options, userData) {             };
    

};

