const { body } = require("express-validator");
const userRepository = require("../repositories/userRepository");

module.exports = {
  loginDataValidate: [
    body("phone_number")
      .exists()
      .notEmpty()
      .withMessage("Nomor telepon harus diisi."),
    body("password").exists().notEmpty().withMessage("Kata sandi harus diisi."),
  ],
  registerDataValidate: [
    body("name").exists().notEmpty().withMessage("Nama harus diisi."),
    body("phone_number")
      .exists()
      .notEmpty()
      .withMessage("Nomor telepon harus diisi.")
      .bail()
      .isNumeric()
      .withMessage("Nomor telepon tidak sesuai.")
      .bail()
      .isMobilePhone("id-ID")
      .withMessage("Hanya nomor telepon Indonesia yang diperbolehkan.")
      .bail()
      .custom(async (value = null) => {
        const user = await userRepository.findByPhoneNumber(value);
        if (user) {
          throw new Error("Nomor telepon sudah ada.");
        }
      }),
    body("password")
      .exists()
      .notEmpty()
      .withMessage("Kata sandi harus diisi.")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Kata sandi harus terdiri dari minimal 8 karakter."),
  ],
  updateDataValidate: [
    body("name").exists().notEmpty().withMessage("Nama harus diisi."),
    body("email")
      .exists()
      .notEmpty()
      .withMessage("Email harus diisi.")
      .bail()
      .isEmail()
      .withMessage("Email tidak sesuai."),
    body("birth_date")
      .exists()
      .notEmpty()
      .withMessage("Tanggal lahir harus diisi.")
      .bail()
      .isDate()
      .withMessage("Tanggal lahir tidak sesuai."),
    body("phone_number")
      .exists()
      .notEmpty()
      .withMessage("Nomor telepon harus diisi.")
      .bail()
      .isNumeric()
      .withMessage("Nomor telepon tidak sesuai.")
      .bail()
      .isMobilePhone("id-ID")
      .withMessage("Hanya nomor telepon Indonesia yang diperbolehkan."),
    body("address").exists().notEmpty().withMessage("Alamat harus diisi."),
  ],
  changePasswordDataValidate: [
    body("new_password")
      .exists()
      .notEmpty()
      .withMessage("Kata sandi baru harus diisi.")
      .bail()
      .isLength({ min: 8 })
      .withMessage("Kata sandi baru harus terdiri dari minimal 8 karakter."),
    body("confirm_password")
      .exists()
      .notEmpty()
      .withMessage("Kata sandi konfirmasi harus diisi."),
  ],
};
