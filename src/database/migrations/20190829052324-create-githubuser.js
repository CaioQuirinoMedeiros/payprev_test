module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("github_users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      html_url: {
        type: Sequelize.STRING
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("github_users");
  }
};
