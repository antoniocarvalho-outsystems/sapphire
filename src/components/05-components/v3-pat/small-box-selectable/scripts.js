SapphireWidgets.SmallBoxSelectable = function(config) {
	const $component = $(`#${config.widgetId}`);

	if (config.selectOnClick) {
		$component.click(() => {
			const $list = $('.SmallBoxList .SmallBoxSelectable').not($component);

			$list.removeClass('SmallBoxSelectable--selected');
			$component.toggleClass('SmallBoxSelectable--selected');
		});
	}
};
