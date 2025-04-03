let scoreA = 0;
let scoreB = 0;
let setsA = 0;
let setsB = 0;
let currentSet = 1;
let history = [];

function updateScore() {
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
    document.getElementById('setsA').innerText = setsA;
    document.getElementById('setsB').innerText = setsB;
    document.getElementById('currentSet').innerText = currentSet;
}

function addPoint(team) {
    const now = new Date();
    const timeStamp = now.toLocaleString();
    let teamName = document.getElementById(team === 'A' ? 'teamA' : 'teamB').innerText;

    if (team === 'A') {
        scoreA++;
        history.push(`🏐 ${teamName} marcou 1 ponto às ${timeStamp}`);
    } else {
        scoreB++;
        history.push(`🏐 ${teamName} marcou 1 ponto às ${timeStamp}`);
    }

    checkSetWin();
    updateScore();
    updateHistoryUI();
}

function removePoint(team) {
    if (team === 'A' && scoreA > 0) {
        scoreA--;
    } else if (team === 'B' && scoreB > 0) {
        scoreB--;
    }
    updateScore();
}

function checkSetWin() {
    let teamAName = document.getElementById('teamA').innerText;
    let teamBName = document.getElementById('teamB').innerText;

    if (scoreA >= 25 && scoreA - scoreB >= 2) {
        setsA++;
        history.push(`🏆 ${teamAName} venceu o set ${currentSet}`);
        nextSet();
    } else if (scoreB >= 25 && scoreB - scoreA >= 2) {
        setsB++;
        history.push(`🏆 ${teamBName} venceu o set ${currentSet}`);
        nextSet();
    }
}

function nextSet() {
    scoreA = 0;
    scoreB = 0;
    currentSet++;
    updateScore();
}

function resetSets() {
    setsA = 0;
    setsB = 0;
    currentSet = 1;
    history.push(`🔄 Reset dos Sets às ${new Date().toLocaleString()}`);
    updateScore();
    updateHistoryUI();
}

function resetScore() {
    scoreA = 0;
    scoreB = 0;
    setsA = 0;
    setsB = 0;
    currentSet = 1;
    history.push(`❌ Placar zerado em ${new Date().toLocaleString()}`);
    updateScore();
    updateHistoryUI();
}

function updateHistoryUI() {
    let historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    history.forEach((item) => {
        let li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });

    historyList.scrollTop = historyList.scrollHeight;
}

// Salvar nomes dos times no localStorage
function saveTeamNames() {
    localStorage.setItem('teamA', document.getElementById('teamA').innerText);
    localStorage.setItem('teamB', document.getElementById('teamB').innerText);
}

// Carregar nomes dos times salvos ao iniciar
function loadTeamNames() {
    let savedA = localStorage.getItem('teamA');
    let savedB = localStorage.getItem('teamB');

    if (savedA) document.getElementById('teamA').innerText = savedA;
    if (savedB) document.getElementById('teamB').innerText = savedB;
}

// Eventos para salvar nomes automaticamente quando o usuário editar
document.getElementById('teamA').addEventListener('blur', saveTeamNames);
document.getElementById('teamB').addEventListener('blur', saveTeamNames);

// Carregar nomes ao iniciar
loadTeamNames();
