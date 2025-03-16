  // TypeScript código (transpilado para JavaScript no navegador)
  document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcular') as HTMLButtonElement;
    const catetoAInput = document.getElementById('cateto-a') as HTMLInputElement;
    const catetoBInput = document.getElementById('cateto-b') as HTMLInputElement;
    const resultadoDiv = document.getElementById('resultado') as HTMLDivElement;
    
    calcularBtn.addEventListener('click', () => {
        // Função para calcular a hipotenusa usando o teorema de Pitágoras
       
       
        const calcularHipotenusa = (a: number, b: number): number => {
            return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        };
        
        // Obtém os valores dos inputs
        const catetoA: number = parseFloat(catetoAInput.value);
        const catetoB: number = parseFloat(catetoBInput.value);
        
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
        const hipotenusa: number = calcularHipotenusa(catetoA, catetoB);
        
        // Exibe o resultado
        resultadoDiv.textContent = `A hipotenusa é: ${hipotenusa.toFixed(2)}`;
    });
});