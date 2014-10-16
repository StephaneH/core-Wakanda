﻿function mount(image) {	if (typeof env === 'undefined' || typeof env.TESTBASEPATH === 'undefined') {		if (typeof application !== 'undefined' && typeof application.getFolder === 'function') {			var scriptPath = application.getFolder('path') + 'scriptMac.sh';		} else {			return [];		}	} else {		var scriptPath = env.TESTBASEPATH + '/Installer/scriptMac.sh';	}	var chmodWorker = new SystemWorker('bash -c "chmod 775 ' + scriptPath + '"');	chmodWorker.onterminated = function() {		exitWait();	}	wait();	var output = '';	var mountWorker = new SystemWorker(scriptPath + ' "' + image + '"');	mountWorker.onmessage = function() {		output += arguments[0].data.toString();	};	mountWorker.onterminated = function() {		exitWait();	}	wait();	var result = [];	output.replace(/^\s+/g, '').replace(/\s+$/g, '').split(/\r?\n/).forEach(function(outputLine) {		if (/wakanda\s/i.test(outputLine) && !(/\.dmg/i.test(outputLine))) {			result.push({				device: outputLine.split(/\s/i)[0],				mountPoint: outputLine.split(/\s/i).slice(2).join(' ')			});		}	});	return result;}function umount(device) {	var output = '';	var umountWorker = new SystemWorker('hdiutil detach "' + device + '" -force');	umountWorker.onterminated = function() {		exitWait();	}	umountWorker.onmessage = function() {		output += arguments[0].data.toString();	};	wait();	return output.replace(/^\s+/g, '').replace(/\s+$/g, '').split(/\r?\n/);}function baseName(str) {	var base = new String(str).substring(str.lastIndexOf('/') + 1);	return base;}function similarity(a, b) {	var lengthA = a.length;	var lengthB = b.length;	var equivalency = 0;	var minLength = (a.length > b.length) ? b.length : a.length;	var maxLength = (a.length < b.length) ? b.length : a.length;	for (var i = 0; i < minLength; i++) {		if (a[i] == b[i]) {			equivalency++;		}	}	var weight = equivalency / maxLength;	return (weight * 100);}function similar_text(first, second, percent) {	if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {		return 0;	}	first += '';	second += '';	var pos1 = 0,		pos2 = 0,		max = 0,		firstLength = first.length,		secondLength = second.length,		p, q, l, sum;	max = 0;	for (p = 0; p < firstLength; p++) {		for (q = 0; q < secondLength; q++) {			for (l = 0;				(p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++)			;			if (l > max) {				max = l;				pos1 = p;				pos2 = q;			}		}	}	sum = max;	if (sum) {		if (pos1 && pos2) {			sum += similar_text(first.substr(0, pos1), second.substr(0, pos2));		}		if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {			sum += similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max,				secondLength - pos2 - max));		}	}	if (!percent) {		return sum;	} else {		return (sum * 200) / (firstLength + secondLength);	}}var installerCommunityAvailable = false;var installerEnterpriseAvailable = false;var imagePath = null;var imagePathEnterprise = null;var mounted = null;if (typeof env !== 'undefined' && typeof env.WAKANDA_INSTALLER_PATH !== 'undefined') {	var paths = env.WAKANDA_INSTALLER_PATH.split(',');	paths.forEach(function(item) {		if (/enterprise/i.test(item)) {			installerEnterpriseAvailable = true;			imagePathEnterprise = item;		} else {			installerCommunityAvailable = true;			imagePath = item;		}	});}var testCase = {	name: 'Test of the installers on Mac',	test0CommunityName: function() {		Y.Assert.isTrue(installerCommunityAvailable, "Community installer not available or not found");		var fileName = baseName(imagePath);		Y.Assert.isTrue(/^wakanda-all-in-one-[a-z0-9]+-\d+\.dmg$/i.test(fileName), "Installer file name '" + fileName + "'' does not conform to the expected pattern: ^wakanda-all-in-one-[a-z0-9]+-\\d+\\.dmg$");		var matches = /^wakanda-all-in-one-([a-z0-9]+)-(\d+)\.dmg$/i.exec(fileName);		if (env.WAKANDA_BRANCH.toLowerCase() === "main") {			var version = "Dev";		} else {			var version = "v" + /wak(\d+)/i.exec(env.WAKANDA_BRANCH)[1];		}		Y.Assert.areSame(version, matches[1], "Wrong version in installer file name");		Y.Assert.areSame(parseInt(env.CHANGELIST), parseInt(matches[2]), "Wrong changelist in installer file name");	},	test0EnterpriseName: function() {		Y.Assert.isTrue(installerEnterpriseAvailable, "Enterprise installer not available or not found");		var fileName = baseName(imagePathEnterprise);		Y.Assert.isTrue(/^wakanda-enterprise-all-in-one-[a-z0-9]+-\d+\.dmg$/i.test(fileName), "Installer file name '" + fileName + "'' does not conform to the expected pattern: ^wakanda-enterprise-all-in-one-[a-z0-9]+-\\d+\\.dmg$");		var matches = /^wakanda-enterprise-all-in-one-([a-z0-9]+)-(\d+)\.dmg$/i.exec(fileName);		if (env.WAKANDA_BRANCH.toLowerCase() === "main") {			var version = "Dev";		} else {			var version = "v" + /wak(\d+)/i.exec(env.WAKANDA_BRANCH)[1];		}		Y.Assert.areSame(version, matches[1], "Wrong version in installer file name");		Y.Assert.areSame(parseInt(env.CHANGELIST), parseInt(matches[2]), "Wrong changelist in installer file name");	},	test0MountCommunity: function() {		var mountImages = mount(imagePath);		Y.Assert.isArray(mountImages);		Y.Assert.areSame(1, mountImages.length, "Installer couldn't be mounted or is already mounted");		Y.Assert.isNotNull(mountImages[0], "Image not mounted (1)");		Y.Assert.isObject(mountImages[0], "Image not mounted (2)");		Y.Assert.isString(mountImages[0].device, "Device not defined");		Y.Assert.isString(mountImages[0].mountPoint, "Mount point not defined");		mounted = mountImages[0];	},	test1HasExpectedContentCommunity: function() {		Y.Assert.isNotNull(mounted, "Installer couldn't be mounted");		var mountedFolder = Folder(mounted.mountPoint);		Y.Assert.isTrue(mountedFolder.exists, "Target folder '" + mounted.mountPoint + "' doesn't exist");		var actual = [];		mountedFolder.forEachFolder(function(folder) {			if (/wakanda/i.test(folder.name)) {				actual.push(folder.name);			}		});		Y.ArrayAssert.itemsAreSimilar(['Wakanda Studio.app', 'Wakanda Server.app'], actual);	},	test2CheckVersionCommunity: function() {		Y.Assert.isNotNull(mounted, "Installer couldn't be mounted");		var studioInfo = '';		var getStudioInfoWorker = new SystemWorker('defaults read "' + mounted.mountPoint + '/Wakanda Studio.app/Contents/Info.plist" CFBundleShortVersionString');		getStudioInfoWorker.onmessage = function() {			studioInfo += arguments[0].data.toString();		};		getStudioInfoWorker.onterminated = function() {			exitWait();		}		wait();		var serverInfo = '';		var getServerInfoWorker = new SystemWorker('defaults read "' + mounted.mountPoint + '/Wakanda Server.app/Contents/Info.plist" CFBundleShortVersionString');		getServerInfoWorker.onmessage = function() {			serverInfo += arguments[0].data.toString();		};		getServerInfoWorker.onterminated = function() {			exitWait();		}		wait();		Y.Assert.areSame('9 build 9.' + env.CHANGELIST, studioInfo.replace(/^\s+/g, '').replace(/\s+$/g, ''));		Y.Assert.areSame('9 build 9.' + env.CHANGELIST, serverInfo.replace(/^\s+/g, '').replace(/\s+$/g, ''));	},	test3CheckLicenseCommunity: function() {		Y.Assert.isNotNull(mounted, "Installer couldn't be mounted");		var expected = File(env.P4_WORKSPACE_PATH + '/depot/Wakanda/WAK9/Common/Licenses/license_Stabilisation.txt');		var actual = File(env.WORKSPACE + '/license.txt');		Y.Assert.isTrue(expected.exists, "Expected license not found");		Y.Assert.isTrue(actual.exists, "Actual license not found");		var expectedContent = expected.toString().replace(/[^a-z]+/gi, '').replace(/^\s+/g, '').replace(/\s+$/g, '');		var actualContent = actual.toString().replace(/[^a-z]+/gi, '').replace(/^\s+/g, '').replace(/\s+$/g, '').substr(0, expectedContent.length);		var similar = similar_text(expectedContent, actualContent, true); //similarity(expectedContent, actualContent);		Y.Assert.isTrue(similar >= 99, "The actual license differs too much from the expected one: " + similar.toFixed(1) + "% of similarity");	},	test4UmountCommunity: function() {		Y.Assert.isNotNull(mounted, "Installer couldn't be mounted");		var result = umount(mounted.device);		Y.Assert.isArray(result, "Wrong result for umount (1)");		Y.Assert.areSame(2, result.length, "Wrong result for umount (2)");		var mountedFolder = Folder(mounted.mountPoint);		Y.Assert.isFalse(mountedFolder.exists, "Installer couldn't be umounted");	},	test5MountEnterprise: function() {		mounted = null;		var mountImages = mount(imagePathEnterprise);		Y.Assert.isArray(mountImages);		Y.Assert.areSame(1, mountImages.length, "Installer couldn't be mounted or is already mounted");		Y.Assert.isNotNull(mountImages[0], "Image not mounted (1)");		Y.Assert.isObject(mountImages[0], "Image not mounted (2)");		Y.Assert.isString(mountImages[0].device, "Device not defined");		Y.Assert.isString(mountImages[0].mountPoint, "Mount point not defined");		mounted = mountImages[0];	},	test6HasExpectedContentEnterprise: function() {		Y.Assert.isNotNull(mounted, "Installer couldn't be mounted");		var mountedFolder = Folder(mounted.mountPoint);		Y.Assert.isTrue(mountedFolder.exists, "Target folder '" + mounted.mountPoint + "' doesn't exist");		var actual = [];		mountedFolder.forEachFolder(function(folder) {			if (/wakanda/i.test(folder.name)) {				actual.push(folder.name);			}		});		Y.ArrayAssert.itemsAreSimilar(['Wakanda Enterprise Studio.app', 'Wakanda Enterprise Server.app'], actual);	},	test7CheckVersionEnterprise: function() {		Y.Assert.isNotNull(mounted, "Installer couldn't be mounted");		var studioInfo = '';		var getStudioInfoWorker = new SystemWorker('defaults read "' + mounted.mountPoint + '/Wakanda Enterprise Studio.app/Contents/Info.plist" CFBundleShortVersionString');		getStudioInfoWorker.onmessage = function() {			studioInfo += arguments[0].data.toString();		};		getStudioInfoWorker.onterminated = function() {			exitWait();		}		wait();		var serverInfo = '';		var getServerInfoWorker = new SystemWorker('defaults read "' + mounted.mountPoint + '/Wakanda Enterprise Server.app/Contents/Info.plist" CFBundleShortVersionString');		getServerInfoWorker.onmessage = function() {			serverInfo += arguments[0].data.toString();		};		getServerInfoWorker.onterminated = function() {			exitWait();		}		wait();		Y.Assert.areSame('9 build 9.' + env.CHANGELIST, studioInfo.replace(/^\s+/g, '').replace(/\s+$/g, ''));		Y.Assert.areSame('9 build 9.' + env.CHANGELIST, serverInfo.replace(/^\s+/g, '').replace(/\s+$/g, ''));	},	test8CheckLicenseEnterprise: function() {		Y.Assert.isNotNull(mounted, "Installer couldn't be mounted");		var expected = File(env.P4_WORKSPACE_PATH + '/depot/Wakanda/WAK9/Common/Licenses/licenseEnterprise_Stabilisation.txt');		var actual = File(env.WORKSPACE + '/license.txt');		Y.Assert.isTrue(expected.exists, "Expected license not found");		Y.Assert.isTrue(actual.exists, "Actual license not found");		var expectedContent = expected.toString().replace(/[^a-z]+/gi, '').replace(/^\s+/g, '').replace(/\s+$/g, '');		var actualContent = actual.toString().replace(/[^a-z]+/gi, '').replace(/^\s+/g, '').replace(/\s+$/g, '').substr(0, expectedContent.length);		var similar = similar_text(expectedContent, actualContent, true); //similarity(expectedContent, actualContent);		Y.Assert.isTrue(similar >= 99, "The actual license differs too much from the expected one: " + similar.toFixed(1) + "% of similarity");	},	test9UmountEnterprise: function() {		Y.Assert.isNotNull(mounted, "Installer couldn't be mounted");		var result = umount(mounted.device);		Y.Assert.isArray(result, "Wrong result for umount (1)");		Y.Assert.areSame(2, result.length, "Wrong result for umount (2)");		var mountedFolder = Folder(mounted.mountPoint);		Y.Assert.isFalse(mountedFolder.exists, "Installer couldn't be umounted");	}};if (typeof runFromCLI === 'undefined' || runFromCLI === false) {	require('unitTest').run(testCase).getReport();}