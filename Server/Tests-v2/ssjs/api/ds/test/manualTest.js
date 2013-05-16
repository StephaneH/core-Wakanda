/**

* @author admin

*/
var mysql = require('waf-mysql');
var host = '194.98.194.72';

var params = {
    hostname: host,
    user: 'wakandaqa',
    password: 'wakandaqa',
    database: 'testSQLBridge',
    port: 3306,
    ssl: false
};

var dbconn = mysql.connect(params);
var l =dbconn.execute('select cdate from MyClass1 where id =5').getAllRows();
l;