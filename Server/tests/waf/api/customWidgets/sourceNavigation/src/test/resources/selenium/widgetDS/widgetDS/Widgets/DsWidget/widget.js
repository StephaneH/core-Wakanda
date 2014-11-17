WAF.define('DsWidget', ['waf-core/widget','waf-behavior/source-navigation'], function(widget, sourceNavigation) {
	//var sourceNavigation = WAF.require('waf-behavior/source-navigation');
    var DsWidget = widget.create('DsWidget', {
    	tagName: "ul",
		values: widget.property({
		     type: 'datasource',
		     attributes : [ { name: 'idValue' }, { name: 'nameValue' } ]//,
		    // pageSize: 30
		}),

		init: function() {
			
			this.linkDatasourcePropertyToNavigation('values');
			//this.linkDatasourcePropertyToNavigation('values');
			 console.log(this.node.tagName);
			 console.log(this.tagName);
			this.linkParentElementToNavigation(this.node);
             
			 this.values.subscribe("collectionChange",function(event){console.log("Subscribe method is working with onCollectionChange!");});
		     this.start(30);
		     this.values.onPageChange(this.render);
	         this.values.fetch();

//		     console.log(this.values.start);
		    
			 var thiss = this;
			 
		     var $more = $('#btn').appendTo(this.node); //create a $more link
		     

			 
		     $more.on('click', function() {
		     	
		          thiss.start(thiss.start() + thiss.values.pageSize());
//		     
		          thiss.values.fetch({
		               start: thiss.start()
		          });
		     });
	
		
		     
		},
		
		tagName: 'ul',
		renderElement: function(element, position) {
        	return '<li>' + element. getAttributeValue('name') + '</li>';
    	},
		render: function(values) {
			 
		     console.log(values);
		}
    });

//    /* Map the custom event above to the DOM click event */
//    DsWidget.mapDomEvents({
//        'click': 'action'
//    });
	DsWidget.inherit(sourceNavigation);
	
    return DsWidget;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */