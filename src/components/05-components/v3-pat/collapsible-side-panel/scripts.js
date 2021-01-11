/* Component CollapsibleSidePanel */
(function($, window, SapphireWidgets) {
	class CollapsibleSidePanel {
		constructor(config) {
			this.options = {
				...config,
			};

			this.onComponentInit();
		}

		openCloseSidePanel(toOpen) {
			const $clinicianAside = $('.ClinicianWorkArea-columns-small');

			if (toOpen) {
				if ($clinicianAside.length) {
					//this.$component.addClass('CollapsibleSidePanel--clinicianMode');

					this.$content.height('98vh');
				}

				this.$component.addClass('CollapsibleSidePanel--open');
			} else {
				this.$component.removeClass('CollapsibleSidePanel--open');

				/*if ($clinicianAside.length) {
					this.$component.removeClass('CollapsibleSidePanel--clinicianMode');
				}*/
			}
		}

		onComponentInit() {
			this.$component = $(`#${this.options.widgetId}`);
			this.$header = this.$component.find('.CollapsibleSidePanel__Header');
			this.$content = this.$component.find('.CollapsibleSidePanel__Content');
			this.$close = this.$component.find('.CollapsibleSidePanel__PanelHeader .icon');

			this.$header.on('click', () => this.openCloseSidePanel(true));
			this.$close.on('click', () => this.openCloseSidePanel(false));
		}
	}

	const create = config => (window[config.widgetId] = new CollapsibleSidePanel(config));

	SapphireWidgets.CollapsibleSidePanel = { create };
})(jQuery, window, SapphireWidgets);
