//Function for creating two tabs that is timer and stopwatch
function Countdown(evt, TANDS) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(TANDS).style.display = "block";
  evt.currentTarget.className += " active";
}

const container = document.querySelector(".counter");
const buttonDiv = document.querySelector(".buttons");
const secInput = document.getElementById("seconds");

var seconds;
var remseconds;
var minute;
var toCount = false;

function toSubmit() {
  display("start");
  remove("seconds");
  remove("ok");
  seconds = Number(secInput.value);
  counting();
}

function display(e) {
  document.getElementById(e).style.display = "block";
}
function remove(e) {
  document.getElementById(e).style.display = "none";
}

function check(stat) {
  toCount = stat.value;
  if (stat.id == "start") {
    display("stop");
    remove("start");
  } else if (stat.id == "stop") {
    display("continue");
    remove("stop");
  } else {
    display("stop");
    remove("continue");
  }
}
function count() {
  if (seconds > 0) {
    if (toCount == true) {
      seconds--;
      remseconds = seconds % 60;
      minutes = Math.floor(seconds / 60);
      if (minutes < 10) {
        minutes = "0" + minutes;
        if (remseconds < 10) {
          remseconds = "0" + remseconds;
        }
      }
      container.innerHTML = minutes + ":" + remseconds;
    }
  } else {
    container.innerHTML = "DONE!";
    buttonDiv.style.opacity = "0";
  }
}
function counting() {
  remseconds = seconds % 60;
  minutes = Math.floor(seconds / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
    if (remseconds < 10) {
      remseconds = "0" + remseconds;
    }
  }
  container.innerHTML = minutes + ":" + remseconds;
  setInterval(count, 1000);
}
// // ------------------------STOPWATCH----------------------
// let second = 0;
// let minutes = 0;
// let hours = 0;

// let displaySecond = 0;
// let displayMinutes = 0;
// let displayHours = 0;

// let status = "Stopped";
// let interval = "";

// function StartWatch() {
//   second++;

//   if (second / 60 === 1) {
//     second = 0;
//     minutes++;

//     if (minutes / 60 === 1) {
//       minutes = 0;
//       hours++;
//     }
//   }

//   if (second < 10) {
//     displaySecond = "0" + second.toString();
//   } else {
//     displaySecond = second;
//   }

//   if (minutes < 10) {
//     displayMinutes = "0" + minutes.toString();
//   } else {
//     displayMinutes = minutes;
//   }

//   if (hours < 10) {
//     displayHours = "0" + hours.toString();
//   } else {
//     displayHours = hours;
//   }

//   document.getElementById("display").innerHTML =
//     displayHours + ":" + displayMinutes + ":" + displaySecond;
// }

// function startStop() {
//   if (status == "Stopped") {
//     interval = window.setInterval(StartWatch, 1000);
//     document.getElementById("handler").innerHTML = "Stop";
//     status = "Started";
//   } else if (status == "Started") {
//     window.clearInterval(interval);
//     document.getElementById("handler").innerHTML = "Start";
//     status = "Stopped";
//   }
// }

// function Reset() {
//   second = 0;
//   hours = 0;
//   minutes = 0;
//   window.clearInterval(interval);
//   document.getElementById("display").innerHTML = "00:00:00";
//   document.getElementById("handler").innerHTML = "Start";
//   status = "Stopped";
// }
var timer = document.getElementById("timer");
var toggleBtn = document.getElementById("toggle");
var resetBtn = document.getElementById("reset");
var watch = new Stopwatch(timer);

function Stopwatch(elem) {
  var time = 0;
  var offset;
  var interval;

  function update() {
    if (this.isOn) {
      time += delta();
    }

    elem.textContent = timeFormatter(time);
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;

    offset = now;

    return timePassed;
  }

  function timeFormatter(time) {
    time = new Date(time);

    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();

    if (minutes.length < 2) {
      minutes = "0" + minutes;
    }

    if (seconds.length < 2) {
      seconds = "0" + seconds;
    }

    while (milliseconds.length < 3) {
      milliseconds = "0" + milliseconds;
    }

    return minutes + " : " + seconds + " . " + milliseconds;
  }

  this.start = function () {
    interval = setInterval(update.bind(this), 10);
    offset = Date.now();
    this.isOn = true;
  };

  this.stop = function () {
    clearInterval(interval);
    interval = null;
    this.isOn = false;
  };

  this.reset = function () {
    time = 0;
    update();
  };

  this.isOn = false;
}

function start() {
  toggleBtn.textContent = "Stop";
  watch.start();
}

function stop() {
  toggleBtn.textContent = "Start";
  watch.stop();
}

toggleBtn.addEventListener("click", function () {
  watch.isOn ? stop() : start();
});

resetBtn.addEventListener("click", function () {
  watch.reset();
});
