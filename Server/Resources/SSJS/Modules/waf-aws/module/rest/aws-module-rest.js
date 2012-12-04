var
modulePath,
net = require('net');

modulePath = getWalibFolder("folder").parent.path + "Modules/waf-aws/";

include(modulePath + "util/aws-util.js");

aws.module = {};

aws.module.rest = function (aws,json){
	this.aws				= aws;
	this.version			= json.version;
	this.baseURL			= json.baseURL;
	this.xmlns				= json.xmlns;
	this.socket				= json.socket;
	this.auth_field			= json.auth_field;
	this.auth_format		= json.auth_format;
	this.Algorithm			= json.Algorithm;
	
	var
	that = this;
	this.request	= function(req_json){
		return new rest_module.request(that,req_json,json.version);
	}
}

var
rest_module = aws.module.rest;

aws.module.rest.request = function(module,json,module_version){
	this.aws			= module.aws;
	this.module			= module;
	this.HTTPVerb       = json.HTTPVerb;
	this.HTTPVersion    = "1.1";
	this.reqBaseURL		= (json.baseURL)?json.baseURL + '.' + module.baseURL:module.baseURL;
    this.resource       = json.resource;
    this.rsrc_variables = (json.rsrc_variables)?json.rsrc_variables:[];
    this.params         = json.params;
    this.headers        = (json.headers)?json.headers:[];
    this.body           = (json.body==undefined)?"":json.body;
    this.body_type      = (json.body_type==undefined)?"normal":json.body_type;
    this.body_root		= json.body_root;
	this.body_structure = json.body_structure;
    this.body_variables = json.body_variables;
    this.callback		= json.callback;
    this.id				= json.id;
   
    this.rsrc_variables["version"] = module_version;
    
    this.send      		= function(){
    	return aws.module.rest.request.send.call(this);
    };
    this.getResource    = function(){
    	return aws.module.rest.request.getResource.call(this);
    };
}

rest_module.request.getResource = function(){
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

rest_module.request.send = function(){
	
	var
	out = "",
	body = "",
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
		    
	this.headers.Host 	= this.reqBaseURL;
	this.headers.Date	= aws.util.getNowTimeStamp();	
		
	this.headers[this.module.auth_field] = this.module.auth_format;
	this.headers[this.module.auth_field] = this.headers[this.module.auth_field].replace('$Algorithm',this.module.Algorithm);
	this.headers[this.module.auth_field] = this.headers[this.module.auth_field].replace('$AWSAccessKeyId',this.aws.AWSAccessKeyId);
	this.headers[this.module.auth_field] = this.headers[this.module.auth_field].replace('$Signature',aws.util.b64_hmac_sha1(this.aws.SigningKey, this.module.stringToSign(this)));
	
	if (this.module.socket){
	    
	    out = this.HTTPVerb + " " + this.getResource();

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
    	response = {};
    	var
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
    		socket.addListener('data',function(data){
    			aws.util.readHTTP(response,data);
    			
    			if(response.completed == true){
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
										type : "go"
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
		
    	return response.tmp;
	} else {
		var
		url		= 'https://' + this.headers.Host + this.getResource(),
	 	xhr		= new XMLHttpRequest(),
	    result	= '';
	    //debugger;
	    function getResponse() {
	    	
		    if (xhr.readyState === 4) {
		    	//debugger;
				result = xhr.responseText; //JSON.parse(XmlToJSON(xhr.responseText, "json-bag", ""));
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