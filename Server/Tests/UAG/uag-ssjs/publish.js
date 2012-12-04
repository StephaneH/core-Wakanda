/**

* @author ouissam.gouni@4d.com

*/

addHttpRequestHandler(
	"/testLocalDirectory",
	"publish.js",
	"testLocalDirectory"
);

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