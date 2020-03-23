function DosageBlock(config) {
  $(function () {
    var dosageBlockId = config.DosageBlockId;
    var $dosageBlock = $('#' + dosageBlockId);
    var startCol = config.StartCol;
    var endCol = config.EndCol;
    var $allTimeSlots = $('.ShiftContainer').find('.ShiftContainer_header').find('.ShiftCellContent');
    var numberTimeSlots = $allTimeSlots[1].getBoundingClientRect().width;
    var colFill = parseInt(endCol) - parseInt(startCol) + 1;
    var minuteValueWidth = numberTimeSlots / 60;
    var i;
    var totalLeft = 0;


    for (i = 1; i < parseInt(startCol); i++) {
      totalLeft += $allTimeSlots[i].getBoundingClientRect().width;
    }

    $dosageBlock.width(colFill * numberTimeSlots);
    if ($('.Page').hasClass('AR') || $('.Page').hasClass('FA')) {
      $dosageBlock.css('right', totalLeft + 'px');
    } else {
      $dosageBlock.css('left', totalLeft + 'px');
    }

    var checkForOverlap = function (el1, el2) {
      var bounds1 = el1.getBoundingClientRect();
      var bounds2 = el2.getBoundingClientRect();
      var firstIstLeftmost = (bounds1.left <= bounds2.left);
      var leftest = firstIstLeftmost ? bounds1 : bounds2;
      var rightest = firstIstLeftmost ? bounds2 : bounds1;

      //change > to to >= if border overlap should count
      if (leftest.right > rightest.left) {
        var firstIsTopmost = (bounds1.top <= bounds2.top);
        var topest = firstIsTopmost ? bounds1 : bounds2;
        var bottomest = firstIsTopmost ? bounds2 : bounds1;
        //change > to >= if border should count 
        return topest.bottom > bottomest.top;
      } else return false;
    }


    var $shiftCardLine = $dosageBlock.closest('.ShiftCard_timeLine');
    var CardShiftCount = $shiftCardLine.find('.CardShiftWrapperContainer').length;

    if (CardShiftCount > 0) {
      var count = 0;
      $shiftCardLine.find('.CardShiftWrapperContainer').each(function () {
        var $this = $(this);
        var $shiftCard = $this.closest('.ShiftCard_timeLine');
        var overlaped = checkForOverlap($dosageBlock[0], $this[0]);
        var createdId = $dosageBlock.attr('id');
        var LoopedId = $this.attr('id');
        if (overlaped === true && count < $shiftCardLine.find('.TakeSlot').length) {
          $dosageBlock.css('top', $this[0].offsetTop + $dosageBlock.height());
        }
        count = count++;
      });
      $('.ShiftCard_timeLine .TakeSlot').each(function () {
        var $this = $(this);
        var $shiftCard = $this.closest('.ShiftCard_timeLine');
        var overlaped = checkForOverlap($dosageBlock[0], $this[0]);
        var createdId = $dosageBlock.attr('id');
        var LoopedId = $this.attr('id');
        var $firstSlotCreated = $('.ShiftCard_timeLine .TakeSlot')[0];
        if (overlaped === true && createdId != LoopedId && createdId != $firstSlotCreated.id) {
          $dosageBlock.css('top', $this[0].offsetTop + 130);
        }
      });
      $shiftCardLine.height($shiftCardLine.find('.TakeSlot').last().position().top + 130);
    } else {
      $('.ShiftCard_timeLine .TakeSlot').each(function () {
        var $this = $(this);
        var $shiftCard = $this.closest('.ShiftCard_timeLine');
        var overlaped = checkForOverlap($dosageBlock[0], $this[0]);
        var createdId = $dosageBlock.attr('id');
        var LoopedId = $this.attr('id');
        var $firstSlotCreated = $('.ShiftCard_timeLine .TakeSlot')[0];
        if (overlaped === true && createdId != LoopedId && createdId != $firstSlotCreated.id) {
          $dosageBlock.css('top', $dosageBlock[0].offsetTop + 130 + 'px');
          $shiftCard.height($shiftCard.height() + $this[0].offsetHeight);
        }
      });
    }

    $dosageBlock.find('.ProgressBarWrap').each(function (index) {
      var beginslot = $(this).data('beginslot');
      var beginminute = $(this).data('beginminute');
      var endslot = $(this).data('endslot');
      var endminute = $(this).data('endminute');

      var progressBarMinutes = ((endslot - beginslot) * 60) + endminute - beginminute;
      var progressendWithPer = progressBarMinutes * minuteValueWidth;

      $(this).css('left', (((beginslot - 1) * 60) + beginminute) * minuteValueWidth + 'px');
      $(this).css('width', progressendWithPer + 'px');
    });

  });
}