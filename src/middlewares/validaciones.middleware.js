const validarProducto = (req, res, next) => {
    const { nombre, precio, categoria, stock } = req.body;

    if (!nombre || typeof nombre !== 'string' || !nombre.trim())
        return res.status(400).json({ error: 'El nombre es obligatorio' });

    if (precio === undefined || precio === '' || isNaN(precio) || Number(precio) < 0)
        return res.status(400).json({ error: 'El precio debe ser mayor o igual a 0' });

    if (!categoria || typeof categoria !== 'string')
        return res.status(400).json({ error: 'La categoría es obligatoria' });

    if (stock !== undefined && (isNaN(stock) || Number(stock) < 0))
        return res.status(400).json({ error: 'El stock debe ser mayor o igual a 0' });

    next();
};

const validarUsuario = (req, res, next) => {
    const { nombre, correo, telefono, password } = req.body;

    if (!nombre || !correo || !telefono || !password)
        return res.status(400).json({
            error: 'Nombre, correo, teléfono y contraseña son obligatorios'
        });

    if (!/^\S+@\S+\.\S+$/.test(correo))
        return res.status(400).json({ error: 'El correo no es válido' });

    if (password.length < 6)
        return res.status(400).json({
            error: 'La contraseña debe tener mínimo 6 caracteres'
        });

    next();
};

const validarLogin = (req, res, next) => {
    const { correo, password } = req.body;

    if (!correo || !password)
        return res.status(400).json({
            error: 'El correo y la contraseña son obligatorios'
        });

    next();
};

module.exports = {
    validarProducto,
    validarUsuario,
    validarLogin
};