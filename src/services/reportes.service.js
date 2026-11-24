const reportesModel = require('../models/reportes.models');

const obtenerEstadisticas = () => reportesModel.obtenerResumen();

module.exports = { obtenerEstadisticas };
