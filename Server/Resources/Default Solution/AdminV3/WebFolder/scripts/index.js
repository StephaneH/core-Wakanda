/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/

WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var button2 = {};	// @button
	var button1 = {};	// @button
	var button0 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		var res;
		$.getJSON('/Compact',function(e){
			
				$('#container2').html(e);
				
		  	});
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		var res;
		$.getJSON('/Repair',function(e){
			
				$('#container1').html(e);
		  	});
	};// @lock

	button0.click = function button0_click (event)// @startlock
	{// @endlock
		var res;
		
		$.getJSON('/Verify',function(e){
			
				$('#container0').html(e);
			});


	};// @lock
	

// @region eventManager// @startlock
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("button0", "click", button0.click, "WAF");
// @endregion
};// @endlock
