const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function verificarToken(req, res, next) {
  // Buscar la galletita
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'No autorizado, token faltante' });

  //Verificar que el token no haya expirado con jwt.verify
  try {

    const userData = jwt.verify(token, secretKey);
     //SI es valido decodifica el token y guarda los datos de los usuarios
    req.user = userData;
    next();

  } catch (err) {

    return res.status(403).json({ message: 'Token inválido o expirado' });

  }
}

module.exports = { verificarToken };
