const Joi = require("joi");

const login = Joi.object({
  login_id: Joi.string().required(),
  password: Joi.string().required(),
});

const register = Joi.object({
  name: Joi.string().required(),
  login_id: Joi.string().required(),
  password: Joi.string().required(),
  password_confirmation: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "passwords do not match" }),
});

module.exports = {
  login,
  register
};

