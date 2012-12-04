/**

* @author ouissam.gouni@4d.com

*/

// RH that launches local tests of Directory class
addHttpRequestHandler(
	"/testLocalDirectory",
	"publish.js",
	"testLocalDirectory"
);

// RH that launches tests of Directory class as they'll be runned by Jenkins
addHttpRequestHandler(
	"/testLikeJenkinsDirectory",
	"publish.js",
	"testLikeJenkinsDirectory"
);

function testLocalDirectory(request, response){
	var ip = application.httpServer.ipAddress;
	var port = application.httpServer.port;
	var file = application.getFolder("path") + "test-directory.js"
	response.headers["Location"]= "http://" + ip + ":" + port + "/testServer?path=" + file;
	response.statusCode = 301;
}

function testLikeJenkinsDirectory(request, response){
	var ip = application.httpServer.ipAddress;
	var port = application.httpServer.port;
	var file = application.getFolder("path") + "../testDirectory.js"
	response.headers["Location"]= "http://" + ip + ":" + port + "/testServer?path=" + file;
	response.statusCode = 301;
}