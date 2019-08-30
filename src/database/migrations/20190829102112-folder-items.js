module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("folder_items", {
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      github_user_id: {
        type: Sequelize.INTEGER,
        references: { model: "github_users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false
      },
      folder_id: {
        type: Sequelize.INTEGER,
        references: { model: "folders", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("folder_items");
  }
};
