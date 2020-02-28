/* Component SapphirePanel */
function checkOpenPanel() {
	return (
		$('body').hasClass('SapphirePanelOpen') &&
		$('.SapphirePanel_Container:visible').length
	);
}

function toggleSapphirePanel(PanelId) {
	if (!OsValidatorOnSubmit()) {
		return;
	}

	if (!checkOpenPanel()) {
		$('body').addClass('SapphirePanelOpen');
		$('#' + PanelId).fadeIn(140);

		setTimeout(function() {
			$('#' + PanelId)
				.find('.SapphirePanel_Container')
				.slideToggle(150);
		}, 100);
	}
}

function closeSapphirePanel(PanelId) {
	$('body').removeClass('SapphirePanelOpen');
	$('#' + PanelId).fadeOut(140);

	setTimeout(function() {
		$('#' + PanelId)
			.find('.SapphirePanel_Container')
			.slideUp(150);
	}, 100);
}

function setPanelBehavior() {
	$('.Panel[panel-trigger-elementid]').each(function() {
		var this_panel = $(this);
		$('#' + this_panel.attr('panel-trigger-elementid') + '')
			.off('click')
			.on('click', function() {
				toggleSapphirePanel(this_panel.attr('id'));
				return false;
			});
	});
}

$(document).ready(function() {
	setPanelBehavior();

	if (
		osAjaxBackend.EventHandlers.AfterAjaxRequest.toString().indexOf(
			'setPanelBehavior'
		) == -1
	) {
		osAjaxBackend.BindAfterAjaxRequest(setPanelBehavior);
	}
});
