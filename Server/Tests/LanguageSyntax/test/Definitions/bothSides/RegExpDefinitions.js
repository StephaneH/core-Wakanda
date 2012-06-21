/**
* @author admin
*/

var regexp1 = /test/g;
var regexp2 = new RegExp(/test/g);
var regexp3 = regexp2;

function returnRegExp(){ return /test/g; }

var regexp4 = returnRegExp();
var regexp5;
regexp5 = regexp4;
var regexp6 = RegExp();