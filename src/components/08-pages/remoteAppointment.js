(function($, window, SapphireWidgets) {
	const create = () => {
		const $widget = $('.RemoteAppointment');
		const $header = $widget.find('.RemoteAppointment__Header');
		const $minimize = $header.find('.Minimize');
		const $smallSize = $header.find('.Small');
		const $mediumSize = $header.find('.Medium');
		const $fullScreen = $header.find('.FullScreen');
		const $restoreWindow = $widget.find('.RemoteAppointment__RestoreWindow');

		let isPreviousSmall = $smallSize.is(':visible');

		$minimize.click(() => {
			isPreviousSmall = $mediumSize.is(':visible');

			//$widget.draggable({ disabled: true });

			$widget.addClass('RemoteAppointment--minimized');
			$minimize.hide();
			$mediumSize.show();

			$widget.animate(minimizedPosition($header));
		});

		$smallSize.click(() => {
			$widget.removeClass('RemoteAppointment--minimized');
			$minimize.show();
			$smallSize.hide();
			$mediumSize.show();

			$widget.animate({
				top: '50%',
				right: '50%',
				left: '50%',
				width: '280px',
				height: '380px',
			});
		});

		$mediumSize.click(() => {
			const isCallStarted = $widget.hasClass('RemoteAppointment--callStarted');

			//$widget.draggable('enable');

			$widget.removeClass('RemoteAppointment--minimized');
			$minimize.show();
			$mediumSize.hide();
			if (isCallStarted) $smallSize.show();

			$widget.animate({
				top: '50%',
				right: '50%',
				left: '50%',
				width: isCallStarted ? '45vw' : '450px',
				height: isCallStarted ? '45vh' : '260px',
			});
		});

		$fullScreen.click(() => {
			const iframe = document.querySelector('.RemoteAppointment iframe');

			if (iframe.requestFullscreen) {
				iframe.requestFullscreen();
			} else if (iframe.webkitRequestFullscreen) {
				iframe.webkitRequestFullscreen();
			}
		});

		$restoreWindow.click(() => {
			if (isPreviousSmall) $smallSize.click();
			else $mediumSize.click();
		});

		$(document).ready(function() {
			$widget.draggable({
				containment: 'window',
				handle: $header,
				scroll: false,
				snap: true,
				iframeFix: true,
			});
		});
	};

	const minimizedPosition = $header => {
		return {
			top: $(window).height() - $header.height() - 16,
			right: '76px',
			left: $(window).width() - 280 - 60 - 16,
			width: '275px',
			height: '50px',
		};
	};

	const resizeWhenJoin = () => {
		const $widget = $('.RemoteAppointment');
		const $smallSize = $widget.find('.Small');

		$smallSize.show();
		$widget.addClass('RemoteAppointment--callStarted');

		$widget.css({
			height: '45vh',
			width: '45vw',
		});
	};

	const setInitialState = () => {
		const $widget = $('.RemoteAppointment');
		const $smallSize = $widget.find('.Small');
		const $mediumSize = $widget.find('.Medium');

		$smallSize.hide();
		$mediumSize.hide();
		$widget.removeClass('RemoteAppointment--callStarted');

		$('.RemoteAppointment').css({
			right: '22%',
			top: '30%',
			height: '260px',
			width: '450px',
		});
	};

	const setCallStarted = () => {};

	SapphireWidgets.RemoteAppointment = { create, resizeWhenJoin, setCallStarted, setInitialState };
})(jQuery, window, SapphireWidgets);
