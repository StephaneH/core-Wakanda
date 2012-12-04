function getCanonicalizedAmzHeaders(headers){
    var
    canonicalizedAmzHeaders	= "",
    amzHeaders				= {},
    amzsort					= new Array();
    
    for(var i in headers){
        var
        amz	= i.toLowerCase();
        if(amz.indexOf("x-amz")!=-1) {
            amzHeaders[amz] 		= headers[i];
            amzsort[amzsort.length] = amz;
        }
	 			
    }
    
    amzsort 	= amzsort.sort(sort);
    for(var i=0;i<amzsort.length;i++){
        canonicalizedAmzHeaders	+= amzHeaders[amzsort[i]] + "\n";
    }
	 	
    return canonicalizedAmzHeaders;	
}

function getCanonicalizedResource(request){
    var
    CanonicalizedResource	= getBucket(request.headers.Host),
    tmp						= request.getResource().split('?'),
    queryString				= tmp[1];

    CanonicalizedResource	+= tmp[0];

    if(typeof queryString != 'undefined'){
    	CanonicalizedResource	+= addSubRessources(queryString);
    }

    return CanonicalizedResource;
}

function addSubRessources(queryString){
    var
    subRessources 		= new Array(),
    overideResponse		= new Array(),
    subResString		= "",
    overrideString		= "",
    subRessourcesList	= ["acl", "lifecycle", "location", "logging", "notification", "partNumber", "policy", "requestPayment",
        "torrent", "uploadId", "uploads", "versionId", "versioning", "versions" , "website"];
        
    queryString=queryString.split('&');
    
    for(var i=0;i< subRessourcesList.length;i++){
    	for(var j=0;j<queryString.length;j++){     	 
            if(queryString[j].indexOf(subRessourcesList[i])!=-1){
                subRessources[subRessources.length]=queryString[j];
            }
            if(queryString[j].indexOf("response")!=-1){
                overideResponse[overideResponse.length]=queryString[j];
            }
      	}
    }
      
    for(var i=0;i<subRessources.length;i++){
     	if(i!=0){
     		subResString+="&";
     	}
    	subResString+=subRessources[i];
    }
    
    for(var i=0;i<overideResponse.length;i++){
     	if(i!=0){
     		subResString += "&";
     	}
    	overrideString += subRessources[i]; 
    }
    
    if(overrideString != ""){
    	subResString += "&";
    }
    return subResString + overrideString;	
}

function getBucket(host){
    var
    bucket	= host.split('.s3.amazonaws.com')[0];
    
    if(bucket != "s3.amazonaws.com"){
    	return "/" + bucket;
    }
    
    return "";	
}

function sort(a,b){
    var ret = 0; 
    if (a > b) ret = 1;
    if (a < b) ret = -1;
    return ret;	
	
}