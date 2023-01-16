import { Schema, model, Types } from 'mongoose';

interface IGroup {
	name: string;
	userId: Types.ObjectId | string;
}

const groupSchema = new Schema({
	name: {
		required: true,
		type: String,
	},
	userId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
});

export const Group = model<IGroup>('group', groupSchema);
