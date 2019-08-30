import Sequelize, { Model } from "sequelize";

class Folder extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "owner" });
    this.belongsToMany(models.GithubUser, {
      through: "FolderItem",
      as: "Item"
    });
  }
}

export default Folder;
