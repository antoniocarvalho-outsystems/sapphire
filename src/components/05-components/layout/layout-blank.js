/* Component LayoutBlank */
$(function () {
	if (window.frameElement) {
		if (!!$(this.frameElement).closest('.MainInteractiveCard').length) {
			$('.LayoutBlank.Page').addClass('MainInteractiveCard');
		}
	}




	$('.CLOSE_REMOTE').on('click', function () {
		localStorage.removeItem('RemoteAppointment');
		window.opener.SapphireWidgets.LayoutBase.hideAppointmentTrigger();
		window.close();
	});

	if ($('.LayoutBlank.Page.RemoteAppointment').length > 0) {

		$(window).load(function () {
			localStorage.setItem('RemoteAppointment', 'true');
		});

		window.addEventListener('blur', function (event) {
			if (!!localStorage.getItem('RemoteAppointment')) {
				window.opener.SapphireWidgets.LayoutBase.showAppointmentTrigger();
			}
		});

		window.addEventListener('focus', function (event) {
			window.opener.SapphireWidgets.LayoutBase.hideAppointmentTrigger();
		});

		window.addEventListener('unload', function (event) {
			localStorage.removeItem('RemoteAppointment');
		});
	}

});