import Joi from '@hapi/joi';

const name = Joi.string()
  .regex(/^\D+$/)
  .required();

const email = Joi.string()
  .email()
  .lowercase()
  .required();

const password = Joi.string()
  .min(7)
  .required()
  .strict();

const createUserSchema = Joi.object({
  first_name: name,
  last_name: name,
  email,
  password,
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .error(new Error('Your password and confirm password do not match')),
  is_admin: Joi.boolean().required(),
});
const signinUserSchema = Joi.object({
  email,
  password,
});

export default {
  '/auth/signup': createUserSchema,
  '/auth/signin': signinUserSchema,
};
