model.Employee2.nom.events.onInit = function (attributeName) {
					new ds.Flags({event:"onInit_Attribute_Only"}).save();
				};


model.Employee2.nom.events.onLoad = function (attributeName) {
					new ds.Flags({event:"onLoad_Attribute_Only"}).save();
				};


model.Employee2.nom.events.onSet = function (attributeName) {
					new ds.Flags({event:"onSet_Attribute_Only"}).save();
				};


model.Employee2.nom.events.onValidate = function (attributeName) {
					new ds.Flags({event:"onValidate_Attribute_Only"}).save();
				};


model.Employee2.nom.events.onSave = function (attributeName) {
					new ds.Flags({event:"onSave_Attribute_Only"}).save();
				};


model.Employee2.nom.events.onRemove = function (attributeName) {
					new ds.Flags({event:"onRemove_Attribute_Only"}).save();
				};


