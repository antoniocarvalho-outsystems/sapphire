/* Component HorizontalToolbar */
(function($, window, SapphireWidgets) {
	const init = () => {
		$('.MenuItemWrapper.Active')[0].scrollIntoView({
			behavior: 'auto',
			block: 'end',
		});

		var $item = $('.MenuItemWrapper');
		var initWidth = $('.Toolbar__Items .ListRecords')[0].scrollWidth;

		$('.Toolbar__Items').scroll(function() {
			var currentScroll = $('.Toolbar__Items').scrollLeft();
			var maxScrolll = $('.Toolbar__Items .ListRecords').width() - $('.Toolbar__Items').width();

			if (currentScroll == 0) {
				$('.Toolbar__leftBtn').addClass('Disabled');
			} else {
				$('.Toolbar__leftBtn').removeClass('Disabled');
			}

			if (currentScroll >= maxScrolll) {
				$('.Toolbar__rightBtn').addClass('Disabled');
			} else {
				$('.Toolbar__rightBtn').removeClass('Disabled');
			}
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
	};

	const create = () => $(document).ready(() => init());

	SapphireWidgets.HorizontalToolbar = { create };
})(jQuery, window, SapphireWidgets);
