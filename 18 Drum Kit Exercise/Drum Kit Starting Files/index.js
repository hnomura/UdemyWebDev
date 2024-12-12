// add event handler to all "drum" class instances 

// option-A
// NOTE: arrow function does not have their own "this" context, hence the folllowing is NG 
// (e) => { console.log(this); makeSound(this).innerHTML;} // "this" is NOT a button 
document.querySelectorAll(".drum").forEach( btn => btn.addEventListener("click", function() { 
    makeSound(this.innerHTML); 
    buttonAnimation(this.innerHTML);
}));

// option-B 
// let drums = document.querySelectorAll(".drum");
// for (let i=0; i<drums.length; i++) { 
//     drums[i].addEventListener("click", function() {  
//         // console.log(this.innerHTML);
//         // ** switch case style *** 
//         // let audioFile = ""; 
//         // switch( this.innerHTML ) { 
//         //     case "w": audioFile = "tom-1"; break; 
//         //     case "a": audioFile = "tom-2"; break;
//         //     case "s": audioFile = "tom-3"; break; 
//         //     case "d": audioFile = "tom-4"; break; 
//         //     case "j": audioFile = "snare"; break; 
//         //     case "k": audioFile = "crash"; break; 
//         //     case "l": audioFile = "kick-bass"; break; 
//         //     default: break; 
//         // }
//         // ** dictionary style 
//         makeSound(this.innerHTML);
//     });
// }

document.addEventListener("keydown", (e) => {
    makeSound(e.key);
    buttonAnimation(e.key); 
});


function makeSound(key) { 
    const soundDict = { 
        "w":"tom-1", 
        "a":"tom-2", 
        "s":"tom-3",
        "d":"tom-4",
        "j":"snare",
        "k":"crash",
        "l":"kick-bass"};
    let audioFile = soundDict[key]; 
    if ( audioFile != null) {
        let audio = new Audio("./sounds/"+audioFile+".mp3");
         audio.play();
    }    
}

function buttonAnimation(key) { 
    let activeButton = document.querySelector("."+key);
    activeButton.classList.add("pressed");
    setTimeout(() => activeButton.classList.remove("pressed"), 100);
}