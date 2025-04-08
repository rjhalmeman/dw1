
let pontosTime1 = 0;
let pontosTime2 = 0;
let setsTime1 = 0;
let setsTime2 = 0;
let historicoPartidas = [];


const placarTime1 = document.querySelector('.primeiro');
const placarTime2 = document.querySelector('.segundo');
const setsDisplays = document.querySelectorAll('.sets');
const nomeTime1Display = document.getElementById('time1');
const nomeTime2Display = document.getElementById('time2');
const historicoList = document.querySelector('.historico');


function atualizarPlacar() {
    placarTime1.textContent = pontosTime1.toString().padStart(2, '0');
    placarTime2.textContent = pontosTime2.toString().padStart(2, '0');
    setsDisplays[0].textContent = setsTime1;
    setsDisplays[1].textContent = setsTime2;
}


function adicionarAoHistorico(mensagem) {
    const agora = new Date();
    const hora = agora.toLocaleTimeString();
    const data = agora.toLocaleDateString();
    
    const itemHistorico = document.createElement('li');
    itemHistorico.textContent = `${data} ${hora} - ${mensagem}`;
    itemHistorico.style.margin = '8px 0';
    itemHistorico.style.padding = '4px';
    itemHistorico.style.borderBottom = '1px solid #ccc';

    historicoList.insertBefore(itemHistorico, historicoList.children[1]);
    

    historicoPartidas.unshift(`${data} ${hora} - ${mensagem}`);
}
function verificarSets() {

    if (pontosTime1 >= 25 && (pontosTime1 - pontosTime2) >= 2) {
        setsTime1++;
        adicionarAoHistorico(`${nomeTime1Display.textContent} ganhou o set ${setsTime1} (${pontosTime1}-${pontosTime2})`);
        pontosTime1 = 0;
        pontosTime2 = 0;
    }
    

    if (pontosTime2 >= 25 && (pontosTime2 - pontosTime1) >= 2) {
        setsTime2++;
        adicionarAoHistorico(`${nomeTime2Display.textContent} ganhou o set ${setsTime2} (${pontosTime1}-${pontosTime2})`);
        pontosTime1 = 0;
        pontosTime2 = 0;
    }

    if (pontosTime1 >= 24 && pontosTime2 >= 24 && Math.abs(pontosTime1 - pontosTime2) === 2) {
        if (pontosTime1 > pontosTime2) {
            setsTime1++;
            adicionarAoHistorico(`${nomeTime1Display.textContent} ganhou o set ${setsTime1} (${pontosTime1}-${pontosTime2})`);
        } else {
            setsTime2++;
            adicionarAoHistorico(`${nomeTime2Display.textContent} ganhou o set ${setsTime2} (${pontosTime1}-${pontosTime2})`);
        }
        pontosTime1 = 0;
        pontosTime2 = 0;
    }

    atualizarPlacar();
}

document.querySelector('.envio').addEventListener('click', function() {
    const time1 = document.getElementById('time1__input').value.trim();
    const time2 = document.getElementById('time2__input').value.trim();
    
    if (time1 && time2) {
        nomeTime1Display.textContent = time1;
        nomeTime2Display.textContent = time2;
        adicionarAoHistorico(`Partida iniciada: ${time1} vs ${time2}`);
    } else {
        alert('Por favor, digite os nomes dos dois times!');
    }
});


document.querySelectorAll('.somar')[0].addEventListener('click', function() {
    if (nomeTime1Display.textContent && nomeTime2Display.textContent) {
        pontosTime1++;
        atualizarPlacar();
        verificarSets();
    } else {
        alert('Registre os times primeiro!');
    }
});

document.querySelectorAll('.subtrair')[0].addEventListener('click', function() {
    if (pontosTime1 > 0) {
        pontosTime1--;
        atualizarPlacar();
    }
});

document.querySelectorAll('.somar')[1].addEventListener('click', function() {
    if (nomeTime1Display.textContent && nomeTime2Display.textContent) {
        pontosTime2++;
        atualizarPlacar();
        verificarSets();
    } else {
        alert('Registre os times primeiro!');
    }
});

document.querySelectorAll('.subtrair')[1].addEventListener('click', function() {
    if (pontosTime2 > 0) {
        pontosTime2--;
        atualizarPlacar();
    }
});

document.getElementById('zerarPontuacao').addEventListener('click', function() {
    pontosTime1 = 0;
    pontosTime2 = 0;
    setsTime1 = 0;
    setsTime2 = 0;
    atualizarPlacar();
});

document.getElementById('Limparhistorico').style.display = 'none';


document.getElementById('visualizarHistorico').addEventListener('click', function() {
    const isHistoricoVisivel = historicoList.style.display !== 'none';

    historicoList.style.display = isHistoricoVisivel ? 'none' : 'block';
    document.getElementById('Limparhistorico').style.display = isHistoricoVisivel ? 'none' : 'block';
});


document.getElementById('Limparhistorico').addEventListener('click', function() {

    while (historicoList.children.length > 1) {
        historicoList.removeChild(historicoList.lastChild);
    }
   
    historicoPartidas = [];
});


atualizarPlacar();
