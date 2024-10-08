"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_item.belongsTo(models.Order, {
        foreignKey: "order_id",
      });
      Order_item.belongsTo(models.Variant, {
        foreignKey: "variant_id",
      });
      Order_item.hasMany(models.Review, {
        foreignKey: "order_item_id",
      });
    }
  }
  Order_item.init(
    {
      order_id: DataTypes.INTEGER,
      variant_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_item",
    }
  );
  return Order_item;
};
