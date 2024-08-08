"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand, {
        foreignKey: "brand_id",
      });
      Product.hasMany(models.Variant, {
        foreignKey: "product_id",
      });
    }
  }
  Product.init(
    {
      brand_id: DataTypes.INTEGER,
      model: DataTypes.STRING,
      os: DataTypes.STRING,
      chipset: DataTypes.STRING,
      display: DataTypes.STRING,
      camera: DataTypes.STRING,
      battery: DataTypes.STRING,
      network: DataTypes.STRING,
      charging: DataTypes.STRING,
      picture: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
