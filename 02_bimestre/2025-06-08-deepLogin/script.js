// Verifica autenticação e redireciona se necessário
async function checkAuth() {
    try {
        const response = await fetch('http://localhost:3001/check-auth', {
            method: 'GET',
            credentials: 'include' // 🔥 Isso é ESSENCIAL para enviar cookies!
        });

        if (!response.ok) throw new Error('Não autorizado');
        return await response.json();
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        return { authenticated: false };
    }
}

// Verifica autenticação ao carregar páginas protegidas
async function protectPage() {
    debugger
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated && isProtectedPage()) {
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
    }
    updateAuthUI(isAuthenticated);
}

// Verifica se a página atual é protegida
function isProtectedPage() {
    debugger
    return window.location.pathname.includes('pagina1.html') ||
        window.location.pathname.includes('pagina2.html');
}

// Atualiza a UI de login/logout
async function updateAuthUI(isAuthenticated) {
    debugger
    const loginLinks = document.querySelectorAll('#login-link');
    const logoutLinks = document.querySelectorAll('#logout-link');

    if (isAuthenticated) {
        loginLinks.forEach(link => link.style.display = 'none');
        logoutLinks.forEach(link => link.style.display = 'inline');
    } else {
        loginLinks.forEach(link => link.style.display = 'inline');
        logoutLinks.forEach(link => link.style.display = 'none');
    }
}

// Função de login
async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
            credentials: 'include' // 👈 Isso é obrigatório!
        });

        const data = await response.json();

        if (data.success) {
            alert(`Bem-vindo, ${data.nome}!`);
            // Redireciona após 0.5s (para garantir que o cookie seja processado)
            setTimeout(() => {
                const redirect = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
                window.location.href = redirect;
            }, 500);
        } else {
            document.getElementById('login-error').textContent = data.message;
        }
    } catch (error) {
        document.getElementById('login-error').textContent = 'Erro na conexão';
    }
}


// Função para verificar estado de autenticação
async function checkAuthState() {
  try {
    const response = await fetch('http://localhost:3001/check-auth', {
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao verificar autenticação:', error);
    return { authenticated: false };
  }
}

// Função de logout
async function logout() {
  try {
    await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include'
    });
    // Atualiza a UI após logout
    updateAuthUI(false);
    window.location.href = 'index.html';
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
}

// Função para atualizar a interface
function updateAuthUI(isAuthenticated) {
  const loginLinks = document.querySelectorAll('#login-link');
  const logoutLinks = document.querySelectorAll('#logout-link');
  
  if (isAuthenticated) {
    loginLinks.forEach(link => link.style.display = 'none');
    logoutLinks.forEach(link => link.style.display = 'inline');
  } else {
    loginLinks.forEach(link => link.style.display = 'inline');
    logoutLinks.forEach(link => link.style.display = 'none');
  }
}



// Inicialização
document.addEventListener('DOMContentLoaded', async () => {
    if (isProtectedPage()) {
        await protectPage();
    } else {
        const isAuthenticated = await checkAuth();
        updateAuthUI(isAuthenticated);
    }
});