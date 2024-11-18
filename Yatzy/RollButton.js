//Roll Button Logic
let rollHistory = new RollHistory();
let roll = new Roll(); // Create a new roll instance

async function RollButtonPlayer(buttonNumber) {
    TempNumberOfRolls = await fetchValue("NumberOfRolls");
    TempPlayerTurn = await fetchValue("PlayerTurn");
    if (TempPlayerTurn != buttonNumber || TempNumberOfRolls == 3) {
        console.log("Button Frozen");
    }else{
        //increment number of rolls
        TempNumberOfRolls += 1;
        updateValue("NumberOfRolls", TempNumberOfRolls);
        console.log("Roll Number: " + TempNumberOfRolls);

        //Offset the dice if player 2 turn
        let diceOffset = 1;
        if (TempPlayerTurn == 2) {diceOffset += 5;}

        // if its first turn roll all new dice otherwise roll all not frozen die
        if (TempNumberOfRolls == 1){
            for (let i = 0; i < 5; i++) {
                roll.roll(); // Generate a new roll
                rollHistory.addRoll(roll.result); // Add the roll to history
            }
        }else{
            console.log("roll history before new dice " + rollHistory.getHistory());
            //Keeps saved dice generates new dice if not saved
            //offset for dice to save player 2 dice
            TempFrozenDice = await fetchValue("FrozenDice");
            if (TempPlayerTurn == 2) {
                TempFrozenDice.forEach((num, index, arr) => {
                    arr[index] = num - 5;
                });
                console.log(TempFrozenDice);
            }
            rollHistory.getHistory().forEach((number, index) => {
                if (TempFrozenDice.indexOf((index + 1)) !== -1) {
                    console.log("Dice Number " + index + " has been saved");
                }else {
                    roll.roll();
                    console.log("Dice Number " + index + " is being rolled");
                    rollHistory.getHistory()[index] = roll.result;
                }
            })
        } 

        //changes the dices pngs
        //unoffset for dice to save player 2 dice
        if (TempPlayerTurn == 2) {
            FrozenDice.forEach((num, index, arr) => {
                arr[index] = num + 5;
            });
        }
        const playersroll = rollHistory.getHistory();
        console.log(playersroll);

        //Animate Roll

        playersroll.forEach((number, index) => {
            animateDieRoll(number, index+diceOffset)
            const imageElement = document.getElementById("die" + (index + diceOffset));
            imageElement.src = "Dice Assets/dice(" + number + ").png";
        });
    }
}