﻿/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
// sessionStorage tests.var testCase = {		name:	"sessionStorageTest",			// Test if sessionStorage exists. 		testIsAvailable: function () {				Y.Assert.isObject(sessionStorage);			},		// Test direct set and get of key/value.		testDirectUse: function () {				sessionStorage.testKey1 = 123;		Y.Assert.areEqual(sessionStorage.testKey1, 123);					},		// Test setItem() and getItem().		testSetGetItem: function () {						sessionStorage.setItem("testKey2", "test");		Y.Assert.areEqual(sessionStorage.getItem("testKey2"), "test");			},		// Test "mixed use", direct set and get along with use of setItem() and getItem().		testMixedUse: function () {				sessionStorage.setItem("testKey3", 456);		Y.Assert.areEqual(sessionStorage.testKey3, 456);				sessionStorage.testKey4 = 789;		Y.Assert.areEqual(sessionStorage.getItem("testKey4"), 789);			},		// Test length attribute, so far 4 key/value pairs have been created.		testLength: function () {				Y.Assert.areEqual(sessionStorage.length, 4);			},		// Test deletion.		testDeletion: function () {				// If trying to remove a not existing key, do nothing.			sessionStorage.removeItem("doNothing");						// Do deletions.				sessionStorage.removeItem("testKey3");		Y.Assert.areEqual(sessionStorage.length, 3);				delete sessionStorage.testKey4;		Y.Assert.areEqual(sessionStorage.length, 2);			// If key isn't set, sessionStorage will return null.				Y.Assert.areEqual(sessionStorage.testKey4, null);		Y.Assert.areEqual(sessionStorage.getItem("testKey3"), null);				},		// Test enumeration.		testEnumeration: function () {		
		nbOK = 0;		for (x in sessionStorage) {			if (x == "testKey1") {
				nbOK++;
			}
			if (x == "testKey2") {
				nbOK++;
			}					}
		Y.Assert.isTrue( nbOK == 2 );			},		// Test key() method. 		testKeyMethod: function () {				// If index is not valid, return null.				Y.Assert.areEqual(sessionStorage.key(-1), null);		Y.Assert.areEqual(sessionStorage.key(sessionStorage.length), null);				// Order of elements is unspecified.				var x = sessionStorage.key(1);				Y.Assert.isTrue(x == "testKey1" || x == "testKey2");			},		// Test clear() method.		testClearMethod: function () {				sessionStorage.clear();		Y.Assert.areEqual(sessionStorage.length, 0);			},		// Test structured cloning for loop support.		testStructuredCloneLoop: function () {				var	object = { someMember: 123 };				object.loop = object;				sessionStorage.test = object;				var	x = sessionStorage.test;				Y.Assert.areEqual(x, x.loop);					}	 };// require("unitTest").run(testCase).getReport();