import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../Models/user';
import signToken from '../Utilities/signToken';

const { PEPPER, SR } = process.env;
export const signup = async (
	req: Request,
	res: Response
): Promise<void | Response> => {
	try {
		const { email, name, password } = req.body;
		const hashedPassword = await bcrypt.hash(password + PEPPER, Number(SR));
		const user = new User({ email, name, password: hashedPassword });
		await user.save();
		const token = signToken(user);
		res.status(200).json(`${token}`);
	} catch (err) {
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
			return res.status(422).json("User doesn't exists");
		}
		const validated = await bcrypt.compare(password + PEPPER, user.password);
		if (!validated) {
			return res.status(422).json('Wrong Credentials');
		}
		const token = signToken(user);
		res.status(200).json(token);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const logout = async () => {
	console.log('logout');
};
