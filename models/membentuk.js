'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membentuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	  Membentuk.belongsTo(models.Penduduk);
    }
  };
  Membentuk.init({
    keluargaId: DataTypes.INTEGER,
    pendudukId: DataTypes.INTEGER,
    hubungan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Membentuk',
  });
  return Membentuk;
};