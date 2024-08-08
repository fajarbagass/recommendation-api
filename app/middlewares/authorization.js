const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

module.exports = {
  async authorize(req, res, next) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);

      req.user = await userService.findById(tokenPayload.id);
      next();
    } catch (error) {
      res.status(401).json({
        name: "notLogin",
        message: "Anda belum login/token anda salah",
      });
    }
  },
};
