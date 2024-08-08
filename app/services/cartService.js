const cartRepository = require("../repositories/cartRepository");

module.exports = {
  // membuat data keranjang
  async create(data) {
    try {
      return await cartRepository.create(data);
    } catch (error) {
      throw error;
    }
  },
  // mencari semua data keranjang berdasarkan user id
  async findByUser(user) {
    try {
      return await cartRepository.findByUser(user);
    } catch (error) {
      throw error;
    }
  },
  // mencari semua data keranjang
  async findAll() {
    return await cartRepository.findAll();
  },
  // mengubah data keranjang
  async update(id, data) {
    try {
      const cartData = cartRepository.findById(id);
      if (!cartData) {
        throw {
          name: "cartNotFound",
          message: "Data Keranjang tidak ditemukan",
        };
      } else {
        return cartRepository.update(id, data);
      }
    } catch (error) {
      throw error;
    }
  },
  // menghapus data keranjang
  async delete(id) {
    try {
      const cartData = cartRepository.findById(id);
      if (!cartData) {
        throw {
          name: "cartNotFound",
          message: "Data Keranjang tidak ditemukan",
        };
      } else {
        return cartRepository.delete(id);
      }
    } catch (error) {
      throw error;
    }
  },
};
