/* Component SapphireRadioButton */
SapphireWidgets.SapphireRadioButton = widgetId => {
	const $widget = $(`#${widgetId}`);
	const $input = $widget.find('input[type="radio"]');
	const $label = $widget.find('.ButtonRadioInp_radioText');
	const name = $input.prop('name');

	const addRemoveClass = ($el, toAdd) => {
		if (toAdd) $el.addClass('active');
		else $el.removeClass('active');
	};

	const isChecked = $el => {
		if ($el.is(':checked')) addRemoveClass($widget, true);
		else addRemoveClass($widget, false);
	};

	$input.click(function() {
		$widget.removeClass('active');

		$(`input[type="radio"][name="${name}"]`).each(function() {
			addRemoveClass($(this).closest('.ButtonRadioInp'), false);
		});
	});

	$input.on('change', function() {
		isChecked($(this));
	});

	$label.click(function() {
		const $closestElement = $(this).closest('.ButtonRadioInp');

		if ($closestElement.hasClass('disabled')) return false;

		$input[0].click();
		//isChecked($input);
	});

	isChecked($input);
};
