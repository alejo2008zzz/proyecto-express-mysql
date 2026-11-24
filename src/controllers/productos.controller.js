const productosService = require('../services/productos.service');

const getProductos = async (req, res) => {
    try { res.json(await productosService.listarProductos()); }
    catch (error) { res.status(500).json({ error: error.message }); }
};

const getProducto = async (req, res) => {
    try { res.json(await productosService.buscarProducto(req.params.id)); }
    catch (error) { res.status(error.message === 'Producto no encontrado' ? 404 : 500).json({ error: error.message }); }
};

const postProducto = async (req, res) => {
    try { res.status(201).json(await productosService.crearProducto(req.body)); }
    catch (error) { res.status(500).json({ error: error.message }); }
};

const putProducto = async (req, res) => {
    try { res.json(await productosService.actualizarProducto(req.params.id, req.body)); }
    catch (error) { res.status(error.message === 'Producto no encontrado' ? 404 : 500).json({ error: error.message }); }
};

const deleteProducto = async (req, res) => {
    try { res.json(await productosService.eliminarProducto(req.params.id)); }
    catch (error) { res.status(error.message === 'Producto no encontrado' ? 404 : 500).json({ error: error.message }); }
};

const getPorCategoria = async (req, res) => {
    try { res.json(await productosService.filtrarCategoria(req.params.cat)); }
    catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getProductos, getProducto, postProducto, putProducto, deleteProducto, getPorCategoria };