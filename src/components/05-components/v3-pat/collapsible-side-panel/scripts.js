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
					this.$content.css({
						minHeight: $clinicianAside.outerHeight(),
					});
				}

				this.$component.addClass('CollapsibleSidePanel--open');
			} else {
				this.$component.removeClass('CollapsibleSidePanel--open');
			}
		}

		onComponentInit() {
			this.$component = $(`#${this.options.widgetId}`);
			this.$header = this.$component.find('.CollapsibleSidePanel__Header');
			this.$content = this.$component.find('.CollapsibleSidePanel__Content');
			this.counter1 = this.$component.find('.CollapsibleSidePanel__Title span.Counter');
			this.counter2 = this.$component.find('.CollapsibleSidePanel__PanelTitle span.Counter');
			this.$panelContent = this.$component.find('.CollapsibleSidePanel__PanelContent');
			this.$close = this.$component.find('.CollapsibleSidePanel__PanelHeader .icon');

			this.$header.on('click', () => this.openCloseSidePanel(true));
			this.$close.on('click', () => this.openCloseSidePanel(false));

			if (this.options.isAutoCounter) {
				let total = 0;
				const counters = this.$panelContent.find('.ExapandablePlaceholder.Counter');

				counters.each(function() {
					total += +$(this).text();
				});

				this.counter1.text(total);
				this.counter2.text(total);

				this.counter1.removeClass('Hidden');
				this.counter2.removeClass('Hidden');
			}

			if (this.options.hideWhenEmpty && !this.$panelContent.text()) {
				this.$component.hide();
			}
		}
	}

	const create = config => (window[config.widgetId] = new CollapsibleSidePanel(config));

	SapphireWidgets.CollapsibleSidePanel = { create };
})(jQuery, window, SapphireWidgets);
