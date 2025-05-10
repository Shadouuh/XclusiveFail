const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();

let conex;
//funcion asicrona para crear la conexion a la base de datos (sintaxix epiquisima)
async () => conex = await createConnection();

router.post('/login', async (req, res) => {
    const { emailORUserName, pass } = req.body;

    try {
        const [resultLogin] = await conex.execute(
            "SELECT * FROM usuarios WHERE (email = ? OR userName = ?) AND pass = ?",
            [emailORUserName, emailORUserName, pass]
        );

        if (resultLogin.length == 0) return handleError(res, 'Credenciales incorrectas', null, 401);

        res.status(200).send({ message: 'Se logeo correctamente', resultLogin });
    } catch (err) {
        return handleError(res, 'Error al logearse', err);
    }
});

router.post('/registro', async (req, res) => {
    const { email, pass, userName, realName } = req.body;

    try {
        await conex.execute(
            "INSERT INTO usuarios (email, pass, userName, realName) VALUES (?, ?, ?, ?)",
            [email, pass, userName, realName]
        );

        res.status(201).send({ message: 'Se Inserto correctamente', resultRegistro });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return handleError(res, 'El email y/o usuario ya se encuentran registrados.', null, 409);
        }
        return handleError(res, 'Error al registrarse', err);
    }
});

module.exports = router;