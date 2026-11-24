const { conexion } = require('../config/dbmysql');

const obtenerProductos = async () => {
    const [filas] = await conexion.execute('SELECT * FROM productos ORDER BY id');
    return filas;
};

const obtenerProductoPorId = async (id) => {
    const [filas] = await conexion.execute('SELECT * FROM productos WHERE id = ?', [id]);
    return filas[0];
};

const crearProducto = async (datos) => {
    const [resultado] = await conexion.execute(
        'INSERT INTO productos (nombre, precio, categoria, stock) VALUES (?, ?, ?, ?)',
        [datos.nombre, datos.precio, datos.categoria, datos.stock ?? 0]
    );
    return obtenerProductoPorId(resultado.insertId);
};

const actualizarProducto = async (id, datos) => {
    const [resultado] = await conexion.execute(
        'UPDATE productos SET nombre = ?, precio = ?, categoria = ?, stock = ? WHERE id = ?',
        [datos.nombre, datos.precio, datos.categoria, datos.stock, id]
    );
    if (!resultado.affectedRows) return null;
    return obtenerProductoPorId(id);
};

const eliminarProducto = async (id) => {
    const [resultado] = await conexion.execute('DELETE FROM productos WHERE id = ?', [id]);
    return resultado.affectedRows > 0;
};

const obtenerPorCategoria = async (categoria) => {
    const [filas] = await conexion.execute('SELECT * FROM productos WHERE categoria = ?', [categoria]);
    return filas;
};

module.exports = { obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto, obtenerPorCategoria };