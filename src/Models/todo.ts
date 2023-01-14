import { Schema, model, Types } from 'mongoose';

export interface ITodo {
	userId: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>(
	{
		userId: {
			required: true,
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ timestamps: true }
);

export const Todo = model<ITodo>('todo', todoSchema);
