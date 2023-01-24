import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const { authorization: token } = req.headers;
		const payload = jwt.verify(
			token as string,
			process.env.JWT_SECRET as string
		) as JwtPayload;
		res.locals.userId = payload.user._id;
		next();
	} catch (err) {
		res.status(401).json(`invalid token ${err}`);
	}
};

export default verifyToken;
