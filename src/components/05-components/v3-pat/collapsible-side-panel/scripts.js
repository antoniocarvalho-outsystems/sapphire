/* Component CollapsibleSidePanel */
(function($, window, SapphireWidgets) {
	class CollapsibleSidePanel {
		constructor(config) {
			this.options = {
				...config,
			};

			this.onComponentInit();
		}

		openCloseSidePanel(toOpen) {}

		onComponentInit() {
			this.$component = $(`#${this.options.widgetId}`);
			this.$header = this.$component.find('.CollapsibleSidePanel__Header');

			this.$header.on('click', () => this.openCloseMenu(true));
		}
	}

	const create = config => (window[config.widgetId] = new CollapsibleSidePanel(config));

	SapphireWidgets.CollapsibleSidePanel = { create };
})(jQuery, window, SapphireWidgets);
