$(function () {

	// TIME VARIABLES
	let timeCounter = parseInt($('#num').html()),
		timeSeconds = timeCounter * 60;
	let breakTime = parseInt($('#breakNum').html()),
		breakSeconds = breakTime * 60;

		let sessions = 0;

	//FUNCTION TO CONVERT SECONDS TO READABLE TIME

	function humanReadableTime(seconds) {
		minutes = Math.floor(seconds / 60);
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		seconds %= 60;
		if (seconds < 10) {
			seconds = `0${seconds}`;
		}
		return `${minutes}:${seconds}`;
	}

	//TIME COUNTER FUNCTION

	function counter(num, seconds, breakseconds) {
		
		let counterInterval = setInterval(function () {
			$('#titleTimer').html('Session Time');
			num.html(humanReadableTime(seconds));
			seconds -= 1;
			if (seconds < 0) {
				clearInterval(counterInterval);
				let breakInterval = setInterval(function () {
					$('#titleTimer').html('Break Time');
					num.html(humanReadableTime(breakseconds));
					breakseconds -= 1;
					if (breakseconds < 0) {
						clearInterval(breakInterval);
						showElements();
					}
				}, 100);
			}
		}, 100);
	}

	function showElements() {
		$('#start, #reset, #breakDiv, #minus5Clock, #add5Clock, #timeDiv, #minus5Break, #add5Break').show();
		$('#timer').hide();
	}

	// ADD/MINUS TIME BUTTONS

	function timeButtons() {
		$('#minus5Clock').click(function () {
			if (timeSeconds > 1) {
				timeSeconds -= 60;
				$('#num').html(humanReadableTime(timeSeconds));
			}
		});
		$('#add5Clock').click(function () {
			timeSeconds += 60;
			$('#num').html(humanReadableTime(timeSeconds));
		});

		$('#minus5Break').click(function () {
			if (breakSeconds > 1) {
				breakSeconds -= 60;
				$('#breakNum').html(humanReadableTime(breakSeconds));
			}
		});
		$('#add5Break').click(function () {
			breakSeconds += 60;
			$('#breakNum').html(humanReadableTime(breakSeconds));
		});
	}



	//UPDATING TIME ON A FIRST RUN
	$('#num').html(humanReadableTime(timeSeconds));
	$('#breakNum').html(humanReadableTime(breakSeconds));
	$('#timer').hide();

	//	SETTING PLUS/MINUS BUTTONS

	timeButtons();

	//AFTER START

	$('#start').click(function () {
		$('#start, #reset, #breakDiv, #minus5Clock, #add5Clock, #timeDiv, #minus5Break, #add5Break').hide();
		$('#timer').show();
		counter($('#timerNum'), timeSeconds, breakSeconds);
		
	});



});