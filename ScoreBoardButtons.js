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