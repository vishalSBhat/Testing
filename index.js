$(document).ready(function(){
  if(window.matchMedia('(max-width: 768px)').matches)
  {
    $(window).on("tap",function(){
      create();
    $(this).off("tap");
  });
  }
  else
  {
    $(window).bind("keypress.start",function(){
      create();
    $(this).unbind("keypress.start");
    });
  }

});

var colours = ["red", "blue", "yellow", "green"];
var pc = [];
var user = [];
var level=0;



$(".box").click(function() {
  anim($(this));
  music($(this).attr("id"));
  user.push($(this).attr("id"));
  if(check()){
    if(pc.length===user.length)
    {
      user = [];
      setTimeout(create,1000);
    }
  }
  else{
    regame();
  }
});


function anim(but) {
  but.addClass("pressed");
  setTimeout(function() {
    but.removeClass("pressed");
  }, 200);
}

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

function random()
{
  return Math.floor(Math.random()*4);
}

function create()
{
  var col = colours[random()];
  anim($("#"+col));
  music(col);
  pc.push(col);
  $(".title").text("LEVEL "+level);
  ++level;
}


function check()
{
  var n = user.length - 1;
  if(user[n]===pc[n])
  return true;
  else
  return false;
}

function regame()
{
  $(".title").text("GAME OVER");
  pc = [];
  user = [];
}
