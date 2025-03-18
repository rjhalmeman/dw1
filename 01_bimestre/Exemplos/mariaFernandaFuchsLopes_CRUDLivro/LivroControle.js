let listaLivro = []; //lista com todos os livros
let oQueEstaFazendo = ''; //variável global de controle
let livro = null; //variavel global 
bloquearAtributos(true);
dadosIniciais();

function dadosIniciais(){
    listaLivro.push(new Livro('1', 'Arsène Lupin: Ladrão de Casaca', 'Maurice Leblanc', 'Comédia e Suspense', 'Principis', '192', '1907-07-10', '2024', '5'));
    listaLivro.push(new Livro('2', 'Jogos de Herança', 'Jennifer Lynn Barnes','Romance e Mistério', 'Alt', '430', '2021-05-24', '2022', '5'));
    listaLivro.push(new Livro('3', 'O Herdeiro Perdido', 'jennifer Lynn Barnes', 'Romance e Mistério', 'Alt', '432', '2022-03-10', '2022', '5'));
    listaLivro.push(new Livro('4', 'A Aposta Final', 'Jennifer Lynn Barnes', 'Romance e Mistério', 'Alt', '448', '2022-10-07', '2023', '5'));
    listaLivro.push(new Livro('5', 'Os Irmãos Hawthorne', 'Jennifer Lynn Barnes', 'Romance e Mistério', 'Alt', '522', '2023-09-05', '2023', '5'));
    listaLivro.push(new Livro('6', 'Assassinato no Expresso do Oriente', 'Agatha Christie', 'Suspense', 'Harper Collins', '238', '1934-01-01', '2023', '5'));
    listaLivro.push(new Livro('7', 'Drácula', 'Bram Sroker', 'Terror e Suspense', 'DarkSide', '559', '1897-05-26', '2024', '5'));
    listaLivro.push(new Livro('8', 'Rastro de Sangue: Jack, o Estripador', 'Kerri Maniscalco', 'Suspense e Romance', 'DarkSide', '347', '2018-03-14', '2023', '5'));
    listaLivro.push(new Livro('9', 'Rastro de Sangue: Príncipe Drácula', 'Kerri Maniscalco', 'Suspense e Romance', 'DarkSide', '417', '2019-05-28', '2024', '5'));
    listaLivro.push(new Livro('10', 'Eu e Esse Meu Coração', 'C.C.Hunter', 'Romance e Mistério', 'Jangada', '424','2018-10-02', '2022', '2'));
    listaLivro.push(new Livro('11', 'Assassinato no Beco', 'Agatha Christie', 'Suspense', 'Harper Collins', '236', '1937-03-15', '2024', '5'));
    listaLivro.push(new Livro('12', 'Caraval', 'Stephane Garber', 'Fantasia e Romance', 'Novo Conceito', '352', '2016-09-29', '2023', '5'));
    listaLivro.push(new Livro('13', 'Lendário', 'Stephane Garber', 'Fantasia e Romance', 'Novo Conceito', '400', '2021-07-28', '2023', '5'));
    listaLivro.push(new Livro('14', 'Finale', 'Stephane Garber', 'Fantasia e Romance','Novo Conceito', '400', '2022-09-23', '2024', '5'));
    listaLivro.push(new Livro('15', 'E não Sobrou Nenhum', 'Agatha Cristie', 'Suspense', 'Globo Livros', '399', '1939-11-06', '2023', '5'));
    listaLivro.push(new Livro('16', 'Divinos Rivais', 'Rebecca Ross', 'Romance, Fantasia e Drama', 'Alt', '462', '2023-12-07', '2024', '5'));
    listaLivro.push(new Livro('17', 'Promessas Cruéis','Rebecca Ross','Romance, Fantasia e Drama', 'Alt', '542', '2024-04-10', '2024', '5'));
    listaLivro.push(new Livro('18', 'Mulherzinhas', 'Louisa May Alcott', 'Drama', 'Grupo Editorial Record', '680', '1868-05-18', '2022', '5'));
    listaLivro.push(new Livro('19', 'A Mesa dos Jogadores', 'Jessica Goodman', 'Mistério', 'Alta Novel', '330', '2022-05-01', '2023', '1'));
    listaLivro.push(new Livro('20', 'A Volta ao Mundo em 80 dias', 'Júlio Verne', 'Aventura', 'Principis', '303', '1872-12-22', '2023', '5'));
    listar();

}
function procurePorChavePrimaria(chave) { //procura o elemento pela chave primária (informação que é única para cada elemento)
    for (let i = 0; i < listaLivro.length; i++) {
        const livro = listaLivro[i];
        if (parseInt(livro.id) == parseInt(chave)) {
            livro.posicaoNaLista = i;
            return listaLivro[i]; //achou
        }
    }
    return null; //não achou
}

function procure() { //cofere se o usuário digitou alguma coisa do id, procura o id na lista e  mostra os dados se encontrado, e se não for encontrado, permite a inserção;
    const id = parseInt(document.getElementById("inputId").value);
    console.log("ID digitado", id);
    if (!Number.isNaN(id)) { // se digitou um id
        livro = procurePorChavePrimaria(id);
        if (livro) { //achou na lista
            mostrarDadosLivro(livro);
            document.getElementById("inputId").readOnly = true;
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            document.getElementById("inputId").readOnly = true;
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none'); // Habilita o botão de inserir.
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus(); //só é possível digitar o id.
        return;
    }
}

function inserir() { //o que acontece quando estamos inserindo
    bloquearAtributos(false); // remove o readonly.
    estrelinhas(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputId").focus();
}

function alterar() {
    bloquearAtributos(false); // remove o readonly
    estrelinhas(true);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');// só deixa habilitado o salvar.
    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

function excluir() {
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar), deixa só o salvar habilitado.
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() { //gerencia as operações inserir, alterar e excluir na lista e obtem os dados do html.
    let id = 0;
    if (livro == null) {
        id = parseInt(document.getElementById("inputId").value); 
        if(!id){
            alert("Por favor, digite o ID do livro.");
        }
    } else {
        id = livro.id;
    }
    const nome = document.getElementById("inputNome").value; // salvando negocinhos com base no que o usuário digitou;
    const autor = document.getElementById("inputAutor").value;
    const genero = document.getElementById("inputGenero").value;
    const editora = document.getElementById("inputEditora").value;
    const paginas = parseInt(document.getElementById("inputPaginas").value);
    const dataDeLancamento = document.getElementById("inputDataDeLancamento").value;
    const anoDeLeitura = parseInt(document.getElementById("inputAnoDeLeitura").value);
    let avaliacao
    if (oQueEstaFazendo == 'excluindo'){
        avaliacao = livro.avaliacao
    } else {
        avaliacao = classificacao; 
    }
    console.log("Avaliação digitada", avaliacao);
    if (paginas < 0) {
        mostrarAviso("O livro não pode não ter páginas, por favor digite a quantidade correta de páginas.");
        return;
    } else if (anoDeLeitura <= 0) {
        mostrarAviso("Não tem como exitir anos negativos, por favor insira o ano em que você leu o livro.");
        return;
    }
    //verificar se o que foi digitado pelo USUÁRIO está correto:
    if (id && nome && autor && genero && editora && paginas && dataDeLancamento && anoDeLeitura && avaliacao) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                livro = new Livro (id, nome, autor, genero, editora, paginas, dataDeLancamento, anoDeLeitura, avaliacao);
                listaLivro.push(livro);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                livroAlterado = new Livro(id, nome, autor, genero, editora, paginas, dataDeLancamento, anoDeLeitura, avaliacao);
                listaLivro[livro.posicaoNaLista] = livroAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaLivro.length; i++) {
                    if (livro.posicaoNaLista != i) {
                        novaLista.push(listaLivro[i]);
                    }
                }
                listaLivro = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none'); // desabilita todos os botões menos o de procurar, para reiniciar o processo.
        limparAtributos(); // deixa todos os espacinhos para o usuario preencher em branco.
        listar(); // mostra a lista editada.
        bloquearAtributos(true);// e só deixa o usuário preencher o id de novo
        colorindoEstrelinhas(0)
        estrelinhas(false);
        
    } else { // maaaaas, se tiver algo errado no que o usuário preencheu:
        alert("Erro nos dados digitados");
        return;
    }
}

function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.nome + " <br> " +
            linha.autor + "<br> Editora: " +
            linha.editora + "<br> Quantidade de Páginas: " +
            linha.paginas + " pág. <br> Gênero: "+
            linha.genero + " <br> Data de Lançamento: " +
            linha.dataDeLancamento + "<br> Ano de leitura: " +
            linha.anoDeLeitura + ". <br> Avaliação: " +
            linha.avaliacao + " <br><br> ---------------------- <br><br>";
    }
    return texto;
}

function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaLivro);
}

function cancelarOperacao() {
    limparAtributos(); // limpa os espacinhos de preenchimento
    colorindoEstrelinhas(0);
    bloquearAtributos(true); // não deixa o usuário digitar em todos os atributos, só no id;
    estrelinhas(false);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none'); // deixa só o botão procurar
    mostrarAviso("Cancelou a operação de edição"); // avisa para ele o qu está acontecendo;
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do Livro nos campos
function mostrarDadosLivro(livro) {
    document.getElementById("inputId").value = livro.id;
    document.getElementById("inputNome").value = livro.nome;
    document.getElementById("inputAutor").value = livro.autor;
    document.getElementById("inputGenero").value = livro.genero;
    document.getElementById("inputEditora").value = livro.editora;
    document.getElementById("inputPaginas").value = livro.paginas;
    document.getElementById("inputDataDeLancamento").value = livro.dataDeLancamento;
    document.getElementById("inputAnoDeLeitura").value = livro.anoDeLeitura;
    colorindoEstrelinhas(livro.avaliacao); // a função vai preencher as estrelinhas até esse valor

    bloquearAtributos(true); // Define os campos como readonly
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputNome").value = "";
    document.getElementById("inputAutor").value = "";
    document.getElementById("inputGenero").value = "";
    document.getElementById("inputEditora").value = "";
    document.getElementById("inputPaginas").value = "";
    document.getElementById("inputDataDeLancamento").value = "";
    document.getElementById("inputAnoDeLeitura").value = "";
}

function bloquearAtributos(soLeitura) { // permite a edição só da chave primaria;
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputNome").readOnly = soLeitura;
    document.getElementById("inputAutor").readOnly = soLeitura;
    document.getElementById("inputGenero").readOnly = soLeitura;
    document.getElementById("inputEditora").readOnly = soLeitura;
    document.getElementById("inputPaginas").readOnly = soLeitura;
    document.getElementById("inputDataDeLancamento").readOnly = soLeitura;
    document.getElementById("inputAnoDeLeitura").innerText = soLeitura;
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


// ------------------------  Controle das estrelinhas de avaliação:
const estrelas = document.querySelectorAll('.estrela');
let classificacao = 0;

// Função que atualiza a cor das estrelas
function colorindoEstrelinhas(avaliacao) {
    estrelas.forEach(estrela => {
        if (parseInt(estrela.dataset.value) <= avaliacao) {
            estrela.classList.add('coloridinha');
        } else {
            estrela.classList.remove('coloridinha');
        }
    });
}

function estrelinhas(x){
    if(x){
        console.log("Valor de x: ", x);
        // Ação ao passar o mouse (hover)
        estrelas.forEach(estrela => {
            estrela.addEventListener('mouseenter', manipulaEntradaMouse);
            estrela.addEventListener('mouseleave', manipulaSaidaMouse);
            estrela.addEventListener('click', manipulaClick);
        });
    } else {
        estrelas.forEach(estrela => {
            estrela.removeEventListener('mouseenter', manipulaEntradaMouse);
            estrela.removeEventListener('mouseleave', manipulaSaidaMouse);
            estrela.removeEventListener('click', manipulaClick);
        });
    }
}

function manipulaEntradaMouse() {
    const nota = parseInt(this.dataset.value);
    colorindoEstrelinhas(nota);
}

function manipulaSaidaMouse() {
    colorindoEstrelinhas(classificacao);
}

function manipulaClick() {
    classificacao = parseInt(this.dataset.value);
}

function salvarClickNasEstrelas(){
    const estrelas = document.querySelectorAll('.estrela');
    estrelas.forEach(function(estrela) {
        estrela.addEventListener('click', function() {
            const valor = parseInt(estrela.getAttribute('data-value'));
            classificacao = valor;
            colorindoEstrelinhas(valor);
        });
    });
}

// ------------------ Salvando os dados na memória RAM:

function prepararESalvarCSV() { //gera um arquivo csv com as informações de listaLivro vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let nomeDoArquivoDestino = "./Livro.csv";  //define o nome do arquivo csv
     let textoCSV = "";
     for (let i = 0; i < listaLivro.length; i++) {
         const livro = listaLivro[i]; //variavel linha contem as informações de cada livro
         textoCSV += livro.id + ";" + //concatena os dados dos livros formatados para linha csv (separada por ;)
             livro.nome + ";" +
             livro.autor + ";" +
             livro.genero + ";" +
             livro.editora + ";" +
             livro.paginas + ";" +
             livro.dataDeLancamento + ";" +
             livro.anoDeLeitura + ";" +
             livro.avaliacao + "\n";
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
 
 
 // Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)
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
 
 
 // Função para processar o arquivo CSV e transferir os dados para a listaLivro
 function converterDeCSVparaListaObjeto(arquivo) {
     const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
     leitor.onload = function (e) {
         const conteudo = e.target.result; // Conteúdo do arquivo CSV
         const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
         listaLivro = []; // Limpa a lista atual (se necessário)
         for (let i = 0; i < linhas.length; i++) {
             const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
             if (linha) { //verifica se a linha não está vazia
                 const dados = linha.split(';'); // Separa os dados por ';'
                 if (dados.length === 9) { //verifica os seis campos
                     // Adiciona os dados à listaMusica como um objeto
                     listaLivro.push({
                         id: dados[0],
                         nome: dados[1],
                         autor: dados[2],
                         genero: dados[3],
                         editora: dados[4],
                         paginas: dados[5],
                         dataDeLancamento: dados[6],
                         anoDeLeitura: dados[7],
                         avaliacao: dados[8]
                     });
                 }
             }
         }
         listar(); //exibe a lista atualizada
     };
     leitor.readAsText(arquivo); // Lê o arquivo como texto
 }
 
