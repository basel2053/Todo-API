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
	color: String,
	todos: [{ type: Schema.Types.ObjectId, ref: 'todo' }],
	userId: {
		required: true,
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
});

const Group = model<IGroup>('group', groupSchema);
export default Group;
