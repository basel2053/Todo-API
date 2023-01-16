import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../Models/user';

const { PEPPER, SR } = process.env;
export const signup = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, name, password } = req.body;
		const hashedPassword = await bcrypt.hash(password + PEPPER, Number(SR));
		const user = new User({ email, name, password: hashedPassword });
		// await user.save();
		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};
export const login = async () => {
	console.log('login');
};
export const logout = async () => {
	console.log('logout');
};
