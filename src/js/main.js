// ---------------------------------------------------------
//VIDEO PLAYER
// ---------------------------------------------------------

var myVideo = document.getElementById("video-player");
var videoContainer = document.getElementById("video-container");
var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");
var playBigButton = document.getElementById("big-play-button");
var forwardButton = document.getElementById("forward");
var muteButton = document.getElementById("mute");
var speakerButton = document.getElementById("speaker");
var fullScreenButton = document.getElementById("fullscreen");
var playedBar = document.getElementById("played-bar");
var progressBar = document.getElementById("progress-bar");
var volumeBar = document.getElementById("volume-bar");
var myCurrentTime = document.getElementById("current-time");
var myVideoDuration = document.getElementById("video-duration");


document.getElementById("play").addEventListener("click", function() {
	myVideo.play();
	playBigButton.style.visibility = "hidden";
	pauseButton.style.display = "inline-block";
	playButton.style.display = "none";
});


pauseButton.addEventListener("click", function() {
	myVideo.pause();
	playBigButton.style.visibility = "visible";
	pauseButton.style.display = "none";
	playButton.style.display = "inline-block";
});


playBigButton.addEventListener("click", function() {
	myVideo.play();
	playBigButton.style.visibility = "hidden";
	pauseButton.style.display = "inline-block";
	playButton.style.display = "none";
});


forwardButton.addEventListener("click", function() {
	if (myVideo.playbackRate == 5.0) {
		myVideo.playbackRate = 1.0;
	} else {
		myVideo.playbackRate = 5.0;
	}
});


var progressBarWidth = parseInt(window.getComputedStyle(document.getElementById("progress-bar"), null).getPropertyValue("width"));
myVideo.addEventListener("timeupdate", function() {
	if (myVideo.played) {
		var size = myVideo.currentTime * progressBarWidth / myVideo.duration;
		playedBar.style.width = size + "px";
	} else {
		playedBar.style.width = "0px";
	}
});


myVideo.addEventListener ("timeupdate", function () {
	function clock (seconds) {
		var s = Math.round(seconds % 60);
		s = s < 10 ? "0" + s : s;
		var m = Math.floor(seconds / 60) % 60;
		m = m < 10 ? "0" + m : m;
		return (m + ":" + s);
	}
	myCurrentTime.innerHTML = clock(myVideo.currentTime);
	myVideoDuration.innerHTML = clock(myVideo.duration);
});


progressBar.addEventListener("click", function (e) {
	if(!myVideo.paused && !myVideo.ended){
		var mouseX = e.pageX - progressBar.offsetLeft;
		var newtime = mouseX * myVideo.duration / progressBarWidth;
		myVideo.currentTime = newtime;
		playedBar.style.width= mouseX + "px";
	}
});


volumeBar.addEventListener("change", function() {
	myVideo.volume = volumeBar.value;
});


muteButton.addEventListener("click", function() {
	myVideo.muted = true;
	speakerButton.style.display = "inline-block";
	muteButton.style.display = "none";
});

speakerButton.addEventListener("click", function() {
	myVideo.muted = false;
	speakerButton.style.display = "none";
	muteButton.style.display = "inline-block";
});


fullScreenButton.addEventListener("click", function() {
	myVideo.webkitRequestFullscreen();
});


// ---------------------------------------------------------
// AUDIO PLAYER
// ---------------------------------------------------------

var myAudio = document.getElementById("audio-player");
var audioPlayButton = document.getElementById("audio-play");
var audioMuteButton = document.getElementById("audio-mute");
var audioPlayedBar = document.getElementById("audio-played-bar");
var audioSlider = document.getElementById("audio-slider");
var audioProgressBar = document.getElementById("audio-progress-bar");
	
audioPlayButton.addEventListener("click", function() {
	if (myAudio.paused === true ) {
		myAudio.play();
		audioPlayButton.style.backgroundImage = "url(img/icons/pause.png)";
	} else {
		myAudio.pause();
		audioPlayButton.style.backgroundImage = "url(img/icons/play.png)";
	}
});


var audioProgressBarWidth = parseInt(window.getComputedStyle(document.getElementById("audio-progress-bar"), null).getPropertyValue("width"));
myAudio.addEventListener("timeupdate", function() {
	if (myAudio.played) {
		var size = myAudio.currentTime * (audioProgressBarWidth - 12) / myAudio.duration;
		audioPlayedBar.style.width = 12 + size + "px";
		audioSlider.style.left = size + "px";
	} else {
		audioPlayedBar.style.width = "0px";
		audioSlider.style.left = "0px";
	}
});


audioProgressBar.addEventListener("click", function (e) {
	if(!myAudio.paused && !myAudio.ended){
		var mouseX = e.pageX - audioProgressBar.offsetLeft;
		var newtime = mouseX * myAudio.duration / audioProgressBarWidth;
		myAudio.currentTime = newtime;
		audioPlayedBar.style.width = mouseX + "px";
	}
});

audioMuteButton.addEventListener("click", function() {
	if (myAudio.muted === false) {
		myAudio.muted = true;
		audioMuteButton.style.backgroundImage = "url(img/icons/mute.png)";
	} else {
		myAudio.muted = false;
		audioMuteButton.style.backgroundImage = "url(img/icons/speaker.png)";
	}
});

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
	var monthJS = month;// - 1; // months in JS 0 to 11
	var d = new Date(year, monthJS);
	var table = '<div class="calendar__table"><div class="calendar__row">';

	for (var i = 0; i < getDay(d); i++) {
		table += '<div class="calendar__cell"> </div>';
	}

		while (d.getMonth() == monthJS) {
		table += '<div class="calendar__cell">' + d.getDate() + '</div>';
			if (getDay(d) % 7 == 6) { // Sunday and new week
      			table += '</div><div class="calendar__row">';
    		}
    	d.setDate(d.getDate() + 1);
	}

	if (getDay(d) !== 0) {
		for (; i < 7; i++) {
			table += '<div class="calendar__cell"> </div>';
		}
	}

    table += '</div></div>'; //end of table
	document.getElementById(calendar).innerHTML = table; //assign table to div
	}

	function getDay(date) { // weekdays Monday (0) to Sunday (6)
	var weekDay = date.getDay();
		if (weekDay === 0) weekDay = 7;
		return weekDay - 1;
	}

createCalendar("calendar", 2017, month);

	nextMonth.addEventListener("click", function() {
		month = ++month % 12;
	
	currentMonth.innerHTML = monthsArray[month];
	
	createCalendar("calendar", 2017, month);
});

	previousMonth.addEventListener("click", function() {
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
		table += '<div class="tags__cell">' + tagsArray[Math.floor(Math.random()*x)] + '</div>';
		if (i%4 === 0 && i != 12) {
			table += '</div><div class="tags__column">';
		}
		if (i==12) {
			table += '</div></div>';
		}
	}
document.getElementById("tags").innerHTML = table; //assign table to div
}

	createTags();


