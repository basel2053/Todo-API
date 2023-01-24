import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const authToken = (req: Request, res: Response, next: NextFunction): void => {
	try {
		const { authorization: token } = req.headers;
		const decoded = jwt.verify(
			token as string,
			process.env.JWT_SECRET as string
		) as JwtPayload;
		if (decoded.user._id != req.params.id) {
			throw new Error('you dont have premission to do this action');
		}
		next();
	} catch (err) {
		res.status(401).json(`invalid token ${err}`);
	}
};

export default authToken;
