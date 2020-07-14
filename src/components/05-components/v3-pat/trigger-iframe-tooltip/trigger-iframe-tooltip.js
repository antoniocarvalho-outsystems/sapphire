/* Component TriggerIframeTooltip */
(function ($, window, document, SapphireWidgets) {
	var create = function (config) {

		var $elementId = $('#' + config.elementId);

		$elementId.addClass('tooltip');

		if (config.triggerId === 'click') $elementId.addClass('tooltipstered--pointer');

		var extraDataParams = 'data-iframetooltiptriggerid="' + config.elementId + '"';
		var widgetNotifyDiv = $.find('[data-iframetooltiptriggerid="' + config.elementId + '"]');
		if (widgetNotifyDiv.length === 1) {
			extraDataParams += ' data-iframetooltipnotifyid=' + $(widgetNotifyDiv).data('iframetooltipnotifyid');
		}

		$elementId.tooltipster({
			contentAsHTML: true,
			theme: config.theme,
			interactive: true,
			position: config.positionId,
			trigger: config.triggerId,
			minWidth: config.minWidth,
			maxWidth: config.maxWidth,
			zindex: config.zindex,
			content: '<iframe id="tooltipster-frame" data-ui="iframe-tooltip" src="' + config.URL + '" style="border:none" ' + extraDataParams + '></iframe>',
			functionReady: function (instance, helper) {
				$(helper).css({
					visibility: 'hidden',
				});
				setTimeout(function () {
					$('.tooltipster-base').css({
						visibility: 'visible',
						"minHeight": config.minHeight > 0 ? config.minHeight : 'auto',
					});
				}, 500);
			},
		});
	};

	SapphireWidgets.TriggerIframeTooltip = {
		create,
	};

})(jQuery, window, document, SapphireWidgets);