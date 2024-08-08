const { body } = require("express-validator");

module.exports = {
  variantData: [
    body("product_id")
      .exists()
      .notEmpty()
      .withMessage("Model produk harus diisi."),
    body("ram").exists().notEmpty().withMessage("RAM harus diisi."),
    body("storage").exists().notEmpty().withMessage("Penyimpanan harus diisi."),
    body("color").exists().notEmpty().withMessage("Warna harus diisi."),
    body("price")
      .if(body("price").exists())
      .notEmpty()
      .withMessage("Harga harus diisi.")
      .bail()
      .isNumeric()
      .withMessage("Harga harus berupa angka."),
    body("stock")
      .if(body("stock").exists())
      .notEmpty()
      .withMessage("Stok harus diisi.")
      .bail()
      .isNumeric()
      .withMessage("Stok harus berupa angka"),
  ],
};
