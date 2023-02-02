import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const groupSchema = Joi.object({
	name: Joi.string().min(2).max(30),
	color: Joi.number(),
	todos: Joi.optional(),
});

const validateGroup = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		await groupSchema.validateAsync(req.body);
		next();
	} catch (err) {
		res.status(422).json(err);
	}
};

export default validateGroup;
