require('./styles.scss');

(function ($, window, SapphireWidgets) {
		const create = config => {
			this.$aside = $('.DesignSystem__Aside');
			this.$filterInput = $('#' + config.filterInput);
			this.$filterClear = this.$filterInput.parent().find('.icon');
			this.$filterInput.on('keydown', evt => {
				if (evt.key === 'Enter') return false;
			});
			this.$filterInput.on('input', (evt) => {
				if (this.$filterInput.val().length > 2) {
					this.filterTerm(evt.target.value);
					this.$filterClear.show();
				} else {
					const $menu = $('.DesignSystem__MenuSection');
					$menu.find('a, .DesignSystem__MenuSection, .DesignSystem__MenuSubSection').show();
					if (this.$filterInput.val().length > 0) {
						this.$filterClear.show();
					} else {
						this.$filterClear.hide();
					}
				}
			});
			this.bindEvents();
		}

		const setRTLmode = () => {
			$('.DesignSystem__MainContent').toggleClass('AR');
		}

		filterTerm = term => {
			const $menu = $('.DesignSystem__MenuSection');
			$menu.find('a').each((i, el) => {
				if ($(el).text().toLowerCase().includes(term.toLowerCase())) {
					$(el).show();
					$(el).parent().addClass('DesignSystem__MenuSubSection--expanded');
				} else {
					$(el).hide();
				}
			});
		}

		bindEvents = () => {

			this.$aside.on('click', '.DesignSystem__MenuItemSection', (e) => {
				$(e.target).parent().toggleClass('DesignSystem__MenuSubSection--expanded');
			});

			this.$aside.on('click', '.DesignSystem__Menu a[title]', (e) => {
				e.preventDefault();
				let url = $(e.target).attr('href');
				let title = $(e.target).attr('title');
				window.location.href = `${url}#${title}`;
			});

			this.$filterClear.on('click', () => {
				this.$filterInput.val('').trigger('input');
			});

			this.$aside.on('click', '.icon.icon-plus', () => {
				openAll();
			});

			this.$aside.on('click', '.icon.icon-minus', () => {
				closeAll();
			});

			$(window).load(() => {
				if (!!window.location.hash) {
					let $content = $('.DesignSystem__Content').find('[title="' + window.location.hash.slice(1) + '"]');
					if (!!$content)
						$(window).scrollTop($content.offset().top);
				}
				//
				let pathname = window.location.pathname.replace('/Styleguidev2_UI/', '');
				$('.DesignSystem__MenuSection a').each((i, el) => {
					let url = $(el).attr('href').split('?')[0];
					if (url === pathname) {
						$(el).addClass('active');
						$(el).closest('.DesignSystem__MenuSubSection').addClass('DesignSystem__MenuSubSection--expanded');
						let linkTopPosition = $(el).closest('.DesignSystem__MenuSubSection')[0].offsetTop;
						$('.DesignSystem__Menu')[0].scroll(0, linkTopPosition - 230);
					}
				});
			});

			$(window).on('hashchange', () => {
				$(window).scrollTop($('.DesignSystem__Content').find('[title="' + window.location.hash.slice(1) + '"]').offset().top);
			});

		}

		openAll = () => {
			$('.DesignSystem__MenuSubSection').addClass('DesignSystem__MenuSubSection--expanded');
			$('.DesignSystem__Menu')[0].scroll(0, 0);
		}

		closeAll = () => {
			$('.DesignSystem__MenuSubSection').removeClass('DesignSystem__MenuSubSection--expanded');
			$('.DesignSystem__Menu')[0].scroll(0, 0);
		}

		SapphireWidgets.DesignSystem = {
			closeAll,
			create,
			openAll,
			setRTLmode,
		}

	}

)(jQuery, window, SapphireWidgets);