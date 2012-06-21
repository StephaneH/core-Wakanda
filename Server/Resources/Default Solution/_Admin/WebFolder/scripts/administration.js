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
function firstToUpper(str) {
	return str.replace(/^(.)(.*)/, function(str, p1, p2) {
	    return p1.toUpperCase() + p2;
	})
}

if (typeof WAF === 'undefined') {
    WAF = {};  //object vide
}

WAF.serverAdmin = {  // Sous objet
	status:		null, // attribut
	rpc:		null,
	loader:		{
    	show:	function() {  //attribut (methode)
    		$('#overlay, #overlay .loader').show();
    	},
    	hide:	function() {
    		$('#overlay, #overlay .loader').hide();
    	}
    },
 
	console:	{ //sous sous objet
    	timer:			null,
    	opened:			false,
    	node:			$('#wafConsole'),
    	getServerLog:	function() {
			try {
				var result = getLogMessages();
				this.log(result.messages, true);
			} catch(E) {
				this.log('<b>getServerLog failed :</b> ' + E);
			};
    	},
    	log:			function(el, open) {
			var html = '';
			
			if($.isArray(el) && el.length) {
				html = el.join('<br />') + '<br />';
			} else if ($.isPlainObject(el) && el.message && (el.message !== '')) {
				html = el.message.bold() + ' : ' + el.description + '<br />';
			} else if (el.toString() !== '') {
				html = el.toString() + '<br />';
			}
			
			if(html !== '') {
				if(open) this.open();
				$('#wafConsole .content').append(html).scrollTop($('#wafConsole .content').height() + 100);
			}
    	},
    	open:			function() {
    		if(!this.opened) {
    			this.node
					.animate({height: '20%'})
					/*
					.animate(
						{height: '20%'},
						500,
						function() {
							console.log(this)
						}
					)*/
					.addClass('visible');
    			this.opened = true;
    		}
    	},
    	close:			function() {
    		if(this.opened) {
    			this.node
					.animate({height: 27})
					.removeClass('visible');
    			this.opened	= false;
    		}
    	},
    	toggle:			function() {
			(this.opened) ? this.close() : this.open();
    	}
    },
	solution:	{
		openTimer:	null,
		current:	null,
		open:		null,
		recent:		{
			name:	'',
			path:	''
		},
		openRecent:	null,
		get:		null,
		close:		null,
		loadBy:		function(type) {
			var n = 0;
			
        	this.openTimer = setInterval(function() {  //this referebce d'objt loadBy'
				if(n < 10) {
					try {
						tmpSolution = WAF.serverAdmin.solution.get();
						if(typeof(tmpSolution) === 'object' && typeof(tmpSolution['name']) !== 'undefined') {
							WAF.serverAdmin.solution.current	= tmpSolution;
							WAF.serverAdmin.solutions.recent	= WAF.serverAdmin.solutions.getRecent();
							WAF.serverAdmin.solutions.setRecent();
							WAF.serverAdmin.console.getServerLog();
							WAF.serverAdmin.solution.build(WAF.serverAdmin.solution.current);
							
							clearInterval(WAF.serverAdmin.solution.openTimer);
							
							WAF.serverAdmin.loader.hide();
						}
					} catch(E) {
						//WAF.serverAdmin.console.log(E);
					}
				} else {
					clearInterval(WAF.serverAdmin.solution.openTimer);
					switch(type) {
						case 'name':
							WAF.serverAdmin.solution.openRecent(WAF.serverAdmin.solution.recent.name);
						break;
						case 'path':
							WAF.serverAdmin.solution.open(WAF.serverAdmin.solution.recent.path);
						break;
					}
				}
				n++;
			}, 3000);
			
		},
		build:		function(solution) {
			// Setting solution's name
			$('#solution-identity h1').text(solution.name);
			
			// Resetting viewport
			$('#viewport').empty();
			
			// Building applications
			
			
			WAF.serverAdmin.loader.hide();
		}
	},
	solutions:	{
		recent:	null,
		getRecent:	null,
		setRecent:	function() {
	    	$('.administration-header').empty();
			$(this.recent).each(function(i, name ) {
                            var element = $('<div class="administration-header"><a href="#" >' + name + '</a></div>'+
                                            '<div>' +
                                                    '<p>Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam. Integer <br/>'+
                                                   ' ut neque. Vivamus nisi metus, molestie vel, gravida in, condimentum sit <br/> '+
                                                    'amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi. Proin viverra leo ut <br/> '+
                                                   ' odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate. <br/>' +
                                                   '</p>' +
                                            '</div>');
                                        $('#accordion').append(element);
//                                        
			});
		}
	},
    init:		function() {
    	this.rpc = new WAF.classes.Rpc();
    	
    	// Mapping of interfacing functions
    	this.rpc.getInterfaces();
    	
    	this.solution.close			= closeSolution;
    	this.solution.get			= getSolution;
    	this.solution.open			= openSolution;
    	this.solution.openRecent	= openRecentSolution;
    	
    	this.solutions.getRecent	= getRecentSolutions;
    	
    	
    	// Building default solution
    	this.solution.current		= this.solution.get();
    	if(typeof(this.solution.current) === 'undefined') this.console.log('Unable to retrieve a solution.', true);
    	
    	this.solutions.recent		= this.solutions.getRecent();
    	this.solutions.setRecent();
    	
    	this.console.getServerLog();
    	
    	this.solution.build(this.solution.current);
    }
};







( function(){
    

    //specific mod for tests purpose in the navigator (see web toolbar)
       $("#administration-header").show();
       $("#administration-toolbar").show();
       $("#administration-workspace").css("top", "80px");
      
      WAF.serverAdmin.init();
     
    
} )();
