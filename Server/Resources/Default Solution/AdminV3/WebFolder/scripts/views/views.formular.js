/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
    /**
    * formular Class
    * @constructor
    */
  
       
        //set markup
      
            
            
        Formulaire = function() {
        
        //init structure
        $( ".column" ).sortable({
			connectWith: ".column",
			handle: '.portlet-header'
		});

		$( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
			.find( ".portlet-header" )
				.addClass( "ui-widget-header ui-corner-all" )
				.prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
				.end()
			.find( ".portlet-content" );
                        

		$( ".portlet-header .ui-icon" ).click(function() {
			$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
			$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
		});
                    tabledroite();
        }	


      tabledroite = function() {
        
        //init structure
      $('.studio-icon-remove').hide();
      $('.trcol').css('border','none');
     $('.trcol').mouseover(function(event)
            {
              
              $(this).css('background','rgb(190, 214, 236) none !important');
              $(this).find('button').show();
              $(this).css('border','1px solid #868686');
              
            });
      $('.trcol').mouseout(function(event)
            {
             
              $(this).removeAttr("style");
              $(this).find('button').hide();
              $(this).css('border','none');
              $(this).find('td').css('border-bottom','none');
            });
      
   

        }	


