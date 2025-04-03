let pointsA = 0;
let pointsB = 0;
let setsA = 0;
let setsB = 0;

function updateDisplay() {
    document.getElementById("pointsA").innerText = pointsA;
    document.getElementById("pointsB").innerText = pointsB;
    document.getElementById("setsA").innerText = setsA;
    document.getElementById("setsB").innerText = setsB;
}

function addPoint(team) {
    if (team === 'A') {
        pointsA++;
    } else {
        pointsB++;
    }

    logHistory(team);
    checkSetWin();
    updateDisplay();
}

function removePoint(team) {
    if (team === 'A' && pointsA > 0) {
        pointsA--;
    } else if (team === 'B' && pointsB > 0) {
        pointsB--;
    }

    updateDisplay();
}

function checkSetWin() {
    let maxPoints = (setsA === 2 && setsB === 2) ? 15 : 26;

    if (pointsA >= maxPoints && (pointsA - pointsB) >= 2) {
        setsA++;
        resetPoints();
    } else if (pointsB >= maxPoints && (pointsB - pointsA) >= 2) {
        setsB++;
        resetPoints();
    }

    checkGameWin();
}

function resetPoints() {
    pointsA = 0;
    pointsB = 0;
}

function checkGameWin() {
    if (setsA === 3) {
        announceWinner("A");
    } else if (setsB === 3) {
        announceWinner("B");
    }
}

function announceWinner(winner) {
    let winnerDiv = document.getElementById(`team${winner}`);
    let loserDiv = document.getElementById(`team${winner === "A" ? "B" : "A"}`);

    winnerDiv.classList.add("winner");
    loserDiv.classList.add("loser");

    startConfetti();
}

function resetGame() {
    pointsA = 0;
    pointsB = 0;
    setsA = 0;
    setsB = 0;
    document.getElementById("history").innerHTML = "";

    let teamA = document.getElementById("teamA");
    let teamB = document.getElementById("teamB");
    teamA.classList.remove("winner", "loser");
    teamB.classList.remove("winner", "loser");

    stopConfetti();
    updateDisplay();
}

function startConfetti() {
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        document.body.appendChild(confetti);

        // Posição e cores aleatórias
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-10px";  // Começa um pouco acima da tela
        confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
        confetti.style.backgroundColor = randomColor();

        // Tamanho aleatório
        let size = Math.random() * 10 + 5 + "px";
        confetti.style.width = size;
        confetti.style.height = size;
    }

    // Parar confetes após 5 segundos
    setTimeout(stopConfetti, 5000);
}

function stopConfetti() {
    document.querySelectorAll(".confetti").forEach(confetti => confetti.remove());
}

function randomColor() {
    let colors = ["#ff0", "#ff4500", "#00ff00", "#00bcd4", "#ff69b4", "#ff1493"];
    return colors[Math.floor(Math.random() * colors.length)];
}



function logHistory(team) {
    let now = new Date();
    let timeString = now.toLocaleTimeString();
    let history = document.getElementById("history");
    let entry = document.createElement("li");

    entry.innerText = `Time ${team} marcou ponto às ${timeString}`;
    history.appendChild(entry);
}

updateDisplay();


