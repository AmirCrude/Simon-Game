
var randomButton = ["green", "red", "yellow", "blue"];
var selectedButtons = [];
var clickedButtons = [];
var level = 0;
var started = false;

$(document).keypress( function() {
    if (!started) {
        //--Change header to level
    $("h1").text("Level " + level);
    selectButton();
    started = true;
    }
    });


$(".btn").on("click", function () {
    //--fetch clicked button id
    var clickedButtonId = $(this).attr("id");
    clickedButtons.push(clickedButtonId);

    $("#" + clickedButtonId).addClass("pressed");
    setTimeout(function () {
        $("#" + clickedButtonId).removeClass("pressed");
    }, 50);

    checkOrder(clickedButtons.length-1);
    
    });


function checkOrder(currentLevel) {
    if(selectedButtons[currentLevel] === clickedButtons[currentLevel]) {
        if(selectedButtons.length === clickedButtons.length) {
            setTimeout(() => {
                selectButton();
            }, 1000);
        }
    } else {
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 500);
            playSound("wrong");

            tryAgain();
    }
    
}
    
function selectButton () {
    clickedButtons = [];
    level++;
    $("h1").text("Level " + level);
//--Select random button
    var randomNumber = Math.floor(Math.random() * 4);
    var selectedButtonId = $("#" + randomButton[randomNumber]).attr("id");
    selectedButtons.push(selectedButtonId);

//--Animate selected button
    $("#" + selectedButtonId).fadeOut(100).fadeIn(100);

    playSound(selectedButtonId);

}

function tryAgain() {
  level = 0;
  selectedButtons = [];
  started = false;
}

function playSound(nameOfSound) {
    var audio = new Audio("sounds/" + nameOfSound + ".mp3");
    audio.play();
}