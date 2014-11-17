model.Employee1.events.onInit = function() {
    new ds.Flags({
        event: "onInit_DataClass_Only"
    }).save();
};


model.Employee1.events.onLoad = function() {
    var entityEmployee2 = ds.Employee2.find("ID = 3");
    entityEmployee2.nom = "onLoadOfEmployee1";
    new ds.Flags({
        event: "onLoad_DataClass_Only"
    }).save();
};


model.Employee1.events.onValidate = function() {
    new ds.Flags({
        event: "onValidate_DataClass_Only"
    }).save();
};


model.Employee1.events.onSave = function() {
    new ds.Flags({
        event: "onSave_DataClass_Only"
    }).save();
};


model.Employee1.events.onRestrictingQuery = function() {
    return ds.Employee1.query("ID > 1");
};

