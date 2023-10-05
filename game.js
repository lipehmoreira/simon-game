let gamePattern = []
let userClickedPattern = []
let level = 0
let start = false
let buttonColours = ["red", "blue", "green", "yellow"]

$(document).on("keydown", function(){
    if(!start){
        nextSequence()
    }
})

$(".container").on("click", function(event){
    playerSequence(event)
    checkAnswer(userClickedPattern.length-1)
})


function nextSequence(){
    userClickedPattern = []
    level++
    $("h1").text(`Level:${level}`)

    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    
    playSound(randomChosenColour)
    $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100)
    
}

//registra o botão que o jogador clicou, chama a animação e o audio do botão
function playerSequence(event){

    let userChosenColour = event.target.id
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatePress(userChosenColour)
}

function playSound(name){
    let audio = new Audio(`sounds/${name}.mp3`)
    audio.play()
}

//faz a animação quando o botão é clicado
function animatePress(currentColour){
    console.log(currentColour)
    $(`.${currentColour}`).addClass("pressed")
    setTimeout(function(){
        $(`.${currentColour}`).removeClass("pressed")
    }, 50);
    
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function(){
            nextSequence();
          }, 1000);
        }
      } else {
        //define o Game Over e reinicia o jogo
        $("h1").text("Game Over, Press Any Key To Restart")
        let audio = new Audio("sounds/wrong.mp3")
        audio.play()
        level = 0
        gamePattern = []
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")            
        }, 100);
      }
}

