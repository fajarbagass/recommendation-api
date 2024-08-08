"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Variant.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
      Variant.hasMany(models.Cart, {
        foreignKey: "variant_id",
      });
      Variant.hasMany(models.Order_item, {
        foreignKey: "variant_id",
      });
    }
  }
  Variant.init(
    {
      product_id: DataTypes.INTEGER,
      ram: DataTypes.STRING,
      storage: DataTypes.STRING,
      color: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Variant",
    }
  );
  return Variant;
};
