
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

// Basic users "database" for demo
const USERS = [
  { id: 1, nome: 'João', email: 'joao@email.com', senha: 'abc123' },
  { id: 2, nome: 'Maria', email: 'maria@email.com', senha: 'abc123' }
];

// In-memory sessions { sid: { id, nome, email } }
const SESSIONS = new Map();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: (origin, cb) => {
    const allowed = ['http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'http://localhost:3000', 'http://localhost:5173'];
    // allow tools / file URLs (no origin)
    if (!origin || allowed.includes(origin)) return cb(null, true);
    cb(new Error('Origin not allowed by CORS'));
  },
  credentials: true
}));

// Helpers
function createSid() {
  return crypto.randomBytes(24).toString('hex');
}

function authMiddleware(req, res, next) {
  const sid = req.cookies.sid;
  if (!sid || !SESSIONS.has(sid)) {
    return res.status(401).json({ authenticated: false, message: 'Não autorizado' });
  }
  req.user = SESSIONS.get(sid);
  next();
}

// Routes
app.get('/', (req, res) => res.json({ ok: true, msg: 'API ok' }));

app.post('/login', (req, res) => {
  const { email, senha } = req.body || {};

  console.log(`Login attempt: ${email} - ${senha}`);
  const user = USERS.find(u => u.email === email && u.senha === senha);
  if (!user) return res.status(401).json({ success: false, message: 'Credenciais inválidas' });

  const sid = createSid();
  const userData = { id: user.id, nome: user.nome, email: user.email };
  SESSIONS.set(sid, userData);

  // HttpOnly cookie for security; front-end gets user via /check-auth
  res.cookie('sid', sid, {
    httpOnly: true,
    sameSite: 'lax', // 'lax' for same-site, 'none' if cross-origin
    secure: false, // true if using https
    maxAge: 1000 * 60 * 60 * 8 // 8h
  });

  return res.json({ success: true, user: userData });
});

app.post('/logout', (req, res) => {
  const sid = req.cookies.sid;
  if (sid) SESSIONS.delete(sid);
  res.clearCookie('sid', { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ success: true });
});

app.get('/check-auth', (req, res) => {
  const sid = req.cookies.sid;
  if (sid && SESSIONS.has(sid)) {
    return res.json({ authenticated: true, user: SESSIONS.get(sid) });
  }
  res.json({ authenticated: false });
});

// Example of a protected API route
app.get('/secret', authMiddleware, (req, res) => {
  res.json({ message: `Olá, ${req.user.nome}! Este é um endpoint protegido.` });
});

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});
