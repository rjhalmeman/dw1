const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cookieParser());
app.use(express.json());

// CORS mais simples e direto
app.use((req, res, next) => {
    // Permite qualquer origem em desenvolvimento
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

// Log detalhado
app.use((req, res, next) => {
    console.log(`\n🔄 ${new Date().toISOString()}`);
    console.log(`📍 ${req.method} ${req.path}`);
    console.log(`🌐 Origin: ${req.headers.origin || 'N/A'}`);
    console.log(`🍪 Cookie Header: ${req.headers.cookie || 'N/A'}`);
    console.log(`📦 Cookies Parsed:`, req.cookies);
    next();
});

// Rota para verificar se o usuário está logado
app.get('/verificaSeUsuarioEstaLogado', (req, res) => {
    try {
        console.log('🔍 Verificando login...');
        
        const cookieRaw = req.headers.cookie;
        console.log('📋 Cookie bruto do header:', cookieRaw);
        
        const usuarioLogado = req.cookies.usuarioLogado
            ? JSON.parse(req.cookies.usuarioLogado)
            : null;

        console.log('👤 Usuário parseado:', usuarioLogado);

        if (usuarioLogado && usuarioLogado.nome && usuarioLogado.email) {
            console.log('✅ Usuário autenticado!');
            res.json({
                status: 'ok',
                nome: usuarioLogado.nome,
                email: usuarioLogado.email
            });
        } else {
            console.log('❌ Usuário não autenticado');
            res.json({ 
                status: 'error', 
                message: 'Usuário não está logado' 
            });
        }
    } catch (err) {
        console.error('💥 Erro ao verificar cookie:', err.message);
        res.status(500).json({ 
            status: 'error', 
            message: 'Erro interno ao verificar login' 
        });
    }
});

// Rota para fazer login - VERSÃO 1: httpOnly
app.post('/login', (req, res) => {
    try {
        const { nome, email } = req.body;
        console.log('🔐 Tentativa de login:', { nome, email });

        if (!nome || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Nome e email são obrigatórios'
            });
        }

        const userData = { nome: nome.trim(), email: email.trim() };

        // TESTE 1: Cookie httpOnly com configuração para localhost
        res.cookie('usuarioLogado', JSON.stringify(userData), {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            path: '/',
            sameSite: 'lax' // Para localhost, lax funciona melhor que none
        });

        console.log('🍪 Cookie httpOnly criado:', userData);
        
        res.json({ 
            status: 'ok', 
            message: 'Login realizado com sucesso',
            user: userData
        });
        
    } catch (err) {
        console.error('💥 Erro no login:', err.message);
        res.status(500).json({
            status: 'error',
            message: 'Erro interno no servidor'
        });
    }
});

// Rota alternativa - VERSÃO 2: Cookie não-httpOnly para teste
app.post('/login-test', (req, res) => {
    try {
        const { nome, email } = req.body;
        console.log('🧪 Login de teste:', { nome, email });

        if (!nome || !email) {
            return res.status(400).json({
                status: 'error',
                message: 'Nome e email são obrigatórios'
            });
        }

        const userData = { nome: nome.trim(), email: email.trim() };

        // TESTE 2: Cookie sem httpOnly (visível no JavaScript)
        res.cookie('usuarioLogado', JSON.stringify(userData), {
            httpOnly: false, // Permite acesso via JavaScript
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });

        console.log('🍪 Cookie não-httpOnly criado:', userData);
        
        res.json({ 
            status: 'ok', 
            message: 'Login de teste realizado com sucesso',
            user: userData,
            debug: 'Cookie não-httpOnly para teste'
        });
        
    } catch (err) {
        console.error('💥 Erro no login de teste:', err.message);
        res.status(500).json({
            status: 'error',
            message: 'Erro interno no servidor'
        });
    }
});

// Rota para logout
app.post('/logout', (req, res) => {
    try {
        console.log('🚪 Fazendo logout...');
        
        // Limpar ambos os tipos de cookie
        res.clearCookie('usuarioLogado', { path: '/', httpOnly: true });
        res.clearCookie('usuarioLogado', { path: '/', httpOnly: false });
        
        console.log('🍪 Cookies removidos');
        
        res.json({ 
            status: 'ok', 
            message: 'Logout realizado com sucesso' 
        });
        
    } catch (err) {
        console.error('💥 Erro no logout:', err.message);
        res.status(500).json({
            status: 'error',
            message: 'Erro interno no servidor'
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Servidor funcionando',
        timestamp: new Date().toISOString(),
        port: PORT
    });
});

// Debug completo
app.get('/debug', (req, res) => {
    res.json({
        cookies: req.cookies,
        headers: req.headers,
        cookieHeader: req.headers.cookie,
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log(`🚀 SERVIDOR DE TESTE RODANDO NA PORTA ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🔗 Health: http://localhost:${PORT}/health`);
    console.log(`🐛 Debug: http://localhost:${PORT}/debug`);
    console.log('');
    console.log('📋 ROTAS DISPONÍVEIS:');
    console.log('   POST /login        - Login com httpOnly cookie');
    console.log('   POST /login-test   - Login SEM httpOnly (teste)');
    console.log('   GET  /verificaSeUsuarioEstaLogado');
    console.log('   POST /logout');
    console.log('='.repeat(60));
});