const reviewService = require("../../../services/reviewService");

module.exports = {
  // membuat data ulasan
  async create(req, res) {
    try {
      const data = req.body;
      const file = req.files;
      if (req.file) {
        const review = await reviewService.create(data, file);
        res.status(201).json({
          status: "success",
          data: review,
        });
      } else {
        const review = await reviewService.create(data);
        res.status(201).json({
          status: "success",
          data: review,
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
  // mencari semua data ulasan
  async findAll(req, res) {
    try {
      const data = await reviewService.findAll();
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
  // mencari data ulasan berdasarkan user id
  async findByUser(req, res) {
    try {
      const user = req.user.id;
      const data = await reviewService.findByUser(user);
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
  // mencari data ulasan berdasarkan id
  async findById(req, res) {
    try {
      const id = req.params.id;
      const review = await reviewService.findById(id);
      res.status(200).json({
        status: "success",
        data: review,
      });
    } catch (error) {
      if (error.name === "reviewNotFound") {
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
  // mengubah data ulasan
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const file = req.files;
      const review = await reviewService.findById(id);
      if (req.files) {
        await reviewService.update(data, review, file);
        res.status(200).json({
          status: "success",
          message: "Ulasan berhasil diperbarui",
        });
      } else {
        await reviewService.update(data, review);
        res.status(200).json({
          status: "success",
          message: "Ulasan berhasil diperbarui",
        });
      }
    } catch (error) {
      if (error.name === "reviewNotFound") {
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
  // menghapus data ulasan
  async delete(req, res) {
    try {
      const id = req.params.id;
      await reviewService.delete(id);
      res.status(200).json({
        status: "success",
        message: "Ulasan berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "reviewNotFound") {
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
