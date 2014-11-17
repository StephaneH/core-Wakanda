var ldap = require('waf-ldap');

var bindDN = "CN=userBind,OU=Test Unit Node,DC=LDAPTest,DC=local";
var dn = bindDN;
var correctBindPwd = "secret";
var pwd = correctBindPwd;
var badBindPwd = "...";
var emptyBindPwd = "";
var ldapHostname = "192.168.7.25";

var ldapPortNumber = 1389;
var ldapPortString = "1389";

var ldapPortNumberTLS = 2389;
var ldapPortStringTLS = "2389";

var ldapUrlWitoutPort = "ldap://" + ldapHostname;
var ldapUrlWitoutPortTLS = "ldaps://" + ldapHostname;

var ldapUrl = "ldap://" + ldapHostname + ":" + ldapPortString;
var ldapUrlTLS = "ldaps://" + ldapHostname + ":" + ldapPortStringTLS;

var testCase = {
    name: "LDAP Connector",

    _should: {
        ignore: {
    
            testCreateClientIpStringPortString : false,
            testCreateClientIpStringPortNumber : false,
            testCreateClientIpWithoutPort : false,
            testCreateClientWithUrl : false,
            testCreateClientWithInvalidUrl : false,
            testCreateClientWithInvalidUrlAsNumber : false,
            testCreateClientWithUrlWithoutPort : false,
            testCreateClientWithInvalidHostname : false,
            testCreateClientWithNothing : false,
            testCreateClientWithoutIpWithoutPort : false,
            testGetUUIDFromBindedUser : false,
            testGetUUIDFromBindedUserWithInvalidUUIDAttribute : false,
            testGetUUIDFromAnOtherUser : false,
            testGetUUIDFromBindedUserafterUnbind : false,
            testGetUUIDFromAnOtherUserRetrievedAfterUnbind : false,
            testGetUUIDFromAnOtherUserRetrievedBeforeUnbind : false,
            testGetGroups : false,
            testGetGroups : false,
            testBindCorrectPwd : false,
            testBindIncorrectPwd : false,
            testBindEmptyPwd : false,
            testBindUndefinedPwd : false,
            testBindInvalidHostname : false,
            testUnbind : false,
            testUnbindTwice : false,
            testUnbindwithoutBind : false,
            testSearchTwoAttributes : false,
            testSearchOneAttribute : false,
            testSearchNoAttribute : false,
            testCompareTrue : false,
            testCompareFalse : false,
            testCompareNonExistingAttribute : false,
            testGetUser : false,
            testGetUnexistingUser : false,
            testCreateClientTwiceTLS : false,
            testCreateClientIpStringPortStringTLS : false,
            testCreateClientIpStringPortNumberTLS : false,
            testCreateClientIpWithoutPortTLS : false,
            testCreateClientWithUrlTLS : false,
            testCreateClientWithUrlWithoutPortTLS : false,
            testCreateClientWithoutIpWithoutPortTLS : false,
            testGetUUIDFromBindedUserTLS : false,
            testGetUUIDFromBindedUserWithInvalidUUIDAttributeTLS : false,
            testGetUUIDFromAnOtherUserTLS : false,
            testGetUUIDFromBindedUserafterUnbindTLS : false,
            testGetUUIDFromAnOtherUserRetrievedAfterUnbindTLS : false,
            testGetUUIDFromAnOtherUserRetrievedBeforeUnbindTLS : false,
            testGetGroupsTLS : false,
            testGetGroupsTLS : false,
            testBindCorrectPwdTLS : false,
            testBindIncorrectPwdTLS : false,
            testBindEmptyPwdTLS : false,
            testBindUndefinedPwdTLS : false,
            testUnbindTLS : false,
            testUnbindTwiceTLS : false,
            testUnbindwithoutBindTLS : false,
            testSearchTwoAttributesTLS : false,
            testSearchOneAttributeTLS : false,
            testSearchNoAttributeTLS : false,
            testCompareTrueTLS : false,
            testCompareFalseTLS : false,
            testCompareNonExistingAttributeTLS : false,
            testGetUserTLS : false,
            testGetUnexistingUserTLS : false
        }
    },

    setUp: function() {
        if (typeof this.initDone === 'undefined') {}
    },

        ///////////////////////////////
        //////////// TESTS ////////////
        ///////////////////////////////
    
    testCreateClientTwice: function() {

        var client, exceptionOccur = false,
            expectedException = {},
            thrownException = {};

        var dnUser1,
            dnUser2,
            theUser1,
            uuid1,
            theUser2,
            uuid2;
        
        try {
            var client1 = ldap.createClient({
                url: ldapUrl
            });
            var client2 = ldap.createClient({
                url: ldapUrl
            });

            client1.bind(dn, pwd);
            client2.bind(dn, pwd);

            dnUser1 = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            dnUser2 = "CN=User2,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";

            theUser1 = client1.getUser(dnUser1);
            uuid1 = theUser1.getUUID();
            theUser2 = client2.getUser(dnUser2);
            uuid2 = theUser2 .getUUID();

            client1.unbind();
            client2.unbind();

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(uuid1, "56FFB892BA453747BD5C3CDB8FF1AF0B", "invalid exception code");
        Y.Assert.areSame(uuid2, "75297152E23BBA49BE8A7B5158573F1D", "invalid exception dn");
    },

    testCreateClientIpStringPortString: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        try {
            var client = ldap.createClient({
                hostname: ldapHostname,
                port: ldapPortString
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientIpStringPortNumber: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        try {
            var client = ldap.createClient({
                hostname: ldapHostname,
                port: ldapPortNumber
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientIpWithoutPort: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        try {
            client = ldap.createClient({
                hostname: ldapHostname
            });

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientWithUrl: function() {
        var client, exceptionOccur = false,
            expectedException = {},
            thrownException = {};

        try {
            client = ldap.createClient({
                url: ldapUrl
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientWithInvalidUrl: function() {
        var client, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                code: 80,
                dn: "",
                message: "LDAP Client creation failed!",
                name: "OtherError"
            };

        try {
            client = ldap.createClient({
                url: "invalid url"
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "invalid exception name");
    },

    testCreateClientWithInvalidUrlAsNumber: function() {
        var client, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                code: 80,
                dn: "",
                message: "LDAP Client creation failed!",
                name: "OtherError"
            };

        try {
            client = ldap.createClient({
                url: 404
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "invalid exception name");
    },

    testCreateClientWithUrlWithoutPort: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        try {
            client = ldap.createClient({
                url: ldapUrlWitoutPort
            });

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientWithInvalidHostname: function() {
        var client, exceptionOccur = false,
            expectedException = {},
            thrownException = {};

        try {
            client = ldap.createClient({
                hostname: "---"
            });
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
    },

    testCreateClientWithNothing: function() {
        var client, exceptionOccur = false,
            expectedException = {},
            thrownException = {};

        try {
            client = ldap.createClient();
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
    },

    testCreateClientWithoutIpWithoutPort: function() {
        var client, exceptionOccur = false,
            expectedException = {},
            thrownException = {};

        try {
            client = ldap.createClient({});
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "An exception shall occur here!");
    },

    testGetUUIDFromBindedUser: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        var client = ldap.createClient({
            url: ldapUrl
        });
        try {
            client.bind(dn, pwd);
            uuid = client.user.getUUID();

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(uuid, "B4C9488B9AE3E54289B0890192D5F645", "Wrong UUID.");
    },

    testGetUUIDFromBindedUserWithInvalidUUIDAttribute: function() {

        var client, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                message: "The UUID attribute doesn't map to a uuid value in the LDAP server!",
                code: 80,
                dn: "",
                name: "OtherError"
            },
            uuid = "";

        var client = ldap.createClient({
            url: ldapUrl,
            uuidAttribute: "guid"
        });

        try {
            client.bind(dn, pwd);
            uuid = client.user.getUUID();
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testGetUUIDFromAnOtherUser: function() {
        var client, exceptionOccur = false,
            thrownException = {},
            expectedException = {

            },
            uuid = "";

        var client = ldap.createClient({
            url: ldapUrl
        });

        try {
            client.bind(dn, pwd);
            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            var theUser = client.getUser(dnUser);
            uuid = theUser.getUUID();
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(uuid, "56FFB892BA453747BD5C3CDB8FF1AF0B", "Wrong UUID.");
    },

    testGetUUIDFromBindedUserafterUnbind: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                code: 80,
                dn: "",
                message: "The LDAP client is unbound.",
                name: "OtherError"
            },
            uuid = "";

        var client = ldap.createClient({
            url: ldapUrl
        });

        try {
            client.bind(dn, pwd);
            user = client.user;
            client.unbind();
            uuid = user.getUUID();

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testGetUUIDFromAnOtherUserRetrievedAfterUnbind: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                code: 80,
                dn: "",
                message: "The LDAP client is unbound.",
                name: "OtherError"
            },
            uuid = "";

        var client = ldap.createClient({
            url: ldapUrl
        });

        try {
            client.bind(dn, pwd);
            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            client.unbind();
            var theUser = client.getUser(dnUser);
            uuid = theUser.getUUID();
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testGetUUIDFromAnOtherUserRetrievedBeforeUnbind: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                code: 80,
                dn: "",
                line: 126,
                message: "The LDAP client is unbound.",
                name: "OtherError"
            },
            uuid = "";


        client = ldap.createClient({
            url: ldapUrl
        });

        try {
            client.bind(dn, pwd);
            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            var theUser = client.getUser(dnUser);
            client.unbind();
            uuid = theUser.getUUID();
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testGetGroups: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {

            },
            uuid = "";

        var groups = [];

        var client = ldap.createClient({
            url: ldapUrl
        });

        var grps = [{
            "CN": ["Group1", "Groups", ],
            "OU": ["Test Unit Node"],
            "DC": ["LDAPTest", "local"]
        }];

        var exception;

        try {
            client.bind(dn, pwd);
            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            var theUser = client.getUser(dnUser);
            groups = theUser.getGroups();
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(JSON.stringify(groups), JSON.stringify(grps), "Wrong groups.");
    },

    testGetGroups: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {

            },
            uuid = "";

        var groups = [];

        var client = ldap.createClient({
            url: ldapUrl
        });

        var grps = [];

        try {
            client.bind(dn, pwd);
            groups = client.user.getGroups();
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(JSON.stringify(groups), JSON.stringify(grps), "Wrong groups.");

    },

    testBindCorrectPwd: function() {
        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {
            var client = ldap.createClient({
                url: ldapUrl
            });
            client.bind(dn, correctBindPwd);
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isTrue(client.user != null, "client.user shall not be null!");
        Y.Assert.areSame(client.user.dn, dn, "Incorrect dn in the client.user!");
        Y.Assert.areSame(client.user.client, client, "Incorrect client in the client.user!");
    },

    testBindIncorrectPwd: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, expectedException = {
            code: 49,
            dn: bindDN,
            message: 'Could not bind with "CN=userBind,OU=Test Unit Node,DC=LDAPTest,DC=local" (using password : Yes). LDAP Server return message: "Invalid credentials".',
            name: "InvalidCredentialsError"
        };

        try {
            var client = ldap.createClient({
                url: ldapUrl
            });
            client.bind(dn, badBindPwd);
        } catch (err) {
            exceptionOccur = true, thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");

    },

    testBindEmptyPwd: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, expectedException = {
            code: 49,
            dn: bindDN,
            message: 'Could not bind with "CN=userBind,OU=Test Unit Node,DC=LDAPTest,DC=local" (using password : No). LDAP Server return message: "Invalid credentials".',
            name: "InvalidCredentialsError"
        };

        try {
            var client = ldap.createClient({
                url: ldapUrl
            });
            client.bind(dn, emptyBindPwd);
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");

    },

    testBindUndefinedPwd: function() {

        var exceptionOccur = false;
        var exception;
        var expectedException = {
            code: 49,
            dn: bindDN,
            message: 'Could not bind with "CN=userBind,OU=Test Unit Node,DC=LDAPTest,DC=local" (using password : No). LDAP Server return message: "Invalid credentials".',
            name: "InvalidCredentialsError"
        };

        var thrownException;

        try {
            var client = ldap.createClient({
                url: ldapUrl
            });
            client.bind(dn);

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testBindInvalidHostname: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;
        var expectedException = {
            code: 80,
            dn: bindDN,
            message: 'Could not bind with "CN=userBind,OU=Test Unit Node,DC=LDAPTest,DC=local" (using password : Yes). LDAP Server return message: "Can\'t contact LDAP server".',
            name: 'OtherError'
        };

        try {
            var client = ldap.createClient({
                hostname: "---"
            });
            client.bind(dn, correctBindPwd);

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testUnbind: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrl
            });

            client.bind(dn, pwd);
            client.unbind();

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isNull(client.user, "client.user not null");

    },

    testUnbindTwice: function() {
        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrl
            });

            client.bind(dn, pwd);
            client.unbind();
            client.unbind();

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isNull(client.user, "client.user not null");
    },

    testUnbindwithoutBind: function() {
        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrl
            });
            client.unbind();
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isNull(client.user, "client.user not null!");
    },

    testSearchTwoAttributes: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrl
            });
            var res = [
                {
                    "cn":["User1"],
                    "name":["User1"]
                }
            ];
            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";
            var a = client.search(dnsea, {
                attributes: ["cn", "name"]
            });

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(JSON.stringify(a), JSON.stringify(res));

    },

    testSearchOneAttribute: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {
            var client = ldap.createClient({
                url: ldapUrl
            });
            var res = [{
                "cn": ["User1"]
            }];
            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";
            var a = client.search(dnsea, {
                attributes: ["cn"]
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(JSON.stringify(a), JSON.stringify(res));

    },

    testSearchNoAttribute: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrl
            });

            var res =  [
                {
                    "cn":["User1"],
                    "memberOf":[
                        "cn=Group1,cn=Groups,ou=Test Unit Node,dc=LDAPTest,dc=local"
                    ],
                    "name":["User1"],"objectClass":["top","person","organizationalPerson","user"],"objectGUID":["56FFB892BA453747BD5C3CDB8FF1AF0B"]}];

            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";
            var a = client.search(dnsea, {
                attributes: []
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(JSON.stringify(a), JSON.stringify(res));

    },

    testCompareTrue: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, a, b;

        try {
            var client = ldap.createClient({
                url: ldapUrl
            });

            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";

            a = client.compare(dnsea, "cn", "User1");

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;

        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isTrue(a, "must be true");

    },

    testCompareFalse: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, a, b;

        try {

            var client = ldap.createClient({
                url: ldapUrl
            });

            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";

            b = client.compare(dnsea, "cn", "User11");


        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isFalse(b, "must be false");

    },

    testCompareNonExistingAttribute: function() {
        var exceptionOccur = false;
        var exception;
        var thrownException, a, expectedException = {
            code: 16,
            dn: bindDN,
            message: 'An error occur on LDAP Server: "No such attribute".',
            name: "NoSuchAttributeError"
        };

        try {

            var client = ldap.createClient({
                url: ldapUrl
            });

            client.bind(dn, pwd);
            
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";

            a = client.compare(dnsea, "nonExistntAt", "at content");

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(expectedException.code, thrownException.code, "invalid exception code");
        Y.Assert.areSame(expectedException.dn, thrownException.dn, "invalid exception dn");
        Y.Assert.areSame(expectedException.message, thrownException.message, "invalid exception message");
        Y.Assert.areSame(expectedException.name, thrownException.name, "invalid exception name");

    },

    testGetUser: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrl
            });

            client.bind(dn, pwd);

            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";

            var theUser = client.getUser(dnUser);
            var uuid = theUser.getUUID();

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isObject(theUser);
        Y.Assert.areSame(theUser.dn, dnUser);
        Y.Assert.areSame(uuid, "56FFB892BA453747BD5C3CDB8FF1AF0B");

    },

    testGetUnexistingUser: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, expectedException = {
            code: 32,
            dn: bindDN,
            message: 'Could not search into directory. LDAP Server return message: "No such object".',
            name: "NoSuchObjectError"
        };

        try {
            var client = ldap.createClient({
                url: ldapUrl
            });

            client.bind(dn, pwd);
            var dnUser = "CN=unexistingUser,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            var theUser = client.getUser(dnUser);
            var uuid = theUser.getUUID();

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(expectedException.code, thrownException.code, "invalid exception code");
        Y.Assert.areSame(expectedException.dn, thrownException.dn, "invalid exception dn");
        Y.Assert.areSame(expectedException.message, thrownException.message, "invalid exception message");
        Y.Assert.areSame(expectedException.name, thrownException.name, "invalid exception name");
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    
    testCreateClientTwiceTLS: function() {

        var client, exceptionOccur = false,
            expectedException = {},
            thrownException = {};

        var dnUser1,
            dnUser2,
            theUser1,
            uuid1,
            theUser2,
            uuid2;
        
        try {
            var client1 = ldap.createClient({
                url: ldapUrlTLS
            });
            var client2 = ldap.createClient({
                url: ldapUrlTLS
            });

            client1.bind(dn, pwd);
            client2.bind(dn, pwd);

            dnUser1 = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            dnUser2 = "CN=User2,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";

            theUser1 = client1.getUser(dnUser1);
            uuid1 = theUser1.getUUID();
            theUser2 = client2.getUser(dnUser2);
            uuid2 = theUser2 .getUUID();

            client1.unbind();
            client2.unbind();

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(uuid1, "56FFB892BA453747BD5C3CDB8FF1AF0B", "invalid exception code");
        Y.Assert.areSame(uuid2, "75297152E23BBA49BE8A7B5158573F1D", "invalid exception dn");
    },

    testCreateClientIpStringPortStringTLS: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        try {
            var client = ldap.createClient({
                hostname: ldapHostname,
                port: ldapPortStringTLS,
                ssl: true
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientIpStringPortNumberTLS: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        try {
            var client = ldap.createClient({
                hostname: ldapHostname,
                port: ldapPortNumberTLS,
                ssl: true
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientIpWithoutPortTLS: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        try {
            client = ldap.createClient({
                hostname: ldapHostname,
                ssl: true
            });

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientWithUrlTLS: function() {
        var client, exceptionOccur = false,
            expectedException = {},
            thrownException = {};

        try {
            client = ldap.createClient({
                url: ldapUrlTLS
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientWithUrlWithoutPortTLS: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        try {
            client = ldap.createClient({
                url: ldapUrlWitoutPortTLS
            });

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
    },

    testCreateClientWithoutIpWithoutPortTLS: function() {
        var client, exceptionOccur = false,
            expectedException = {},
            thrownException = {};

        try {
            client = ldap.createClient({
                ssl: true
            });
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "An exception shall occur here!");
    },

    testGetUUIDFromBindedUserTLS: function() {
        var client, exceptionOccur = false,
            expectedException = {

            },
            thrownException = {};

        var client = ldap.createClient({
            url: ldapUrlTLS
        });
        try {
            client.bind(dn, pwd);
            uuid = client.user.getUUID();

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(uuid, "B4C9488B9AE3E54289B0890192D5F645", "Wrong UUID.");
    },

    testGetUUIDFromBindedUserWithInvalidUUIDAttributeTLS: function() {

        var client, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                message: "The UUID attribute doesn't map to a uuid value in the LDAP server!",
                code: 80,
                dn: "",
                name: "OtherError"
            },
            uuid = "";

        var client = ldap.createClient({
            url: ldapUrlTLS,
            uuidAttribute: "guid"
        });

        try {
            client.bind(dn, pwd);
            uuid = client.user.getUUID();
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testGetUUIDFromAnOtherUserTLS: function() {
        var client, exceptionOccur = false,
            thrownException = {},
            expectedException = {

            },
            uuid = "";

        var client = ldap.createClient({
            url: ldapUrlTLS
        });

        try {
            client.bind(dn, pwd);
            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            var theUser = client.getUser(dnUser);
            uuid = theUser.getUUID();
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(uuid, "56FFB892BA453747BD5C3CDB8FF1AF0B", "Wrong UUID.");
    },

    testGetUUIDFromBindedUserafterUnbindTLS: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                code: 80,
                dn: "",
                message: "The LDAP client is unbound.",
                name: "OtherError"
            },
            uuid = "";

        var client = ldap.createClient({
            url: ldapUrlTLS
        });

        try {
            client.bind(dn, pwd);
            user = client.user;
            client.unbind();
            uuid = user.getUUID();

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testGetUUIDFromAnOtherUserRetrievedAfterUnbindTLS: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                code: 80,
                dn: "",
                message: "The LDAP client is unbound.",
                name: "OtherError"
            },
            uuid = "";

        var client = ldap.createClient({
            url: ldapUrlTLS
        });

        try {
            client.bind(dn, pwd);
            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            client.unbind();
            var theUser = client.getUser(dnUser);
            uuid = theUser.getUUID();
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testGetUUIDFromAnOtherUserRetrievedBeforeUnbindTLS: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {
                code: 80,
                dn: "",
                line: 126,
                message: "The LDAP client is unbound.",
                name: "OtherError"
            },
            uuid = "";


        client = ldap.createClient({
            url: ldapUrlTLS
        });

        try {
            client.bind(dn, pwd);
            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            var theUser = client.getUser(dnUser);
            client.unbind();
            uuid = theUser.getUUID();
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testGetGroupsTLS: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {

            },
            uuid = "";

        var groups = [];

        var client = ldap.createClient({
            url: ldapUrlTLS
        });

        var grps = [{
            "CN": ["Group1", "Groups"],
            "OU": ["Test Unit Node"],
            "DC": ["LDAPTest", "local"]
        }];

        var exception;

        try {
            client.bind(dn, pwd);
            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            var theUser = client.getUser(dnUser);
            groups = theUser.getGroups();
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(JSON.stringify(groups), JSON.stringify(grps), "Wrong groups.");
    },

    testGetGroupsTLS: function() {
        var client, user, exceptionOccur = false,
            thrownException = {},
            expectedException = {

            },
            uuid = "";

        var groups = [];

        var client = ldap.createClient({
            url: ldapUrlTLS
        });

        var grps = [];

        try {
            client.bind(dn, pwd);
            groups = client.user.getGroups();
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + thrownException.message);
        Y.Assert.areSame(JSON.stringify(groups), JSON.stringify(grps), "Wrong groups.");

    },

    testBindCorrectPwdTLS: function() {
        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {
            var client = ldap.createClient({
                url: ldapUrlTLS
            });
            client.bind(dn, correctBindPwd);
        } catch (err) {

            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isTrue(client.user != null, "client.user shall not be null!");
        Y.Assert.areSame(client.user.dn, dn, "Incorrect dn in the client.user!");
        Y.Assert.areSame(client.user.client, client, "Incorrect client in the client.user!");
    },

    testBindIncorrectPwdTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, expectedException = {
            code: 49,
            dn: bindDN,
            message: 'Could not bind with "CN=userBind,OU=Test Unit Node,DC=LDAPTest,DC=local" (using password : Yes). LDAP Server return message: "Invalid credentials".',
            name: "InvalidCredentialsError"
        };

        try {
            var client = ldap.createClient({
                url: ldapUrlTLS
            });
            client.bind(dn, badBindPwd);
        } catch (err) {
            exceptionOccur = true, thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");

    },

    testBindEmptyPwdTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, expectedException = {
            code: 49,
            dn: bindDN,
            message: 'Could not bind with "CN=userBind,OU=Test Unit Node,DC=LDAPTest,DC=local" (using password : No). LDAP Server return message: "Invalid credentials".',
            name: "InvalidCredentialsError"
        };

        try {
            var client = ldap.createClient({
                url: ldapUrlTLS
            });
            client.bind(dn, emptyBindPwd);
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");

    },

    testBindUndefinedPwdTLS: function() {

        var exceptionOccur = false;
        var exception;
        var expectedException = {
            code: 49,
            dn: bindDN,
            message: 'Could not bind with "CN=userBind,OU=Test Unit Node,DC=LDAPTest,DC=local" (using password : No). LDAP Server return message: "Invalid credentials".',
            name: "InvalidCredentialsError"
        };

        var thrownException;

        try {
            var client = ldap.createClient({
                url: ldapUrlTLS
            });
            client.bind(dn);

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(thrownException.code, expectedException.code, "Invalid exception code");
        Y.Assert.areSame(thrownException.dn, expectedException.dn, "Invalid exception dn");
        Y.Assert.areSame(thrownException.message, expectedException.message, "Invalid exception message");
        Y.Assert.areSame(thrownException.name, expectedException.name, "Invalid exception name");
    },

    testUnbindTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrlTLS
            });

            client.bind(dn, pwd);
            client.unbind();

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isNull(client.user, "client.user not null");

    },

    testUnbindTwiceTLS: function() {
        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrlTLS
            });

            client.bind(dn, pwd);
            client.unbind();
            client.unbind();

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isNull(client.user, "client.user not null");
    },

    testUnbindwithoutBindTLS: function() {
        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrlTLS
            });
            client.unbind();
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isNull(client.user, "client.user not null!");
    },

    testSearchTwoAttributesTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrlTLS
            });
            var res = [
                {
                    "cn":["User1"],
                    "name":["User1"]
                }
            ];
            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";
            var a = client.search(dnsea, {
                attributes: ["cn", "name"]
            });

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(JSON.stringify(a), JSON.stringify(res));

    },

    testSearchOneAttributeTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {
            var client = ldap.createClient({
                url: ldapUrlTLS
            });
            var res = [{
                "cn": ["User1"]
            }];
            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";
            var a = client.search(dnsea, {
                attributes: ["cn"]
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(JSON.stringify(a), JSON.stringify(res));

    },

    testSearchNoAttributeTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrlTLS
            });

            var res =  [
                {
                    "cn":["User1"],
                    "memberOf":[
                        "cn=Group1,cn=Groups,ou=Test Unit Node,dc=LDAPTest,dc=local"
                    ],
                    "name":["User1"],"objectClass":["top","person","organizationalPerson","user"],"objectGUID":["56FFB892BA453747BD5C3CDB8FF1AF0B"]}];

            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";
            var a = client.search(dnsea, {
                attributes: []
            });
        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(JSON.stringify(a), JSON.stringify(res));

    },

    testCompareTrueTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, a, b;

        try {
            var client = ldap.createClient({
                url: ldapUrlTLS
            });

            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";

            a = client.compare(dnsea, "cn", "User1");

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;

        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isTrue(a, "must be true");

    },

    testCompareFalseTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, a, b;

        try {

            var client = ldap.createClient({
                url: ldapUrlTLS
            });

            client.bind(dn, pwd);
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";

            b = client.compare(dnsea, "cn", "User11");


        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isFalse(b, "must be false");

    },

    testCompareNonExistingAttributeTLS: function() {
        var exceptionOccur = false;
        var exception;
        var thrownException, a, expectedException = {
            code: 16,
            dn: bindDN,
            message: 'An error occur on LDAP Server: "No such attribute".',
            name: "NoSuchAttributeError"
        };

        try {

            var client = ldap.createClient({
                url: ldapUrlTLS
            });

            client.bind(dn, pwd);
            
            var dnsea = "cn=User1,cn=Users,ou=Test Unit Node,dc=LDAPTest,dc=local";

            a = client.compare(dnsea, "nonExistntAt", "at content");

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(expectedException.code, thrownException.code, "invalid exception code");
        Y.Assert.areSame(expectedException.dn, thrownException.dn, "invalid exception dn");
        Y.Assert.areSame(expectedException.message, thrownException.message, "invalid exception message");
        Y.Assert.areSame(expectedException.name, thrownException.name, "invalid exception name");

    },

    testGetUserTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException;

        try {

            var client = ldap.createClient({
                url: ldapUrlTLS
            });

            client.bind(dn, pwd);

            var dnUser = "CN=User1,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";

            var theUser = client.getUser(dnUser);
            var uuid = theUser.getUUID();

        } catch (err) {

            exceptionOccur = true;
            thrownException = err;

        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isObject(theUser);
        Y.Assert.areSame(theUser.dn, dnUser);
        Y.Assert.areSame(uuid, "56FFB892BA453747BD5C3CDB8FF1AF0B");

    },

    testGetUnexistingUserTLS: function() {

        var exceptionOccur = false;
        var exception;
        var thrownException, expectedException = {
            code: 32,
            dn: bindDN,
            message: 'Could not search into directory. LDAP Server return message: "No such object".',
            name: "NoSuchObjectError"
        };

        try {
            var client = ldap.createClient({
                url: ldapUrlTLS
            });

            client.bind(dn, pwd);
            var dnUser = "CN=unexistingUser,CN=Users,OU=Test Unit Node,DC=LDAPTest,DC=local";
            var theUser = client.getUser(dnUser);
            var uuid = theUser.getUUID();

        } catch (err) {
            exceptionOccur = true;
            thrownException = err;
        }

        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(expectedException.code, thrownException.code, "invalid exception code");
        Y.Assert.areSame(expectedException.dn, thrownException.dn, "invalid exception dn");
        Y.Assert.areSame(expectedException.message, thrownException.message, "invalid exception message");
        Y.Assert.areSame(expectedException.name, thrownException.name, "invalid exception name");
    }

};

// /!\ REMOVE OR COMMENT THIS LINES BEFORE PUBLISHING THE TEST /!\ 
/**
    var ar = require("unitTest").run(testCase).getReport()['LDAP Connector'];
    var logo = [];
    logo.push(ar.total);
    var n = 0;
    for (var v in ar) {
        if (ar[v].result == 'fail') {
            n++;
            logo.push(ar[v]);
        }
    }
    logo.push(n);
    logo;
/**/