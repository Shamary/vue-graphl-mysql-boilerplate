/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    day: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    appetizer: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    protein: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    carb: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    vegetable: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    sides: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    tableName: 'orders'
  });
};
