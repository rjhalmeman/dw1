const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;

app.use(cookieParser());
app.use(express.json());

// CORS simplificado e funcional
app.use((req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'http://localhost:3000'];
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
  try {
    console.log('Cookies recebidos:', req.cookies);

    if (req.cookies.userData) {
      const userData = JSON.parse(req.cookies.userData);

      if (userData.logado === true && userData.nome) {
        req.userData = userData;
        return next();
      }
    }

    res.status(401).json({ authenticated: false });

  } catch (error) {
    res.status(401).json({ authenticated: false });
  }
};

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    console.log("Login bem sucedido para", usuario.nome);

    // Cookie SIMPLES sem assinatura
    res.cookie('userData', JSON.stringify({
      logado: true,
      nome: usuario.nome,
      email: usuario.email
    }), {
      maxAge: 900000,
      httpOnly: true,
      sameSite: 'Lax',
      secure: false
    });

    res.json({ success: true, nome: usuario.nome });
  } else {
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('userData');
  res.json({ success: true });
});

app.get('/check-auth', checkAuth, (req, res) => {
  res.json({
    authenticated: true,
    userData: req.userData
  });
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});