model.OnSaveNoValidation.events.onRemove = function () {
				if(ds.OnSaveNoValidation.length >= 1)
					return { error: 100, errorMessage:"onRemove (without validation) has been refused." };
				new ds.Flags({event:"onRemove_Refuse"}).save();
			};


model.OnSaveNoValidation.events.onSave = function () {
				if(this.nom == "Refusing_onSave")
					return { error: 100, errorMessage:"onSave (without validation) has been refused." };
				new ds.Flags({event:"onSave_withoutOnValidation"}).save();
			};


