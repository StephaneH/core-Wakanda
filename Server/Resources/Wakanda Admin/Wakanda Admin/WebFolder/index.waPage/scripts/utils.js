(function($) {

  var o = $({});

  $.subscribe = function () {
    o.on.apply(o, arguments);
  };

  $.unsubscribe = function () {
    o.off.apply(o, arguments);
  };

  $.publish = function () {
    o.trigger.apply(o, arguments);
  };

  $.fn.notify = function (action, type, message, autoHide) {

    var self = this,
        msgHolder = this.children('.waf-richText');
    
    autoHide = typeof autoHide == "undefined" ? true : false;
    
    // reset notification type
    this.hide();
    msgHolder.text('');
    this.removeClass(function (index, css) {
      return (css.match (/(^|\s)waf-role-\S+/g) || []).join(' ');
    });

    if (type) {
      this.addClass('waf-role-' + type);
    };

    if (message) {
      msgHolder.text(message);
    };

    if (action === 'show') {
      this.show();     
    };

    if (autoHide) {
      setTimeout(function () {
        self.hide();
      }, 3000);
    }

    return this;
  }

}(jQuery));
