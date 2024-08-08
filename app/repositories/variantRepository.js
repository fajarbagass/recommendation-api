const { Variant, Product, Brand } = require("../models");

module.exports = {
  // membuat data varisai
  create(data) {
    return Variant.create(data);
  },
  // mengubah data variasi
  update(id, data) {
    return Variant.update(
      {
        product_id: data.product_id,
        ram: data.ram,
        storage: data.storage,
        color: data.color,
        price: data.price,
        stock: data.stock,
      },
      {
        where: { id },
      }
    );
  },
  // mengubah data stok variasi
  updateStock(id, data) {
    return Variant.update(
      {
        stock: data.stock,
      },
      {
        where: { id },
      }
    );
  },
  // mencari data variasi berdasarkan id
  findById(id) {
    return Variant.findOne({
      attributes: ["id", "ram", "storage", "color", "price", "stock"],
      where: {
        id,
      },
      include: [
        {
          model: Product,
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
        },
      ],
    });
  },
  // mencari data variasi berdasarkan produk id
  findByProduct(product) {
    return Variant.findAll({
      attributes: ["id", "ram", "storage", "color", "price", "stock"],
      where: {
        product_id: product,
      },
      include: [
        {
          model: Product,
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
        },
      ],
    });
  },
  // mencari semua data variasi
  findAll() {
    return Variant.findAll({
      attributes: ["id", "ram", "storage", "color", "price", "stock"],
      include: [
        {
          model: Product,
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
        },
      ],
    });
  },
  // menghapus data variasi
  delete(id) {
    return Variant.destroy({
      where: { id },
    });
  },
};
