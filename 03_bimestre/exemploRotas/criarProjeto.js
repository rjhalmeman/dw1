const fs = require('fs');
const path = require('path');

const estrutura = {
  'projeto/': {
    'index.html': `<!DOCTYPE html>
<html>
<head>
    <title>Projeto Exemplo</title>
</head>
<body>
    <h1>Página Inicial</h1>
    <button onclick="window.location.href='/pagina1'">Ir para Página 1</button>
    <button onclick="window.location.href='/pagina2'">Ir para Página 2</button>
</body>
</html>`,
    'index.js': `// JS de frontend se necessário`,
    'backend/': {
      'server.js': `const express = require('express');
const app = express();
const pagina1Router = require('./routers/pagina1Routers');
const pagina2Router = require('./routers/pagina2Routers');

app.use(express.static('.'));
app.use('/pagina1', pagina1Router);
app.use('/pagina2', pagina2Router);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(\`Servidor rodando na porta \${PORT}\`);
});`,
      'routers/': {
        'pagina1Routers.js': `const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagina1Controller');

router.get('/', controller.mostrarPagina);

module.exports = router;`,
        'pagina2Routers.js': `const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagina2.Controller');

router.get('/', controller.mostrarPagina);

module.exports = router;`
      },
      'controllers/': {
        'pagina1Controller.js': `exports.mostrarPagina = (req, res) => {
    res.send(\`<h1>Você está na Página 1</h1><button onclick="window.location.href='/'">Voltar para Home</button>\`);
};`,
        'pagina2.Controller.js': `exports.mostrarPagina = (req, res) => {
    res.send(\`<h1>Você está na Página 2</h1><button onclick="window.location.href='/'">Voltar para Home</button>\`);
};`
      }
    }
  }
};

function criarEstrutura(base, estrutura) {
  for (const nome in estrutura) {
    const caminho = path.join(base, nome);
    if (typeof estrutura[nome] === 'string') {
      fs.writeFileSync(caminho, estrutura[nome]);
    } else {
      if (!fs.existsSync(caminho)) fs.mkdirSync(caminho);
      criarEstrutura(caminho, estrutura[nome]);
    }
  }
}

criarEstrutura('.', estrutura);
console.log('Projeto criado com sucesso!');

