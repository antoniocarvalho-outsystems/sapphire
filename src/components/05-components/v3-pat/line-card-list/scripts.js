/* Component LineCardList */
(function($, window, SapphireWidgets) {
	const create = config => {
		$(document).ready(function() {
			const $component = $(`#${config.widgetId}`);
			const $card = $component.find('.LineCardList');
			const $checkBox = $component.find('.LineCardList_checkbox label');

			$card.click(function() {
				$(this).toggleClass('active');

				$card.not(this).removeClass('active');

				$card
					.not(this)
					.find('.LineCardList_checkbox input[type=checkbox]')
					.prop('checked', false);

				if ($(this).hasClass('active')) {
					$(this)
						.find('.LineCardList_checkbox input[type=checkbox]')
						.prop('checked', true);
				} else {
					$(this)
						.find('.LineCardList_checkbox input[type=checkbox]')
						.prop('checked', false);
				}
			});

			$checkBox.click(function() {
				$card
					.not(this)
					.closest('.LineCardList')
					.removeClass('active');

				$(this)
					.closest('.LineCardList')
					.toggleClass('active');
			});
		});
	};

	SapphireWidgets.LineCardList = { create };
})(jQuery, window, SapphireWidgets);
