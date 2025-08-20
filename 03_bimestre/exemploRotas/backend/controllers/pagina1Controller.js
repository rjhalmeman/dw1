// backend/controllers/pagina1Controller.js
// Controlador para Página 1 - implementação das rotas

const path = require('path');

exports.mostrarPagina = (req, res) => {
    console.log('Requisição recebida para Página 1');
    res.sendFile(path.join(__dirname, '../../views/pagina1.html'));
};

exports.paginaVermelha = (req, res) => {
    console.log('Requisição recebida para Página Vermelha');
    res.sendFile(path.join(__dirname, '../../views/pagina1-vermelha.html'));
}