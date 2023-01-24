import Joi from 'joi';

const todoSchema = Joi.object({
	title: Joi.string().min(2).max(30),
	status: Joi.string().valid('unfinished', 'finished'),
	endDate: Joi.date().greater('now'),
	todoId: Joi.optional(),
});
export default todoSchema;
