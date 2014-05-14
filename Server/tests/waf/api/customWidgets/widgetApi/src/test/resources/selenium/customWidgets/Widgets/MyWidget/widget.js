WAF.define('MyWidget', ['waf-core/widget'], function(widget) {
	
    var MyWidget = widget.create('MyWidget', {
        init: function() {
//            /* Define a custom event */
//            this.fire('myEvent', {
//                message: 'Hello'
//            });
// 			 this.right(100);
// 			this.right(10);
// 			this.fitToRight();
        }
       
//        ,
        
//        /* Create a property */
//        test: widget.property({
//            onChange: function(newValue) {
//                this.node.innerHTML = this.test(); /* this contains the widget and newValue contains its current value */
//            }
//        })
    });

//    /* Map the custom event above to the DOM click event */
    MyWidget.mapDomEvents({
        'click': 'action'
    });

    return MyWidget;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */