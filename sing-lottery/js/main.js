var $displayList = $('.display'),
	timer,
	coord = ['t', 'rt', 'lt', 'b', 'rb', 'lb', 'l', 'r'];
mode = 1;

function display(n, c, $display) {
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

function displayList(nList, c) {
	for (let i = 0; i < 5; i++) {
		display(nList[i], c, $($displayList[i]))
	}
}

const UpBound = 300;
var n = Math.floor(Math.random() * UpBound) + 1;
var nList = Array(5).fill(n);
var work, scroll;
var paused = true;
var selected = [];

function calcPrimes() {
	var c, p;
	clearInterval(work);
	if (mode == 1) {
		work = setInterval(function () {
			c = Math.floor(Math.random() * 6);

			for (let i = 0; i < 5; i++) {
				n = Math.floor(Math.random() * UpBound) + 1;
				while (selected.indexOf(n) != -1 && nList.indexOf(n) != -1) {
					n = Math.floor(Math.random() * UpBound) + 1;
				}
				nList[i] = n;
			}

			displayList(nList, c)
		}, 75);
	}
	else {
		work = setInterval(function () {
			c = Math.floor(Math.random() * 6);

			n = Math.floor(Math.random() * UpBound) + 1;
			while (selected.indexOf(n) != -1) {
				n = Math.floor(Math.random() * UpBound) + 1;
			}

			display(n, c, $($displayList[2]))
		}, 75);
	}
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
	if (code === 13) {
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
			if (mode == 1) {
				selected.push(...nList);
			}
			else {
				selected.push(n);
			}
			console.log(selected);
		}
		paused = !paused;
	}
	if (code === 32) {
		if (mode === 1) {
			mode = 2;
			$($displayList[0]).hide()
			$($displayList[1]).hide()
			$($displayList[3]).hide()
			$($displayList[4]).hide()
			$(".qrcode").show()
		}
		else {
			mode = 1;
			$($displayList[0]).show()
			$($displayList[1]).show()
			$($displayList[3]).show()
			$($displayList[4]).show()
			$(".qrcode").hide()
		}
	}
};
