SapphireWidgets.QRCodeScanner = function() {
	Html5Qrcode.getCameras()
		.then(devices => {
			if (devices && devices.length) startCamera(devices[0].id);
		})
		.catch(err => {
			console.error(err);

			$('.LayoutScanCode__Splash').fadeOut(500);
			// App doesn't have access to the camera...
		});

	function startCamera(cameraID) {
		const html5QrCode = new Html5Qrcode('qrreader');
		const config = { fps: 5, qrbox: 250 };

		const successCallback = response => {
			if ($('.ModeNumberCode').length) return;

			console.log(response);
		};

		const errorCallback = response => {
			// ?
		};

		html5QrCode
			.start(cameraID, config, successCallback, errorCallback)
			.then(() => {
				setTimeout(() => $('.LayoutScanCode__Splash').fadeOut(500), 500);
			})
			.catch(err => {
				console.error(err);
			});
	}
};

SapphireWidgets.GoNextInput = function(field, ui) {
	const key = event.keyCode || event.charCode;
	const isNumber = !isNaN(event.key) && !isNaN(parseFloat(event.key));

	const $curr = $(field);
	const $next = $(`[ui='${ui}']`);
	const $prev = $curr.prevAll('input').first();

	if (key === 8 || key === 46) {
		$prev.focus();
		$curr.removeClass('ColorAlphaBorder');

		return;
	}

	if (isNumber) {
		$next.focus();
		$curr.addClass('ColorAlphaBorder');
	}
};
