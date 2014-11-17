
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var Check = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	Check.click = function Check_click (event)// @startlock
	{// @endlock
		$$('Result').setValue(sources.listTests.result);
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("Check", "click", Check.click, "WAF");
// @endregion
};// @endlock
