// let GameStarted = false;
// let PlayerTurn = 0;
// let NumberOfRolls = 0;
// let totaLNumberOfTurns = 13;

// window.fetchAllData = fetchAllData;
// window.fetchValue = fetchValue;
// window.updateValue = updateValue;

function restartGame(){
    location.reload();
}

async function startGame() {
        // Hide the start button after it’s clicked
        const startButton = document.getElementById('startButton');
        startButton.style.display = "none";
        await addData("NumberOfRolls", 0);
        await addData("numberOfTurns", 0);
        await addData("scoreboardPlayer1", new YatzyScoreboard());
        await addData("scoreboardPlayer2", new YatzyScoreboard());

        //Starting Player 1's Turn
        await addData("PlayerTurn", 1);
        await addData("FrozenDice", []);
        const RollPlayer1Element = document.getElementById("player1Roll");
        RollPlayer1Element.style.filter = "brightness(100%)";
        startTurn();
    }

function startTurn() {
    //console.log("Player " + PlayerTurn + "'s Turn");
    //const turn = fetchValue('PlayerTurn');
    //console.log(turn);
}

async function endTurn() {
    //clear historys for new turn
    await rollHistory.clearHistory();
    await updateValue("NumberOfRolls", 0);
    TempFrozenDice = await fetchValue("FrozenDice");
    while (TempFrozenDice.length > 0) {
        const dieNumber = TempFrozenDice.shift(); 
        const imageElement = document.getElementById("die" + dieNumber);
        imageElement.style.filter = "brightness(100%)";
    }
    await updateValue("FrozenDice", []);
    TempPlayerTurn = await fetchValue("PlayerTurn");
    if (TempPlayerTurn == 2){ 
        TempPlayerTurn -= 1;
        updateValue("PlayerTurn", TempPlayerTurn);
        const RollPlayer1Element = document.getElementById("player1Roll");
        RollPlayer1Element.style.filter = "brightness(100%)";
        const RollPlayer2Element = document.getElementById("player2Roll");
        RollPlayer2Element.style.filter = "brightness(50%)";
        TempNumberOfTurns = await fetchValue("numberOfTurns");
        TempNumberOfTurns += 1;
        await updateValue("numberOfTurns", TempNumberOfTurns);
        if (TempNumberOfTurns > 12) {
            endGame();
        }
    }
    else {
        TempPlayerTurn += 1;
        updateValue("PlayerTurn", TempPlayerTurn);
        const RollPlayer1Element = document.getElementById("player1Roll");
        RollPlayer1Element.style.filter = "brightness(50%)";
        const RollPlayer2Element = document.getElementById("player2Roll");
        RollPlayer2Element.style.filter = "brightness(100%)";
    }
    console.log("it is now Player " + TempPlayerTurn + "'s turn");
}

// TODO: Redo endturn with http methods
async function endGame() {
    console.log("endGame is called");
    scoreboardPlayer1 = await fetchValue("scoreboardPlayer1");
    scoreboardPlayer2 = await fetchValue("scoreboardPlayer2");
    scoreboardPlayer1 = Object.assign(new YatzyScoreboard(), scoreboardPlayer1);
    scoreboardPlayer2 = Object.assign(new YatzyScoreboard(), scoreboardPlayer2);
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
    await deleteData("RollHistory");
    await deleteData("NumberOfRolls");
    await deleteData("numberOfTurns");
    await deleteData("scoreboardPlayer1");
    await deleteData("scoreboardPlayer2");
    await deleteData("PlayerTurn");
    await deleteData("FrozenDice");
}

window.restartGame = restartGame;
window.startGame = startGame;
window.startTurn = startTurn;
window.endTurn = endTurn;
window.endGame = endGame;
