'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('membentuks', {
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
		onUpdate:'cascade',
		onDelete:'cascade'
      },
      pendudukId: {
        type: Sequelize.INTEGER,
		allowNull:false,
		references:{
			model:'penduduks',
			key:'id'
		},
		onUpdate:'cascade',
		onDelete:'cascade'
      },
      hubungan: {
        type: Sequelize.STRING,
		defaultValue: "Kepala Keluarga"
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
    await queryInterface.dropTable('membentuks');
  }
};