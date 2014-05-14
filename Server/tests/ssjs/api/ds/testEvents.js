var testCase = {
    name: "Datastore test(Part2)",
    
        _should: {
        ignore: {
			testExtends_AddRelationAttribute:true
        }
    },
		//------------------------------------
	//Events
	testEvents_onInit_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1();
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onInitWithParameter_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({
			nom:	"hello"
		});
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onInitByMethod_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = ds.Employee1.createEntity();
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
    testEvents_onLoad_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee1.query("ID < 10");
    	var myEntity = employees[0];
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onLoad_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onValidate_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({nom:"entity #"+(i+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onSave_Dataclass: function() {
    	var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({nom:"entity #"+(i+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onSave event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_orderOfExecutionOfOnValidateANDonSave_Dataclass: function() {
    	var isGood = true;
		var i = ds.Flags.length;
    	var myEntity = new ds.Employee1({nom:"entity #"+(i+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var sav;
		var val;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_DataClass_Only" )
					sav = e.ID;
				else if(e.event == "onValidate_DataClass_Only" )
					val = e.ID;
			}
		if(val > sav)
			Y.Assert.fail("onSave event has been launched before onValidate");
    },
	testEvents_onRemove_Dataclass_1: function() {
		var isGood = true;
		var i = ds.Flags.length;
		var shouldBeOne = 0;
		new ds.Employee1({nom:"entity6"}).save();
    	var myEntity = ds.Employee1.find("nom = entity6");
    	myEntity.remove();
    	var j = ds.Flags.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onRemove_DataClass_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onRemove event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
    testEvents_onRestrictingQuery_allMethod_Dataclass: function() {
		var myCollection = ds.Employee1.all();
		var nonExistentEntity = myCollection.find("ID = 1"); //onRestrinctingQuery of this class is: return ds.Employee1.query("ID > 1")
		if(nonExistentEntity != null)
			Y.Assert.fail("onRestrictingQuery event does not work with all() method.");
    },
    testEvents_onRestrictingQuery_findMethod_Dataclass: function() {
		var nonExistentEntity = ds.Employee1.find("ID = 1"); //onRestrinctingQuery of this class is: return ds.Employee1.query("ID > 1")
		if(nonExistentEntity != null)
			Y.Assert.fail("onRestrictingQuery event does not work with find() method.");
    },
	testEvents_onRestrictingQuery_queryMethod_Dataclass: function() {
		var nonExistentEntity = ds.Employee1.query("ID = 1"); //onRestrinctingQuery of this class is: return ds.Employee1.query("ID > 1")
		if(nonExistentEntity.length != 0)
			Y.Assert.fail("onRestrictingQuery event does not work with query() method.");
    },
	//Only attribute has events	
	testEvents_onInit_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee2();
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onInitWithParameter_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee2({
			nom:	"hello"
		});
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onInitByMethod_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = ds.Employee2.createEntity();
    	var j = ds.Flags.length;
    	var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onInit event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onLoad_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee2.query("ID < 5");
    	var myName = employees[0].nom;
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onLoad_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onSet_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employee = ds.Employee2.find("ID = 2");
		employee.nom = "entity #2 bis";
		employee.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onSetWithouSaving_Attribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employee = ds.Employee2.find("ID = 2");
		employee.nom = "entity #2 bis bis";
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onLoad event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time. ");
    },
	testEvents_onValidate_Dataclass: function() {
		var isGood = false;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"entity #"+(n+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onValidate event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
    },
	testEvents_onSave_Dataclass: function() {
    	var isGood = false;
    	var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"entity #"+(n+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onSave event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
    },
	testEvents_orderOfExecutionOfOnValidateANDonSave_Dataclass: function() {
    	var isGood = true;
		var i = ds.Flags.length;
		var n = ds.Employee2.length;
    	var myEntity = new ds.Employee2({nom:"entity #"+(n+1)});
    	myEntity.save();
    	var j = ds.Flags.length;
		var sav;
		var val;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_Attribute_Only" )
					sav = e.ID;
				if(e.event == "onValidate_Attribute_Only" )
					val = e.ID;
			}
		if(val > sav)
			Y.Assert.fail("onSave event has been launched before onValidate");
    },
	testEvents_onRemove_Dataclass_2: function() {
		var isGood = true;
		var i = ds.Flags.length;
		var shouldBeOne = 0;
		new ds.Employee2({nom:"entity6"}).save();
    	var myEntity = ds.Employee2.find("nom = entity6");
    	myEntity.remove();
    	var j = ds.Flags.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onRemove_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("onRemove event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
    }, 
    testEvents_onInit_DataclassWithAttribute: function() {
		var isGood = true;
		var i = ds.Flags.length;
    	var myEntity = new ds.Employee3();
    	var j = ds.Flags.length;
		var att;
		var dc;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_DataClass" )
					att = e.ID;
				else if(e.event == "onInit_DataClass_Attribute" )
					dc = e.ID;
			}
		if(att < dc)
			Y.Assert.fail("Dataclass's onInit event has been launched before attribute's onInit event");
    },
	testEvents_onInitWithParameter_DataclassWithAttribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = new ds.Employee3({
			nom:	"hello"
		});
    	var j = ds.Flags.length;
		var att;
		var dc;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_DataClass" )
					att = e.ID;
				else if(e.event == "onInit_DataClass_Attribute" )
					dc = e.ID;
			}
		if(att < dc)
			Y.Assert.fail("Dataclass's onInit event has been launched before attribute's onInit event");
    },
	testEvents_onInitByMethod_DataclassWithAttribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var myEntity = ds.Employee3.createEntity();
    	var j = ds.Flags.length;
		var att;
		var dc;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onInit_Attribute_DataClass" )
					att = e.ID;
				else if(e.event == "onInit_DataClass_Attribute" )
					dc = e.ID;
			}
		if(att < dc)
			Y.Assert.fail("Dataclass's onInit event has been launched before attribute's onInit event");
    },
	testEvents_onLoad_DataclassWithAttribute: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee3.query("ID < 5");
    	var myString = employees[0].nom;
    	var j = ds.Flags.length;
		var att;
		var dc;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onLoad_Attribute_DataClass" )
					att = e.ID;
				else if(e.event == "onLoad_DataClass_Attribute" )
					dc = e.ID;
			}
		if(att < dc)
			Y.Assert.fail("Dataclass's onLoad event has been launched before attribute's onLoad event");
    },
	testEvents_onSet_SetFromAnOtherEvent: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employees = ds.Employee1.query("ID < 10");
    	var myEntity = employees[0];
    	var j = ds.Flags.length;
		var s = "";
		var shouldBeOne = 0;
		s = "["+i+","+j+"]";
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					{
						isGood = true;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("external onSet event has not been launched. "+s);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
    },
	testEvents_OderOFonSetANDonLoad: function() {
		var isGood = false;
    	var i = ds.Flags.length;
    	var employee= ds.Employee1.find("ID = 2");
    	var j = ds.Flags.length;
		var onset;
		var onload;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSet_Attribute_Only" )
					onset = e.ID;
				else if(e.event == "onLoad_Attribute_Only" )
					onload = e.ID;
			}
		if(onset < onload)
			Y.Assert.fail("Dataclass's onLoad event has been launched before attribute's onLoad event");
    },
	testEvents_RefusingOnValidate: function() {
		var isGood = true;
		var shouldBeOne = 0;
    	var i = ds.RefuseEvent.length;
    	var employee = new ds.RefuseEvent({nom:"Refusing_onValidate",cbool:true});
		try
		{
			employee.save();
		}
		catch(err)
		{
		}
    	var j = ds.RefuseEvent.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_RefuseOnValidate" )
					{
						isGood = false;
						shouldBeOne++;
					}
			}
		if(!isGood)
			Y.Assert.fail("Refusing validation does not work. "+i+" "+j);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
	},
	testEvents_RefusingOnValidate_OnSave: function() {
		var isGood = true;
    	var i = ds.RefuseEvent.length;
    	var employee = new ds.RefuseEvent({nom:"Refusing_onValidate",cbool:true});
		try
		{
			employee.save();
		}
		catch(err)
		{
		}
    	var j = ds.RefuseEvent.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onValidate_RefuseOnValidate" )
					{
						isGood = false;
						break;
					}
			}
		if(isGood)
			for(var u = i+1; u <= j; u++)
				{
					var e = ds.Flags.find("ID = "+u);
					if(e.event == "onSave_RefuseOnSave" )
						{
							isGood = false;
							break;
						}
				}
		else
			Y.Assert.fail("OnSave event has been lunched while OnValidate has been refused. "+i+" "+j);
	},
	testEvents_RefusingOnSave_WithoutOnValidate: function() {
		var isGood = true;
		var shouldBeOne = 0;
		var n = ds.OnSaveNoValidation.length;
    	var i = ds.Flags.length;
    	var employee = new ds.OnSaveNoValidation({nom:"Refusing_onSave",cbool:true});
		try
		{
			employee.save();
		}
		catch(err)
		{
		}
    	var j = ds.Flags.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_withoutOnValidation" )
					{
						isGood = false;
						shouldBeOne++;
					}
			}
		if(!isGood || ds.OnSaveNoValidation.length > n)
			Y.Assert.fail("Refusing save does not work whene we don't have validation. "+i+" "+j);
		if(shouldBeOne > 1)
			Y.Assert.fail("Event has been launched more than one time.");
	},
	testEvents_RefusingOnSave_WithOnValidate: function() {
		var isGood = true;
    	var i = ds.Flags.length;
		ds.RefuseEvent.remove();
    	var employee = new ds.RefuseEvent({nom:"Refusing_onSave",cbool:true});
		try
		{
			employee.save();
		}
		catch(err)
		{
		}
    	var j = ds.Flags.length;
		for(var u = i+1; u <= j; u++)
			{
				var e = ds.Flags.find("ID = "+u);
				if(e.event == "onSave_RefuseOnSave" )
					{
						isGood = false;
						break;
					}
			}
		if(!isGood || ds.RefuseEvent.length > 0)
			Y.Assert.fail("Refusing save does not work whene the validation passed. "+i+" "+j);
	},
	testEvents_RefusingOnRemove: function() {
		var isGood = true;
		try
		{
			ds.OnSaveNoValidation.remove();
		}
		catch(err)
		{
		}
		if(ds.OnSaveNoValidation.length == 0)
			Y.Assert.fail("Refusing save does not work whene we don't have validation. "+i+" "+j);
	},
    
    // Tests on extended DataClasses (work in progress):

    testExtends_AddRelationAttribute: function() {
        try
        {
            var myRelated = ds.Related.createEntity();
            myRelated.name = 'related entity';
            myRelated.save();

            var myChild = ds.Child.createEntity();
            myChild.name = 'child extends parent';
            myChild.related = myRelated;
            myChild.save();
        }
        catch (e)
        {
            Y.Assert.fail("Cannot save extended entity: " + e);
        }

        Y.Assert.areSame('related entity', myChild.related.name);
    }
};