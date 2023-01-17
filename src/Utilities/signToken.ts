import Jwt from 'jsonwebtoken';
import { IUser } from '../Models/user';

const signToken = (user: IUser): string => {
	const token = Jwt.sign({ user }, process.env.JWT_SECRET as string); // pass third argument for expiration date {expiresIn:"1h"}
	return token;
};

export default signToken;
