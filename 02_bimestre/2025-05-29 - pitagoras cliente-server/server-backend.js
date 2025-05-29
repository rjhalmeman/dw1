const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir qualquer origem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/calcular-hipotenusa', (req, res) => {
    const b = parseFloat(req.body.b);
    const c = parseFloat(req.body.c);

    if (isNaN(b) || isNaN(c)) {
        return res.status(400).send('Valores inválidos. B e C devem ser números.');
    }

    const a = Math.sqrt(b * b + c * c);
    console.log(`Recebido B=${b}, C=${c}, Hipotenusa calculada: A=${a}`);

    res.send(`A hipotenusa é ${a.toFixed(2)}`);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
