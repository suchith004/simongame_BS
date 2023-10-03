var buttonColours=["red", "blue", "green", "yellow","white","black"];
var gp=[];
var uckp=[];
var seq=[];
var started=false;
var level=0;

$(document).click(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function(){
    var ucc=$(this).attr("id");
    uckp.push(ucc);
    playSound(ucc);
    animatePress(ucc);
    checkAnswer(uckp.length-1);
});


function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    for(let i=0;i<level;i++)
    {
        
    var rn=Math.floor(Math.random() * 6);
    rcc=buttonColours[rn];
    gp.push(rcc);
    $("#" + rcc).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + rcc + ".mp3");
    playSound(rcc);
    
    }

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(cc){
    $("#"+cc).addClass("pressed");
    setTimeout(function(){
        $("#"+cc).removeClass("pressed");

    },100);

}

function checkAnswer(cl){
    if(gp[cl]==uckp[cl]){
        console.log("success");
        if(uckp.length==gp.length){
          setTimeout(function(){
            nextSequence();
          },1000);  
        }
    }else{
        playSound("wrong");
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("game over,press any key");
        startOver();
    }

}

function startOver(){
    level = 0;
    gp=[];
    started = false;
}