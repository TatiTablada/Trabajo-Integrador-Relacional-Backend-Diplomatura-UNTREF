const express = require('express');
const router = express.Router();
const contenidoController = require('../controllers/contenidoController');


router.get('/', (req, res) => res.send('¡Bienvenido a la API de Trailerflix!'));
router.get('/contenidos', contenidoController.getContenidos);
router.get('/contenido/:id', contenidoController.getContenidoById);
router.get('/contenidos/filtrar', contenidoController.filterContenidos);
router.post('/contenido', contenidoController.createContenido);
router.put('/contenido/:id', contenidoController.updateContenido);
router.delete('/contenido/:id', contenidoController.deleteContenido);

module.exports = router;