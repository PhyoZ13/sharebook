const Joi = require("joi");

const create = Joi.object({
  user_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  password_confirmation: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "passwords do not match" }),
  bio: Joi.string().optional(),
  user_type: Joi.string().valid("normal", "premium").required(),
  status: Joi.string().valid("no_verify", "verified", "suspended").required(),
});

const updateStatus = Joi.object({
  status : Joi.string().valid("no_verify","verified","suspended").required()
});

module.exports = {
  create,
  updateStatus
};
