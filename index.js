$(document).ready(start);

// function to start or restart game
function start() {
  if (window.matchMedia('(max-width: 768px)').matches) {
    mobActive();
  } else {
    pcActive();
  }
}

// function to detect initial touch in mobile
function mobActive() {
  document.getElementById("sample").addEventListener("touchend", create);
}

// function to detect keypress  in pc
function pcActive() {
  $(window).bind("keypress.start", function() {
    create();
    $(this).unbind("keypress.start");
  });
}

var colours = ["red", "blue", "yellow", "green"];
var pc = [];
var user = [];
var level = 0;


// function to keep track of all user clicks
$(".box").click(function() {
  anim($(this));
  music($(this).attr("id"));
  user.push($(this).attr("id"));
  if (check()) {
    if (pc.length === user.length) {
      user = [];
      setTimeout(create, 1000);
    }
  } else {
    regame();
  }
});

// functio for button click animation
function anim(but) {
  but.addClass("pressed");
  setTimeout(function() {
    but.removeClass("pressed");
  }, 200);
}

// function to play diff music for each click
function music(id) {
  switch (id) {
    case "red":
      var red = new Audio("red.mp3");
      red.play();
      break;
    case "blue":
      var blue = new Audio("blue.mp3");
      blue.play();
      break;
    case "yellow":
      var yellow = new Audio("yellow.mp3");
      yellow.play();
      break;
    case "green":
      var green = new Audio("green.mp3");
      green.play();
      break;
    default:
      var wrong = new Audio("wrong.mp3");
  }
}

function random() {
  return Math.floor(Math.random() * 4);
}

// function to generate sequence of colours
function create() {
  var col = colours[random()];
  anim($("#" + col));
  music(col);
  pc.push(col);
  $(".title").text("LEVEL " + level);
  ++level;
}

// function to check user clicks with generated pattern
function check() {
  var n = user.length - 1;
  if (user[n] === pc[n])
    return true;
  else
    return false;
}

// function to start another game after game over
function regame() {
  $(".title").text("GAME OVER");
  anim1(reset);
  var aud = new Audio("wrong.mp3");
  aud.play();
  pc = [];
  user = [];
  level = 0;
  start();
}

// function to reset game over animation
function reset() {
  $("body").css("background-color", "#f0e3ff");
  $(".title").css("color", "#0f4c75");
  if (window.matchMedia('(max-width: 768px)').matches)
    $(".title").text("Touch anywhere on the screen to start the game");
  else
    $(".title").text("Press any key to start the game");
}

// function for animation for game over
function anim1(callback) {
  var blre = ["black", "red"];
  var i = 0;
  var count = 0;
  var anime = setInterval(function() {
    $("body").css("background-color", blre[0 + i]);
    $(".title").css("color", blre[1 - i]);
    ++count;
    i = count % 2;
    if (count >= 7) {
      clearInterval(anime);
      setTimeout(callback, 1000);
    }
  }, 150);
}
