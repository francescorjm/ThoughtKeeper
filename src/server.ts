import express, { type Response, type Application } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import '@config/db';

const app: Application = express();

config();
app.set('port', process.env.SERVER_PORT);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', (_, res: Response) => {
  res.send('qlq');
});

export default app;
