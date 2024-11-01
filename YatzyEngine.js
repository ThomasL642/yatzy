//ScoreBoard Calculator
class YatzyChecker {
    constructor(dice) {
        if (dice.length !== 5 || !dice.every(num => num >= 1 && num <= 6)) {
            console.log("dice is " + dice + "and length is " + dice.length);
            throw new Error("Invalid dice list");
        }
        this.dice = dice;
    }

    // Upper Section: Count of each specific number
    scoreOnes() { return this.dice.filter(die => die === 1).reduce((sum, die) => sum + die, 0); }
    scoreTwos() { return this.dice.filter(die => die === 2).reduce((sum, die) => sum + die, 0); }
    scoreThrees() { return this.dice.filter(die => die === 3).reduce((sum, die) => sum + die, 0); }
    scoreFours() { return this.dice.filter(die => die === 4).reduce((sum, die) => sum + die, 0); }
    scoreFives() { return this.dice.filter(die => die === 5).reduce((sum, die) => sum + die, 0); }
    scoreSixes() { return this.dice.filter(die => die === 6).reduce((sum, die) => sum + die, 0); }

    // Lower Section
    scoreThreeOfAKind() {
        return this.hasNOfAKind(3) ? this.sumAllDice() : 0;
    }

    scoreFourOfAKind() {
        return this.hasNOfAKind(4) ? this.sumAllDice() : 0;
    }

    scoreFullHouse() {
        const counts = this.getDiceCounts();
        const values = Object.values(counts);
        return values.includes(3) && values.includes(2) ? 25 : 0;
    }

    scoreSmallStraight() {
        const uniqueDice = Array.from(new Set(this.dice)).sort();
        const possibleStraits = [
            [1, 2, 3, 4],
            [2, 3, 4, 5],
            [3, 4, 5, 6]
        ];
        return possibleStraits.some(straight => straight.every(die => uniqueDice.includes(die))) ? 30 : 0;
    }

    scoreLargeStraight() {
        const sortedDice = Array.from(new Set(this.dice)).sort();
        const largeStraight1 = [1, 2, 3, 4, 5];
        const largeStraight2 = [2, 3, 4, 5, 6];
        return (sortedDice.join() === largeStraight1.join() || sortedDice.join() === largeStraight2.join()) ? 40 : 0;
    }

    scoreChance() {
        return this.sumAllDice();
    }

    scoreYahtzee() {
        return this.hasNOfAKind(5) ? 50 : 0;
    }

    // Helper methods
    hasNOfAKind(n) {
        const counts = this.getDiceCounts();
        return Object.values(counts).some(count => count >= n);
    }

    getDiceCounts() {
        return this.dice.reduce((counts, die) => {
            counts[die] = (counts[die] || 0) + 1;
            return counts;
        }, {});
    }

    sumAllDice() {
        return this.dice.reduce((sum, die) => sum + die, 0);
    }
}

//ScoreBoard object
class YatzyScoreboard {
    constructor() {
        // Initialize all categories with null (unscored)
        this.scores = {
            Ones: null,
            Twos: null,
            Threes: null,
            Fours: null,
            Fives: null,
            Sixes: null,
            ThreeOfAKind: null,
            FourOfAKind: null,
            FullHouse: null,
            SmallStraight: null,
            LargeStraight: null,
            Chance: null,
            Yahtzee: null,
            YahtzeeBonus: 0 // Track Yahtzee bonus points if multiple Yahtzees
        };
    }

    // Methods to add scores for each category
    addScore(category, score) {
        if (this.scores[category] !== null) {
            throw new Error(`${category} has already been scored.`);
        }
        if (!this.scores.hasOwnProperty(category)) {
            throw new Error(`${category} is not a valid category.`);
        }
        this.scores[category] = score;
    }

    // Calculate total score for the upper section (ones to sixes)
    calculateUpperSectionTotal() {
        const upperSection = ['Ones', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes'];
        return upperSection.reduce((total, category) => {
            return total + (this.scores[category] || 0);
        }, 0);
    }

    // Calculate upper section bonus (35 points if total is 63 or more)
    calculateUpperSectionBonus() {
        return this.calculateUpperSectionTotal() >= 63 ? 35 : 0;
    }

    // Calculate total score for the lower section
    calculateLowerSectionTotal() {
        const lowerSection = [
            'ThreeOfAKind',
            'FourOfAKind',
            'FullHouse',
            'SmallStraight',
            'LargeStraight',
            'Chance',
            'Yahtzee'
        ];
        return lowerSection.reduce((total, category) => {
            return total + (this.scores[category] || 0);
        }, 0);
    }

    // Calculate total score (including upper and lower sections and bonuses)
    calculateTotalScore() {
        const upperScore = this.calculateUpperSectionTotal();
        const upperBonus = this.calculateUpperSectionBonus();
        const lowerScore = this.calculateLowerSectionTotal();
        console.log(upperScore, upperBonus, lowerScore)
        return upperScore + upperBonus + lowerScore;
    }

    // Add Yahtzee bonus points (for multiple Yahtzees)
    addYahtzeeBonus() {
        this.scores.yahtzeeBonus += 100;
    }

    // Display the scoreboard
    displayScoreboard() {
        console.log("Yatzy Scoreboard:");
        Object.keys(this.scores).forEach(category => {
            console.log(`${category}: ${this.scores[category] !== null ? this.scores[category] : '-'}`);
        });
        console.log(`Upper Section Total: ${this.calculateUpperSectionTotal()}`);
        console.log(`Upper Section Bonus: ${this.calculateUpperSectionBonus()}`);
        console.log(`Lower Section Total: ${this.calculateLowerSectionTotal()}`);
        console.log(`Total Score: ${this.calculateTotalScore()}`);
    }
}

//ScoreBoard Front End Logic
const scoreboardPlayer1 = new YatzyScoreboard();
const scoreboardPlayer2 = new YatzyScoreboard();

function ScoreBoardButtons(category) {
    // No score can be made if no rolls have been made 
    //Todo: cant be score if place has been choosen
    if (NumberOfRolls < 1){

    }else{
        const currentScoreboard = PlayerTurn === 1 ? scoreboardPlayer1 : scoreboardPlayer2;
        const yatzyChecker = new YatzyChecker(rollHistory.getHistory());
        console.log("row " + category + " has been clicked");
        // calucate score + add score to score broad object
        score = yatzyChecker[category]();
        const shorthand = category.slice(5);
        console.log("Score for " + shorthand + " is " + score);
        currentScoreboard.addScore(shorthand, score);
        // add score to html score broad
        const cellId = shorthand + PlayerTurn;
        console.log(cellId);
        const cell = document.querySelector(`[data-cell="${cellId}"]`);
        cell.textContent = score;
        // update total score
        const totalScore = currentScoreboard.calculateTotalScore();
        console.log(totalScore);
        const TotalcellId = "Total" + PlayerTurn;
        const Totalcell = document.querySelector(`[data-cell="${TotalcellId}"]`);
        Totalcell.textContent = totalScore;

        endTurn();
    }
}



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
            imageElement.src = "dice(" + number + ").png";
        });
    }
}



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