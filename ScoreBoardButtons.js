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
        // calucate score + add score to score broad object
        score = yatzyChecker[category]();
        const shorthand = category.slice(5);
        currentScoreboard.addScore(shorthand, score);
        // add score to html score broad
        const cellId = shorthand + PlayerTurn;
        const cell = document.querySelector(`[data-cell="${cellId}"]`);
        cell.textContent = score;
        // update total score, sum and bonus
        const totalScore = currentScoreboard.calculateTotalScore();
        const totalCellId = "Total" + PlayerTurn;
        const totalCell = document.querySelector(`[data-cell="${totalCellId}"]`);
        totalCell.textContent = totalScore;

        const upperSum = currentScoreboard.calculateUpperSectionTotal();
        const sumCellId = "Sum" + PlayerTurn;
        const sumCell = document.querySelector(`[data-cell="${sumCellId}"]`);
        sumCell.textContent = upperSum;

        if (upperSum >= 63) {
            const bonusCellId = "Bonus" + PlayerTurn;
            const bonusCell = document.querySelector(`[data-cell="${bonusCellId}"]`);
            bonusCell.textContent = 35;
        }

        endTurn();
    }
}