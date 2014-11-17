
WAF.define('RepeaterEnhanced', ['waf-core/widget', 'Text', 'Button'], function(widget, Text, Button) {
	
    var RepeaterEnhanced = widget.create('RepeaterEnhanced', {
        init: function() {
        	var that = this;
		    this.getPart('previous').subscribe('click', function(){
		    	var nbStart = that.myRows.start() - that.myRows.pageSize();
		    	nbStart = nbStart < 0 ? 0 : nbStart;
		    	that.myRows.fetch({start:nbStart});
		    });
		    this.getPart('next').subscribe('click', function(){
		    	var nbStart = that.myRows.start() + that.myRows.pageSize();
				that.myRows.fetch({start:nbStart});
		    });

    		this.myRows.fetch({start:0});
        },
        widgetsToRemoveOnUpdate: function(start, end) {
    		return this.widgets();
		}
    });

    RepeaterEnhanced.inherit('waf-behavior/layout/repeater');
	RepeaterEnhanced.inherit('waf-behavior/layout/composed');
    
    RepeaterEnhanced.setPart('previous', Button, {value:'Previous Page'});
    RepeaterEnhanced.setPart('next', Button, {value:'Next Page'});
    
    RepeaterEnhanced.addProperty( 'myRows', {
    	type: 'datasource',
		attributes: ['name'],
		pageSize:10
    });
    
    RepeaterEnhanced.repeaterReuseClonedWidgets();
    RepeaterEnhanced.linkDatasourcePropertyToRepeater('myRows');
	RepeaterEnhanced.repeatedWidget(Text);
    RepeaterEnhanced.mapAttributesToRepeatedWidgetProperties({name: 'value'});
	
    return RepeaterEnhanced;

});