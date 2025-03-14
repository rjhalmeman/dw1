function editarLinha(id) {
    console.log(`Editar linha ${id}`);
}

function excluirLinha(id) {
    console.log(`Excluir linha ${id}`);
}

function salvarDados() {
    const data = document.getElementById('input-data').value;
    const descricao = document.getElementById('input-descricao').value;
    const valor = document.getElementById('input-valor').value;
    const operacao = document.getElementById('input-operacao').value;
    const quitado = document.getElementById('input-quitado').value;

    if (data && descricao && valor && operacao && quitado) {
        const tabela = document.querySelector('table tbody');
        const novaLinha = document.createElement('tr');
        novaLinha.className = operacao === 'D' ? 'debito' : 'credito';
        novaLinha.innerHTML = `
            <td>${data}</td>
            <td>${descricao}</td>
            <td>${parseFloat(valor).toFixed(2)}</td>
            <td>${operacao}</td>
            <td>${quitado}</td>
            <td>
                <button onclick="editarLinha(0)">Editar</button>
                <button onclick="excluirLinha(0)">Excluir</button>
            </td>
        `;
        tabela.appendChild(novaLinha);

        // Limpar os campos após salvar
        document.getElementById('input-data').value = '';
        document.getElementById('input-descricao').value = '';
        document.getElementById('input-valor').value = '';
        document.getElementById('input-operacao').value = 'D';
        document.getElementById('input-quitado').value = 'Sim';
    } else {
        alert('Preencha todos os campos antes de salvar.');
    }
}