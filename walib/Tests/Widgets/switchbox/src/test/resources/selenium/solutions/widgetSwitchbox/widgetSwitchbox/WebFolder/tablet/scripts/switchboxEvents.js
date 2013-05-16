
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var switchbox1 = {};	// @switchbox
// @endregion// @endlock

// eventHandlers// @lock

	switchbox1.touchcancel = function switchbox1_touchcancel (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' touchcancel');
	};// @lock

	switchbox1.touchend = function switchbox1_touchend (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' touchend');
	};// @lock

	switchbox1.touchmove = function switchbox1_touchmove (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' touchmove');
	};// @lock

	switchbox1.touchstart = function switchbox1_touchstart (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' touchstart');
	};// @lock

	switchbox1.mouseup = function switchbox1_mouseup (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mouseup');
	};// @lock

	switchbox1.mouseover = function switchbox1_mouseover (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mouseover');
	};// @lock

	switchbox1.mouseout = function switchbox1_mouseout (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mouseout');
	};// @lock

	switchbox1.mousemove = function switchbox1_mousemove (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mousemove');
	};// @lock

	switchbox1.mousedown = function switchbox1_mousedown (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' mousedown');
	};// @lock

	switchbox1.click = function switchbox1_click (event)// @startlock
	{// @endlock
		$$('richText1').setValue($$('richText1').getValue() + ' click');
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("switchbox1", "touchcancel", switchbox1.touchcancel, "WAF");
	WAF.addListener("switchbox1", "touchend", switchbox1.touchend, "WAF");
	WAF.addListener("switchbox1", "touchmove", switchbox1.touchmove, "WAF");
	WAF.addListener("switchbox1", "touchstart", switchbox1.touchstart, "WAF");
	WAF.addListener("switchbox1", "mouseup", switchbox1.mouseup, "WAF");
	WAF.addListener("switchbox1", "mouseover", switchbox1.mouseover, "WAF");
	WAF.addListener("switchbox1", "mouseout", switchbox1.mouseout, "WAF");
	WAF.addListener("switchbox1", "mousemove", switchbox1.mousemove, "WAF");
	WAF.addListener("switchbox1", "mousedown", switchbox1.mousedown, "WAF");
	WAF.addListener("switchbox1", "click", switchbox1.click, "WAF");
// @endregion
};// @endlock
