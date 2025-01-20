import express from 'express';
import cors from 'cors'

import { serverInit } from './services/serverInit.js';

import UserRouter from './routes/user.routes.js';
import BootcampRouter from './routes/bootcamp.routes.js'
import AuthRouter from './routes/auth.routes.js' 
import EmailRouter from './routes/email.routes.js'

import { errorHandler } from './middlewares/errorHandlers.js';

import { dbConnect } from './services/dbConnection.js';

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', UserRouter);
app.use('/api/v1', BootcampRouter);
app.use('/api/v1', AuthRouter);
app.use('/api/v1', EmailRouter);


app.get('/control_db', async (req, res) => {
    try {
        await dbConnect(); // Llama a la función de conexión
        res.status(200).send('Conexión a la base de datos exitosa 😺');
    } catch (error) {
        res.status(500).send('Error en la conexión a la base de datos 😿');
    }
});

app.use(errorHandler);

serverInit(app, PORT)

export default app;