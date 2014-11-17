model.Employee2.nom.events.onInit = function() {
    new ds.Flags({
        event: "onInit_Attribute_Only"
    }).save();
};


model.Employee2.nom.events.onLoad = function() {
    new ds.Flags({
        event: "onLoad_Attribute_Only"
    }).save();
};


model.Employee2.nom.events.onSet = function() {
    new ds.Flags({
        event: "onSet_Attribute_Only"
    }).save();
};


model.Employee2.nom.events.onValidate = function() {
    new ds.Flags({
        event: "onValidate_Attribute_Only"
    }).save();
};


model.Employee2.nom.events.onSave = function() {
    new ds.Flags({
        event: "onSave_Attribute_Only"
    }).save();
};