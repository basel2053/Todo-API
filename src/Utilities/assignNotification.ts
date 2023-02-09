import schedule from 'node-schedule';
import Notification from '../Models/notification';

const assignNotification = (
	todoId: string,
	date: Date,
	todoTitle: string,
	userId: string,
	update: boolean
) => {
	if (update) {
		schedule.cancelJob(todoId);
	}
	const minutes = 30;
	schedule.scheduleJob(
		todoId,
		new Date(date.getTime() - minutes * 60000),
		async () => {
			const notification = new Notification({
				message: `Remember to finish your todo: ${todoTitle}`,
				userId,
			});
			await notification.save();
		}
	);
};

export default assignNotification;
