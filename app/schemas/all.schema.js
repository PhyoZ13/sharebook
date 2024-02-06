const Joi = require("joi");

const allSchema = {
  name: Joi.object({
    user_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    post_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    category_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  }),
};

module.exports = allSchema;
