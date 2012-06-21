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
// A global function
function firstToUpper(str) {
	return str.replace(/^(.)(.*)/, function(str, p1, p2) {
	    return p1.toUpperCase() + p2;
	})
}

if (typeof WAF === 'undefined') {
    WAF = {};
}

WAF.serverAdmin = {
	status:		null,
	rpc:		null,
	loader:		{
    	show:	function() {
    		$('#overlay, #overlay .loader').show();
    	},
    	hide:	function() {
    		$('#overlay, #overlay .loader').hide();
    	}
    },
	dialog:		{
    	show:	function(name) {
    		$('#overlay, #' + name).show();
    	},
    	hide:	function() {
    		$('#overlay, .dialog').hide();
    	}
    },
	console:	{
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
			
        	this.openTimer = setInterval(function() {
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
			$(solution.applications).each(function(i, application) {
				// We dont show admin solution
				if(application.admin) return;
				
				// Extending application with some properties
				application.number = i;
				application.id = 'application-' + application.number;
				application.template = template;
				
				$('#viewport').append(application.template.replace(/__(.*?)__/ig, function(str, object) {
					return (eval(object) !== undefined) ? eval(object) : '';
				}));
			});
			
			WAF.serverAdmin.loader.hide();
		}
	},
	solutions:	{
		recent:	null,
		getRecent:	null,
		setRecent:	function() {
	    	$('#solution-open-recent-menu ul').empty();
			$(this.recent).each(function(i, name) {
				$('#solution-open-recent-menu ul').append('<li class="solution-open-recent">' + name + '</li>');
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

// onReady
$(function() {
	
	// MAIN *******************************************************************
	WAF.serverAdmin.init();
	
	
	// EVENT DELEGATION *******************************************************
	$(document.body)
	// Solution
	.delegate('#solution-menu li', 'click', function(event) {
		switch($(this).attr('className')) {
			case 'solution-open':
				WAF.serverAdmin.dialog.show('solution-open');
			break;
			
			case 'solution-close':
				WAF.serverAdmin.loader.show();
				WAF.serverAdmin.solution.close();
				$('#solution-identity h1, #viewport').empty();
				WAF.serverAdmin.loader.hide();
			break;
			
			case 'solution-open-recent':
				WAF.serverAdmin.dialog.hide();
				WAF.serverAdmin.loader.show();
				
				WAF.serverAdmin.solution.recent.name = $(this).text();
				WAF.serverAdmin.solution.openRecent(WAF.serverAdmin.solution.recent.name);
				
				// We have to wait for the current solution to be closed & the new one to be opened
				setTimeout(function() {
					WAF.serverAdmin.solution.loadBy('name');
				}, 2000);
			break;
			
			case 'lock':
				$(this).removeClass('lock').addClass('unlock');
				
				$('.application')
					.addClass('editable')
					.find('input[type=text]').removeAttr('readonly')
					.end()
					.find('.toolbar li.lock').removeClass('lock').addClass('unlock');
			break;
			
			case 'unlock':
				$(this).removeClass('unlock').addClass('lock');
				
				$('.application')
					.removeClass('editable')
					.find('input[type=text]').attr('readonly', true)
					.end()
					.find('.toolbar li.unlock').removeClass('unlock').addClass('lock');
			break;
		}
	})
	
	
	// Application
	// Application toolbar
	.delegate('#viewport .application .toolbar li', 'click', function(event) {
		var node = $(this).closest('.application');
		
	    if(typeof(WAF.serverAdmin.solution.current) === 'undefined') throw('No solution loaded.');
		
		var application = WAF.serverAdmin.solution.current.applications[node.attr('data-application-number')];
		application.node = $(node);
		
		//var url = 'http://' + application.http.hostName + ':' + application.http.port;
		var host = (application.http.hostName.toLowerCase() != 'localhost') ? application.http.hostName : window.location.hostname;
		var url = 'http://' + host + ':' + application.http.port;
		if (application.pattern.length > 0)
		    url += '/' + application.pattern;   // sc 25/11/2010 pattern support
		
		var inputTexts = application.node.find('input[type=text]');
		
		switch($(this).attr('className')) {
			case 'application-goto':
				window.open(url + '/' + application.webApp.directoryIndex, application.name);
			break;
			
			case 'catalog-goto':
				window.open(url + '/rest/$catalog', application.name + '-catalog');
			break;
			
			case 'database-flush':
				$.get(url + '/rest/$catalog?$method=flush', function(result) {
					WAF.serverAdmin.console.log(application.name.bold + ' : Catalog has been succesfully flushed.');
				});
			break;
			
			case 'lock':
				// Application is editable
				application.node.addClass('editable');
				$(this).removeClass('lock').addClass('unlock');
				
				// Make inputText editable
				inputTexts.each(function(i, inputText) {
					$(inputText).removeAttr('readonly');
				});
			break;
			
			case 'unlock':
				// Application is locked
				application.node.removeClass('editable');
				$(this).removeClass('unlock').addClass('lock');
				
				// Make inputText readonly
				inputTexts.each(function(i, inputText) {
					$(inputText).attr('readonly', true);
				});
			break;
		}
	})
	// Checkboxes
	.delegate('#viewport input[type=checkbox]', 'click', function(event) {
		var node = $(this).closest('.application');
		
	    if(typeof(WAF.serverAdmin.solution.current) === 'undefined') throw('No solution loaded.');
		
		var application = WAF.serverAdmin.solution.current.applications[node.attr('data-application-number')];
		application.node = $(node);
		
		
		var name = $(this).attr('name');
		var type = $(this).attr('data-type');
		var commandName = name + firstToUpper(type);
		var started = (type == 'server') ? 'started' : 'enabled';
		var checked = $(this).attr('checked');
		WAF.serverAdmin.status = {
			node: application.node.find('.' + name + '.status').first(),
			loading: function(enable) {
				if(enable) {
					WAF.serverAdmin.status.node.addClass('loading');
				} else {
					setTimeout(function() {WAF.serverAdmin.status.node.removeClass('loading');}, 1000);
				}
				return true;
			}
		}
		
		WAF.serverAdmin.status.loading(true);
			
		try {
			var state = eval('set' + firstToUpper(type))(application.name, commandName, checked);
			(state) ? WAF.serverAdmin.status.node.addClass('started') : WAF.serverAdmin.status.node.removeClass('started');
			$(this).attr('checked', state);
		} catch(E) {
			WAF.serverAdmin.console.log(E);
			$(this).attr('checked', !checked);
		}
		
		WAF.serverAdmin.status.loading(false);
	})
	
	// wafConsole
	.delegate('#wafConsole .title', 'click', function(event) {
		WAF.serverAdmin.console.toggle();
	})
	
	// Overlay
	.delegate('#overlay', 'click', function() {
		$('#overlay, #overlay .loader, .dialog').hide();
	})
	
	// Dialog
	.delegate('#solution-open button', 'click', function(event) {
		if($(this).attr('className') == 'solution-open') {
			WAF.serverAdmin.loader.show();
			WAF.serverAdmin.solution.recent.path =	$('input[name="solution-open-path"]').val();
			WAF.serverAdmin.solution.open(WAF.serverAdmin.solution.recent.path);
			
			// We have to wait for the current solution to be closed & the new one to be opened
			setTimeout(function() {
				WAF.serverAdmin.solution.loadBy('path');
			}, 2000);
		}
		
		WAF.serverAdmin.dialog.hide();
	});
});
