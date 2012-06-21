function MySimpleClass1()  { }
var vInstance0 = new MySimpleClass1();
/**
* @class mySimpleClass2
*/
function mySimpleClass2()  { }

function MyCompleteClass(foo) {
	var privateProperty = "I'm a private property";
	this.publicProperty = "I'm a public property";
	function privateMethod() { return "I'm a private method";}
	var privateMethod2 = function() { return "I'm also a private method";};
	this.privilegedMethod = function() { return "I'm a privileged method";};
}

MyCompleteClass.prototype.publicProperty2 = "I'm a public property";
MyCompleteClass.prototype.publicMethod = function() { return "I'm a public method"};
MyCompleteClass.staticProperty = "I'm a static property";
MyCompleteClass.staticMethod = "I'm a static method";

var vInstance1 = new MyCompleteClass();
var vInstance2 = vInstance1;
vInstance3 = new MyCompleteClass();

function returnAMyCompleteClassInstance() {
	return new MyCompleteClass();
}

var vInstance4 = returnAMyCompleteClassInstance();


/* Simple inheritance example:
*
*  - class MyClass1 extends class MyMotherClass1
*  - the "vInstance5" variable is an instance of both MyClass1 and MyMotherClass1 classes
*/

function MyMotherClass1() {
	this.mcp1 = true;
	this.mcm1 = function() { }
}

/**
* @extends MyMotherClass1
*/
function MyClass1() {
	this.p1 = true;
	this.m1 = function() { }
}

var vInstance5 = new MyClass1();


/* Ascending inheritance example:
*
*  - MyMotherClass2 extends MyMotherClass1
*  - MyClass extends MyMotherClass2
*  - the test "vInstance6" is an instance of both MyClass, MyMotherClass1 and MyMotherClass2 classes.
*/

/**
* @extends MyMotherClass1
*/
function MyMotherClass2() {
	this.mcp2 = true;
	this.mcm2 = function() { }
}

/**
* @extends MyMotherClass2
*/
function MyClass2() {
	this.p2 = true;
	this.m2 = function() { }
}

var vInstance6 = new MyClass2();


/* Multiple inheritance example:
*
*  - MyClass3 extends MyMotherClass1
*  - MyClass3 extends MyMotherClass3
*  - the "vInstance7" variable is an instance of both MyClass3, MyMotherClass1 and MyMotherClass3 classes.
*/

function MyMotherClass3() {
	this.mcp3 = true;
	this.mcm3 = function() { }
}

/**
* @extends MyMotherClass1|MyMotherClass3
*/
function MyClass3() {
	this.p3 = true;
	this.m3 = function() { }
}

var vInstance7 = new MyClass3();
