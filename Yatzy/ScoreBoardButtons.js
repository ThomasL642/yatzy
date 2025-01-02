//ScoreBoard Front End Logic
//const scoreboardPlayer1 = new YatzyScoreboard();
//const scoreboardPlayer2 = new YatzyScoreboard();

async function ScoreBoardButtons(category) {
    // No score can be made if no rolls have been made 
    TempNumberOfRolls = await fetchValue("NumberOfRolls");
    if (TempNumberOfRolls < 1){

    }else{
        TempPlayersTurn = await fetchValue("PlayerTurn");
        let currentScoreboard = TempPlayersTurn === 1 ? await fetchValue("scoreboardPlayer1") : await fetchValue("scoreboardPlayer2");
        // Rehydrate into YatzyScoreboard instance
        currentScoreboard = Object.assign(new YatzyScoreboard(), currentScoreboard);
        
        console.log(currentScoreboard);
        console.log(currentScoreboard instanceof YatzyScoreboard);
        const playersroll = await rollHistory.getHistory();
        const yatzyChecker = new YatzyChecker(playersroll);
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
        TempPlayersTurn === 1 ? await updateValue("scoreboardPlayer1", currentScoreboard) : await updateValue("scoreboardPlayer2", currentScoreboard); 

        endTurn();
    }
}