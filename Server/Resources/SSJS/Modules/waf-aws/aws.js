var
modulePath;

modulePath = getWalibFolder("folder").parent.path + "Modules/waf-aws/";

include(modulePath + "aws.inc.js");

exports.client = aws;