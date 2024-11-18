// Freezing Dice Logic
// let FrozenDice = [];

async function FreezeDie(dieNumber) {
    // If no rolls are made die can't be frozen
    TempPlayersTurn = await fetchValue("PlayerTurn");
    TempNumberOfRolls = await fetchValue("NumberOfRolls");
    TempFrozenDice = await fetchValue("FrozenDice");
    if (TempNumberOfRolls < 1) {
        console.log("No Rolls Have Been Made");
    // If it is player 2 turn but Player 1 dice
    }else if (((dieNumber / 5) <= 1) && TempPlayersTurn == 2) {
        console.log("Not Player 1 Turn");
    // If it is player 1 turn but Player 2 dice
    }else if (((dieNumber / 5) > 1) && TempPlayersTurn == 1) {
         console.log("Not Player 2 Turn");

    // If Dice is deselcted
    }else if (TempFrozenDice.indexOf(dieNumber) !== -1) {
        console.log(`Number ${dieNumber} is in the array.`);
        const index = TempFrozenDice.indexOf(dieNumber);
        if (index > -1) {
            TempFrozenDice.splice(index, 1);
            updateValue("FrozenDice", TempFrozenDice);
            const imageElement = document.getElementById("die" + dieNumber);
            imageElement.style.filter = "brightness(100%)";
        }
    // Add it to list
    }else{
        TempFrozenDice.push((dieNumber));
        updateValue("FrozenDice", TempFrozenDice);
        console.log("Frozen Die:" + TempFrozenDice);
        const imageElement = document.getElementById("die" + dieNumber);
        imageElement.style.filter = "brightness(50%)";
    }
}