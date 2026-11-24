const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');
const { validarUsuario, validarLogin } = require('../middlewares/validaciones.middleware');

router.post('/registro', validarUsuario, usuariosController.postRegistro);
router.post('/login', validarLogin, usuariosController.postLogin);
router.get('/', usuariosController.getUsuarios);

module.exports = router;
