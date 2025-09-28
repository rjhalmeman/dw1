const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:5500',
    'http://127.0.0.1:5501',
    'http://localhost:5500',
    'http://localhost:5501',
    'http://localhost:3000'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const usuarios = [
  { email: 'joao@email.com', senha: 'abc123', nome: 'João' },
  { email: 'maria@email.com', senha: 'abcd', nome: 'Maria' }
];

const checkAuth = (req, res, next) => {
  console.log("Verificando autenticação...   checkAuth");
  if (req.cookies.logado === 'true') {
    next();
  } else {
    res.status(401).json({ authenticated: false });
  }
};

app.post('/login', (req, res) => {
  console.log("Recebendo tentativa de login..." + JSON.stringify(req.body));
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    console.log("login bem sucedido para " + usuario.nome.toUpperCase());
    res.cookie('logado', 'true', {
      maxAge: 900000,
      httpOnly: true,
      sameSite: 'None',
      secure: true // isso deve ser mudado para false quando o programa for para produção
    });
    res.send({ success: true, nome: usuario.nome });
  } else {
    res.status(401).send({ success: false, message: 'Credenciais inválidas' });
  }
});


app.post('/logout', (req, res) => {
  //precisa ser igual ao cookie criado
  res.clearCookie('logado', {
    sameSite: 'None',
    secure: true,
    httpOnly: true
    // Não é necessário incluir maxAge ao limpar
  });
  console.log("Cookie 'logado' removido com sucesso");
  res.send({ success: true });
});

app.get('/check-auth', checkAuth, (req, res) => {
  res.send({ authenticated: true });
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});
