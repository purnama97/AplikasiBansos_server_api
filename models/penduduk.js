'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penduduk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Penduduk.init({
    nik: DataTypes.STRING,
    nama: DataTypes.STRING,
    tmpLhr: DataTypes.STRING,
    tglLhr: DataTypes.DATE,
    jnsKel: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    kota: DataTypes.STRING,
    kelurahan: DataTypes.STRING,
    rw: DataTypes.STRING,
    rt: DataTypes.STRING,
    kodePos: DataTypes.STRING,
    agama: DataTypes.STRING,
    statusPernikahan: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    kewarganegaraan: DataTypes.STRING,
    golDarah: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Penduduk',
  });
  return Penduduk;
};