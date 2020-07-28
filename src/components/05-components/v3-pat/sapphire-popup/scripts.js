/* Component SapphirePopup */
(function($, window, SapphireWidgets) {
	// Check if the widget is loaded inside an iFrame.
	var _isInIframe = window.frameElement != undefined || false;

	// Constants
	var Popup_Window_ShowTimeoutMilSecs = 200;
	var Popup_Window_HideTimeoutMilSecs = 800;
	var Popup_Window_InitialWidth = 300;
	var Popup_Window_InitialHeight = 100;
	var RichWidgets_Popup_Editor_notifyWidget;
	var Popup_Window_Index = 4010;
	var Popup_Window_ParentUrl;
	var Popup_Window_ClosingTag = 'closing';
	var Popup_Window_ClosingValue = 'true';

	const create = config => {
		if (config.ignoreIframe) {
			_isInIframe = false;
		}

		var GetLinkHref = function(widget) {
			var linkHref;
			var isAButton = false;
			try {
				//Checks if the id is from a link or not
				linkHref = $(widget).attr('href');

				//Tests for visibility/existence
				if (typeof linkHref == 'undefined') {
					var onClick = widget.getAttribute('onclick');
					if (typeof onClick != 'undefined') {
						isAButton = true;
						if (onClick != null) {
							var hrefMatch;
							if ((hrefMatch = onClick.toString().match(/href='([^']*)'/)) != null) {
								linkHref = hrefMatch[1];
							}
						}
					}
				} //else: throw ("Inexistent or Invisible button");
			} catch (e) {}

			return [linkHref, isAButton];
		};

		$().ready(function($) {
			const _id = config.linkId;
			const linkQuery = `#${config.linkId}`;
			var linkWidget;

			try {
				linkWidget = $(linkQuery).get(0);
			} catch (e) {}
			if (typeof linkWidget == 'undefined') {
				//Case the widget is inexistent or invisible, it will show no errors.
				return;
			}

			Popup_Window_ParentUrl = config.parentUrl;

			var getLinkResult = GetLinkHref(linkWidget);
			var linkHref = getLinkResult[0];
			var isAButton = getLinkResult[1];

			if (typeof linkHref == 'undefined' || linkHref == '' || linkHref == '#' || linkHref.indexOf('javascript:') == 0) {
				try {
					window.OsHandleException(
						new Error('Popup link id must be the id of a Link or Button Widget with Method Navigate.'),
						outsystems.osErrorCodes.SystemJavascriptError,
						'Popup_Editor'
					);
				} catch (e) {}
				return;
			}

			if (isAButton) {
				//remove the existing on-click
				linkWidget.setAttribute(
					'onclick',
					linkWidget
						.getAttribute('onclick')
						.toString()
						.replace('window.location.href=', 'return false;window.location.href=')
				);
			}

			// if there's a confirmation message, store in an attribute the result
			if (linkWidget.getAttribute('onclick') != null) {
				linkWidget.setAttribute(
					'onclick',
					linkWidget
						.getAttribute('onclick')
						.toString()
						.replace(
							'if( ret != true )',
							"$('" + linkQuery + "').get(0).setAttribute('confirmed', ret); if( ret != true )"
						)
				);
			}

			var clickHandler = function(event) {
				//The clickHandler event is registered in osjs and $ for compatibillity reasons, they must not run both for the same click.
				//Variable is set to false in Popup_Window_resize function.
				if ($.data(event.target, 'os-internal-processing') == true) {
					return false;
				} else {
					$.data(event.target, 'os-internal-processing', true);
				}

				//Check if the clicked link is disabled
				if (linkWidget.getAttribute('disabled') != null) {
					var linkDisabled = linkWidget
						.getAttribute('disabled')
						.toString()
						.toLowerCase();
					if (linkDisabled == 'disabled' || linkDisabled.indexOf('true') != -1) {
						return false;
					}
				}

				if (linkWidget.getAttribute('confirmed') == 'false') {
					return false;
				}
				if (OsIsIE()) {
					osFocusBackend.ClearFocusedElement();
				}

				var popupDiv;
				if (_isInIframe) {
					_div = document.createElement('DIV');
					_div.setAttribute('style', 'text-align: center; display: none;');
					_div.setAttribute('id', 'window_' + _id);
					window.top.document.body.appendChild(_div);
					popupDiv = window.top.$('#window_' + _id);
					popupDiv.append(
						'<iframe id="iframe_' +
							_id +
							'" width="100%" scrolling="no" height="100%" frameborder="0" src="javascript:void(0);"/>'
					);
					var waitText = ' Please wait while content is loading...';
					var imgHTML =
						"<img style='border-width: 0px; height: 16px; width: 16px;' src='/RichWidgets/img/SpinBlack.gif'/>";
					var pleaseWaitDiv = popupDiv.prepend(
						"<div class='LayoutPopup-loading Text_Note'>" + imgHTML + waitText + '</div>'
					);
				} else {
					popupDiv = $("<div style='text-align: center; display: none;'></div>").appendTo('body');
					popupDiv.append(
						'<iframe id="iframe_' +
							_id +
							'" width="100%" scrolling="no" height="100%" frameborder="0" src="javascript:void(0);"/>'
					);
					var waitText = ' Please wait while content is loading...';
					var imgHTML =
						"<img style='border-width: 0px; height: 16px; width: 16px;' src='/RichWidgets/img/SpinBlack.gif'/>";
					var pleaseWaitDiv = popupDiv.prepend(
						"<div class='LayoutPopup-loading Text_Note'>" + imgHTML + waitText + '</div>'
					);
				}

				var loadTargetPage = function() {
					if (_isInIframe) {
						window.top.RichWidgets_Popup_Editor_notifyWidget = config.notifyId;
						// Create a reference to the iframe object on the document parent
						window.top._iframePopup = window.frameElement.contentWindow;
					} else {
						window.top._iframePopup = window;
					}
					RichWidgets_Popup_Editor_notifyWidget = config.notifyId;

					//load target page
					var ohref = GetLinkHref(linkWidget)[0];
					var rhref = ohref.replace(/(\?|&)_=.*?(&|$)/, '$1_=' + +new Date().now + '$2');
					var xhref = rhref + (rhref == ohref ? (rhref.indexOf('?') >= 0 ? '&' : '?') + '_=' + +new Date() : '');
					popupDiv.find('iframe').attr('src', xhref);
					(function(popupDiv) {
						popupDiv.find('iframe').load(function() {
							//after loading try to resize, if it is possible resize also after each ajax call
							if (resize(popupDiv, _id, config.setWidth, config.setHeight, true, event)) {
								if (config.autoResize) {
									//var contentWindow = getFramedWindow(this);
									if (_isInIframe) {
										osAjaxBackend.BindAfterAjaxRequest(function() {
											var contentWindow = window.top._iframePopup;
											contentWindow.Popup_Window_resize(
												popupDiv,
												_id,
												config.setWidth,
												config.setHeight,
												config.recenterOnResize,
												event
											);
										});
									} else {
										var contentWindow = this.contentWindow;
										contentWindow.osAjaxBackend.BindAfterAjaxRequest(function() {
											contentWindow.parent.Popup_Window_resize(
												popupDiv,
												_id,
												config.setWidth,
												config.setHeight,
												config.recenterOnResize,
												event
											);
										});
									}
								}
							}
						});
					})(popupDiv);
					popupDiv = null;
					pleaseWaitDiv = null;
				};

				OpenPopup(
					popupDiv,
					config.setTitle,
					config.setHeight,
					config.setWidth,
					pleaseWaitDiv,
					config.hideCloseButton,
					loadTargetPage,
					event
				);

				return false;
			};

			$(linkQuery).click(clickHandler);

			function OpenPopup(
				divToPopup,
				setTitle,
				setHeight,
				setWidth,
				divPleaseWait,
				hideCloseButton,
				loadTargetPage,
				event
			) {
				//destroy any previous dialog
				close(null);
				if (_isInIframe) {
					var $jParent = window.top.jQuery;
					$jParent('.os-internal-Popup').remove();
				}

				// if any close is pending, schedule to execute itself asynchronously exit
				// if no close is pending, continue with open operation
				var closingPopups;
				if (_isInIframe) {
					closingPopups = window.top.$('.os-internal-ui-dialog-content');
				} else {
					closingPopups = $('.os-internal-ui-dialog-content');
				}
				for (var i = 0; i < closingPopups.length; i++) {
					if ($.data(closingPopups.get(i), Popup_Window_ClosingTag) == Popup_Window_ClosingValue) {
						setTimeout(function() {
							OpenPopup(
								divToPopup,
								setTitle,
								setHeight,
								setWidth,
								divPleaseWait,
								hideCloseButton,
								loadTargetPage,
								event
							);
						}, 13);
						return false;
					}
				}
				var _dialog;
				if (_isInIframe) {
					var $jParent =
						window.top.jQuery; /* http://stackoverflow.com/questions/1958946/display-jquery-dialog-in-parent-window */
					_dialog = $jParent(divToPopup);
				} else {
					_dialog = $(divToPopup);
				}
				$(divPleaseWait).show();
				if (setHeight == -1) setHeight = Popup_Window_InitialHeight;

				if ($('.ISidebar').length) {
					window.parent.SapphireWidgets.LayoutBase.openSidebarIframe(0);
				}

				_dialog.show().dialog({
					dialogClass: 'os-internal-Popup',
					resizable: false,
					autoResize: false,
					closeOnEscape: !config.hideCloseButton,
					bgiframe: true,
					draggable: false,
					autoOpen: true,
					title: setTitle,
					modal: !(config.useModal === false),
					height: setHeight,
					position: 'center',
					width: setWidth == -1 ? Popup_Window_InitialWidth : setWidth,
					zIndex: Popup_Window_Index,
					close: function() {
						//If the popup is closed before it is resized (ESC) we need to set the processing event to false.
						$.data(event.target, 'os-internal-processing', false);
						_dialog.find('iframe').unbind('load');
						_dialog.find('iframe').attr('src', 'about:blank');
						setTimeout(function() {
							_dialog.find('iframe').empty();
							_dialog.empty();
						}, 13); //We need to delay this! or IE7 crashes
					},
				});

				_dialog.find('iframe').height(0);
				_dialog.parents('.os-internal-ui-dialog').dropShadow();

				if (config.CssClasses !== ' ') {
					if (_isInIframe) {
						window.top.$('.os-internal-ui-dialog').addClass(config.CssClasses);
					} else {
						$('.os-internal-ui-dialog').addClass(config.CssClasses);
					}
				}

				loadTargetPage();
			}
		});
	};

	const resize = (divToPopup, _id, setWidth, setHeight, recenter, event) => {
		// Code to support old resize method Popup_Window_resize(setWidth, setHeight, recenter)
		if (typeof recenter == 'undefined') {
			recenter = setHeight;
			setHeight = setWidth;
			setWidth = divToPopup;
			if (_isInIframe) {
				divToPopup = window.top.$('.os-internal-ui-dialog-content');
			} else {
				divToPopup = $('.os-internal-ui-dialog-content');
			}
		}

		// Resize must bail out immediately if the popup is marked as closing, and not start the animation.
		if ($.data(divToPopup.get(0), Popup_Window_ClosingTag) == Popup_Window_ClosingValue) {
			return false;
		}
		var frameObj = divToPopup.find('iframe')[0];

		if (typeof frameObj == 'undefined') {
			frameObj = window.top.$('#iframe_' + _id)[0];
		}

		var documentServer;
		if (_isInIframe) {
			documentServer = window.top.document.location.href.replace(/(https?:\/\/[^\/]*).*/, '$1');
		} else {
			documentServer = document.location.href.replace(/(https?:\/\/[^\/]*).*/, '$1');
		}

		if (typeof frameObj != 'undefined') {
			var frameServer = frameObj.src.replace(/(https?:\/\/[^\/]*).*/, '$1');

			var sameOrigin = frameServer.toLowerCase() == documentServer.toLowerCase() || frameServer.indexOf('http') != 0;
			if (!sameOrigin && (setWidth == -1 || setHeight == -1))
				throw new Error('A Popup with a screen from a different server (or https) needs explicict width, height set.');
			if (sameOrigin) {
				if (frameObj.contentDocument !== null || frameObj.contentWindow !== null) {
					var innerDoc = frameObj.contentDocument ? frameObj.contentDocument : frameObj.contentWindow.document;
					if (innerDoc.documentElement.scrollHeight == 0)
						// strangely this event is also triggered on close
						return false;
				}
			}
			var oldHeight;
			if (_isInIframe) {
				oldHeight = window.top
					.$(divToPopup)
					.parents('.os-internal-Popup')
					.outerHeight();
			} else {
				oldHeight = $(divToPopup)
					.parents('.os-internal-Popup')
					.outerHeight();
			}
			var width = setWidth == -1 ? $(innerDoc).width() : setWidth;
			var height = setHeight == -1 ? $(innerDoc).height() : setHeight;

			var titleHeight;
			if (_isInIframe) {
				titleHeight = window.top.$('.os-internal-ui-dialog-titlebar').height();
			} else {
				titleHeight = $('.os-internal-ui-dialog-titlebar').height();
			}

			// Verify if the parent window width is less than the pop-up window, if so set the responsive class on the iframe body (for responsive themes)
			if (window.innerWidth < width) {
				// only set the class if the origin is the same
				if (sameOrigin) {
					$(innerDoc)
						.find('body')
						.addClass('Responsive');
					width = window.innerWidth - 20; // 10px "padding" effect, to keep the popup look and feel on top of content
				}
			}

			// Fix issues with scrollbars
			if (setHeight == -1) {
				// IE7 needs a little more space to remove the scrollbars
				if ($.browser.msie) height = height + 1;
			} else {
				//when explicitly setting the height
				if (sameOrigin) innerDoc.body.style.height = 'auto';
			}

			if (_isInIframe) {
				window.top.$(divToPopup).height(height);
			} else {
				$(divToPopup).height(height);
			}

			//Hide ECT
			if (_isInIframe) {
				window.top
					.$(innerDoc)
					.find('.ECT_FeedbackContainer')
					.hide();
				var divPopupOuterWindow = window.top.$(divToPopup).parents('.os-internal-Popup');
			} else {
				$(innerDoc)
					.find('.ECT_FeedbackContainer')
					.hide();
				var divPopupOuterWindow = $(divToPopup).parents('.os-internal-Popup');
			}

			var animateFinal = {};

			if (setHeight == -1) {
				var oldTop = parseInt(divPopupOuterWindow.css('top'));
				if (recenter) animateFinal.top = Math.max(20, oldTop + (oldHeight - (height + titleHeight)) / 2);
				animateFinal.height = height + titleHeight;
			}

			if (setWidth == -1) {
				var oldLeft = parseInt(divPopupOuterWindow.css('left'));
				if (recenter) animateFinal.left = oldLeft + (divPopupOuterWindow.width() - width) / 2;
				animateFinal.width = width;
			}

			if (
				divPopupOuterWindow.width() == animateFinal.width &&
				divPopupOuterWindow.height() == animateFinal.height - ($.browser.msie ? 1 : 0)
			) {
				$('.os-internal-ui-dialog-content>.Text_Note').hide();
				$(divToPopup).height(height - ($.browser.msie ? 1 : 0)); // restore size
				return true; // nothing to do...
			}

			// hide content in first resize - readjustments will not flickr
			if (
				divPopupOuterWindow.width() == Popup_Window_InitialWidth &&
				divPopupOuterWindow.height() == Popup_Window_InitialHeight
			) {
				$(frameObj).height(0);
			}

			var onAnimationComplete = function() {
				setTimeout(function() {
					if (_isInIframe) {
						/*$(divToPopup).dialog('size');*/
						window.top.$('.os-internal-ui-dialog-titlebar-close-no-title').css('display', 'block');
						window.top
							.$(divToPopup)
							.find('iframe')
							.height('100%')
							.width(animateFinal.width);
					} else {
						/*$(divToPopup).dialog('size');*/
						$('.os-internal-ui-dialog-titlebar-close-no-title').css('display', 'block');
						$(divToPopup)
							.find('iframe')
							.height('100%')
							.width(animateFinal.width);
					}
				}, 13);
			};

			var divPleaseWait;
			if (_isInIframe) {
				divPleaseWait = window.top.$('.os-internal-ui-dialog-content>.Text_Note');
			} else {
				divPleaseWait = $('.os-internal-ui-dialog-content>.Text_Note');
			}

			divPleaseWait.hide();

			if (setHeight == -1 || setWidth == -1) {
				divPopupOuterWindow.animate(animateFinal, {
					duration: 200,
					complete: onAnimationComplete,
				});
			} else {
				onAnimationComplete();
			}
			innerDoc = null;
			divPopupOuterWindow = null;
			if (_isInIframe) {
				window.top.$.data(event.target, 'os-internal-processing', false);
			} else {
				$.data(event.target, 'os-internal-processing', false);
			}
			return true;
		}
	};

	const close = iFrame => {
		var popupToClose;
		// Any close requests must immediately (synchronously) tag the closing element, marking it as closing. The cleanup must be done asynchronously due to IE7..
		if (_isInIframe) {
			popupToClose = window.top.$('.os-internal-ui-dialog-content');
		} else {
			popupToClose = $('.os-internal-ui-dialog-content');
		}

		popupToClose.data(Popup_Window_ClosingTag, Popup_Window_ClosingValue);
		setTimeout(function() {
			popupToClose.dialog('close');
			popupToClose.remove();
		}, 0);
	};

	SapphireWidgets.SapphirePopup = { create, close, resize };
})(jQuery, window, SapphireWidgets);
