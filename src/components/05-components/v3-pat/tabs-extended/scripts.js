/* Component TabsExtended */
SapphireWidgets.TabsExtended = function(config) {
	$(document).ready(function() {
		const $component = $(`#${config.widgetId} .Tabs_Extended`);
		const $tabHeader = $component.find('.Tabs_header');
		const $tabContainer = $component.find('.TabsContainer');
		const $tabs = $tabHeader.find('> .Tabs__tab');
		const $tabsEnabled = $tabHeader.find('> .Tabs__tab:not(.disabled)');
		const $tabsInput = $component.find('.Tabs_Input input');

		$tabs.each(function() {
			if ($(this).text() === '') {
				$(this).remove();
			}
		});

		$tabsEnabled.on('click', function() {
			$tabContainer.attr('activetab', $(this).attr('value'));

			$tabsInput.val($(this).attr('value'));
			$tabsInput.change();
		});

		$tabsEnabled.off('mousedown').on('mousedown', function(evt) {
			var $tabsExtended = $(evt.target).closest('.Tabs_Extended');
			$tabsExtended.removeClass('isClosed');
		});

		$('.Tabs_Extended.HideActiveOnClick .Tabs_header')
			.off('mousedown')
			.on('mousedown', '.Tabs__tab.active', function(evt) {
				var $tabsExtended = $(evt.target).closest('.Tabs_Extended');
				var $tabsBody = $tabsExtended.find('.Tabs_body');

				if ($tabsBody.hasClass('Tabs_body--closed')) {
					$tabsBody.removeClass('Tabs_body--closed');
					$tabsExtended.removeClass('isClosed');
				} else {
					$tabsBody.addClass('Tabs_body--closed');
					$tabsExtended.addClass('isClosed');
				}
			});

		$tabHeader.find('.Tabs_Extended--disabled').each(function(index, el) {
			$(el)
				.parent()
				.css('cursor', 'default')
				.off('click');
		});

		$component.each(function(index, el) {
			if ($(el).hasClass('Tabs_Extended--closedonstart')) {
				$(el)
					.find('.Tabs_body')
					.addClass('Tabs_body--closed');
				$(el).addClass('isClosed');
				$(el).removeClass('Tabs_Extended--closedonstart');
			}

			$(el)
				.off('click')
				.on('click', '.Tabs_Extended--close', function(evt) {
					$(evt.target)
						.closest('.Tabs_body')
						.addClass('Tabs_body--closed');
				});
		});

		if (!config.tab1Enabled) $tabHeader.find('> .Tabs__tab[value=1]').addClass('disabled');
		if (!config.tab2Enabled) $tabHeader.find('> .Tabs__tab[value=2]').addClass('disabled');
		if (!config.tab3Enabled) $tabHeader.find('> .Tabs__tab[value=3]').addClass('disabled');
		if (!config.tab4Enabled) $tabHeader.find('> .Tabs__tab[value=4]').addClass('disabled');
		if (!config.tab5Enabled) $tabHeader.find('> .Tabs__tab[value=5]').addClass('disabled');
	});
};
