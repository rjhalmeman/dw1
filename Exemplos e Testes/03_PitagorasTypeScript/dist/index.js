"use strict";
// TypeScript código (transpilado para JavaScript no navegador)
document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcular');
    const catetoAInput = document.getElementById('cateto-a');
    const catetoBInput = document.getElementById('cateto-b');
    const resultadoDiv = document.getElementById('resultado');
    calcularBtn.addEventListener('click', () => {
        // Função para calcular a hipotenusa usando o teorema de Pitágoras
        const calcularHipotenusa = (a, b) => {
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        };
        // Obtém os valores dos inputs
        const catetoA = parseFloat(catetoAInput.value);
        const catetoB = parseFloat(catetoBInput.value);
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
        const hipotenusa = calcularHipotenusa(catetoA, catetoB);
        // Exibe o resultado
        resultadoDiv.textContent = `A hipotenusa é: ${hipotenusa.toFixed(2)}`;
    });
});
