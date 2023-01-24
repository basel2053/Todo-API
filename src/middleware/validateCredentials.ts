import { NextFunction, Request, Response } from 'express';
import userSchema from '../Utilities/credentialsValidation';

const validateCredentials = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		await userSchema.validateAsync(req.body);
		next();
	} catch (err) {
		res.status(500).json(err);
	}
};

export default validateCredentials;
