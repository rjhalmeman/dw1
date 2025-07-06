// BACKEND - server.js
// =============================================================================
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3001;

// Base de dados de usuários
const Pessoas = [
    { id: 1, nome: 'João Silva', email: 'joao@admin.com', senha: '123456', cargo: 'admin' },
    { id: 2, nome: 'Maria Santos', email: 'maria@client.com', senha: '654321', cargo: 'client' },
    { id: 3, nome: 'Pedro Admin', email: 'pedro@admin.com', senha: 'admin123', cargo: 'admin' },
    { id: 4, nome: 'Ana Cliente', email: 'ana@client.com', senha: 'client123', cargo: 'client' }
];

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do CORS
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
    //   'http://localhost:5500',
      'http://127.0.0.1:5500'
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origem não permitida pelo CORS'));
    }
  },
  credentials: true
}));



// Configuração da sessão
app.use(session({
    secret: 'minha-chave-secreta-super-segura',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true apenas em HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 horas
    }
}));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Middleware para verificar autenticação
const verificarAuth = (req, res, next) => {
    if (req.session.usuario) {
        next();
    } else {
        res.status(401).json({ erro: 'Usuário não autenticado' });
    }
};

// Middleware para verificar se é admin
const verificarAdmin = (req, res, next) => {
    if (req.session.usuario && req.session.usuario.cargo === 'admin') {
        next();
    } else {
        res.status(403).json({ erro: 'Acesso negado. Apenas administradores.' });
    }
};

// Rotas de autenticação
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
    }

    const usuario = Pessoas.find(p => p.email === email && p.senha === senha);

    if (usuario) {
        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            cargo: usuario.cargo
        };

        res.json({
            sucesso: true,
            usuario: {
                nome: usuario.nome,
                cargo: usuario.cargo
            }
        });
    } else {
        res.status(401).json({ erro: 'Email ou senha incorretos' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ erro: 'Erro ao fazer logout' });
        }
        res.clearCookie('connect.sid');
        res.json({ sucesso: true });
    });
});

// Verificar se está logado
app.get('/api/verificar-auth', (req, res) => {
    console.log(">>> [verificar-auth] Requisição recebida");
    console.log("Cookies recebidos:", req.headers.cookie);
    console.log("Sessão completa:", req.session);

    if (req.session.usuario) {
        console.log("Usuário autenticado:", req.session.usuario);
        res.json({
            autenticado: true,
            usuario: {
                nome: req.session.usuario.nome,
                cargo: req.session.usuario.cargo
            }
        });
    } else {
        console.log("Nenhum usuário na sessão.");
        res.json({ autenticado: false });
    }
});


// Rotas protegidas
app.get('/api/admin', verificarAuth, verificarAdmin, (req, res) => {
    res.json({
        mensagem: 'Área administrativa',
        usuario: req.session.usuario,
        dados: 'Dados sensíveis do sistema'
    });
});

app.get('/api/client', verificarAuth, (req, res) => {
    res.json({
        mensagem: 'Área do cliente',
        usuario: req.session.usuario,
        dados: 'Dados do cliente'
    });
});

// Rota para listar usuários (apenas admin)
app.get('/api/usuarios', verificarAuth, verificarAdmin, (req, res) => {
    const usuarios = Pessoas.map(p => ({
        id: p.id,
        nome: p.nome,
        email: p.email,
        cargo: p.cargo
    }));
    res.json(usuarios);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('\nUsuários disponíveis:');
    Pessoas.forEach(p => {
        console.log(`- ${p.nome} (${p.email}) - Cargo: ${p.cargo} - Senha: ${p.senha}`);
    });
});