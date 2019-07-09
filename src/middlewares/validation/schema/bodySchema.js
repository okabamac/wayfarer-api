import Joi from '@hapi/joi';

const date = Joi.date();

const name = Joi.string()
  .regex(/^\D+$/);

const email = Joi.string()
  .email()
  .lowercase()
  .required();

const password = Joi.string()
  .min(6)
  .required()
  .strict();

const id = Joi.string().regex(/^\d+$/).required();

const createUserSchema = Joi.object({
  first_name: name.required(),
  last_name: name.required(),
  email,
  password,
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .error(new Error('Your password and confirm password do not match')),
});

const createAdminSchema = Joi.object({
  first_name: name.required(),
  last_name: name.required(),
  email,
  password,
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .error(new Error('Your password and confirm password do not match')),
  is_admin: Joi.boolean().default(true, {
    invalid: true,
  }),
});
const signinUserSchema = Joi.object({
  email,
  password,
});
const createTripSchema = Joi.object({
  bus_id: Joi.number().positive().min(1).precision(0)
    .error(new Error('bus_id is required and must be an integer'))
    .required(),
  origin: name.error(new Error('origin is required and must be a string')).required(),
  destination: name.error(new Error('destination is required and must be a string')).required(),
  trip_date: date.error(new Error('trip_date is required')).required(),
  fare: Joi.number().positive().allow(0).precision(2)
    .required(),
  status: name.valid('active', 'cancelled').default('active', {
    invalid: true,
  }),
});

export default {
  '/auth/signup': createUserSchema,
  '/auth/signin': signinUserSchema,
  '/create': createTripSchema,
};
