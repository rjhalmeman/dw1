let pontosTime1 = 0;
let pontosTime2 = 0;
let historico = [];

const nomeTime1 = document.getElementById('time1');
const nomeTime2 = document.getElementById('time2');
const nomeTime1Placar = document.getElementById('nomeTime1');
const nomeTime2Placar = document.getElementById('nomeTime2');
const pontosTime1Placar = document.getElementById('pontosTime1');
const pontosTime2Placar = document.getElementById('pontosTime2');
const historicoList = document.getElementById('historico');

function atualizarNomeTimes() {
    nomeTime1Placar.textContent = nomeTime1.value || "Time 1";
    nomeTime2Placar.textContent = nomeTime2.value || "Time 2";
}

function adicionarPonto(time) {
    if (time === 'time1') {
        pontosTime1++;
        pontosTime1Placar.textContent = pontosTime1;
        historico.push(`${nomeTime1.value || "Time 1"} marcou um ponto`);
    } else if (time === 'time2') {
        pontosTime2++;
        pontosTime2Placar.textContent = pontosTime2;
        historico.push(`${nomeTime2.value || "Time 2"} marcou um ponto`);
    }
    atualizarHistorico();
}

function removerPonto(time) {
    if (time === 'time1' && pontosTime1 > 0) {
        pontosTime1--;
        pontosTime1Placar.textContent = pontosTime1;
        historico.push(`${nomeTime1.value || "Time 1"} perdeu um ponto`);
    } else if (time === 'time2' && pontosTime2 > 0) {
        pontosTime2--;
        pontosTime2Placar.textContent = pontosTime2;
        historico.push(`${nomeTime2.value || "Time 2"} perdeu um ponto`);
    }
    atualizarHistorico();
}

function zerarPlacar() {
    pontosTime1 = 0;
    pontosTime2 = 0;
    pontosTime1Placar.textContent = pontosTime1;
    pontosTime2Placar.textContent = pontosTime2;
    historico.push("O placar foi zerado");
    atualizarHistorico();
}

function zerarSet() {
    pontosTime1 = 0;
    pontosTime2 = 0;
    pontosTime1Placar.textContent = pontosTime1;
    pontosTime2Placar.textContent = pontosTime2;
    historico.push("O set foi zerado");
    atualizarHistorico();
}

function atualizarHistorico() {
    historicoList.innerHTML = "";
    historico.forEach(acao => {
        const li = document.createElement("li");
        li.textContent = acao;
        historicoList.appendChild(li);
    });
}

// Atualiza os nomes dos times ao digitar nos campos
nomeTime1.addEventListener('input', atualizarNomeTimes);
nomeTime2.addEventListener('input', atualizarNomeTimes);
