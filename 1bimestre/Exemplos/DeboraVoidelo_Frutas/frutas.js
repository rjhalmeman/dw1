class Fruta {
    constructor(id, nome, fornecedor, colheita, peso, preco, posicaoNaLista) {
        this.id = id;
        this.nome = nome;
        this.fornecedor = fornecedor;
        this.colheita = colheita;
        this.peso = peso;
        this.preco = preco;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}

