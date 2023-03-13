// color sequence generator 

var buttonColours = ["red", "blue", "green", "yellow"];
var colorPattern = [];
var userPattern = [];
var gameStart = false;
var level = 0;


// Initiates the game after a key is pressed
$(document).keydown(function () {

    if (!gameStart) {
        $("#level-title").text("Level : " + level);
        sequence();
        gameStart = true;
    }

});


// Sequence of color blinks starts
function sequence() {
    userPattern = [];
    level++;

    $("#level-title").text("Level : " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var chosenColor = buttonColours[randomNumber];

    colorPattern.push(chosenColor);
    $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(chosenColor);

}


// Checks the color clicked
function checkAnswer(colorCheck) {

    if (userPattern[colorCheck] === colorPattern[colorCheck]) {
        if (userPattern.length === colorPattern.length) {
            setTimeout(function () {
                sequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }

}


// Plays sound when color button is clicked
$(".btn").on("click", function () {

    userPattern.push(this.id);
    console.log(userPattern);

    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userPattern.length - 1);
})


// Plays sounds function
function playSound(color) {

    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();

}


// Makes the button blink upon click
function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


// Calls when wrong button is pressed
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}