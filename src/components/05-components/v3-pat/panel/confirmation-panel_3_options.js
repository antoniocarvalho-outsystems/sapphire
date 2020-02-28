/* Component ConfirmationPanel */

SapphireWidgets.ConfirmationPanel3Options =()=>{
	function isAnyPanelOpened() {
		return (
			$('body').hasClass('PanelOpened') && $('.PanelContainer:visible').length
		);
	}
	
	function togglePanel(PanelId) {
		if (!OsValidatorOnSubmit()) return;
	
		if (!isAnyPanelOpened()) {
			$('body').addClass('PanelOpened');
			$('#' + PanelId).fadeIn(140);
	
			setTimeout(function() {
				$('#' + PanelId)
					.find('.PanelContainer')
					.slideToggle(150);
			}, 100);
		}
	}
	
	function closePanel(PanelId) {
		$('body').removeClass('PanelOpened');
		$('#' + PanelId).fadeOut(140);
	
		setTimeout(function() {
			$('#' + PanelId)
				.find('.PanelContainer')
				.slideUp(150);
		}, 100);
	}
	
	function setPanelBehavior() {
		$('.Panel[panel-trigger-elementid]').each(function() {
			var this_panel = $(this);
			$('#' + this_panel.attr('panel-trigger-elementid') + '')
				.off('click')
				.on('click', function() {
					togglePanel(this_panel.attr('id'));
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
		osAjaxBackend.BindAfterAjaxRequest(	setPanelBehavior);
	}
});

}




