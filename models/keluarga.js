'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Keluarga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
	  Keluarga.hasMany(models.Membentuk,{
		  as:"Anggota",
	  });
	  
	  Keluarga.hasMany(models.Mendapatkan,{as:"Bantuan",})
    }
  };
  Keluarga.init({
    noKk: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    kota: DataTypes.STRING,
    kelurahan: DataTypes.STRING,
    dusun: DataTypes.STRING,
    rw: DataTypes.STRING,
    rt: DataTypes.STRING,
    kodePos: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Keluarga',
  });
  return Keluarga;
};