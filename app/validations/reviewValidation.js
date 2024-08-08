const { body } = require("express-validator");

module.exports = {
  reviewData: [
    body("order_item_id")
      .exists()
      .notEmpty()
      .withMessage("ID item pesanan harus diisi")
      .bail()
      .isNumeric()
      .withMessage("ID item pesanan tidak sesuai"),
    body("rating")
      .exists()
      .notEmpty()
      .withMessage("Rating harus diisi")
      .bail()
      .isNumeric()
      .withMessage("Rating tidak sesuai"),
  ],
};
