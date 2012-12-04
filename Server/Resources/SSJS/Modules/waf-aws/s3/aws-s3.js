var
modulePath;

modulePath = getWalibFolder("folder").parent.path + "Modules/waf-aws/";

include(modulePath + "includes/s3-headers.js");

aws.modules.s3 = {
	type : "rest",
	config : {
		version 			: "2006-03-01",
		baseURL				: "s3.amazonaws.com",
		xmlns				: "http://doc.s3.amazonaws.com/2006-03-01",
		socket 				: true,
		auth_field			: "Authorization",
		Algorithm			: "HmacSHA1",
		auth_format			: "AWS $AWSAccessKeyId:$Signature"
	}
}

aws.modules.s3.stringToSign = function (request){
	var
	contentMD5		= "",
    contentType		= "",
    date 			= "",
    stringToSign	= "";
	
    if(typeof request.headers['Content-MD5']!=='undefined'){
    	contentMD5 = request.headers['Content-MD5'];
    }
    if(typeof request.headers['Content-Type']!=='undefined'){
    	contentType = request.headers['Content-Type'];
    }
    if(typeof request.headers['Date']!='undefined'){
    	date = request.headers['Date'];
    }
    
    stringToSign = request.HTTPVerb + "\n" + contentMD5 + "\n" +contentType + "\n" +
        date + "\n" + getCanonicalizedAmzHeaders(request.headers) + getCanonicalizedResource(request);
        
    return 	stringToSign;
}