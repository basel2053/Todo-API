import { NextFunction, Request, Response } from 'express';
import todoSchema from '../Utilities/todoValidation';

const validateTodo = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		await todoSchema.validateAsync(req.body);
		next();
	} catch (err) {
		res.status(500).json(err);
	}
};

export default validateTodo;
