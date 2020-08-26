/* Component PatientCallCancel */
(function($, window, document, SapphireWidgets) {
	const create = function(config) {
		const $widget = $('#' + config.widgetId).find('.PatientCallCancel');
		const $countdown = $widget.find('[ui=data-counter]');
		let $callButton = $widget.find('[ui=data-button-call]');
		let $cancelButton = $widget.find('[ui=data-button-cancel]');
		const $otherContent = $widget.find('.PatientCallCancel__Other');

		let interval;
		let timeCounter;
		const MODE_BOX = '1';
		const MODE_LIST = '2';

		if (config.mode === MODE_BOX) {
			$callButton = $widget.find('.PatientCallCancel__HeaderMode');
			$cancelButton = $widget.find('[ui=data-cancel-call]');
		}

		const callPatient = function($widget) {
			toggleCallingState();

			if (config.showCountdown) $countdown.text(config.txtCallingIn + ' ' + config.timeToCancel);
			else $countdown.text(config.txtCallingIn);

			startCounter();
		};

		const toggleCallingState = () => {
			$widget.toggleClass('CallingPatient');
			$countdown.text(config.txtCallPatient);
		};

		const startCounter = () => {
			timeCounter = config.timeToCancel;
			interval = window.setInterval(updateCounter, 1000);
		};

		const updateCounter = () => {
			timeCounter--;

			if (timeCounter === 0) {
				clearInterval(interval);
				OsNotifyWidget(config.patientCallFakeNotifyId, '');
			}

			if (config.showCountdown) $countdown.text(config.txtCallingIn + ' ' + timeCounter);
			else $countdown.text(config.txtCallingIn);
		};

		if (config.startCounting) callPatient($widget);

		$callButton.on('click', () => {
			if ($widget.hasClass('CallingPatient')) return;

			callPatient($widget);

			if (config.mode === MODE_LIST) {
				$callButton.hide();
				$otherContent.hide();
			} else {
				$widget.find('.PatientCallCancel__Counter').show();
			}
		});

		$cancelButton.on('click', event => {
			timeCounter = config.timeToCancel;
			$countdown.text(timeCounter);
			clearInterval(interval);

			toggleCallingState();

			if (config.mode === MODE_LIST) {
				$callButton.show();
				$otherContent.show();
			} else {
				$widget.find('.PatientCallCancel__Counter').hide();

				event.stopPropagation();
			}
		});
	};

	SapphireWidgets.PatientCallCancel = { create };
})(jQuery, window, document, SapphireWidgets);