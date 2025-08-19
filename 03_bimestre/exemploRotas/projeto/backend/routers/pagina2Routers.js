const express = require('express');
const router = express.Router();
const controller = require('../controllers/pagina2.Controller');

router.get('/', controller.mostrarPagina);

module.exports = router;