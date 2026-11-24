const reportesService = require('../services/reportes.service');

const getEstadisticas = async (req, res) => {
    try { res.json(await reportesService.obtenerEstadisticas()); }
    catch (error) { res.status(500).json({ error: error.message }); }
};

module.exports = { getEstadisticas };
