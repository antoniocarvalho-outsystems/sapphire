/* Component LineDetailsExpandBox */
(function($, window, SapphireWidgets) {
	const showHide = widgetId => $(widgetId).toggleClass('active');

	const init = config => {
		$('.LineDetailsExpandBox .ExpandableLinkWrapper_Header').off('click');

		$('.LineDetailsExpandBox_header')
			.off('click')
			.on('click', () => showHide(`#${config.widgetId}`));
	};

	const create = config => $(document).ready(() => init(config));

	SapphireWidgets.LineDetailsExpandBox = { create };
})(jQuery, window, SapphireWidgets);
