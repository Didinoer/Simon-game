const buttoncolours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamepattern = [];
let gameStarted = false;
let level = 0;

function nextsequence() {
  userClickedPattern = [];
  level++;
  let randomnum = Math.floor(Math.random() * 4) + 1;
  let randomChosenColour = buttoncolours[randomnum - 1];
  gamepattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  $("h1").text("level " + level);
  console.log(gamepattern);
  return randomChosenColour;
}

function playSound(nama) {
  var aud = new Audio("sounds/" + nama + ".mp3");
  aud.play();
  console.log("sounds/" + nama + ".mp3");
}

function handler(button_id) {
  let userChosenColour = button_id;
  userClickedPattern.push(userChosenColour);
  console.log("got this");
  console.log(userClickedPattern);
}

function checkResult(curentlevel) {
  if (gamepattern[curentlevel] == userClickedPattern[curentlevel]) {
    console.log("benar");
    if (gamepattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  } else {
    $("h1").text("game Over, Press Any Key to Restart");
    playSound("wrong");
    gameStarted = false;
    gamepattern = [];
    userClickedPattern = [];
    level = 0;
  }
}

$(document).on("keydown", function (event) {
  if (!gameStarted) {
    console.log(event.target);

    nextsequence();

    gameStarted = true;
  }
});

$(".btn").on("click", function (event) {
  if (gameStarted) {
    handler(event.target.id);
    playSound(event.target.id);
    checkResult(userClickedPattern.length - 1);
  }
});
