let pontos = { A: 0, B: 0 };
let sets = { A: 0, B: 0 };

function alterarPontos(time, valor) {
    if (pontos[time] + valor >= 0) {
        pontos[time] += valor;
        atualizarPlacar();
        registrarHistorico(time, valor);
        if (pontos[time] >= 25) {
            sets[time] += 1;
            pontos.A = 0;
            pontos.B = 0;
            atualizarPlacar();
        }
    }
}

function atualizarPlacar() {
    document.getElementById('pontosA').innerText = formatarNumero(pontos.A);
    document.getElementById('pontosB').innerText = formatarNumero(pontos.B);
    document.getElementById('setsA').innerText = sets.A;
    document.getElementById('setsB').innerText = sets.B;
    document.getElementById('displayNomeA').innerText = document.getElementById('nomeTimeA').value || "Time A";
    document.getElementById('displayNomeB').innerText = document.getElementById('nomeTimeB').value || "Time B";
}

function formatarNumero(num) {
    return num < 10 ? '0' + num : num;
}

function registrarHistorico(time, valor) {
    const lista = document.getElementById("historicoLista");
    const item = document.createElement("li");
    const dataHora = new Date().toLocaleString();
    const nomeTime = document.getElementById(`nomeTime${time}`).value || `Time ${time}`;
    item.innerText = `${dataHora} - ${nomeTime} ${valor > 0 ? '+' : ''}${valor} ponto(s)`;
    lista.prepend(item);
}
function resetPlacar() {
    pontos = { A: 0, B: 0 };
    sets = { A: 0, B: 0 };
    document.getElementById('historicoLista').innerHTML = '';
    atualizarPlacar();
}

function registrarHistorico(time, valor) {
    const tabela = document.getElementById("historicoLista");
    const linha = document.createElement("tr");
    const dataHora = new Date().toLocaleString();
    const nomeTime = document.getElementById(`nomeTime${time}`).value || `Time ${time}`;
    linha.innerHTML = `<td>${dataHora}</td><td>${nomeTime}</td><td>${valor > 0 ? '+' : ''}${valor} ponto(s)</td>`;
    tabela.prepend(linha);
}
