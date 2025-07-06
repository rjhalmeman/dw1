// Verificar se o usuário está logado antes de acessar o checkout
function verificarAutenticacao() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  
  if (!isLoggedIn || !currentUser.email) {
    alert('Você precisa estar logado para realizar o pagamento. Redirecionando para a página de login...');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Verificar autenticação ao carregar a página
if (!verificarAutenticacao()) {
  // Se não estiver autenticado, a função já redireciona
} else {
  // Função para obter a chave do total do checkout específica do usuário
  function getCheckoutTotalKey() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser && currentUser.email) {
          return `checkoutTotal_${currentUser.email}`;
      }
      return "checkoutTotal_guest";
  }

  // Carregar o total usando a chave específica do usuário
  const checkoutTotalKey = getCheckoutTotalKey();
  const total = localStorage.getItem(checkoutTotalKey) || "0.00";
  document.getElementById("checkoutTotal").innerText = total;

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const paymentMethod = document.querySelector("input[name=\"paymentMethod\"]:checked").value;
  
  if (paymentMethod === "pix") {
    processPixPayment();
  } else if (paymentMethod === "card") {
    processCardPayment();
  }
});

function processPixPayment() {
  const valor = parseFloat(total.replace(",", ".")).toFixed(2);

  const payload = gerarPixPayload({
    chave: "12340687969",
    nome: "Deborah Ferraz Pontes",
    cidade: "Peabiru",
    valor: valor,
    txid: "PIX123ABC"
  });

  const canvas = document.getElementById("qrcode");
  QRCode.toCanvas(canvas, payload, { width: 256 }, function (error) {
    if (error) {
      console.error("Erro ao gerar QR Code:", error);
    }
  });

  const container = document.getElementById("pixQrCodeContainer");
  
  // Limpar container anterior
  const existingPayload = container.querySelector("p");
  if (existingPayload) {
    existingPayload.remove();
  }
  
  const payloadText = document.createElement("p");
  payloadText.style.wordBreak = "break-all";
  payloadText.style.fontSize = "12px";
  payloadText.textContent = payload;
  container.appendChild(payloadText);

  // Adicionar instruções
  const instructions = document.createElement("div");
  instructions.style.marginTop = "15px";
  instructions.style.padding = "10px";
  instructions.style.backgroundColor = "#f8f9fa";
  instructions.style.borderRadius = "5px";
  instructions.innerHTML = `
    <h4>Como pagar:</h4>
    <ol>
      <li>Abra o app do seu banco</li>
      <li>Escaneie o QR Code acima</li>
      <li>Confirme o pagamento</li>
      <li>Aguarde a confirmação</li>
    </ol>
  `;
  container.appendChild(instructions);
}

function processCardPayment() {
  const cardNumber = document.getElementById("cardNumber").value.replace(/\s/g, "");
  const cardExpiry = document.getElementById("cardExpiry").value;
  const cardCvv = document.getElementById("cardCvv").value;
  const cardName = document.getElementById("cardName").value;
  const installments = document.getElementById("installments").value;
  const cardType = document.querySelector("input[name=\"cardType\"]:checked").value; // Novo: tipo de cartão
  const valor = parseFloat(total.replace(",", "."));

  // Mostrar container de resultado
  const resultContainer = document.getElementById("cardPaymentResult");
  const statusDiv = document.getElementById("paymentStatus");
  
  resultContainer.style.display = "block";
  statusDiv.innerHTML = `
    <div style="text-align: center;">
      <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto;"></div>
      <p>Processando pagamento...</p>
    </div>
  `;

  // Simular processamento (em produção, aqui seria uma chamada para API de pagamento)
  setTimeout(() => {
    let success = Math.random() > 0.1; // 90% de chance de sucesso (simulação)
    
    // Se for débito, sempre 1x
    if (cardType === "debit") {
      installments = 1; // Garante que débito seja sempre 1x
    }

    if (success) {
      const transactionId = "TXN" + Date.now();
      const installmentValue = installments > 1 ? (valor / installments).toFixed(2) : valor.toFixed(2);
      
      statusDiv.innerHTML = `
        <div style="color: #28a745; text-align: center;">
          <h3>✅ Pagamento Aprovado!</h3>
          <p><strong>ID da Transação:</strong> ${transactionId}</p>
          <p><strong>Valor:</strong> R$ ${valor.toFixed(2)}</p>
          <p><strong>Tipo:</strong> ${cardType === "credit" ? "Crédito" : "Débito"}</p>
          ${cardType === "credit" ? `<p><strong>Parcelas:</strong> ${installments}x de R$ ${installmentValue}</p>` : ""}
          <p><strong>Cartão:</strong> **** **** **** ${cardNumber.slice(-4)}</p>
          <p><strong>Portador:</strong> ${cardName}</p>
          <hr>
          <p>Seu pedido foi confirmado e será processado em breve.</p>
          <button onclick="finalizePurchase()" style="background: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
            Continuar
          </button>
        </div>
      `;
    } else {
      statusDiv.innerHTML = `
        <div style="color: #dc3545; text-align: center;">
          <h3>❌ Pagamento Recusado</h3>
          <p>Não foi possível processar o pagamento.</p>
          <p>Verifique os dados do cartão e tente novamente.</p>
          <button onclick="retryPayment()" style="background: #dc3545; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
            Tentar Novamente
          </button>
        </div>
      `;
    }
  }, 3000); // Simular 3 segundos de processamento
}

function retryPayment() {
  document.getElementById("cardPaymentResult").style.display = "none";
}

function finalizePurchase() {
  // Limpar carrinho após compra bem-sucedida
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && currentUser.email) {
    const cartKey = `cart_${currentUser.email}`;
    const checkoutTotalKey = `checkoutTotal_${currentUser.email}`;
    localStorage.removeItem(cartKey);
    localStorage.removeItem(checkoutTotalKey);
  }
  
  alert("Compra finalizada com sucesso! Obrigado pela preferência.");
  window.location.href = "index.html";
}

function gerarPixPayload({ chave, nome, cidade, valor, txid }) {
  function campo(id, valor) {
    const tamanho = valor.length.toString().padStart(2, "0");
    return id + tamanho + valor;
  }

  const gui = campo("00", "br.gov.bcb.pix");
  const chavePix = campo("01", chave);
  const merchantAccountInfo = campo("26", gui + chavePix);

  const payloadSemCRC =
    "000201" +
    "010212" + // pagamento instantâneo
    merchantAccountInfo +
    "52040000" +
    "5303986" +
    campo("54", valor) +
    "5802BR" +
    campo("59", nome) +
    campo("60", cidade) +
    campo("62", campo("05", txid)) +
    "6304"; // CRC16 placeholder

  const crc = crc16(payloadSemCRC);
  return payloadSemCRC + crc;
}

function crc16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  crc &= 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

// Adicionar CSS para animação de loading
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

}
