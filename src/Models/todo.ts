import { Schema, model, Types } from 'mongoose';

export interface ITodo {
	title: string;
	status: 'finished' | 'unfinished';
	endDate: Date;
	userId: Types.ObjectId | string;
	groupId?: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>(
	{
		title: {
			required: true,
			type: String,
		},
		status: {
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

const Todo = model<ITodo>('todo', todoSchema);
export default Todo;
