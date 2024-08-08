const productService = require("../../../services/productService");

module.exports = {
  // membuat data produk
  async create(req, res) {
    try {
      const data = req.body;
      const file = req.files;
      const user = req.user.role;
      if (req.files) {
        const product = await productService.create(data, user, file);
        res.status(201).json({
          status: "success",
          data: product,
        });
      } else {
        const product = await productService.create(data, user);
        res.status(201).json({
          status: "success",
          data: product,
        });
      }
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
  // mengubah data produk
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const file = req.files;
      const user = req.user;
      const product = await productService.findById(id);
      if (req.files) {
        await productService.update(data, product, user, file);
        res.status(200).json({
          status: "success",
          message: "Produk berhasil diperbarui",
        });
      } else {
        await productService.update(data, product, user);
        res.status(200).json({
          status: "success",
          message: "Produk berhasil diperbarui",
        });
      }
    } catch (error) {
      if (error.name === "productNotFound") {
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
  // mencari semua data produk
  async findAll(req, res) {
    try {
      if (req.query.brand || req.query.search) {
        console.log(req.query, "disini");
        const data = await productService.filter(req.query);
        res.status(200).json({
          status: "success",
          data: data,
        });
      } else {
        const data = await productService.findAll();
        res.status(200).json({
          status: "success",
          data: data,
        });
      }
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  // menghapus data produk
  async delete(req, res) {
    try {
      const id = req.params.id;
      const user = req.user.role;
      await productService.delete(id, user);
      res.status(200).json({
        status: "success",
        message: "Produk berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "productNotFound") {
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
  // mencari data produk berdasarkan id
  async findById(req, res) {
    try {
      const id = req.params.id;
      const product = await productService.findById(id);
      res.status(200).json({
        status: "success",
        data: product,
      });
    } catch (error) {
      if (error.name === "productNotFound") {
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
