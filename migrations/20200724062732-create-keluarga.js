'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Keluargas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      noKK: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      provinsi: {
        allowNull: false,
        type: Sequelize.STRING,
		defaultValue: "Jawa Barat"
      },
      kota: {
        allowNull: false,
        type: Sequelize.STRING,
		defaultValue: "Kota Tasikmalaya"
      },
      kecamatan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      kelurahan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dusun: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rw: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      kodePos: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Keluargas');
  }
};