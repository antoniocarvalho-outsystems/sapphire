/* Component TableForm */
(function($, window, SapphireWidgets) {
	const addEmptyLine = config => {
		const $list = $('.TableFormColumn:not(.TableFormColumn--editMode) .TableFormColumn__Fields .ListRecords');

		$list.append('<div class="TableFormColumn__EmptyItem"></div>');
	};

	const removeEmptyLine = config => {
		const $list = $('.TableFormColumn:not(.TableFormColumn--editMode) .TableFormColumn__Fields .ListRecords .TableFormColumn__EmptyItem');
		$list.remove();
	};

	const onComponentReload = widgetId => {
		const $table = $(`#${widgetId}`);
		const $editing = $table.find('.TableFormColumn--editMode');

		if ($editing.length) {
			$table.addClass('TableForm--scrollDisabled');
		} else {
			$table.removeClass('TableForm--scrollDisabled');
		}
	};

	SapphireWidgets.TableForm = { addEmptyLine, onComponentReload, removeEmptyLine };
})(jQuery, window, SapphireWidgets);
