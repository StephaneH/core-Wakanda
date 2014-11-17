
// RH that launches local tests of MIMEWriter class
//addHttpRequestHandler(
//	"/testLocalMimeWriter",
//	"publish.js",
//	"testLocalMimeWriter"
//);


function redirect(request, response, testFile){
	var ip = application.httpServer.ipAddress;
	var port = application.httpServer.port;
	var file = application.getFolder("path") + testFile;
	response.headers["Location"]= "http://" + ip + ":" + port + "/testServer?path=" + file;
	response.statusCode = 301;
}

//function testLocalMimeWriter(request, response){
//	redirect(request, response,"test0MimeMessage.js");
//}


