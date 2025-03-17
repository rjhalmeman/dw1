let listaCarro = [];
let oQueEstaFazendo = '';
let carro = null;
bloquearAtributos(true);


//ver se a placa está digitada corretamente
function verificarPlaca(event) {
    const input = event.target;
    let valor = input.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); 
    if (valor.length > 3) valor = valor.slice(0, 3) + '-' + valor.slice(3); 
    input.value = valor.slice(0, 8); 
}

//CRUD normal
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaCarro.length; i++) {
        const carro = listaCarro[i];
        if (carro.placa == chave) {
            carro.posicaoNaLista = i;
            return listaCarro[i];
        }
    }
    return null;
}

function procure() {
    const placa = document.getElementById("placa").value;
    //if (isNaN(placa) || !Number.isInteger(Number(placa))) {
    //    mostrarAviso("Precisa ser um número inteiro");
    //    document.getElementById("placa").focus();
    //    return;
    //}
    if (placa.length == 0) {
        alert("Insira uma placa")
        document.getElementById("placa").focus();
        return
    }
    if (placa.length != 8) {
        alert("Precisa seguir o modelo ABC-1D23")
        document.getElementById("placa").focus();
        return
    }
    if (placa) { 
        carro = procurePorChavePrimaria(placa);
        if (carro) { 
            mostrarDadosCarro(carro);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
            mostrarAviso("Veículo encontrado, pode alterar ou excluir");
        } else { 
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Veículo não encontrado, pode inserir");
        }
    } else {
        document.getElementById("placa").focus();
        return;
    }
}

function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique no botão salvar");
    document.getElementById("placa").focus();
}

function alterar() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Altere os atributos que deseja e clique no botão salvar");
}

function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clique no botão salvar para confirmar a exclusão");
}

function salvar() {
    let placa;
    if (carro == null) {
        placa = document.getElementById("placa").value;
    } else {
        placa = carro.placa;
    }

    const nome= document.getElementById("nome").value;
    const marca= document.getElementById("marca").value;
    const dataLanc= document.getElementById("dataLanc").value;
    const kmRodados= parseInt(document.getElementById("kmRodados").value);
    const cor= document.getElementById("cor").value;
    
    if(placa && nome && marca && dataLanc && kmRodados >= 0 && cor){
        switch (oQueEstaFazendo) {
            case 'inserindo':
                carro = new Carro(placa,nome,marca,dataLanc,kmRodados,cor);
                listaCarro.push(carro);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                carroAlterado = new Carro(placa,nome,marca,dataLanc,kmRodados,cor);
                listaCarro[carro.posicaoNaLista] = carroAlterado;
                mostrarAviso("Alteração concluída");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaCarro.length; i++) {
                    if (carro.posicaoNaLista != i) {
                        novaLista.push(listaCarro[i]);
                    }
                }
                listaCarro = novaLista;
                mostrarAviso("EXCLUÍDO");
                break;
            default:
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("placa").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto += 
        linha.placa+" - "+ 
        linha.nome+" - "+ 
        linha.marca+" - "+ 
        linha.dataLanc+" - "+ 
        linha.kmRodados+" km - "+ 
        linha.cor+"<br><br>";
    }
    return texto;
}

function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaCarro);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Operação cancelada");}

function mostrarAviso(mensagem) {
    document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosCarro(carro) {
    document.getElementById("placa").value = carro.placa;
    document.getElementById("nome").value = carro.nome;
    document.getElementById("marca").value = carro.marca;
    document.getElementById("dataLanc").value = carro.dataLanc;
    document.getElementById("kmRodados").value = carro.kmRodados;
    document.getElementById("cor").value = carro.cor;
    bloquearAtributos(true);
}

function limparAtributos() {
    document.getElementById("nome").value = "";
    document.getElementById("marca").value = "";
    document.getElementById("dataLanc").value = "";
    document.getElementById("kmRodados").value = "";
    document.getElementById("cor").value = "";
    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    document.getElementById("placa").readOnly = !soLeitura;
    document.getElementById("nome").readOnly = soLeitura;
    document.getElementById("marca").readOnly = soLeitura;
    document.getElementById("dataLanc").readOnly = soLeitura;
    document.getElementById("kmRodados").readOnly = soLeitura;
    document.getElementById("cor").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar;
    document.getElementById("placa").focus();
}

//parte de salvar permanentemente
function prepararESalvarCSV() {
    let nomeDoArquivoDestino = "./Carro.csv";
    let textoCSV = "";
    for (let i = 0; i < listaCarro.length; i++) {
        const linha = listaCarro[i];
        textoCSV += linha.placa + ";" +
            linha.nome + ";" +
            linha.marca + ";" +
            linha.dataLanc + ";" +
            linha.kmRodados + ";" +
            linha.cor + "\n";
    }
    persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}

function persistirEmLocalPermanente(nomeArq, conteudo) {
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArq;
    link.click();
    URL.revokeObjectURL(link.href);
}

function abrirArquivoSalvoEmLocalPermanente() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = function (event) {
        const arquivo = event.target.files[0];
        console.log(arquivo.name);
        if (arquivo) {
            converterDeCSVparaListaObjeto(arquivo);
        }
    };
    input.click();
}

function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();
    leitor.onload = function (e) {
        const conteudo = e.target.result;
        const linhas = conteudo.split('\n');
        listaCarro = [];
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();
            if (linha) {
                const dados = linha.split(';');
                if (dados.length === 6) {
                    listaCarro.push({
                        placa: dados[0],
                        nome: dados[1],
                        marca: dados[2],
                        dataLanc: dados[3],
                        kmRodados: dados[4],
                        cor: dados[5]
                    });
                }
            }
        }
        listar();
    };
    leitor.readAsText(arquivo);
}