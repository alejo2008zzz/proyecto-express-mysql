const productosModel = require('../models/productos.models');

const listarProductos = () => productosModel.obtenerProductos();

const buscarProducto = async (id) => {
    const producto = await productosModel.obtenerProductoPorId(id);
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
};

const crearProducto = (datos) => productosModel.crearProducto(datos);

const actualizarProducto = async (id, datos) => {
    const producto = await productosModel.actualizarProducto(id, datos);
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
};

const eliminarProducto = async (id) => {
    const eliminado = await productosModel.eliminarProducto(id);
    if (!eliminado) throw new Error('Producto no encontrado');
    return { mensaje: 'Producto eliminado correctamente' };
};

const filtrarCategoria = (categoria) => productosModel.obtenerPorCategoria(categoria);

module.exports = { listarProductos, buscarProducto, crearProducto, actualizarProducto, eliminarProducto, filtrarCategoria };
