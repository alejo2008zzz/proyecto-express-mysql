const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportes.controller');

router.get('/estadisticas', reportesController.getEstadisticas);

module.exports = router;
