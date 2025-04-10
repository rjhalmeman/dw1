window.onload = function() {
    let params = new URLSearchParams(window.location.search);
    document.getElementById('resultado').innerHTML = params.get('palavra') || 'Nenhuma palavra enviada';
}