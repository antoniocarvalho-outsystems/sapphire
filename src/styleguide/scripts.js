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
				$('a, .sub-section-title').show();
			}
		});

		this.bindEvents();
	};

	const setRTLmode = () => {
		$('.DesignSystem__MainContent').toggleClass('AR');
	};

	filterTerm = term => {
		$('a, .sub-section-title').each((i, el) => {
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
