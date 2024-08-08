const { Order_item, Order, Variant, User, Product } = require("../models");

module.exports = {
  // membuat data item pesanan
  create(data) {
    return Order_item.create(data);
  },
  // mencari semua data item pesanan
  findAll() {
    return Order_item.findAll({
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
    });
  },
  // mencari data item pesanan berdasarkan id
  findById(id) {
    return Order_item.findOne({
      attributes: ["id", "quantity", "price"],
      where: {
        id,
      },
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
    });
  },
  // mencari data item pesanan berdasarkan order id
  findByOrder(order) {
    return Order_item.findAll({
      attributes: ["id", "quantity", "price"],
      where: {
        order_id: order,
      },
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
    });
  },
  // menghapus data item pesanan
  delete(id) {
    return Order_item.destroy({
      where: {
        id,
      },
    });
  },
};
