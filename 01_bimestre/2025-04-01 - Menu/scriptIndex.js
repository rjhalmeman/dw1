function enviar(destino) {
    let palavra = document.getElementById('palavra').value;
    let form = document.getElementById('form');
    document.getElementById('inputPalavra').value = palavra;
    form.action = destino;
    form.submit();
}