import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../Models/user';
import signToken from '../Utilities/signToken';
import CustomError from '../helpers/CustomError';

const { PEPPER, SR } = process.env;
export const signup = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void | Response> => {
	try {
		const { email, name, password } = req.body;
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return next(CustomError(409, 'Email already used'));
		}
		const hashedPassword = await bcrypt.hash(password + PEPPER, Number(SR));
		const user = new User({ email, name, password: hashedPassword });
		await user.save();
		const token = await signToken(user);
		res.status(200).json(`${token}`);
	} catch (err) {
		console.log('hey');
		res.status(500).json(err);
	}
};

export const login = async (
	req: Request,
	res: Response
): Promise<Response | void> => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(422).json('Wrong Credentials');
		}
		const validated = await bcrypt.compare(password + PEPPER, user.password);
		if (!validated) {
			return res.status(422).json('Wrong Credentials');
		}
		const token = await signToken(user);
		res.status(200).json(token);
	} catch (err) {
		res.status(500).json(err);
	}
};
