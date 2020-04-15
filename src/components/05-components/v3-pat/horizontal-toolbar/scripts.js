/* Component HorizontalToolbar */
(function($, window, SapphireWidgets) {
	const create = () => {
		$(document).ready(() => init());
		$(window).load(() => {
			const $itemWrapper = $('.MenuItemWrapper.Active');

			if ($itemWrapper.length) {
				$itemWrapper[0].scrollIntoView({
					behavior: 'auto',
					block: 'end',
				});
			}
		});
	};

	const init = () => {
		handleArrows();

		$('.Toolbar__Items').scroll(() => {
			handleArrows();
		});

		$('.Toolbar__rightBtn').click(function() {
			var currentScroll = $('.Toolbar__Items').scrollLeft();
			var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();
			var sideWidth = maxScrolll - 50;
			$('.Toolbar__Items').scrollLeft(currentScroll + 50);
			if (currentScroll == sideWidth) {
				$('.Toolbar__rightBtn').addClass('Disabled');
			}
			if (currentScroll != 50) {
				$('.Toolbar__leftBtn').removeClass('Disabled');
			}
		});

		$('.Toolbar__leftBtn').click(function() {
			var currentScroll = $('.Toolbar__Items').scrollLeft();
			var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();
			var sideWidth = maxScrolll - 50;
			$('.Toolbar__Items').scrollLeft(currentScroll - 50);
			if (currentScroll != sideWidth) {
				$('.Toolbar__rightBtn').removeClass('Disabled');
			}
			if (currentScroll == 50) {
				$('.Toolbar__leftBtn').addClass('Disabled');
			}
		});

		$(window).on('resize.toolbar', () => {
			handleArrows();
		});
	};

	handleArrows = () => {
		let currentScroll = $('.Toolbar__Items').scrollLeft();
		let menuWidth = $('.Toolbar__Items .ListRecords').width();
		let externalWidth = $('.Toolbar__Items').width();
		var maxScrolll = menuWidth - externalWidth;

		if (externalWidth > menuWidth) {
			$('.Toolbar__leftBtn').hide();
			$('.Toolbar__rightBtn').hide();
			$('.Toolbar_container').addClass('Toolbar_container--noarrows');
		} else {
			$('.Toolbar__leftBtn').show();
			$('.Toolbar__rightBtn').show();
			$('.Toolbar_container').removeClass('Toolbar_container--noarrows');
		}

		if (currentScroll === 0) {
			$('.Toolbar__leftBtn').addClass('Disabled');
		} else {
			$('.Toolbar__leftBtn').removeClass('Disabled');
		}

		if (currentScroll >= maxScrolll) {
			$('.Toolbar__rightBtn').addClass('Disabled');
		} else {
			$('.Toolbar__rightBtn').removeClass('Disabled');
		}
	};

	SapphireWidgets.HorizontalToolbar = {
		create,
	};
})(jQuery, window, SapphireWidgets);
