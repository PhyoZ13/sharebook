const bcrypt = require("bcryptjs");

const encode = (plain) => bcrypt.hashSync(plain);

const decode = (plain, hash) => bcrypt.compareSync(plain, hash);

module.exports = {
  encode,
  decode,
};
