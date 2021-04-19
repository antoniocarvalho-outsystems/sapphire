/* Component PersonCard */
$(document).ready(function() {
	var PersonCardEvent = function() {
		$('.IsExpandable .PersonCard__headerLeftInfo, .IsExpandable .PersonCard__content')
			.off('click')
			.on('click', function() {
				$header = $(this).closest('.PersonCard_header');
				$content = $header.next();

				if ($content.children().length > 0) {
					//$content.slideToggle(500);
					$content.removeClass('IsExpanded');

					if ($('.PersonCard.IsOpen').length > 0) {
						$(this)
							.closest('.PersonCard')
							.removeClass('IsOpen');
					} else {
						$content.addClass('IsExpanded');

						$(this)
							.closest('.PersonCard')
							.addClass('IsOpen');
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
