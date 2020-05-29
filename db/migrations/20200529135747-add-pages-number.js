'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Books', 'nbPages', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1000
        })
  },
  down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Books', 'nbPages');
  }
};
