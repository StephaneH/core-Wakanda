var var1;  				// test1
var obj1 =
{
	p1: "p1", 			// test2
	p2: true,
	p3: 
	{
		p3_1:0 		// test3
	}
};

var1 = 2; 				// test4
obj1.p1 = "new p1"; 	// test5, test6
obj1.p3.p3_1 = 42; 	// test7
p1 = "p1"; 				// test8
obj1.p4 = /regexp/g;	// test9
alert(obj1.p4); 		// test10

function foo_multiple(bar1, bar2)
{
	bar1; 				// test11
}

bar1; 					// test12
bar2; 					// test33

