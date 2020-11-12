SapphireWidgets.ActionsSubMenu = function() {
	Html5Qrcode.getCameras()
		.then(devices => {
			if (devices && devices.length) startCamera(devices[0].id);
		})
		.catch(err => {
			console.error(err);
		});

	function startCamera(cameraID) {
		const html5QrCode = new Html5Qrcode('qrreader');

		html5QrCode
			.start(
				cameraID,
				{ fps: 5, qrbox: 250 },
				qrCodeMessage => {
					console.log('sucess');
				},
				errorMessage => {
					// parse error, ignore it.
				}
			)
			.catch(err => {
				console.error(err);
			});
	}
};
