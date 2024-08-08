const brandService = require("../../../services/brandService");

module.exports = {
  // membuat data brand
  async create(req, res) {
    try {
      const data = req.body;
      const user = req.user.role;
      const brandData = await brandService.create(data, user);
      res.status(201).json({
        status: "success",
        data: brandData,
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
  // mencari semua data brand
  async findAll(req, res) {
    try {
      const data = await brandService.findAll();
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
  // mengubah data brand
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      await brandService.update(id, data);
      res.status(200).json({
        status: "success",
        message: "Brand berhasil diubah",
      });
    } catch (error) {
      if (error.name === "brandNotFound") {
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
  }, // menghapus data brand
  async delete(req, res) {
    try {
      const id = req.params.id;
      const user = req.user;
      await brandService.delete(id, user);
      res.status(200).json({
        status: "success",
        message: "Brand berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "brandNotFound") {
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
