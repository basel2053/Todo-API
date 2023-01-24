import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database';
import authRoutes from './Routes/auth';
import todoRoutes from './Routes/todo';

dotenv.config();
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authRoutes);
app.use('/todos', todoRoutes);
app.use((_req: Request, res: Response): void => {
	res.send('<h1>hello world</h1>');
});

connectDB();

app.listen(port, (): void => {
	console.log('Serve is running on port http://localhost:' + port);
});
