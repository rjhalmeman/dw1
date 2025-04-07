// Inicializando variáveis
let pontosJogador1 = 0;
let pontosJogador2 = 0;
let set1 = 0;
let set2 = 0;
const historicoLista = document.getElementById('historico-lista');
const set1Elemento = document.getElementById('set-1');
const set2Elemento = document.getElementById('set-2');
const pontosJogador1Elemento = document.getElementById('pontos-jogador-1');
const pontosJogador2Elemento = document.getElementById('pontos-jogador-2');
const nomeJogador1Elemento = document.getElementById('nome-jogador-1');
const nomeJogador2Elemento = document.getElementById('nome-jogador-2');

// Função para atualizar o placar na tela
function atualizarPlacar() {
  pontosJogador1Elemento.textContent = pontosJogador1;
  pontosJogador2Elemento.textContent = pontosJogador2;
  set1Elemento.textContent = set1;
  set2Elemento.textContent = set2;
}

// Função para registrar eventos no histórico
function registrarHistorico(evento) {
  const dataHora = new Date().toLocaleString();
  const historicoItem = document.createElement('li');
  historicoItem.textContent = `[${dataHora}] ${evento}`;
  historicoLista.appendChild(historicoItem);
  historicoLista.scrollTop = historicoLista.scrollHeight; // Rolando para o final
}

// Função para aumentar pontos
function aumentarPontos(jogador) {
  if (jogador === 1) {
    pontosJogador1++;
    registrarHistorico(`${nomeJogador1Elemento.value || "Time 1"} fez +1 ponto`);
  } else {
    pontosJogador2++;
    registrarHistorico(`${nomeJogador2Elemento.value || "Time 2"} fez +1 ponto`);
  }
  atualizarPlacar();
}

// Função para diminuir pontos
function diminuirPontos(jogador) {
  if (jogador === 1 && pontosJogador1 > 0) {
    pontosJogador1--;
    registrarHistorico(`${nomeJogador1Elemento.value || "Time 1"} fez -1 ponto`);
  } else if (jogador === 2 && pontosJogador2 > 0) {
    pontosJogador2--;
    registrarHistorico(`${nomeJogador2Elemento.value || "Time 2"} fez -1 ponto`);
  }
  atualizarPlacar();
}

// Função para aumentar set
function aumentarSet(set) {
  if (set === 1) {
    set1++;
    // Zera o placar dos jogadores ao aumentar o set
    pontosJogador1 = 0;
    pontosJogador2 = 0;
    registrarHistorico(`Set 1 aumentado. Placar zerado`);
  } else if (set === 2) {
    set2++;
    // Zera o placar dos jogadores ao aumentar o set
    pontosJogador1 = 0;
    pontosJogador2 = 0;
    registrarHistorico(`Set 2 aumentado. Placar zerado`);
  }
  atualizarPlacar();
}

// Função para diminuir set
function diminuirSet(set) {
  if (set === 1 && set1 > 0) {
    set1--;
    registrarHistorico(`Set 1 diminuído`);
  } else if (set === 2 && set2 > 0) {
    set2--;
    registrarHistorico(`Set 2 diminuído`);
  }
  atualizarPlacar();
}

// Função para zerar placar
function zerarPontos() {
  pontosJogador1 = 0;
  pontosJogador2 = 0;
  set1 = 0;
  set2 = 0;
  registrarHistorico(`Placar zerado`);
  atualizarPlacar();
}
