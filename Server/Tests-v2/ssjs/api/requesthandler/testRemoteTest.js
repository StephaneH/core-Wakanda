/**
* @author admin
*/

var testCase = {
	name: 'Simple Remote tests',
	_wait: {
		after: 5000
	},
	_should: {
        ignore: {
        	testIsSSLValueRemoteSecured: true // cannot make it because of network restrictions
        }
    },
	testRemoteAddressExists: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testRemoteAddressExists');
		myXHR.send();
		Y.Assert.areSame('string', myXHR.responseText);
	},
	testRemotePortExists: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testRemotePortExists');
		myXHR.send();
		Y.Assert.areSame('number', myXHR.responseText);
	},
	testLocalAddressExists: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testLocalAddressExists');
		myXHR.send();
		Y.Assert.areSame('string', myXHR.responseText);
	},
	testLocalPortExists: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testLocalPortExists');
		myXHR.send();
		Y.Assert.areSame('number', myXHR.responseText);
	},
	testIsSSLExists: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testIsSSLExists');
		myXHR.send();
		Y.Assert.areSame('boolean', myXHR.responseText);
	},
	testRemoteAddressExists2: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testRemoteAddressExists');
		myXHR.send();
		Y.Assert.areSame('string', myXHR.responseText);
	},
	testRemotePortExists2: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testRemotePortExists');
		myXHR.send();
		Y.Assert.areSame('number', myXHR.responseText);
	},
	testLocalAddressExists2: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testLocalAddressExists');
		myXHR.send();
		Y.Assert.areSame('string', myXHR.responseText);
	},
	testLocalPortExists2: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testLocalPortExists');
		myXHR.send();
		Y.Assert.areSame('number', myXHR.responseText);
	},
	testIsSSLExists2: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testIsSSLExists');
		myXHR.send();
		Y.Assert.areSame('boolean', myXHR.responseText);
	},
	testRemoteAddressValueRemote: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testRemoteAddressValue');
		myXHR.send();
		try {
			Y.Assert.areSame('::ffff:194.98.194.72', myXHR.responseText);
		}
		catch (e) {
			Y.Assert.areSame('::ffff:192.168.4.13', myXHR.responseText);
		}
	},
	testRemoteAddressValueLocal: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testRemoteAddressValue');
		myXHR.send();
		Y.Assert.areSame('::ffff:127.0.0.1', myXHR.responseText);
	},
	testRemotePortValueRemote: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testRemotePortValue');
		myXHR.send();
		Y.Assert.isTrue(parseInt(myXHR.responseText) >= 10000, 'remotePort should be >= 10000, actual value: ' + myXHR.responseText);
	},
	testRemotePortValueLocal: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testRemotePortValue');
		myXHR.send();
		Y.Assert.isTrue(parseInt(myXHR.responseText) >= 10000, 'remotePort should be >= 10000, actual value: ' + myXHR.responseText);
	},
	testLocalAddressValueRemote: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testLocalAddressValue');
		myXHR.send();
		Y.Assert.areSame('::ffff:' + application.httpServer.ipAddress, myXHR.responseText);
	},
	testLocalAddressValueLocal: function () {
		var url = application.httpServer.ipAddress;
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testLocalAddressValue');
		myXHR.send();
		Y.Assert.areSame('::ffff:127.0.0.1', myXHR.responseText);
	},
	testLocalPortValueRemote: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testLocalPortValue');
		myXHR.send();
		Y.Assert.areSame(8081, parseInt(myXHR.responseText));
	},
	testLocalPortValueLocal: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testLocalPortValue');
		myXHR.send();
		Y.Assert.areSame(8081, parseInt(myXHR.responseText));
	},
	testIsSSLValueRemoteUnsecured: function () {
		var url = application.httpServer.ipAddress + ':8081';
		// if (os.isLinux) url = '41.142.248.40:8081';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=http://' + url + '/testIsSSLValue');
		myXHR.send();
		Y.Assert.areSame('false', myXHR.responseText);
	},
	testIsSSLValueLocalUnsecured: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://127.0.0.1:8081/testIsSSLValue');
		myXHR.send();
		Y.Assert.areSame('false', myXHR.responseText);
	},
	testIsSSLValueRemoteSecured: function () {
		var url = application.httpServer.ipAddress + ':8082';
		// if (os.isLinux) url = '41.142.248.40:8082';
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'http://194.98.194.72/testRequest?url=https://' + url + '/testIsSSLValue');
		myXHR.send();
		Y.Assert.areSame('true', myXHR.responseText);
	},
	testIsSSLValueLocalSecured: function () {
		var myXHR = new XMLHttpRequest();
		myXHR.open('GET', 'https://127.0.0.1:8082/testIsSSLValue');
		myXHR.send();
		Y.Assert.areSame('true', myXHR.responseText);
	}
};