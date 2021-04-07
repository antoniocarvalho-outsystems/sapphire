/* Timeline Helpers */
SapphireWidgets.TimelineCounterItems = function(titleItemID, label) {
	$(document).ready(function() {
		const $section = $(`#${titleItemID}`).parents('.TimelineItemSection');
		const $title = $section.find('.TimelineItemHeader a');
		const $items = $section.find('.TimelineItem');

		$title.append($(`<div class='ColorGreyText TextLarge TextRegular'> (${$items.length} ${label})</div>`));
	});
};

SapphireWidgets.LineTimelineComponent = function(widgetId) {
	$(document).ready(function() {
		const $component = $(`#${widgetId}`);
		const $expandableLink = $component.find('.LineTimeLine__Expandable');

		$expandableLink.click(() => {
			$component.toggleClass('LineTimeLine--expanded');

			return false;
		});

		$(window).on('scroll', function() {
			clearTimeout(window.scrollFinished);
			window.scrollFinished = setTimeout(function() {
				let id = 0;

				$('.TimelineAnchor').each(function(index) {
					if ($(window).scrollTop() + 190 >= $(this).offset().top) {
						id = $(this).attr('id');

						if (index == $('.TimelineAnchor').length - 1) {
							const $navItem = $(`[data-item=event-${id}] .TimelineItem`);

							$('.TimelineItem.TimelineItem--active').removeClass('TimelineItem--active');
							$navItem.addClass('TimelineItem--active');
						}
					} else {
						const $navItem = $(`[data-item=event-${id}] .TimelineItem`);

						$('.TimelineItem.TimelineItem--active').removeClass('TimelineItem--active');
						$navItem.addClass('TimelineItem--active');

						return false;
					}
				});
			}, 150);
		});
	});
};
