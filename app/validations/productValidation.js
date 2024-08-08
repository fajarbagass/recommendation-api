const { body } = require("express-validator");

module.exports = {
  productData: [
    body("model").exists().notEmpty().withMessage("Model produk harus diisi."),
    body("os").exists().notEmpty().withMessage("Sistem operasi harus diisi."),
    body("chipset")
      .exists()
      .notEmpty()
      .withMessage("Spesifikasi prosessor harus diisi."),
    body("display")
      .exists()
      .notEmpty()
      .withMessage("Spesifikasi layar harus diisi."),
    body("camera")
      .exists()
      .notEmpty()
      .withMessage("Spesifikasi kamera harus diisi."),
    body("battery")
      .exists()
      .notEmpty()
      .withMessage("Spesifikasi baterai harus diisi."),
    body("network")
      .exists()
      .notEmpty()
      .withMessage("Spesifikasi jaringan harus diisi."),
    body("charging")
      .exists()
      .notEmpty()
      .withMessage("Kapasitas charger harus diisi."),
    body("description")
      .exists()
      .notEmpty()
      .withMessage("Deskripsi produk harus diisi"),
  ],
};
