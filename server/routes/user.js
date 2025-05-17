const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY
const { verificarToken } = require('../middlewares/auth');

let conex;
//funcion asicrona para crear la conexion a la base de datos (sintaxix epiquisima)
const init = async() => conex = await createConnection();
init();


router.post('/login', async (req, res) => {
    const { nickOrEmail, password } = req.body;

    try {

        const [resultLogin] = await conex.execute(

            "SELECT * FROM login WHERE (email = ? OR nick = ?) AND password  = ?",
            [nickOrEmail, nickOrEmail, password]

        );

        if (resultLogin.length == 0) return handleError(res, 'Credenciales incorrectas', null, 401);

        //Aca guaradmos el primer usuario que se encuantra
        const userJwt = resultLogin[0];

        //Aca se crea el token, y elegis que datos mandar(no ghace falta aclara pero por favor no manden la contraseña)
        const token = jwt.sign(
            {
                id_login: userJwt.id_login,
                nick: userJwt.nick,
                email: userJwt.email,
            },
            secretKey,
            //tiempo de expiracion, pongo 1h pero despues vemos 
            { expiresIn: '1h' }
        );

        //Enviamos el token como cookie 
        res.cookie('token', token, {

            httpOnly: true, //Solo podes acceder desde el servido
            secure: false, //Poner en true cuando este todo andando, false hace que se mande localmente ya sea http o https, true hace solo https
            maxAge: 1 * 60 * 60 * 1000, //Tiempo de expiracion de la cokie, mismo que el token por que si
            sameSite: 'strict' //Solo se puede acceder desde eñ mismo dominio

        });

        //Borrar una vez se termine todo
        //Para ver el tocken generado
        //console.log("TOKEN GENERADO:", token);

        //Para ver si si se genera la gallletita 
        //console.log('Token recibido:', req.cookies.token);


        res.status(200).send({ message: 'Se logeo correctamente', user: { ...userJwt, password: '[hidden]' }});

    } catch (err) {

        return handleError(res, 'Error al logearse', err);

    }
});

//Inportantee!!!!!
//Por temas de seguridad todo endpoint que se realiza despeus del login debe estar protejido por el middleware par que no haya probelemas
//Este es un ejemplo de como se usa
router.get('/perfil', verificarToken, async (req, res) => {

    res.json({
        message: 'Bienvenido a tu perfil',
        user: req.user
    });
});

router.post('/register', async (req, res) => {
    const { email, password, nick } = req.body;

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