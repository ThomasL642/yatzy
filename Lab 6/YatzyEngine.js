class YatzyChecker {
    constructor(dice) {
        if (dice.length !== 5 || !dice.every(num => num >= 1 && num <= 6)) {
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

// Example usage:
const dice = [3, 5, 5, 5, 6];
const yatzyChecker = new YatzyChecker(dice);

console.log("Ones:", yatzyChecker.scoreOnes());
console.log("Twos:", yatzyChecker.scoreTwos());
console.log("Threes:", yatzyChecker.scoreThrees());
console.log("Three of a Kind:", yatzyChecker.scoreThreeOfAKind());
console.log("Four of a Kind:", yatzyChecker.scoreFourOfAKind());
console.log("Full House:", yatzyChecker.scoreFullHouse());
console.log("Small Straight:", yatzyChecker.scoreSmallStraight());
console.log("Large Straight:", yatzyChecker.scoreLargeStraight());
console.log("Chance:", yatzyChecker.scoreChance());
console.log("Yahtzee:", yatzyChecker.scoreYahtzee());

class YatzyScoreboard {
    constructor() {
        // Initialize all categories with null (unscored)
        this.scores = {
            ones: null,
            twos: null,
            threes: null,
            fours: null,
            fives: null,
            sixes: null,
            threeOfAKind: null,
            fourOfAKind: null,
            fullHouse: null,
            smallStraight: null,
            largeStraight: null,
            chance: null,
            yahtzee: null,
            yahtzeeBonus: 0 // Track Yahtzee bonus points if multiple Yahtzees
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
        const upperSection = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
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
            'threeOfAKind',
            'fourOfAKind',
            'fullHouse',
            'smallStraight',
            'largeStraight',
            'chance',
            'yahtzee'
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
        return upperScore + upperBonus + lowerScore + this.scores.yahtzeeBonus;
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

// Example usage:
const scoreboard = new YatzyScoreboard();

// Add scores to categories
scoreboard.addScore('ones', 3);          // 3 points in Ones
scoreboard.addScore('twos', 6);          // 6 points in Twos
scoreboard.addScore('threeOfAKind', 15); // 15 points in Three of a Kind
scoreboard.addScore('fullHouse', 25);    // 25 points in Full House
scoreboard.addScore('smallStraight', 30); // 30 points in Small Straight

// Add a Yahtzee and multiple Yahtzee bonuses
scoreboard.addScore('yahtzee', 50);      // First Yahtzee, scores 50
scoreboard.addYahtzeeBonus();            // Second Yahtzee, adds 100 bonus points
scoreboard.addYahtzeeBonus();            // Third Yahtzee, adds another 100 bonus points

// Display the scoreboard and total score
scoreboard.displayScoreboard();
