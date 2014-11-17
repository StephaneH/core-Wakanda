WAF.define('DsWidget', ['waf-core/widget'], function(widget) {
	
    var DsWidget = widget.create('DsWidget', {
		values: widget.property({
		     type: 'datasource',
		     attributes : [ { name: 'idValue' }, { name: 'nameValue' } ],
		     pageSize: 30
		     //flag : false
		}),
		
		init: function() {
			 this.values.subscribe("collectionChange",function(event){console.log("Subscribe method is working with onCollectionChange!");});
		     this.start = 30;
		     this.values.onPageChange(this.render);
	         this.values.fetch();

//		     console.log(this.values.start);
		    
			 var thiss = this;
			 
		     var $more = $('#btn').appendTo(this.node); //create a $more link
		     

			 
		     $more.on('click', function() {
		     	
//		     	  debugger;
		          thiss.start = thiss.start + thiss.values.pageSize();
//		          console.log(thiss.values.start);
		          
//		          debugger;
		          thiss.values.fetch({
		               start: thiss.start
		          });
		     });
	
		
		     
		},
		render: function(values) {
			var flagFetch;
			flagFetch = true;
			source.flagFetch.flagFetch = true;		
			//source.flagFetch.sync();
			
		    console.log(values);
		}
    });

//    /* Map the custom event above to the DOM click event */
//    DsWidget.mapDomEvents({
//        'click': 'action'
//    });

    return DsWidget;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */