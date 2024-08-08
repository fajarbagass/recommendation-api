const { body } = require("express-validator");

module.exports = {
  createOrderData: [
    body("code").exists().notEmpty().withMessage("Kode harus diisi"),
    body("user_id")
      .exists()
      .notEmpty()
      .withMessage("Pengguna harus diisi")
      .bail()
      .isNumeric()
      .withMessage("ID pengguna tidak sesuai"),
    body("status").exists().notEmpty().withMessage("Status harus diisi"),
    body("total")
      .exists()
      .notEmpty()
      .withMessage("Total harga harus diisi")
      .bail()
      .isNumeric()
      .withMessage("Total harga tidak sesuai"),
  ],
};
