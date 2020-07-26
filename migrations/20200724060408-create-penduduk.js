'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Penduduks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
	  nik: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tmpLhr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tglLhr: {
        allowNull: false,
        type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
      },
      jnsKel: {
        allowNull: false,
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
        type: Sequelize.STRING,
      },
      kelurahan: {
        allowNull: false,
        type: Sequelize.STRING,
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
      agama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      statusPernikahan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pekerjaan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      kewarganegaraan: {
        allowNull: false,
        type: Sequelize.STRING,
		defaultValue: "WNI"
      },
      golDarah: {
        allowNull: false,
        type: Sequelize.STRING,
		defaultValue: "Tidak Tahu"
      },
      thumbnail: {
        type: Sequelize.STRING,
		defaultValue: "Avatar.jpg"
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
    await queryInterface.dropTable('Penduduks');
  }
};