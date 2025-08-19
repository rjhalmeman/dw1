const path = require('path');

exports.mostrarPagina = (req, res) => {
    console.log('Requisição recebida para Página 2');
    res.sendFile(path.join(__dirname, '../../views/pagina2.html'));
};