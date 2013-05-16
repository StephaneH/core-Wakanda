var mysql = require('waf-mysql');
var connectionParams = {
    hostname: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'myBase',
    ssl: false
};

var dbconn = mysql.connect(connectionParams);

var res =dbconn.execute('show tables;');
res=res.getAllRows();
