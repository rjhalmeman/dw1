const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagina1Controller');

router.get('/', controller.mostrarPagina);

module.exports = router;