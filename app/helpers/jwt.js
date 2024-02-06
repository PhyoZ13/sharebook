const jwt = require("jsonwebtoken");

const encode = (payload) => jwt.sign(payload, process.env.TOKEN_SECRET);

const decode = (payload) =>
  jwt.verify(payload, process.env.TOKEN_SECRET, { expiresIn: "30d" });

module.exports = {
  encode,
  decode,
};
