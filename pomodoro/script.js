//! Setting Global Variables
const timer = document.getElementById("timer");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const start = document.getElementById("start");
const roundCount = document.getElementById("roundCount");
const reset = document.getElementById("reset");
const toggleSwitch = document.getElementById("darkmode");
var wstatus = document.getElementById("status");
var interval = null;
var mm = 25;
var ss = 00;
var counter = 1;
var degree = null;
var totalTime = 0;
var root = document.documentElement;
var roundNum = 1;
var progress = "working";
var savedLightDark = localStorage.getItem("lightDark");
var fact = "";
const startsound = new Audio("mario.mp3");
const begin = new Audio("start.mp3");
//! API

//! Functions

//* Fetch Dog Fact

function fetchFacts() {
  fetch("https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=1")
    .then((response) => response.json())
    .then((json) => {
      fact = JSON.stringify(json.text);
      fact = fact.replace(/['"]+/g, "");
    });
}

//*Countdown function
function countDown() {
  if (degree === null) {
    setProgressBar();
  }
  interval = setInterval(() => {
    if (mm >= 0 && ss >= 0) {
      if (ss === 00 && mm >= 1) {
        mm--;
        ss = 59;
        setTime();
      } else if (ss > 00) {
        ss--;
        setTime();
      }
      textContent();
    }
    degree = 100 - ((mm * 60 + ss) / totalTime) * 100;
    progressBar();
    roundTime();
  }, 1000);
}

//*Dark Light Switch
function switchTheme(e) {
  if (root.getAttribute("data-theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("lightDark", "light");
    toggleSwitch.innerHTML = "Change to dark mode";
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("lightDark", "dark");
    toggleSwitch.innerHTML = "Change to light mode";
  }
}

//*Pause function
function pauseCountDown() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
    start.innerHTML = "Start";
  }
}

//* Reset Function
function resetCountDown() {
  roundSet();
  setTime();
  pauseCountDown();
  setProgressBar();
}

//* Set time on page function
function setTime() {
  minutes.innerHTML = mm.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  seconds.innerHTML = ss.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}

function roundSet() {
  if (counter % 6 === 0) {
    progress = "longbreak";
    begin.play();
    wstatus.innerHTML = "15 Minute Break";
    mm = 15;
    ss = 00;
    root.style.setProperty("--progress", "#ef6d6d");
  } else if (counter % 2 === 1) {
    progress = "working";
    wstatus.innerHTML = "25 Minutes of Work";
    begin.play();
    mm = 25;
    ss = 00;
    root.style.setProperty("--progress", "#85cec4");
    roundCount.innerHTML = roundNum;
    roundNum++;
  } else if (counter % 2 === 0) {
    progress = "shortbreak";
    begin.play();
    wstatus.innerHTML = "5 Minute Break";
    mm = 5;
    ss = 00;
    root.style.setProperty("--progress", "#ef6d6d");
  }
}

//* Set the correct time based on the round
function roundTime() {
  if (mm === 0 && ss === 0) {
    counter++;
    roundSet();
    setProgressBar();
  }
}

//* Progress bar function
function setProgressBar() {
  root.style.setProperty("--degree", "0%");
  totalTime = mm * 60 + ss;
}

function progressBar() {
  root.style.setProperty("--degree", degree + "%");
}

function textContent() {
  let statusContent = document.querySelector("#statusBar");
  if (progress === "working") {
    if (mm === 25) {
      statusContent.innerHTML = "Pomodoro Timer, Ready?";
    } else if (mm === 24 || mm === 25) {
      statusContent.innerHTML = "Start working!";
    } else if (mm === 19) {
      statusContent.innerHTML = "You're doing great!";
    } else if (mm === 14) {
      statusContent.innerHTML = "Keep it up and you'll get an dog fact.";
    } else if (mm === 9) {
      statusContent.innerHTML = "Over half way there!";
    } else if (mm === 4) {
      statusContent.innerHTML = "Only 5 minutes till your dog fact.";
    }
  } else if (progress === "shortbreak") {
    if (mm === 4 && ss === 59) {
      statusContent.innerHTML = "Take a 5 minute break, only a few seconds until a dog fact!";
    } else if (mm === 4 && ss === 45) {
      statusContent.innerHTML = fact;
    } else if (mm === 4 && ss === 10) {
      statusContent.innerHTML = "Enjoy the rest of your break :)";
    }
  } else if (progress === "longbreak") {
    statusContent.innerHTML = "Well Done! Go take your well deserved 15 minute break!";
  }
  if (mm === 24 && ss === 59) {
    fetchFacts();
  }
}

//! Event Listeners and code

setTime();

//*Start button begins the countdown
start.addEventListener("click", function () {
  if (start.innerHTML === "Start") {
    countDown(mm);
    start.innerHTML = "Pause";
    startsound.play();
  } else if (start.innerHTML === "Pause") {
    pauseCountDown();
    start.innerHTML = "Start";
  }
});

//*Resets the countdown
reset.addEventListener("click", function () {
  resetCountDown();
});

//*Dark Light
toggleSwitch.addEventListener("click", switchTheme, false);
document.documentElement.setAttribute("data-theme", savedLightDark);

//? Test Area
