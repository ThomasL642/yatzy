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
            Yahtzee: null
        };
    }

    // Methods to add scores for each category
    addScore(category, score) {
        if (category == 'Yahtzee' && this.scores['Yahtzee'] == 50) {
            this.addYahtzeeBonus();
        }
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
        this.scores.Yahtzee += 100;
    }

    // Display the scoreboard in console
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