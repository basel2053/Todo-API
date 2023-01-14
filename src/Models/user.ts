import { Schema, model, Types } from 'mongoose';

export interface IUser {
	_id?: Types.ObjectId;
	name: string;
	email: string;
	password: string;
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

export const User = model<IUser>('user', userSchema);
