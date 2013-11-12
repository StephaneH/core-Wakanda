
/*
PROCESS
-> Install a build
-> Check files
-> Uninstall du build
*/

// User to install in a specifed folder
if (typeof env === 'undefined' || typeof env.WAKANDAPATH === 'undefined')
	var wakandaPath = 'C:\\wakanda\\';
else
	var wakandaPath = env.WAKANDAPATH;

// Use to get the installer.msi file
if (typeof env === 'undefined' || typeof env.INSTALLERPATH === 'undefined') {
	if (typeof env !== 'undefined' && typeof env.BUILD_TEST_DIR !== 'undefined') 
		var installerPath = env.BUILD_TEST_DIR + '\\Installer.msi';
	else 
		var installerPath = 'C:\\Users\\yjego\\Desktop\\installeurWin\\Installer.msi';
}
else
	var installerPath = env.INSTALLERPATH;

// Use to check shortcuts
if (typeof env === 'undefined' || typeof env.PUBLIC === 'undefined')
	var publicPath = 'C:\\Users\\Public\\Desktop\\';
else
	var publicPath = env.PUBLIC + '\\Desktop\\';

// Use to check Enterprise or Standard installer
if (typeof env === 'undefined' || typeof env.ENTERPRISE === 'undefined')
	var isEnterprise = false;
else
	var isEnterprise = env.ENTERPRISE;
	
// Use to check Product Version ('4.129.661')
if (typeof env === 'undefined' || typeof env.PRODUCTVERSION === 'undefined') {
	var productVersion = '';
	if (typeof env === 'undefined' || typeof env.WAKANDA_BRANCH === 'undefined')
		productVersion += '0.';
	else {
		switch (env.WAKANDA_BRANCH.toLowerCase()) {
			case 'wak6':
				productVersion += '6.';
				break;
			default:
				productVersion += '0.';
				break;
		}
	}
	if (typeof env === 'undefined' || typeof env.CHANGELIST === 'undefined')
		productVersion += '000.000';
	else {
		productVersion += env.CHANGELIST.substr(0, 3) + '.' + env.CHANGELIST.substr(3);
	}
}
else
	var productVersion = env.PRODUCTVERSION;
	
var build = require('./moduleInstall');
var wakandaPath_posix = build.convertPathToPosix(wakandaPath);
var installerPath_posix = build.convertPathToPosix(installerPath);
var publicPath_posix = build.convertPathToPosix(publicPath);

var testCase = {
	name: 'Test of the installer on Win',

	test0_install: function () {
		build.install(installerPath, wakandaPath);
		var nbError = build.checkErrorInLog();
		Y.Assert.areSame(0, nbError, 'Error during install');
	},
	
	test1_checkProductVersion: function () {
		var logProductVersion= build.checkProductVersion();
		Y.Assert.areSame(productVersion, logProductVersion);
	},
	
	test2_checkInstalledStudioPath: function () {
		var file = File(wakandaPath + 'Studio/Wakanda Studio.exe');
		Y.Assert.isTrue(file.exists, 'Wakanda Studio.exe was not found');
	},
	
	test3_checkInstalledServerPath: function () {
		var file = File(wakandaPath + 'Server/Wakanda Server.exe');
		Y.Assert.isTrue(file.exists, 'Wakanda Server.exe was not found');
	},
	
	test4_checkStudioShortcuts: function () {
		var result = build.getTargetPathofShortcut(publicPath+'Wakanda Studio.lnk');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda Studio.exe', result, 'Wakanda Studio.lnk does not have the right path');
	},
	
	test5_checkServerShortcuts: function () {
		var result = build.getTargetPathofShortcut(publicPath+'Wakanda Server.lnk');
		Y.Assert.areSame(wakandaPath_posix+'Server/Wakanda Server.exe', result, 'Wakanda Server.lnk does not have the right path');
	},

	test6_checkWaDirectoryIcon: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wadirectory\\DefaultIcon');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda_doc.ico', result);
	},

	test7_checkWaDirectoryAssociations: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wadirectory\\shell\\open\\command');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
	},

	test8_checkWaModelIcon: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wamodel\\DefaultIcon');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda_doc.ico', result);
	},

	test9_checkWaModelAssociations: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wamodel\\shell\\open\\command');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
	},

	test10_checkWaPermIcon: function () {
		var result = build.getFileAssociation('HKCR\\WAK.waperm\\DefaultIcon');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda_doc.ico', result);
	},

	test11_checkWaPermAssociations: function () {
		var result = build.getFileAssociation('HKCR\\WAK.waperm\\shell\\open\\command');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
	},

	test12_checkWaProjectIcon: function () {
		var result = build.getFileAssociation('HKCR\\WAK.waproject\\DefaultIcon');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda_doc.ico', result);
	},

	test13_checkWaProjectAssociation: function () {
		var result = build.getFileAssociation('HKCR\\WAK.waproject\\shell\\open\\command');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
	},

	test14_checkWaSettingsIcon: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wasettings\\DefaultIcon');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda_doc.ico', result);
	},

	test15_checkWaSettingsAssociation: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wasettings\\shell\\open\\command');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
	},

	test16_checkWaSolutionIcon: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wasolution\\DefaultIcon');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda_doc.ico', result);
	},

	test17_checkWaSolutionAssociations: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wasolution\\shell\\open\\command');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
	},

	test18_checkWaSymIcon: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wasym\\DefaultIcon');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda_doc.ico', result);
	},

	test19_checkWaSymAssociations: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wasym\\shell\\open\\command');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
	},

	test20_checkWaSymDataIcon: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wasymdata\\DefaultIcon');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda_doc.ico', result);
	},

	test21_checkWaSymDataAssociations: function () {
		var result = build.getFileAssociation('HKCR\\WAK.wasymdata\\shell\\open\\command');
		Y.Assert.areSame(wakandaPath_posix+'Studio/Wakanda Studio.exe "%*"', result);
	},
	
	// List from //depot/Wakanda/main/Common/Visual/CF_Win_Entreprise.txt
	test22_checkRemoteEntityDLL: function () {
		var file = File(wakandaPath_posix+"Studio/RemoteEntity.dll")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/RemoteEntity.dll');
	},

	test23_checkSQLEntityDLL: function () {
		var file = File(wakandaPath_posix+"Studio/SQLEntity.dll")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/SQLEntity.dll');
	},

	test24_checkMySQLConnectorDLL: function () {
		var file = File(wakandaPath_posix+"Studio/MySQLConnector.dll")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/MySQLConnector.dll');
	},

	test25_checkSQLUtilitiesDLL: function () {
		var file = File(wakandaPath_posix+"Studio/SQLUtilities.dll")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/SQLUtilities.dll');
	},

	test26_checkSQLModelDLL: function () {
		var file = File(wakandaPath_posix+"Studio/SQLModel.dll")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/SQLModel.dll');
	},

	test27_checkMySQLConnectorBundle: function () {
		var file = File(wakandaPath_posix+"Studio/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Native Components/MySQLConnector.bundle/Contents/Resources/en.lproj/MySQLConnectorEN.xlf');
	},

	test28_checkWafMssqlJS: function () {
		var file = File(wakandaPath_posix+"Studio/Modules/waf-mssql.js")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Modules/waf-mssql.js');
	},

	test29_checkWafMysqlNativeJS: function () {
		var file = File(wakandaPath_posix+"Studio/Modules/waf-mysql-native.js")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Modules/waf-mysql-native.js');
	},

	test30_checkWafSqlJS: function () {
		var file = File(wakandaPath_posix+"Studio/Modules/waf-sql.js")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Modules/waf-sql.js');
	},

	test31_checkWafMssqlModule: function () {
		var file = File(wakandaPath_posix+"Studio/Modules/waf-mssql/client.js")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Modules/waf-mssql/client.js');
	},

	test32_checkWafMssqlModule: function () {
		var file = File(wakandaPath_posix+"Studio/Modules/waf-mssql/utils.js")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Modules/waf-mssql/utils.js');
	},

	test33_checkWafMysqlNativeModule: function () {
		var file = File(wakandaPath_posix+"Studio/Modules/waf-mysql-native/client.js")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Modules/waf-mysql-native/client.js');
	},

	test34_checkWafMysqlNativeModule: function () {
		var file = File(wakandaPath_posix+"Studio/Modules/waf-mysql-native/utils.js")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Modules/waf-mysql-native/utils.js');
	},

	test35_checkWafSqlModule: function () {
		var file = File(wakandaPath_posix+"Studio/Modules/waf-sql/client.js")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Modules/waf-sql/client.js');
	},

	test36_checkWafSqlModule: function () {
		var file = File(wakandaPath_posix+"Studio/Modules/waf-sql/utils.js")
		Y.Assert.areSame(isEnterprise, file.exists, 'Studio/Modules/waf-sql/utils.js');
	},

	test37_Uninstall: function () {
		build.uninstall(installerPath);

		var nbError = build.checkErrorInLog();
		Y.Assert.areSame(0, nbError, 'Error during uninstall');
		
		build.deleteLog();
	}
};
