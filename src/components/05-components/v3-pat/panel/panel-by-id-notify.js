var panelNotifyWidget;

function isAnyPanelOpenedDeprecated() {
    return $('body').hasClass('PanelOpened');
}

if(typeof togglePanelNotifyById !== 'function') {
    togglePanelNotifyById = function (Id) {
        $('body').toggleClass('PanelOpened');
        $('#' + Id).parents('.ToggleButton').parent().children('.Panel').fadeToggle(140);
        
        / Set Notify action /
        panelNotifyWidget = $('#' + Id).parents('.ToggleButton').attr('NotifyId');
        
        setTimeout(
            function(){
                $('#' + Id).parents('.ToggleButton').parent().children('.Panel').children('.PanelContainer').slideToggle(150);
            }, 100
        );
    }
}

function togglePanelByNotify(Id) {
    if(!isAnyPanelOpenedDeprecated()) {
        $('body').addClass('PanelOpened');
        $('#' + Id).parents('.ToggleButton').parent().children('.Panel').fadeIn(140);
        
        try {
            if (justDragged == false) {
                $('.PanelContainer').css('margin-left', panelMarginLeft).css('left', panelLeft).addClass(panelArrowClass);
            }
        } catch(e) {
            console.log(e);
        }
        
        setTimeout( function() {
            $('#' + Id).parents('.ToggleButton').parent().children('.Panel').children('.PanelContainer').slideDown(150);
        }, 100);
    }
    else {
        $('body').removeClass('PanelOpened');
        $('#' + Id).parents('.ToggleButton').parent().children('.Panel').fadeOut(140);
        setTimeout( function() {
            $('#' + Id).parents('.ToggleButton').parent().children('.Panel').children('.PanelContainer').slideUp(150);
        }, 100);
    }
    
    
}


SapphireWidgets.PanelByIdNotify ={
	isAnyPanelOpenedDeprecated:function () {
    return $('body').hasClass('PanelOpened');
},
togglePanelByNotify:function (Id) {
	if(!isAnyPanelOpenedDeprecated()) {
			$('body').addClass('PanelOpened');
			$('#' + Id).parents('.ToggleButton').parent().children('.Panel').fadeIn(140);
			
			try {
					if (justDragged == false) {
							$('.PanelContainer').css('margin-left', panelMarginLeft).css('left', panelLeft).addClass(panelArrowClass);
					}
			} catch(e) {
					console.log(e);
			}
			
			setTimeout( function() {
					$('#' + Id).parents('.ToggleButton').parent().children('.Panel').children('.PanelContainer').slideDown(150);
			}, 100);
	}
	else {
			$('body').removeClass('PanelOpened');
			$('#' + Id).parents('.ToggleButton').parent().children('.Panel').fadeOut(140);
			setTimeout( function() {
					$('#' + Id).parents('.ToggleButton').parent().children('.Panel').children('.PanelContainer').slideUp(150);
			}, 100);
	}
	
	
}
}
