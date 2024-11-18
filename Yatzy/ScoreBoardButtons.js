//ScoreBoard Front End Logic
const scoreboardPlayer1 = new YatzyScoreboard();
const scoreboardPlayer2 = new YatzyScoreboard();

async function ScoreBoardButtons(category) {
    // No score can be made if no rolls have been made 
    TempNumberOfRolls = await fetchValue("NumberOfRolls");
    if (TempNumberOfRolls < 1){

    }else{
        TempPlayersTurn = await fetchValue("PlayerTurn");
        const currentScoreboard = TempPlayersTurn === 1 ? scoreboardPlayer1 : scoreboardPlayer2;
        const yatzyChecker = new YatzyChecker(rollHistory.getHistory());
        // calucate score + add score to score broad object
        score = yatzyChecker[category]();
        const shorthand = category.slice(5);
        currentScoreboard.addScore(shorthand, score);  ////this line adds to score 
        // add score to html score broad
        const cellId = shorthand + TempPlayersTurn;
        const cell = document.querySelector(`[data-cell="${cellId}"]`);
        cell.textContent = score;
        // update total score, sum and bonus
        const totalScore = currentScoreboard.calculateTotalScore();
        const totalCellId = "Total" + TempPlayersTurn;
        const totalCell = document.querySelector(`[data-cell="${totalCellId}"]`);
        totalCell.textContent = totalScore;

        const upperSum = currentScoreboard.calculateUpperSectionTotal();
        const sumCellId = "Sum" + TempPlayersTurn;
        const sumCell = document.querySelector(`[data-cell="${sumCellId}"]`);
        sumCell.textContent = upperSum;

        if (upperSum >= 63) {
            const bonusCellId = "Bonus" + TempPlayersTurn;
            const bonusCell = document.querySelector(`[data-cell="${bonusCellId}"]`);
            bonusCell.textContent = 35;
        }

        endTurn();
    }
}