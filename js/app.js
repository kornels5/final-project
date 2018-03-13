document.addEventListener("DOMContentLoaded", function () {

	let num = document.querySelector('#num');
	let breakNum = document.querySelector('#breakNum');

	let count = parseInt(num.innerHTML);
	let breakTime = parseInt(breakNum.innerHTML);

	let startBtn = document.querySelector('#start');

	let resetBtn = document.querySelector('#reset');
	resetBtn.style.display = 'none';

	startBtn.addEventListener('click', function () {
		let counter = setInterval(timer, 1000);

		function timer() {

			//hide variables
			document.querySelectorAll('#start, #minus5Clock, #add5Clock, #minus5Break, #add5Break, #breakNum, #title1, #title2').forEach(function (element) {
				element.style.display = 'none';
			});

			document.querySelector('#timeType').innerHTML = `Session Time:`;

			count -= 1;
			if (count === 0) {
				clearInterval(counter);
				let startBreak = setInterval(breakTimer, 1000);
				document.querySelector('#num').style.display = 'none';

				function breakTimer() {
					document.querySelector('#timeType').innerHTML = `Break Time:`;
					document.querySelector('#breakNum').style.display = 'block';
					breakTime -= 1;
					if (breakTime === 0) {
						clearInterval(startBreak);
					}
					document.querySelector('#breakNum').innerHTML = breakTime;
				}
			}
			num.innerHTML = count;
		}
	});

	// setting +/- 5 buttons

	document.querySelector('#minus5Clock').addEventListener('click', function () {
		if (count > 5) {
			count -= 5;
			num.innerHTML = count;
		}
	});

	document.querySelector('#add5Clock').addEventListener('click', function () {
		count += 5;
		num.innerHTML = count;
	});

	document.querySelector('#minus5Break').addEventListener('click', function () {
		if (breakTime > 5) {
			breakTime -= 5;
			breakNum.innerHTML = breakTime;
		}
	});

	document.querySelector('#add5Break').addEventListener('click', function () {
		breakTime += 5;
		breakNum.innerHTML = breakTime;
	});


});