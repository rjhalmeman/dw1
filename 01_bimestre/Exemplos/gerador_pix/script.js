function montaPixCode(chave, nome, cidade, valor = '') {
  const payloadFormatIndicator = '000201';
  const merchantAccountInfo = `26${('0014br.gov.bcb.pix01' + chave).length.toString().padStart(2, '0')}0014br.gov.bcb.pix01${chave}`;
  const merchantCategoryCode = '52040000';
  const transactionCurrency = '5303986'; // BRL
  const transactionAmount = valor ? `54${valor.length.toString().padStart(2, '0')}${valor}` : '';
  const countryCode = '5802BR';
  const merchantName = `59${nome.length.toString().padStart(2, '0')}${nome}`;
  const merchantCity = `60${cidade.length.toString().padStart(2, '0')}${cidade}`;
  const additionalDataField = '62070503***';

  let pix = payloadFormatIndicator +
            merchantAccountInfo +
            merchantCategoryCode +
            transactionCurrency +
            transactionAmount +
            countryCode +
            merchantName +
            merchantCity +
            additionalDataField;

  pix += '6304';
  const crc = crc16(pix).toUpperCase();
  pix += crc;

  return pix;
}

function crc16(str) {
  let crc = 0xFFFF;

  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc <<= 1;
      }
      crc &= 0xFFFF;
    }
  }

  return crc.toString(16).padStart(4, '0');
}

document.getElementById('pixForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const chave = document.getElementById('chave').value.trim();
  const nome = document.getElementById('nome').value.trim().toUpperCase();
  const cidade = document.getElementById('cidade').value.trim().toUpperCase();
  const valor = document.getElementById('valor').value.trim();

  const codigo = montaPixCode(chave, nome, cidade, valor);
  document.getElementById('codigoPix').value = codigo;
});