

//*************DataClass1****************
for (var i = 0; i < 16; i++) {
	var newEntity = new ds.DataClass1();
	newEntity.cstring = "string_"+(i+1);
	newEntity.cbool = i%2==0?true:false;
	var year = 2000 + i;
	var month = (i+1)%12+1;
	var myDate = ""+month+"/07/"+year;
	newEntity.cdate = new Date(myDate);
	newEntity.save();
};

ds.DataClass1.all();

//**************Company*******************
var companies = ["4D","Google","facebook"];
for (var i = 0; i < 3; i++) {
	var newCompany = new ds.Company();
	newCompany.name = companies[i];
	newCompany.save();
};

ds.Company.all();


//*************Employee******************
for (var i = 0; i < 30; i++) {
	var newEmplyee = new ds.Employee();
	newEmplyee.name = "Employee_"+(i+1);
	newEmplyee.salary = parseInt(Math.random()*10)*1000 + 10000;
	newEmplyee.employer = ds.Company.find("ID = :1",i%3+1);
	newEmplyee.save();
};

ds.Employee.all();


