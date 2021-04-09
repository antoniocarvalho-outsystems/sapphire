/* Timeline Helpers */
SapphireWidgets.TimelineCounterItems = function(titleItemID, label) {
	$(document).ready(function() {
		const $section = $(`#${titleItemID}`).parents('.TimelineItemSection');
		const $title = $section.find('.TimelineItemHeader a');
		const $items = $section.find('.TimelineItem');

		$title.append($(`<div class='ColorGreyText TextLarge TextRegular'> (${$items.length})</div>`));
	});
};

SapphireWidgets.ScrollToEvent = function(elementId) {
	SapphireWidgets.LayoutBase.scrollToElement($(`#${elementId}:first`, window.top.document), 52);
};

SapphireWidgets.LineTimelineComponent = function(widgetId, hasContent, isExpandable) {
	$(document).ready(function() {
		const $component = $(`#${widgetId}`);

		if (hasContent && isExpandable) {
			const $expandableLink = $component.find('.LineTimeLine__Header');
			const $actions = $component.find('.LineTimeLine__Actions');

			$expandableLink.click(() => {
				$component.toggleClass('LineTimeLine--expanded');

				return false;
			});

			$actions.click(function(e) {
				e.stopPropagation();
			});
		}

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

						if ($navItem.length) scrollToView($navItem, $(`[data-item=event-${id}] .ListRecords`));

						return false;
					}
				});
			}, 100);
		});
	});
};

/*function scrollToView(element, list) {
	let offset = element.offset().top + 174;

	const visible_area_start = $(window).scrollTop();
	var visible_area_end = visible_area_start + window.innerHeight;

	if (offset < visible_area_start || offset > visible_area_end) {
		list.animate({ scrollTop: offset - window.innerHeight / 3 }, 1000);

		return false;
	}

	return true;
}*/
