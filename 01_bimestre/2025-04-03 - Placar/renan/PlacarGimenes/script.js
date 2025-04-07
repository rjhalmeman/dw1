let pointsTeam1 = 0;
let pointsTeam2 = 0;
let setsTeam1 = 0;
let setsTeam2 = 0;
let history = [];
let maxPoints = 25;
let setsToWin = 3; // Número de sets para vencer, configurado pelo usuário

// Função para atualizar os nomes dos times
function updateTeamNames() {
  const team1Name = document.getElementById('team1Name').value || 'Equipe 1';
  const team2Name = document.getElementById('team2Name').value || 'Equipe 2';
  document.getElementById('team1Display').textContent = team1Name;
  document.getElementById('team2Display').textContent = team2Name;
}

// Função para adicionar pontos a um time
function addPoint(team) {
  if (gameOver()) return;

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

// Função para subtrair pontos de um time
function subtractPoint(team) {
  if (gameOver()) return;

  if (team === 1 && pointsTeam1 > 0) {
    pointsTeam1--;
    document.getElementById('pointsTeam1').innerText = pointsTeam1;
  } else if (team === 2 && pointsTeam2 > 0) {
    pointsTeam2--;
    document.getElementById('pointsTeam2').innerText = pointsTeam2;
  }
}

// Função para verificar se houve vencedor de set
function checkForSetWinner() {
  if (gameOver()) return;

  let totalSets = setsTeam1 + setsTeam2 + 1;
  const isTieBreakerSet = (setsToWin === 2 && setsTeam1 === 1 && setsTeam2 === 1) ||
                          (setsToWin === 3 && setsTeam1 === 2 && setsTeam2 === 2);
  const currentMaxPoints = isTieBreakerSet ? 15 : 25;

  if (pointsTeam1 >= currentMaxPoints && pointsTeam1 - pointsTeam2 >= 2) {
    setsTeam1++;
    document.getElementById('setsText').innerText = `${setsTeam1} x ${setsTeam2}`;
    resetPoints();
    addToHistory(`${document.getElementById('team1Display').textContent} venceu um set`);
  } else if (pointsTeam2 >= currentMaxPoints && pointsTeam2 - pointsTeam1 >= 2) {
    setsTeam2++;
    document.getElementById('setsText').innerText = `${setsTeam1} x ${setsTeam2}`;
    resetPoints();
    addToHistory(`${document.getElementById('team2Display').textContent} venceu um set`);
  }

  if (setsTeam1 === setsToWin) {
    endGame(`${document.getElementById('team1Display').textContent} venceu o jogo!`);
  } else if (setsTeam2 === setsToWin) {
    endGame(`${document.getElementById('team2Display').textContent} venceu o jogo!`);
  }
}

// Função para resetar os pontos após cada set
function resetPoints() {
  pointsTeam1 = 0;
  pointsTeam2 = 0;
  document.getElementById('pointsTeam1').innerText = pointsTeam1;
  document.getElementById('pointsTeam2').innerText = pointsTeam2;
}

// Função para adicionar histórico de ações
function addToHistory(message) {
  const date = new Date();
  const time = date.toLocaleString();
  history.push(`${time}: ${message}`);
}

// Função para atualizar o histórico na interface
function updateHistory() {
  const historyList = document.getElementById('historyList');
  historyList.innerHTML = '';
  history.forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    historyList.appendChild(li);
  });
}

// Função para iniciar ou reiniciar o jogo
function restartGame() {
  pointsTeam1 = 0;
  pointsTeam2 = 0;
  setsTeam1 = 0;
  setsTeam2 = 0;
  document.getElementById('pointsTeam1').innerText = pointsTeam1;
  document.getElementById('pointsTeam2').innerText = pointsTeam2;
  document.getElementById('setsText').innerText = '0 x 0';
  history = [];
  updateHistory();
  document.getElementById('statusText').textContent = 'Jogo em andamento...';
  document.getElementById('restartBtn').style.display = 'none';
}

// Função para exibir o status de fim de jogo
function endGame(message) {
  document.getElementById('statusText').textContent = message;
  document.getElementById('restartBtn').style.display = 'block';
}

// Função para verificar se o jogo acabou
function gameOver() {
  return setsTeam1 === setsToWin || setsTeam2 === setsToWin;
}

// Atualiza a configuração do número de sets para vencer
const setsInput = document.getElementById('setsToWin');
setsInput.addEventListener('input', function () {
  setsToWin = parseInt(setsInput.value);
  restartGame();
});

// Atualiza os nomes dos times sempre que houver alteração nos inputs
document.getElementById('team1Name').addEventListener('input', updateTeamNames);
document.getElementById('team2Name').addEventListener('input', updateTeamNames);
