
//formatter with one argument
WAF.require('waf-core/formatters').create('prefix', {
   			 format: function(value, prefix) { 
   			 	return prefix + '_' + value; 
   			 },
   			 unformat: function(value) { return value; }
		});
		
//formatter without argument		
WAF.require('waf-core/formatters').create('lowercase', {
    format: function(value) { return value && value.toLowerCase(); },
    unformat: function(value) { return value; }
});

//formatter with many argument
WAF.require('waf-core/formatters').create('concat', {
    format: function(value,arg1,arg2) { 
    	return arg1 +'_'+arg2+'_'+value;
    },
    unformat: function(value) { return value; }
});

		
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	
	
	
// @endregion
};// @endlock

