/*
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
/**
* @author Sebastien.Courvoisier@4d.com
*/

var testCase = {
	name: "Sample",

    _should: {
        ignore: {
            testShouldBeIgnored: true
        }
    },
    
    setUp : function () {
        console.log("Setup Sample");
        this._should.ignore.testShouldBeIgnoredToo = true;
    },
 
    tearDown : function () {
        console.log("TearDown Sample");
    },
    
	testWillPass: function() {
		Y.Assert.isTrue(typeof setTimeout == "function");
		Y.Assert.isTrue(typeof clearTimeout == "function");
		Y.Assert.isTrue(typeof setInterval == "function");
		Y.Assert.isTrue(typeof clearInterval == "function");
		Y.Assert.isTrue(typeof undefinedFunction == "undefined");
		Y.ArrayAssert.itemsAreSimilar([1, 2, 3], [3, 2, 1]);
	},
	
	testWillFail: function() {
		Y.ArrayAssert.itemsAreSimilar([1, 2, 3], [1, 2, 3, 4]);
	},
    
    testShouldBeIgnored: function() {
		Y.Assert.areSame(true, false);
	},
    
    testShouldBeIgnoredToo: function() {
		Y.Assert.areSame(1, 2);
	} 
};