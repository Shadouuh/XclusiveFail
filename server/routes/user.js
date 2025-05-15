const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = 'tu_clave_secreta';

let conex;
(async () => {
    conex = await createConnection();
})();

router.post('/login', async (req, res) => {

    const { nickOrEmail, password } = req.body;

    try {

        const [resultLogin] = await conex.execute(

            "SELECT * FROM login WHERE (email = ? OR nick = ?) AND password  = ?",
            [nickOrEmail, nickOrEmail, password ]

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
    const { email, password, nick } = req.body;

    if (!email || !password || !nick) {
        return handleError(res, 'Todos los campos son requeridos', null, 400);
    }

    try {
        const query = "INSERT INTO login(email, password, nick) VALUES (?, ?, ?)";
        const [resultRegistro] = await conex.execute(query, [email, password, nick]);
        
        res.status(201).send({ 
            message: 'Usuario registrado correctamente', 
            userId: resultRegistro.insertId 
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return handleError(res, 'El email y/o usuario ya se encuentran registrados.', null, 409);
        }
        return handleError(res, 'Error al registrarse', err);
    }
});

module.exports = router;