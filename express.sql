CREATE DATABASE IF NOT EXISTS express;
USE express;

-- TABLA DE PRODUCTOS
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(12,2) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA DE USUARIOS
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    password VARCHAR(255) NOT NULL DEFAULT '',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AGREGAR PASSWORD SI LA TABLA YA EXISTE SIN ESA COLUMNA
-- Ejecutar esta sección solamente si todavía no existe password:
-- ALTER TABLE usuarios ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT '';

-- DATOS DE PRODUCTOS
INSERT INTO productos (nombre, precio, categoria, stock)
SELECT 'Teclado', 80000, 'Tecnología', 15
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Teclado');

INSERT INTO productos (nombre, precio, categoria, stock)
SELECT 'Mouse', 45000, 'Tecnología', 20
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Mouse');

INSERT INTO productos (nombre, precio, categoria, stock)
SELECT 'Monitor', 650000, 'Tecnología', 8
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Monitor');

INSERT INTO productos (nombre, precio, categoria, stock)
SELECT 'Silla', 180000, 'Muebles', 10
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Silla');

INSERT INTO productos (nombre, precio, categoria, stock)
SELECT 'Escritorio', 300000, 'Muebles', 5
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Escritorio');

-- DATOS DE USUARIOS
INSERT INTO usuarios (nombre, correo, telefono)
SELECT 'Alejandro', 'alejandro@gmail.com', '3001234567'
WHERE NOT EXISTS (
    SELECT 1 FROM usuarios WHERE correo = 'alejandro@gmail.com'
);

INSERT INTO usuarios (nombre, correo, telefono)
SELECT 'Carlos', 'carlos@gmail.com', '3109876543'
WHERE NOT EXISTS (
    SELECT 1 FROM usuarios WHERE correo = 'carlos@gmail.com'
);

INSERT INTO usuarios (nombre, correo, telefono)
SELECT 'Maria', 'maria@gmail.com', '3204567890'
WHERE NOT EXISTS (
    SELECT 1 FROM usuarios WHERE correo = 'maria@gmail.com'
);

-- CONSULTAR PRODUCTOS
SELECT * FROM productos;

-- CONSULTAR USUARIOS
SELECT * FROM usuarios;

-- ESTADISTICAS DE PRODUCTOS
SELECT
    COUNT(*) AS totalProductos,
    COALESCE(SUM(stock), 0) AS totalStock,
    COALESCE(SUM(precio * stock), 0) AS valorInventario
FROM productos;

-- TOTAL DE USUARIOS
SELECT COUNT(*) AS totalUsuarios
FROM usuarios;

-- PRODUCTOS POR CATEGORIA
SELECT categoria, COUNT(*) AS cantidad
FROM productos
GROUP BY categoria;
