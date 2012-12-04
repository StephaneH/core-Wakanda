/**

 * @author ouissam.gouni@4d.com

 */
 
function getClass(obj) {
    if (typeof obj === "undefined")
        return "undefined";
    if (obj === null)
        return "null";
    return Object.prototype.toString.call(obj)
    .match(/^\[object\s(.*)\]$/)[1];
}

var _testCase = {
    name: "Test UAG SSJS API - Directory class",
  
    defaultUser: {
        name: "default guest",
        ID: "00000000000000000000000000000000",
        fullName: "default guest"
    },
    
    setUp: function() {
    },
    
    _assertIsDefaultUser: function(){
        var session = application.currentSession();
        Y.Assert.isObject(session, "Session object is expected");
        Y.Assert.isNotNull(session, "Non null session object is expected");
        var actual = session.user;
        Y.ObjectAssert.areEqual(this._defaultUser, actual, "Default user is expected");  
    },

    /**
     * UAG-SSJS-DR-1 Check that directory object exists
     */
    testDirectoryObjectExists: function() {
        Y.Assert.isNotUndefined(directory);
        Y.Assert.areSame("object", typeof directory);
    },
    
    /**
     * UAG-SSJS-DR-3 Check that internalStore attribute exists
     */
    testInternalStoreAttributeExists: function() {
        Y.Assert.isNotUndefined(directory.internalStore);
        Y.Assert.areSame("object", typeof directory.internalStore);
    },
    
    /**
     * UAG-SSJS-DR-4 Check that addGroup method exists
     */
    testAddGroupMethodExists: function() {
        Y.Assert.isNotUndefined(directory.addGroup);
        Y.Assert.areSame("function", typeof directory.addGroup);
    },
    
    /**
     * UAG-SSJS-DR-4 Check that addGroup method creates a new group in the solution's Directory and returns it as a Group object.
     */
    testAddGroupMethodCreatesNewGroupAndReturnsGroupObject: function() {
        var grpName = "newGroup";
        var grpObj = directory.addGroup(grpName);
        Y.Assert.areSame("Group", getClass(grpObj));
        grpObj = directory.group(grpName);
        Y.Assert.areSame("Group", getClass(grpObj));
        Y.Assert.areSame(grpName, grpObj.name);
        //clean
        grpObj.remove();
    },
    
    /**
     * UAG-SSJS-DR-4 Check that addGroup method generate an error if the group name already exists in the datastore.
     */
    testAddGroupMethodGeneratesAnErrorIfGroupNameAlreadyExists: function() {
        var grpName = "newGroup";
        //first call
        directory.addGroup(grpName);
        //second call
        try{
            directory.addGroup(grpName);
            Y.Assert.fail("Should raise an exception");  
        }catch(e){
        }
        //clean
        var toClean = directory.group(grpName);
        toClean.remove();
    },
    
    /**
     * UAG-SSJS-DR-5 Check that addUser method exists
     */
    testAddUserMethodExists: function() {
        Y.Assert.isNotUndefined(directory.addUser);
        Y.Assert.areSame("function", typeof directory.addUser);
    },
    
    
     /**
     * UAG-SSJS-DR-5 Check that addUser method creates a new user in the solution's Directory and returns it as a User object.
     */
    testAddUserMethodCreatesNewGroupAndReturnsGroupObject: function() {
        var usrName = "newUser";
        var usrPwd = "whatever";
        var usrObj = directory.addUser(usrName, usrPwd);
        Y.Assert.areSame("User", getClass(usrObj));
        usrObj = directory.user(usrName);
        Y.Assert.areSame("User", getClass(usrObj));
        Y.Assert.areSame(usrName, usrObj.name);
        //clean
        usrObj.remove();
    },
    
    /**
     * UAG-SSJS-DR-5 Check that addUser method generate an error if the user name already exists in the datastore.
     */
    testAddUserMethodGeneratesAnErrorIfUserNameAlreadyExists: function() {
        var usrName = "newUser";
        var usrPwd = "whatever";
        //first call
        directory.addUser(usrName, usrPwd);
        //second call
        try{
            directory.addUser(usrName);
            Y.Assert.fail("Should raise an exception");  
        }catch(e){
        }
        //clean
        var toClean = directory.user(usrName);
        toClean.remove();
    },
    
    /**
     * UAG-SSJS-DR-6 Check that computeHA1 method exists
     */
    testComputeHA1MethodExists: function() {
        Y.Assert.isNotUndefined(directory.computeHA1);
        Y.Assert.areSame("function", typeof directory.computeHA1);
    },
    
     /**
     * UAG-SSJS-DR-6 Check that computeHA1 method returns the correct HA1 key resulting from the combination of userName, password and realm parameters 
     */
    testComputeHA1MethodReturnsCorrectHA1Key: function() {
        var userName = "userName";
        var password = "password";
        var realm = "realm";
        var actual = directory.computeHA1(userName, password, realm);
        var expected = require("MD5").MD5(userName + ":" + realm + ":" + password);
        Y.Assert.areSame(expected, actual);
    },
    
     /**
     * UAG-SSJS-DR-6 Check that computeHA1 method returns the correct HA1 key resulting from the combination of userName, password and default realm parameters when realm is not given 
     */
    testComputeHA1MethodReturnsCorrectHA1KeyWhenRealmIsNotGiven: function() {
        var userName = "userName";
        var password = "password";
        var defaultRealm = "Wakanda";
        var actual = directory.computeHA1(userName, password);
        var expected = require("MD5").MD5(userName + ":" + defaultRealm + ":" + password);
        Y.Assert.areSame(expected, actual);
    },
    
    /**
     * UAG-SSJS-DR-7 Check that filterGroups method exists
     */
    testFilterGroupsMethodExists: function() {
        Y.Assert.isNotUndefined(directory.filterGroups);
        Y.Assert.areSame("function", typeof directory.filterGroups);
    },
    
    /**
     * UAG-SSJS-DR-7 Check that filterGroups method returns all groups whose name starts with filterString in the Directory.
     */
    testFilterGroupsMethodLogic1: function() {
        var fstring = "*Filter";
        var actual = directory.filterGroups(fstring);
        var expected = [
          {ID:"83D9074C9AC41948B4265A8B52FD9EE6", name:"GroupFilter1",  fullName:"GroupFilter1"},
          {ID:"AFC2648008ACD34A8D14ED8A419E7BD5", name:"GroupFilter2", fullName:"GroupFilter2"},
          {ID:"1C7501B13C28594D9ADF3DEF14C2569E", name:"GroupFilter3", fullName:"GroupFilter3"}
        ];
        
        Y.ObjectAssert.areEqual(expected[0], actual[0]);
        Y.ObjectAssert.areEqual(expected[1], actual[1]);
        Y.ObjectAssert.areEqual(expected[2], actual[2]);
    },
    
    /**
     * UAG-SSJS-DR-8 Check that filterUsers method exists
     */
    testFilterUsersMethodExists: function() {
        Y.Assert.isNotUndefined(directory.filterUsers);
        Y.Assert.areSame("function", typeof directory.filterUsers);
    },
    
    /**
     * UAG-SSJS-DR-8 Check that filterUsers method returns all users whose name starts with filterString in the Directory.
     */
    testFilterUsersMethodLogic1: function() {
        var fstring = "*Filter";
        var actual = directory.filterUsers(fstring);
        var expected = [
          {ID:"1092D76D04DED84BBF761BD2312BE140", name:"userFilter1",  fullName:""},
          {ID:"D77BB7A86C990A4AB0B3A7730801485C", name:"userFilter2", fullName:""},
          {ID:"24B20582DF76D74E9BAC2E3406165280", name:"userFilter3", fullName:""}
        ];
        
        Y.ObjectAssert.areEqual(expected[0], actual[0]);
        Y.ObjectAssert.areEqual(expected[1], actual[1]);
        Y.ObjectAssert.areEqual(expected[2], actual[2]);
    },
    
    /**
     * UAG-SSJS-DR-9 Check that getLoginListener method exists
     */
    testGetLoginListenerMethodExists: function() {
        Y.Assert.isNotUndefined(directory.getLoginListener);
        Y.Assert.areSame("function", typeof directory.getLoginListener);
    },
    
    /**
     * UAG-SSJS-DR-10 Check that group method exists
     */
    testGroupMethodExists: function() {
        Y.Assert.isNotUndefined(directory.group);
        Y.Assert.areSame("function", typeof directory.group);
    },
    
    /**
     * UAG-SSJS-DR-11 Check that save method exists
     */
    testSaveExists: function() {
        Y.Assert.isNotUndefined(directory.save);
        Y.Assert.areSame("function", typeof directory.save);
    },
    
    /**
     * UAG-SSJS-DR-12 Check that setLoginListener method exists
     */
    testSetLoginListenerExists: function() {
        Y.Assert.isNotUndefined(directory.setLoginListener);
        Y.Assert.areSame("function", typeof directory.setLoginListener);
    },
    
    /**
     * UAG-SSJS-DR-13 Check that user method exists
     */
    testUserExists: function() {
        Y.Assert.isNotUndefined(directory.user);
        Y.Assert.areSame("function", typeof directory.user);
    }

}

var testCase = _testCase;
var ignoreAll = false;
testCase._should = {
    ignore:function(){
        var ignored = {};
        for(var x in testCase){
            if(x.match(/^test/)){
                ignored[x]=ignoreAll;
                console.log(x);
            }
        }   
        return ignored;
    }.call()
}