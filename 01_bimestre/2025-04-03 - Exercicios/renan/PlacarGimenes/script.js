let pointsTeam1 = 0;
let pointsTeam2 = 0;
let setsTeam1 = 0;
let setsTeam2 = 0;
let history = [];
let maxPoints = 25;

function updateTeamNames() {
    const team1Name = document.getElementById('team1Name').value || 'Equipe 1';
    const team2Name = document.getElementById('team2Name').value || 'Equipe 2';
    document.getElementById('team1Display').textContent = team1Name;
    document.getElementById('team2Display').textContent = team2Name;
}

function addPoint(team) {
    if (team === 1) {
        pointsTeam1++;
        document.getElementById('pointsTeam1').innerText = pointsTeam1;
    } else if (team === 2) {
        pointsTeam2++;
        document.getElementById('pointsTeam2').innerText = pointsTeam2;
    }
    checkForSetWinner();
    updateHistory();
}

function subtractPoint(team) {
    if (team === 1 && pointsTeam1 > 0) {
        pointsTeam1--;
        document.getElementById('pointsTeam1').innerText = pointsTeam1;
    } else if (team === 2 && pointsTeam2 > 0) {
        pointsTeam2--;
        document.getElementById('pointsTeam2').innerText = pointsTeam2;
    }
}

function checkForSetWinner() {
    if (setsTeam1 === 1 && setsTeam2 === 1) {
        maxPoints = 15; // Se o jogo estiver 1x1 em sets, o terceiro set vai até 15 pontos
    }

    if (pointsTeam1 >= maxPoints && pointsTeam1 - pointsTeam2 >= 2) {
        setsTeam1++;
        document.getElementById('setsText').innerText = `${setsTeam1} x ${setsTeam2}`;
        resetPoints();
        addToHistory(`${document.getElementById('team1Display').textContent} venceu um set`);
    } else if (pointsTeam2 >= maxPoints && pointsTeam2 - pointsTeam1 >= 2) {
        setsTeam2++;
        document.getElementById('setsText').innerText = `${setsTeam1} x ${setsTeam2}`;
        resetPoints();
        addToHistory(`${document.getElementById('team2Display').textContent} venceu um set`);
    }
}

function resetPoints() {
    pointsTeam1 = 0;
    pointsTeam2 = 0;
    document.getElementById('pointsTeam1').innerText = pointsTeam1;
    document.getElementById('pointsTeam2').innerText = pointsTeam2;
    maxPoints = 25; // Reseta o limite de pontos para 25 após cada set
}

function addToHistory(message) {
    const date = new Date();
    const time = date.toLocaleString();
    history.push(`${time}: ${message}`);
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach((entry) => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Atualiza os nomes dos times sempre que houver alteração nos inputs
document.getElementById('team1Name').addEventListener('input', updateTeamNames);
document.getElementById('team2Name').addEventListener('input', updateTeamNames);
