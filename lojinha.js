// Função para obter a chave do carrinho específica do usuário
function getCartKey() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email) {
        return `cart_${currentUser.email}`;
    }
    return 'guest_cart'; // Fallback para usuários não logados
}

// Função para obter a chave do total do checkout específica do usuário
function getCheckoutTotalKey() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.email) {
        return `checkoutTotal_${currentUser.email}`;
    }
    return 'checkoutTotal_guest';
}

// Carregar carrinho do localStorage
function loadCart() {
    const cartKey = getCartKey();
    return JSON.parse(localStorage.getItem(cartKey) || '[]');
}

// Salvar carrinho no localStorage
function saveCart() {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(cart));
}

// Inicializar carrinho
let cart = loadCart();

function renderProducts(productArray) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  productArray.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img || product.imagem}" alt="${product.name || product.nome}" />
      <h3>${product.name || product.nome}</h3>
      <p>R$ ${parseFloat(product.price || product.preco).toFixed(2)}</p>
      <div class="quantity-controls">
          <button class="decrease" onclick="updateQuantity('${product.id || product.nome}', -1)">-</button>
          <span id="qty-${product.id || product.nome}" class="quantity">1</span>
          <button class="increase" onclick="updateQuantity('${product.id || product.nome}', 1)">+</button>
      </div>
      <button class="add-to-cart-btn" onclick="addToCart('${product.id || product.nome}')">Adicionar ao carrinho</button>
    `;
    productList.appendChild(card);
  });
}


function filterByCategory(category) {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
}

function updateQuantity(productId, change) {
    const quantityElement = document.getElementById(`qty-${productId}`);
    let currentQuantity = parseInt(quantityElement.innerText);
    currentQuantity += change;

    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    quantityElement.innerText = currentQuantity;
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId || p.nome === productId);
  if (!product) return;

  const id = product.id || product.nome;
  const name = product.name || product.nome;
  const price = parseFloat(product.price || product.preco);
  const img = product.img || product.imagem;
  const quantityElement = document.getElementById(`qty-${id}`);
  const quantity = quantityElement ? parseInt(quantityElement.innerText) : 1;

  let carrinho = JSON.parse(localStorage.getItem(getCartKey()) || '[]');

  const itemExistente = carrinho.find(p => p.name === name);
  if (itemExistente) {
    itemExistente.quantity += quantity;
  } else {
    carrinho.push({
      name: name,
      price: price,
      img: img,
      quantity: quantity
    });
  }

  localStorage.setItem(getCartKey(), JSON.stringify(carrinho));
  updateCartDisplay();
  updateCartCount();
  atualizarModalCarrinho();
}

function updateCartCount() {
    cart = loadCart();

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalValue = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const cartCountElement = document.getElementById("cartCount");
    const cartValueElement = document.getElementById("cartValue");
    const cartBtn = document.getElementById("cartBtn");

    if (cartCountElement && cartValueElement && cartBtn) {
        cartCountElement.innerText = `Carrinho (${totalItems} item${totalItems !== 1 ? 's' : ''})`;
        cartValueElement.innerText = `R$ ${totalValue.toFixed(2)}`;

        cartBtn.classList.add("animate-cart");
        setTimeout(() => {
            cartBtn.classList.remove("animate-cart");
        }, 500);
    }
}

function updateCartDisplay() {
    cart = loadCart();

    const cartModalBody = document.getElementById("cartModalBody");
    cartModalBody.innerHTML = "";

    if (cart.length === 0) {
        cartModalBody.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <h3>${item.name}</h3>
                <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <p>Total: R$ ${(item.price * item.quantity).toFixed(2)}</p>
            `;
            cartModalBody.appendChild(cartItem);
        });
    }

    const totalValue = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const totalElement = document.getElementById("totalAmount");
    if (totalElement) {
        totalElement.innerText = totalValue.toFixed(2);
    }

    const checkoutTotalKey = getCheckoutTotalKey();
    localStorage.setItem(checkoutTotalKey, totalValue.toFixed(2));
}

document.getElementById("cartBtn").addEventListener("click", () => {
    document.getElementById("cartModal").style.display = "block";
    updateCartDisplay();
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("cartModal").style.display = "none";
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
    cart = loadCart();

    if (cart.length === 0) {
        return;
    }

    const totalValue = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const checkoutTotalKey = getCheckoutTotalKey();
    localStorage.setItem(checkoutTotalKey, totalValue.toFixed(2));
    window.location.href = "checkout.html";
});

document.getElementById("clearCartBtn").addEventListener("click", () => {
  if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
    const trashSound = document.getElementById("trashSound");
    trashSound.currentTime = 0;
    trashSound.play();

    const items = document.querySelectorAll("#cartModalBody .cart-item");
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("fade-out");
      }, index * 100);
    });

    setTimeout(() => {
      localStorage.removeItem(getCartKey());

      const checkoutTotalKey = getCheckoutTotalKey();
      localStorage.removeItem(checkoutTotalKey);

      updateCartDisplay();
      updateCartCount();
      atualizarModalCarrinho();

      const totalElement = document.getElementById("totalAmount");
      if (totalElement) {
        totalElement.innerText = "0.00";
      }
    }, 600);
  }
});

function goToCategory(category) {
    window.location.href = `categoria.html?cat=${category}`;
}

document.getElementById("search").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        (product.name || product.nome).toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
});

async function carregarProdutosDoServidor() {
  try {
    const res = await fetch("http://localhost:3000/produtos");
    const produtosServidor = await res.json();

    const produtosPromocao = produtosServidor.filter(p => p.promocao);
    window.products = produtosPromocao;
    renderProducts(produtosPromocao);
    updateCartCount();
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  }
}

carregarProdutosDoServidor();
updateCartCount();

window.addToCart = addToCart;
window.updateQuantity = updateQuantity;

function atualizarModalCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem(getCartKey()) || '[]');
  const cartBody = document.getElementById("cartModalBody");
  const totalSpan = document.getElementById("totalAmount");
  cartBody.innerHTML = "";

  let total = 0;

  if (carrinho.length === 0) {
    cartBody.innerHTML = "<p>Seu carrinho está vazio.</p>";
    totalSpan.innerText = "0.00";
    return;
  }

  carrinho.forEach((produto, index) => {
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
      <img src="${produto.img}" alt="${produto.name}" style="width: 50px; height: auto;">
      <span>${produto.name}</span>
      <span>Qtd: ${produto.quantity}</span>
      <span>R$ ${(produto.price * produto.quantity).toFixed(2)}</span>
      <button class="remove-btn" data-index="${index}" style="margin-left: 10px;">🗑️ Remover</button>
    `;
    cartBody.appendChild(item);
    total += produto.price * produto.quantity;
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      carrinho.splice(index, 1);
      localStorage.setItem(getCartKey(), JSON.stringify(carrinho));
      atualizarModalCarrinho();
      updateCartCount();
    });
  });

  totalSpan.innerText = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarModalCarrinho();
});

window.getCartKey = getCartKey;
window.updateCartDisplay = updateCartDisplay;
window.updateCartCount = updateCartCount;
