var randomNumber1 = Math.floor(Math.random() * 6) + 1;
console.log("dice1 = " + randomNumber1);
document.querySelector(".img1").setAttribute("src", "./images/dice"+randomNumber1+".png");

var randomNumber2 = Math.floor(Math.random() * 6) + 1; 
console.log("dice2 = "+ randomNumber2);
document.querySelector(".img2").setAttribute("src", "./images/dice"+randomNumber2+".png");

if (randomNumber1 > randomNumber2) { 
    document.querySelector("h1").innerHTML = "&#128681Player1 Wins! "
}
else if (randomNumber1 < randomNumber2 ) { 
    document.querySelector("h1").innerHTML = "Player2 Wins!&#128681"
}
else { 
    document.querySelector("h1").innerHTML = "Draw!"
}   
