let GameStarted = false;
let PlayerTurn = 0;
let NumberOfRolls = 0;
let totaLNumberOfTurns = 13;

function restartGame(){
    location.reload();
}

function startGame() {
        GameStarted = true;
        // Game Starts
        console.log("Game started! = " + GameStarted);
        // Hide the start button after it’s clicked
        const startButton = document.getElementById("startButton");
        startButton.style.display = "none";

        //Starting Player 1's Turn
        PlayerTurn += 1;
        startTurn();
        const RollPlayer1Element = document.getElementById("player1Roll");
        RollPlayer1Element.style.filter = "brightness(100%)";
    }

function startTurn() {
    console.log("Player " + PlayerTurn + "'s Turn");
}

function endTurn() {
    //clear historys for new turn
    rollHistory.clearHistory();
    NumberOfRolls = 0;
    while (FrozenDice.length > 0) {
        const dieNumber = FrozenDice.shift(); 
        const imageElement = document.getElementById("die" + dieNumber);
        imageElement.style.filter = "brightness(100%)";
    }

    if (PlayerTurn == 2){ 
        PlayerTurn -= 1;
        const RollPlayer1Element = document.getElementById("player1Roll");
        RollPlayer1Element.style.filter = "brightness(100%)";
        const RollPlayer2Element = document.getElementById("player2Roll");
        RollPlayer2Element.style.filter = "brightness(50%)";
        totaLNumberOfTurns -= 1;
        if (totaLNumberOfTurns < 1) {
            endGame();
        }
    }
    else {
        PlayerTurn += 1;
        const RollPlayer1Element = document.getElementById("player1Roll");
        RollPlayer1Element.style.filter = "brightness(50%)";
        const RollPlayer2Element = document.getElementById("player2Roll");
        RollPlayer2Element.style.filter = "brightness(100%)";
    }
    console.log("it is now Player " + PlayerTurn + "'s turn");
}

function endGame() {
    console.log("endGame is called");
    // make the end game pop appear
    const endGamePopUp = document.getElementById("endGamePopUp");
    endGamePopUp.style.display = "flex";

    // Total Score Displayed
    const player1FinalScore = document.getElementById("Player1Score");
    console.log(scoreboardPlayer1.calculateTotalScore());
    player1FinalScore.innerHTML = scoreboardPlayer1.calculateTotalScore();

    const player2FinalScore = document.getElementById("Player2Score");
    console.log(scoreboardPlayer2.calculateTotalScore());
    player2FinalScore.innerHTML = scoreboardPlayer2.calculateTotalScore();
    
    // Congrats to Winner, Console Loser, or Tie
    const winnerMessageText = document.getElementById("winnerMessage");
    const loserMessageText = document.getElementById("loserMessage");

    if (scoreboardPlayer1.calculateTotalScore() == scoreboardPlayer2.calculateTotalScore()){
        winnerMessageText.innerHTML = "Its A Tie!";
        loserMessageText.innerHTML = ""
    }else{
        if (scoreboardPlayer1.calculateTotalScore() > scoreboardPlayer2.calculateTotalScore()) {
            winner = 1
            loser = 2
        }else{
            winner = 2
            loser = 1
        }

        winnerMessageText.innerHTML = "Congratulations Player " + winner + " You Won!";
        loserMessageText.innerHTML = "Sorry Player " + loser + " You Lost!"
    }
}

window.restartGame = restartGame;
window.startGame = startGame;
window.startTurn = startTurn;
window.endTurn = endTurn;
window.endGame = endGame;
