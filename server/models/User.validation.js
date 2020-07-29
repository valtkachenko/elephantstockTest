const Joi = require('@hapi/joi');

const userValidationSchema = Joi.object({
  firstName: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required(),
  lastName: Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required(),
  email: Joi.string()
  .email()
  .required(),
  role: Joi.string()
  .allow('Art manager', 'Artist', 'Designer')
  .required(),
  _id: Joi.string(),
});

module.exports = userValidationSchema;
