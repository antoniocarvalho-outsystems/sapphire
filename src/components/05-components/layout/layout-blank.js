/* Component LayoutBlank */
$(function () {
	if (window.frameElement) {
		if (!!$(this.frameElement).closest('.MainInteractiveCard').length) {
			$('.LayoutBlank.Page').addClass('MainInteractiveCard');
		}
	}

	$('.CLOSE_REMOTE').on('click', function () {
		localStorage.removeItem('RemoteAppointment');
		window.close();
	});

	if ($('.LayoutBlank.Page.RemoteAppointment').length > 0) {
		window.addEventListener('unload', function (event) {
			localStorage.removeItem('RemoteAppointment');
		});
	}

});