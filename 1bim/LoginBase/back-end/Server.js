// Dependências necessárias:
// npm install express mysql2 cors dotenv
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Altere para seu usuário
    password: 'Lageado001.', // Altere para sua senha
    database: 'lojaJS'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Rota de autenticação
app.post('/auth', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            success: false,
            message: 'Email e senha são obrigatórios'
        });
    }

    const query = 'SELECT * FROM pessoa WHERE emailPessoa = ? AND senhaPessoa = ?';
    
    try {
        connection.query(query, [email, senha], (error, results) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Erro interno do servidor'
                });
            }

            if (results.length > 0) {
                // Login válido
                return res.json({
                    success: true,
                    message: 'Login válido',
                    user: {
                        cpf: results[0].cpfPessoa,
                        nome: results[0].nomePessoa,
                        email: results[0].emailPessoa
                    }
                });
            } else {
                // Login inválido
                return res.status(401).json({
                    success: false,
                    message: 'Email ou senha inválidos'
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});