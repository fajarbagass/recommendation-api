const { Cart, User, Variant, Product } = require("../models");

module.exports = {
  // membuat data keranjang
  create(data) {
    return Cart.create(data);
  },
  // mencari semua data keranjang
  findAll() {
    return Cart.findAll({
      attributes: ["id", "quantity", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "name",
            "email",
            "birth_date",
            "address",
            "picture",
          ],
        },
        {
          model: Variant,
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
              ],
            },
          ],
        },
      ],
    });
  },
  // mencari data keranjang berdasarkan user id
  findByUser(user) {
    return Cart.findAll({
      attributes: ["id", "quantity", "createdAt", "updatedAt"],
      where: {
        user_id: user,
      },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "name",
            "email",
            "birth_date",
            "address",
            "picture",
          ],
        },
        {
          model: Variant,
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
              ],
            },
          ],
        },
      ],
    });
  },
  // mencari data keranjang berdasarkan id
  findById(id) {
    return Cart.findOne({
      attributes: ["id", "quantity", "createdAt", "updatedAt"],
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "name",
            "email",
            "birth_date",
            "address",
            "picture",
          ],
        },
        {
          model: Variant,
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
              ],
            },
          ],
        },
      ],
    });
  },
  // mengubah data keranjang
  update(id, data) {
    return Cart.update(
      {
        quantity: data.quantity,
      },
      {
        where: { id },
      }
    );
  },
  // menghapus data keranjang
  delete(id) {
    return Cart.destroy({
      where: {
        id,
      },
    });
  },
};
