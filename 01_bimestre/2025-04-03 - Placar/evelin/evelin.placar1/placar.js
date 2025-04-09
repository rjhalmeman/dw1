// Variáveis para os pontos, sets e histórico
let pontosTime1 = 0;
let pontosTime2 = 0;
let setsTime1 = 0;
let setsTime2 = 0;
let historico = [];
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
        pontosTime1 = (pontosTime1 + 1) % 4;  // Progresso nos pontos (0, 15, 30, 40)
    } else {
        pontosTime2 = (pontosTime2 + 1) % 4;
    }

    // Verificar se alguém venceu o game (precisa de 4 pontos e pelo menos 2 de diferença)
    if (pontosTime1 === 3 && pontosTime1 - pontosTime2 >= 1) {
        setsTime1++;
        pontosTime1 = 0;
        pontosTime2 = 0;
        historico.push(`${nomeTime1} ganhou o game em ${new Date().toLocaleString()}`);
    } else if (pontosTime2 === 3 && pontosTime2 - pontosTime1 >= 1) {
        setsTime2++;
        pontosTime1 = 0;
        pontosTime2 = 0;
        historico.push(`${nomeTime2} ganhou o game em ${new Date().toLocaleString()}`);
    }

    // Verificar se alguém venceu o set (precisa de 6 pontos e pelo menos 2 de diferença)
    if (setsTime1 >= 6 && setsTime1 - setsTime2 >= 2) {
        historico.push(`${nomeTime1} venceu o set em ${new Date().toLocaleString()}`);
        pontosTime1 = 0;
        pontosTime2 = 0;
        setsTime1 = 0;
        setsTime2 = 0;
    } else if (setsTime2 >= 6 && setsTime2 - setsTime1 >= 2) {
        historico.push(`${nomeTime2} venceu o set em ${new Date().toLocaleString()}`);
        pontosTime1 = 0;
        pontosTime2 = 0;
        setsTime1 = 0;
        setsTime2 = 0;
    }

    atualizarPlacar();
    atualizarHistorico();
}

// Função para retroceder o ponto
function retrocederPonto() {
    if (historico.length > 0) {
        let ultimoPonto = historico.pop();
        alert(`Retrocedido: ${ultimoPonto}`);
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
    atualizarPlacar();
    atualizarHistorico();
}

// Função para atualizar o histórico
function atualizarHistorico() {
    const listaHistorico = document.getElementById('listaHistorico');
    listaHistorico.innerHTML = ''; // Limpa a lista
    historico.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
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

// Adicionar eventos aos botões
document.getElementById('adicionarTime1').addEventListener('click', () => registrarPonto(1));
document.getElementById('adicionarTime2').addEventListener('click', () => registrarPonto(2));
document.getElementById('retrocederPonto').addEventListener('click', retrocederPonto);
document.getElementById('zerarPlacar').addEventListener('click', zerarPlacar);
document.getElementById('definirNomes').addEventListener('click', definirNomes);
