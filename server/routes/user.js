const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta';

let conex;
//funcion asicrona para crear la conexion a la base de datos (sintaxix epiquisima)
async () => conex = await createConnection();

router.post('/login', async (req, res) => {

    const { userOrEmail, pass } = req.body;

    try {

        const [resultLogin] = await conex.execute(

            "SELECT * FROM users WHERE (email = ? OR userName = ?) AND pass = ?",
            [userOrEmail, userOrEmail, pass]

        );

        if (resultLogin.length == 0) return handleError(res, 'Credenciales incorrectas', null, 401);

        //Aca empazaria el jwt no le hagan caso despues lo termino
        // const userJwt = resultLOgin[0];

        // const token = jwt.sign({

        //     id: userJwt.id

        // });

        res.status(200).send({ message: 'Se logeo correctamente', resultLogin });

    } catch (err) {

        return handleError(res, 'Error al logearse', err);
        
    }
});

router.post('/register', async (req, res) => {
    const { email, pass, nick, name } = req.body;

    try {
        await conex.execute(
            "INSERT INTO users (email, pass, nick, name) VALUES (?, ?, ?, ?)",
            [email, pass, nick, name]
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