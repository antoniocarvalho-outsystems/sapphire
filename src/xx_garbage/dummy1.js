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
			{
				fps: 10, // Optional frame per seconds for qr code scanning
				qrbox: 250, // Optional if you want bounded box UI
			},
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
