/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lunch_admin', {
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'lunch_admin'
  });
};
