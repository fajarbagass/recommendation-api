const variantRepository = require("../repositories/variantRepository");

module.exports = {
  // menambahkan data variasi
  async create(data, user) {
    try {
      const role = user;
      if (role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      } else {
        return await variantRepository.create(data);
      }
    } catch (error) {
      throw error;
    }
  },
  // mengubah data variasi
  async update(id, data, user) {
    try {
      const role = user;
      const variantData = await variantRepository.findById(id);
      if (role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      } else {
        if (!variantData) {
          throw {
            name: "variantNotFound",
            message: "Variasi tidak ditemukan",
          };
        } else {
          return variantRepository.update(id, data);
        }
      }
    } catch (error) {
      throw error;
    }
  },
  // mengubah data stok variasi
  async updateStock(id, data) {
    try {
      const variantData = await variantRepository.findById(id);
      if (!variantData) {
        throw {
          name: "variantNotFound",
          message: "Variasi tidak ditemukan",
        };
      } else {
        return variantRepository.updateStock(id, data);
      }
    } catch (error) {
      throw error;
    }
  },
  // mencari semua data variasi
  async findAll() {
    return await variantRepository.findAll();
  },
  // mencari data variasi berdasarkan produk id
  async findByProduct(product) {
    try {
      return await variantRepository.findByProduct(product);
    } catch (error) {
      throw error;
    }
  },
  // menghapus data variasi
  async delete(id, user) {
    try {
      const role = user;
      const variantData = await variantRepository.findById(id);
      if (role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      } else {
        if (!variantData) {
          throw {
            name: "variantNotFound",
            message: "Variasi tidak ditemukan",
          };
        } else {
          return variantRepository.delete(id);
        }
      }
    } catch (error) {
      throw error;
    }
  },
  // mencari data variasi berdasarkan id
  async findById(id) {
    try {
      const variantData = await variantRepository.findById(id);
      if (!variantData) {
        throw {
          name: "variantNotFound",
          message: "Variasi tidak ditemukan",
        };
      }
      return variantData;
    } catch (error) {
      throw error;
    }
  },
};
