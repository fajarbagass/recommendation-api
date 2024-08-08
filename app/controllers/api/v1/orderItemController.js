const orderItemService = require("../../../services/orderItemService");

module.exports = {
  // membuat data item pesanan
  async create(req, res) {
    try {
      const data = req.body;
      const itemData = await orderItemService.create(data);
      res.status(201).json({
        status: "success",
        data: itemData,
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
  // mencari semua data item pesanan
  async findAll(req, res) {
    try {
      const data = await orderItemService.findAll();
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
  // mencari data item pesanan berdasarkan order id
  async findByOrder(req, res) {
    try {
      const order = req.params.id;
      const data = await orderItemService.findByOrder(order);
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
  // mencari data item pesanan berdasarkan id
  async findById(req, res) {
    try {
      const id = req.params.id;
      const item = await orderItemService.findById(id);
      res.status(200).json({
        status: "success",
        data: item,
      });
    } catch (error) {
      if (error.name === "ItemNotFound") {
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
  // menghapus data item pesanan
  async delete(req, res) {
    try {
      const id = req.params.id;
      await orderItemService.delete(id);
      res.status(200).json({
        status: "success",
        message: "Item pesanan berhasil dihapus",
      });
    } catch (error) {
      if (error.name === "ItemNotFound") {
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
