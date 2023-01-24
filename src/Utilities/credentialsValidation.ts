import Joi from 'joi';

const userSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	confirmPassword: Joi.ref('password'),
	name: Joi.string().alphanum(),
});
export default userSchema;
