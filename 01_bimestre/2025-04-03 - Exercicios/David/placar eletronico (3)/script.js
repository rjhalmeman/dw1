let scoreA = 0;
let scoreB = 0;
let setScore = 0;
let setsWonA = 0;
let setsWonB = 0;
let history = [];

// Atualiza o placar e os nomes dos times na interface
function updateScore() {
    document.getElementById('scoreA').textContent = scoreA.toString().padStart(2, '0');
    document.getElementById('scoreB').textContent = scoreB.toString().padStart(2, '0');
    document.getElementById('setScore').textContent = setScore;
    document.getElementById('setsWonA').textContent = setsWonA;
    document.getElementById('setsWonB').textContent = setsWonB;
    updateHistory();
}

// Atualiza o nome dos times no placar
function updateTeamNames() {
    let nameA = document.getElementById('teamNameA').value.trim() || 'Time A';
    let nameB = document.getElementById('teamNameB').value.trim() || 'Time B';

    document.getElementById('teamA-name').textContent = nameA;
    document.getElementById('teamB-name').textContent = nameB;
}

// Adiciona entrada ao histórico
function addHistoryEntry(entry) {
    history.push(entry);
    updateHistory();
}

// Atualiza o histórico de pontos
function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = "";
    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
    });
}

// Função para obter o nome atualizado do time
function getTeamName(team) {
    return document.getElementById(`teamName${team}`).value.trim() || `Time ${team}`;
}

// Aumentar pontuação
function increaseScore(team) {
    let teamName = getTeamName(team);
    if (team === 'A') {
        scoreA++;
    } else {
        scoreB++;
    }
    addHistoryEntry(`${teamName} marcou um ponto.`);
    updateScore();
}

// Diminuir pontuação
function decreaseScore(team) {
    let teamName = getTeamName(team);
    if (team === 'A' && scoreA > 0) {
        scoreA--;
    } else if (team === 'B' && scoreB > 0) {
        scoreB--;
    }
    addHistoryEntry(`${teamName} perdeu um ponto.`);
    updateScore();
}

// Resetar pontuação
function resetScore(team) {
    let teamName = getTeamName(team);
    if (team === 'A') {
        scoreA = 0;
    } else {
        scoreB = 0;
    }
    addHistoryEntry(`Placar de ${teamName} foi resetado.`);
    updateScore();
}

// Aumentar sets ganhos
function increaseSet(team) {
    let teamName = getTeamName(team);
    if (team === 'A') {
        setsWonA++;
    } else {
        setsWonB++;
    }
    setScore++;
    addHistoryEntry(`${teamName} ganhou um set.`);
    updateScore();
}

// Resetar sets
function resetSet() {
    setScore = 0;
    setsWonA = 0;
    setsWonB = 0;
    addHistoryEntry(`Todos os sets foram resetados.`);
    updateScore();
}

// Alternar visibilidade do histórico
document.getElementById("toggleHistory").addEventListener("click", function () {
    document.getElementById("historyContainer").classList.toggle("hidden");
});

// Atualizar os nomes dos times em tempo real
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("teamNameA").addEventListener("input", updateTeamNames);
    document.getElementById("teamNameB").addEventListener("input", updateTeamNames);
});

// Inicializar o placar corretamente
updateScore();
updateTeamNames();
function updateTeamName(team) {
    let input = document.getElementById(`teamName${team}`).value;
    let display = document.getElementById(`displayTeam${team}`);
    if (input.trim() !== "") {
        display.innerHTML = `${input} <span class="sets-won" id="setsWon${team}">${team === 'A' ? setsWonA : setsWonB}</span>`;
    } else {
        display.innerHTML = `Time ${team} <span class="sets-won" id="setsWon${team}">${team === 'A' ? setsWonA : setsWonB}</span>`;
    }
}
