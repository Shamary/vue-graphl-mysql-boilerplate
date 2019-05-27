/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    day: {
      type: DataTypes.STRING(10),
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
    tableName: 'menu'
  });
};
