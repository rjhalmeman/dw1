let produtos = [];
let usuarios = [];
const categoriasFixas = ["blusas", "calcas", "vestidos", "saias", "acessorios"];

async function carregarDados() {
  const resProdutos = await fetch("http://localhost:3000/produtos");
  produtos = await resProdutos.json();

  const resUsuarios = await fetch("http://localhost:3000/users");
  usuarios = await resUsuarios.json();

  renderizarProdutos();
  renderizarUsuarios();
  atualizarResumo();
  popularCategorias();
}

function popularCategorias() {
  const select = document.getElementById("categoriaProduto");
  select.innerHTML = `<option value="">Selecione a categoria</option>`;
  categoriasFixas.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

function atualizarResumo() {
  document.getElementById("totalProdutos").innerText = produtos.length;
  document.getElementById("totalPromocoes").innerText = produtos.filter(p => p.promocao).length;
  const categoriasUnicas = new Set(produtos.map(p => p.categoria));
  document.getElementById("totalCategorias").innerText = categoriasUnicas.size;
}

function renderizarProdutos() {
  const tabela = document.getElementById("tabelaProdutos");
  tabela.innerHTML = "";
  const categoriasAgrupadas = {};

  produtos.forEach((p, i) => {
    if (!categoriasAgrupadas[p.categoria]) {
      categoriasAgrupadas[p.categoria] = [];
    }
    categoriasAgrupadas[p.categoria].push({ ...p, index: i });
  });

  for (const categoria in categoriasAgrupadas) {
    const header = document.createElement("tr");
    header.innerHTML = `<td colspan="6" style="background-color: #f1d0ff; font-weight:bold;">${categoria.toUpperCase()}</td>`;
    tabela.appendChild(header);

    categoriasAgrupadas[categoria].forEach(p => {
      const tr = document.createElement("tr");
const imagemSrc = p.imagem.startsWith("assets/") ? p.imagem : `assets/imagens/${p.imagem}`;
      tr.innerHTML = `
        <td><span>${p.nome}</span></td>
        <td><span>R$ ${parseFloat(p.preco).toFixed(2)}</span></td>
        <td><span>${p.categoria}</span></td>
        <td><span>${p.promocao ? "Sim" : "Não"}</span></td>
        <td><img src="${imagemSrc}" width="50"></td>
        <td>
          <button class="btn-editar" onclick="abrirEdicao(${p.index})">Editar</button>
          <button class="btn-excluir" onclick="excluirProduto(${p.index})">Excluir</button>
        </td>`;
      tabela.appendChild(tr);
    });
  }
}

function abrirEdicao(index) {
  const produto = produtos[index];
  const tabela = document.getElementById("tabelaProdutos");
  const novaLinha = document.createElement("tr");
  novaLinha.innerHTML = `
    <td><input value="${produto.nome}" id="editNome${index}"></td>
    <td><input value="${produto.preco}" type="number" id="editPreco${index}"></td>
    <td>
      <select id="editCategoria${index}">
        ${categoriasFixas.map(cat => `<option value="${cat}" ${produto.categoria === cat ? "selected" : ""}>${cat}</option>`).join("")}
      </select>
    </td>
    <td><input type="checkbox" id="editPromocao${index}" ${produto.promocao ? "checked" : ""}></td>
    <td><input type="text" id="editImagem${index}" value="${produto.imagem}"></td>
    <td><button onclick="salvarEdicao(${index})">Salvar</button></td>
  `;
  tabela.children[index + 1].replaceWith(novaLinha);
}

async function salvarEdicao(index) {
  const nome = document.getElementById(`editNome${index}`).value.trim();
  const preco = parseFloat(document.getElementById(`editPreco${index}`).value);
  const categoria = document.getElementById(`editCategoria${index}`).value.trim().toLowerCase();
  const imagem = document.getElementById(`editImagem${index}`).value.trim();
  const promocao = document.getElementById(`editPromocao${index}`).checked;

  const produto = {
    nome,
    preco,
    categoria,
    imagem,
    promocao,
    nomeOriginal: produtos[index].nome,
    categoriaOriginal: produtos[index].categoria
  };

  try {
    const res = await fetch("http://localhost:3000/atualizar-produto", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produto)
    });

    if (res.ok) {
      await carregarDados();
    } else {
      alert("Erro ao salvar edição.");
    }
  } catch (err) {
    console.error("Erro ao conectar com servidor:", err);
  }
}

async function excluirProduto(index) {
  if (!confirm("Tem certeza que deseja excluir este produto?")) return;
  const produto = produtos[index];

  try {
    const res = await fetch("http://localhost:3000/excluir-produto", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: produto.nome, categoria: produto.categoria })
    });

    if (res.ok) {
      alert("Produto excluído!");
      await carregarDados();
    } else {
      alert("Erro ao excluir produto.");
    }
  } catch (err) {
    console.error("Erro ao conectar com servidor:", err);
  }
}

document.getElementById("formProduto").addEventListener("submit", async e => {
  e.preventDefault();

  const nome = document.getElementById("nomeProduto").value.trim();
  const preco = parseFloat(document.getElementById("precoProduto").value);
  const categoria = document.getElementById("categoriaProduto").value.trim().toLowerCase();
  const imagemInput = document.getElementById("imagemProduto");
  const promocao = document.getElementById("produtoPromocao").checked;

   if (imagemInput.files.length === 0) {
    alert("Por favor, selecione uma imagem.");
    return;
  }

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("preco", preco);
  formData.append("categoria", categoria);
  formData.append("promocao", promocao);
  formData.append("imagem", imagemInput.files[0]);

  try {
    const res = await fetch("http://localhost:3000/produtos", {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      alert("Produto adicionado com sucesso!");
      e.target.reset();
      await carregarDados();
    } else {
      alert("Erro ao adicionar produto.");
    }
  } catch (err) {
    console.error("Erro ao conectar com servidor:", err);
  }
});

function renderizarUsuarios() {
  const tabela = document.getElementById("tabelaUsuarios");
  tabela.innerHTML = "";

  usuarios.forEach((u, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input value="${u.name}" onchange="editarUsuario(${i}, 'name', this.value)"></td>
      <td><input value="${u.email}" onchange="editarUsuario(${i}, 'email', this.value)"></td>
      <td><input value="${u.password}" onchange="editarUsuario(${i}, 'password', this.value)"></td>
      <td><input value="${u.cpf}" onchange="editarUsuario(${i}, 'cpf', this.value)"></td>
      <td><input value="${u.birthdate}" onchange="editarUsuario(${i}, 'birthdate', this.value)"></td>
      <td><input value="${u.cidade}" onchange="editarUsuario(${i}, 'cidade', this.value)"></td>
      <td><input value="${u.estado}" onchange="editarUsuario(${i}, 'estado', this.value)"></td>
      <td><input value="${u.rua}" onchange="editarUsuario(${i}, 'rua', this.value)"></td>
      <td><input value="${u.numero}" onchange="editarUsuario(${i}, 'numero', this.value)"></td>
      <td><input value="${u.cep}" onchange="editarUsuario(${i}, 'cep', this.value)"></td>
      <td>${u.role}</td>
      <td>
        <button class="btn-trocar" onclick="trocarPapel(${i})">Mudar Papel</button>
        <button class="btn-excluir" onclick="excluirUsuario(${i})">Excluir</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

function editarUsuario(index, campo, valor) {
  usuarios[index][campo] = valor;
}


async function trocarPapel(index) {
  usuarios[index].role = usuarios[index].role === "gerente" ? "cliente" : "gerente";
  await salvarTudo();
}

async function excluirUsuario(index) {
  if (!confirm("Tem certeza que deseja excluir este usuário?")) return;
  usuarios.splice(index, 1);
  await salvarTudo();
}

async function salvarTudo() {
  try {
    const res = await fetch("http://localhost:3000/update-users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuarios)
    });

    if (res.ok) {
      alert("Alterações salvas com sucesso!");
      await carregarDados();
    } else {
      alert("Erro ao salvar alterações.");
    }
  } catch (err) {
    console.error("Erro ao conectar com servidor:", err);
  }
}

carregarDados();
