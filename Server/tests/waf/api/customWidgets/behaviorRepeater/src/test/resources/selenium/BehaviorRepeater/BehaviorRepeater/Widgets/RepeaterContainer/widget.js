WAF.define('Container', ['waf-core/widget'], function(widget) {
    var Container = widget.create('Container',{
    	init: function(){
    		if (this.node.innerHTML)
    			return;
            this.node.innerHTML = '<input type="text" />';
            $('input', this.node).val( this.value() );
    	}
    });
	Container.inherit(WAF.require('waf-behavior/layout/container'));
    Container.addProperty( 'value', {
        onChange: function() {
            $('input', this.node).val( this.value() );
        }
    });
	
	return Container;
});

WAF.define('RepeaterContainer', ['waf-core/widget', 'Container'], function(widget, Container) {
	
    var RepeaterContainer = widget.create('RepeaterContainer',{
    	init: function(){
    		// Limit number of entities fetch the first time.
    		this.myRows.fetch({start:0, pageSize:10});
    	}
    });

    RepeaterContainer.inherit('waf-behavior/layout/repeater');
    RepeaterContainer.addProperty( 'myRows', {
    	type: 'datasource',
		attributes: ['name'],
		pageSize:10
    });
    RepeaterContainer.linkDatasourcePropertyToRepeater('myRows');
	RepeaterContainer.repeatedWidget(Container);
    RepeaterContainer.mapAttributesToRepeatedWidgetProperties({name: 'value'});
    return RepeaterContainer;
});