const orderRepository = require("../repositories/orderRepository");
const uploadPayments = require("../utils/uploadPayments");

module.exports = {
  // membuat data order
  async create(data) {
    try {
      return await orderRepository.create(data);
    } catch (error) {
      throw error;
    }
  },
  // mencari semua data order
  async findAll() {
    return await orderRepository.findAll();
  },
  // mencari data order berdasarkan user id
  async findByUser(user) {
    try {
      return await orderRepository.findByUser(user);
    } catch (error) {
      throw error;
    }
  },
  // mencari data order berdasarkan id
  async findById(id) {
    try {
      const orderData = await orderRepository.findById(id);
      if (!orderData) {
        throw {
          name: "orderNotFound",
          message: "Pesanan tidak ditemukan",
        };
      } else {
        return orderData;
      }
    } catch (error) {
      throw error;
    }
  },
  // mengubah data order
  async update(data, order, file) {
    try {
      const id = order.id;
      const picture = order.proof_image;
      const orderData = await orderRepository.findById(id);
      if (!orderData) {
        throw {
          name: "orderNotFound",
          message: "Pesanan tidak ditemukan",
        };
      } else {
        if (file === null || file == undefined) {
          await orderRepository.update(id, data);
        } else {
          if (picture === null) {
            const photo = await uploadPayments.addPicture(file);
            await orderRepository.update(id, data, photo);
          } else {
            const photo = await uploadPayments.updatePicture(file, order);
            await orderRepository.update(id, data, photo);
          }
        }
      }
    } catch (error) {
      throw error;
    }
  },
  // menghapus data order
  async delete(id, user) {
    try {
      const role = user;
      const orderData = await orderRepository.findById(id);
      if (role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      } else {
        if (!orderData) {
          throw {
            name: "orderNotFound",
            message: "Pesanan tidak ditemukan",
          };
        } else {
          uploadPayments.deletePicture(orderData);
          await orderRepository.delete(id);
        }
      }
    } catch (error) {
      throw error;
    }
  },
};
