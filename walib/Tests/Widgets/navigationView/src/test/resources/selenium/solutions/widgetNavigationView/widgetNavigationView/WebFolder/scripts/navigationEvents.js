
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var navigationView1 = {};	// @navigationView
// @endregion// @endlock

// eventHandlers// @lock

	navigationView1.mouseup = function navigationView1_mouseup (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mouseup');
	};// @lock

	navigationView1.mouseover = function navigationView1_mouseover (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mouseover');
	};// @lock

	navigationView1.mouseout = function navigationView1_mouseout (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mouseout');
	};// @lock

	navigationView1.mousedown = function navigationView1_mousedown (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mousedown');
	};// @lock

	navigationView1.dblclick = function navigationView1_dblclick (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' dblclick');
	};// @lock

	navigationView1.click = function navigationView1_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' click');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("navigationView1", "mouseup", navigationView1.mouseup, "WAF");
	WAF.addListener("navigationView1", "mouseover", navigationView1.mouseover, "WAF");
	WAF.addListener("navigationView1", "mouseout", navigationView1.mouseout, "WAF");
	WAF.addListener("navigationView1", "mousedown", navigationView1.mousedown, "WAF");
	WAF.addListener("navigationView1", "dblclick", navigationView1.dblclick, "WAF");
	WAF.addListener("navigationView1", "click", navigationView1.click, "WAF");
// @endregion
};// @endlock
