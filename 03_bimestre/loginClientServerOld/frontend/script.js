// Verifica autenticação e redireciona se necessário
// async function checkAuth() {
//     try {
//         const response = await fetch('http://localhost:3001/check-auth', {
//             method: 'GET',
//             credentials: 'include'
//         });

//         if (!response.ok) throw new Error('Não autorizado');
        
//         const data = await response.json();
        
//         // Retorna os dados do usuário se estiver autenticado
//         if (data.authenticated && data.userData) {
//             return {
//                 authenticated: true,
//                 userData: data.userData
//             };
//         } else {
//             return { 
//                 authenticated: false,
//                 message: data.message || 'Não autenticado'
//             };
//         }
        
//     } catch (error) {
//         console.error('Erro ao verificar autenticação:', error);
//         return { 
//             authenticated: false,
//             error: error.message 
//         };
//     }
// }

async function checkAuth() {
    try {
        console.log('Fazendo requisição para /check-auth...');
        const response = await fetch('http://localhost:3001/check-auth', {
            method: 'GET',
            credentials: 'include'
        });

        console.log('Status:', response.status);
        
        const data = await response.json();
        console.log('Resposta:', data);
        
        return data;
        
    } catch (error) {
        console.error('Erro completo:', error);
        return { authenticated: false };
    }
}

async function protectPage() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated.authenticated && isProtectedPage()) {
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname);
    }
    updateAuthUI(isAuthenticated);
}

function isProtectedPage() {
    return window.location.pathname.includes('pagina1.html') ||
        window.location.pathname.includes('pagina2.html');
}

function updateAuthUI(authData) {
    const loginLinks = document.querySelectorAll('#login-link');
    const logoutLinks = document.querySelectorAll('#logout-link');
    const userElement = document.getElementById('idUsuario');
    
    if (authData.authenticated) {
        // Mostrar/ocultar links
        loginLinks.forEach(link => link.style.display = 'none');
        logoutLinks.forEach(link => link.style.display = 'inline');
        
        // Mostrar nome do usuário
        if (userElement && authData.userData) {
            userElement.textContent = `Olá, ${authData.userData.nome}!`;
            userElement.style.display = 'block';
        }
    } else {
        // Mostrar/ocultar links
        loginLinks.forEach(link => link.style.display = 'inline');
        logoutLinks.forEach(link => link.style.display = 'none');
        
        // Esconder ou limpar elemento do usuário
        if (userElement) {
            userElement.textContent = '';
            userElement.style.display = 'none';
        }
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
            // Atualiza a UI imediatamente após login bem-sucedido
            const authResult = await checkAuth();
            updateAuthUI(authResult);
            
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
        
        // Atualiza a UI após logout
        updateAuthUI({ authenticated: false });
        
        // Redireciona para a página inicial
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}

// Função para exibir informações do usuário em qualquer página
function displayUserInfo(userData) {
    const userElement = document.getElementById('idUsuario');
    if (userElement && userData) {
        userElement.textContent = `Olá, ${userData.nome}!`;
        userElement.style.display = 'block';
    }
    
    // Você pode adicionar mais elementos se quiser
    const userEmailElement = document.getElementById('user-email');
    if (userEmailElement && userData) {
        userEmailElement.textContent = userData.email;
    }
}

//chamado uma vez, ao iniciar cada página html
document.addEventListener('DOMContentLoaded', async () => {
    const authResult = await checkAuth();
    
    if (isProtectedPage()) {
        await protectPage();
    }
    
    updateAuthUI(authResult);
    
    // Exibe informações do usuário se estiver autenticado
    if (authResult.authenticated && authResult.userData) {
        console.log('Usuário autenticado:', authResult.userData.nome);
        console.log('Email:', authResult.userData.email);
        
        displayUserInfo(authResult.userData);
        
        // Você pode usar os dados do usuário em outras partes da página
        // Exemplo: personalizar saudação, exibir perfil, etc.
    } else {
        console.log('Usuário não autenticado');
    }
});