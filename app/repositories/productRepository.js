const { Product, Brand } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  // membuat data produk
  create(data) {
    return Product.create(data);
  },
  // mengubah data produk
  update(id, data, photo) {
    return Product.update(
      {
        brand_id: data.brand_id,
        model: data.model,
        os: data.os,
        chipset: data.chipset,
        display: data.display,
        camera: data.camera,
        battery: data.battery,
        network: data.network,
        charging: data.charging,
        picture: photo,
        description: data.description,
      },
      {
        where: { id },
      }
    );
  },
  // mencari semua data produk
  findAll() {
    return Product.findAll({
      attributes: [
        "id",
        "model",
        "os",
        "chipset",
        "display",
        "camera",
        "battery",
        "network",
        "charging",
        "picture",
        "description",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });
  },
  // mencari data produk berdasarkan filter brand
  filterByBrand(brand) {
    return Product.findAll({
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
          where: {
            name: {
              [Op.iLike]: `%${brand}%`,
            },
          },
        },
      ],
      attributes: [
        "id",
        "model",
        "os",
        "chipset",
        "display",
        "camera",
        "battery",
        "network",
        "charging",
        "picture",
        "description",
        "createdAt",
        "updatedAt",
      ],
    });
  },
  // mencari data produk berdasarkan filter produk
  filterByProduct(product) {
    return Product.findAll({
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
      where: {
        model: {
          [Op.iLike]: `%${product}%`,
        },
      },
      attributes: [
        "id",
        "model",
        "os",
        "chipset",
        "display",
        "camera",
        "battery",
        "network",
        "charging",
        "picture",
        "description",
        "createdAt",
        "updatedAt",
      ],
    });
  },
  // menghapus data produk
  delete(id) {
    return Product.destroy({
      where: { id },
    });
  },
  // mencari data produk berdasarkan id
  findById(id) {
    return Product.findOne({
      attributes: [
        "id",
        "model",
        "os",
        "chipset",
        "display",
        "camera",
        "battery",
        "network",
        "charging",
        "picture",
        "description",
        "createdAt",
        "updatedAt",
      ],
      where: {
        id,
      },
      include: [
        {
          model: Brand,
          attributes: ["id", "name"],
        },
      ],
    });
  },
};
