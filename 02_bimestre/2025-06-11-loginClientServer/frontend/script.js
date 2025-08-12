
// Verifica autenticação e redireciona se necessário
async function checkAuth() {
    try {
        const response = await fetch('http://localhost:3001/check-auth', {
            method: 'GET',
            credentials: 'include'
        });

       
        if (!response.ok) throw new Error('Não autorizado');
        return await response.json();
    } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        return { authenticated: false };
    }
}

async function protectPage() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated.authenticated && isProtectedPage()) {
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
    }
    updateAuthUI(isAuthenticated.authenticated);
}

function isProtectedPage() {
    return window.location.pathname.includes('pagina1.html') ||
        window.location.pathname.includes('pagina2.html');
}

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

async function login() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha }),
            credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
            // alert(`Bem-vindo, ${data.nome}!`);
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

async function logout() {
    try {
        await fetch('http://localhost:3001/logout', {
            method: 'POST',
            credentials: 'include'
        });
        updateAuthUI(false);
        pessoaLogada = "";
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}

//chamado uma vez, ao iniciar cada página html
document.addEventListener('DOMContentLoaded', async () => {

    if (isProtectedPage()) {
        //alert("pagina protegida ")
        await protectPage();
    } else {
        const isAuthenticated = await checkAuth();
        console.log("está autenticado? " + isAuthenticated)
        updateAuthUI(isAuthenticated.authenticated);
    }
});
