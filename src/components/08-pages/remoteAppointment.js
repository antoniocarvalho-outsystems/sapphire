(function($, window, SapphireWidgets) {
	const create = () => {
		const $widget = $('.RemoteAppointment');
		const $header = $widget.find('.RemoteAppointment__Header');
		const $minimize = $header.find('.Minimize');
		const $maximize = $header.find('.Maximize');
		const $fullScreen = $header.find('.FullScreen');

		$minimize.click(() => {
			$widget.draggable({ disabled: true });
			$widget.addClass('RemoteAppointment--minimized');

			$widget.animate(minimizedPosition($header));
		});

		$maximize.click(() => {
			$widget.draggable('enable');
			$widget.removeClass('RemoteAppointment--minimized');

			$widget.animate({
				top: '50%',
				right: '50%',
				left: '50%',
				width: '30vw',
				height: '30vh',
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

		$(document).ready(function() {
			/*$widget.addClass('RemoteAppointment--minimized');

			$widget.css(minimizedPosition($header));*/

			$widget.draggable({
				containment: 'window',
				handle: $header,
				scroll: false,
				snap: true,
				iframeFix: true,
				/*stop: function(event, ui) {
					$(event.toElement).one('click', function(e) {
						e.stopImmediatePropagation();
					});
				},*/
			});
		});
	};

	const minimizedPosition = $header => {
		return {
			top: $(window).height() - $header.height() - 16,
			right: '56px',
			left: $(window).width() - 350 - 40 - 16,
			width: '350px',
			height: '50px',
		};
	};

	const resizeWhenJoin = () => {
		$('.RemoteAppointment').addClass('RemoteAppointment--callStarted');

		$('.RemoteAppointment').css({
			height: '45vh',
			width: '45vw',
		});
	};

	const setCallStarted = () => {};

	SapphireWidgets.RemoteAppointment = { create, resizeWhenJoin, setCallStarted };
})(jQuery, window, SapphireWidgets);
