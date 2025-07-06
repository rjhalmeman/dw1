// Base de dados dos produtos - agora será carregada do servidor
let produtos = {
  hamburgueres: [],
  bebidas: [],
  sobremesas: []
};

// Referências aos elementos DOM
const produtosDiv = document.getElementById("produtos");
const subtotalSpan = document.getElementById("subtotal");
const subtotalFixo = document.getElementById("subtotal-fixo");
let categoriaAtual = "hamburgueres"; // Categoria padrão
let quantidadesSalvas = {}; // Armazena as quantidades selecionadas

// Carrega os produtos do servidor
async function carregarProdutosDoServidor() {
  try {
    const response = await fetch('http://localhost:3000/produtos');
    const produtosServidor = await response.json();
    
    // Organizar produtos por categoria
    produtos = {
      hamburgueres: [],
      bebidas: [],
      sobremesas: []
    };
    
    produtosServidor.forEach(produto => {
      if (produtos[produto.categoria]) {
        produtos[produto.categoria].push({
          nome: produto.nome,
          preco: produto.preco,
          img: produto.imagem
        });
      }
    });
    
    // Carregar a categoria padrão
    carregarProdutos(categoriaAtual);
  } catch (error) {
    console.error('Erro ao carregar produtos do servidor:', error);
    // Fallback para produtos estáticos se o servidor não estiver disponível
    carregarProdutosEstaticos();
  }
}

// Produtos estáticos como fallback
function carregarProdutosEstaticos() {
  produtos = {
    hamburgueres: [
      { nome: "Clássico", preco: 18, img: "imagens/classico.jpg" },
      { nome: "Cheddar Bacon", preco: 22, img: "imagens/cheddar.jpg" },
      { nome: "Duplo", preco: 25, img: "imagens/duplo.jpg" },
      { nome: "Frango Crocante", preco: 20, img: "imagens/frangocro.jpg" },
      { nome: "Vegano", preco: 21, img: "imagens/vegano.jpg" },
      { nome: "Barbecue", preco: 23, img: "imagens/barbecue.jpg" },
      { nome: "Egg Burger", preco: 19, img: "imagens/egg.jpg" },
      { nome: "Blue Cheese", preco: 26, img: "imagens/bluecheese.jpg" },
      { nome: "Chili Burger", preco: 24, img: "imagens/chili.jpg" },
      { nome: "Picanha", preco: 28, img: "imagens/picanha.jpg" },
      { nome: "Costela", preco: 30, img: "imagens/costela.jpg" },
      { nome: "Smash Burger", preco: 18, img: "imagens/smash.jpg" },
      { nome: "Onion Burger", preco: 21, img: "imagens/onion.jpg" },
      { nome: "Molho da Casa", preco: 22, img: "imagens/molho.jpg" },
      { nome: "Texano", preco: 27, img: "imagens/texano.jpg" },
      { nome: "Trufado", preco: 32, img: "imagens/trufado.jpg" },
    ],
    bebidas: [
      { nome: "Refrigerante Lata", preco: 6, img: "imagens/coca.png" },
      { nome: "Suco Natural", preco: 8, img: "imagens/suco.png" },
      { nome: "Água Mineral", preco: 4, img: "imagens/agua.png" },
      { nome: "Cerveja Artesanal", preco: 12, img: "imagens/cerveja.png" },
      { nome: "Milkshake", preco: 14, img: "imagens/milkshake.png" },
      { nome: "Chá Gelado", preco: 7, img: "imagens/cha.png" }
    ],
    sobremesas: [
      { nome: "Brownie", preco: 10, img: "imagens/brownie.png" },
      { nome: "Sorvete", preco: 8, img: "imagens/sorvete.png" },
      { nome: "Torta de Chocolate", preco: 12, img: "imagens/tortachocolate.png" },
      { nome: "Petit Gateau", preco: 15, img: "imagens/petit.png" },
      { nome: "Mousse", preco: 9, img: "imagens/mousse.png" }
    ]
  };
  carregarProdutos(categoriaAtual);
}

// Carrega os produtos de uma categoria específica
function carregarProdutos(categoria) {
  produtosDiv.innerHTML = "";
  const listaProdutos = produtos[categoria] || [];
  
  for (let i = 0; i < listaProdutos.length; i++) {
    const card = document.createElement("div");
    card.className = "card";
    // Recupera a quantidade salva ou usa 0 como padrão
    const qtdSalva = quantidadesSalvas[`qtd-${categoria}-${i}`] || 0;
    
    // HTML do card do produto
    card.innerHTML = `
      <img src="${listaProdutos[i].img}" alt="${listaProdutos[i].nome}">
      <h3>${listaProdutos[i].nome}</h3>
      <p>R$ ${listaProdutos[i].preco.toFixed(2)}</p>
      <input type="number" id="qtd-${categoria}-${i}" min="0" value="${qtdSalva}" onchange="atualizarSubtotal()"/>
    `;
    produtosDiv.appendChild(card);
  }
}

// Salva as quantidades selecionadas em um objeto
function salvarQuantidades() {
  for (const categoria in produtos) {
    const listaProdutos = produtos[categoria];
    for (let i = 0; i < listaProdutos.length; i++) {
      const input = document.getElementById(`qtd-${categoria}-${i}`);
      if (input) {
        quantidadesSalvas[`qtd-${categoria}-${i}`] = parseInt(input.value) || 0;
      }
    }
  }
}

// Filtra os produtos por categoria
function filtrarProdutos(categoria) {
  salvarQuantidades(); // Salva antes de mudar de categoria
  categoriaAtual = categoria;
  carregarProdutos(categoria);
  
  // Atualiza a aparência dos botões de categoria
  document.querySelectorAll(".categoria-btn").forEach(btn => {
    btn.classList.remove("active");
    if (btn.textContent.toLowerCase().includes(categoria)) {
      btn.classList.add("active");
    }
  });
  
  atualizarSubtotal();
}

// Filtra os produtos por termo de pesquisa
function filtrarPorPesquisa() {
  const termo = document.getElementById('input-pesquisa').value.toLowerCase();
  if (!termo) {
    carregarProdutos(categoriaAtual);
    return;
  }

  // Filtra os produtos que correspondem ao termo
  const produtosFiltrados = produtos[categoriaAtual].filter(produto => 
    produto.nome.toLowerCase().includes(termo)
  );

  produtosDiv.innerHTML = "";
  
  // Cria os cards para os produtos filtrados
  for (let i = 0; i < produtosFiltrados.length; i++) {
    const produto = produtosFiltrados[i];
    const indexOriginal = produtos[categoriaAtual].indexOf(produto);
    const qtdSalva = quantidadesSalvas[`qtd-${categoriaAtual}-${indexOriginal}`] || 0;

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${produto.img}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <input type="number" id="qtd-${categoriaAtual}-${indexOriginal}" min="0" value="${qtdSalva}" onchange="atualizarSubtotal()"/>
    `;
    produtosDiv.appendChild(card);
  }
}

// Atualiza o subtotal baseado nas quantidades selecionadas
function atualizarSubtotal() {
  salvarQuantidades();
  let subtotal = 0;
  
  // Calcula o subtotal somando preço * quantidade para todos os produtos
  for (const categoria in produtos) {
    const listaProdutos = produtos[categoria];
    for (let i = 0; i < listaProdutos.length; i++) {
      const qtd = quantidadesSalvas[`qtd-${categoria}-${i}`] || 0;
      subtotal += listaProdutos[i].preco * qtd;
    }
  }

  // Atualiza os elementos de subtotal na página
  if (subtotalSpan) subtotalSpan.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
  if (subtotalFixo) subtotalFixo.textContent = `Subtotal: R$ ${subtotal.toFixed(2)}`;
}

// Prepara e redireciona para o carrinho
function irParaCarrinho() {
  // Verificar se o usuário está logado antes de ir para o carrinho
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  if (!isLoggedIn || !currentUser.email) {
    alert('Você precisa estar logado para acessar o carrinho. Redirecionando para a página de login...');
    window.location.href = 'login.html';
    return;
  }
  
  const carrinho = [];
  
  // Cria o carrinho com os itens que têm quantidade > 0
  for (const categoria in produtos) {
    const listaProdutos = produtos[categoria];
    for (let i = 0; i < listaProdutos.length; i++) {
      const qtd = quantidadesSalvas[`qtd-${categoria}-${i}`] || 0;
      if (qtd > 0) {
        carrinho.push({
          nome: listaProdutos[i].nome,
          preco: listaProdutos[i].preco,
          quantidade: qtd,
          categoria: categoria
        });
      }
    }
  }
  
  // Salva no localStorage e redireciona
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  window.location.href = "carrinho.html";
}

// Eventos quando o DOM é carregado
document.addEventListener('DOMContentLoaded', function() {
  // Configura o evento de Enter na barra de pesquisa
  const inputPesquisa = document.getElementById('input-pesquisa');
  if (inputPesquisa) {
    inputPesquisa.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        filtrarPorPesquisa();
      }
    });
  }
  
  // Carrega os produtos do servidor
  carregarProdutosDoServidor();
});

