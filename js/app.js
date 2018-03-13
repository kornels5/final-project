document.addEventListener("DOMContentLoaded", function() {

	let num = document.querySelector('#num');
	let breakNum = document.querySelector('#breakNum');

	let count = parseInt(num.innerHTML);
	let breakTime = parseInt(breakNum.innerHTML);
	
	let resetBtn = document.querySelector('#reset');
	resetBtn.style.display = 'none';

	// setting +/- 5 buttons

	document.querySelector('#minus5Clock').addEventListener('click', function () { 
		if(count > 5) {
			count -= 5;
			num.innerHTML = count;
		}
	});

	document.querySelector('#add5Clock').addEventListener('click', function () { 
		count += 5;
		num.innerHTML = count;
	});

	document.querySelector('#minus5Break').addEventListener('click', function () { 
		if(breakTime > 5) {
			breakTime -= 5;
			breakNum.innerHTML = breakTime;
		}
	});

	document.querySelector('#add5Break').addEventListener('click', function () { 
		breakTime += 5;
		breakNum.innerHTML = breakTime;
	});


});