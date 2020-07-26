'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('mendapatkans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      keluargaId: {
        type: Sequelize.INTEGER,
		allowNull:false,
		references:{
			model:'keluargas',
			key:'id'
		},
      },
      bansosId: {
        type: Sequelize.INTEGER,
		allowNull:false,
		references:{
			model:'bansos',
			key:'id'
		},
      },
      status: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('mendapatkans');
  }
};