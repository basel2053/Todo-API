import schedule from 'node-schedule';

const cancelNotification = (todoId: string) => {
	schedule.cancelJob(todoId);
};

export default cancelNotification;
