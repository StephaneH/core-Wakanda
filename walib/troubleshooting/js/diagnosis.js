(function($) {
    $(function() {
        var feature,
            ul = $('#secCSS3').find('ul'),
            diagnosis = {
                NAV: {},
                CSS3: {},
                WAF: {
                    PLATFORM: WAF.PLATFORM,
                    BUILD: WAF.BUILD,
                    VERSION: WAF.VERSION
                }
            },
            clip = new ZeroClipboard(document.getElementById('copy'), { moviePath: 'swf/ZeroClipboard.swf' });
    
        console.log('clip', clip);
        
        // CSS 3 stuff
        for (feature in Modernizr) {
            if (typeof Modernizr[feature] === 'boolean') {
                diagnosis['CSS3'][feature] = Modernizr[feature];
                $('<li></li>').html("<strong>" + feature + "</strong> " + Modernizr[feature]).appendTo(ul);
            }
        }
    
        $('section h1').click(function() {
            var ul = $(this).parent().parent().find('ul,textarea');
            if ($(this).hasClass('active')) {
                ul.slideUp();
            } else {
                ul.slideDown();
            }
    
            $(this).toggleClass('active');
        });
    
        $('ul.nav li').click(function() {
            $(this).parent().find('.active').removeClass('active');
            $(this).addClass('active');
        });
        
        // navigator
        ul = $('#nav').find('ul');
    
        for (feature in navigator) {
            if (typeof navigator[feature] === 'string') {
                diagnosis['NAV'][feature] = navigator[feature];							
                $('<li></li>').html("<strong>" + feature + "</strong> " + navigator[feature]).appendTo(ul);
            }
        }
    
        // waf
        ul = $('#wafSec').find('ul');
    
        $('<li/>').html('<strong>PLATFORM</strong> ' + JSON.stringify(WAF.PLATFORM)).appendTo(ul);
        $('<li/>').html('<strong>BUILD</strong>' + WAF.BUILD).appendTo(ul);
        $('<li/>').html('<strong>VERSION</strong>' + WAF.VERSION).appendTo(ul);
    
        $('#summary textarea').html(JSON.stringify(diagnosis, null, '\t')).get(0).select();
    
        $('section').find('ul,textarea').hide();
        $('section').first().find('ul,textarea').show();
    
        clip.setText(JSON.stringify(diagnosis));
        
        clip.on('mouseover', function() { console.log('mouseOver'); });
        clip.on('load', function() { console.log('loaded'); });
        clip.on('wrongflash', function() { console.log('wrongFlash'); });
        clip.on('mouseover', function() { console.log('mouseOver'); });        
    });
})(jQuery);