
testCase.testCommunity_install = function () {
	build.install(installerCommunityPath, wakandaCommunityPath);
	var nbError = build.checkErrorInLog();
	Y.Assert.areSame(0, nbError, 'Error during install');
};

testCase.testCommunity_checkProductVersion = function () {
	var logProductVersion= build.checkProductVersion();
	Y.Assert.areSame(productVersion, logProductVersion);
};

testCase.testCommunity_checkInstalledStudioPath = function () {
	var file = File(wakandaCommunityPath_posix + 'Studio/Wakanda Studio.exe');
	Y.Assert.isTrue(file.exists, 'Wakanda Studio.exe was not found');
};

testCase.testCommunity_checkInstalledServerPath = function () {
	var file = File(wakandaCommunityPath_posix + 'Server/Wakanda Server.exe');
	Y.Assert.isTrue(file.exists, 'Wakanda Server.exe was not found');
};

testCase.testCommunity_checkStudioShortcuts = function () {
	var result = build.getTargetPathofShortcut(publicPath+'Wakanda Studio.lnk');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe', result, 'Wakanda Studio.lnk does not have the right path');
};

testCase.testCommunity_checkServerShortcuts = function () {
	var result = build.getTargetPathofShortcut(publicPath+'Wakanda Server.lnk');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Server/Wakanda Server.exe', result, 'Wakanda Server.lnk does not have the right path');
};

testCase.testCommunity_checkWaDirectoryIcon = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wadirectory\\DefaultIcon');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico', result);
};

testCase.testCommunity_checkWaDirectoryAssociations = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wadirectory\\shell\\open\\command');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
};

testCase.testCommunity_checkWaModelIcon = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wamodel\\DefaultIcon');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico', result);
};

testCase.testCommunity_checkWaModelAssociations = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wamodel\\shell\\open\\command');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
};

testCase.testCommunity_checkWaPermIcon = function () {
	var result = build.getFileAssociation('HKCR\\WAK.waperm\\DefaultIcon');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico', result);
};

testCase.testCommunity_checkWaPermAssociations = function () {
	var result = build.getFileAssociation('HKCR\\WAK.waperm\\shell\\open\\command');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
};

testCase.testCommunity_checkWaProjectIcon = function () {
	var result = build.getFileAssociation('HKCR\\WAK.waproject\\DefaultIcon');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico', result);
};

testCase.testCommunity_checkWaProjectAssociation = function () {
	var result = build.getFileAssociation('HKCR\\WAK.waproject\\shell\\open\\command');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
};

testCase.testCommunity_checkWaSettingsIcon = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wasettings\\DefaultIcon');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico', result);
};

testCase.testCommunity_checkWaSettingsAssociation = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wasettings\\shell\\open\\command');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
};

testCase.testCommunity_checkWaSolutionIcon = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wasolution\\DefaultIcon');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico', result);
};

testCase.testCommunity_checkWaSolutionAssociations = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wasolution\\shell\\open\\command');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
};

testCase.testCommunity_checkWaSymIcon = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wasym\\DefaultIcon');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico', result);
};

testCase.testCommunity_checkWaSymAssociations = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wasym\\shell\\open\\command');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
};

testCase.testCommunity_checkWaSymDataIcon = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wasymdata\\DefaultIcon');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda_doc.ico', result);
};

testCase.testCommunity_checkWaSymDataAssociations = function () {
	var result = build.getFileAssociation('HKCR\\WAK.wasymdata\\shell\\open\\command');
	Y.Assert.areSame(wakandaCommunityPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
};

// List from //depot/Wakanda/main/Common/Visual/CF_Win_Entreprise.txt
testCase.testCommunity_studio_checkDLL_RemoteEntity = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/RemoteEntity.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/RemoteEntity.dll');
};

testCase.testCommunity_server_checkDLL_RemoteEntity = function () {
	var file = File(wakandaCommunityPath_posix+"Server/RemoteEntity.dll")
	Y.Assert.areSame(false, file.exists, 'Server/RemoteEntity.dll');
};

testCase.testCommunity_studio_checkDLL_SQLEntity = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/SQLEntity.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/SQLEntity.dll');
};

testCase.testCommunity_server_checkDLL_SQLEntity = function () {
	var file = File(wakandaCommunityPath_posix+"Server/SQLEntity.dll")
	Y.Assert.areSame(false, file.exists, 'Server/SQLEntity.dll');
};

testCase.testCommunity_studio_checkDLL_MySQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/MySQLConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/MySQLConnector.dll');
};

testCase.testCommunity_server_checkDLL_MySQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/MySQLConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Server/MySQLConnector.dll');
};

testCase.testCommunity_studio_checkDLL_MSSQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/MSSQLConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/MSSQLConnector.dll');
};

testCase.testCommunity_server_checkDLL_MSSQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/MSSQLConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Server/MSSQLConnector.dll');
};

testCase.testCommunity_studio_checkDLL_ODBCConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/ODBCConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/ODBCConnector.dll');
};

testCase.testCommunity_server_checkDLL_ODBCConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/ODBCConnector.dll")
	Y.Assert.areSame(false, file.exists, 'Server/ODBCConnector.dll');
};

testCase.testCommunity_studio_checkDLL_SQLUtilities = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/SQLUtilities.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/SQLUtilities.dll');
};

testCase.testCommunity_server_checkDLL_SQLUtilities = function () {
	var file = File(wakandaCommunityPath_posix+"Server/SQLUtilities.dll")
	Y.Assert.areSame(false, file.exists, 'Server/SQLUtilities.dll');
};

testCase.testCommunity_studio_checkDLL_SQLModel = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/SQLModel.dll")
	Y.Assert.areSame(false, file.exists, 'Studio/SQLModel.dll');
};

testCase.testCommunity_server_checkDLL_SQLModel = function () {
	var file = File(wakandaCommunityPath_posix+"Server/SQLModel.dll")
	Y.Assert.areSame(false, file.exists, 'Server/SQLModel.dll');
};

testCase.testCommunity_studio_checkBundle_MySQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Studio/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf');
};

testCase.testCommunity_server_checkBundle_MySQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Server/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf');
};

testCase.testCommunity_studio_checkBundle_MSSQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Native Components/MSSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Studio/Native Components/MsSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf');
};

testCase.testCommunity_server_checkBundle_MSSQLConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Native Components/MSSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Server/Native Components/MsSQLConnector.bundle/Contents/Resources/en.lproj/MSSQLConnectorEN.xlf');
};

testCase.testCommunity_studio_checkBundle_ODBCConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Studio/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf');
};

testCase.testCommunity_server_checkBundle_ODBCConnector = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf")
	Y.Assert.areSame(false, file.exists, 'Server/Native Components/ODBCConnector.bundle/Contents/Resources/en.lproj/ODBCConnectorEN.xlf');
};

testCase.testCommunity_studio_checkModule_wafAWS = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/ec2/aws-ec2.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/ec2/aws-ec2.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/includes/hash.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/includes/hash.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/includes/s3-headers.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/includes/s3-headers.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/module/request/aws-module-request.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/module/request/aws-module-request.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/module/rest/aws-module-rest.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/module/rest/aws-module-rest.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/module/aws-module.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/module/aws-module.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/route53/aws-route53.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/route53/aws-route53.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/s3/aws-s3.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/s3/aws-s3.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/util/aws-util.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/util/aws-util.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/aws.inc.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/aws.inc.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/aws.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/aws.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/order.txt")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/order.txt');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-aws/readme.txt")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-aws/readme.txt');
};

testCase.testCommunity_server_checkModule_wafAWS = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/ec2/aws-ec2.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/ec2/aws-ec2.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/includes/hash.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/includes/hash.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/includes/s3-headers.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/includes/s3-headers.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/module/request/aws-module-request.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/module/request/aws-module-request.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/module/rest/aws-module-rest.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/module/rest/aws-module-rest.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/module/aws-module.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/module/aws-module.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/route53/aws-route53.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/route53/aws-route53.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/s3/aws-s3.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/s3/aws-s3.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/util/aws-util.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/util/aws-util.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/aws.inc.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/aws.inc.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/aws.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/aws.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/order.txt")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/order.txt');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-aws/readme.txt")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-aws/readme.txt');
};

testCase.testCommunity_studio_checkModule_wafAZURE = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/management/azure-management.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/management/azure-management.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/module/rest/azure-module-rest.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/module/rest/azure-module-rest.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/module/azure-module.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/module/azure-module.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/azure.inc.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/azure.inc.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-azure/azure.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-azure/azure.js');
};

testCase.testCommunity_server_checkModule_wafAZURE = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/management/azure-management.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/management/azure-management.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/module/rest/azure-module-rest.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/module/rest/azure-module-rest.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/module/azure-module.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/module/azure-module.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/azure.inc.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/azure.inc.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-azure/azure.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-azure/azure.js');
};

testCase.testCommunity_studio_checkModule_wafSQL = function () {
	var file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-sql/client.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-sql/client.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-sql/package.json")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-sql/package.json');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-sql/sql.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-sql/sql.js');
	file = File(wakandaCommunityPath_posix+"Studio/Modules/waf-sql/utils.js")
	Y.Assert.areSame(false, file.exists, 'Studio/Modules/waf-sql/utils.js');
};

testCase.testCommunity_server_checkModule_wafSQL = function () {
	var file = File(wakandaCommunityPath_posix+"Server/Modules/waf-sql/client.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-sql/client.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-sql/package.json")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-sql/package.json');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-sql/sql.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-sql/sql.js');
	file = File(wakandaCommunityPath_posix+"Server/Modules/waf-sql/utils.js")
	Y.Assert.areSame(false, file.exists, 'Server/Modules/waf-sql/utils.js');
};

testCase.testCommunity_Uninstall = function () {
	build.uninstall(installerCommunityPath);

	var nbError = build.checkErrorInLog();
	Y.Assert.areSame(0, nbError, 'Error during uninstall');
	
	build.deleteLog();
};
