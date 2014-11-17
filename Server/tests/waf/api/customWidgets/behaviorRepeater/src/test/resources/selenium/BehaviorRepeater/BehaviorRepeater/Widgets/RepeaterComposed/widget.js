WAF.define('Header', ['waf-core/widget'], function(widget) {
    var Header = widget.create('Header');
	return Header;
});

WAF.define('Footer', ['waf-core/widget'], function(widget) {
    var Footer = widget.create('Footer');
	return Footer;
});

WAF.define('Content', ['waf-core/widget'], function(widget) {
    var Content = widget.create('Content',{
    	init: function(){
    		if (this.node.innerHTML)
    			return;
            this.node.innerHTML = '<input type="text" />';
            $('input', this.node).val( this.value() );
    	}
    });
    Content.addProperty( 'value', {
        onChange: function() {
            $('input', this.node).val( this.value() );
        }
    });
	return Content;
});

WAF.define('Composed', ['waf-core/widget', 'Header', 'Content', 'Footer'], function(widget, Header, Content, Footer) {
    var Composed = widget.create('Composed',{
    	init: function(){
            this.getPart('content').value(this.value());
    	}
    });
	Composed.inherit(WAF.require('waf-behavior/layout/composed'));
	Composed.setPart('header', Header);
	Composed.setPart('content', Content);
	Composed.setPart('footer', Footer);	
    Composed.addProperty( 'value', {
        onChange: function() {
            this.getPart('content').value(this.value());
        }
    });
	
	return Composed;
});

WAF.define('RepeaterComposed', ['waf-core/widget', 'Composed'], function(widget, Composed) {
	
    var RepeaterComposed = widget.create('RepeaterComposed',{
    	init: function(){
    		// Limit number of entities fetch the first time.
    		this.myRows.fetch({start:0, pageSize:10});
    	}
    });

    RepeaterComposed.inherit('waf-behavior/layout/repeater');
    RepeaterComposed.addProperty( 'myRows', {
    	type: 'datasource',
		attributes: ['name'],
		pageSize:10
    });
    RepeaterComposed.linkDatasourcePropertyToRepeater('myRows');
	RepeaterComposed.repeatedWidget(Composed);
    RepeaterComposed.mapAttributesToRepeatedWidgetProperties({name: 'value'});
    
    return RepeaterComposed;
});