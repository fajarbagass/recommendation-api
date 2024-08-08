const cartService = require("../../../services/cartService");

module.exports = {
  // membuat data keranjang
  async create(req, res) {
    try {
      const data = req.body;
      const cartData = await cartService.create(data);
      res.status(201).json({
        status: "success",
        data: cartData,
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
  // mencari semua data keranjang
  async findAll(req, res) {
    try {
      const data = await cartService.findAll();
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
  // mencari data keranjang berdasarkan user id
  async findByUser(req, res) {
    try {
      const user = req.user.id;
      const data = await cartService.findByUser(user);
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
  // mengubah data keranjang
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      await cartService.update(id, data);
      res.status(200).json({
        status: "success",
        message: "Keranjang berhasil diubah",
      });
    } catch (error) {
      if (error.name === "cartNotFound") {
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
  // menghapus data keranjang
  async delete(req, res) {
    try {
      const id = req.params.id;
      await cartService.delete(id);
      res.status(200).json({
        status: "success",
        message: "Keranjang berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "cartNotFound") {
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
};
