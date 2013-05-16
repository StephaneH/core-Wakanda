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
//mysql connector tests
var mysql = require('waf-mysql');

var platform = 'win';

if (application.os.isMac) {
    platform = 'mac';
}
else if (application.os.isLinux) {
    platform = 'linux';
}

var host = '194.98.194.72';

var params = {
    hostname: host,
    user: 'wakandaqa',
    password: 'wakandaqa',
    database: 'testdb_' + platform,
    port: 3306,
    ssl: false
};

//var params = {
//    hostname: '192.168.222.11',
//    user: 'abdessamad',
//    password: 'secret',
//    database: 'benchdb',
//    port: 3306,
//    ssl: false
//};
// 
var testCase = {
    name: "MySQLConnectorTest",

    _should: {
        ignore: {
            //Invalid connection params
            //testConnectWithNullParams : true,
            //testConnectWithInvalidHostname : true,
            //testConnectWithMissingParams : true,
            //testConnectWithAnInvalidUserNameType :true,
            //testConnectWithAnInvalidUserNameValue : true,
            //testConnectWithAnInvalidPasswordType : true,
            //testConnectWithAnInvalidPasswordValue : true,
            //testConnectWithAnInvalidPortType :true,
            //testConnectWithAnInvalidPortValue : true,
            //testConnectWithSSL : true,
            //testConnectWithSSLUsingTrueSSLUserWithTrueArg : true,
            //testConnectWithSSLUsingTrueSSLUserWithFalseArg :true,
            //testUseDatabaseExist : true,
            //testUseDatabaseLogic :true,
            //testExecuteExist : true,
            //testHasMoreResultsExist : true,
            //testGetResultCountExist : true,
            //testGetNextResultExist : true,
            //testCloseExist : true,
            ////ResultSet methods existence
            //testHasNextExist : true,
            //testGetRowsCountExist : true,
            //testGetColumnsCountExist : true,
            //testGetColumnNameExist : true,
            //testGetColumnFlagsExist : true,
            //testGetColumnTypeExist : true,
            //testIsSelectExist : true,
            //testIsErrorExist : true,
            //testGetAffectedRowCountExist : true,
            //testGetNextRowExist : true,
            //testGetNextRowsExist : true,
            //testSkipRowsExist : true,
            ////client functions
            //testHasMoreResults : true,
            //testGetResultCount : true,
            //testGetNextResultLogic : true,
            //testExecuteWithSelect : true,
            //testExecuteWithMultipleSelect : true,
            //testExecuteWithUpdate : true,
            //testExecuteWithInsert : true,
            //testExecuteWithDelete : true,
            //testSelectWithNoFieldsWithCondition: true,
            //testSelectWithNoFieldsWithoutCondition : true,
            //testSelectWithFieldsWithCondition: true,
            //testSelectWithFieldsWithoutCondition : true,
            //testHasMoreResultsExist : true,
            //testGetResultCountExist : true,
            //testSelectExist : true,
            //testDeleteExist : true,
            //testDeleteLogic : true,
            //testInsertExist :true,
            //testInsertLogic :true,
            //testUpdateExist :true,
            //testUpdateLogic : true,
            //testCloseExist : true,
            //testCloseLogic : true,
            //testHasNextExist :true,
            //testHasNextLogic : true,
            //testGetRowsCountLogic :true,
            //testGetColumnsCountLogic: true,
            ////Test Types
            //testSelectTinyInt :true,
            //testSelectInt :true,
            //testSelectBigInt :true,
            //testSelectSmallInt :true,
            //testSelectMediumInt :true,
            //testSelectFloat :true,
            //testSelectDouble :true,
            //testSelectString : true,
            //testSelectBlob :true,
            //testSelectDate :true,
            //testSelectDateTime : true,
            //testSelectTime : true,
            //testSelectYear : true,
            //testSelectBit :true,
            //testSelectDecimal : true,
            //testSelectDecimal :true,
            //testSelectEnum : true,
            //testSelectTimeStamp : true,
            ////PreparedStatement Tests;
            //testCreatePrpStmtExist :true,
            //testCreatePrpStmtWithMissingSetParams : true,
            //testSetNthParameterExist :true,
            //testExecutePstmtExist :true,
            //testSetNthParamUndefined :true,
            //testSetNthParamOutOfBound : true,
            //testCreatePrpStmtWithInsert :true,
            //testCreatePrpStmtWithUpdate :true,
            //testCreatePrpStmtIntValue :true,
            //testCreatePrpStmtInsertIntValue : true,
            //testCreatePrpStmtVarCharValue : true,
            //testCreatePrpStmtInsertVarCharValue : true,
            //testSetNthParameterExist :true,
            //testExecutePstmtExist : true,
            //testCreatePrpStmtWithoutParams : true,
            //testCreatePrpStmtDateTimeValue : true,
            //testCreatePrpStmtInsertDateTimeValue :true,
            //testCreatePrpStmtBlobValue : true,
            //testCreatePrpStmtInsertBlobValue :true,
            //testCreatePrpStmtDecimalValue : true,
            //testCreatePrpStmtInsertDecimalValue :true,
            //testCreatePrpStmtTEXTValue : true,
            //testCreatePrpStmtInsertTEXTValue :true,
            //testSetParametersExist :true,
            //testSetParametersLogic :true,
            //testSetParametersLogicWithMissingParam :true,
            //testGetParameterCountExist :true,
            //testGetParameterCountLogic :true,
            //testGetColumnCountExist :true,
            //testGetColumnCountLogic :true,
            //testGetColumnCountAfterExecute :true,
            //testSeveralPreparedStatement : true,
            ////NamedPreparedStatement Test
            //testCreateNamedPreparedStatementExists :true,
            //testCreateNamedPreparedStatementLogic : true,
            //testsetParameterOfNPSTMTExists :true,
            //testsetParametersOfNPSTMTExists :true,
            //testsetParamaterOfNpstmtLogic :true,
            //testExecuteNpstmt : true,
            //testExecuteNpstmtWithInvalidParamName: true,
            //testsetParamsWithNullList :true,
            //testSetParamWithEmptyParam : true,
            //testSetParamWithOneArgument :true,
            //testgetParameterCount :true,
            //testcreateNPstmtWithFakeParam :true    
      
        }
    },
    
    //testing to connect with no parameters
    testConnectWithNullParams: function() {
        var exceptionOccur = false;
        try {
            var dbconn = mysql.connect(null);
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur with null parameters!");
    },

    //testing to connect with invalid parameters
    testConnectWithInvalidHostname: function() {
        var invalidParams = {
            hostname: '0.0.0.0',
            user: 'root',
            password: '',
            database: '',
            port: 3306,
            ssl: false
        };
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(invalidParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        // Y.Assert.areSame(exceptionMsg, "Error: Failed to create a connected socket");
    },

    //testing to connect with incomplete parameters
    //in this case the ssl param
    testConnectWithMissingParams: function() {
        var missingParams = {
            hostname: 'localhost',
            user: 'root',
            password: '',
            database: '',
            port: 3306
        };
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(missingParams);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur with missing parameters!");
        Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #ssl, expected Boolean.", "incorrect exception message!");
    },

    //testing to connect with invalid userName type
    testConnectWithAnInvalidUserNameType: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 16, 'wakandaqa', '');
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!"); 
        Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #user, expected String.");
    },

    //testing to connect with invalid userName value
    testConnectWithAnInvalidUserNameValue: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 'boot', 'wakandaqa', '');
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg.substring(0,106), "An error occurred on the mysql server "+host+". The error message is \"Access denied for user 'boot'@'");
    },

    //testing to connect with invalid password type
    testConnectWithAnInvalidPasswordType: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 'wakandaqa', 12, '');
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #password, expected String.");
    },

    //testing to connect with invalid password value
    testConnectWithAnInvalidPasswordValue: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 'wakandaqa', 'boot', '');
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg.substring(0,111), "An error occurred on the mysql server "+host+". The error message is \"Access denied for user 'wakandaqa'@'");
    },

    //testing to connect with invalid port type
    testConnectWithAnInvalidPortType: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 'wakandaqa', 'wakandaqa', '', '33');
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #port, expected Number.");
    },

    //testing to connect with invalid port value
    testConnectWithAnInvalidPortValue: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 'wakandaqa', 'wakandaqa', '', 33);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Can't connect to 194.98.194.72:33.");
    },

    //testing to connect using ssl 
    testConnectWithSSL: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 'wakandaqa', 'wakandaqa', 'testdb_win', 3306, true);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");

    },

    //testing to connect using ssl user with true value in ssl argument
    testConnectWithSSLUsingTrueSSLUserWithTrueArg: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 'testssl', 'pwd', 'testdb_win', 3306, true);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");

    },

    //testing to connect using ssl user with false value in ssl argument
    testConnectWithSSLUsingTrueSSLUserWithFalseArg: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 'testssl', 'pwd', 'testdb_win', 3306, false);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg.substring(0,109), "An error occurred on the mysql server "+host+". The error message is \"Access denied for user 'testssl'@'");
    },



    //test if useDatabase function exist
    testUseDatabaseExist: function() {
        var useDatabaseExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.useDatabase) useDatabaseExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(useDatabaseExist, "useDatabase function definition is missing!");
    },

    //test if useDatabase function logic
    testUseDatabaseLogic: function() {
        var useDatabaseExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var tmp_db = params.database;
        try {
            var dbconn = mysql.connect(params);

            dbconn.useDatabase('testdb_mac');
            var rs = dbconn.execute("select database()");
            var row = rs.getNextRow();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        params.database = tmp_db;
        Y.Assert.areSame(row['database()'], "testdb_mac", "expected used database 'testdb_mac'!");
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);

    },

    //test if execute function exist
    testExecuteExist: function() {
        var executeExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.execute) executeExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(executeExist, "execute function definition is missing!");
    },

    testExecuteWithSelect: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT id FROM test_select_table';
            var rs = dbconn.execute(q);
            while (rs.hasNext()) {
                var row = rs.getNextRow();
                res.push(row.id);
            }
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(res.length, 2, "expected 2 ids!");
        Y.Assert.areSame(res[0], 1, "the first id is incorrect");
        Y.Assert.areSame(res[1], 2, "the second id is incorrect!");
    },

    testExecuteWithMultipleSelect: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var results = 0;
        var res = [];
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT id FROM test_select_table;SELECT string FROM test_select_table;';
            var rs = dbconn.execute(q);
            var i = 0;
            while (rs != null) {
                r = [];
                while (rs.hasNext()) {
                    var row = rs.getNextRow();
                    if (i == 0) {
                        r.push(row.id);
                    }
                    else {
                        r.push(row.string);
                    }
                }
                res.push(r);
                rs = dbconn.getNextResult();
                ++i;
            }
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(res[0][0], 1, "the first id is incorrect");
        Y.Assert.areSame(res[0][1], 2, "the second id is incorrect!");
        Y.Assert.areSame(res[1][0], "3", "the first string is incorrect");
        Y.Assert.areSame(res[1][1], "4", "the second string is incorrect!");
    },

    testExecuteWithUpdate: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = mysql.connect(params);
            var q1 = 'UPDATE test_execute_update_table SET number=0, string="0" WHERE id=1';
            dbconn.execute(q1);
            var q2 = 'SELECT number, string FROM test_execute_update_table WHERE id=1';
            var rs = dbconn.execute(q2);
            var row = rs.getNextRow();
            var n = row.number;
            var s = row.string;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(n, 0, "incorrect number!");
        Y.Assert.areSame(s, "0", "incorrect string!");
    },

    testExecuteWithInsert: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = mysql.connect(params);
            var q = 'INSERT INTO test_execute_update_table VALUES (1000, "1001", "1002");';
            dbconn.execute(q);
            var qq = 'SELECT number, string FROM test_execute_update_table WHERE id=1000';
            var rs = dbconn.execute(qq);
            var row = rs.getNextRow();
            var n = row.number;
            var s = row.string;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(n, 1001, "incorrect number!");
        Y.Assert.areSame(s, "1002", "incorrect string!");
    },

    testExecuteWithDelete: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = mysql.connect(params);
            var q1 = 'DELETE FROM test_execute_update_table WHERE id=1000';
            dbconn.execute(q1);
            var q2 = 'SELECT number, string FROM test_execute_update_table WHERE id=1000';
            var rs = dbconn.execute(q2);
            var rows = rs.getRowsCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows, 0, "incorrect rows number!");
    },

    testSelectWithNoFieldsWithCondition: function() {
        var exceptionOccur = false;
        try {
            var dbconn = mysql.connect(params);
            var rs = dbconn.select("*", "test_select_table", {
                id: 1
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },

    testSelectWithNoFieldsWithoutCondition: function() {
        var exceptionOccur = false;
        try {
            var dbconn = mysql.connect(params);
            var rs = dbconn.select("*", "test_select_table");
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },

    testSelectWithFieldsWithCondition: function() {
        var exceptionOccur = false;
        try {
            var dbconn = mysql.connect(params);
            var rs = dbconn.select("number,string", "test_select_table", {
                id: 1
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();

        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },

    testSelectWithFieldsWithoutCondition: function() {
        var exceptionOccur = false;
        try {
            var dbconn = mysql.connect(params);
            var rs = dbconn.select("number,string", "test_select_table");
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();

        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },



    //test if hasMoreResults function exist
    testHasMoreResultsExist: function() {
        var hasMoreResultsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.hasMoreResults) hasMoreResultsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(hasMoreResultsExist, "hasMoreResults function definition is missing!");
    },

    //test if getResultCount function exist
    testGetResultCountExist: function() {
        var getResultCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.getResultCount) getResultCountExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getResultCountExist, "getResultCount function definition is missing!");
    },

    //test if select function exist
    testSelectExist: function() {
        var selectExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.select) selectExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(selectExist, "select function definition is missing!");
    },



    //test if delete function exist
    testDeleteExist: function() {
        var deleteExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.delete) deleteExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(deleteExist, "delete function definition is missing!");
    },

    //test delete
    testDeleteLogic: function() {
        var exceptionOccur = false;
        try {
            var dbconn = mysql.connect(params);
            dbconn.delete("test_delete_table", {
                id: 1
            });
            var rs = dbconn.select("*", "test_delete_table", {
                id: 1
            });
            var rows = rs.getRowsCount();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(rows, 0, "no result shall be found!");
    },

    //test if insert function exist
    testInsertExist: function() {
        var insertExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.insert) insertExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(insertExist, "insert function definition is missing!");
    },

    //test insert
    testInsertLogic: function() {
        var exceptionOccur = false;
        var values = [];
        values.push({
            id: 10,
            number: 20,
            string: "30"
        });
        var row = {}
        try {
            var dbconn = mysql.connect(params);
            dbconn.insert("test_insert_table", values);
            var rs = dbconn.select("*", "test_insert_table", {
                id: 10
            });
            row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(row.id, 10, "Incorrect id value");
        Y.Assert.areEqual(row.number, 20, "Incorrect number value");
        Y.Assert.areEqual(row.string, "30", "Incorrect string value");
    },

    //test if update function exist
    testUpdateExist: function() {
        var updateExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.update) updateExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(updateExist, "update function definition is missing!");
    },

    //test update
    testUpdateLogic: function() {
        var exceptionOccur = false;
        try {
            var dbconn = mysql.connect(params);
            dbconn.update("test_update_table", {
                number: 0,
                string: "0"
            }, {
                id: 1
            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 1
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(row.number, 0, "the number is different");
        Y.Assert.areEqual(row.string, "0", "the string is different");
    },

    //test if getNextResult function exist
    testGetNextResultExist: function() {
        var getNextResultExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.getNextResult) getNextResultExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getNextResultExist, "getNextResult function definition is missing!");
    },

    //test getNextResult
    testGetNextResultLogic: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT id FROM test_select_table;SELECT number FROM test_select_table;';
            var results = 0;
            var rs = dbconn.execute(q);
            while (rs != null) {
                results += 1;
                rs = dbconn.getNextResult();
            }
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(results, 2, "expected 2 result sets!");
    },

    //test if close function exist
    testCloseExist: function() {
        var closeExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            if (dbconn.close) closeExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(closeExist, "close function definition is missing!");
    },

    //test close connection (test execut query after close connection
    testCloseLogic: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(host, 'wakandaqa', 'wakandaqa', 'testdb_win', 3306, false);
            if (dbconn) dbconn.close();
            var q = 'select * from test_select_table';
            dbconn.execute(q);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "Connection already closed.");
    },

    //testing all ResultSet methods exist
    //test if hasNext function exist
    testHasNextExist: function() {
        var hasNextExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.hasNext) hasNextExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(hasNextExist, "hasNext function definition is missing!");
    },

    testHasNextLogic: function() {
        var hasNextExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var hasnext = false;
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            hasnext = result.hasNext();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(hasnext, "an exeption was occur when trying to check hasnext on rs!");
    },

    //test if getRowsCount function exist
    testGetRowsCountExist: function() {
        var getRowsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getRowsCount) getRowsCountExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getRowsCountExist, "getRowsCount function definition is missing!");
    },

    //test if getRowsCount function logic
    testGetRowsCountLogic: function() {
        var getRowsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var count = 0;
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            count = result.getRowsCount()
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(count, 2, "getRowsCount function definition is missing!");
    },

    //test if getColumnsCount function exist
    testGetColumnsCountExist: function() {
        var getColumnsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getColumnsCount) getColumnsCountExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getColumnsCountExist, "getColumnsCount function definition is missing!");
    },

    //test if getColumnsCount function logic
    testGetColumnsCountLogic: function() {
        var getColumnsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var columnCount = 0;
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            columnCount = result.getColumnsCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(columnCount, 3, "getColumnsCount function definition is missing!");
    },

    //test if getColumnName function exist
    testGetColumnNameExist: function() {
        var getColumnNameExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getColumnName) getColumnNameExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getColumnNameExist, "getColumnName function definition is missing!");
    },

    //test if getColumnFlags function exist
    testGetColumnFlagsExist: function() {
        var getColumnFlagsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getColumnFlags) getColumnFlagsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getColumnFlagsExist, "getColumnFlags function definition is missing!");
    },

    //test if getColumnType function exist
    testGetColumnTypeExist: function() {
        var getColumnTypeExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getColumnType) getColumnTypeExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getColumnTypeExist, "getColumnType function definition is missing!");
    },

    //test if isSelect function exist
    testIsSelectExist: function() {
        var isSelectExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.isSelect) isSelectExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(isSelectExist, "isSelect function definition is missing!");
    },

    //test if isError function exist
    testIsErrorExist: function() {
        var isErrorExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.isError) isErrorExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(isErrorExist, "isError function definition is missing!");
    },

    //test if getAffectedRowCount function exist
    testGetAffectedRowCountExist: function() {
        var getAffectedRowCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getAffectedRowCount) getAffectedRowCountExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getAffectedRowCountExist, "getAffectedRowCount function definition is missing!");
    },

    //test if getNextRow function exist
    testGetNextRowExist: function() {
        var getNextRowExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getNextRow) getNextRowExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getNextRowExist, "getNextRow function definition is missing!");
    },

    //test if getNextRows function exist
    testGetNextRowsExist: function() {
        var getNextRowsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.getNextRows) getNextRowsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getNextRowsExist, "getNextRows function definition is missing!");
    },

    //test if skipRows function exist
    testSkipRowsExist: function() {
        var skipRowsExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table';
            var result = dbconn.execute(q);
            if (result.skipRows) skipRowsExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(skipRowsExist, "skipRows function definition is missing!");
    },

    //test hasMoreResults
    testHasMoreResults: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var results = 0;
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT id FROM test_select_table;SELECT number FROM test_select_table;';
            var rs = dbconn.execute(q);
            if (rs != null) {
                results = 1;
            }
            while (dbconn.hasMoreResults()) {
                ++results;
                dbconn.getNextResult();
            }
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(results, 2, "expected 2 result sets!");
    },

    //test getResultCount
    testGetResultCount: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT id FROM test_select_table;SELECT number FROM test_select_table;';
            dbconn.execute(q);
            var results = dbconn.getResultCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(results, 2, "expected 2 result sets!");
    },

    //Test Types
    //test tinyInt 
    testSelectTinyInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_tiny_int WHERE id >1;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[2].value, -128, "expected -128 as value!"); //check value
        Y.Assert.areSame(rows[0].value, 127, "expected 127 as value!"); //check value
    },
    //testSelectInt
    testSelectInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_int WHERE id = 1 OR id=3 ;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, -2147483648, "expected -2147483648  as value!"); //check value!
        Y.Assert.areSame(rows[1].value, 2147483647, "expected 2147483647 as value!"); //check value!
    },
    //test BigInt
    testSelectBigInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_big_int WHERE id =1 OR id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, -9223372036854775000, "expected  -9223372036854775000 as Value!");
        Y.Assert.areSame(rows[1].value, 9223372036854775000, "expected 9223372036854775000 as  Value!");
    },

    //test smallInt 
    testSelectSmallInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_small_int WHERE id =1 OR id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, -32768, "expected  -32768 as Value!");
        Y.Assert.areSame(rows[1].value, 32767, "expected 32767 as  Value!");
    },

    //test mediumint 
    testSelectMediumInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_medium_int WHERE id =1 OR id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, -8388608, "expected  -8388608 as Value!");
        Y.Assert.areSame(rows[1].value, 8388607, "expected 8388607 as  Value!");
    },

    //test float 
    testSelectFloat: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_float WHERE id >0;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, -3.40282e38, "expected  -3.40282e38 as Value!"); //check value
        Y.Assert.areSame(rows[2].value, -1.17549e-38, "expected -1.17549e-38 as  Value!"); //check value
        Y.Assert.areSame(rows[3].value, 1.17549e-38, "expected 1.17549e-38 as  Value!"); //check value
        Y.Assert.areSame(rows[4].value, 3.40282e38, "expected 3.40282e38 as  Value!"); //check value
    },

    //test Double
    testSelectDouble: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_double WHERE id >0;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, -1.7976931348623157e308, "expected  -1.7976931348623157e308 as Value!"); //check value
        Y.Assert.areSame(rows[2].value, -2.2250738585072e-308, "expected -2.2250738585072e-308 as  Value!"); //check value
        Y.Assert.areSame(rows[3].value, 2.2250738585072e-308, "expected 2.2250738585072e-308 as  Value!"); //check value
        Y.Assert.areSame(rows[4].value, 1.7976931348623157e308, "expected 1.7976931348623157e308 as  Value!"); //check value
    },

    //test String 
    testSelectString: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_string WHERE id <=1;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, 'test value', "expected  'test value' as Value!");
        Y.Assert.areSame(rows[1].value, '', "expected '' as  Value!");


    },
    //test blob 
    testSelectBlob: function() {
        var exceptionOccur = false;
        var buffer = new Buffer('\u00c9\u00cb\u00bb\u00cc\u00ce\u00b9\u00c8\u00ca\u00bc\u00cc\u00ce\u00b9\u00c9\u00cb\u00bb', 'binary');

        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_blob WHERE id =1 or id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value.toBuffer().toString('hex'), buffer.toString('hex'), "expected  blob object!");
        Y.Assert.areSame(rows[1].value, null, "expected null   Value!");


    },


    //test Date 
    testSelectDate: function() {
        var exceptionOccur = false;
        var date1 = new Date(1000, 0, 1);
        var date2 = new Date(9999, 11, 31);
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_date WHERE id =1 or id = 2;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value.toDateString(), date1.toDateString(), "expected  1000-01-01 as Value!");
        Y.Assert.areSame(rows[1].value.toDateString(), date2.toDateString(), "expected 9999-12-31  as Value!");

    },

    //test dateTime
    testSelectDateTime: function() {
        var exceptionOccur = false;
        var date1 = new Date(1000, 0, 1, 0, 0, 0);
        var date2 = new Date(9999, 11, 31, 23, 59, 59);
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_datetime WHERE id =1 or id = 2;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value.getUTCDate()+" " +rows[0].value.getUTCDay() , date1.getUTCDate()+ " "+date1.getUTCDay()); 
        Y.Assert.areSame(rows[0].value.getUTCMonth()+" " +rows[0].value.getUTCFullYear() , date1.getUTCMonth()+ " "+date1.getUTCFullYear());
        Y.Assert.areSame(rows[0].value.getUTCMinutes()+" " +rows[0].value.getUTCSeconds() , date1.getUTCMinutes()+ " "+date1.getUTCSeconds());
        
        Y.Assert.areSame(rows[1].value.getUTCDate()+" " +rows[1].value.getUTCDay() , date2.getUTCDate()+ " "+date2.getUTCDay());
        Y.Assert.areSame(rows[1].value.getUTCMonth()+" " +rows[1].value.getUTCFullYear() , date2.getUTCMonth()+ " "+date2.getUTCFullYear());
        Y.Assert.areSame(rows[1].value.getUTCMinutes()+" " +rows[1].value.getUTCSeconds() , date2.getUTCMinutes()+ " "+date2.getUTCSeconds());
    },
    //test time
    testSelectTime: function() {
        var exceptionOccur = false;
      
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_time WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, '00:00:00', "expected  '00:00:00' as Value!");
        Y.Assert.areSame(rows[1].value, '23:59:59', "expected  '23:59:59' as   Value!");
        Y.Assert.areSame(rows[2].value, null, "expected null as   Value!");

    },
    //test Year
    testSelectYear: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_year WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, 1901, "expected 1901 as Value!"); 
        Y.Assert.areSame(rows[1].value, 2155, "expected 2155 as  Value!"); 
        Y.Assert.areSame(rows[2].value, null, "expected null as Value!");

    },
    //test bit 
    testSelectBit: function() {
        var exceptionOccur = false;
   
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
			
            var q = 'SELECT value FROM test_bit WHERE id <=3;';
   
            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, false, "expected false as Value!");
        Y.Assert.areSame(rows[1].value, true, "expected true as Value!");
        Y.Assert.areSame(rows[2].value, null, "expected null as Value!");
   
    },
    //test Decimal 
    testSelectDecimal: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_decimal2 WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, '-9999999999', "expected '-9999999999' as Value!"); 
        Y.Assert.areSame(rows[1].value, '9999999999', "expected '9999999999' as  Value!"); 
        Y.Assert.areSame(rows[2].value, null, "expected null as Value!");

    },
      //test Set
    testSelectSet: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_set WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, '1', "expected '1' as Value!"); 
        Y.Assert.areSame(rows[1].value, 'one,test', "expected 'one,test' as  Value!"); 
        Y.Assert.areSame(rows[2].value, null, "expected null as Value!");

    },
    //test Enum
    testSelectEnum: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_enum WHERE id <=3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, 'Asia', "expected 'Asia' as Value!"); 
        Y.Assert.areSame(rows[1].value, 'Africa', "expected 'Africa' as  Value!"); 
        Y.Assert.areSame(rows[2].value, null, "expected null as Value!");

    },
       //test TimeStamp
    testSelectTimeStamp: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT value FROM test_timestamp WHERE id <=1;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
       
        Y.Assert.areSame(typeof rows[0].value.getTime,'function', "expected Date object!");

    },
  
    
    //PreparedStatement Tests;
    //test if createPreparedStatement function exists
    testCreatePrpStmtExist: function() {
        var createPrpStmtExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);

            if (dbconn.createPreparedStatement) createPrpStmtExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(createPrpStmtExist, "createPreparedStatement function definition is missing!");

    },

    // test createPreparedStatement with missing setparams
    testCreatePrpStmtWithMissingSetParams: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var pstmtNull = true;
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table WHERE id = ?';
            var pstmt = dbconn.createPreparedStatement(q);

            if (pstmt != null) pstmtNull = false
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(!pstmtNull, "createPreparedStatement doesn't return preparedStatement object!");
    },

    //test if setNthParameter function exists
    testSetNthParameterExist: function() {

        var setNthParameterExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table WHERE id = ?';
            var pstmt = dbconn.createPreparedStatement(q);


            if (pstmt.setNthParameter) setNthParameterExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(setNthParameterExist, "createPreparedStatement function definition is missing!");

    },

    //test if ptsmt.execute function exists    
    testExecutePstmtExist: function() {

        var executePstmtExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table WHERE id = ? ';
            var pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 2);

            if (pstmt.execute) executePstmtExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);

        Y.Assert.isTrue(executePstmtExist, "executeStatement function definition is missing!");

    },

    //test if setNthParameter (n,undefined) dont make server crash
    testSetNthParamUndefined: function() {

        var executePstmtExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table WHERE number = ? ';
            var pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, undefined);

            var ResultSet = pstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");

        Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #2.", "Unexpected message exception");

    },

    //test if setNthParameter out of bound parameter number 
    testSetNthParamOutOfBound: function() {

        var executePstmtExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table WHERE id = ? ';
            var pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(2, 8);

            var ResultSet = pstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        //Y.Assert.isFalse(exceptionOccur, "An exception shall occur here!" );
        Y.Assert.areSame(exceptionMsg, "Parameter index out of bound.");

    },

    //test creatPreparedStatementwithInsert
    testCreatePrpStmtWithInsert: function() {
        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;
        try {

            var dbconn = mysql.connect(params);
			dbconn.delete("test_int", {
                id: 3
            });
            var q = 'INSERT INTO test_int (id,value) Values (3,?);';
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 65);
            var resultSet = pstmt.execute();
			dbconn.delete("test_delete_table", {
                id: 3
            });

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        //Y.Assert.areSame(resultSet.length, 3, "expected 3 result sets!"); ReseultSet : OK packet
    },

    //test createPreparedStatement with Update
    testCreatePrpStmtWithUpdate: function() {
        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;
        try {

            var dbconn = mysql.connect(params);
            //change val
            var resultSet = dbconn.select("*", "test_update_table", {
                'ID': 1
            });

            var row = resultSet.getAllRows();
            var val = row[0].number + 1;
            var q = "UPDATE test_update_table SET number=? WHERE ID = 1";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, val);

            pstmt.execute();
            resultSet = dbconn.select("*", "test_update_table", {
                'ID': 1
            });
            var row2 = resultSet.getAllRows();


        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(row2[0].number, val, "expected " + val + " result sets!");
    },

    //test createPreparedStatement with Int type Select
    testCreatePrpStmtIntValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;
        try {

            var dbconn = mysql.connect(params);
            var q = "SELECT value from test_int WHERE ID =?";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 1);
            var resultSet = pstmt.execute();
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value, -2147483648, "expected -2147483648 result sets!");
    },

    //test createPrpStmtIntValue Insert
    testCreatePrpStmtInsertIntValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;

        try {

            var dbconn = mysql.connect(params);
            dbconn['delete']("test_int", {
                id: 2
            });
            var q = "INSERT INTO test_int(id,value) VALUES(?,?)";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 2);
            pstmt.setNthParameter(2, 123)
            var resultSet = pstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(resultSet.getAffectedRowCount(), 1, "expected  1 result sets!");
    },

    //test createPreparedStatement with varchar & char  type
    testCreatePrpStmtVarCharValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;

        try {

            var dbconn = mysql.connect(params);
            var q = "SELECT * FROM test_string WHERE id =?";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 0);
            var resultSet = pstmt.execute();
            var row = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(row[0].value, 'test value', "expected 'test value' result sets!");
    },

    //test createPrpStmtCharValue Insert
    testCreatePrpStmtInsertVarCharValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;

        try {

            var dbconn = mysql.connect(params);
            dbconn['delete']("test_string", {
                id: 2
            });
            var q = "INSERT INTO test_string(id,value) VALUES(?,?)";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 2);
            pstmt.setNthParameter(2, 'test value');

            var resultSet = pstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(resultSet.getAffectedRowCount(), 1, "expected 1 result sets!");
    },

    //test if setNthParameter function exists
    testSetNthParameterExist: function() {
        var setNthParameterExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table WHERE id= ?';
            var pstmt = dbconn.createPreparedStatement(q);


            if (pstmt.setNthParameter) setNthParameterExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(setNthParameterExist, "createPreparedStatement function definition is missing!");

    },

    //test if ptsmt.execute function exists    
    testExecutePstmtExist: function() {

        var executePstmtExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table WHERE id = ? ';
            var pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 1);

            if (pstmt.execute) executePstmtExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);

        Y.Assert.isTrue(executePstmtExist, "executeStatement function definition is missing!");

    },

    //test creatPreparedStatement without params
    testCreatePrpStmtWithoutParams: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;
        try {

            var dbconn = mysql.connect(params);
            var q = 'SELECT * FROM test_select_table limit 2;';
            pstmt = dbconn.createPreparedStatement(q);
            var resultSet = pstmt.execute();
            var row = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(row.length, 2, "expected 2 result sets!");
    },


 

    //test createPrpStmtDateTime  Insert
    testCreatePrpStmtInsertDateTimeValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;

        try {

            var dbconn = mysql.connect(params);
            dbconn['delete']("test_datetime", {
                id: 3
            });
            var q = "INSERT INTO test_datetime(id,value) VALUES(3,?)";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, new Date(2001, 5, 9, 16, 23, 0));
            var resultSet = pstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(resultSet.getAffectedRowCount(), 1, "expected 1 result sets!");
    },

    //test createPreparedStatement with blob type
    testCreatePrpStmtBlobValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;
        var buffer = new Buffer('\u00c9\u00cb\u00bb\u00cc\u00ce\u00b9\u00c8\u00ca\u00bc\u00cc\u00ce\u00b9\u00c9\u00cb\u00bb', 'binary');

        try {

            var dbconn = mysql.connect(params);
            var q = "SELECT * FROM test_blob WHERE ID=?";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 1);
            var resultSet = pstmt.execute();
            var rows = resultSet.getAllRows();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(rows[0].value.toBuffer().toString('hex'), buffer.toString('hex'), "expected Blob result sets!");
    },

    //test insert Blob by prepared Statement
//    testCreatePrpStmtInsertBlobValue: function() {
//        var exceptionOccur = false;
//        var pstmt = null;
//        var exceptionMsg = "";
//        var resultSet = null;
//        var buffer = new Buffer('\u00c8\u00c5\u00bb\u00cc\u00fe\u00a9\u00c8\u00ca\u001c\u00cb\u00cd\u00bd\u0089\u003b\u00ab', 'binary');

//        try {
//            var dbconn = mysql.connect(params);
//            dbconn['delete']("test_blob", {
//                id: 2
//            });
//            var q = "INSERT INTO test_blob(id,value) VALUES(2,?)";
//            pstmt = dbconn.createPreparedStatement(q);
//            pstmt.setNthParameter(1, buffer.toBlob("application/octet-stream")); //toBlob() without MIME Type makes Server Crash
//            var resultSet = pstmt.execute();
//        }
//        catch (err) {
//            exceptionOccur = true;
//            exceptionMsg = err;
//        }
//        if (dbconn) dbconn.close();
//        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
//        Y.Assert.areSame(resultSet.getAffectedRowCount(), 1, "expected 1 result sets!");
//    },
    //test createPreparedStatement with Decimal type
    testCreatePrpStmtDecimalValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;


        try {

            var dbconn = mysql.connect(params);

            var q = "SELECT value from  test_decimal WHERE ID =?";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 1);
            var resultSet = pstmt.execute();
            var row = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(row[0].value, '-9999999999', "expected -9999999999 result sets!");

    },


    //test CreatePreparedStatement with insert Decimal field
    testCreatePrpStmtInsertDecimalValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;


        try {

            var dbconn = mysql.connect(params);
            dbconn['delete']("test_decimal", {
                id: 2
            });
            var q = "INSERT INTO test_decimal(id,value) VALUES(2,?);";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 86.9564184582);

            var resultSet = pstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(resultSet.getAffectedRowCount(), 1, "expected 1 result sets!");
    },

    //test createPreparedStatement with TEXT type
    testCreatePrpStmtTEXTValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;
        var text = "dddddldldldldldldldldldldldldldc;xcxcwxccwxcxcxc scmlmclmssssmmsmdejkdekekfkdc, ,kckdkdkdkdcdcd12 deqaaaa dsssssxqxxxxdsdfsdfdfdsfsdfsdfdfdf";

        try {

            var dbconn = mysql.connect(params);
            var q = "select  value from test_text where id=?;";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 1);
            var resultSet = pstmt.execute();
            var row = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(row[0].value.toString(), text, "expected " + text);
    },

    //test createPreparedStatement Insert Text
    testCreatePrpStmtInsertTEXTValue: function() {

        var exceptionOccur = false;
        var pstmt = null;
        var exceptionMsg = "";
        var resultSet = null;
        var text = "aaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccc";
        text += "dddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
        text += "ffffffffffffffffffffffffggggggggggggggggggghhhhhhhhhhhhhhhhhhhhhhhhhhhh";
        text += "iiiiiiiiiiiiiiiiiiiiijjjjjjjjjjjjjjjjjjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk";

        try {

            var dbconn = mysql.connect(params);
            dbconn['delete']("test_text", {
                id: 2
            });
            var q = "INSERT INTO test_text(id,value) VALUES(2,?);";
            pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, text);
            var resultSet = pstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(resultSet.getAffectedRowCount(), 1, "expected 1 result sets!");
    },

    //test if setParameters exists
    testSetParametersExist: function() {

        var setParametersExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "INSERT INTO test_int(id,value) VALUES(?,?)";
            var pstmt = dbconn.createPreparedStatement(q);
            if (pstmt.setParameters) setParametersExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(setParametersExist, "createPreparedStatement function definition is missing!");
    },

    //test SetParameters logic
    testSetParametersLogic: function() {

        var exceptionOccur = false;

        var exceptionMsg = "";
        var resultSet = null;
        try {
            var dbconn = mysql.connect(params);
            var q = "SELECT * FROM test_select_table WHERE (id < ?) AND  (number < ? ) AND  (string > ?) ;";
            var pstmt = dbconn.createPreparedStatement(q);
            pstmt.setParameters([1000, 70, 'dd']);
            resultSet = pstmt.execute();
            var row = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        // Y.Assert.areSame(row.length, 996, "expected 996 result sets!");
    },
    //test setParameter with a missing parameters
    testSetParametersLogicWithMissingParam: function() {

        var exceptionOccur = false;

        var exceptionMsg = "";
        var resultSet = null;
        try {
            var dbconn = mysql.connect(params);
            var q = "SELECT * FROM test_select_table WHERE id < ? AND  number < ? AND  string > ? ;";
            var pstmt = dbconn.createPreparedStatement(q);
            pstmt.setParameters([1000, 70]);
            resultSet = pstmt.execute();
            var row = resultSet.getAllRows();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(exceptionMsg, "The parameter number 3 is missing.", "Unexpected message Exception");
    },

    //test if getParameterCount exists
    testGetParameterCountExist: function() {

        var getParameterCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "SELECT * FROM test_select_table WHERE id < ? AND  number < ? AND  string > ? ;";
            var pstmt = dbconn.createPreparedStatement(q);
            if (pstmt.getParameterCount) getParameterCountExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getParameterCountExist, "getParameterCount function definition is missing!");
    },

    //test getParameterCount logic
    testGetParameterCountLogic: function() {

        var getParameterCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var paramsCount = 0;
        try {
            var dbconn = mysql.connect(params);
            var q = "SELECT * FROM test_select_table WHERE id < ? AND  number < ? AND  string > ? ;";
            var pstmt = dbconn.createPreparedStatement(q);
            paramsCount = pstmt.getParameterCount();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(paramsCount, 3, "expected 3 parameters!");
    },

    //test if getColumnCount exists
    testGetColumnCountExist: function() {

        var getColumnCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "SELECT * FROM test_select_table WHERE id < ? ;";
            var pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 10);
            if (pstmt.getColumnCount) getColumnCountExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(getColumnCountExist, "getColumnCount function definition is missing!");

    },

    //test  getColumnCount logic
    testGetColumnCountLogic: function() {

        var getColumnCountExist = false;
        var exceptionOccur = false;
        var columnCount = 0;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "SELECT id,string FROM test_select_table WHERE id < ? ;";
            var pstmt = dbconn.createPreparedStatement(q);
            columnCount = pstmt.getColumnCount();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(columnCount, 2, "expected 2 column!");
    },

    //test getColumnCount after execute preparedStatement
    testGetColumnCountAfterExecute: function() {


        var exceptionOccur = false;
        var columnCount = 0;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "SELECT id,string FROM test_select_table WHERE id < ? ;";
            var pstmt = dbconn.createPreparedStatement(q);
            pstmt.setNthParameter(1, 3);
            pstmt.execute();
            columnCount = pstmt.getColumnCount();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(columnCount, 2, "expected 2 column!");

    },

    //test creat many prepared Statement
    testSeveralPreparedStatement: function() {

        var exceptionOccur = false;
        var pstmt = [];
        var columnCount = 0;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            for (var i = 0; i < 10; i++) {
                var q = "SELECT id,string FROM test_select_table WHERE id < ?;";
                pstmt.push(dbconn.createPreparedStatement(q));
                pstmt[i].setNthParameter(1, 3 * i);

            }
            columnCount = pstmt[6].getColumnCount();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(columnCount, 2, "expected 2 column!");

    },

    //NamedPreparedStatement Test
    //create NamedPreparedStatement Exists
    testCreateNamedPreparedStatementExists: function() {

        var createNamedPrpStmtExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);

            if (dbconn.createNamedPreparedStatement) createNamedPrpStmtExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(createNamedPrpStmtExist, "createNamedPreparedStatement function definition is missing!");

    },

    //test  NamedPreparedStatement Logic
    testCreateNamedPreparedStatementLogic: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "select * from test_npstmt where ID = :ID";
            var npstmt = dbconn.createNamedPreparedStatement(q);

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);


    },
    //test setParameter
    testsetParameterOfNPSTMTExists: function() {

        var setParameterExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);

            var q = "select * from test_npstmt where ID = :ID";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            if (npstmt.setParameter) setParameterExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(setParameterExist, "NamedPreparedStatement.setParameter function definition is missing!");

    },
    //test setParameters
    testsetParametersOfNPSTMTExists: function() {

        var setParametersExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);

            var q = "select * from test_npstmt where ID = :ID";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            if (npstmt.setParameters) setParametersExist = true;

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(setParametersExist, "NamedPreparedStatement.setParameters function definition is missing!");

    },

    //test setParameter of a namedPreparedStatement
    testsetParamaterOfNpstmtLogic: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "select * from test_npstmt where ID = :ID";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            npstmt.setParameter('ID', 1);
            //npstmt.execute();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);

    },

    //test Execute a namedPreparedStatement 
    testExecuteNpstmt: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "select * from test_npstmt where ID = :ID";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            npstmt.setParameter('ID', 1);
            npstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);

    },

    //test setParameter a invalid Param
    testExecuteNpstmtWithInvalidParamName: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "select * from test_npstmt where ID = :ID";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            npstmt.setParameter('InvalidParam', 1);
            npstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur!");
        Y.Assert.areSame(exceptionMsg, 'Parameter InvalidParam doesn\'t exist!', "incorrect exception message!");
    },

    

    //test setParameters with null params list
    testsetParamsWithNullList: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "select * from test_npstmt where ID = :ID";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            npstmt.setParameters(null);
            npstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();

        Y.Assert.areSame(exceptionMsg, 'Parameters can\'t be null!', "incorrect exception message!");
    },

    //test setParameter with empty param
    testSetParamWithEmptyParam: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "select * from test_npstmt where ID = :ID";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            npstmt.setParameter();
            npstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();

        Y.Assert.areSame(exceptionMsg, 'Parameter name & value are missing!', "incorrect exception message!");
    },

    //test setParameter with one argument
    testSetParamWithOneArgument: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = mysql.connect(params);
            var q = "select * from test_npstmt where ID = :ID";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            npstmt.setParameter('ID');
            npstmt.execute();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();

        Y.Assert.areSame(exceptionMsg, 'Parameter value is missing!', "incorrect exception message!");
    },
    //test getParameterCount 
    testgetParameterCount: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        var paramNumber = 0;
        try {
            var dbconn = mysql.connect(params);
            var q = "select * from test_npstmt where value = :d and  value like :d and id < :r";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            var paramNumber = npstmt.getParameterCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(paramNumber, 2, "incorrect parameter number!");
    },

    //test namedPreparedStatement with a fake param
    testcreateNPstmtWithFakeParam: function() {

        var exceptionOccur = false;
        var exceptionMsg = "";
        var paramNumber = 0;
        try {
            var dbconn = mysql.connect(params);
            var q = "select * from test_npstmt where value = ':a'";
            var npstmt = dbconn.createNamedPreparedStatement(q);
            var paramNumber = npstmt.getParameterCount();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(paramNumber, 0, "incorrect parameter number!");
    }


};
//require("unitTest").run(testCase).getReport()