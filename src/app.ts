import express, { Request, Response } from 'express';

const app: express.Application = express();
const port = process.env.PORT || 3000;
app.use((req: Request, res: Response): void => {
	res.send('<h1>hello world</h1>');
});

app.listen(port, (): void => {
	console.log('Serve is running on port http://localhost:' + port);
});
