
guidedModel =// @startlock
{
	Method :
	{
		collectionMethods :
		{// @endlock
			mcol_param_getString:function(x, y)
			{// @lock
				return this.getDataClass().getName() + ".mcol_param_getString(" + x + "," + y + ")";
			},// @lock
			mcol_getString:function()
			{// @lock
				return this.getDataClass().getName() + ".mcol_getString()";
			},// @lock
			mcol_param_getec:function(param)
			{// @lock
				var result = this.getDataClass().createEntityCollection();
				this.forEach(function(e) {
				    if(e.ID < param) result.add(e);
				})
				return result;
			},// @lock
			mcol_param_getar:function(param)
			{// @lock
				return this.mcol_param_getec(param).toArray();
			},// @lock
			mcol_getec:function()
			{// @lock
				return this;
			},// @lock
			mcol_getar:function()
			{// @lock
				return this.mcol_getec().toArray();
			}// @startlock
		},
		methods :
		{// @endlock
			mcls_param_getString:function(x, y)
			{// @lock
				return this.getName() + ".mcls_param_getString(" + x + "," + y + ")";
			},// @lock
			mcls_getString:function()
			{// @lock
				return this.getName() + ".mcls_getString()";
			},// @lock
			mcls_param_getec:function(param)
			{// @lock
				return this.query("ID < :1", param);
			},// @lock
			mcls_param_getar:function(param)
			{// @lock
				return this.mcls_param_getec(param).toArray();
			},// @lock
			mcls_getar:function()
			{// @lock
				return this.mcls_getec().toArray();
			},// @lock
			mcls_getec:function()
			{// @lock
				return this.all();
			}// @startlock
		}
	},
	SubComplex :
	{
		ac_string :
		{
			onGet:function()
			{// @endlock
				return "calculated";
			}// @startlock
		}
	},
	Attributes :
	{
		ac_number :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		ac_string :
		{
			onGet:function()
			{// @endlock
				return "calculated"
			}// @startlock
		},
		collectionMethods :
		{// @endlock
			mcol_param_getec:function(param)
			{// @lock
				var result = this.getDataClass().createEntityCollection();
				this.forEach(function(e) {
				    if(e.ID < param) result.add(e);
				})
				return result;
			},// @lock
			mcol_param_getar:function(param)
			{// @lock
				return this.mcol_param_getec(param).toArray();
			},// @lock
			mcol_getec:function()
			{// @lock
				return this;
			},// @lock
			mcol_getar:function()
			{// @lock
				return this.mcol_getec().toArray();
			}// @startlock
		},
		methods :
		{// @endlock
			mcls_param_getec:function(param)
			{// @lock
				return this.query("ID < :1", param);
			},// @lock
			mcls_param_getar:function(param)
			{// @lock
				return this.mcls_param_getec(param).toArray();
			},// @lock
			mcls_getec:function()
			{// @lock
				return this.all();
			},// @lock
			mcls_getar:function()
			{// @lock
				return this.mcls_getec().toArray();
			}// @startlock
		}
	},
	SuperComplex :
	{
		aci_image :
		{
			onGet:function()
			{// @endlock
				return application.loadImage(application.getFolder("path") + "Images/img1.jpg");
			}// @startlock
		},
		aci_blob :
		{
			onGet:function()
			{// @endlock
				return new Blob(256, 88, "application/octet-stream");
			}// @startlock
		},
		aci_date :
		{
			onGet:function()
			{// @endlock
				return new Date("01/01/2013");
			}// @startlock
		},
		aci_uuid :
		{
			onGet:function()
			{// @endlock
				return "00000000000000000000000000000000";
			}// @startlock
		},
		aci_duration :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		aci_number :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		aci_long64 :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		aci_long :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		aci_word :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		aci_byte :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		aci_bool :
		{
			onGet:function()
			{// @endlock
				return false;
			}// @startlock
		},
		aci_string :
		{
			onGet:function()
			{// @endlock
				return "calculated";
			}// @startlock
		}
	},
	Complex :
	{
		ac_image :
		{
			onGet:function()
			{// @endlock
				return application.loadImage(application.getFolder("path") + "Images/img1.jpg");
			}// @startlock
		},
		ac_blob :
		{
			onGet:function()
			{// @endlock
				return new Blob(256, 88, "application/octet-stream");
			}// @startlock
		},
		ac_date :
		{
			onGet:function()
			{// @endlock
				return new Date("01/01/2013");
			}// @startlock
		},
		ac_uuid :
		{
			onGet:function()
			{// @endlock
				return "00000000000000000000000000000000";
			}// @startlock
		},
		ac_duration :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		ac_number :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		ac_long64 :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		ac_long :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		ac_word :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		ac_byte :
		{
			onGet:function()
			{// @endlock
				return 0;
			}// @startlock
		},
		ac_bool :
		{
			onGet:function()
			{// @endlock
				return false;
			}// @startlock
		},
		ac_string :
		{
			onGet:function()
			{// @endlock
				return "calculated";
			}// @startlock
		}
	},
	MethodCaseSensitive :
	{
		methods :
		{// @endlock
			mcls_cAsEsEnSiTivE:function()
			{// @lock
				return "mcls_cAsEsEnSiTivE";
			},// @lock
			mcls_CaSeSeNsItIvE:function()
			{// @lock
				return "mcls_CaSeSeNsItIvE";
			}// @startlock
		}
	},
	ScopePublic :
	{
		methods :
		{// @endlock
			mcls_scope_public:function()
			{// @lock
				return true;
			},// @lock
			mcls_scope_public_on_server:function()
			{// @lock
				return true;
			},// @lock
			mcls_scope_protected:function()
			{// @lock
				return true;
			},// @lock
			mcls_scope_private:function()
			{// @lock
				return true;
			}// @startlock
		}
	}
};// @endlock
