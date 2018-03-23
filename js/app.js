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
		count *= 60;
		breakTime *= 60;
		function timer() {
			//hide variables
			document.querySelectorAll('#breakDiv, #start, #minus5Clock, #add5Clock, #minus5Break, #add5Break, #breakNum, #title1, #title2').forEach(function (element) {
				element.style.display = 'none';
			});

			document.querySelector('#timeType').innerHTML = `Session Time:`;
			document.querySelector('#timeType').style.display = 'block';
			num.style.display = 'block';
			count -= 1;

			if (count === 0) {
				clearInterval(counter);
				let startBreak = setInterval(breakTimer, 1000);
				num.style.display = 'none';
				
				function breakTimer() {
					document.querySelector('#timeType').innerHTML = `Break Time:`;
					
					breakNum.style.display = 'block';
					document.querySelector('#timeType').style.display = 'block';
					breakTime -= 1;
					if (breakTime === 0) {
						clearInterval(startBreak);
						resetBtn.style.display = 'block';
						breakNum.style.display = 'none';
						document.querySelector('#timeType').style.display = 'none';
					}
					if(breakTime %60 >= 10) {
						breakNum.innerHTML = `${Math.floor(breakTime/60)}:${Math.floor(breakTime%60)}`;
					} else {
						breakNum.innerHTML = `${Math.floor(breakTime/60)}:0${Math.floor(breakTime%60)}`;
					}
					//breakNum.innerHTML = breakTime;
				}
			}
			if(count %60 >= 10) {
				num.innerHTML = `${Math.floor(count/60)}:${Math.floor(count%60)}`;
			} else {
				num.innerHTML = `${Math.floor(count/60)}:0${Math.floor(count%60)}`;
			}
			//num.innerHTML = count;
		}
	});

	resetBtn.addEventListener('click', function(){
		count = 1;
		breakTime = 1;
		num.innerHTML = count;
		breakNum.innerHTML = breakTime;
		document.querySelectorAll('#start, #minus5Clock, #add5Clock, #minus5Break, #add5Break, #num, #breakNum, #title1, #title2').forEach(function (element) {
			element.style.display = 'block';
		});
		document.querySelectorAll('#timeType, #reset').forEach(function (element) {
			element.style.display = 'none';
		});
	});

	// setting +/- 5 buttons

	document.querySelector('#minus5Clock').addEventListener('click', function () {
		if (count > 1) {
			count -= 1;
			num.innerHTML = count;
		}
	});

	document.querySelector('#add5Clock').addEventListener('click', function () {
		count += 1;
		num.innerHTML = count;
	});

	document.querySelector('#minus5Break').addEventListener('click', function () {
		if (breakTime > 1) {
			breakTime -= 1;
			breakNum.innerHTML = breakTime;
		}
	});

	document.querySelector('#add5Break').addEventListener('click', function () {
		breakTime += 1;
		breakNum.innerHTML = breakTime;
	});
});