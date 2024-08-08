const { Brand } = require("../models");

module.exports = {
  // mencari semua data brand
  findAll() {
    return Brand.findAll({
      attributes: ["id", "name"],
    });
  },
  // mencari data brand berdasarkan id
  findById(id) {
    return Brand.findByPk(id);
  },
  // membuat data brand
  create(data) {
    return Brand.create(data);
  },
  // mengubah data brand
  update(id, data) {
    return Brand.update(
      {
        name: data.name,
      },
      {
        where: {
          id,
        },
      }
    );
  },
  // menghapus data brand
  delete(id) {
    return Brand.destroy({
      where: {
        id,
      },
    });
  },
};
