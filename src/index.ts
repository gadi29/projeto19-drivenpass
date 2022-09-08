import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';

import router from './routes/index'; //.js
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware'; //.js


dotenv.config();

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandlerMiddleware);

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));