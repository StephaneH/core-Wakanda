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
     * returns the current element of the datasource
     *
     * @method getCurrentElement
     * @return {Entity | Object}
     */
    this.getCurrentElement = function getCurrentElement() {        return new Entity( ) || {};     };
    
    /**
     * declares the datasource&#39;s relation attribute(s) whose  values you want to precalculate when creating or updating the current  entity or entity collection from the server (always Undefined for local datasources)
     *
     * @method declareDependencies
     * @param {String} attributePath
     */
    this.declareDependencies = function declareDependencies(attributePath) {             };
    
    /**
     * selects the previous element (if any) in the datasource
     *
     * @method selectPrevious
     * @param {Object} options
     */
    this.selectPrevious = function selectPrevious(options) {             };
    
    /**
     * selects the next element (if any) in the datasource
     *
     * @method selectNext
     * @param {Object} options
     */
    this.selectNext = function selectNext(options) {             };
    
    /**
     * selects the element whose position in the datasource is passed in the position parameter
     *
     * @method select
     * @param {Number} position
     * @param {Object} options
     */
    this.select = function select(position, options) {             };
    
    /**
     * returns the position of the current entity in the entity collection for a server datasource or the position of the current element in a local datasource of type Array
     *
     * @method getPosition
     * @return {Number}
     */
    this.getPosition = function getPosition() {        return 0;     };
    
    /**
     * retrieves the element whose position in the datasource is passed in the position parameter while leaving the current element unchanged
     *
     * @method getElement
     * @param {Number} position
     * @param {Object} options
     * @param {Object} userData
     */
    this.getElement = function getElement(position, options, userData) {             };
    
    /**
     * simulates the generation of an event that did not occur for the datasource
     *
     * @method dispatch
     * @param {String} eventKind
     * @param {Object} options
     */
    this.dispatch = function dispatch(eventKind, options) {             };
    
    /**
     * calls the datasource manager that looks for any values modified in the datasource and then generates the corresponding events so as to notify any listeners and widgets that are subscribed to them
     *
     * @method autoDispatch
     * @param {Object} options
     */
    this.autoDispatch = function autoDispatch(options) {             };
    
    /**
     * adds a new listener to a specific datasource event
     *
     * @method addListener
     * @param {String} eventKind
     * @param {Function} eventHandler
     * @param {Object} userData
     * @return {Number}
     */
    this.addListener = function addListener(eventKind, eventHandler, userData) {        return 0;     };
    
    /**
     * returns the ID (i.e., the name) of the datasource as it was defined in the GUI Designer
     *
     * @method getID
     * @return {String}
     */
    this.getID = function getID() {        return '';     };
    
    /**
     * returns an object containing the datasource&#39;s attribute (and its properties) whose name or path is passed in the attributeName parameter
     *
     * @method getAttribute
     * @param {String} attributeName
     * @return {DatasourceAttribute}
     */
    this.getAttribute = function getAttribute(attributeName) {        return new DatasourceAttribute( );     };
    
    /**
     * retrieves the values of the current entity from the server as they  will be (or have been) saved in the datastore (always Undefined for local datasources)
     *
     * @method serverRefresh
     * @param {Object} options
     */
    this.serverRefresh = function serverRefresh(options) {             };
    
    /**
     * returns True when the datasource&#39;s current element is new and has not been saved on the server. Otherwise, it returns False (always False for local datasources)
     *
     * @method isNewElement
     * @return {Boolean}
     */
    this.isNewElement = function isNewElement() {        return true;     };
    
    /**
     * removes all the listeners for the datasource
     *
     * @method removeAllListeners
     */
    this.removeAllListeners = function removeAllListeners() {             };
    
    /**
     * removes the listener whose ID you passed in the&amp;nbsp;params parameter
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
     * changes the datasource&#39;s current entity to the entity passed in the entity parameter
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
     */
    this.toArray = function toArray(attributeList, options) {             };
    
    /**
     * replaces the datasource&#39;s current entity collection by the one passed in the newCollection parameter.
     *
     * @method setEntityCollection
     * @param {EntityCollection} newCollection
     * @param {Object} options
     */
    this.setEntityCollection = function setEntityCollection(newCollection, options) {             };
    
    /**
     * executes a datastore class method defined for a server datasource
     *
     * @method callMethod
     * @param {Object} options
     * @param {String} params
     * @return {Mixed}
     */
    this.callMethod = function callMethod(options, params) {        return 0 || '' || true || {} || null;     };
    
    /**
     * returns an array containing all the distinct values stored in attribute for the datasource&#39;s current entity collection
     *
     * @method distinctValues
     * @param {DatasourceAttribute} attributeName
     * @param {Object} options
     */
    this.distinctValues = function distinctValues(attributeName, options) {             };
    
    /**
     * searches for entities meeting the search criteria specified in queryString among all the entities in the datasource&#39;s datastore class
     *
     * @method query
     * @param {String} queryString
     * @param {Object} options
     */
    this.query = function query(queryString, options) {             };
    
    /**
     * sorts the datasource&#39;s current entity collection
     *
     * @method orderBy
     * @param {String} sortOrder
     * @param {Object} options
     */
    this.orderBy = function orderBy(sortOrder, options) {             };
    
    /**
     * same as query() method except it restricts the  search to the current entity collection of the datasource to which it is  applied
     *
     * @method filterQuery
     * @param {String} queryString
     * @param {Object} options
     */
    this.filterQuery = function filterQuery(queryString, options) {             };
    
    /**
     * returns all the server datasource&#39;s entities in its current entity collection
     *
     * @method allEntities
     * @param {Object} options
     */
    this.allEntities = function allEntities(options) {             };
    
    /**
     * returns the title (i.e., the name) of the datastore class to which the server datasource is attached.
     *
     * @method getClassTitle
     * @return {String}
     */
    this.getClassTitle = function getClassTitle() {        return '';     };
    
    /**
     * returns an object containing the attribute along with its properties whose name or path (relation attribute) is passed in the attributeName parameter
     *
     * @method getClassAttributeByName
     * @param {String} attributeName
     * @return {DatastoreClassAttribute}
     */
    this.getClassAttributeByName = function getClassAttributeByName(attributeName) {        return new DatastoreClassAttribute( );     };
    
    /**
     * returns the datastore class of the server datasource
     *
     * @method getDataClass
     * @return {DatastoreClass}
     */
    this.getDataClass = function getDataClass() {        return new DatastoreClass( );     };
    
    /**
     * returns the datasource&#39;s current entity collection
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
     * saves the datasource&#39;s current entity on the server
     *
     * @method save
     * @param {Object} options
     */
    this.save = function save(options) {             };
    
    /**
     * creates a new blank entity in the datasource to which it is applied and makes it the new current entity
     *
     * @method newEntity
     * @param {Object} options
     */
    this.newEntity = function newEntity(options) {             };
    
    /**
     * deletes the current element of the datasource
     *
     * @method removeCurrent
     * @param {Object} options
     */
    this.removeCurrent = function removeCurrent(options) {             };
    
    /**
     * adds a new blank element locally to the datasource
     *
     * @method addNewElement
     * @param {Object} options
     */
    this.addNewElement = function addNewElement(options) {             };
    
    /**
     * adds the entity passed as the parameter to the current entity collection of the datasource
     *
     * @method addEntity
     * @param {Entity} entity
     */
    this.addEntity = function addEntity(entity) {             };
    
    /**
     * replaces the datasource&#39;s current entity collection with the Selection passed in the entitySelection parameter
     *
     * @method buildFromSelection
     * @param {Selection} entitySelection
     * @param {Object} options
     */
    this.buildFromSelection = function buildFromSelection(entitySelection, options) {             };
    
    /**
     * sets the current element of the datasource to the entity whose primary key is passed in the key parameter
     *
     * @method selectByKey
     * @param {Number | String} key
     * @param {Object} options
     */
    this.selectByKey = function selectByKey(key, options) {             };
    

};


WAF.DataSourceVar = function WAF_DataSourceVar() {
    
    
    
    /**
     * synchronizes a local datasource with the Variable, Array, or Object to which it is based
     *
     * @method sync
     */
    this.sync = function sync() {             };
    
    /**
     * returns the name of the JavaScript variable, array or object to which the local datasource is bound
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
     * returns an object containing the attribute along with its properties whose name or path (relation attribute) is passed in the attributeName parameter
     *
     * @method getClassAttributeByName
     * @param {String} attributeName
     * @return {DatastoreClassAttribute}
     */
    this.getClassAttributeByName = function getClassAttributeByName(attributeName) {        return new DatastoreClassAttribute( );     };
    
    /**
     * returns an object containing the attributes of the JavaScript variable to which the local datasource is bound
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
     * returns the current value of the attribute attributeName in the local datasource of type Array
     *
     * @method getAttributeValue
     * @param {String} attributeName
     * @return {Mixed}
     */
    this.getAttributeValue = function getAttributeValue(attributeName) {        return 0 || '' || true || {} || null;     };
    
    /**
     * returns the names of all the attributes for the local datasource of type Array in an Array of type String
     *
     * @method getAttributeNames
     * @return {Array}
     */
    this.getAttributeNames = function getAttributeNames() {        return [];     };
    
    /**
     * deletes the current element of the datasource
     *
     * @method removeCurrent
     * @param {Object} options
     */
    this.removeCurrent = function removeCurrent(options) {             };
    
    /**
     * adds a new blank element locally to the datasource
     *
     * @method addNewElement
     * @param {Object} options
     */
    this.addNewElement = function addNewElement(options) {             };
    

};


WAF.DataSourceEmRelatedAttributeValue = function WAF_DataSourceEmRelatedAttributeValue() {
    
    
    
    /**
     * retrieves the entity for the relation attribute in the datasource&#39;s current entity
     *
     * @method load
     * @param {Object} options
     */
    this.load = function load(options) {             };
    
    /**
     * assigns the entity to the relation attribute of the datasource&#39;s current entity
     *
     * @method set
     * @param {DataSource | Entity | Null} entity
     */
    this.set = function set(entity) {             };
    

};


WAF.DataSourceEmSimpleAttribute = function WAF_DataSourceEmSimpleAttribute() {
    
    
    
    /**
     * installs a listener on the datasource&#39;s attribute
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
     * returns the current value of the attribute in a form compatible with input in a widget
     *
     * @method getValueForInput
     * @return {String}
     */
    this.getValueForInput = function getValueForInput() {        return '';     };
    
    /**
     * returns the previous value of the datasource attribute
     *
     * @method getOldValue
     * @return {Mixed}
     */
    this.getOldValue = function getOldValue() {        return 0 || '' || true || {} || null;     };
    
    /**
     * returns the current value of the datasource&#39;s attribute (from a datastore class)
     *
     * @method getValue
     * @return {Mixed}
     */
    this.getValue = function getValue() {        return 0 || '' || true || {} || null;     };
    

};

