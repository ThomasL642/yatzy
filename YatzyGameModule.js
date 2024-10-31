let GameStarted = false;
let PlayerTurn = 0;
let NumberOfRolls = 0;

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
    }

window.startGame = startGame;

function startTurn() {
    console.log("Player " + PlayerTurn + "'s Turn");
    
    //Enable DiceRoll, enable freezing Freeze Dice, Roll, Freeze Dice, Roll, Pick Box, Score it, display and block off of table, Unable Dice, Next Turn

    //Player 2 Turn
    //Enable Dice, Roll, Freeze Dice, Roll, Freeze Dice, Roll, Pick Box, Score it, display and block off of table, Unable Dice, Next Turn(unless last roll)
}

window.startTurn = startTurn;

function endTurn() {}

function endGame() {}