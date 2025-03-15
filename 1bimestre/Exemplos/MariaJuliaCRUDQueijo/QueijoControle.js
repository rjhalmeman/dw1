let listaQueijo = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let queijo = null; //variavel global 
bloquearAtributos(true);
let antiEmily = 0;

function dadosIniciais() {
    listaQueijo.push(new Queijo('1', 'queijo gorgonzola', 100, 'Goiás', '2024-09-20', 28, 'Marcio'));
    listaQueijo.push(new Queijo('2', 'queijo provolone', 200, 'São Sebastião da Grama - SP', '2023-10-17', 30, 'Paula Gamas'));
    listaQueijo.push(new Queijo('3', 'queijo parmesão', 400, 'Alagoas - MG', '2024-05-07', 60, 'Marta Correia'));
    listaQueijo.push(new Queijo('4', 'queijo muçarela', 200, 'Campo Mourão - PR', '2024-05-14', 17, 'Carlos de Castro'));
    listaQueijo.push(new Queijo('5','queijo manchego',120,'Cuiabá',"2023-05-01",32,'Mercado Paraná'));

    listar();
}


function salvarNoComputador() {
    nomeParaSalvar = "./Queijo.csv";
    let textoCSV = "";
    for (let i = 0; i < listaQueijo.length; i++) {
        const linha = listaQueijo[i];
        textoCSV += linha.id + ";" +
            linha.nome + ";" +
            linha.peso + ";" +
            linha.cidadeFabricada + ";" +
            linha.dataFabricada + ";" +
            linha.valor + ";" +
            linha.distribuidor + "\n";
    }

    salvarEmArquivo(nomeParaSalvar, textoCSV);
}


function salvarEmArquivo(nomeArq, conteudo) {
    // Cria um blob com o conteúdo em formato de texto
    const blob = new Blob([conteudo], { type: 'text/plain' });
    // Cria um link temporário para o download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArq; // Nome do arquivo de download
    // Simula o clique no link para iniciar o download
    link.click();
    // Libera o objeto URL
    URL.revokeObjectURL(link.href);
}


// Função para abrir o seletor de arquivos para upload
function buscarDadosSalvosNoComputador() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv'; // Aceita apenas arquivos CSV
    input.onchange = function (event) {
        const arquivo = event.target.files[0];
        console.log(arquivo.name);
        if (arquivo) {
            processarArquivo(arquivo);
        }
    };
    input.click(); // Simula o clique para abrir o seletor de arquivos

}

// Função para processar o arquivo CSV e transferir os dados para a listaQueijo
function processarArquivo(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaQueijo = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 7) {
                    // Adiciona os dados à listaQueijo como um objeto
                    listaQueijo.push({
                        id: dados[0],
                        nome: dados[1],
                        peso: dados[2],
                        cidadeFabricada: dados[3],
                        dataFabricada: dados[4],
                        valor: dados[5],
                        distribuidor: dados[6]
                    });
                }
            }
        }
        // console.log("Upload concluído!", listaQueijo); // Exibe no console a lista atualizada
        listar();
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}

//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaQueijo.length; i++) {
        const queijo = listaQueijo[i];
        if (queijo.id == chave) {
            queijo.posicaoNaLista = i;
            return listaQueijo[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputId").focus();
        return;
    }

    if (id) { // se digitou um Id
        queijo = procurePorChavePrimaria(id);
        if (queijo) { //achou na lista
            mostrarDadosQueijo(queijo);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
            antiEmily = id;
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputId").focus();
    document.getElementById("inputId").value = antiEmily;


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
    if (queijo == null) {
         id = parseInt(document.getElementById("inputId").value);
    } else {
        id = queijo.id;
    }

    const nome = document.getElementById("inputNome").value;
    const peso = parseFloat(document.getElementById("inputPeso").value);
    const cidadeFabricada = document.getElementById("inputCidadeFabricada").value;
    const dataFabricada = document.getElementById("inputDataFabricada").value;
    const valor = parseFloat(document.getElementById("inputValor").value);  
    const distribuidor = document.getElementById("inputDistribuidor").value;
    //verificar se o que foi digitado pelo USUÁRIO está correto
if(id && nome && peso && cidadeFabricada && dataFabricada && valor && distribuidor ){// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                queijo = new Queijo(id,nome,peso, cidadeFabricada, dataFabricada, valor, distribuidor);
                listaQueijo.push(queijo);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                queijoAlterado = new Queijo(id,nome,peso, cidadeFabricada, dataFabricada, valor, distribuidor);
                listaQueijo[queijo.posicaoNaLista] = queijoAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaQueijo.length; i++) {
                    if (queijo.posicaoNaLista != i) {
                        novaLista.push(listaQueijo[i]);
                    }
                }
                listaQueijo = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        mostrarImagemQueijo(queijo);

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
            linha.id+" - " +
            linha.nome+" - " +
            linha.peso+" - " +
            linha.cidadeFabricada+" - " +
            linha.dataFabricada+" - " +
            linha.valor+" - " +
            linha.distribuidor+"<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaQueijo);
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
function mostrarImagemQueijo(queijo) {
    let imgElemento = document.getElementById("imgQueijo");
    if (queijo && queijo.valor < 20) {
        imgElemento.src = "imagens/queijo_pequeno.webp"; //muda a imagem exibida para "imagens/queijo_pequeno.webp"
        imgElemento.alt = "Imagem de queijo pequeno"; 
        //"Imagem de queijo pequeno". Descreve a imagem para usuários que não conseguem vê-la.
    }else if (queijo && queijo.valor > 19 && queijo.valor < 35) {
        imgElemento.src = "imagens/queijo_simples.webp";
        imgElemento.alt = "Imagem de queijo simples";
    } else {
        imgElemento.src = "imagens/queijo_caro.webp";
        imgElemento.alt = "Imagem de queijo caro";
    }
     
}


// Função para mostrar os dados do queijo nos campos
function mostrarDadosQueijo(queijo) {
    document.getElementById("inputId").value = queijo.id;
    document.getElementById("inputNome").value = queijo.nome;
    document.getElementById("inputPeso").value = queijo.peso;
    document.getElementById("inputCidadeFabricada").value = queijo.cidadeFabricada;
    document.getElementById("inputDataFabricada").value = queijo.dataFabricada;
    document.getElementById("inputValor").value = queijo.valor;
    document.getElementById("inputDistribuidor").value = queijo.distribuidor;


    mostrarImagemQueijo(queijo);
    // Define os campos como readonly
    bloquearAtributos(true);
}


// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputPeso").value = "";
    document.getElementById("inputCidadeFabricada").value = "";
    document.getElementById("inputDataFabricada").value = "";
    document.getElementById("inputValor").value = "";
    document.getElementById("inputDistribuidor").value = "";

    bloquearAtributos(true);
 
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputPeso").readOnly = soLeitura;
    document.getElementById("inputCidadeFabricada").readOnly = soLeitura;
    document.getElementById("inputDataFabricada").readOnly = soLeitura;
    document.getElementById("inputValor").readOnly = soLeitura;
    document.getElementById("inputDistribuidor").readOnly = soLeitura;
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
