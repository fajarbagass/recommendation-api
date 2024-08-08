const userService = require("../../../services/userService");

module.exports = {
  // login user
  async login(req, res) {
    try {
      const data = req.body;
      const user = await userService.login(data);
      res.status(200).json({
        status: "success",
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          birth_date: user.birth_date,
          phone_number: user.phone_number,
          token: user.token,
        },
      });
    } catch (error) {
      if (error.name === "badRequest") {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else if (error.name === "wrongPhoneNumber") {
        res.status(401).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
  // mendapatkan data user yang sedang login
  getCurrentUser(req, res) {
    try {
      const data = req.user;
      res.status(200).json({
        status: "success",
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          birth_date: data.birth_date,
          role: data.role,
          phone_number: data.phone_number,
          address: data.address,
          picture: data.picture,
        },
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  // registrasi user
  async register(req, res) {
    try {
      const data = req.body;
      const userData = await userService.register(data);
      res.status(201).json({
        status: "success",
        data: userData,
      });
    } catch (error) {
      if (
        error.name === "badRequest" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
  // mencari semua data user
  async findAll(req, res) {
    try {
      const data = await userService.findAll();
      res.status(200).json({
        status: "success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  // mengubah data user
  async update(req, res) {
    try {
      const data = req.body;
      const user = req.user;
      const file = req.files;
      if (req.files) {
        await userService.update(user, data, file);
        res.status(200).json({
          status: "success",
          message: "Pengguna berhasil diperbarui",
        });
      } else {
        await userService.update(user, data);
        res.status(200).json({
          status: "success",
          message: "Pengguna berhasil diperbarui",
        });
      }
    } catch (error) {
      if (error.name === "userNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else if (
        error.name === "badRequest" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
  // menghapus data user
  async delete(req, res) {
    try {
      const id = req.params.id;
      const user = req.user;
      await userService.delete(id, user);
      res.status(200).json({
        status: "success",
        message: "Pengguna berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "userNotFound") {
        res.status(404).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
  // mengubah kata sandi user
  async changePassword(req, res) {
    try {
      const data = req.body;
      await userService.changePassword(req.user.id, data);
      res.status(200).json({
        status: "success",
        message: "Kata sandi berhasil diubah",
      });
    } catch (error) {
      if (
        error.name === "badRequest" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({
          name: error.name,
          message: error.message,
        });
      } else {
        res.status(500).json({
          name: error.name,
          message: error.message,
        });
      }
    }
  },
};
