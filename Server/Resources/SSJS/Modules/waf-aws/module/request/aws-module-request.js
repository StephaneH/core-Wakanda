var
modulePath,
net;

modulePath = getWalibFolder("folder").parent.path + "Modules/waf-aws/";
net = require('net');

include(modulePath + "util/aws-util.js");

aws.module = (aws.module)?aws.module:{};

aws.module.request = function (aws,json){
	this.aws				= aws;
	this.Version			= json.Version;
	this.baseURL			= json.baseURL;
	this.socket				= json.socket;
	this.SignatureMethod	= json.SignatureMethod;
	this.SignatureVersion	= json.SignatureVersion;
	
	var
	that = this;
	
	this.request	= function(req_json){
		return new request_module.request(that,req_json,json.version);
	}
}

var
request_module = aws.module.request;

aws.module.request.request = function(module,json,module_version){
	this.aws				= module.aws;
	this.module				= module;
	this.HTTPVerb       	= json.HTTPVerb;
	this.HTTPVersion    	= "1.1";
	this.reqBaseURL			= (json.baseURL)?json.baseURL + '.' + module.baseURL:module.baseURL;
    this.resource       	= json.resource;
    this.rsrc_variables 	= (json.rsrc_variables)?json.rsrc_variables:[];
    this.params         	= json.params;
    this.headers        	= (json.headers)?json.headers:[];
    this.body           	= (json.body==undefined)?"":json.body;
    this.body_type      	= (json.body_type==undefined)?"normal":json.body_type;
    this.body_root			= json.body_root;
	this.body_structure 	= json.body_structure;
    this.body_variables 	= json.body_variables;
    this.callback			= json.callback;
    this.id					= json.id;
    
	this.rsrc_variables["version"] = module_version;
    
    this.send      		= function(){
    	return aws.module.request.request.send.call(this);
    };
    this.getResource    = function(){
    	return aws.module.request.request.getResource.call(this);
    };
}

request_module.request.getResource = function(){
	var
	resource = this.resource,
	pString = "";
	//debugger;
    for(var i in this.rsrc_variables){
        resource = resource.replace(new RegExp("\\$"+i,"g"),this.rsrc_variables[i]);
    }

    //Add parameters
    if(this.params != undefined){
         pString = "?";

        for(i in this.params){
            pString +=(pString=="?")? i + "=" + this.params[i] : "&" + i + "=" + this.params[i];
        }
    }
    
    return resource + pString;
}

request_module.request.send = function(){
	//debugger;
	var
	out = "",
	body = "",
	resource = "",
	file = null;
	
	if(this.headers == undefined){
		this.headers = [];
	}
	//debugger;
	//Add body
	switch(this.body_type){
		case "normal":
			body = this.body;
			this.headers["Content-Length"] = body.length;
			break;
		case "vars":
			body = this.body;
			if (this.body_variables!=undefined){
				for(var i in this.body_variables){
        			body = body.replace(new RegExp("\\$"+i,"g"),this.body_variables[i]);
        		}
        	}
        	this.headers["Content-Length"] = body.length;
        	break;
        case "file":
        	file = File(this.body);
        	this.headers["Content-Length"] = file.size;
			break;
    }
	this.params["Timestamp"] = dateToIso(new Date());
	this.headers.Host 	= this.reqBaseURL;
	this.headers.Date	= aws.util.getNowTimeStamp();
	
	
	//resource += "&Version="	+ this.Version;
	this.params["Version"] 			= this.module.Version;
	this.params["SignatureVersion"] = this.module.SignatureVersion;
	this.params["SignatureMethod"]	= this.module.SignatureMethod;
	this.params["AWSAccessKeyId"] 	= this.aws.AWSAccessKeyId;
	//this.params["Signature"] 		= encodeURIComponent(aws.util.b64_hmac_sha1(this.aws.SigningKey, this.module.stringToSign(this)));
		
	resource = this.getResource() + "&Signature="  + encodeURIComponent(aws.util.b64_hmac_sha1(this.aws.SigningKey, this.module.stringToSign(this)));
	
	/*	
	this.headers[this.module.auth_field] = this.module.auth_format;
	this.headers[this.module.auth_field] = this.headers[this.module.auth_field].replace('$Algorithm',this.module.Algorithm);
	this.headers[this.module.auth_field] = this.headers[this.module.auth_field].replace('$AWSAccessKeyId',this.aws.AWSAccessKeyId);
	this.headers[this.module.auth_field] = this.headers[this.module.auth_field].replace('$Signature',aws.util.b64_hmac_sha1(this.aws.SigningKey, this.aws.s3.stringToSign(this)));
	*/
	
	if (this.module.socket){
	    
	    out = this.HTTPVerb + " " + resource;

	    //Add HTTP version
	    out += " HTTP/" + this.HTTPVersion + "\r\n";
		
	    //Add headers
		
		for(var header in this.headers){
			out += header + ": " + this.headers[header] + "\r\n";
		}

	    //Add body
		out += "\r\n" + body ;
			    
	    var
    	socket = new net.Socket(),
    	response = {},
    	that = this;
    	
    	socket.connect(80,this.reqBaseURL,function(){
    		socket.write(out);
    		if (file!=null){
    			//debugger;
    			that.fileSize = file.size;
    			that.done = 0;
    			var
    			buffer_size = 100*1024;
    			src_bstream = BinaryStream(file, "Read");
    			while(true){
					data_buffer = src_bstream.getBuffer(buffer_size);
					socket.write(data_buffer);
					length = data_buffer.length;
					that.done += length
					if(length<buffer_size){
						break;
					}
					wait(4);			
				}
    		}
			
			var
			currentPlayer,
			playerId;
			
			currentPlayer	= 0,
			playerId		= 0;
			
    		socket.addListener('data',function(data){
				var
				myId = playerId++;
				
				while( (response.locked==true) || (currentPlayer>myId + 1) ){
					wait(4);
				}
				response.locked = true;
				currentPlayer	= myId;
				aws.util.readHTTP(response,data);
				response.locked = false;
				
    			if(response.completed == true){
    				//debugger;
    				that.completed = true;
    				that.response = response;
	    			if(that.callback){
						var
						cbWorker = new SharedWorker(that.callback,that.id),
						port = cbWorker.port;
						port.onmessage = function(event){
							var
							message = event.data;
							switch(message.type){
								case "ready":
									port.postMessage({
										"type" 		: "go",
										"content"	: response
									});
							}
						}
					}
					exitWait();
    			}
    		});
    	});
    	
    	wait();
		socket.destroy();
		
    	return response.data;
	} else {
		var
		url		= 'https://' + this.reqBaseURL + resource,
	 	xhr		= new XMLHttpRequest(),
	    result	= '';
	    //debugger;
	    function getResponse() {
	    	
		    if (xhr.readyState === 4) {
		    	//debugger;
				result = xhr.responseText; //JSON.parse(XmlToJSON(xhr.responseText, "json-bag", ""));
				//debugger;
				//exitWait();
			}
		}
		
	    xhr.onreadystatechange = getResponse;
    
	    xhr.open(this.HTTPVerb, url);
        for(var header in this.headers){
        	//debugger;
			if(header != "Host"){
				xhr.setRequestHeader(header, this.headers[header]);
			}
		}
        if(typeof this.body != 'undefined'){
			xhr.send(this.body);
		}
	    else{
	    	xhr.send(null); 
	    }  	
	    //wait();
        return result;
	}
}