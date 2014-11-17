/**
 *
 * 
 *
 * @class Model
 * @extends Object
 *
 */
Attribute = function Attribute() {
    
    
    
    /**
     * define the JavaScript function that describes how the calculated Attribute must be sorted when an order by operation is triggered on it
     *
     * @method onSort
     * @param {Function} jsCode
     */
    this.onSort = function onSort(jsCode) {             };
    
    /**
     * define the JavaScript function to execute when the calculated Attribute is used in a query
     *
     * @method onQuery
     * @param {Function} jsCode
     */
    this.onQuery = function onQuery(jsCode) {             };
    
    /**
     * define the JavaScript function that describes how a value entered in the calculated Attribute will be processed
     *
     * @method onSet
     * @param {Function} jsCode
     */
    this.onSet = function onSet(jsCode) {             };
    
    /**
     * define the JavaScript function that describes how the calculated Attribute value will be evaluated
     *
     * @method onGet
     * @param {Function} jsCode
     */
    this.onGet = function onGet(jsCode) {             };
    
    /**
     * associate an event listener function with the attribute
     *
     * @method addEventListener
     * @param {String} event
     * @param {Function} jsCode
     */
    this.addEventListener = function addEventListener(event, jsCode) {             };
    

};


DatastoreClass = function DatastoreClass() {
    
    
    /**
     * 
     *
     * @property {attributeName}
     * @attributes 
     * @type DatastoreClassAttribute
     */
    this.{attributeName} =  new DatastoreClassAttribute( ); 
    
    
    /**
     * 
     *
     * @method addRelatedEntities
     * @param {String} name
     * @param {String} type
     * @param {String} path
     * @param {Object} option
     */
    this.addRelatedEntities = function addRelatedEntities(name, type, path, option) {             };
    
    /**
     * adds a new relatedEntity attribute to the datastore class
     *
     * @method addRelatedEntity
     * @param {String} name
     * @param {String} type
     * @param {String} path
     * @param {Object} option
     */
    this.addRelatedEntity = function addRelatedEntity(name, type, path, option) {             };
    
    /**
     * define a datastore class method and add it to the current class
     *
     * @method addMethod
     * @param {String} name
     * @param {String} type
     * @param {Function} jsCode
     * @param {String} scope
     */
    this.addMethod = function addMethod(name, type, jsCode, scope) {             };
    
    /**
     * associate an event listener function with the datastore class
     *
     * @method addEventListener
     * @param {String} event
     * @param {Function} jsCode
     */
    this.addEventListener = function addEventListener(event, jsCode) {             };
    
    /**
     * adds a new attribute to the datastore class
     *
     * @method addAttribute
     * @param {String} name
     * @param {String | Null} kind
     * @param {String} type
     * @param {String} indexOrPath
     * @param {Object} options
     * @return {DatastoreClassAttribute}
     */
    this.addAttribute = function addAttribute(name, kind, type, indexOrPath, options) {        return new DatastoreClassAttribute( );     };
    
    /**
     * associate a restricting query with the datastore class
     *
     * @method setRestrictingQuery
     * @param {String} queryStatement
     */
    this.setRestrictingQuery = function setRestrictingQuery(queryStatement) {             };
    
    /**
     * define one or several properties for the datastore class
     *
     * @method setProperties
     * @param {Object} properties
     */
    this.setProperties = function setProperties(properties) {             };
    

};


DataStoreCatalog = function DataStoreCatalog() {
    
    
    /**
     * 
     *
     * @property {className}
     * @attributes 
     * @type DatastoreClass
     */
    this.{className} =  new DatastoreClass( ); 
    
    
    /**
     * allows you to reference  and use a remote catalog in your current Wakanda model reference
     *
     * @method addOutsideCatalog
     * @param {String} localName
     * @param {String} hostName
     * @param {String} user
     * @param {String} password
     * @param {Object} options
     */
    this.addOutsideCatalog = function addOutsideCatalog(localName, hostName, user, password, options) {             };
    
    /**
     * adds a new datastore class to the current dynamic model
     *
     * @method addClass
     * @param {String} className
     * @param {String} collectionName
     * @param {String | Null} extendedClass
     * @param {String | Null} scope
     * @param {Object} properties
     * @return {DatastoreClass}
     */
    this.addClass = function addClass(className, collectionName, extendedClass, scope, properties) {        return new DatastoreClass( );     };
    

};

