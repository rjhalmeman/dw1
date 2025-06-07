const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Lista de usuários
const usuarios = [
    { email: 'joao@email.com', senha: '1234', nome: 'João', tipo: 'admin' },
    { email: 'maria@email.com', senha: 'abcd', nome: 'Maria', tipo: 'comum' },
    { email: 'ana@email.com', senha: 'senha', nome: 'Ana', tipo: 'moderador' },
    { email: 'carlos@email.com', senha: 'car123', nome: 'Carlos', tipo: 'admin' },
    { email: 'luiza@email.com', senha: 'luiza1', nome: 'Luiza', tipo: 'comum' }
];

// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        res.send(`Bem-vindo(a), ${usuario.nome}! Tipo de usuário: ${usuario.tipo}`);
    } else {
        res.status(401).send('Email ou senha inválidos.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
