const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());

// Substitua o middleware CORS atual por este:
// Middleware CORS atualizado
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:5500'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true'); // ✅ Permite cookies
  next();
});

// Rota de login atualizada
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    res.cookie('logado', 'true', {
      maxAge: 900000,
      httpOnly: true,
      sameSite: 'None', // 👈 Para desenvolvimento local
      secure: false     // 👈 Em produção, use 'true' se tiver HTTPS
    });
    res.send({ success: true, nome: usuario.nome });
  } else {
    res.status(401).send({ success: false, message: 'Credenciais inválidas' });
  }
});


// Middleware CORS
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });

// Lista de usuários
const usuarios = [
    { email: 'joao@email.com', senha: 'abc123', nome: 'João', tipo: 'admin' },
    { email: 'maria@email.com', senha: 'abcd', nome: 'Maria', tipo: 'comum' }
];

// Middleware para verificar autenticação
const checkAuth = (req, res, next) => {
  if (req.cookies.logado === 'true') {
    next(); // Usuário autenticado, prossegue
  } else {
    res.status(401).json({ authenticated: false }); // Não autorizado
  }
};

// Middleware para verificar login
app.get('/check-auth', (req, res) => {
  // Verifica se o cookie 'logado' existe e é 'true'
  if (req.cookies.logado === 'true') {
    res.send({ authenticated: true });
  } else {
    res.status(401).send({ authenticated: false }); // 401 só se você quiser tratar como erro
    // Ou use 200 para simplificar:
    // res.send({ authenticated: false });
  }
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (usuario) {
        res.cookie('logado', 'true', { 
            maxAge: 900000, 
            httpOnly: true,
            sameSite: 'Lax', // Adicione para segurança
            secure: false    // Use 'true' em produção (HTTPS)
        });
        
        console.log('Cookie definido:', {
            nome: 'logado',
            valor: 'true',
            opcoes: { maxAge: 900000, httpOnly: true }
        });

        res.send({ success: true, nome: usuario.nome });
    } else {
        res.status(401).send({ success: false, message: 'Email ou senha inválidos' });
    }
});

// Rota de logout
app.post('/logout', (req, res) => {
    res.clearCookie('logado');
    res.send({ success: true });
});

// Rota protegida para verificar autenticação
app.get('/check-auth', checkAuth, (req, res) => {
    res.send({ authenticated: true });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.post('/logout', (req, res) => {
  res.clearCookie('logado');
  res.send({ success: true });
});