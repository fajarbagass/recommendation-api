const { body } = require("express-validator");
module.exports = {
  createOrderItemData: [
    body("order_id")
      .exists()
      .notEmpty()
      .withMessage("ID pesanan harus diisi")
      .bail()
      .isNumeric()
      .withMessage("ID pesanan tidak sesuai"),
    body("variant_id")
      .exists()
      .notEmpty()
      .withMessage("ID variasi harus diisi")
      .bail()
      .isNumeric()
      .withMessage("ID variasi tidak sesuai"),
    body("quantity")
      .exists()
      .notEmpty()
      .withMessage("Jumlah order harus diisi")
      .bail()
      .isNumeric()
      .withMessage("Jumlah order tidak sesuai"),
    body("price")
      .exists()
      .notEmpty()
      .withMessage("Harga harus diisi")
      .bail()
      .isNumeric()
      .withMessage("Harga tidak sesuai"),
  ],
};
