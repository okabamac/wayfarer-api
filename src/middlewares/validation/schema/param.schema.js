import Joi from '@hapi/joi';

const id = Joi.number()
  .integer()
  .positive()
  .min(1)
  .required();

const busIdSchema = Joi.object({
  bus_id: id.error(new Error('bus_id is required and must be an integer')),
});
const tripIdSchema = Joi.object({
  trip_id: id.error(new Error('trip_id is required and must be an integer')),
});
const bookingIdSchema = Joi.object({
  booking_id: id.error(new Error('booking_id is required and must be an integer')),
});

export default {
  '/buses/:bus_id': busIdSchema,
  '/trips/:trip_id': tripIdSchema,
  '/bookings/:booking_id': bookingIdSchema,
};
