const { conexion } = require('../config/dbmysql');

const obtenerResumen = async () => {
    const [productos] = await conexion.execute(`
        SELECT COUNT(*) AS totalProductos,
               COALESCE(SUM(stock), 0) AS totalStock,
               COALESCE(SUM(precio * stock), 0) AS valorInventario
        FROM productos
    `);
    const [usuarios] = await conexion.execute('SELECT COUNT(*) AS totalUsuarios FROM usuarios');
    const [categorias] = await conexion.execute(
        'SELECT categoria, COUNT(*) AS cantidad FROM productos GROUP BY categoria'
    );
    return { productos: productos[0], totalUsuarios: usuarios[0].totalUsuarios, categorias };
};

module.exports = { obtenerResumen };
