//Roll Button Logic
let rollHistory = new RollHistory();
let roll = new Roll(); // Create a new roll instance

function RollButtonPlayer(buttonNumber) {
    if (PlayerTurn != buttonNumber || NumberOfRolls == 3) {
        console.log("Button Frozen");
    }else{
        //increment number of rolls
        NumberOfRolls += 1;
        console.log("Roll Number: " + NumberOfRolls);

        let diceOffset = 1;
        if (PlayerTurn == 2) {diceOffset += 5;}

        // if its first turn roll all new dice otherwise roll all not frozen die
        if (NumberOfRolls == 1){
            for (let i = 0; i < 5; i++) {
                roll.roll(); // Generate a new roll
                rollHistory.addRoll(roll.result); // Add the roll to history
            }
        }else{
            console.log("roll history before new dice " + rollHistory.getHistory());
            //Keeps saved dice generates new dice if not saved
            //offset for dice to save player 2 dice
            if (PlayerTurn == 2) {
                FrozenDice.forEach((num, index, arr) => {
                    arr[index] = num - 5;
                });
                console.log(FrozenDice);
            }
            rollHistory.getHistory().forEach((number, index) => {
                if (FrozenDice.indexOf((index + 1)) !== -1) {
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
        if (PlayerTurn == 2) {
            FrozenDice.forEach((num, index, arr) => {
                arr[index] = num + 5;
            });
        }
        const playersroll = rollHistory.getHistory();
        console.log(playersroll);

        playersroll.forEach((number, index) => {
            const imageElement = document.getElementById("die" + (index + diceOffset));
            imageElement.src = "Dice Assets/dice(" + number + ").png";
        });
    }
}