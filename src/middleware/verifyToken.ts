import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const { authorization: token } = req.headers;
		jwt.verify(token as string, process.env.JWT_SECRET as string);
		next();
	} catch (err) {
		res.status(401).json(`invalid token ${err}`);
	}
};

export default verifyToken;
