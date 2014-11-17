WAF.define('RepeaterText', ['waf-core/widget', 'Text'], function(widget, Text) {
	
    var RepeaterText = widget.create('RepeaterText',{
    	init: function(){
    		// Limit number of entities fetch the first time.
    		this.myRows.fetch({start:0, pageSize:10});
    	}
    });

    RepeaterText.inherit('waf-behavior/layout/repeater');
    RepeaterText.addProperty( 'myRows', {
    	type: 'datasource',
		attributes: ['name'],
		pageSize:10
    });
    RepeaterText.linkDatasourcePropertyToRepeater('myRows');
	RepeaterText.repeatedWidget(Text);
    RepeaterText.mapAttributesToRepeatedWidgetProperties({name: 'value'});
    return RepeaterText;
});