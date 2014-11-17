(model.Attributes.methods.mcls_param_getec = function (param) {
				return this.query("ID < :1", param);
			}).scope = "public";


(model.Attributes.methods.mcls_param_getar = function (param) {
				return this.mcls_param_getec(param).toArray();
			}).scope = "public";


(model.Attributes.methods.mcls_getec = function () {
				return this.all();
			}).scope = "public";


(model.Attributes.methods.mcls_getar = function () {
				return this.mcls_getec().toArray();
			}).scope = "public";


(model.Attributes.collectionMethods.mcol_param_getec = function (param) {
				var result = this.getDataClass().createEntityCollection();
				this.forEach(function(e) {
				    if(e.ID < param) result.add(e);
				})
				return result;
			}).scope = "public";


(model.Attributes.collectionMethods.mcol_param_getar = function (param) {
				return this.mcol_param_getec(param).toArray();
			}).scope = "public";


(model.Attributes.collectionMethods.mcol_getec = function () {
				return this;
			}).scope = "public";


(model.Attributes.collectionMethods.mcol_getar = function () {
				return this.mcol_getec().toArray();
			}).scope = "public";


