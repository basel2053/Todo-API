import { sign } from 'jsonwebtoken';
import { IUser } from '../Models/user';
import { promisify } from 'util';

const signTokenAsync = promisify(sign);

const signToken = async (user: IUser): Promise<string> => {
	return (await signTokenAsync(
		{ user },
		process.env.JWT_SECRET as string
	)) as string; // pass third argument for expiration date {expiresIn:"1h"}
};

export default signToken;
