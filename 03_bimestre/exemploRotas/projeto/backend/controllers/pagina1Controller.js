exports.mostrarPagina = (req, res) => {
    res.send(`<h1>Você está na Página 1</h1><button onclick="window.location.href='/'">Voltar para Home</button>`);
};