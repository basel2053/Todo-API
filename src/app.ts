import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import connectDB from './database';
import authRoutes from './Routes/auth';
import todoRoutes from './Routes/todo';
import groupRoutes from './Routes/group';
import * as redis from 'redis';

dotenv.config();
const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use((_req: Request, res: Response, next: NextFunction) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

	next();
});

app.use(authRoutes);
app.use('/todos', todoRoutes);
app.use('/groups', groupRoutes);
app.get('/', (_req: Request, res: Response): void => {
	res.send('<h1>hello world</h1>');
});
app.use(
	(
		err: { statusCode: number; message: string },
		_req: Request,
		res: Response,
		_next: NextFunction
	) => {
		res.status(err.statusCode || 500).json(err.message);
	}
);

connectDB();

export let redisClient: redis.RedisClientType;
(async () => {
	redisClient = redis.createClient();
	redisClient.on('error', error => console.error(`Error : ${error}`));

	await redisClient.connect();
})();
app.listen(port);
