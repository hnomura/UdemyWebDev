const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = []; 

function playSound(name)  { 
    let audio = new Audio("./sounds/"+name+".mp3");
    audio.play(); 
}

function nextSequence() { 
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); 

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    let level = gamePattern.length;
    console.log("next level = "+ level);
    userClickedPattern = []; 
    $("h1").text("Level " + level);
}

function animatePress(currentColor) { 
    $("#"+currentColor).addClass("pressed");
    setTimeout(()=> $("#"+currentColor).removeClass("pressed"), 100);
}

function checkAnswer() { 
    return userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1];
}
 
function gameOver() { 
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(()=>$("body").removeClass("game-over"), 200);
    $("h1").text("Game Over, Press Any Key to Restart"); 
    gamePattern = []; 
}

$(".btn").click( function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor); 
    playSound(userChosenColor);
    animatePress(userChosenColor);

    let success = checkAnswer(); 
    if (!success) 
    {
        console.log("fail");
        gameOver(); 

    } else {
        console.log("success");
        // next level if all matched 
        if ( userClickedPattern.length == gamePattern.length ) { 
            setTimeout( nextSequence, 1000 );
        }
    }
});

$(document).keydown(() => {
    if ( gamePattern.length==0 ) { 
        console.log("Game Start");
        gameInProgress=true; 
        nextSequence();
    }
});
