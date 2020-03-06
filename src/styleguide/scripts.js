require('./styles.scss');

(function($, window, SapphireWidgets) {
	const create = config => {
		const $filterInput = $('#' + config.filterInput);

		$filterInput.on('keydown', evt => {
			if (evt.key === 'Enter') {
				return false;
			}
		});

		$filterInput.on('keyup', evt => {
			if (evt.target.value.length > 2) {
				this.filterTerm(evt.target.value);
			} else {
				const $menu = $('.DesignSystem__MenuSection');

				$menu.find('a, .DesignSystem__MenuSubSection').show();
			}
		});

		this.bindEvents();
	};

	const setRTLmode = () => {
		$('.DesignSystem__MainContent').toggleClass('AR');
	};

	filterTerm = term => {
		const $menu = $('.DesignSystem__MenuSection');

		$menu.find('a').each((i, el) => {
			if (
				$(el)
					.text()
					.toLowerCase()
					.includes(term.toLowerCase())
			) {
				$(el).show();
			} else {
				$(el).hide();
			}
		});

		$menu.find('.DesignSystem__MenuSubSection').each((i, el) => {
			if ($(el).children('a:visible').length === 0) $(el).hide();
			else $(el).show();
		});
	};

	bindEvents = () => {
		$('.DesignSystem__MenuItemSection').click(e => {
			$(e.target)
				.parent()
				.toggleClass('DesignSystem__MenuSubSection--expanded');
		});
	};

	SapphireWidgets.DesignSystem = {
		create,
		setRTLmode,
	};
})(jQuery, window, SapphireWidgets);
