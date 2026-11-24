const { conexion } = require('../config/dbmysql');

const obtenerUsuarioPorCorreo = async (correo) => {
    const [filas] = await conexion.execute(
        'SELECT * FROM usuarios WHERE correo = ?',
        [correo]
    );

    return filas[0];
};

const crearUsuario = async (datos) => {
    const [resultado] = await conexion.execute(
        'INSERT INTO usuarios (nombre, correo, telefono, password) VALUES (?, ?, ?, ?)',
        [datos.nombre, datos.correo, datos.telefono, datos.password]
    );

    return resultado.insertId;
};

const obtenerUsuarios = async () => {
    const [filas] = await conexion.execute(
        'SELECT id, nombre, correo, telefono, fecha_registro FROM usuarios ORDER BY id'
    );

    return filas;
};

module.exports = {
    obtenerUsuarioPorCorreo,
    crearUsuario,
    obtenerUsuarios
};