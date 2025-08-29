
const API = 'http://localhost:3001';

function $(sel) { return document.querySelector(sel); }

async function checkAuth() {
  try {
    const res = await fetch(`${API}/check-auth`, { credentials: 'include' });
    const data = await res.json();
    return data;
  } catch (e) {
    return { authenticated: false };
  }
}

function isProtectedPage() {
  const path = location.pathname;
  return path.endsWith('pagina1.html') || path.endsWith('pagina2.html');
}

async function protectPage() {
  const auth = await checkAuth();
  updateAuthUI(auth);
  if (!auth.authenticated && isProtectedPage()) {
    const redirect = encodeURIComponent(location.pathname.replace(/^.*\//, ''));
    location.href = `login.html?redirect=${redirect}`;
  }
}

function updateAuthUI(auth) {
  const loginLink = $('#login-link');
  const logoutLink = $('#logout-link');
  const idUsuario = $('#idUsuario');
  if (!loginLink || !logoutLink || !idUsuario) return;
  if (auth.authenticated) {
    loginLink.style.display = 'none';
    logoutLink.style.display = 'inline';
    idUsuario.textContent = `ID ${auth.user.id} · ${auth.user.nome}`;
  } else {
    loginLink.style.display = 'inline';
    logoutLink.style.display = 'none';
    idUsuario.textContent = 'Visitante';
  }
}

async function login() {
  const email = $('#email').value.trim();
  const senha = $('#senha').value.trim();
  $('#login-error').textContent = '';

  try {
    const res = await fetch(`${API}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, senha })
    });

    alert("Status: " + res.status);

    if (!res.ok) {
      const txt = await res.text();
      alert("Erro no login: " + txt);
      return;
    }

    // pega o corpo da resposta em JSON
    const data = await res.json();
    alert("Resposta JSON: " + JSON.stringify(data));

    if (data.status === 'ok') {
      // salvar usuário na tela
      $('#idUsuario').textContent = data.user.nome + " (id:" + data.user.id + ")";
      window.location.href = "index.html";
    } else {
      $('#login-error').textContent = 'Credenciais inválidas';
    }

  } catch (err) {
    console.error(err);
    $('#login-error').textContent = 'Erro de conexão';
  }
}


async function logout(ev) {
  if (ev) ev.preventDefault();
  await fetch(`${API}/logout`, { method: 'POST', credentials: 'include' });
  // after logout, go home
  location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  protectPage();

  const btn = document.getElementById('btnLogin');
  if (btn) btn.addEventListener('click', login);

  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) logoutLink.addEventListener('click', logout);
});
