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
$(function(){
    /**
    * formular Class
    * @constructor
    */
  
       
        //set markup
        $("#administration-workspace-top-content .administration-content").append(
            '<div class="administration-formular">'+

				'<div class="column">'+

					'<div class="portlet">'+
						'<div class="portlet-header">Projet1</div>'+
						'<div class="portlet-content"><table  class="studio-form-grid waf-form" id="administration-user-general"><tr><td>Repair</td><td>12/09/2011</td></tr>'+
                                                '<tr><td>Repair</td><td>12/09/2011</td></tr>'+
                                                '<tr><td>Verify</td><td>12/09/2011</td></tr>'+
                                                '</table></div>'+
					'</div>'+

					'<div class="portlet">'+
						'<div class="portlet-header">Projet2</div>'+
						'<div class="portlet-content"><table class="studio-form-grid waf-form" id="administration-user-general"><tr><td>Repair</td><td>12/09/2011</td></tr>'+
                                               
                                                '</table></div>'+
					'</div>'+
                                        '<div class="portlet">'+
						'<div class="portlet-header">Projet3</div>'+
						'<div class="portlet-content"><table class="studio-form-grid waf-form" id="administration-user-general"><tr><td>Repair</td><td>12/09/2011</td></tr>'+
                                                '<tr><td>Repair</td><td>12/09/2011</td></tr>'+
                                                '<tr><td>Verify</td><td>12/09/2011</td></tr>'+
                                                '</table></div>'+
					'</div>'+

				'</div>'+

			'</div>'
        );
            
            
           

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

		
  

})