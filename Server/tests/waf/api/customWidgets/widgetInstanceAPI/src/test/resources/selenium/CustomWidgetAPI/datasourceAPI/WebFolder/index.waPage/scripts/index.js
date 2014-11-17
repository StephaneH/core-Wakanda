
WAF.onAfterInit = function onAfterInit() {

// @region namespaceDeclaration
	var onCollectionChange = {};	// @button
	var setMapping = {};	// @button
	var mapElement = {};	// @button
	var getCollection = {};	// @button
	var attributeFor = {};	// @button
	var attributes = {};	// @button
// @endregion

// eventHandlers

	onCollectionChange.click = function onCollectionChange_click (event)
	{
		var obj = [{
			label : "m_nom",
			value : "m_hmida"
		},{
			label : "m_age",
			value : "m_17"
		},{
			label : "m_job",
			value : "m_chefnaj"
		}];
		
		property.setMapping({ label:"mlabel", value:"mvalue"});
		$$('test3').datasourceProp.onCollectionChange(callback);
		
		var result = "erreur";
		
		function callback(elem){
			debugger;
			var i;
			for( i=0; i< elem.length; i++){
				if( elem[i].mlabel != obj[i].label || elem[i].mvalue != obj[i].value ) break;
			}
			
			result = i == elem.length ? "success" : "erreur";
			
			$$('richText1').setValue( result );
		}
		
		 
	};

	var property = $$('test1').datasourceProp;
	
	
	setMapping.click = function setMapping_click (event)
	{
		property.setMapping({ label:"DataClass3.mlabel", value:"DataClass3.mvalue"});
		var result = "erreur";
		if( property.attributeFor('label') == "DataClass3.mlabel" && property.attributeFor('value') == "DataClass3.mvalue" ) 
			result = "success";
		
		$$('richText1').setValue( result );
	};


	mapElement.click = function mapElement_click (event)
	{
		
		var myMap = $$('test2').datasourceProp.mapElement({ coLabel: "aaa", coValue: "bbb" });
		var result = "erreur";
		if( myMap.value == "bbb" && myMap.label == "aaa" ) result = "success";
		
		$$('richText1').setValue( result );
	};

	getCollection.click = function getCollection_click (event)
	{
		var obj = [{
			label : "nom",
			value : "hmida"
		},{
			label : "age",
			value : "45"
		},{
			label : "job",
			value : "chefnaj"
		}];
			
		property.getCollection(function(elem){
			var i;
			for( i=0; i< elem.length; i++){
				if( elem[i].label != obj[i].label || elem[i].value != obj[i].value ) break;
			}
			
			if( i == elem.length ) $$('richText1').setValue( "success" );
			else $$('richText1').setValue("erreur");
			
		});
		
		//$$('richText1').setValue("erreur");
		
	};

	attributeFor.click = function attributeFor_click (event)
	{
		var datasource = property.attributeFor('value');
		var result = "erreur";
		if( datasource == "value" ){
			result = "success";
		}
		
		$$('richText1').setValue( result );
	};

	

	attributes.click = function attributes_click (event)
	{
		
		var attributes = property.attributes();
		console.log(attributes);
		var result = "erreur";
		if( attributes[0].name == "value" && attributes[1].name == "label" ){
			result = "success";
		}
		
		$$('richText1').setValue( result );
	};

// @region eventManager
	WAF.addListener("onCollectionChange", "click", onCollectionChange.click, "WAF");
	WAF.addListener("setMapping", "click", setMapping.click, "WAF");
	WAF.addListener("mapElement", "click", mapElement.click, "WAF");
	WAF.addListener("getCollection", "click", getCollection.click, "WAF");
	WAF.addListener("attributeFor", "click", attributeFor.click, "WAF");
	WAF.addListener("attributes", "click", attributes.click, "WAF");
// @endregion
};
