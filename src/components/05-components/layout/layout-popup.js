/* Component LayoutPopup */
(function($, window, document, SapphireWidgets) {
	var create = function(config) {
		SapphireWidgets.LayoutPopup.config = config;

		$(function() {
			var popupGenericFlexResizeTimer;

			var $popup = $('.LayoutPopup');
			var $osPopup = window.parent.$('.os-internal-Popup.os-internal-ui-dialog');
			var $osPopupContent = window.parent.$('.os-internal-ui-dialog-content.os-internal-ui-widget-content');
			var $overlay = window.parent.$('.os-internal-ui-widget-overlay');
			var popupSize = SapphireWidgets.LayoutPopup.config.PopupSize;

			$('body').addClass('LayoutPopup'); // because datetimerangepicker is attached to body
			if (SapphireWidgets.LayoutPopup.config.isTouch) {
				$popup.addClass('isTouch');
				$('body').addClass('isTouch'); // because select2 is attached to body
			}

			var popupWidth;
			var popupMinWidth;
			var popupHeight;
			var popupMinHeight;
			var popupMaxHeight;
			var popupWidthPercentage;

			var redrawDialogWindow = function() {
				clearTimeout(popupGenericFlexResizeTimer);
				popupGenericFlexResizeTimer = setTimeout(function() {
					resizeDialog();
					resizeContent();
					$('.Page').removeClass('phone tablet landscape portrait');
				}, 300);
			};

			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation, index) {
					redrawDialogWindow();
				});
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
				attributes: false,
			});

			var handleOutOfBoundsElement = function(inserted, propertyToAdjust, value) {
				window.setTimeout(function() {
					if (propertyToAdjust === 'height') {
						$osPopupContent.height($osPopupContent.height() + value + 10);
					}
					if (inserted.classList.contains('pika-single')) {
						var pikadayInstance =
							'cal_' +
							$('.DateInput')
								.eq(0)
								.prop('id');
						window[pikadayInstance].config({
							onClose: function() {
								redrawDialogWindow();
							},
						});
						window[pikadayInstance].adjustPosition();
					}
				}, 500);
			};

			var resizeDialog = function() {
				if (!SapphireWidgets.LayoutPopup.config.hasClose) {
					window.parent.$('.os-internal-ui-dialog-titlebar-close-no-title').hide();
				}

				if (window.top.$('body').hasClass('LayoutBase')) {
					window.top.$('body').css({ overflowY: 'hidden' });
				}

				$overlay.width('100%');

				var windowHeight = $(window.parent).height();
				var windowWidth = $(window.parent).width();

				if (popupSize === 'Small') {
					popupWidth = parseInt(windowWidth * 0.33);
					popupMinWidth = 400;
				} else if (popupSize === 'Medium') {
					switch (SapphireWidgets.LayoutPopup.config.PopupWidth) {
						case 'XSmall':
							popupMinWidth = 200;
							popupWidthPercentage = 0.2;
							break;
						case 'Small':
							popupMinWidth = 300;
							popupWidthPercentage = 0.3;
							break;
						case 'Medium':
							popupMinWidth = 600;
							popupWidthPercentage = 0.6;
							break;
						default:
							popupMinWidth = 700;
							popupWidthPercentage = 0.7;
					}

					popupWidth = SapphireWidgets.LayoutPopup.config.isTouch
						? parseInt(windowWidth * 0.8)
						: parseInt(windowWidth * popupWidthPercentage);
					popupMinHeight = 200;
					popupMaxHeight = SapphireWidgets.LayoutPopup.config.isTouch
						? parseInt(windowHeight * 0.9)
						: parseInt(windowHeight * 0.7);

					if (SapphireWidgets.LayoutPopup.config.isFixedHeight) {
						popupHeight = popupMaxHeight;
					} else {
						popupHeight = window.parent.$('.os-internal-Popup.os-internal-ui-dialog').outerHeight();
					}

					$osPopupContent.css({
						maxHeight: popupMaxHeight + 'px',
						minHeight: popupMinHeight + 'px',
						height: popupHeight + 'px',
					});
				} else if (popupSize === 'Large') {
					popupMinWidth = parseInt(windowWidth * 0.8);
					popupMaxHeight = parseInt(windowHeight * 0.9);
				}

				$osPopup.css({
					position: 'fixed',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
					height: 'auto',
					minWidth: popupMinWidth + 'px',
					width: popupWidth + 'px',
				});
			};

			var resizeContent = function() {
				var $body = $('.LayoutPopup__body__content');
				var contentScrollTop = $body.scrollTop();

				if (popupSize === 'Small' && !!$('.daterangepicker:visible').length) {
					// skip the reset of .LayoutPopup__body__content
				} else {
					$body.css({ height: 'auto' });
				}

				var headerHeight = $('.LayoutPopup__header').innerHeight() || 0;
				var introHeight = $('.LayoutPopup__intro').innerHeight() || 0;
				var bodyHeight = $('.LayoutPopup__body__content')[0].scrollHeight || 0;
				var footerHeight = $('.LayoutPopup__footer').innerHeight() || 0;

				var contentHeight = headerHeight + introHeight + bodyHeight + footerHeight + 40;

				var dialogHeight = window.parent.$('.os-internal-Popup.os-internal-ui-dialog').outerHeight();

				if (popupSize === 'Small') {
					if ($('html')[0].scrollHeight > contentHeight && $('.daterangepicker:visible').length > 0) {
						contentHeight = $('html')[0].scrollHeight;
					}
					$osPopupContent.height(contentHeight);
				} else {
					if (contentHeight < dialogHeight && SapphireWidgets.LayoutPopup.config.isFixedHeight) {
						var forcedBodyHeight = dialogHeight - headerHeight - introHeight - footerHeight - 40;
						$body.height(forcedBodyHeight);
					} else if (contentHeight < dialogHeight) {
						$osPopupContent.height(contentHeight);
						if (contentHeight < popupMinHeight) {
							var diference = popupMinHeight - contentHeight;
							$body.height(bodyHeight + diference);
						}
					} else if (contentHeight >= dialogHeight && SapphireWidgets.LayoutPopup.config.isFixedHeight) {
						var forcedBodyHeight = dialogHeight - headerHeight - introHeight - footerHeight - 40;
						$body.height(forcedBodyHeight);
					} else if (contentHeight >= dialogHeight) {
						if (contentHeight > popupMaxHeight) {
							$osPopupContent.height(popupMaxHeight);
							var forcedBodyHeight = popupMaxHeight - headerHeight - introHeight - footerHeight - 40;
							$body.height(forcedBodyHeight);
						} else {
							$osPopupContent.height(contentHeight);
						}
					} else {
						console.warn('Unexpected combination...');
					}
				}

				var dateRangePicker = $('.daterangepicker:visible');
				if (dateRangePicker.length === 1) {
					if (dateRangePicker[0].getBoundingClientRect().bottom > dialogHeight) {
						var difference = dateRangePicker[0].getBoundingClientRect().bottom - dialogHeight;
						var bodyHeight = $('.LayoutPopup__body__content').outerHeight(true);
						$('.LayoutPopup__body__content').height(bodyHeight + difference);
						$osPopupContent.height($('body')[0].scrollHeight + 10);
						setTimeout(function() {
							window[SapphireWidgets.DateTimeRangePicker.openedWidgetId].handleViewportPosition();
						}, 500);
					}
				}

				$body.scrollTop(contentScrollTop);
			};

			var increaseHeight = function(diference) {
				$osPopupContent.height($osPopupContent.height() + diference);
			};

			$('body').css('visibility', 'hidden');

			SapphireWidgets.LayoutPopup.redrawDialogWindow = redrawDialogWindow;
			SapphireWidgets.LayoutPopup.resizeDialog = resizeDialog;
			SapphireWidgets.LayoutPopup.resizeContent = resizeContent;
			SapphireWidgets.LayoutPopup.increaseHeight = increaseHeight;
		});

		$(window).load(function() {
			$(this.frameElement).css({ width: '100%', height: '100%' });
			setTimeout(function() {
				SapphireWidgets.LayoutPopup.resizeDialog();
				SapphireWidgets.LayoutPopup.resizeContent();
				$('body').css('visibility', 'visible');
			}, 150);
			osAjaxBackend.BindAfterAjaxRequest(SapphireWidgets.LayoutPopup.redrawDialogWindow);
		});

		$(window.parent)
			.off('resize.LayoutPopup')
			.on('resize.LayoutPopup', function() {
				SapphireWidgets.LayoutPopup.redrawDialogWindow();
			});
	};

	SapphireWidgets.LayoutPopup = {
		create: create,
	};
})(jQuery, window, document, SapphireWidgets);

$(window).unload(function() {
	window.top.$('body').css({ overflowY: 'scroll' });
});
