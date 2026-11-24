const usuariosService = require('../services/usuarios.service');

const postRegistro = async (req, res) => {
    try {
        const usuario = await usuariosService.registrarUsuario(req.body);

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            usuario
        });
    } catch (error) {
        const estado = error.message.includes('registrado') ? 409 : 500;
        res.status(estado).json({ error: error.message });
    }
};

const postLogin = async (req, res) => {
    try {
        const usuario = await usuariosService.iniciarSesion(
            req.body.correo,
            req.body.password
        );

        res.status(200).json({
            mensaje: 'Inicio de sesión correcto',
            usuario
        });
    } catch (error) {
        const estado = error.message === 'Correo o contraseña incorrectos' ? 401 : 500;
        res.status(estado).json({ error: error.message });
    }
};

const getUsuarios = async (req, res) => {
    try {
        res.status(200).json(await usuariosService.listarUsuarios());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    postRegistro,
    postLogin,
    getUsuarios
};