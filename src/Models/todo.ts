import { Schema, model, Types } from 'mongoose';

export interface ITodo {
	title: string;
	state: 'finished' | 'unfinished';
	endDate: Date;
	groupId: Types.ObjectId;
	userId: Types.ObjectId | string;
}

const todoSchema = new Schema<ITodo>(
	{
		title: {
			required: true,
			type: String,
		},
		state: {
			type: String,
			default: 'unfinished',
		},
		endDate: {
			required: true,
			type: Date,
		},
		groupId: {
			type: Schema.Types.ObjectId,
			ref: 'group',
		},
		userId: {
			required: true,
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ timestamps: true }
);

export const Todo = model<ITodo>('todo', todoSchema);
