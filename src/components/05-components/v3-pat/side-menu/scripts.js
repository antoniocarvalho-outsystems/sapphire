/* Component SideMenuStructure */
(function($, window, SapphireWidgets) {
	class SideMenu {
		constructor(config) {
			this.options = {
				...config,
			};

			this.onComponentInit();
		}

		setMainMenuWidth() {
			$(document).ready(() => {
				const $sideBarIframe = $('.LayoutBase-iframesidebar.notExpandable');

				if ($sideBarIframe.length) {
					const $mainMenu = $('.LayoutBase-MainMenu');
					$mainMenu.css({
						width: 'calc(100% - 262px)',
					});
				}
			});
		}

		openCloseMenu(toOpen) {
			if (toOpen) {
				this.$component.addClass('SideMenu--open');

				$('.LayoutBase-iframesidebar').css({
					zIndex: 0,
				});
			} else {
				this.$component.removeClass('SideMenu--open');

				$('.LayoutBase-iframesidebar').css({
					zIndex: 70,
				});
			}
		}

		windowClick($component) {
			$(window)
				.off('click.SideMenuStructure')
				.on('click.SideMenuStructure', event => {
					const isMenuItem = event.target.offsetParent && $(event.target.offsetParent).hasClass('MenuItem');

					if (!isMenuItem) {
						$component.find('.SideMenu__MenuItems .active').removeClass('active');
						$component.find('.SideMenu__MenuItems .show').removeClass('show');

						$(window).off('click.SideMenuStructure');
					}
				});
		}

		onComponentInit() {
			this.setMainMenuWidth();

			this.$component = $(`#${this.options.widgetId}`);
			this.$trigger = this.$component.find('.SideMenu__Trigger');
			this.$shield = this.$component.find('.SideMenu__Shield');
			this.$closeButton = this.$component.find('.SideMenu__MenuClose');
			this.$tabItem = this.$component.find('.SideMenu__TabItems .MenuItem');
			this.$menuItem = this.$component.find('.SideMenu__MenuItems .MenuItem__ItemTitle');
			this.$subItem = this.$component.find('.SideMenu__MenuItems .MenuItem_subItems');
			this.$department = this.$component.find('.SideMenu__Tabs .DepartmentName');

			//this.$trigger.hide();
			this.$department.hide();

			this.$iframeContainer = this.$component.find('.iframeContainer');
			this.$iframeContainer.append('<div class="lds-ring OI"><div></div><div></div><div></div><div></div></div>');
			this.$iframeContainer.find('iframe').load(() => {
				this.$iframeContainer.find('.lds-ring').fadeOut();

				if (!this.$component.hasClass('SideMenu--tabsTheme')) {
					//this.$trigger.show();
					this.$department.show();
				}
			});

			this.$trigger.on('click', () => this.openCloseMenu(true));
			this.$shield.on('click', () => this.openCloseMenu(false));
			this.$closeButton.on('click', () => this.openCloseMenu(false));

			this.$tabItem.on('click', event => {
				const $target = $(event.currentTarget);
				const $link = $target.find('.MenuItem_label a');

				if ($link.length) $link.get(0).click();
			});

			this.$menuItem.on('click', event => {
				const isIcon = event.target.className === 'icon icon-changedown';
				if (event.target !== event.currentTarget && !isIcon) return;

				const $target = $(event.currentTarget).parent();
				const $subItems = $target.find('.MenuItem_subItems');
				const $link = $target.find('.MenuItem_label a');

				if ($link.length) $link.get(0).click();

				if ($target.hasClass('active')) {
					$target.removeClass('active');
					$subItems.removeClass('show');
				} else {
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

					if (this.$component.hasClass('SideMenu--tabsTheme')) {
						this.windowClick(this.$component);
					}
				}
			});

			this.$subItem.on('click', event => event.stopPropagation());

			this.$component
				.find('.SideMenu__TabItems > div:empty')
				.parent()
				.hide();
		}
	}

	const resizeTabs = ($component, $menuTabs, isRecursive) => {
		const $menuTrigger = $component.find('.SideMenu__Trigger');
		const headerWidth = $component.find('.SideMenu__Header').outerWidth();
		const $menuItems = $menuTabs.find('.SideMenu__MenuItems');
		const tabsWidth = $menuItems.length ? $menuItems.outerWidth() : $menuTabs.outerWidth();

		const fixedValue = $(window.parent).width() < 1024 ? 180 : 196;
		let hasItemToRemove = true;

		if (tabsWidth > 0 && tabsWidth + fixedValue > headerWidth && hasItemToRemove) {
			const $moreOptions = $component.find('.SideMenu__Content');
			const $lastItem = $menuTabs
				.find('.SideMenu__MenuItems .MenuItem')
				.last()
				.detach();

			if (!$moreOptions.find('.SideMenu__MenuItems').length) {
				$('<div class="SideMenu__MenuItems"></div>').appendTo($moreOptions);
			}

			const $menuItems = $moreOptions.find('.SideMenu__MenuItems');
			$lastItem.prependTo($menuItems);

			$menuTrigger.css('visibility', 'visible');

			hasItemToRemove = !!$lastItem.length;

			resizeTabs($component, $menuTabs, !!$lastItem.length);
		} else if (!isRecursive) {
			const $menuItems = $menuTabs.find('.SideMenu__MenuItems');
			let $firstItem = $component.find('.SideMenu__Content .SideMenu__MenuItems .MenuItem').first();

			const newLinkWidth = 140 * 1.16 + 16; // Font-size + padding between items (gap)
			const newItemsWidth = newLinkWidth + $menuItems.outerWidth();

			if (newItemsWidth + fixedValue < headerWidth) {
				$firstItem = $firstItem.detach();
				$firstItem.appendTo($menuTabs.find('.SideMenu__MenuItems'));

				if ($component.find('.SideMenu__Content .SideMenu__MenuItems .MenuItem').length) {
					resizeTabs($component, $menuTabs);
				} else {
					$menuTrigger.css('visibility', 'hidden');
				}
			}
		}
	};

	const setTabsTheme = () => {
		$(top.document).ready(function() {
			$('.SideMenu', window.parent.document).addClass('SideMenu--tabsTheme');

			const $component = $('.SideMenu', window.parent.document);
			const $menuTabs = $component.find('.SideMenu__Tabs');

			$menuTabs.find('> div:empty').hide();

			const $items = $component.find('.SideMenu__MenuItems').detach();
			$items.appendTo($menuTabs);

			$(document).ready(function() {
				resizeTabs($component, $menuTabs, true);
			});

			$(window.parent).resize(function() {
				clearTimeout(window.resizedFinished);
				window.resizedFinished = setTimeout(function() {
					resizeTabs($component, $menuTabs);
				}, 250);
			});
		});
	};

	const create = config => (window[config.widgetId] = new SideMenu(config));

	SapphireWidgets.SideMenu = { create, setTabsTheme };
})(jQuery, window, SapphireWidgets);
