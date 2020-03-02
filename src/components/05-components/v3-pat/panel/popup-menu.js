/* Component PopUpMenu */

SapphireWidgets.PopUpMenu={
	menuPosition:function (id, Context) {
		/* Hide any other menus on page and set button as collapsed. */
		$('.popup-menu:visible').hide();
	
		//var _this = $(this);
		var _this = $('#' + id);
		var Xx = 0;
		var Yy = 0;
		var Ww = 0;
		var Hh = 0;
	
		_this.children('.button-expand:visible').hide();
	
		/* Get the menu element. */
		var _el = _this.next('.popup-menu');
	
		/* Display the menu. */
		_el.show();
	
		/* Set button collapse. */
		_this.children('.button-collapse').show();
	
		/* Get the dimensions of the button. */
		buttonHh = _this.outerHeight();
		buttonWw = _this.outerWidth();
	
		var buttonY = _this.position().top + buttonHh;
		var buttonX = _this.offset().left;
		//var buttonX = _this.position().left;
	
		/* Get the distance of menu button and the parent element */
		var popupParentXx = _this.offset().left - _this.position().left;
	
		var popupXx = _el.offset().left;
		var popupWw = _el.outerWidth();
	
		Xx = Math.abs(buttonX - $('body').scrollLeft() - popupParentXx);
		Yy = Math.abs(buttonHh - buttonY - $('body').scrollTop());
	
		/* Check if clicked position plus the popup width exceed the window width. */
		if (buttonX + popupWw - $('body').scrollLeft() > $(Context).width()) {
			Xx = buttonX - popupWw - $('body').scrollLeft() - popupParentXx + buttonWw;
			//Xx = ($(window).width() - popupWw) - $('body').scrollLeft();
		}
	
		/* Set menu position. */
		_el.css({ left: Xx + 'px', top: buttonY + 'px' });
	
		/* Refresh value */
		popupXx = _el.offset().left;
	
		var _balloonEl = _el.children('.popup-menu-balloon');
	
		var _balloonXx = _balloonEl.offset().left;
		var _balloonWw = _balloonEl.outerWidth();
		var _balloonPosXx = Math.abs(buttonX - Xx - popupParentXx);
	
		/* Is the balloon icon positioned out of the popup menu? */
		if (_balloonPosXx + Xx + _balloonWw > Xx + popupWw) {
			_balloonPosXx = _balloonPosXx - _balloonWw;
		}
	
		/* Set position of the balloon effect. */
		_balloonEl.css('left', _balloonPosXx + 'px');
	},
	menuEvents:function (Context) {
		$('.popup-button')
			.off('click')
			.on('click', function(e) {
				var id = $(this).attr('id');
				menuPosition(id, Context);
	
				/*e.stopPropagation();*/
	
				/* Prevent link submission */
				return false;
			});
	
		/* v *** Hide popup when click outside *** v */
		function PMClickOutside(event) {
			if (event.hasOwnProperty('target')) {
				var target = $(event.target);
				/*if ((target.parents().index($('a[sapphirehospital], .HospitalPopUp')) == -1)) {}*/
				if (
					!$(event.target).closest(
						'.popup-button, .popup-menu, .os-internal-ui-autocomplete, .os-internal-ui-menu-item, .os-internal-ui-corner-all, ui-autocomplete-item'
					).length
				) {
					$('.popup-menu:visible').hide();
					$('.button-collapse:visible').hide();
					$('.button-expand').show();
				}
			}
		}
	
		var _PMIsDrag = false;
		var _PMIsClick = false;
		$(document).on('touchstart', function(event) {
			_PMIsDrag = false;
			_PMIsClick = true;
		});
		$(document).on('touchmove', function(event) {
			_PMIsDrag = true;
		});
		$(document).on('click', function(event) {
			PMClickOutside(event);
			_PMIsDrag = false;
			_PMIsClick = false;
		});
		$(document).on('touchend', function(event) {
			if (!_PMIsDrag && _PMIsClick) {
				PMClickOutside(event);
			}
			_PMIsDrag = false;
			_PMIsClick = false;
		});
	
		$('.button-collapse').on('click', function(event) {
			$('body').trigger('click');
			return false;
		});
		/* ^ *** Hide popup when click outside *** ^ */
	}
}




