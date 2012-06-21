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
 * Client-side API to handle user login.
 *
 * @class Directory
 * @extends Object
 *
 */
WAF.directory = function WAF_directory() {
    
    
    
    /**
     * authenticates a user on the server by her or his name and HA1 key and, in case of success, opens a new user session on the server
     *
     * @method loginByKey
     * @param {String} name
     * @param {String} key
     * @param {Object} options
     * @return {Boolean}
     */
    this.loginByKey = function loginByKey(name, key, options) {        return true;     };
    
    /**
     * shortcut to the login( ) method
     *
     * @method loginByPassword
     * @param {String} name
     * @param {String} password
     * @param {Object} options
     * @return {Boolean}
     */
    this.loginByPassword = function loginByPassword(name, password, options) {        return true;     };
    
    /**
     * authenticates a user on the server and, in case of success, opens a new user session on the  server
     *
     * @method login
     * @param {String} name
     * @param {String} password
     * @param {Object} options
     * @return {Boolean}
     */
    this.login = function login(name, password, options) {        return true;     };
    
    /**
     * logs out the user from the server and closes the current user session on the server
     *
     * @method logout
     * @param {Object} options
     * @return {Boolean}
     */
    this.logout = function logout(options) {        return true;     };
    
    /**
     * returns true if the current user belongs to the group
     *
     * @method currentUserBelongsTo
     * @param {String | Group} group
     * @param {Object} options
     * @return {Boolean}
     */
    this.currentUserBelongsTo = function currentUserBelongsTo(group, options) {        return true;     };
    
    /**
     * returns the user as identified by the Wakanda server
     *
     * @method currentUser
     * @return {User | Null}
     */
    this.currentUser = function currentUser() {        return new User( ) || new Null( );     };
    

};

