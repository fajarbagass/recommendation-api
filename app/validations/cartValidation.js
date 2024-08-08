const { body } = require("express-validator");

module.exports = {
  createCartData: [
    body("user_id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Pengguna harus diisi")
      .isNumeric()
      .withMessage("ID pengguna tidak sesuai"),
    body("variant_id")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Variasi harus diisi")
      .isNumeric()
      .withMessage("ID variasi tidak sesuai"),
    body("quantity")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Jumlah order harus diisi")
      .isNumeric()
      .withMessage("Jumlah order harus berupa angka"),
  ],
  updateCartData: [
    body("quantity")
      .exists()
      .not()
      .isEmpty()
      .withMessage("Jumlah order harus diisi")
      .isNumeric()
      .withMessage("Jumlah order harus berupa angka"),
  ],
};
