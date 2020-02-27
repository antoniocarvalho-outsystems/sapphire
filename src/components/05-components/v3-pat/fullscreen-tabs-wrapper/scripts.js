/* Component FullScreenTabsWrapper */
$(document).ready(function() {
	$('.TabWrapper').click(function() {
		$(this)
			.siblings()
			.removeClass('Active');
		$(this).addClass('Active');
	});
});
