const mysql = require('mysql2/promise');

const conexion = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'adso_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10
});

const probarConexion = async () => {
  try {
    const c = await conexion.getConnection();
    console.log('✓ Conexión exitosa a MySQL (Pool Activo)');
    c.release();
  } catch (error) {
    console.error('✕ Error al conectar a MySQL:', error.message);
    process.exit(1);
  }
};

module.exports = { conexion, probarConexion };
