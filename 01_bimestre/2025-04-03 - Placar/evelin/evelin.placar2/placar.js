// Variáveis para os pontos, sets e histórico
let pontosTime1 = 0;
let pontosTime2 = 0;
let setsTime1 = 0;
let setsTime2 = 0;
let historico = [];  // Histórico de pontos registrados (mais detalhado)
let nomeTime1 = 'Time 1';
let nomeTime2 = 'Time 2';

// Funções de contagem de pontos no sistema de Beach Tennis
const pontosBeachTennis = [0, 15, 30, 40];

// Função para atualizar o placar
function atualizarPlacar() {
    document.getElementById('pontosTime1').textContent = pontosBeachTennis[pontosTime1];
    document.getElementById('pontosTime2').textContent = pontosBeachTennis[pontosTime2];
    document.getElementById('setTime1').textContent = setsTime1;
    document.getElementById('setTime2').textContent = setsTime2;
    document.getElementById('nomeTime1Exibido').textContent = nomeTime1;
    document.getElementById('nomeTime2Exibido').textContent = nomeTime2;
}

// Função para registrar um ponto
function registrarPonto(time) {
    if (time === 1) {
        pontosTime1 = (pontosTime1 + 1) % 4;
        historico.push({ time: nomeTime1, pontosTime1, pontosTime2 });
    } else {
        pontosTime2 = (pontosTime2 + 1) % 4;
        historico.push({ time: nomeTime2, pontosTime1, pontosTime2 });
    }

    // Verificar se alguém venceu o game (precisa de 4 pontos e pelo menos 2 de diferença)
    if (pontosTime1 === 3 && pontosTime1 - pontosTime2 >= 1) {
        setsTime1++;
        pontosTime1 = 0;
        pontosTime2 = 0;
        historico.push({ time: nomeTime1, pontosTime1, pontosTime2, evento: 'game' });
    } else if (pontosTime2 === 3 && pontosTime2 - pontosTime1 >= 1) {
        setsTime2++;
        pontosTime1 = 0;
        pontosTime2 = 0;
        historico.push({ time: nomeTime2, pontosTime1, pontosTime2, evento: 'game' });
    }

    // Verificar se alguém venceu o set (precisa de 6 pontos e pelo menos 2 de diferença)
    if (setsTime1 >= 6 && setsTime1 - setsTime2 >= 2) {
        historico.push({ time: nomeTime1, evento: 'set' });
        pontosTime1 = 0;
        pontosTime2 = 0;
        setsTime1 = 0;
        setsTime2 = 0;
        mostrarVitoria(nomeTime1);
    } else if (setsTime2 >= 6 && setsTime2 - setsTime1 >= 2) {
        historico.push({ time: nomeTime2, evento: 'set' });
        pontosTime1 = 0;
        pontosTime2 = 0;
        setsTime1 = 0;
        setsTime2 = 0;
        mostrarVitoria(nomeTime2);
    }

    atualizarPlacar();
    atualizarHistorico();
}

// Função para retroceder o ponto
function retrocederPonto() {
    if (historico.length > 0) {
        // Remover o último ponto do histórico
        let ultimoPonto = historico.pop();
        alert(`Retrocedido: ${ultimoPonto.time} - Placar: ${pontosBeachTennis[ultimoPonto.pontosTime1]} x ${pontosBeachTennis[ultimoPonto.pontosTime2]}`);

        // Recuperar os pontos anteriores
        let pontosAnteriores = historico[historico.length - 1] || { pontosTime1: 0, pontosTime2: 0 };
        pontosTime1 = pontosAnteriores.pontosTime1;
        pontosTime2 = pontosAnteriores.pontosTime2;

        // Atualizar o placar
        atualizarPlacar();
        atualizarHistorico();
    }
}

// Função para zerar o placar
function zerarPlacar() {
    pontosTime1 = 0;
    pontosTime2 = 0;
    setsTime1 = 0;
    setsTime2 = 0;
    historico = [];
    document.getElementById('vitoria').style.display = 'none';
    atualizarPlacar();
    atualizarHistorico();
}

// Função para apagar o histórico de pontos
function apagarHistorico() {
    historico = [];  // Limpa o histórico
    atualizarPlacar();
    atualizarHistorico();
}

// Função para atualizar o histórico
function atualizarHistorico() {
    const listaHistorico = document.getElementById('listaHistorico');
    listaHistorico.innerHTML = ''; // Limpa a lista
    historico.forEach(item => {
        const li = document.createElement('li');
        if (item.evento === 'game') {
            li.textContent = `${item.time} ganhou o game!`;
        } else if (item.evento === 'set') {
            li.textContent = `${item.time} venceu o set!`;
        } else {
            li.textContent = `${item.time} fez um ponto!`;
        }
        listaHistorico.appendChild(li);
    });
}

// Função para definir os nomes dos times
function definirNomes() {
    const nomeTime1Input = document.getElementById('nomeTime1').value;
    const nomeTime2Input = document.getElementById('nomeTime2').value;

    if (nomeTime1Input && nomeTime2Input) {
        nomeTime1 = nomeTime1Input;
        nomeTime2 = nomeTime2Input;
    } else {
        alert('Por favor, insira os nomes de ambos os times.');
    }
    atualizarPlacar();
}

// Função para mostrar a vitória com troféu e confetes
function mostrarVitoria(timeVencedor) {
    const vitoriaDiv = document.getElementById('vitoria');
    vitoriaDiv.style.display = 'block';
    document.getElementById('vitoriaTexto').textContent = `${timeVencedor} venceu o set!`;

    // Disparar os confetes
    confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Adicionar eventos aos botões
document.getElementById('adicionarTime1').addEventListener('click', () => registrarPonto(1));
document.getElementById('adicionarTime2').addEventListener('click', () => registrarPonto(2));
document.getElementById('retrocederPonto').addEventListener('click', retrocederPonto);
document.getElementById('zerarPlacar').addEventListener('click', zerarPlacar);
document.getElementById('apagarHistorico').addEventListener('click', apagarHistorico);  // Evento do botão de apagar histórico
document.getElementById('definirNomes').addEventListener('click', definirNomes);
