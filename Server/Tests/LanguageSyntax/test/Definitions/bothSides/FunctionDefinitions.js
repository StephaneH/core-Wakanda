/**
* @author admin
*/

function f1() { }

function f2(a) { }

function f3(a,b,c) { }

function f4() { return ""; }

function f5() { var foo = ""; foo = 2; return foo; }
/**
* @returns {String}
*/
function f6() {}

/**
* @returns {String|Number}
*/
function f7() { }

/**
* @returns {String}
*/
function f8() { return 2;}

/**
* @returns {String|Number}
*/
function f9() { return true;}

/**
* @param {String} a
*/
function f10(a) { return a;}

/**
* @param {String|Number} a
*/
function f11(a) { return a;}

/**
* @param {String|Number} a
*/
function f12(a) { a = true; return a;}

/**
* @returns {UnknownObject}
*/
function f13() { }

/**
* @returns {KnownObject}
*/
function KnownObject() { }
/**
* @returns {KnownObject}
*/
function f14() { }

var f15 = function() { };

/**
* @returns {KnownObject}
*/
var f16 = function someFunction(a,b,c) { return ""; };

f17 = function someOtherFunction(a,b,c) { return ""; };

var f18 = f17;

f19 = f18;

function wrapFunction() {
	var foo = "";
	
	function f20() { 
		return foo;
	}
}