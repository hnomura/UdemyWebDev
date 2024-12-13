// $(document).ready(function() {
//     $("h1").css("color", "blue");
// });

// add / remove class(es) 
$("h1").addClass("big-title black-color");
$("h1").removeClass("black-color");

// set text & innterHTML (to all button elements)
// $("button").text("don't click me");
// $("button").html("<em>Give Up</em>")

// get/set attribute value 
console.log($("img").attr("src"));
$("a").attr("href", "https://www.yahoo.co.jp");
console.log($("h1").attr("class"));

// click event listener
$("h1").click(() => $("h1").css("color", "purple"));
// all buttons 
$("button").click(function() {
    // this.style.color = "red";
    $(this).css("color", "blue");
});

// key press event listener 
$("input").keypress((e)=>console.log(e.key));
$(document).keypress((e)=>$("h1").text(e.key));

// generic event ( on("xxxx", ))
$("h1").on("mouseover", ()=>$("h1").css("color", "purple"));

$(".animate").click( ()=> {
    // $("h1").fadeOut();
    // setTimeout(()=>$("h1").fadeIn(), 1000);
    $("h1").slideUp(); 
    setTimeout(()=>$("h1").slideDown(), 1000);
});

$(".animate2").click( ()=>{
    // chaining of effect 
    $("h1").slideUp("slow").slideDown("fast").animate({opacity: 0.5});
})

