const orderItemRepository = require("../repositories/orderItemRepository");

module.exports = {
  // membuat data item pesanan
  async create(data) {
    try {
      return await orderItemRepository.create(data);
    } catch (error) {
      throw error;
    }
  },
  // mencari semua data item pesanan
  async findAll() {
    return await orderItemRepository.findAll();
  },
  // mencari data item pesanan berdasarkan id
  async findById(id) {
    try {
      const itemData = orderItemRepository.findById(id);
      if (!itemData) {
        throw {
          name: "itemNotFound",
          message: "Item pesanan tidak ditemukan",
        };
      } else {
        return itemData;
      }
    } catch (error) {
      throw error;
    }
  },
  //mencari data item pesanan berdasarkan order id
  async findByOrder(order) {
    try {
      return await orderItemRepository.findByOrder(order);
    } catch (error) {
      throw error;
    }
  },
  // menghapus data item pesanan
  async delete(id) {
    try {
      const itemData = orderItemRepository.findById(id);
      if (!itemData) {
        throw {
          name: "itemNotFound",
          message: "Item pesanan tidak ditemukan",
        };
      } else {
        return orderItemRepository.delete(id);
      }
    } catch (error) {
      throw error;
    }
  },
};
