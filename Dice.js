class Roll {
    constructor(min = 1, max = 6) {
        this.min = min;
        this.max = max;
        this.result = this.roll();
    }

    roll() {
        this.result = Math.floor(Math.random() * this.max) + this.min;
        return this.result;
    }
}

class RollHistory {
    constructor() {
        this.history = [];
    }

    addRoll(roll) {
        this.history.push(roll);
    }

    getHistory() {
        return this.history;
    }

    clearHistory() {
        this.history = [];
    }
    
}

// Usage example
const roll = new Roll(); // Create a new roll instance
const rollHistory = new RollHistory(); // Create a new roll history instance

// Roll multiple times and add each result to history
for (let i = 0; i < 5; i++) {
    roll.roll(); // Generate a new roll
    rollHistory.addRoll(roll.result); // Add the roll to history
}

console.log("Roll History:", rollHistory.getHistory()); // Display the roll history
rollHistory.clearHistory(); // Clear history
console.log("History after clearing:", rollHistory.getHistory());