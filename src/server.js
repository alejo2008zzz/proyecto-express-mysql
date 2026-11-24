require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { probarConexion } = require('./config/dbmysql');

const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');
const reportesRoutes = require('./routes/reportes.routes');

const app = express();

const registrarPeticion = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
};

app.use(cors());
app.use(express.json());
app.use(registrarPeticion);

app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/reportes', reportesRoutes);

app.get('/', (req, res) => {
    res.json({ mensaje: 'Express funcionando correctamente', tecnologia: 'Node.js, Express y MySQL' });
});

app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        await probarConexion();
        app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`));
    } catch (error) {
        console.error('No fue posible iniciar el servidor:', error.message);
        process.exit(1);
    }
};

iniciarServidor();