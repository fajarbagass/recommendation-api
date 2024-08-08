const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SALT = 10;

module.exports = {
  encryptPassword: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT, (err, encryptPassword) => {
        if (!!err) {
          reject(err);
          return;
        }
        resolve(encryptPassword);
      });
    });
  },
  checkPassword: (encryptPassword, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptPassword, (err, isPasswordCorrect) => {
        if (!!err) {
          reject(err);
          return;
        }
        resolve(isPasswordCorrect);
      });
    });
  },
  createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "SECRET", {
      expiresIn: "24h",
    });
  },
};
