if (localStorage.getItem("logado") !== "true") {
  alert("Você precisa estar logado para acessar esta página.");
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("logado");
  window.location.href = "index.html";
}
