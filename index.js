var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


 //CODE TO GENERATE RANDOM COLOURS AND ATTACH A SOUND TO IT
function nextSequence (){
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor( Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

// Detects what button was clicked and stores the colour of the button clicked
$(".btn").on("click" , function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})


function playSound(name){
    var Sound = new Audio ('./sounds/' + name +'.mp3');
    Sound.play();
}

// ADDS ANIMATION TO THE BUTTON CLICKED
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//RESETS WHEN THE ANSWERS ARE WRONG
function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    $("#tap-start").text("Tap Here 🔥 to Start").show();
    $("#level-title").hide();
}

// STARTS THE GAME
$(document).on("keydown" ,function(){
    if (started === false){
        userClickedPattern = [];
        $("#level-title").text("level " + level);
        nextSequence ();
        started = true ;
        $("#tap-start").hide();
        $("#level-title").show();
    }
    
})
$("#tap-start").on("click" ,function(){
    if (started === false){
        userClickedPattern = [];
        $("#level-title").text("level " + level);
        nextSequence ();
        started = true ;
        $("#tap-start").hide();
        $("#level-title").show();
    }
})

//CHECKS THE ANSWERS
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
        setTimeout( function(){
            nextSequence();
            userClickedPattern = [];
        } , 1000)
    }
    }
    
    //FOR WRONG ANSWERS
    else{
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("#tap-start").text("Game Over, Tap Here 🔥 to Restart").show();
        var wrongSound = new Audio ('./sounds/wrong.mp3');
        wrongSound.play();
        userClickedPattern = [];
        
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over")
        startOver();
       }, 200)
    }
}
 
