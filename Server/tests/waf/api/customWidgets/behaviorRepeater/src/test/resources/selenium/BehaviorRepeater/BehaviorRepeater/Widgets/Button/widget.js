WAF.define('Button', ['waf-core/widget'], function(widget) {
    var Button = widget.create('Button',{
    	tagName:'button',
    	init: function(){
    		this.node.innerHTML = this.value();
    	}
    });
    
    Button.mapDomEvents({'click': 'click'});
        
    Button.addProperty( 'value', {
    	type: 'string',
    	onChange: function(){
    		this.node.innerHTML = this.value();
    	}
    });
	
	return Button;
});