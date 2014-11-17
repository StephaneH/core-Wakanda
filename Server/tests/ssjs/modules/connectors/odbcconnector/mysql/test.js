﻿
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
var wafsql = require('waf-sql');

var platform = 'win';

if (os.isMac) {
    platform = 'mac';
}
else if (os.isLinux) {
    platform = 'linux';
}


    var params = {
          dbType: 'odbc'
        , dsn: 'MySQL-test'
        , user: 'saad'
        , password: 'secret'
        
    };

var mshostname = '192.168.4.42';

var testCase = {
    name: "ODBC MySQL Tests",

    _should: {
        ignore: {
            testSelectDateTimePreparedStatement : false,

            testSelectDatePreparedStatement : true,
            testSelectDate : true,
            testSelectDateTime : true,

            testExecuteEmptyQuery : true // crash on windows



        }
    },

    setUp : function () {
        if (typeof this.initDone === 'undefined') {
           // Do it once:
           this.initDone = true;
                
            var xhr;

            xhr = new XMLHttpRequest({});
                        
            xhr.open('GET', 'http://'+mshostname+':8081/mySQL'+platform, false);

            xhr.send();

        }
    },
        
    testInsertDateWithApi: function(){
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            var res = dbconn.insert("test_date", [{
                id: 77,
                value: new Date()
            }]);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
    },
        //test insert blob 
    //    testInserttBlob_preparedStatement: function() {
    //        var exceptionOccur = false;
    //        var buffer = new Buffer('\u00c9\u00cb\u00bb\u00cc\u00ce\u00b9\u00c8\u00ca\u00bc\u00cc\u00ce\u00b9\u00c9\u00cb\u00bb', 'binary');
    //        var exceptionMsg = "";
    //        try {
    //            var dbconn = wafsql.connect(params);
    //            var q = 'insert into test_blob(id, value) values(5, ?)';

    //          var prep = dbconn.createPreparedStatement(q);
    //            prep.setNthParameter(1, buffer.toBlob());
    //            var resultSet = prep.execute(q);
    //            var rows = resultSet.getAllRows();
    //        }
    //        catch (err) {
    //            exceptionOccur = true;
    //            exceptionMsg = err.message;
    //        }
    //        if (dbconn) dbconn.close();
    //        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
    //        Y.Assert.areSame(rows[0].value.toBuffer().toString('hex'), buffer.toString('hex'), "expected  blob object!");
    //        Y.Assert.areSame(rows[1].value, null, "expected null Value!");

    //    },

    //  Prepared statement
    testSelectStringPreparedStatement: function(){
        
        session = wafsql.connect(params);
        q = 'select * from test_string where value = ?';
        pstmt = session.createPreparedStatement(q);
        pstmt.setNthParameter(1, "abcd");
        res = pstmt.execute();
        rows = res.getAllRows();
        
        Y.Assert.areSame(rows[0]['value'], "abcd", "expected abcd");
        
    },
    testSelectDatePreparedStatement: function(){
        
        var date1 = new Date(1000, 0, 1);
        
        session = wafsql.connect(params);
        q = 'select * from test_date where value = ?';
        pstmt = session.createPreparedStatement(q);
        pstmt.setNthParameter(1, date1);
        res = pstmt.execute();
        rows = res.getAllRows();
        
        Y.Assert.areSame(rows[0].value.toDateString(), date1.toDateString(), "expected  1000-01-01 as Value!");
        
    },
    
    testSelectDateTimePreparedStatement: function(){
        
        var date1 = new Date(Date.UTC(1000, 0, 1));
        var date2 = new Date(Date.UTC(9999, 11, 31));
        
        session = wafsql.connect(params);
        q = 'select * from test_date where value = ?';
        pstmt = session.createPreparedStatement(q);
        pstmt.setNthParameter(1, date1);
        res = pstmt.execute();
        rows1 = res.getAllRows();
        
        pstmt.setNthParameter(1, date2);
        res = pstmt.execute();
        rows2 = res.getAllRows();
        
        Y.Assert.areSame(rows1[0].value.toDateString(), date1.toDateString(), "expected  1000-01-01 as Value!");
        Y.Assert.areSame(rows2[0].value.toDateString(), date2.toDateString(), "expected  1000-01-01 as Value!");
        
    },
    //test if useDatabase function exist
    testUseDatabaseExist: function() {
        var useDatabaseExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
        var db_or = "testdb_"+platform;
        var db_tst = "test";
        try {
            var dbconn = wafsql.connect(params);

            dbconn.useDatabase(db_tst);
            var rs = dbconn.execute("select database()");
            dbconn.useDatabase(db_or);

            var row = rs.getNextRow();

        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.areSame(row['database()'], db_tst, "expected used database "+db_tst+"'!");
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);

    },

    //test if execute function exist
    testExecuteExist: function() {
        var executeExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(n, 0, "incorrect number!");
        Y.Assert.areSame(s, "0", "incorrect string!");
    },

    testExecuteWithInsert: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = wafsql.connect(params);
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
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(n, 1001, "incorrect number!");
        Y.Assert.areSame(s, "1002", "incorrect string!");
    },

    testExecuteWithDelete: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var res = [];
        try {
            var dbconn = wafsql.connect(params);
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
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            var rs = dbconn.select("*", "test_select_table", {
                id: 1
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },

    testSelectWithNoFieldsWithoutCondition: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            var rs = dbconn.select("*", "test_select_table", {});
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },

    testSelectWithFieldsWithCondition: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            var rs = dbconn.select("number,string", "test_select_table", {
                id: 1
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },

    testSelectWithFieldsWithoutCondition: function() {
        var exceptionOccur = false;
        var  exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            var rs = dbconn.select("number,string", "test_select_table", {});
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        
        Y.Assert.areEqual(rows, 0, "no result shall be found!");
    },

    //test if insert function exist
    testInsertExist: function() {
        var insertExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
    // testInsertLogic: function() {
    //     var exceptionOccur = false;
    //     var values = [];
    //     values.push({
    //         id: 10,
    //         number: 20,
    //         string: "30"
    //     });
    //     var row = {}
    //     try {
    //         var dbconn = wafsql.connect(params);
    //         dbconn.insert("test_insert_table", values);
    //         var rs = dbconn.select("*", "test_insert_table", {
    //             id: 10
    //         });
    //         row = rs.getNextRow();
    //     }
    //     catch (err) {
    //         exceptionOccur = true;
    //     }
    //     if (dbconn) dbconn.close();
    //     Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
    //     Y.Assert.areEqual(row.id, 10, "Incorrect id value");
    //     Y.Assert.areEqual(row.number, 20, "Incorrect number value");
    //     Y.Assert.areEqual(row.string, "30", "Incorrect string value");
    // },

    //test if update function exist
    testUpdateExist: function() {
        var updateExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        
        Y.Assert.areEqual(row.number, 0, "the number is different");
        Y.Assert.areEqual(row.string, "0", "the string is different");
    },

    //test if getNextResult function exist
    testGetNextResultExist: function() {
        var getNextResultExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
            if (dbconn) dbconn.close();
            var q = 'select * from test_select_table';
            dbconn.execute(q);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, "The session has been already closed!");
    },

    //testing all ResultSet methods exist
    //test if hasNext function exist
    testHasNextExist: function() {
        var hasNextExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
    testgetRowsCountExist: function() {
        var getRowsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
    testgetRowsCountLogic: function() {
        var getRowsCountExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        var count = 0;
        try {
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
            var q = 'SELECT value FROM test_big_int WHERE id =1 OR id = 3;';

            var resultSet = dbconn.execute(q);
            var rows = resultSet.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!" + exceptionMsg);
        Y.Assert.areSame(exceptionMsg, "The retreived value with ODBC is out of Javascript range of integer!");
    //        Y.Assert.areSame(rows[0].value, "-9223372036854775808", "expected  -9223372036854775808 as Value!");
    //        Y.Assert.areSame(rows[1].value, "9223372036854775807", "expected 9223372036854775807 as  Value!");
    },

    //test smallInt 
    testSelectSmallInt: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
        Y.Assert.areSame(rows[0].value.toLocaleString(), date1.toLocaleString(), "expected Wednesday, January 01, 1000 00:00:00 as Value!");
        Y.Assert.areSame(rows[1].value.toLocaleString(), date2.toLocaleString(), "expected Friday, December 31, 9999 23:59:59 as   Value!");

    },
    //test time
    testSelectTime: function() {
        var exceptionOccur = false;
      
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
            
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
        Y.Assert.areSame(rows[0].value, 0, "expected false as Value!");
        Y.Assert.areSame(rows[1].value, 1, "expected true as Value!");
        Y.Assert.areSame(rows[2].value, null, "expected null as Value!");

    },
    //test Decimal 
    testSelectDecimal: function() {
        var exceptionOccur = false;

        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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
            var dbconn = wafsql.connect(params);
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

     
    
    /****************************************/
    /*        TEST High Level Api           */
    /****************************************/

        //test if select function exist
    testHAPI1SelectExist: function() {
        var selectExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
    //test if insert function exist
    testHAPI2InsertExist: function() {
        var insertExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
    //test if update function exist
    testHAPI3UpdateExist: function() {
        var updateExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
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
    //test if delete function exist
    testHAPI4DeleteExist: function() {
        var deleteExist = false;
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            if (dbconn.delete)
                deleteExist = true;
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.isTrue(deleteExist, "delete function definition is missing!");
    },

    // H-API select
    // Select with conditions type number
    testHAPI1SelectWithConditionNumber: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            var rs = dbconn.select("*", "test_select_table", {
                id: 1
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },
    // Select with conditions type Date
    testHAPI1SelectWithConditionDate: function() {
        var exceptionOccur = false;
        var tadeCondition = new Date(9999, 11, 31, 23, 59, 59, 999);
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            var rs = dbconn.select("*", "test_datetime", {
                value: tadeCondition
            });
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn)
            dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!" + exceptionMsg);
        Y.Assert.areEqual(row.id, 2, "Incorrect item");
    },
    // Select without Condition empty object as a condition
    testHAPI1SelectWithoutConditionEmptyObject: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            var rs = dbconn.select("*", "test_select_table", {});
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message
        }
        if (dbconn)
            dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        // Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #3, expected Object.");
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        // Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },
    // Select without Condition empty param
    testHAPI1SelectWithoutConditionNoParam: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        try {
            var dbconn = wafsql.connect(params);
            var rs = dbconn.select("*", "test_select_table");
            var rowsCount = rs.getRowsCount();
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message
        }
        if (dbconn)
            dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
        // Y.Assert.areSame(exceptionMsg, "Wrong type for parameter #3, expected Object.");
        Y.Assert.areEqual(row.id, 1, "Incorrect id value");
        Y.Assert.areEqual(row.number, 2, "Incorrect number value");
        // Y.Assert.areEqual(row.string, "3", "Incorrect string value");
    },

    // H-API Insert
    // Insert Number String
    testHAPI2InsertNumberString: function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var values = [];
        values.push({
            id: 10,
            number: 20,
            string: "aaa"
        });
        var row = {};
        try {
            var dbconn = wafsql.connect(params);
            dbconn.insert("test_insert_table", values);
            var rs = dbconn.select("*", "test_insert_table", {
                id: 10
            });
            row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
        Y.Assert.areEqual(row.id, 10, "Incorrect id value");
        Y.Assert.areEqual(row.number, 20, "Incorrect number value");
        Y.Assert.areEqual(row.string, "aaa", "Incorrect string value");
    },
    // Insert date
    testHAPI2InsertDate: function() {
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        var exceptionOccur = false;
        var exceptionMsg = "";
        var values = [];
        values.push({
            id: 7,
            value: dat1
        });
        var row = {};
        try {
            var dbconn = wafsql.connect(params);
            dbconn.insert("test_datetime", values);
            var rs = dbconn.select("*", "test_datetime", {
                id: 7
            });
            row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMsg);
        Y.Assert.areEqual(row.id, 10, "Incorrect id value");
        Y.Assert.areEqual(row.number, 20, "Incorrect number value");
        Y.Assert.areEqual(row.string, "aaa", "Incorrect string value");
    },

    // H-API update
    //test update number, string with number condition
    testHAPI3UpdateNumberStringWithConditionNumber: function() {
        var exceptionOccur = false;
        try {
            var dbconn = wafsql.connect(params);
            dbconn.update("test_update_table", {
                number: 1,
                string: "chen"
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
        Y.Assert.areEqual(row.number, 1, "the number is different");
        Y.Assert.areEqual(row.string, "chen", "the string is different");
    },
    //test update String Without Condition
    testHAPI3UpdateStringWithoutConditionEmptyObject: function() {
        var exceptionOccur = false;
        var exceptionMessage;
        try {
            var dbconn = wafsql.connect(params);
            dbconn.update("test_update_table", {
                string: "all1"
            }, {

            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 1
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionMessage = err.message;
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMessage);
        Y.Assert.areEqual(row.number, 1, "the number is different");
        Y.Assert.areEqual(row.string, "all1", "the string is different");
    },
    //test update String Without Condition
    testHAPI3UpdateStringWithoutConditionNoParams: function() {
        var exceptionOccur = false;
        var errMessage;
        try {
            var dbconn = wafsql.connect(params);
            dbconn.update("test_update_table", {
                string: "all2"
            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 1
            });
            var row = rs.getNextRow();
            
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(row.number, 1, "the number is different");
        Y.Assert.areEqual(row.string, "all2", "the string is different");
    },
    //test update Number With Condition Date
    testHAPI3UpdateNumberWithConditionDate: function() {
        var exceptionOccur = false;
        try {
            var dbconn = wafsql.connect(params);
            var dat1 = new Date(2012, 11, 21, 1, 1, 1);
            dbconn.update("test_datetime", {
                id: 7
            },{
                value : dat1
            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 7
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(row.id, 7, "the number is different");
    },
    //test update Date Without Condition empty Object
    testHAPI3UpdateDateWithoutConditionEmptyObject: function() {
        var exceptionOccur = false;
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        try {
            var dbconn = wafsql.connect(params);
            dbconn.update("test_datetime", {
                value: dat1
            },{

            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 7
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(row.id, 7, "the number is different");
    },
    //test update Date Without Condition No params
    testHAPI3UpdateDateWithoutConditionEmptyObject: function() {
        var exceptionOccur = false;
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        try {
            var dbconn = wafsql.connect(params);
            dbconn.update("test_datetime", {
                value: dat1
            },{

            });
            var rs = dbconn.select("*", "test_update_table", {
                id: 7
            });
            var row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here ! " + errMessage);
        Y.Assert.areEqual(row.id, 7, "the number is different");
    },
    // H-API Delete
    // condition number
    testHAPI4DeleteWithConditionNumber: function() {
        var exceptionOccur = false;
        try {
            var dbconn = wafsql.connect(params);
            dbconn.delete("test_delete_table", {
                id: 1
            });
            var rs = dbconn.select("*", "test_delete_table", {
                id: 1
            });
            var rs = dbconn.execute("select * from test_delete_table where id = 1");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },
    // condition string
    testHAPI4DeleteWithConditionString: function() {
        var exceptionOccur = false;
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        try {
            var dbconn = wafsql.connect(params);
            dbconn.delete("test_insert_table", {
                string: "aaa"
            });
            var rs = dbconn.select("*", "test_insert_table", {
                id: 10
            });
            //var rs = dbconn.execute("select * from test_insert_table where id = 10");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here!");
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },
    // condition date
    testHAPI4DeleteWithConditionDate: function() {
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        var exceptionMessage = "";
        var exceptionOccur = false;
        try {
            var dbconn = wafsql.connect(params);
            dbconn.delete("test_datetime", {
                value: dat1
            });
            var rs = dbconn.select("*", "test_datetime", {
                id: 7
            });
            var rs = dbconn.execute("select * from test_datetime where id = 1");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + exceptionMessage);
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },
    // without conditions
    testHAPI4DeleteWithoutConditionEmptyObject: function() {
        var errMessage = "";
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        var exceptionOccur = false;
        var values = [];
        values.push({
            id: 11,
            number: 20,
            string: "aaa"
        });
        try {
            var dbconn = wafsql.connect(params);
            dbconn.insert("test_insert_table", values);
            dbconn.delete("test_insert_table", {
                
            });
            var rs = dbconn.execute("select * from test_insert_table");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },
    // without conditions
    testHAPI4DeleteWithoutConditionNoParam: function() {
        var errMessage = "";
        var dat1 = new Date(2012, 11, 21, 1, 1, 1);
        var exceptionOccur = false;
        var values = [];
        values.push({
            id: 12,
            number: 20,
            string: "aaa"
        });
        try {
            var dbconn = wafsql.connect(params);
            dbconn.insert("test_insert_table", values);
            dbconn.delete("test_insert_table");
            var rs = dbconn.select("*", "test_insert_table", {
                id: 12
            });
            var rs = dbconn.execute("select * from test_insert_table");
            var rows = rs.getAllRows();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here ! " + errMessage);
        Y.Assert.areEqual(rows.length, 0, "the row with id = 1 must be deleted");
    },


    /////////////////////////////////////////////////////////

    testHAPI2InsertDuplicatedRow : function() {
        var exceptionOccur = false;
        var exceptionMsg = "";
        var values = [];
        values.push({
            id: 2,
            value: 0
        });
        var row = {};
        try {
            var dbconn = wafsql.connect(params);
            dbconn.insert("test_int", values);
            var rs = dbconn.select("*", "test_insert_table", {
                id: 10
            });
            row = rs.getNextRow();
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg, 'Call to High Level API Insert Failed to insert entity!', "incorrect error message");
    },
    testExecuteWithInsertDuplicatedRow: function() {
        var exceptionOccur = false;
        var exceptionMsg1 = "";
        var exceptionMsg2 = "";
        var res = [];
        try {
            var dbconn = wafsql.connect(params);
            var q = 'INSERT INTO test_int VALUES (2, 0);';
            dbconn.execute(q);
        }
        catch (err) {
            exceptionOccur = true;
            exceptionMsg1 = err.messages[0];
            exceptionMsg2 = err.messages[1];
        }
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here!");
        Y.Assert.areSame(exceptionMsg1, 'The execution of the query "INSERT INTO test_int VALUES (2, 0);" failed on the server.', "incorrect error message 1");
        //Y.Assert.areSame(exceptionMsg2, 'ODBC message : "[Microsoft][Gestionnaire de pilotes ODBC] Erreur de séquence de la fonction", ODBC code: "HY010"', "incorrect error message 2");
    },
    testDeleteNonExistingRow_getColumnsCount : function(){
        var errMessage = "";
        var exceptionOccur = false,
            affectedRows = 2,
            isSelect = true;
        try {
            var dbconn = wafsql.connect(params);
            var res = dbconn.execute("DELETE FROM test_select_table WHERE ID = 987456");
            affectedRows = res.getColumnsCount();
            isSelect = res.isSelect();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(affectedRows, 0, "columnsCount must be 0");
        Y.Assert.isFalse(isSelect, "isSelect must return false");
    },
    testDeleteNonExistingRow_getAffectedRowCount : function(){
        var errMessage = "";
        var exceptionOccur = false,
            affectedRows = 2,
            isSelect = true;
        try {
            var dbconn = wafsql.connect(params);
            var res = dbconn.execute("DELETE FROM test_select_table WHERE ID = 987456");
            affectedRows = res.getAffectedRowCount();
            isSelect = res.isSelect();
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areEqual(affectedRows, 0, "affectedRows must be 0");
        Y.Assert.isFalse(isSelect, "isSelect must return false");
    },
    /////////////////////////////////
    testExecuteEmptyQuery : function(){
        var errMessage = "";
        var exceptionOccur = false,
            affectedRows = 2,
            isSelect = true;
        try {
            var dbconn = wafsql.connect(params);
            var res = dbconn.execute("");
            
        }
        catch (err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        if (dbconn) dbconn.close();
        Y.Assert.isTrue(exceptionOccur, "An exception shall occur here! ");
        Y.Assert.areSame(exceptionMessage, "Empty query execution forbidden!", "incorrect error message");
    },
    testNamedPreparedStatementStringParam : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE string = :stringParam",
            expectedRows = [
                [
                    {
                        id : 2,
                        number : 3,
                        string : "4"
                    }
                ],
                [
                    {
                        id : 1,
                        number : 2,
                        string : "3"
                    }
                ]
            ];
        try{
            var dbconn = wafsql.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameter("stringParam", "4");
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameter("stringParam", "3");
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(JSON.stringify(rows), JSON.stringify(expectedRows), "wrong results !");
    },
    testNamedPreparedStatementNumberParam : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE number = :numberParam",
            expectedRows = [
                [
                    {
                        id : 2,
                        number : 3,
                        string : "4"
                    }
                ],
                [
                    {
                        id : 1,
                        number : 2,
                        string : "3"
                    }
                ]
            ];

        try{
            var dbconn = wafsql.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameter("numberParam", 3);
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameter("numberParam", 2);
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }

        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
    },
    testNamedPreparedStatementDateParam : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_date WHERE value = :dateParam",
            date1 = new Date( Date.UTC(9999, 11, 31) ),
            date2 = new Date( Date.UTC(1000, 0, 1) );

        try{

            var dbconn = wafsql.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameter("dateParam", date1);
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameter("dateParam", date2);
            var res = npst.execute();
            rows.push(res.getAllRows());
            
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1,         "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1,         "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id, 2,          "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id, 1,          "incorrect id 2");
        Y.Assert.areSame(rows[0][0].value.toUTCString(), date1.toUTCString(),   "incorrect date 1");
        Y.Assert.areSame(rows[1][0].value.toUTCString(), date2.toUTCString(),   "incorrect date 2");
    },
    testNamedPreparedStatementObjectParamString : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE string = :stringParam";

        try{
            var dbconn = wafsql.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "stringParam" : "4"
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "stringParam" : "3"
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1, "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1, "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id, 2,  "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id, 1,  "incorrect id 2");
    },
    testNamedPreparedStatementObjectParamNumber : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE number = :numberParam";

        try{
            var dbconn = wafsql.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "numberParam" : 3
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "numberParam" : 2
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1,         "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1,         "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id, 2,          "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id, 1,          "incorrect id 2");
    },
    testNamedPreparedStatementObjectParamDate : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_date WHERE value = :dateParam",
            date1 = new Date( Date.UTC(9999, 11, 31) ),
            date2 = new Date( Date.UTC(1000, 0, 1) );

        try{
            var dbconn = wafsql.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "dateParam" : date1
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "dateParam" : date2
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur,     "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1,  "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1,  "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id,  2,  "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id,  1,  "incorrect id 2");
    },
    testNamedPreparedStatementObjectParametNumberString : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_select_table WHERE string = :stringParam and number = :numberParam";

        try{
            var dbconn = wafsql.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "stringParam" : "4",
                "numberParam"   : 3
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "stringParam" : "3",
                "numberParam"   : 2
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur,     "No exception shall occur here! " + errMessage);
        Y.Assert.areSame(rows[0].length, 1,  "incorrect number of rows");
        Y.Assert.areSame(rows[1].length, 1,  "incorrect number of rows");
        Y.Assert.areSame(rows[0][0].id,  2,  "incorrect id 1");
        Y.Assert.areSame(rows[1][0].id,  1,  "incorrect id 2");
    },
    testNamedPreparedStatementObjectParametNumberDate : function(){
        var exceptionOccur = false,
            errMessage = "",
            rows = [],
            q = "SELECT * FROM test_date WHERE id = :numberParam and value = :dateParam",
            date1 = new Date( Date.UTC(9999, 11, 31) ),
            date2 = new Date( Date.UTC(1900, 0, 1) );

        try{
            var dbconn = wafsql.connect(params);
            var npst = dbconn.createNamedPreparedStatement(q);

            npst.setParameters({
                "dateParam" : date1,
                "numberParam"   : 3
            });
            var res = npst.execute();
            rows.push(res.getAllRows());

            npst.setParameters({
                "dateParam" : date1,
                "numberParam"   : 2
            });
            var res = npst.execute();
            rows.push(res.getAllRows());
        }
        catch(err) {
            exceptionOccur = true;
            errMessage = err.message;
        }
        
        Y.Assert.isFalse(exceptionOccur, "No exception shall occur here! " + errMessage);
    }
};

// /!\ REMOVE OR COMMENT THIS LINE BEFORE PUBLISHING THE TEST /!\ 
/**
    var tmp = require("unitTest").run(testCase).getReport();
    var ar = tmp['ODBC MySQL Tests'];
    var logo = [];
    logo.push(ar.total);
    var n = 0;
    for(var v in ar){
        if(ar[v].result == 'fail'){
            n++;
            logo .push(ar[v]);
        }
    }
    logo .push(n);
    logo;
/**/