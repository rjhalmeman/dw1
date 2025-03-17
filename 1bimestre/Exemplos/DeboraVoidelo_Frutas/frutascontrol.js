listaFrutas = [ 
    {
        id: "1",
        nome: "Maçã",
        fornecedor: "Fornecedor A",
        colheita: "2024-05-15",
        peso: 150,
        preco: 2.50
    },
    {
        id: "2",
        nome: "Banana",
        fornecedor: "Fornecedor B",
        colheita: "2024-05-10",
        peso: 120,
        preco: 1.80
    },
    {
        id: "3",
        nome: "Laranja",
        fornecedor: "Fornecedor C",
        colheita: "2024-06-05",
        peso: 200,
        preco: 3.00
    },
    {
        id: "4",
        nome: "Uva",
        fornecedor: "Fornecedor D",
        colheita: "2024-04-20",
        peso: 180,
        preco: 5.50
    },
    {
        id: "5",
        nome: "Morango",
        fornecedor: "Fornecedor E",
        colheita: "2024-03-30",
        peso: 100,
        preco: 6.00
    },
    {
        id: "6",
        nome: "Pera",
        fornecedor: "Fornecedor F",
        colheita: "2024-05-25",
        peso: 160,
        preco: 3.20
    },
    {
        id: "7",
        nome: "Melancia",
        fornecedor: "Fornecedor G",
        colheita: "2024-06-15",
        peso: 2500,
        preco: 4.00
    },
    {
        id: "8",
        nome: "Abacaxi",
        fornecedor: "Fornecedor H",
        colheita: "2024-07-10",
        peso: 1200,
        preco: 7.00
    },
    {
        id: "9",
        nome: "Coco",
        fornecedor: "Fornecedor I",
        colheita: "2024-04-05",
        peso: 500,
        preco: 8.00
    },
    {
        id: "10",
        nome: "Kiwi",
        fornecedor: "Fornecedor J",
        colheita: "2024-03-15",
        peso: 80,
        preco: 4.50
    },
    {
        id: "11",
        nome: "Manga",
        fornecedor: "Fornecedor K",
        colheita: "2024-06-30",
        peso: 350,
        preco: 6.50
    },
    {
        id: "12",
        nome: "Pêssego",
        fornecedor: "Fornecedor L",
        colheita: "2024-05-05",
        peso: 130,
        preco: 5.00
    },
    // Novas frutas adicionadas
    {
        id: "13",
        nome: "Cabeludinha",
        fornecedor: "Fornecedor M",
        colheita: "2024-04-30",
        peso: 50,
        preco: 9.00
    },
    {
        id: "14",
        nome: "Açaí",
        fornecedor: "Fornecedor N",
        colheita: "2024-06-25",
        peso: 200,
        preco: 12.00
    },
    {
        id: "15",
        nome: "Jabuticaba",
        fornecedor: "Fornecedor O",
        colheita: "2024-08-10",
        peso: 60,
        preco: 7.50
    },
    {
        id: "16",
        nome: "Framboesa",
        fornecedor: "Fornecedor P",
        colheita: "2024-05-20",
        peso: 80,
        preco: 10.00
    },
    {
        id: "17",
        nome: "Pitangas",
        fornecedor: "Fornecedor Q",
        colheita: "2024-07-05",
        peso: 90,
        preco: 6.80
    },
    {
        id: "18",
        nome: "Cabeludinha",
        fornecedor: "Fornecedor R",
        colheita: "2024-04-10",
        peso: 55,
        preco: 9.50
    }
];

function prepararESalvarCSV() { //gera um arquivo csv com as informações de listaFrutas vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let nomeDoArquivoDestino = "./fruta.csv";  //define o nome do arquivo csv
     let textoCSV = "";
     for (let i = 0; i < listaFrutas.length; i++) {
         const linha = listaFrutas[i]; //variavel linha contem as informações de cada musica
         textoCSV += linha.id + " ; " + //concatena os dados das musicas formatados para linha csv (separada por ;)
            linha.nome + " ; " +
            linha.fornecedor + " ; " +
            linha.colheita + " ; " +
            linha.peso + " ; " +
            linha.preco + "\n";
     }
     persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
 }

 function persistirEmLocalPermanente(nomeArq, conteudo) {
    /*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
    criando um arquivo temporário*/
    const blob = new Blob([conteudo], { type: 'text/plain' });
    //cria o elemento "a" (link temporário) usado para adicionar o dowload do arquivo
    const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
    atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
    link.href = URL.createObjectURL(blob);
    link.download = nomeArq; // Nome do arquivo de download
    link.click(); //inicia o processo de dowload automaticamente
    // Libera o objeto URL
    URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
}

function abrirArquivoSalvoEmLocalPermanente() {
    
    const input = document.createElement('input');
    //cria o elemento input do tipo file (serve para abrir o seletor de arquivos)
    input.type = 'file';
    input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local
    input.onchange = function (event) {
        /*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo
        O evento change é disparado quando um arquivo é selecionado*/
        const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo
        console.log(arquivo.name);
        if (arquivo) {
            converterDeCSVparaListaObjeto(arquivo);
        }
        /*verifica se um arquivo foi selecionado: 
        se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
        permitindo que o arquivo seja lido e processado na função processarArquivo*/
    };
    input.click(); //seletor de arquivos exibido automaticamente    
}

// Função para processar o arquivo CSV e transferir os dados para a listaFrutas
function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaFrutas = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 6) { //verifica os seis campos
                    // Adiciona os dados à listaFrutas como um objeto
                    listaFrutas.push({
                        id: dados[0],
                        nome: dados[1],
                        fornecedor: dados[2],
                        colheita: dados[3],
                        peso: dados[4],
                        preco: dados[5]
                    });
                }
            }
        }
        listar(); //exibe a lista atualizada
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}

// Seleciona todos os campos de entrada do tipo 'text' e todos os elementos 'textarea' na página.
var inputs = document.querySelectorAll('input[type="text"], textarea');

// Itera sobre cada um dos campos de entrada encontrados.
inputs.forEach(function(input) {
    // Adiciona um ouvinte de evento para o evento 'keypress' (quando o usuário pressiona uma tecla).
    input.addEventListener("keypress", function(e) {
        // Verifica se o caractere pressionado é válido, de acordo com a função checkChar.
        if(!checkChar(e)) {
            // Se o caractere não for válido, impede a inserção do caractere no campo de entrada.
            e.preventDefault(); 
        }
    });
});

// Função que valida o caractere pressionado
function checkChar(e) {
    // Obtém o caractere pressionado convertendo o código da tecla (keyCode) em um caractere legível.
    var char = String.fromCharCode(e.keyCode); 

    // Exibe o caractere pressionado no console para depuração (pode ser removido em produção).
    console.log(char); 

    // Define um regex que permite apenas letras (A-Z, a-z), letras acentuadas (À-ÿ) e espaços (\s).
    var pattern = /^[A-Za-zÀ-ÿ\s]+$/;

    // Verifica se o caractere pressionado corresponde ao padrão da expressão regular.
    return pattern.test(char);
}


let oQueEstaFazendo = ''; //variável global de controle
let fruta = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaFrutas.length; i++) {
     fruta = listaFrutas[i];
        if (fruta.id == chave) {
            fruta.posicaoNaLista = i;
            return listaFrutas[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (id) { // se digitou um id
        fruta = procurePorChavePrimaria(id);
        if (fruta) { //achou na lista
            mostrarDadosFruta(fruta);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

window.onload = listar()

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputId").focus();

}


// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let id;
    if (fruta == null) {
        id = document.getElementById("inputId").value;
    } else {
        id = fruta.id;
    }

    const nome = document.getElementById("inputNome").value;
    const fornecedor = document.getElementById("inputFornecedor").value;
    const colheita = document.getElementById("inputColheita").value;
    const peso = parseFloat(document.getElementById("inputPeso").value);
    const preco = parseFloat(document.getElementById("inputPreco").value);

    if (peso<0) {
        mostrarAviso("O peso não pode ser menor que zero");
        return;
    }

    //verificar se o que foi digitado pelo USUÁRIO está preprecoeto
    if (id && nome && fornecedor && colheita && peso && preco) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                fruta = new Fruta(id, nome, fornecedor, colheita, peso, preco);
                listaFrutas.push(fruta);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                frutaAlterado = new Fruta(id, nome, fornecedor, colheita, peso, preco);
                listaFrutas[fruta.posicaoNaLista] = frutaAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaFrutas.length; i++) {
                    if (fruta.posicaoNaLista != i) {
                        novaLista.push(listaFrutas[i]);
                    }
                }
                listaFrutas = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.nome + " - " +
            linha.fornecedor + " - " +
            linha.colheita + " - " +
            linha.peso + " - " +
            linha.preco + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaFrutas);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do fruta nos campos
function mostrarDadosFruta(fruta) {
    document.getElementById("inputId").value = fruta.id;
    document.getElementById("inputNome").value = fruta.nome;
    document.getElementById("inputFornecedor").value = fruta.fornecedor;
    document.getElementById("inputColheita").value = fruta.colheita;
    document.getElementById("inputPeso").value = fruta.peso;
    document.getElementById("inputPreco").value = fruta.preco;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputFornecedor").value = "";
    document.getElementById("inputColheita").value = "";
    document.getElementById("inputPeso").value = "";
    document.getElementById("inputPreco").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputFornecedor").readOnly = soLeitura;
    document.getElementById("inputColheita").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
    document.getElementById("inputPreco").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputId").focus();
}
// Função de autocomplete para o campo de nome das frutas
function autocomplete(inputId, listaFrutas) {
    const input = document.getElementById(inputId); // Obtém o campo de entrada
    const listaSugestoes = document.getElementById('sugestoes'); // Onde as sugestões serão mostradas
    
    // Adiciona um ouvinte de evento de input no campo de texto
    input.addEventListener('input', function() {
        const valor = input.value.toLowerCase(); // Obtém o valor digitado e converte para minúsculas
        const sugestoes = listaFrutas.filter(fruta => fruta.nome.toLowerCase().includes(valor)); // Filtra as frutas
        
        mostrarSugestoes(sugestoes); // Exibe as sugestões
    });
}

// Função para mostrar as sugestões
function mostrarSugestoes(sugestoes) {
    const listaSugestoes = document.getElementById('sugestoes');
    listaSugestoes.innerHTML = ''; // Limpa as sugestões anteriores
    
    if (sugestoes.length > 0) {
        // Se houver sugestões, mostra-as
        sugestoes.forEach(fruta => {
            const li = document.createElement('li');
            li.textContent = fruta.nome; // Exibe o nome da fruta
            li.addEventListener('click', () => {
                // Ao clicar na sugestão, preenche o campo de entrada com o nome da fruta
                document.getElementById('inputNome').value = fruta.nome;
                listaSugestoes.innerHTML = ''; // Limpa as sugestões
            });
            listaSugestoes.appendChild(li); // Adiciona o item à lista de sugestões
        });
    } else {
        // Se não houver sugestões, exibe uma mensagem
        listaSugestoes.innerHTML = '<li>Nenhuma sugestão encontrada</li>';
    }
}

// Exemplo de como usar o autocomplete no seu código (adiciona o autocomplete no campo inputNome)
autocomplete('inputNome', listaFrutas);
