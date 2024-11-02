// Freezing Dice Logic
let FrozenDice = [];

function FreezeDie(dieNumber) {
    // If no rolls are made die can't be frozen
    if (NumberOfRolls < 1) {
        console.log("No Rolls Have Been Made");
    // If it is player 2 turn but Player 1 dice
    }else if (((dieNumber / 5) <= 1) && PlayerTurn == 2) {
        console.log("Not Player 1 Turn");
    // If it is player 1 turn but Player 2 dice
    }else if (((dieNumber / 5) > 1) && PlayerTurn == 1) {
         console.log("Not Player 2 Turn");

    // If Dice is deselcted
    }else if (FrozenDice.indexOf(dieNumber) !== -1) {
        console.log(`Number ${dieNumber} is in the array.`);
        const index = FrozenDice.indexOf(dieNumber);
        if (index > -1) {
            FrozenDice.splice(index, 1);
            const imageElement = document.getElementById("die" + dieNumber);
            imageElement.style.filter = "brightness(100%)";
        }
    // Add it to list
    }else{
        FrozenDice.push((dieNumber));
        console.log("Frozen Die:" + FrozenDice);
        const imageElement = document.getElementById("die" + dieNumber);
        imageElement.style.filter = "brightness(50%)";
    }
}