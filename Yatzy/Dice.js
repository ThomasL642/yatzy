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
        addData("RollHistory", []);
    }

    async addRoll(roll) {
        this.history = await fetchValue("RollHistory");
        this.history.push(roll);
        await updateValue("RollHistory", this.history);
    }

    async getHistory() {
        //return this.history;
        return await fetchValue("RollHistory");
    }

    async clearHistory() {
        this.history = [];
        await updateValue("RollHistory", []);
    }
    
}

