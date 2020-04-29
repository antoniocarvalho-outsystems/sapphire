/* Component SideMenuStructure */
(function($, window, SapphireWidgets) {
	class SideMenu {
		constructor(config) {
			this.options = { ...config };

			this.onComponentInit();
		}

		onComponentInit() {
			this.$component = $(`#${this.options.widgetId}`);
			this.$trigger = this.$component.find('.SideMenu__Trigger');
			this.$shield = this.$component.find('.SideMenu__Shield');
			this.$closeButton = this.$component.find('.SideMenu__MenuClose');
			this.$menuItem = this.$component.find('.SideMenu__MenuItems .MenuItem');

			this.$trigger.on('click', () => {
				this.$component.addClass('SideMenu--open');
			});

			this.$shield.on('click', () => {
				this.$component.removeClass('SideMenu--open');
			});

			this.$closeButton.on('click', () => {
				this.$component.removeClass('SideMenu--open');
			});

			this.$menuItem.on('click', event => {
				const $target = $(event.currentTarget);
				const $subItems = $target.find('.MenuItem_subItems');

				this.$component
					.find('.SideMenu__MenuItems .active')
					.not($target)
					.removeClass('active');

				this.$component
					.find('.SideMenu__MenuItems .show')
					.not($target)
					.removeClass('show');

				$target.toggleClass('active');
				$subItems.toggleClass('show');
			});
		}
	}

	const create = config => (window[config.widgetId] = new SideMenu(config));

	SapphireWidgets.SideMenu = { create };
})(jQuery, window, SapphireWidgets);
