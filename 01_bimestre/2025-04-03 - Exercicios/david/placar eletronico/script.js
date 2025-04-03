let scoreA = 0;
let scoreB = 0;
let setScore = 0;
let setsWonA = 0;
let setsWonB = 0;

function updateScore() {
    document.getElementById('scoreA').textContent = scoreA.toString().padStart(2, '0');
    document.getElementById('scoreB').textContent = scoreB.toString().padStart(2, '0');
    document.getElementById('setScore').textContent = setScore;
    document.getElementById('setsWonA').textContent = setsWonA;
    document.getElementById('setsWonB').textContent = setsWonB;
}

function increaseScore(team) {
    if (team === 'A') {
        scoreA++;
    } else {
        scoreB++;
    }
    updateScore();
}

function decreaseScore(team) {
    if (team === 'A' && scoreA > 0) {
        scoreA--;
    } else if (team === 'B' && scoreB > 0) {
        scoreB--;
    }
    updateScore();
}

function resetScore(team) {
    if (team === 'A') {
        scoreA = 0;
    } else {
        scoreB = 0;
    }
    updateScore();
}

function increaseSet(team) {
    if (team === 'A') {
        setsWonA++;
    } else {
        setsWonB++;
    }
    setScore++;
    updateScore();
}

function resetSet() {
    setScore = 0;
    setsWonA = 0;
    setsWonB = 0;
    updateScore();
}

function updateTeamName(team) {
    let newName = document.getElementById(`teamName${team}`).value;
    document.getElementById(`displayTeam${team}`).innerHTML = newName + ` <span class="sets-won" id="setsWon${team}">${team === 'A' ? setsWonA : setsWonB}</span>`;
}

updateScore();
