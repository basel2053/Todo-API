import { Schema, model, Types } from 'mongoose';

export interface INotification {
	message: string;
	seen: boolean;
	userId: Types.ObjectId | string;
}

const notificationSchema = new Schema<INotification>(
	{
		message: {
			type: String,
			required: true,
		},
		seen: {
			type: Boolean,
			required: true,
			default: false,
		},
		userId: {
			required: true,
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{
		timestamps: true,
	}
);

const Notification = model<INotification>('notification', notificationSchema);

export default Notification;
