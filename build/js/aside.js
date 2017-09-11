window.onload = function () {

	// ---------------------------------------------------------
	// CALENDAR
	// ---------------------------------------------------------

	var calendar = document.getElementById("calendar");
	var currentMonth = document.getElementById("current-month");
	var nextMonth = document.getElementById("next-month");
	var previousMonth = document.getElementById("previous-month");
	var today = new Date();
	var month = today.getMonth();
	var monthsArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	//shows default (current) month number value (1 to 12)
	currentMonth.innerHTML = monthsArray[month];

	function createCalendar(calendar, year, month) {
		var monthJS = month; // - 1; // months in JS 0 to 11
		var d = new Date(year, monthJS);
		var table = '<div class="calendar__table"><div class="calendar__row"></div><div class="calendar__row">';

		for (var i = 0; i < getDay(d); i++) {
			table += '<div class="calendar__cell"> </div>';
		}

		while (d.getMonth() == monthJS) {
			table += '<div class="calendar__cell">' + d.getDate() + '</div>';
			if (getDay(d) % 7 == 6) {
				// Sunday and new week
				table += '</div><div class="calendar__row">';
			}
			d.setDate(d.getDate() + 1);
		}

		if (getDay(d) != 0) {
			for (var i = getDay(d); i < 7; i++) {
				table += '<div class="calendar__cell"> </div>';
			}
		}

		table += '</div></div>'; //end of table
		document.getElementById(calendar).innerHTML = table; //assign table to div
	}

	function getDay(date) {
		// weekdays Monday (0) to Sunday (6)
		var weekDay = date.getDay();
		if (weekDay == 0) weekDay = 7;
		return weekDay - 1;
	}

	createCalendar("calendar", 2017, month);

	nextMonth.addEventListener("click", function () {
		month = ++month % 12;

		currentMonth.innerHTML = monthsArray[month];

		createCalendar("calendar", 2017, month);
	});

	previousMonth.addEventListener("click", function () {
		if (--month < 0) month = 11;

		currentMonth.innerHTML = monthsArray[month];

		createCalendar("calendar", 2017, month);
	});

	// ---------------------------------------------------------
	// TAGS
	// ---------------------------------------------------------

	var tagsArray = ["News", "Fashion", "Shoes", "Blogging", "Dresses"];

	function createTags() {
		var table = '<div class="tags__table"><div class="tags__column">';
		var x = tagsArray.length;

		for (var i = 1; i <= 12; i++) {
			table += '<div class="tags__cell">' + tagsArray[Math.floor(Math.random() * x)] + '</div>';
			if (i % 4 == 0 && i != 12) {
				table += '</div><div class="tags__column">';
			}
			if (i == 12) {
				table += '</div></div>';
			}
		}
		document.getElementById("tags").innerHTML = table; //assign table to div
	}

	createTags();
};