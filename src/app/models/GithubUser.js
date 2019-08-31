import Sequelize, { Model } from "sequelize";

class GithubUser extends Model {
  static init(sequelize) {
    super.init(
      {
        login: Sequelize.STRING,
        name: Sequelize.STRING,
        bio: Sequelize.STRING,
        location: Sequelize.STRING,
        html_url: Sequelize.STRING
      },
      {
        sequelize,
        tableName: "github_users"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Folder, {
      through: "FolderItem",
      as: "folders",
      foreignKey: "github_user_id"
    });
  }
}

export default GithubUser;
