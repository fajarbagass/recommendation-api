const { Order, User } = require("../models");

module.exports = {
  // membuat data order
  create(data) {
    return Order.create(data);
  },
  // mencari semua data order
  findAll() {
    return Order.findAll({
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
    });
  },
  // mencari data order berdasarkan user id
  findByUser(user) {
    return Order.findAll({
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
    });
  },
  // mencari data order berdasarkan id
  findById(id) {
    return Order.findOne({
      attributes: ["id", "code", "status", "total", "proof_image"],
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
            "phone_number",
            "birth_date",
            "address",
            "picture",
          ],
        },
      ],
    });
  },
  // mengubah data order
  update(id, data, photo) {
    return Order.update(
      {
        status: data.status,
        proof_image: photo,
      },
      {
        where: { id },
      }
    );
  },
  // menghapus data order
  delete(id) {
    return Order.destroy({
      where: { id },
    });
  },
};
