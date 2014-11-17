﻿var testCase = {    name: "myFirstTestCase",    testReceiveTextFrom4D: function() {        var result;        result = ds.WikiStuff.find("ID = :1", 1).getText();        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fTxt;        if (result != fieldValue) {            Y.Assert.fail("4D method returned an incorrect text value: " + result);        }    },    testReceiveRealFrom4D: function() {        var result;        result = ds.WikiStuff.find("ID = :1", 1).getReal();        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fReal;        if (result != fieldValue) {            Y.Assert.fail("4D method returned an incorrect real value: " + result);        }    },    testReceiveBooleanFrom4D: function() {        var result;        result = ds.WikiStuff.find("ID = :1", 1).getBool();        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fBool;        if (result != fieldValue) {            Y.Assert.fail("4D method returned an incorrect boolean value: " + result);        }    },    testReceiveDateFrom4D: function() {        var result;        result = ds.WikiStuff.find("ID = :1", 1).getDate(); // retourne un format de date auquel il manque les millisecondes        var dateFrom4DMethod = new Date(result);        var result2;        result2 = dateFrom4DMethod.toISOString();        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fDate.toISOString();        if (result2 != fieldValue) {            Y.Assert.fail("4D method returned an incorrect date value: " + result);        }    },    testReceiveStringFrom4D: function() {        var result;        result = ds.WikiStuff.find("ID = :1", 1).getString();        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fS255;        if (result != fieldValue) {            Y.Assert.fail("4D method returned an incorrect text value: " + result);        }    },    testReceiveTimeFrom4D: function() {        var result;        result = ds.WikiStuff.find("ID = :1", 1).getTime();        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fTime;        if (result != fieldValue) {            Y.Assert.fail("4D method returned an incorrect time value: " + result);        }    },    testReceiveLongFrom4D: function() {        var result;        result = ds.WikiStuff.find("ID = :1", 1).getLong();        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fLng;        if (result != fieldValue) {            Y.Assert.fail("4D method returned an incorrect long value: " + result);        }    },        testReceiveObjectFrom4D: function() {                var result;                result = ds.WikiStuff.find("ID = :1", 1).getObject();                var recordValue;                recordValue = ds.WikiStuff.find("ID = :1", 1);                                for (var fieldValue in result) {                     if (result.hasOwnProperty(fieldValue)) {                    	if (result[fieldValue] != recordValue[fieldValue]) {                        	Y.Assert.fail("Something goes wrong here: " + result[fieldValue]);                        }												                      }                }        },                            // -----------------------------------------------------------------------------------------             testSendTextTo4D: function() {        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fTxt;		var bool;		bool = ds.WikiStuff.find("ID = :1", 1).sendText(fieldValue);        if (bool != true) {            Y.Assert.fail("The following text parameter was not received by 4D: " + fieldValue);        }    },            testSendRealTo4D: function() {        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fReal;		var bool;		bool = ds.WikiStuff.find("ID = :1", 1).sendReal(fieldValue);        if (bool != true) {            Y.Assert.fail("The following real parameter was not received by 4D: " + fieldValue);        }    },        testSendBooleanTo4D: function() {        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fBool;		var bool;		bool = ds.WikiStuff.find("ID = :1", 1).sendBoolean(fieldValue);        if (bool != true) {            Y.Assert.fail("The following boolean parameter was not received by 4D: " + fieldValue);        }    },            testSendTimeTo4D: function() {        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fTime;		var bool;		bool = ds.WikiStuff.find("ID = :1", 1).sendTime(fieldValue);        if (bool != true) {            Y.Assert.fail("The following time parameter was not received by 4D: " + fieldValue);        }    },        testSendLongTo4D: function() {        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fLng;		var bool;		bool = ds.WikiStuff.find("ID = :1", 1).sendLong(fieldValue);        if (bool != true) {            Y.Assert.fail("The following long parameter was not received by 4D: " + fieldValue);        }    },                    testSendStringTo4D: function() {        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fS255;		var bool;		bool = ds.WikiStuff.find("ID = :1", 1).sendString(fieldValue);        if (bool != true) {            Y.Assert.fail("The following string parameter was not received by 4D: " + fieldValue);        }    },            testSendDateTo4D: function() {        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fDate.toISOString();		var bool;		bool = ds.WikiStuff.find("ID = :1", 1).sendDate(fieldValue);             if (bool != true) {            Y.Assert.fail("The following string parameter was not received by 4D: " + fieldValue);        }    },      testSend30RealParametersTo4D: function() {        var result;        result = ds.WikiStuff.howManyParameters(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30);             if (result != true) {            Y.Assert.fail("4D should return true");        }    },       testSendObjectTo4D: function() {        var fieldValue;        fieldValue = ds.WikiStuff.find("ID = :1", 1).fS255;        var stuff = {};		stuff.fS255 = fieldValue;		var bool;		bool = ds.WikiStuff.find("ID = :1", 1).sendStuff(stuff);        if (bool != true) {            Y.Assert.fail("An object parameter was not received by 4D");        }    }};