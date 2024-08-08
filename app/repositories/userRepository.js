const { User } = require("../models");

module.exports = {
  // mencari data user berdasarkan id
  findById(id) {
    return User.findByPk(id);
  },
  // mencari semua data user
  findAll() {
    return User.findAll({
      attributes: [
        "id",
        "role",
        "name",
        "email",
        "birth_date",
        "phone_number",
        "address",
        "picture",
        "createdAt",
        "updatedAt",
      ],
    });
  },
  // mencari data user berdasarkan nomor telepon
  findByPhoneNumber(phone_number) {
    return User.findOne({
      where: {
        phone_number,
      },
    });
  },
  // membuat data user
  create(data) {
    return User.create(data);
  },
  // mengubah data user
  update(id, data, photo) {
    return User.update(
      {
        name: data.name,
        email: data.email,
        birth_date: data.birth_date,
        phone_number: data.phone_number,
        address: data.address,
        picture: photo,
      },
      { where: { id } }
    );
  },
  // menghapus data user
  delete(id) {
    return User.destroy({
      where: {
        id,
      },
    });
  },
  changePassword(id, password) {
    return User.update(
      {
        password,
      },
      { where: { id } }
    );
  },
};
