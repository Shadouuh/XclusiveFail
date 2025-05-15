const { createConnection, handleError, express } = require('./../config/setup');
const router = express.Router();

let conex;
//funcion asicrona para crear la conexion a la base de datos (sintaxix lambda)
async () => conex = await createConnection();

router.get('/all', async (req, res) => {
    try {
        const [games] = await conex.query(
            "SELECT * FROM games"
        );

        if (games.length == 0) return handleError(res, 'No se encontraron juegos', null, 404);
        
        res.status(200).send({ message: 'Los juegos', games });

    } catch (err) {
        return handleError(res, 'Error al mostrar los juegos', err);
    }
});

router.get('/:id', async (req, res) => {
    const  { id } = req.params;

    try {
        const [game] = await conex.execute(
            "SELECT * FROM games WHERE id_game = ?",
            [id]
        );

        if (games.length == 0) return handleError(res, 'No se encontro el juego', null, 404);
        
        res.status(200).send({ message: 'El juego', game });

    } catch (err) {
        return handleError(res, 'Error al obtener el juego', err);
    }
});


module.exports = router;