var setupTabularScroll = function($tabularScroll) {
	var $topScrollWrapper = $tabularScroll.find('.TopScrollWrapper');
	var $centerTable = $tabularScroll.find('.TabularScroll-center-table');
	$tabularScroll.find('.TopScrollWrapper').scroll(function() {
		$centerTable.scrollLeft($topScrollWrapper.scrollLeft());
	});
	$centerTable.scroll(function() {
		$topScrollWrapper.scrollLeft($centerTable.scrollLeft());
	});
	// similar to Resize
	var tableWidth = $centerTable.find('table').width();
	$tabularScroll.find('.TabularScroll-center .TopScrollDragger').width(tableWidth);
	if ($centerTable[0].scrollWidth > $centerTable.width()) {
		$tabularScroll.find('.TopScrollWrapper').css('visibility', 'visible');
	} else {
		$tabularScroll.find('.TopScrollWrapper').css('visibility', 'hidden');
	}
};

$(function() {
	$('.TabularScroll').each(function(i, el) {
		setupTabularScroll($(el));
	});
});

$(window).load(function() {
	osAjaxBackend.BindAfterAjaxRequest(function() {
		$('.TabularScroll').each(function(i, el) {
			setupTabularScroll($(el));
		});
	});
});

$(window).resize(function() {
	$('.TabularScroll').each(function(i, el) {
		var $centerTable = $(el).find('.TabularScroll-center-table');
		var tableWidth = $centerTable.find('table').width();
		$(el)
			.find('.TabularScroll-center .TopScrollDragger')
			.width(tableWidth);
		if ($centerTable[0].scrollWidth > $centerTable.width()) {
			$(el)
				.find('.TopScrollWrapper')
				.css('visibility', 'visible');
		} else {
			$(el)
				.find('.TopScrollWrapper')
				.css('visibility', 'hidden');
		}
	});
});
