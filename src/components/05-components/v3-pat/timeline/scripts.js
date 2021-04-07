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
	});
};
