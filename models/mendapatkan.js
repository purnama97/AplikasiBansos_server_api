'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mendapatkan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	  Mendapatkan.belongsTo(models.Bansos);
    }
  };
  Mendapatkan.init({
    keluargaId: DataTypes.INTEGER,
    bansoId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Mendapatkan',
  });
  return Mendapatkan;
};