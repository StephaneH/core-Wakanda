/**

* @author soufiane.tigrioui@4d.com

*/
var testCase = {
	
    name: "Test of Users Authentication via REST API",

    testDirectoryLoginWithRightUsernameAndPassword: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8081/rest/$directory/login");
        var json = ["user", "user"];
        var obj = JSON.stringify(json);
        xhr.send(obj);
        Y.Assert.areSame(true, JSON.parse(xhr.response).result);

    },

    testDirectoryLoginWithWrongUsernameAndPassword: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8081/rest/$directory/login");
        var json = ["inexistant", "inexistant"];
        var obj = JSON.stringify(json);
        xhr.send(obj);
        Y.Assert.areSame(false, JSON.parse(xhr.response).result);

    },

    testDirectoryLogout: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8081/rest/$directory/logout");
        xhr.send(null);
        Y.Assert.areSame(true, JSON.parse(xhr.response).result);

    },

    testDirectoryCurrentUserWhenLoggedIn: function() {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://127.0.0.1:8081/rest/$directory/currentUser");
        xhr.setRequestHeader("Authorization", "Basic " + "dXNlcjp1c2Vy");
        xhr.send(null);
        var str = xhr.response;
        Y.Assert.areSame("user", JSON.parse(str).result.userName);
    },

    testDirectoryCurrentUserWhenNotLoggedIn: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://127.0.0.1:8081/rest/$directory/currentUser");
        xhr.send(null);
        var str = xhr.response;
        Y.Assert.areSame(null, JSON.parse(str).result);
    },


    testDirectoryCurrentUserBelongsToWhenUserLoggedInAndGivenGroupNameIsRight: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8081/rest/$directory/currentUserBelongsTo");
        xhr.setRequestHeader("Authorization", "Basic " + "dXNlcjp1c2Vy");
        var json = ["User"];
        var obj = JSON.stringify(json);
        xhr.send(obj);
        var str = xhr.response;
        Y.Assert.areSame(true, JSON.parse(str).result);

    },
    
        testDirectoryCurrentUserBelongsToWhenUserLoggedInAndGivenGroupNameIsFalse: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8081/rest/$directory/currentUserBelongsTo");
        xhr.setRequestHeader("Authorization", "Basic " + "dXNlcjp1c2Vy");
        var json = ["Admin"];
        var obj = JSON.stringify(json);
        xhr.send(obj);
        var str = xhr.response;
        Y.Assert.areSame(false, JSON.parse(str).result);

    },
    
    testDirectoryCurrentUserBelongsToWhenUserLoggedInAndGivenGroupNameIsInexistant: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8081/rest/$directory/currentUserBelongsTo");
        xhr.setRequestHeader("Authorization", "Basic " + "dXNlcjp1c2Vy");
        var json = ["Inexistant"];
        var obj = JSON.stringify(json);
        xhr.send(obj);
        var str = xhr.response;
        Y.Assert.areSame(false, JSON.parse(str).result);

    },
    
        testDirectoryCurrentUserBelongsToWhenUserNotLoggedIn: function() {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:8081/rest/$directory/currentUserBelongsTo");
        var json = ["User"];
        var obj = JSON.stringify(json);
        xhr.send(obj);
        var str = xhr.response;
        Y.Assert.areSame(false, JSON.parse(str).result);

    }



}


//require('unitTest').run(testCase).getReport();