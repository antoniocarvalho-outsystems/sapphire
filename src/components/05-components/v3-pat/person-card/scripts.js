/* Component PersonCard */
$(document).ready(function() {
	var PersonCardEvent = function() {
		$('.IsExpandable .PersonCard__headerLeftInfo, .IsExpandable .PersonCard__content')
			.off('click')
			.on('click', function() {
				$header = $(this).closest('.PersonCard_header');
				$content = $header.next();

				if ($content.children().length > 0) {
					const $card = $(this).closest('.PersonCard');

					$content.removeClass('IsExpanded');

					if ($card.hasClass('IsOpen')) $card.removeClass('IsOpen');
					else {
						$content.addClass('IsExpanded');

						$card.addClass('IsOpen');
					}
				}
			});
	};

	$('.StopPropagation').click(function(event) {
		event.stopPropagation();
	});

	PersonCardEvent();

	osAjaxBackend.BindAfterAjaxRequest(PersonCardEvent);
});
