
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const mensagemDiv = document.getElementById('mensagem');

    try {
        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const data = await response.json();

        mensagemDiv.style.display = 'block';

        if (response.ok) {
            mensagemDiv.className = 'sucesso';
            mensagemDiv.innerHTML = `
                Login realizado com sucesso!<br>
                Nome: ${data.user.nome}<br>
                CPF: ${data.user.cpf}<br>
                Email: ${data.user.email}
            `;
        } else {
            mensagemDiv.className = 'erro';
            mensagemDiv.textContent = data.message;
        }
    } catch (error) {
        mensagemDiv.style.display = 'block';
        mensagemDiv.className = 'erro';
        mensagemDiv.textContent = 'Erro ao conectar com o servidor. Verifique se o servidor está rodando.';
    }
});
