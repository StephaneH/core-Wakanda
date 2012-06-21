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
 * Updated September 27, 2011 - Methods and properties for managing Directory, Group and User objects
 *
 * @class Users and Groups
 * @extends Object
 *
 */
ConnectionSession = function ConnectionSession() {
    
    
    /**
     * 
     *
     * @property user
     * @attributes ReadOnly
     * @type User | Null
     */
    this.user =  new User( ) || new Null( ); 
    
    
    /**
     * returns true if the current session belongs to the group and throws an error if false
     *
     * @method checkPermission
     * @param {String | Group} group
     * @return {Boolean}
     */
    this.checkPermission = function checkPermission(group) {        return true;     };
    
    /**
     * returns true if the current session belongs to the group
     *
     * @method belongsTo
     * @param {String | Group} group
     * @return {Boolean}
     */
    this.belongsTo = function belongsTo(group) {        return true;     };
    

};


Directory = function Directory() {
    
    
    /**
     * contains the entire Wakanda users and groups directory as a datastore object
     *
     * @property internalStore
     * @attributes ReadOnly
     * @type Datastore
     */
    this.internalStore =  new Datastore( ); 
    
    
    /**
     * returns the name of the loginListener function set by setLoginListener( ) for the solution, if any
     *
     * @method getLoginListener
     * @return {String}
     */
    this.getLoginListener = function getLoginListener() {        return '';     };
    
    /**
     * set a loginListener function to handle login requests for your Wakanda solution
     *
     * @method setLoginListener
     * @param {String} loginListener
     */
    this.setLoginListener = function setLoginListener(loginListener) {             };
    
    /**
     * saves all changes made to the open solution directory
     *
     * @method save
     * @param {String | File} backup
     * @return {Boolean}
     */
    this.save = function save(backup) {        return true;     };
    
    /**
     * returns all groups whose name starts with filterString in the Directory
     *
     * @method filterGroups
     * @param {String} filterString
     * @return {Array}
     */
    this.filterGroups = function filterGroups(filterString) {        return [];     };
    
    /**
     * returns all users whose names starts with filterString in the Directory
     *
     * @method filterUsers
     * @param {String} filterString
     * @return {Array}
     */
    this.filterUsers = function filterUsers(filterString) {        return [];     };
    
    /**
     * returns a Group object containing the group corresponding to the name (or ID) you passed in the name parameter
     *
     * @method group
     * @param {String} name
     * @return {Group | Null}
     */
    this.group = function group(name) {        return new Group( ) || new Null( );     };
    
    /**
     * returns an User object containing the user corresponding to the name (or ID) you passed in the name parameter
     *
     * @method user
     * @param {String} name
     * @return {User | Null}
     */
    this.user = function user(name) {        return new User( ) || new Null( );     };
    
    /**
     * creates a new user in the solution&#39;s Directory and returns it as a User object
     *
     * @method addUser
     * @param {String} name
     * @param {String} password
     * @param {String} fullName
     * @return {User}
     */
    this.addUser = function addUser(name, password, fullName) {        return new User( );     };
    
    /**
     * creates a new group in the solution&#39;s Directory and returns it as a Group object
     *
     * @method addGroup
     * @param {String} name
     * @param {String} fullName
     * @return {Group}
     */
    this.addGroup = function addGroup(name, fullName) {        return new Group( );     };
    

};


Group = function Group() {
    
    
    /**
     * contains the full name of the Group
     *
     * @property fullName
     * @attributes ReadOnly
     * @type String
     */
    this.fullName =  ''; 
    
    /**
     * contains the internal ID of the Group
     *
     * @property ID
     * @attributes ReadOnly
     * @type String
     */
    this.ID =  ''; 
    
    /**
     * contains the name of the Group
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    
    /**
     * returns an array of the subgroups belonging to the Group, filtered using the filterString parameter
     *
     * @method filterChildren
     * @param {String} filtrerString
     * @param {Boolean | String} level
     * @return {Array}
     */
    this.filterChildren = function filterChildren(filtrerString, level) {        return [];     };
    
    /**
     * returns an array of the groups to which the User or the Group belongs, filtered using the filterString parameter
     *
     * @method filterParents
     * @param {String} filterString
     * @param {Boolean | String} level
     * @return {Array}
     */
    this.filterParents = function filterParents(filterString, level) {        return [];     };
    
    /**
     * returns an array of the groups to which either User or Group belongs
     *
     * @method getParents
     * @param {Boolean | String} level
     * @return {Array}
     */
    this.getParents = function getParents(level) {        return [];     };
    
    /**
     * returns an array of the subgroups belonging to the Group
     *
     * @method getChildren
     * @param {Boolean | String} level
     * @return {Array}
     */
    this.getChildren = function getChildren(level) {        return [];     };
    
    /**
     * returns an array of users belonging to the Group
     *
     * @method getUsers
     * @param {Boolean | String} level
     * @return {Array}
     */
    this.getUsers = function getUsers(level) {        return [];     };
    
    /**
     * returns an array of the users that belong directly or indirectly to the Group, filtered using the filterString parameter
     *
     * @method filterUsers
     * @param {String} filterString
     * @param {Boolean | String} level
     * @return {Array}
     */
    this.filterUsers = function filterUsers(filterString, level) {        return [];     };
    
    /**
     * adds Group to the group(s) you passed in the groupList parameter
     *
     * @method putInto
     * @param {String | Array} groupList
     */
    this.putInto = function putInto(groupList) {             };
    
    /**
     * removes the User or Group from the solution&#39;s Directory
     *
     * @method remove
     */
    this.remove = function remove() {             };
    
    /**
     * removes the Group from the group(s) you passed in the groupList parameter
     *
     * @method removeFrom
     * @param {String | Array} groupList
     */
    this.removeFrom = function removeFrom(groupList) {             };
    

};


User = function User() {
    
    
    /**
     * contains the internal ID of the User
     *
     * @property ID
     * @attributes ReadOnly
     * @type String
     */
    this.ID =  ''; 
    
    /**
     * contains the full name of the User
     *
     * @property fullName
     * @attributes ReadOnly
     * @type String
     */
    this.fullName =  ''; 
    
    /**
     * contains the name of the User
     *
     * @property name
     * @attributes ReadOnly
     * @type String
     */
    this.name =  ''; 
    
    
    /**
     * returns an array of the groups to which the User or the Group belongs, filtered using the filterString parameter
     *
     * @method filterParents
     * @param {String} filterString
     * @param {Boolean | String} level
     * @return {Array}
     */
    this.filterParents = function filterParents(filterString, level) {        return [];     };
    
    /**
     * returns an array of the groups to which either User or Group belongs
     *
     * @method getParents
     * @param {Boolean | String} level
     * @return {Array}
     */
    this.getParents = function getParents(level) {        return [];     };
    
    /**
     * allows you to change the password for the User
     *
     * @method setPassword
     * @param {String} password
     */
    this.setPassword = function setPassword(password) {             };
    
    /**
     * adds the User to the group(s) you passed in the groupList parameter
     *
     * @method putInto
     * @param {String | Array} groupList
     */
    this.putInto = function putInto(groupList) {             };
    
    /**
     * removes the User or Group from the solution&#39;s Directory
     *
     * @method remove
     */
    this.remove = function remove() {             };
    
    /**
     * removes the User from the group(s) you passed in the groupList parameter
     *
     * @method removeFrom
     * @param {String | Array} groupList
     */
    this.removeFrom = function removeFrom(groupList) {             };
    

};

