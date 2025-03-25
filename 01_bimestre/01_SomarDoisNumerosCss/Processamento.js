function calcularSoma() {
    // Obter os valores de v1 e v2
    var v1 = parseFloat(document.getElementById("v1").value);
    var v2 = parseFloat(document.getElementById("v2").value);

    // Verificar se os valores são números
    if (!isNaN(v1) && !isNaN(v2)) {
        // Calcular a soma
        var soma = v1 + v2;

        // Atualizar o campo de resposta com o resultado da soma
        document.getElementById("resp").value = soma;
    } else {
        // Se algum dos valores não for um número, exibir uma mensagem de erro
        document.getElementById("resp").value = "Valores inválidos";
    }
}