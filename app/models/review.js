"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Order_item, {
        foreignKey: "order_item_id",
      });
    }
  }
  Review.init(
    {
      order_item_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      review: DataTypes.TEXT,
      picture: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );
  return Review;
};
