import schedule from 'node-schedule';
import Notification from '../Models/notification';
import User from '../Models/user';
import sendMail from './sendmail';

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
			try {
				const notification = new Notification({
					message: `Remember to finish your todo: ${todoTitle}`,
					userId,
				});
				await notification.save();
				const user = await User.findById(userId);
				const to = user?.email as string;
				const from = 'ogswebproject@gmail.com';
				const subject = 'Todo Reminder';
				const output = `
        <p>Remember to finish your todo: ${todoTitle}</p>
        `;
				sendMail(to, from, subject, output);
			} catch (err) {
				console.log(err);
			}
		}
	);
};

export default assignNotification;
