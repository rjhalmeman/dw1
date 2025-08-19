const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagina1Controller');

router.get('/', controller.mostrarPagina); //rota raiz para Página 1
router.get('/vermelha', controller.paginaVermelha);
// router.get('/azul', controller.paginaAzul); // só pode ter essa linha se o controller.paginaAzul estiver implementado
// router.get('/verde', controller.paginaVerde);

module.exports = router;