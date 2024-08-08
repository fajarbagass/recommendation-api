const orderService = require("../../../services/orderService");

module.exports = {
  // membuat data order
  async create(req, res) {
    try {
      const data = req.body;
      const order = await orderService.create(data);
      res.status(201).json({
        status: "success",
        data: order,
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
  // mencari semua data order
  async findAll(req, res) {
    try {
      const orderData = await orderService.findAll();
      res.status(200).json({
        status: "success",
        data: orderData,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  },
  // mencari data order berdasarkan user id
  async findByUser(req, res) {
    try {
      const user = req.user.id;
      const data = await orderService.findByUser(user);
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
  // mencari data order berdasarkan id
  async findById(req, res) {
    try {
      const id = req.params.id;
      const order = await orderService.findById(id);
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (error) {
      if (error.name === "orderNotFound") {
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
  // mengubah data order
  async update(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const file = req.files;
      const order = await orderService.findById(id);
      if (req.files) {
        await orderService.update(data, order, file);
        res.status(200).json({
          status: "success",
          message: "Pesanan berhasil diperbarui",
        });
      } else {
        await orderService.update(data, order);
        res.status(200).json({
          status: "success",
          message: "Pesanan berhasil diperbarui",
        });
      }
    } catch (error) {
      if (error.name === "orderNotFound") {
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
  // menghapus data order
  async delete(req, res) {
    try {
      const id = req.params.id;
      const user = req.user.role;
      await orderService.delete(id, user);
      res.status(200).json({
        status: "success",
        message: "Pesanan berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "orderNotFound") {
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
