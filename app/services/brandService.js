const brandRepository = require("../repositories/brandRepository");

module.exports = {
  // mencari semua data brand
  async findAll() {
    try {
      return await brandRepository.findAll();
    } catch (error) {
      throw error;
    }
  },
  // membuat data brand
  async create(data, user) {
    try {
      const role = user;
      if (role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      } else {
        return await brandRepository.create(data);
      }
    } catch (error) {
      throw error;
    }
  },
  //mengubah data brand
  async update(id, data) {
    try {
      const brandData = brandRepository.findById(id);
      if (!brandData) {
        throw {
          name: "brandNotFound",
          message: "Data Brand tidak ditemukan",
        };
      } else {
        return brandRepository.update(id, data);
      }
    } catch (error) {
      throw error;
    }
  }, // menghapus data brand
  async delete(id, user) {
    try {
      const brandData = await brandRepository.findById(id);
      if (user.role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      } else {
        if (!brandData) {
          throw {
            name: "brandNotFound",
            message: "Brand tidak ditemukan",
          };
        } else {
          return await brandRepository.delete(id);
        }
      }
    } catch (error) {
      throw error;
    }
  },
};
