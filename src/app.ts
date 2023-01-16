import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import authRoutes from './Routes/auth';
dotenv.config();
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(authRoutes);
app.use((req: Request, res: Response): void => {
	res.send('<h1>hello world</h1>');
});

app.listen(port, (): void => {
	console.log('Serve is running on port http://localhost:' + port);
});
