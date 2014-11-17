
WAF.onAfterInit = function onAfterInit() {

// @region namespaceDeclaration
	var getNode = {};	// @button
	var disabled = {};	// @button
	var enable = {};	// @button
	var test1 = {};	// @Test
	var disable = {};	// @button
// @endregion

// eventHandlers

	getNode.click = function getNode_click (event)
	{
		var node = $$('test1').getNode();
		var expectedNode = $('#test1').get(0);
		
		var result = (node == expectedNode) ? "success" : "error";
		
		$$('richText1').setValue( result );
	};

	disabled.click = function disabled_click (event)
	{
		$$("test1").disable();
		var result = $$("test1").disabled() ? "disabled" : "enabled";
		
		$$('richText1').setValue( result );
	};

	enable.click = function enable_click (event)
	{
		$$("test1").disable();
		$$("test1").enable();
		var className = $('#test1').attr('class');
		
		var result = className == "waf-widget waf-test" ? "success" : "error";
		
		$$('richText1').setValue( result );
	};

	test1.click = function test1_click (event)
	{
		$$('richText1').setValue("onClick");
	};

	disable.click = function disable_click (event)
	{
		$$("test1").disable();
		var className = $('#test1').attr('class');
		
		var result = className == "waf-widget waf-test waf-state-disabled" ? "success" : "error";
		
		$$('richText1').setValue( result );

	};
	
	

// @region eventManager
	WAF.addListener("getNode", "click", getNode.click, "WAF");
	WAF.addListener("disabled", "click", disabled.click, "WAF");
	WAF.addListener("enable", "click", enable.click, "WAF");
	WAF.addListener("test1", "click", test1.click, "WAF");
	WAF.addListener("disable", "click", disable.click, "WAF");
// @endregion
};
