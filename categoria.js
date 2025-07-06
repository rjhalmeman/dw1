document.addEventListener("DOMContentLoaded", function () {
  let products = [];

  async function carregarProdutos() {
    try {
      const res = await fetch("http://localhost:3000/produtos");
      products = await res.json();
      renderizarCategoria();
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }

  function renderizarCategoria() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("cat");

    const title = document.getElementById("categoryTitle");
    if (title && category) {
      title.innerText = `Categoria: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    }

    const categoryProducts = products.filter(product => product.categoria === category);
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    categoryProducts.forEach(product => {
      const nomeFormatado = product.nome.replace(/\s+/g, "-").toLowerCase();

      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.imagem}" alt="${product.nome}" />
        <h3>${product.nome}</h3>
        <p>R$ ${parseFloat(product.preco).toFixed(2)}</p>
        <div class="quantity-controls">
            <button class="decrease" onclick="updateQuantity('${nomeFormatado}', -1)">-</button>
            <span id="qty-${nomeFormatado}" class="quantity">1</span>
            <button class="increase" onclick="updateQuantity('${nomeFormatado}', 1)">+</button>
        </div>
        <button class="add-to-cart-btn" onclick="handleAddToCart('${product.nome}', ${product.preco}, '${product.imagem}', '${nomeFormatado}')">Adicionar ao carrinho</button>
      `;
      productList.appendChild(card);
    });
  }

  window.handleAddToCart = (nome, preco, imagem, idFormatado) => {
    const quantidade = parseInt(document.getElementById(`qty-${idFormatado}`).innerText);

    const product = {
      name: nome,
      price: parseFloat(preco),
      img: imagem,
      quantity: quantidade
    };

    // Puxa o carrinho atual
    let cart = JSON.parse(localStorage.getItem(getCartKey()) || '[]');

    const existente = cart.find(p => p.name === product.name);
    if (existente) {
      existente.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    updateCartDisplay(); // atualiza o modal se estiver aberto
    updateCartCount();   // atualiza o contador do botão
  };

  carregarProdutos();
});
