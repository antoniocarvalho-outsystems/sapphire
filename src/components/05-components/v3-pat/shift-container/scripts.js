/* Component ShiftContainer */
function ShiftContainer(shiftContainerId) {
	$(function() {
		$('.ShiftCard_timeLine').css('visibility', 'hidden');
		$('.ShiftExpandable_container .ActionsMenu ').css('display', 'none');
		var shiftTimelineResizeTimer;

		var $shiftContainerId = $(shiftContainerId);

		var hasScrollBar = function() {
			var $ScrollableDiv = $shiftContainerId.find('.ShiftExpandable_container');
			if ($shiftContainerId.find('.ShiftExpandable_container').length > 0) {
				if ($ScrollableDiv.get(0).scrollHeight > $ScrollableDiv.height()) {
					var $lastCell = $shiftContainerId.find('.IsTimer:last-child');
					$lastCell.css('padding-right', '7px');
				}
			}
		};

		var redrawShiftTimeline = function() {
			clearTimeout(shiftTimelineResizeTimer);
			shiftTimelineResizeTimer = setTimeout(function() {
				hasScrollBar();
				handleShiftTable();
			}, 400);
		};

		var handleShiftTable = function() {
			$('.ShiftExpandable').each(function(index, el) {
				var $elFlag = $(this)
					.parent()
					.find('.FlagLine');
				var $elFlagTime = $(this)
					.parent()
					.find('.FlagLine_time');
				var $columnFlag = $elFlag.data('column');
				var $minutesFlag = $elFlag.data('minutes');
				var $slots = $(this)
					.closest('.ShiftContainer')
					.find('.ShiftContainer_header')
					.find('.ShiftCellContent');
				var $slotWidth = Math.round($slots.eq(0).width());
				var minutesPosition = ($minutesFlag * $slotWidth) / 60;

				// handle current time flog horizontal positioning
				var slotsPosition = [];
				$slots.each(function(index, el) {
					slotsPosition.push($(this).position().left);
				});
				$elFlag.css('left', slotsPosition[$columnFlag - 1] + minutesPosition);
				$elFlag.css('display', 'block');
				if ($columnFlag === $slots.length) {
					$elFlagTime.css({
						right: '1px',
						left: 'auto',
					});
				}

				// handle cells that might span over several slots
				$(this)
					.find('.ShiftCard')
					.each(function(index, elRow) {
						var rowHasSpannedCell = false;
						$(elRow)
							.find('.ShiftCellContent')
							.each(function(index, elCell) {
								var colspan = $(elCell).data('colspan');
								if (colspan === slotsPosition.length || rowHasSpannedCell) {
									$(elCell).css({
										display: 'inline-block',
										flex: '1 1 auto',
									});
								} else if (colspan > 1) {
									rowHasSpannedCell = true;
									$(elCell).css({
										display: 'inline-block',
										flex: 'none',
										width: +(slotsPosition[colspan] - slotsPosition[0]) + 'px',
									});
								}
							});
					});

				// handle horizontal scroll behavior
				if (el.scrollWidth > el.clientWidth) {
					$(el).width(el.scrollWidth);
					$(this)
						.closest('.ShiftContainer')
						.find('.ShiftContainer_header')
						.width(el.scrollWidth);
				} else {
					$(el).width('auto');
					$(this)
						.closest('.ShiftContainer')
						.find('.ShiftContainer_header')
						.width('auto');
				}
			});
		};
		hasScrollBar();
		handleShiftTable();

		SapphireWidgets.ShiftTimeline = {
			redrawShiftTimeline: redrawShiftTimeline,
			hasScrollBar: hasScrollBar,
			handleShiftTable: handleShiftTable,
		};

		setTimeout(function() {
			$('.ShiftCard_timeLine').css('visibility', 'visible');
			$('.ShiftExpandable_container .ActionsMenu ').css('display', 'block');
		}, 1500);

		$('.ShiftExpandable__arrow')
			.off('mousedown')
			.on('mousedown', function() {
				setTimeout(function() {
					SapphireWidgets.ShiftTimeline.redrawShiftTimeline();
				}, 1500);
			});
	});
}

function checkScrollBar() {
	var hContent = $('.Content').height();
	var hWindow = $(window).height();

	if (hContent > hWindow) {
		SapphireWidgets.ShiftTimeline.redrawShiftTimeline();
	} else {
	}
}

$(window).on('resize', function() {
	$('.ShiftCard_timeLine').css('visibility', 'hidden');
	$('.ShiftExpandable_container .ActionsMenu').css('display', 'none');

	SapphireWidgets.ShiftTimeline.redrawShiftTimeline();
	osAjaxBackend.BindAfterAjaxRequest(
		SapphireWidgets.ShiftTimeline.redrawShiftTimeline
	);
	setTimeout(checkScrollBar, 1000);

	setTimeout(function() {
		$('.ShiftCard_timeLine').css('visibility', 'visible');
		$('.ShiftExpandable_container .ActionsMenu').css('display', 'block');
	}, 1500);
});

$(window).load(function() {
	$('.ShiftCard_timeLine').css('visibility', 'hidden');
	$('.ShiftExpandable_container .ActionsMenu').css('display', 'none');
	setTimeout(function() {
		SapphireWidgets.ShiftTimeline.redrawShiftTimeline();
	}, 1000);
	setTimeout(checkScrollBar, 1000);
	setTimeout(function() {
		$('.ShiftCard_timeLine').css('visibility', 'visible');
		$('.ShiftExpandable_container .ActionsMenu').css('display', 'block');
	}, 15000);

	osAjaxBackend.BindAfterAjaxRequest(function() {
		$('.navigation-control-item').click(function() {
			$('.ShiftCard_timeLine').css('visibility', 'hidden');
			$('.ShiftExpandable_container .ActionsMenu').css('display', 'none');
			setTimeout(function() {
				SapphireWidgets.ShiftTimeline.redrawShiftTimeline();
			}, 1000);
			setTimeout(checkScrollBar, 1500);
			setTimeout(function() {
				$('.ShiftCard_timeLine').css('visibility', 'visible');
				$('.ShiftExpandable_container .ActionsMenu').css('display', 'block');
			}, 1500);
			SapphireWidgets.ShiftTimeline.redrawShiftTimeline;
		});
	});

	//Verify the scroll if tooltip opened
	$('.ShiftExpandable_container').on('scroll', function() {
		if ($('.tooltipster-base').is(':visible')) {
			$('.tooltipster-base').css('visibility', 'hidden');
		}
	});
});
