aws.modules.route53 = {
	config : {
		version 			: "2012-02-29",
		baseURL				: "route53.amazonaws.com",
		xmlns				: "https://route53.amazonaws.com/doc/2012-02-29/",
		socket 				: false,
		auth_field			: " X-Amzn-Authorization",
		Algorithm			: "HmacSHA1",
		auth_format			: "AWS3-HTTPS AWSAccessKeyId=$AWSAccessKeyId,Algorithm=$Algorithm,Signature=$Signature"
	},
	type: "rest"
};

aws.modules.route53.stringToSign = function (){
    return aws.util.getNowTimeStamp();
}
