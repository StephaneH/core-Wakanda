/**
* @author admin
*/

var arr1 = [ "foo", "bar", "baz" ];
var arr2 = new Array();
var arr3 = arr2;

function returnArray(){ return [ "foo", "bar", "baz" ]; }

var arr4 = returnArray();
var arr5;
arr5 = arr4;
var arr6 = Array();
var arr7 = [,,,];
var arr8 = [];
var arr9 = [,"foo",,"bar","baz"];
var foo = true, arr10 = [];