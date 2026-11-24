const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');
const { validarProducto } = require('../middlewares/validaciones.middleware');

router.get('/', productosController.getProductos);
router.post('/', validarProducto, productosController.postProducto);
router.get('/categoria/:cat', productosController.getPorCategoria);
router.get('/:id', productosController.getProducto);
router.put('/:id', validarProducto, productosController.putProducto);
router.delete('/:id', productosController.deleteProducto);

module.exports = router;
