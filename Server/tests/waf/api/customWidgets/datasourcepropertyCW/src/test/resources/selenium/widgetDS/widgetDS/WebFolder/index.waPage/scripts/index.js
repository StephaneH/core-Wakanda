
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
		var flagFetch;
		flagFetch = false;
		source.flagFetch.sync();
		// Add your code here
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("person", "onCollectionChange", personEvent.onCollectionChange, "WAF");
	WAF.addListener("person", "onElementSaved", personEvent.onElementSaved, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
