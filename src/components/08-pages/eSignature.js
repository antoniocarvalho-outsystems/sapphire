SapphireWidgets.QRCodeScanner = function(options) {
	Html5Qrcode.getCameras()
		.then(devices => {
			if (devices && devices.length) startCamera(devices[0].id);
		})
		.catch(err => {
			// App doesn't have access to the camera...

			setTimeout(() => {
				const $checkbox = $('.AccessCodeOption');

				$checkbox.attr('checked', true).trigger('click');
				$('.LayoutScanCode').addClass('LayoutScanCode--modeOnlyCode');

				$('.LayoutScanCode__Splash').fadeOut(500);
			}, 500);
		});

	function startCamera(cameraID) {
		const html5QrCode = new Html5Qrcode('qrreader');
		const config = { fps: 5, qrbox: 250 };

		const successCallback = response => {
			if ($('.ModeAccessCode').length) return;

			$('.ScanOverlay').addClass('ScanOverlay--correctCode');

			OsNotifyWidget(options.widgetFakeNotifyId, response);

			//setTimeout(() => html5QrCode.stop(), 1000);
		};

		const errorCallback = response => {
			// console.error(response);
		};

		html5QrCode
			.start({ facingMode: 'environment' }, config, successCallback, errorCallback)
			.then(() => {
				setTimeout(() => $('.LayoutScanCode__Splash').fadeOut(500), 500);
			})
			.catch(err => {
				console.error(err);
			});
	}

	let isPortrait = window.matchMedia('(orientation: portrait)').matches;
	let isOrientarionChanged = false;

	$(window).on('orientationchange', function(event) {
		if ($('.ModeAccessCode').length) {
			isOrientarionChanged = window.matchMedia('(orientation: portrait)').matches;
			SapphireWidgets.IsOrientarionChanged = !(isPortrait ^ isOrientarionChanged);

			return;
		}

		window.location.reload();
	});
};

SapphireWidgets.OnModeChange = function() {
	$('.ScanOverlay').removeClass('ScanOverlay--correctCode');
	$('.ScanOverlay').removeClass('ScanOverlay--incorrectCode');

	if (SapphireWidgets.IsOrientarionChanged && !$('.ModeAccessCode').length) {
		window.location.reload();
	}
};

SapphireWidgets.GoNextInput = function(currentInput, nextInputClass) {
	const key = event.keyCode || event.charCode;
	const isNumber = !isNaN(event.key) && !isNaN(parseFloat(event.key));

	const $curr = $(currentInput);
	const $next = $(`.${nextInputClass}`);
	const $prev = $curr.prevAll('input').first();

	if (key === 8 || key === 46) {
		$prev.focus();
		$curr.removeClass('ColorAlphaBorder');

		return;
	}

	if (isNumber) {
		$next.focus();
		$curr.addClass('ColorAlphaBorder');
		$('.ValidateInputButton').click();
	} else event.preventDefault();
};
