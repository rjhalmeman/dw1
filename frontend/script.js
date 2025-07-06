let usuarioLogado = null;
const API_URL = 'http://127.0.0.1:3001'; // URL do servidor backend

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    verificarAutenticacao();
    configurarEventListeners();
});

// Configurar event listeners
function configurarEventListeners() {
    // Form de login
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', fazerLogin);
    }

    // Botão de logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', fazerLogout);
    }
}

// Verificar se o usuário está autenticado
async function verificarAutenticacao() {
    try {
        const response = await fetch(`${API_URL}/api/verificar-auth`, {
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.autenticado) {
            usuarioLogado = data.usuario;
            mostrarUsuarioLogado();
        } else {
            mostrarFormLogin();
        }
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        mostrarFormLogin();
    }
}

// Fazer login
async function fazerLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const errorDiv = document.getElementById('error-message');
    
    try {
        const url = `${API_URL}/api/login`
        alert(url);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, senha })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            usuarioLogado = data.usuario;
            mostrarUsuarioLogado();
            esconderErro();
        } else {
            mostrarErro(data.erro);
        }
    } catch (error) {
        console.error('Erro no login:', error);
        mostrarErro('Erro de conexão. Tente novamente.');
    }
}

// Fazer logout
async function fazerLogout() {
    debugger
    try {
        const response = await fetch(`${API_URL}/api/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            usuarioLogado = null;
            mostrarFormLogin();
            
            // Se estiver em página protegida, redirecionar para home
            if (window.location.pathname !== 'http://127.0.0.1:5500/frontend' && window.location.pathname !== 'http://127.0.0.1:5500/frontend/index.html') {
                window.location.href = 'http://127.0.0.1:5500/frontend';
            }
        }
    } catch (error) {
        console.error('Erro no logout:', error);
    }
}

// Mostrar usuário logado
function mostrarUsuarioLogado() {
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const loginForm = document.getElementById('login-form');
    const protectedContent = document.getElementById('protected-content');
    const adminLink = document.getElementById('admin-link');
    
    if (userInfo && userName) {
        userName.textContent = `Olá, ${usuarioLogado.nome}`;
        userInfo.style.display = 'flex';
    }
    
    if (loginForm) {
        loginForm.style.display = 'none';
    }
    
    if (protectedContent) {
        protectedContent.style.display = 'block';
    }
    
    // Mostrar link admin apenas para administradores
    if (adminLink && usuarioLogado.cargo === 'admin') {
        adminLink.style.display = 'inline-block';
    }
}

// Mostrar form de login
function mostrarFormLogin() {
    const userInfo = document.getElementById('user-info');
    const loginForm = document.getElementById('login-form');
    const protectedContent = document.getElementById('protected-content');
    
    if (userInfo) {
        userInfo.style.display = 'none';
    }
    
    if (loginForm) {
        loginForm.style.display = 'block';
    }
    
    if (protectedContent) {
        protectedContent.style.display = 'none';
    }
}

// Mostrar erro
function mostrarErro(mensagem) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = mensagem;
        errorDiv.style.display = 'block';
    }
}

// Esconder erro
function esconderErro() {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
}

// Utilidade para fazer requisições autenticadas
async function fetchAutenticado(url, options = {}) {
    const defaultOptions = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        }
    };
    
    return fetch(url, { ...defaultOptions, ...options });
}