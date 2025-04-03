let scoreA = 0;
let scoreB = 0;
let setsA = 0;
let setsB = 0;
let history = [];

function updateScore() {
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
    document.getElementById('setsA').innerText = setsA;
    document.getElementById('setsB').innerText = setsB;
}

function addPoint(team) {
    const now = new Date();
    const timeStamp = now.toLocaleString();

    if (team === 'A') {
        scoreA++;
        history.push(`🏐 Time A marcou 1 ponto às ${timeStamp}`);
    } else if (team === 'B') {
        scoreB++;
        history.push(`🏐 Time B marcou 1 ponto às ${timeStamp}`);
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
    if (scoreA >= 25 && scoreA - scoreB >= 2) {
        setsA++;
        history.push(`🏆 Time A venceu o set (${setsA}º Set)`);
        resetSet();
    } else if (scoreB >= 25 && scoreB - scoreA >= 2) {
        setsB++;
        history.push(`🏆 Time B venceu o set (${setsB}º Set)`);
        resetSet();
    }
}

function resetSet() {
    scoreA = 0;
    scoreB = 0;
    updateScore();
}

function resetScore() {
    scoreA = 0;
    scoreB = 0;
    setsA = 0;
    setsB = 0;
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

    // Faz o histórico rolar automaticamente para o último item adicionado
    historyList.scrollTop = historyList.scrollHeight;
}
