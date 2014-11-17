
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var personEvent = {};	// @dataSource
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	personEvent.onCollectionChange = function personEvent_onCollectionChange (event)// @startlock
	{// @endlock
		// Add your code here
	};// @lock

	personEvent.onElementSaved = function personEvent_onElementSaved (event)// @startlock
	{// @endlock
		// Add your code here
		console.log("saved from datasource !");
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		// Add your code here
		//var arr;
		//arr = [{'a':"1"},{'a':"2"},{'a':"3"},{'a':"4"},{'a':"5"}];
		
		
//		for (var i = 0; i < 100; i++) {
//			arr.push({'a':i});
//		};
//		source.arr.sync();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("person", "onCollectionChange", personEvent.onCollectionChange, "WAF");
	WAF.addListener("person", "onElementSaved", personEvent.onElementSaved, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
