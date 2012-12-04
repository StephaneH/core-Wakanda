var
modulePath;

modulePath = getWalibFolder("folder").parent.path + "Modules/waf-aws/";

include(modulePath + "module/rest/aws-module-rest.js");
include(modulePath + "module/request/aws-module-request.js");