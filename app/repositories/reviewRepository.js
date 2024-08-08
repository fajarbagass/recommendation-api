const {
  Review,
  Order_item,
  Order,
  User,
  Variant,
  Product,
} = require("../models");

module.exports = {
  // membuat data ulasan
  create(data) {
    return Review.create(data);
  },
  // mencari semua data ulasan
  findAll() {
    return Review.findAll({
      attributes: ["id", "rating", "review", "picture"],
      include: [
        {
          model: Order_item,
          attributes: ["id", "quantity", "price"],
          include: [
            {
              model: Order,
              attributes: ["id", "code", "status", "total", "proof_image"],
              include: [
                {
                  model: User,
                  attributes: [
                    "id",
                    "name",
                    "email",
                    "phone_number",
                    "birth_date",
                    "address",
                    "picture",
                  ],
                },
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
        },
      ],
    });
  },
  // mencari data ulasan berdasarkan id
  findById(id) {
    return Review.findOne({
      attributes: ["id", "rating", "review", "picture"],
      where: {
        id,
      },
      include: [
        {
          model: Order_item,
          attributes: ["id", "quantity", "price"],
          include: [
            {
              model: Order,
              attributes: ["id", "code", "status", "total", "proof_image"],
              include: [
                {
                  model: User,
                  attributes: [
                    "id",
                    "name",
                    "email",
                    "phone_number",
                    "birth_date",
                    "address",
                    "picture",
                  ],
                },
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
        },
      ],
    });
  },
  // mencari data ulasan berdasarkan user id
  findByUser(user) {
    return Review.findAll({
      attributes: ["id", "rating", "review", "picture"],
      include: [
        {
          model: Order_item,
          attributes: ["id", "quantity", "price"],
          include: [
            {
              model: Order,
              attributes: ["id", "code", "status", "total", "proof_image"],
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
                    "phone_number",
                    "birth_date",
                    "address",
                    "picture",
                  ],
                },
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
        },
      ],
    });
  },
  // mengubah data ulasan
  update(id, data, photo) {
    return Review.update(
      {
        order_item_id: data.order_item_id,
        rating: data.rating,
        review: data.review,
        picture: photo,
      },
      {
        where: { id },
      }
    );
  },
  // menghapus data ulasan
  delete(id) {
    return Review.destroy({
      where: { id },
    });
  },
};
