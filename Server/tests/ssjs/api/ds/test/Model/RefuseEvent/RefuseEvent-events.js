model.RefuseEvent.events.onSave = function () {
				if(this.nom == "Refusing_onSave")
					return { error: 100, errorMessage:"onSave (with validation) has been refused." };
				(new ds.Flags({event:"onSave_RefuseOnSave"})).save();
			};


model.RefuseEvent.events.onValidate = function () {
				if(ds.RefuseEvent.length >= 1)
					return { error: 100, errorMessage:"no message" };
				(new ds.Flags({event:"onValidate_RefuseOnValidate"})).save();
			};


