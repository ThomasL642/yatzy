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
    
    //Enable DiceRoll, Roll 1, enable freezing, Freeze Dice_1, Roll_2, Freeze Dice_2, Roll_3, Disable rolling, Pick Box, disable freezing, Score it, display and block off of table, Unable Dice, Next Turn

    //Player 2 Turn
    //Enable Dice, Roll, Freeze Dice, Roll, Freeze Dice, Roll, Pick Box, Score it, display and block off of table, Unable Dice, Next Turn(unless last roll)
}

window.startTurn = startTurn;

function endTurn() {
    //clear historys for new turn
    rollHistory.clearHistory();
    NumberOfRolls = 0;
    while (FrozenDice.length > 0) {
        const dieNumber = FrozenDice.shift(); 
        const imageElement = document.getElementById("die" + dieNumber);
        imageElement.style.filter = "brightness(100%)";
    }

    if (PlayerTurn == 2){ PlayerTurn -= 1 }
    else {PlayerTurn += 1}
    console.log("it is now Player " + PlayerTurn + "'s turn")
}

window.endTurn = endTurn;

function endGame() {}