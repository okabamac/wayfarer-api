import Joi from '@hapi/joi';

const id = Joi.number().integer().positive().min(1)
  .required();

const busIdSchema = Joi.object({
  bus_id: id.error(new Error('bus_id is required and must be an integer')),
});
const bookingIdSchema = Joi.object({
  bookiing_id: id.error(new Error('booking_id is required and must be an integer')),
});

export default {
  '/buses/:bus_id': busIdSchema,
  '/bookings/:booking_id': bookingIdSchema,
};
