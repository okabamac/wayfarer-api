import Joi from '@hapi/joi';

const date = Joi.date();

const string = Joi.string()
  .regex(/^\D+$/);

const email = Joi.string()
  .email()
  .lowercase()
  .required();

const password = Joi.string()
  .min(6)
  .required()
  .strict();


const id = Joi.number().integer().positive().min(1)
  .required();

const createUserSchema = Joi.object({
  first_name: string.required(),
  last_name: string.required(),
  email,
  password,
  confirm_password: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .strict()
    .error(new Error('Your password and confirm password do not match')),
});

const createAdminSchema = Joi.object({
  first_name: string.required(),
  last_name: string.required(),
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
  origin: string.error(new Error('origin is required and must be a string')).required(),
  destination: string.error(new Error('destination is required and must be a string')).required(),
  trip_date: date.error(new Error('trip_date is required')).required(),
  fare: Joi.number().positive().allow(0).precision(2)
    .required(),
  status: string.valid('active', 'cancelled').default('active', {
    invalid: true,
  }),
  departure_time: Joi.string().error(new Error('departure_time is required and must be a string'))
    .required(),
});
const addBusSchema = Joi.object({
  number_plate: Joi.string()
    .error(new Error('number_plate is required and must be a string'))
    .required(),
  manufacturer: string
    .error(new Error('manufacturer is required and must be a string'))
    .required(),
  model: Joi.string()
    .error(new Error('model is required and must be a string'))
    .required(),
  year: Joi.string()
    .error(new Error('year is required and must be a string'))
    .required(),
  capacity: Joi.number()
    .positive()
    .min(1)
    .precision(0)
    .error(new Error('capacity is required and must be an integer'))
    .required(),
});

const makeBookingSchema = Joi.object({
  trip_id: id.error(new Error('trip_id is required and must be an integer')),
  seat_number: id.error(new Error('seat_number is required and must be an integer')),
});

export default {
  '/auth/signup': createUserSchema,
  '/auth/signin': signinUserSchema,
  '/trips': createTripSchema,
  '/buses': addBusSchema,
  '/bookings': makeBookingSchema,
};
