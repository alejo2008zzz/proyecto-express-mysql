const bcrypt = require('bcryptjs');
const usuariosModel = require('../models/usuarios.models');

const registrarUsuario = async (datos) => {
    const existente = await usuariosModel.obtenerUsuarioPorCorreo(datos.correo);

    if (existente) {
        throw new Error('El correo ya se encuentra registrado');
    }

    const passwordCifrada = await bcrypt.hash(datos.password, 10);

    const id = await usuariosModel.crearUsuario({
        ...datos,
        password: passwordCifrada
    });

    return {
        id,
        nombre: datos.nombre,
        correo: datos.correo,
        telefono: datos.telefono
    };
};

const iniciarSesion = async (correo, password) => {
    const usuario = await usuariosModel.obtenerUsuarioPorCorreo(correo);

    if (!usuario) {
        throw new Error('Correo o contraseña incorrectos');
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
        throw new Error('Correo o contraseña incorrectos');
    }

    return {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        telefono: usuario.telefono
    };
};

const listarUsuarios = () => usuariosModel.obtenerUsuarios();

module.exports = {
    registrarUsuario,
    iniciarSesion,
    listarUsuarios
};