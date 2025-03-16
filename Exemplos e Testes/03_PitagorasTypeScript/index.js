// TypeScript código (transpilado para JavaScript no navegador)
document.addEventListener('DOMContentLoaded', function () {
    var calcularBtn = document.getElementById('calcular');
    var catetoAInput = document.getElementById('cateto-a');
    var catetoBInput = document.getElementById('cateto-b');
    var resultadoDiv = document.getElementById('resultado');
    calcularBtn.addEventListener('click', function () {
        // Função para calcular a hipotenusa usando o teorema de Pitágoras
        var calcularHipotenusa = function (a, b) {
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        };
        // Obtém os valores dos inputs
        var catetoA = parseFloat(catetoAInput.value);
        var catetoB = parseFloat(catetoBInput.value);
       
        // Verifica se os valores são válidos
        if (isNaN(catetoA) || isNaN(catetoB)) {
            resultadoDiv.textContent = "Por favor, digite valores válidos para ambos os catetos.";
            return;
        }
        if (catetoA <= 0 || catetoB <= 0) {
            resultadoDiv.textContent = "Os valores dos catetos devem ser maiores que zero.";
            return;
        }
        // Calcula a hipotenusa
        var hipotenusa = calcularHipotenusa(catetoA, catetoB);
        // Exibe o resultado
        resultadoDiv.textContent = "A hipotenusa \u00E9: ".concat(hipotenusa.toFixed(2));
        document.getElementById("linhaHipotenusa").textContent = "c = ".concat(hipotenusa);
        document.getElementById("linhaCatetoA").textContent = "a = ".concat(catetoAInput.value);
        document.getElementById("linhaCatetoB").textContent = "b = ".concat(catetoBInput.value);
    });
});
