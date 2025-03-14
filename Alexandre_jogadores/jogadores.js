class Jogador {
    constructor(num, nome, nascimento, posicao, altura, peso, posicaoNaLista) {
        this.num = num;
        this.nome = nome;
        this.nascimento = nascimento;
        this.posicao = posicao;
        this.altura = altura;
        this.peso = peso;

        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}