const variantService = require("../../../services/variantService");

module.exports = {
  // menambah data variasi
  async create(req, res) {
    try {
      const data = req.body;
      const user = req.user.role;
      const variant = await variantService.create(data, user);
      res.status(201).json({
        status: "success",
        data: variant,
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
  // mengubah data variasi
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = req.user.role;
      await variantService.update(id, data, user);
      res.status(200).json({
        status: "success",
        message: "Variasi berhasil diperbarui",
      });
    } catch (error) {
      if (error.name === "variantNotFound") {
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
  // mengubah data stok variasi
  async updateStock(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      await variantService.updateStock(id, data);
      res.status(200).json({
        status: "success",
        message: "Variasi berhasil diperbarui",
      });
    } catch (error) {
      if (error.name === "variantNotFound") {
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
  // mencari semua data variasi
  async findAll(req, res) {
    try {
      const variantData = await variantService.findAll();
      res.status(200).json({
        status: "success",
        data: variantData,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  // menghapus data variasi
  async delete(req, res) {
    try {
      const id = req.params.id;
      const user = req.user.role;
      await variantService.delete(id, user);
      res.status(200).json({
        status: "success",
        message: "Variasi berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "variantNotFound") {
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
  // mencari data variasi berdasarkan produk id
  async findByProduct(req, res) {
    try {
      const product = req.params.id;
      const data = await variantService.findByProduct(product);
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
  // mencari data variasi berdasarkan id
  async findById(req, res) {
    try {
      const id = req.params.id;
      const variant = await variantService.findById(id);
      res.status(200).json({
        status: "success",
        data: variant,
      });
    } catch (error) {
      if (error.name === "variantNotFound") {
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
