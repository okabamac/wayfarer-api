import Joi from '@hapi/joi';

const id = Joi.number().integer().positive().min(1)
  .required();

const busIdSchema = Joi.object({
  bus_id: id.error(new Error('bus_id is required and must be an integer')),
});

export default {
  '/:bus_id': busIdSchema,
};
