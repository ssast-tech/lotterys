var $display = $('.display'),
	timer,
	coord = ['t', 'rt', 'lt', 'b', 'rb', 'lb', 'l', 'r'];


function display(n, c) {
	var $temp, pos;
	if (n) {
		$display.text(n);
		// console.log(arguments);

		pos = Math.floor(Math.random() * coord.length);

		$temp = $display
			.clone()
			.addClass('prime c' + c)
			.insertAfter($display);

		setTimeout(function () {
			$temp.addClass('out').addClass(coord[pos]);
		}, 10);

		setTimeout(function () {
			$temp.remove();
		}, 1200);
	}
}

const UpBound = 450;
var n = Math.floor(Math.random() * UpBound) + 1;
var work, scroll;
var paused = true;
var selected = [];

function calcPrimes() {
	var c, p;
	clearInterval(work);
	work = setInterval(function () {
		c = Math.floor(Math.random() * 6);

		n = Math.floor(Math.random() * UpBound) + 1;
		while (selected.indexOf(n) != -1) {
			n = Math.floor(Math.random() * UpBound) + 1;
		}
		
		display(n, c);
	}, 75);
}

function pauseWork() {
	clearInterval(work);
}

function scrollWindow() {
	// scroll = setInterval(function () {
	// 	$('body').animate(
	// 		{
	// 			scrollTop: $('body').height() - 80,
	// 		},
	// 		200
	// 	);
	// }, 2000);
}

function pauseScroll() {
	clearInterval(scroll);
}

document.onkeyup = function (e) {
	var code = e.charCode || e.keyCode;
	if (code == 13) {
		if (paused) {
			if (selected.length == UpBound) {
				alert('所有编号都已选出过，请刷新页面重新开始！');
				return;
			}
			scrollWindow();
			calcPrimes();
		} else {
			pauseScroll();
			pauseWork();
			selected.push(n);
		}
		paused = !paused;
	}
};
