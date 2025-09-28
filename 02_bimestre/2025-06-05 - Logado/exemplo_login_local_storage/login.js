document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Exemplo fixo de usuário e senha
  if (username === "admin" && password === "1234") {
    localStorage.setItem("logado", "true");//salva no localStorage o status do usuário
    window.location.href = "home.html";
  } else {
    document.getElementById("msg").textContent = "Usuário ou senha inválidos!";
  }
});
