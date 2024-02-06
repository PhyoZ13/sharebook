"use strict";

const bcrypt = require("../../app/helpers/bcrypt");
const jwt = require("../../app/helpers/jwt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Admins",
      [
        {
          login_id: "admin123",
          name: "Admin",
          password: bcrypt.encode("password"),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
