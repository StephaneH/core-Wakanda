var
modulePath;

modulePath = getWalibFolder("folder").parent.path + "Modules/waf-aws/";

include(modulePath + "includes/hash.js");

aws.util = {};

aws.util = {
    b64_hmac_sha1: function(k, d){
        return rstr2b64(rstr_hmac_sha1(str2rstr_utf8(k), str2rstr_utf8(d)));
    },
    getNowTimeStamp: function(){
        var
        ansiCsFormat, now = new Date();
        now += "";
        now = now.split(" ");
        var a = now[3];
        now[3] = now[4];
        now[4] = a;
        ansiCsFormat = now[0];
        for (var i = 1; i < 5; i++) {
            ansiCsFormat += " " + now[i]
        }
        return ansiCsFormat;
    },
    readHTTP: function(response, data){
		//debugger;
		response.data = (response.data)?response.data:"";
		response.tmp = (response.tmp)?response.tmp + data.toString("ascii"):data.toString("ascii");

        switch (response.encoding) {
	        case undefined:
	            var
	            pos = response.tmp.indexOf("\r\n\r\n");

	            if (pos > -1) {
					//debugger;
	                response.header = response.tmp.substring(0, pos);
	                response.tmp = response.tmp.substring(pos + 2);

	                aws.util.getHTTPHeaderInfo(response);

	                if (response.encoding == "chunked") {
	                    aws.util.readHTTPChunked(response);
	                } else {
						response.tmp = response.tmp.substring(2);
	                    aws.util.readHTTPNormal(response);
	                }
	            }
	            break;
	        case "chunked":
	            aws.util.readHTTPChunked(response);
	            break;
        }
    },
    getHTTPHeaderInfo: function(response){
        var
        chunkedRegExp = new RegExp("Transfer-Encoding[\t ]*:[\t ]*chunked", "i"),
        contentLengthRegExp = new RegExp("Content-Length[\t ]*:[\t ]*([0-9]*)", "i");
        //debugger;
        if (response.header.match(chunkedRegExp) != null){
            response.encoding = "chunked";
            response.status = 'l';
        }
        else {

            var
            length = response.header.match(chunkedRegExp);

            response.encoding = "normal";

            if (length != null) {
                response.length = parseInt(length[1]);
            }
        }
    },
    readHTTPNormal: function(response){
        response.data += response.tmp;
        response.tmp = "";
        response.completed = true;
    },
    readHTTPChunked: function(response){
    	//debugger;
        switch (response.status) {
	        case 'l':
				if(response.tmp.substring(0,2)=="\r\n"){
					response.tmp = response.tmp.substring(2);
				}
				
	            var
	            pos = response.tmp.indexOf("\r\n");
	            if (pos > -1) {
					//debugger;
	                response.chunk_length = parseInt(response.tmp.substring(0, pos), 16);
	                response.tmp = response.tmp.substring(pos + 2);
					
	                if (response.chunk_length > 0) {
	                    response.status = 'c';
	                    aws.util.readHTTPChunked(response);
	                } else {
						//debugger;
	                    response.completed = true;
	                }
	            }
	            break;
	        case 'c':
				//debugger;
	            if (response.tmp.length > response.chunk_length) {					
	                response.data += response.tmp.substring(0, response.chunk_length);					
	                response.tmp = response.tmp.substring(response.chunk_length);					
					
					response.chunk_length = 0;
	                response.status = 'l';
	                aws.util.readHTTPChunked(response);
	            }
	            else if (response.tmp.length <= response.chunk_length) {
					if (response.tmp.length == response.chunk_length){
	                	response.status = 'l';
	                }
	                response.data += response.tmp;
	                response.chunk_length -= response.tmp.length;
	                
	                response.tmp = "";
	            }
	            break;
	        }
    },
    JSONToXml : function JSONToXml(json,root){
        var xml='<?xml version="1.0" encoding="UTF-8"?>';
		
        function balise(json,xml){
            var bal="";
		   
            for(var i in json){
                if(i==root)bal+="<"+i+' xmlns="https://route53.amazonaws.com/doc/2012-02-29/" >';
                else bal+="<"+i+">";
				
                if(typeof json[i]!="string"){
                    bal+=balise(json[i],xml);
                }
                else bal+=json[i];
				
                bal+="</"+i+">";		
				
            }
			
		
            return bal;
        }
		
        xml+=balise(json,xml);
        return xml;
		
    }
}
