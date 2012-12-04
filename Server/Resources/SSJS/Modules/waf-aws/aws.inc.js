var
aws,
modulePath;

aws = {};
modulePath = getWalibFolder("folder").parent.path + "Modules/waf-aws/";

aws = function( AWSAccessKeyId, SigningKey){
	this.AWSAccessKeyId = AWSAccessKeyId;
	this.SigningKey		= SigningKey;
	for(var mod in aws.modules){
		var
		modType 	= aws.modules[mod].type,
		modConfig 	= aws.modules[mod].config;
		
		this[mod] = new aws.module[modType](this,modConfig);
		this[mod].stringToSign = aws.modules[mod].stringToSign;
	}
}

if (aws.modules == undefined){
	aws.modules = {};
}

// Module including area
include(modulePath + "module/aws-module.js");
include(modulePath + "route53/aws-route53.js");
include(modulePath + "ec2/aws-ec2.js");
include(modulePath + "s3/aws-s3.js");
