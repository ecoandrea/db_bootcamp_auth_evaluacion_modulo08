import express from 'express';
import { serverInit } from './services/serverInit.js';

import UserRouter from './routes/user.routes.js';
import BootcampRouter from './routes/bootcamp.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/v1', UserRouter);
app.use('/api/v1', BootcampRouter);



serverInit(app, PORT)