const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir qualquer origem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // '*' permite qualquer origem
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/enviar-palavra', (req, res) => {
    let palavra = req.body.palavra;
    console.log(`A palavra recebida foi: ${palavra}`);
    palavra = palavra.toUpperCase();
    console.log(`A palavra devolvida será: ${palavra}`);
    let resposta = `Eu sou o servidor, você mandou a palavra "${palavra}" que foi recebida com sucesso! - estou lhe respondendo para você saber disso.`
    res.send(resposta);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
