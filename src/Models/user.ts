import { Schema, model } from 'mongoose';

export interface IUser {
	// _id?: Types.ObjectId;
	email: string;
	name: string;
	password: string;
	_doc?: any;
}

const userSchema = new Schema<IUser>({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
	},
});

const User = model<IUser>('user', userSchema);
export default User;
