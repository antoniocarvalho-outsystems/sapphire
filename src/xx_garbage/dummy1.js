let targetElementOffsetTop = $targetElement.offset().top;

if (!!$('.LayoutBase-emergency').text()) {
	if ($('.LayoutBase-secondary').hasClass('isFixed')) {
		targetElementOffsetTop += 150;
	} else {
		targetElementOffsetTop += 80;
	}
	targetElementOffsetTop -= 390;
} else {
	if ($('.LayoutBase-secondary').hasClass('isFixed')) {
		targetElementOffsetTop -= 180;
	} else {
		targetElementOffsetTop -= 260;
	}
}

$('html, body').scrollTop(targetElementOffsetTop);
