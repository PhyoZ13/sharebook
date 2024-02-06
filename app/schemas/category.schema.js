const Joi = require("joi");

const create = Joi.object({
  name: Joi.string().required(),
});

const update = Joi.object({
  name: Joi.string(),
});

module.exports = {
  create,
  update,
};
