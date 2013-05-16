
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var splitView1 = {};	// @splitView
// @endregion// @endlock

// eventHandlers// @lock

	splitView1.mouseup = function splitView1_mouseup (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mouseup');
	};// @lock

	splitView1.mouseover = function splitView1_mouseover (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mouseover');
	};// @lock

	splitView1.mouseout = function splitView1_mouseout (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mouseout');
	};// @lock

	splitView1.mousedown = function splitView1_mousedown (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mousedown');
	};// @lock

	splitView1.dblclick = function splitView1_dblclick (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' dblclick');
	};// @lock

	splitView1.click = function splitView1_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' click');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("splitView1", "mouseup", splitView1.mouseup, "WAF");
	WAF.addListener("splitView1", "mouseover", splitView1.mouseover, "WAF");
	WAF.addListener("splitView1", "mouseout", splitView1.mouseout, "WAF");
	WAF.addListener("splitView1", "mousedown", splitView1.mousedown, "WAF");
	WAF.addListener("splitView1", "dblclick", splitView1.dblclick, "WAF");
	WAF.addListener("splitView1", "click", splitView1.click, "WAF");
// @endregion
};// @endlock
