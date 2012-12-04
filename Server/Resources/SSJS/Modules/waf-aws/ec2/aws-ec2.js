
aws.modules.ec2 = {
	type : "request",
	config : {
		Version 			: "2012-06-15",
		baseURL				: "ec2.amazonaws.com",
		socket 				: true,
		SignatureMethod		: "HmacSHA1",
		SignatureVersion	: "2"	
	}
}

aws.modules.ec2.stringToSign = function (request){
    var
    stringToSign	= 'GET\n'
    query	= request.getResource().substring(2),
    params	= query.split("&");
    //debugger;
	stringToSign	+= request.reqBaseURL;
    stringToSign	+= '\n/\n';
    
    for(var i=0;i<params.length;i++){
        params[i] = decodeURIComponent(params[i].split('=')[0])+"="+decodeURIComponent(params[i].split('=')[1]);
    }
    
    params.sort();
    
    for(var i=0;i<params.length;i++){
        var
        name = encodeURIComponent(params[i].split("=")[0]),
        value = encodeURIComponent(params[i].split("=")[1]);
        
        if (name == 'Signature' || undefined==value ){
        	continue;
        }
        
        stringToSign += name+"="+value;       
         
        if(i!=(params.length-1)){
        	stringToSign += "&";
        }
    }
    
    return stringToSign;	
}