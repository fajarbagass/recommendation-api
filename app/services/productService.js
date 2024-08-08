const productRepository = require("../repositories/productRepository");
const uploadProducts = require("../utils/uploadProducts");

module.exports = {
  // membuat data produk
  async create(data, user, file) {
    try {
      const role = user;
      const brand_id = data.brand_id;
      const model = data.model;
      const os = data.os;
      const chipset = data.chipset;
      const display = data.display;
      const camera = data.camera;
      const battery = data.battery;
      const network = data.network;
      const charging = data.charging;
      const description = data.description;
      if (role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      } else {
        if (file == null || file == undefined) {
          return await productRepository.create({
            brand_id,
            model,
            os,
            chipset,
            display,
            camera,
            battery,
            network,
            charging,
            description,
          });
        } else {
          const picture = await uploadProducts.addPicture(file);
          return await productRepository.create({
            brand_id,
            model,
            os,
            chipset,
            display,
            camera,
            battery,
            network,
            charging,
            picture,
            description,
          });
        }
      }
    } catch (error) {
      throw error;
    }
  },
  // mengubah data produk
  async update(data, product, user, file) {
    try {
      const role = user.role;
      const id = product.id;
      const picture = product.picture;
      const productData = await productRepository.findById(id);
      if (role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      } else {
        if (!productData) {
          throw {
            name: "productNotFound",
            message: "Produk tidak ditemukan",
          };
        } else {
          if (file === null || file === undefined) {
            await productRepository.update(id, data);
          } else {
            if (picture === null) {
              const photo = await uploadProducts.addPicture(file);
              await productRepository.update(id, data, photo);
            } else {
              const photo = await uploadProducts.updatePicture(file, product);
              await productRepository.update(id, data, photo);
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
  },
  // menghapus data produk
  async delete(id, user) {
    try {
      const role = user;
      const productData = await productRepository.findById(id);
      if (role !== "admin") {
        throw {
          name: "badRequest",
          message: "Anda bukan admin",
        };
      } else {
        if (!productData) {
          throw {
            name: "productNotFound",
            message: "Produk tidak ditemukan",
          };
        } else {
          await uploadProducts.deletePicture(productData);
          return productRepository.delete(id);
        }
      }
    } catch (error) {
      throw error;
    }
  },
  // mencari semua data produk
  async findAll() {
    return await productRepository.findAll();
  },
  // mencari data produk berdasarkan id
  async findById(id) {
    try {
      const productData = await productRepository.findById(id);
      if (!productData) {
        throw {
          name: "productNotFound",
          message: "Produk tidak ditemukan",
        };
      } else {
        return productData;
      }
    } catch (error) {
      throw error;
    }
  },
  // mencari data produk berdasarkan filter
  async filter(data) {
    try {
      if (data.brand) {
        return await productRepository.filterByBrand(data.brand);
      }
      if (data.search) {
        return await productRepository.filterByProduct(data.search);
      }
    } catch (error) {
      throw error;
    }
  },
};
