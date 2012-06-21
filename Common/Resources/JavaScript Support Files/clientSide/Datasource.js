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
 * Updated September 28, 2011 - High-level client-side JavaScript API for managing datasources based on the server or locally.
 *
 * @class Datasource
 * @extends Object
 *
 */
WAF.DataSource = function WAF_DataSource() {
    
    
    /**
     * 
     *
     * @property length
     * @attributes ReadOnly
     * @type Number
     */
    this.length =  0; 
    
    
    /**
     * returns the current element of the datasource to which it is applied
     *
     * @method getCurrentElement
     * @return {Entity | Object}
     */
    this.getCurrentElement = function getCurrentElement() {        return new Entity( ) || {};     };
    
    /**
     * declares the relation attribute(s) of the datasource whose  values you want to precalculate when creating or updating its current  entity or entity collection from the server (always Undefined for local datasources)
     *
     * @method declareDependencies
     * @param {String} attributePath
     */
    this.declareDependencies = function declareDependencies(attributePath) {             };
    
    /**
     * selects the previous element (if any) in the datasource to which it is applied
     *
     * @method selectPrevious
     * @param {Object} options
     * @param {Object} userData
     */
    this.selectPrevious = function selectPrevious(options, userData) {             };
    
    /**
     * selects the next element (if any) in the datasource to which it is applied
     *
     * @method selectNext
     * @param {Object} options
     * @param {Object} userData
     */
    this.selectNext = function selectNext(options, userData) {             };
    
    /**
     * selects the element whose position is passed in the position parameter in the datasource to which it is applied
     *
     * @method select
     * @param {Number} position
     * @param {Object} options
     * @param {Object} userData
     */
    this.select = function select(position, options, userData) {             };
    
    /**
     * returns the position of the current entity within the current entity collection for a server datasource or returns the position of the current element within a local datasource of the Array type
     *
     * @method getPosition
     * @return {Number}
     */
    this.getPosition = function getPosition() {        return 0;     };
    
    /**
     * retrieves the element whose position is passed in the position parameter in the datasource to which it is applied but without changing the current element
     *
     * @method getElement
     * @param {Number} position
     * @param {Object} options
     * @param {Object} userData
     */
    this.getElement = function getElement(position, options, userData) {             };
    
    /**
     * simulates the generation of an event that did not occur for the datasource to which it is applied
     *
     * @method dispatch
     * @param {String} eventKind
     */
    this.dispatch = function dispatch(eventKind) {             };
    
    /**
     * calls the datasource manager which looks for any values modified in the datasource and then generates the corresponding events so as to notify any listeners and widgets that are subscribed to them
     *
     * @method autoDispatch
     * @param {Object} options
     */
    this.autoDispatch = function autoDispatch(options) {             };
    
    /**
     * adds a new listener to a specific event of the datasource to which it is applied
     *
     * @method addListener
     * @param {String} eventKind
     * @param {Function} eventHandler
     * @param {Object} userData
     * @return {Number}
     */
    this.addListener = function addListener(eventKind, eventHandler, userData) {        return 0;     };
    
    /**
     * returns the ID (i.e., the name) of the datasource as it is defined in the GUI Designer
     *
     * @method getID
     * @return {String}
     */
    this.getID = function getID() {        return '';     };
    
    /**
     * returns an object containing the datasource attribute whose name or path is passed in the attributeName parameter as well as its properties
     *
     * @method getAttribute
     * @param {String} attributeName
     * @return {DatasourceAttribute}
     */
    this.getAttribute = function getAttribute(attributeName) {        return new DatasourceAttribute( );     };
    
    /**
     * gets the values of the current entity from the server as they  will be (or have been) saved in the end in the datastore (always Undefined for local datasources)
     *
     * @method serverRefresh
     * @param {Object} options
     * @param {Object} userData
     */
    this.serverRefresh = function serverRefresh(options, userData) {             };
    
    /**
     * returns True when the current element of the datasource is new and has never been saved on the server; or False othewise (always False for local datasources)
     *
     * @method isNewElement
     * @return {Boolean}
     */
    this.isNewElement = function isNewElement() {        return true;     };
    
    /**
     * removes all the listeners set for the datasource to which it is applied
     *
     * @method removeAllListeners
     */
    this.removeAllListeners = function removeAllListeners() {             };
    
    /**
     * removes the listener whose ID number you passed in the&amp;nbsp;params parameter
     *
     * @method removeListener
     * @param {Object} params
     */
    this.removeListener = function removeListener(params) {             };
    
    /**
     * returns a Selection object referencing the currently selected entities in the datasource
     *
     * @method getSelection
     * @return {Selection}
     */
    this.getSelection = function getSelection() {        return new Selection( );     };
    

};


WAF.DataSourceEm = function WAF_DataSourceEm() {
    
    
    
    /**
     * changes the current entity in the datasource to which it is applied to the entity passed in the entity parameter
     *
     * @method setCurrentEntity
     * @param {Entity} entity
     */
    this.setCurrentEntity = function setCurrentEntity(entity) {             };
    
    /**
     * creates and returns a JavaScript array where each element is an object containing a set of properties and values corresponding to the attribute names and values of the datasource to which the method is applied
     *
     * @method toArray
     * @param {String} attributeList
     * @param {Object} options
     * @param {Object} userData
     */
    this.toArray = function toArray(attributeList, options, userData) {             };
    
    /**
     * replaces the current entity collection of the datasource to which it is applied by the one passed in the newCollection parameter.
     *
     * @method setEntityCollection
     * @param {EntityCollection} newCollection
     * @param {Object} options
     * @param {Object} userData
     */
    this.setEntityCollection = function setEntityCollection(newCollection, options, userData) {             };
    
    /**
     * executes a datastore class method on the server datasource where it is defined
     *
     * @method callMethod
     * @param {Object} options
     * @param {String} params
     * @return {Mixed}
     */
    this.callMethod = function callMethod(options, params) {        return 0 || '' || true || {} || null;     };
    
    /**
     * returns an array containing all the distinct values stored in the attribute attribute for the current entity collection of the datasource to which it is applied
     *
     * @method distinctValues
     * @param {DatasourceAttribute} attributeName
     * @param {Object} options
     * @param {Object} userData
     */
    this.distinctValues = function distinctValues(attributeName, options, userData) {             };
    
    /**
     * searches for entities meeting the search criteria specified in queryString among all the entities of the datastore class for the datasource to which it is applied
     *
     * @method query
     * @param {String} queryString
     * @param {Object} options
     * @param {Object} userData
     */
    this.query = function query(queryString, options, userData) {             };
    
    /**
     * sorts the current entity collection of the datasource to which it is applied
     *
     * @method orderBy
     * @param {String} sortOrder
     * @param {Object} options
     * @param {Object} userData
     */
    this.orderBy = function orderBy(sortOrder, options, userData) {             };
    
    /**
     * same as query() method except it restricts the  search to the current entity collection of the datasource to which it is  applied
     *
     * @method filterQuery
     * @param {String} queryString
     * @param {Object} options
     * @param {Object} userData
     */
    this.filterQuery = function filterQuery(queryString, options, userData) {             };
    
    /**
     * returns in the current entity collection of the datasource to which it is applied, all the entities of the datastore class of the datasource
     *
     * @method allEntities
     * @param {Object} options
     * @param {Object} userData
     */
    this.allEntities = function allEntities(options, userData) {             };
    
    /**
     * returns the title (i.e. the name) of the datastore class to which the server datasource is attached in the form of a String.
     *
     * @method getClassTitle
     * @return {String}
     */
    this.getClassTitle = function getClassTitle() {        return '';     };
    
    /**
     * returns an object containing the attribute whose name or path (relation attribute) is passed in the attributeName parameter and its properties
     *
     * @method getClassAttributeByName
     * @param {String} attributeName
     * @return {DatastoreClassAttribute}
     */
    this.getClassAttributeByName = function getClassAttributeByName(attributeName) {        return new DatastoreClassAttribute( );     };
    
    /**
     * returns the datastore class from which the server datasource comes
     *
     * @method getDataClass
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass() {        return new DatastoreClass( );     };
    
    /**
     * returns the current entity collection of the datasource to which it is applied
     *
     * @method getEntityCollection
     * @return {EntityCollection}
     */
    this.getEntityCollection = function getEntityCollection() {        return new EntityCollection( );     };
    
    /**
     * returns the current value of the datasource attribute whose name or path is passed in the attributeName parameter.
     *
     * @method getAttributeValue
     * @param {String} attributeName
     * @return {Mixed}
     */
    this.getAttributeValue = function getAttributeValue(attributeName) {        return 0 || '' || true || {} || null;     };
    
    /**
     * returns the names of all the first level attributes of the datasource in an array of strings
     *
     * @method getAttributeNames
     * @return {Array}
     */
    this.getAttributeNames = function getAttributeNames() {        return [];     };
    
    /**
     * saves, on the server, the current entity of the datasource to which it is applied
     *
     * @method save
     * @param {Object} options
     * @param {Object} userData
     */
    this.save = function save(options, userData) {             };
    
    /**
     * creates a new blank entity in the datasource to which it is applied and makes it the new current entity
     *
     * @method newEntity
     * @param {Object} options
     * @param {Object} userData
     */
    this.newEntity = function newEntity(options, userData) {             };
    
    /**
     * deletes the current element of the datasource to which it is applied
     *
     * @method removeCurrent
     * @param {Object} options
     * @param {Object} userData
     */
    this.removeCurrent = function removeCurrent(options, userData) {             };
    
    /**
     * adds a new blank element locally to the datasource to which it is applied
     *
     * @method addNewElement
     * @param {Object} options
     * @param {Object} userData
     */
    this.addNewElement = function addNewElement(options, userData) {             };
    
    /**
     * adds the entity passed as parameter to the current entity collection of the datasource to which it is applied
     *
     * @method addEntity
     * @param {Entity} entity
     */
    this.addEntity = function addEntity(entity) {             };
    
    /**
     * replaces the current entity collection of the datasource to which it is applied by the Selection you passed in the entitySelection parameter
     *
     * @method buildFromSelection
     * @param {Selection} entitySelection
     * @param {Object} options
     * @param {Object} userData
     */
    this.buildFromSelection = function buildFromSelection(entitySelection, options, userData) {             };
    

};


WAF.DataSourceVar = function WAF_DataSourceVar() {
    
    
    
    /**
     * synchronizes a local datasource with the variable, array or object on which it is based
     *
     * @method sync
     */
    this.sync = function sync() {             };
    
    /**
     * returns the name of the JavaScript variable, array or object to which the local datasource is binded
     *
     * @method getClassTitle
     * @return {String}
     */
    this.getClassTitle = function getClassTitle() {        return '';     };
    
    /**
     * 
     *
     * @method mustResolveOnFirstLevel
     */
    this.mustResolveOnFirstLevel = function mustResolveOnFirstLevel() {             };
    
    /**
     * 
     *
     * @method resolveSource
     */
    this.resolveSource = function resolveSource() {             };
    
    /**
     * returns an object containing the attribute whose name or path (relation attribute) is passed in the attributeName parameter and its properties
     *
     * @method getClassAttributeByName
     * @param {String} attributeName
     * @return {DatastoreClassAttribute}
     */
    this.getClassAttributeByName = function getClassAttributeByName(attributeName) {        return new DatastoreClassAttribute( );     };
    
    /**
     * returns an object containing the attributes of the JavaScript variable to which the local datasource is binded
     *
     * @method getDataClass
     * @return {Object}
     */
    this.getDataClass = function getDataClass() {        return {};     };
    
    /**
     * has no effect on local datasources and always returns Undefined
     *
     * @method save
     */
    this.save = function save() {             };
    
    /**
     * returns the current value of the attribute named attributeName in the local datasource of the Array type to which it is applied
     *
     * @method getAttributeValue
     * @param {String} attributeName
     * @return {Mixed}
     */
    this.getAttributeValue = function getAttributeValue(attributeName) {        return 0 || '' || true || {} || null;     };
    
    /**
     * returns in a string array the names of all the attributes for the local datasource of the Array type to which it is applied
     *
     * @method getAttributeNames
     * @return {Array}
     */
    this.getAttributeNames = function getAttributeNames() {        return [];     };
    
    /**
     * deletes the current element of the datasource to which it is applied
     *
     * @method removeCurrent
     * @param {Object} options
     * @param {Object} userData
     */
    this.removeCurrent = function removeCurrent(options, userData) {             };
    
    /**
     * adds a new blank element locally to the datasource to which it is applied
     *
     * @method addNewElement
     * @param {Object} options
     */
    this.addNewElement = function addNewElement(options) {             };
    

};


WAF.DataSourceEmRelatedAttributeValue = function WAF_DataSourceEmRelatedAttributeValue() {
    
    
    
    /**
     * retrieves the related entity of the relation attribute for the current entity of the datasource to which it is applied
     *
     * @method load
     * @param {Object} options
     * @param {Object} userData
     */
    this.load = function load(options, userData) {             };
    
    /**
     * assigns the entity to the relation attribute of the current entity of the datasource to which it is applied
     *
     * @method set
     * @param {DataSource | Entity | Null} entity
     */
    this.set = function set(entity) {             };
    

};


WAF.DataSourceEmSimpleAttribute = function WAF_DataSourceEmSimpleAttribute() {
    
    
    
    /**
     * installs a listener on the attribute of the datasource to which it is applied
     *
     * @method addListener
     * @param {Function} eventHandler
     * @param {Object} userData
     * @return {Number}
     */
    this.addListener = function addListener(eventHandler, userData) {        return 0;     };
    
    /**
     * forces the triggering of an event on the datasource attribute to which it is applied
     *
     * @method dispatch
     */
    this.dispatch = function dispatch() {             };
    
    /**
     * 
     *
     * @method 
     * @param {Mixed} value
     * @return {Mixed}
     */
    this. = function (value) {        return 0 || '' || true || {} || null;     };
    
    /**
     * returns the current value of the attribute to which it is applied in a form compatible with input in a widget
     *
     * @method getValueForInput
     * @return {String}
     */
    this.getValueForInput = function getValueForInput() {        return '';     };
    
    /**
     * returns the previous value of the datasource attribute to which it is applied
     *
     * @method getOldValue
     * @return {Mixed}
     */
    this.getOldValue = function getOldValue() {        return 0 || '' || true || {} || null;     };
    
    /**
     * returns the current value of the datastore class type datasource attribute to which it is applied
     *
     * @method getValue
     * @return {Mixed}
     */
    this.getValue = function getValue() {        return 0 || '' || true || {} || null;     };
    

};

