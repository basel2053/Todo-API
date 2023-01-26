import Joi from 'joi';

const userSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required().min(6).max(16),
	confirmPassword: Joi.ref('password'),
	name: Joi.string().allow('').optional(),
});
export default userSchema;
