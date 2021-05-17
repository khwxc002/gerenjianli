var table = document.getElementById('scrollBox');

// console.log(table)

table.innerHTML += table.innerHTML;

table.scrollTop = 0;

var Height = 24;
var datimes = 60;
var datimer;

function scrollMoves() {
	table.scrollTop++;
	datimer = setInterval("scrollUps()", datimes);
}

function scrollUps() {
	if (table.scrollTop % Height == 0) {
		
		clearInterval(datimer);
		
		setTimeout("scrollMoves()", 0);
		
	} else {
		table.scrollTop++;
		if (table.scrollTop >= table.scrollHeight / 2) {
			table.scrollTop = 0;
		}
	}
}
setTimeout("scrollMoves()", 1000);
