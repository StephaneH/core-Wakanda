var o1 = { p1: true, m1: function () {} };
var o2 = new Object();
o2.p1 = true;
o2.m1 = function() {};

o1["p3"] = true;
o1["p4"] = function(a,b,c) { };

var o3 = o1;
