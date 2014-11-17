
    ////////////////////////////////////////////////
    //////////// ENVIRONEMENT VARIABLES ////////////
    ////////////////////////////////////////////////

var testCase = {
    name: "LDAP Connector",

    _should: {
        ignore: {
            testRead    :   false,
            testReadNewVar  :   false,
            testReadNonnexistingVar :   false,
            testReadNewVarWithSpace :   false,
            testSetDelete   :   false,
            testCreateReadDeleteVariableWithNameVar :   false,
            testCreateReadDeleteVariableWithNameNull    :   false,
            testCreateReadDeleteVariableWithNameUndefined   :   false,
            testCreateReadDeleteVariableWithNameNumber  :   false,
            testCreateReadDeleteVariableWithNameDate    :   false,
            testCreateReadDeleteVariableWithNameFunction    :   false,
            testCreateReadDeleteVariableWithNameObject  :   false,
            testCreateReadDeleteVariableWithValueVar    :   false,
            testCreateReadDeleteVariableWithValueNull   :   false,
            testCreateReadDeleteVariableWithValueUndefined  :   false,
            testCreateReadDeleteVariableWithValueNumber :   false,
            testCreateReadDeleteVariableWithValueDate   :   false,
            testCreateReadDeleteVariableWithValueFunction   :   false,
            testCreateReadDeleteVariableWithValueObject :   false,
            testWriteNumberReadString   :   false,
            testWriteStringReadNumber   :   false
        }
    },
    
    setUp: function() {
    },
    
    testRead : function(){
        var myvar = "", myvalue = "myvalue", exceptionOccur = false, exceptionMessage = "";
        var bufferResult;
        var stringResult;
        var ret;
        var jsonFromString;
        var obj1, obj2;

        try{
            var bufferResult = SystemWorker.exec('node -e "console.log(process.env);"');
            var stringResult = bufferResult.output.toString('ASCII');
            var ret = stringResult.trim();
            var jsonFromString = eval("(" + ret + ")");
            obj1 = process.env;
            obj2 = jsonFromString;
        }
        catch(err){
            exceptionOccur = true;
        //  exceptionMessage = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        for(var it in obj1){
            Y.Assert.areSame(obj1[it], obj2[it], it + " in not correct");
        }
    },
    
    testReadNewVar : function(){
        var exceptionOccur = false, exceptionMessage = "";
        var myval = "";
    
        try{
            process.env['myvar'] = "myval";
            myval = process.env["myvar"];
        }
        catch(err){
            exceptionOccur = true;
        //  exceptionMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(myval, "myval", "results are not same !");
    },
    
    testReadNonnexistingVar : function(){
        var exceptionOccur = false, exceptionMessage = "";
        var myval;
    
        try{
            myval = process.env["nonExistingVar"];
        }
        catch(err){
            exceptionOccur = true;
        //  exceptionMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.isUndefined(myval, "the variable must be undefined !");
    },
    
    testReadNewVarWithSpace : function(){
        var exceptionOccur = false, exceptionMessage = "";
        var myval = "";
    
        try{
            process.env['my var'] = "my val";
            myval = process.env["my var"];
        }
        catch(err){
            exceptionOccur = true;
        //  exceptionMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(myval, "my val", "results are not same !");
    },
    
    testSetDelete : function(){
        var exceptionOccur = false, exceptionMessage = "";
        var myvalSet,
            myvalDel;
    
        try{
            process.env["var"] = "val";
            myvalSet = process.env["var"];
            delete process.env["var"];
            myvalDel = process.env["var"];

        }
        catch(err){
            exceptionOccur = true;
        //  exceptionMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areSame(myvalSet, "val", "results are not same !");
        Y.Assert.isUndefined(myvalDel, "the variable must be undefined");
    },

    
    testCreateReadDeleteVariableWithNameVar : function(){
        var mustBeUndef,
            mustBeOk = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['var'] = 'ok';
            mustBeOK = process.env['var'];
            delete process.env['var'];
            mustBeUndef = process.env['var'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustBeOK, 'ok', "the content of process.env['var'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['var'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithNameNull : function(){
        var mustBeUndef,
            mustBeOk = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['null'] = 'ok';
            mustBeOK = process.env['null'];
            delete process.env['null'];
            mustBeUndef = process.env['null'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustBeOK, 'ok', "the content of process.env['null'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['null'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithNameUndefined : function(){
        var mustBeUndef,
            mustBeOk = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['undefined'] = 'ok';
            mustBeOK = process.env['undefined'];
            delete process.env['undefined'];
            mustBeUndef = process.env['undefined'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustBeOK, 'ok', "the content of process.env['undefined'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['undefined'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithNameNumber : function(){
        var mustBeUndef,
            mustBeOk = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['Number'] = 'ok';
            mustBeOK = process.env['Number'];
            delete process.env['Number'];
            mustBeUndef = process.env['Number'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustBeOK, 'ok', "the content of process.env['Number'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['Number'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithNameDate : function(){
        var mustBeUndef,
            mustBeOk = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['Date'] = 'ok';
            mustBeOK = process.env['Date'];
            delete process.env['Date'];
            mustBeUndef = process.env['Date'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustBeOK, 'ok', "the content of process.env['Date'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['Date'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithNameFunction : function(){
        var mustBeUndef,
            mustBeOk = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['function'] = 'ok';
            mustBeOK = process.env['function'];
            delete process.env['function'];
            mustBeUndef = process.env['function'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustBeOK, 'ok', "the content of process.env['function'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['function'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithNameObject : function(){
        var mustBeUndef,
            mustBeOk = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['Object'] = 'ok';
            mustBeOK = process.env['Object'];
            delete process.env['Object'];
            mustBeUndef = process.env['Object'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustBeOK, 'ok', "the content of process.env['Object'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['Object'] still defined after remove");
    },
    
    ////////////////////////////////////////////////////////

    testCreateReadDeleteVariableWithValueVar : function(){
        var mustBeUndef,
            mustBeOk = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['varAtt'] = "var";
            mustBeOK = process.env['varAtt'];
            delete process.env['varAtt'];
            mustBeUndef = process.env['varAtt'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustBeOK, 'var', "the content of process.env['varAtt'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['varAtt'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithValueNull : function(){
        var mustBeUndef,
            mustBeVar = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['nullAtt'] = "var";
            mustBeVar = process.env['nullAtt'];
            delete process.env['nullAtt'];
            mustBeUndef = process.env['nullAtt'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustBeVar, 'var', "the content of process.env['nullAtt'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['nullAtt'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithValueUndefined : function(){
        var mustBeUndef,
            mustContainStringUsedined = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['undefinedAtt'] = 'undefined';
            mustContainStringUsedined = process.env['undefinedAtt'];
            delete process.env['undefinedAtt'];
            mustBeUndef = process.env['undefinedAtt'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustContainStringUsedined, 'undefined', "the content of process.env['undefinedAtt'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['undefinedAtt'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithValueNumber : function(){
        var mustBeUndef,
            mustContainStringNumber = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['NumberAtt'] = 'Number';
            mustContainStringNumber = process.env['NumberAtt'];
            delete process.env['NumberAtt'];
            mustBeUndef = process.env['NumberAtt'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustContainStringNumber, 'Number', "the content of process.env['NumberAtt'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['NumberAtt'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithValueDate : function(){
        var mustBeUndef,
            mustContainStringDate = "";
            
        var exceptionOccur = false,
            errMessage = "";
        try{
            process.env['DateAtt'] = 'Date';
            mustContainStringDate = process.env['DateAtt'];
            delete process.env['DateAtt'];
            mustBeUndef = process.env['DateAtt'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustContainStringDate, 'Date', "the content of process.env['DateAtt'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['DateAtt'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithValueFunction : function(){
        var mustBeUndef,
            mustContainStringFunction = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['functionAtt'] = 'function';
            mustContainStringFunction = process.env['functionAtt'];
            delete process.env['functionAtt'];
            mustBeUndef = process.env['functionAtt'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustContainStringFunction, 'function', "the content of process.env['functionAtt'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['functionAtt'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithValueObject : function(){
        var mustBeUndef,
            mustContainStringObject = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['ObjectAtt'] = 'Object';
            mustContainStringObject = process.env['ObjectAtt'];
            delete process.env['ObjectAtt'];
            mustBeUndef = process.env['ObjectAtt'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustContainStringObject, 'Object', "the content of process.env['ObjectAtt'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['ObjectAtt'] still defined after remove");
    },
    
    testCreateReadDeleteVariableWithValueObject : function(){
        var mustBeUndef,
            mustContainStringObject = "";
            
        var exceptionOccur = false,
            errMessage = "";
            
        try{
            process.env['ObjectAtt'] = 'Object';
            mustContainStringObject = process.env['ObjectAtt'];
            delete process.env['ObjectAtt'];
            mustBeUndef = process.env['ObjectAtt'];
        }
        catch(err){
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + errMessage);
        Y.Assert.areSame(mustContainStringObject, 'Object', "the content of process.env['ObjectAtt'] is not correct");
        Y.Assert.isUndefined(mustBeUndef, "process.env['ObjectAtt'] still defined after remove");
    },

    testWriteNumberReadString : function(){
        var exceptionOccur = false, exceptionMessage = "";
        var myval = "";
    
        try{
            process.env[11] = "one";
            myval = process.env["11"];
        }
        catch(err){
            exceptionOccur = true;
            exceptionMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + exceptionMessage);
        Y.Assert.areSame(myval, "one", "results are not same !");
    },
    
    testWriteStringReadNumber : function(){
        var exceptionOccur = false, exceptionMessage = "";
        var myval = "";
    
        try{
            process.env["22"] = "two";
            myval = process.env[22];
        }
        catch(err){
            exceptionOccur = true;
            exceptionMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + exceptionMessage);
        Y.Assert.areSame(myval, "two", "results are not same !");
    },

    testWriteNumberReadStringValue : function(){
        var exceptionOccur = false, exceptionMessage = "";
        var myval = "";
    
        try{
            process.env["containsNumber"] = 7;
            myval = process.env["containsNumber"];
        }
        catch(err){
            exceptionOccur = true;
            exceptionMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here. The error message : " + exceptionMessage);
        Y.Assert.areSame(myval, "7", "results are not same !");
    }

};

// /!\ REMOVE OR COMMENT THIS LINES BEFORE PUBLISHING THE TEST /!\ 
/**
    var ar = require("unitTest").run(testCase).getReport()['LDAP Connector'];
    var logo = [];
    logo.push(ar.total);
    var n = 0;
    for (var v in ar) {
        if (ar[v].result == 'fail') {
            n++;
            logo.push(ar[v]);
        }
    }
    logo.push(n);
    logo;
/**/