const { body } = require("express-validator");

module.exports = {
  brandData: [
    body("name").exists().notEmpty().withMessage("Nama brand harus diisi"),
  ],
};
