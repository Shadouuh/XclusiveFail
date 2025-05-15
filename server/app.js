const path = require('path');
const { express } = require(path.join(__dirname, 'config', 'setup'));
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/user', require(path.join(__dirname, 'routes', 'user')));

// Testeo de api
app.get('/ping', async (req, res) => {
    res.send('Pong');
});

const port = process.env.API_PORT || 5001;
app.listen(port, () => console.log(`Server escuchando en el puerto ${port}`));

//despues podemos server los archivos de la build de vite para mostrarlos desde el mismo servidor