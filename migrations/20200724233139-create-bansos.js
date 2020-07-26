'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bansos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
		allowNull:false
      },
      description: {
        type: Sequelize.STRING,
		defaultValue: "-"
      },
      categoryId: {
        type: Sequelize.INTEGER,
		allowNull:false,
		references:{
			model:'categories',
			key:'id'
		},
		onUpdate:'cascade',
		onDelete:'cascade'
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
    await queryInterface.dropTable('bansos');
  }
};