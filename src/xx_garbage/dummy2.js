var spinnerList = {
	increment: function(elementId, listTospin, triggerOnChange, triggerOnInput) {
		var $myspinner = $(elementId);
		var $myInput = $myspinner.find('input[type]');
		var arraytospin = listTospin;
		var currentPosition = arraytospin.indexOf(parseInt($myspinner.find('input').val()));
		var maximumToSpin = arraytospin.lastIndexOf(arraytospin.slice(-1)[0]);

		$(elementId)
			.find('.PlusVertical')
			.removeClass('DisabledSpin');
		$(elementId)
			.find('.MinusVertical')
			.removeClass('DisabledSpin');

		if (maximumToSpin - 1 === currentPosition) {
			currentPosition = currentPosition + 1;
			$myspinner.find('input').val(arraytospin[currentPosition]);
			if (triggerOnChange) {
				$myInput.trigger('change');
			}
			if (triggerOnInput) {
				$myInput.trigger('input');
			}
		} else if (maximumToSpin === currentPosition) {
			currentPosition = currentPosition % maximumToSpin;
			$myspinner.find('input').val(arraytospin[currentPosition]);
			if (triggerOnChange) {
				$myInput.trigger('change');
			}
			if (triggerOnInput) {
				$myInput.trigger('input');
			}
		} else {
			currentPosition = (currentPosition + 1) % maximumToSpin;
			$myspinner.find('input').val(arraytospin[currentPosition]);
			if (triggerOnChange) {
				$myInput.trigger('change');
			}
			if (triggerOnInput) {
				$myInput.trigger('input');
			}
		}

		if (currentPosition === maximumToSpin) {
			$(elementId)
				.find('.PlusVertical')
				.addClass('DisabledSpin');
		}

		if (currentPosition === 0) {
			$(elementId)
				.find('.MinusVertical')
				.addClass('DisabledSpin');
		}

		$myspinner.find('.Text_red').css('display', 'none');
	},

	decrement: function(elementId, listTospin, triggerOnChange, triggerOnInput) {
		var $myspinner = $(elementId);
		var $myInput = $myspinner.find('input[type]');
		var arraytospin = listTospin;
		var currentPosition = arraytospin.indexOf(parseInt($myspinner.find('input').val()));
		var maximumToSpin = arraytospin.lastIndexOf(arraytospin.slice(-1)[0]);

		currentPosition = (maximumToSpin + currentPosition - 1) % maximumToSpin;

		$(elementId)
			.find('.PlusVertical')
			.removeClass('DisabledSpin');

		if (currentPosition == 0) {
			$(elementId)
				.find('.MinusVertical')
				.addClass('DisabledSpin');
			$myspinner.find('input').val(arraytospin[0]);
			if (triggerOnChange) {
				$myInput.trigger('change');
			}
			if (triggerOnInput) {
				$myInput.trigger('input');
			}
		} else {
			$(elementId)
				.find('.MinusVertical')
				.removeClass('DisabledSpin');
			$myspinner.find('input').val(arraytospin[currentPosition]);
			if (triggerOnChange) {
				$myInput.trigger('change');
			}
			if (triggerOnInput) {
				$myInput.trigger('input');
			}
		}

		$myspinner.find('.Text_red').css('display', 'none');
	},
};
