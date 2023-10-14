import express, { type Application } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

const app: Application = express();

config();
app.set('port', process.env.SERVER_PORT);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

export default app;
