import Sequelize, { Model } from "sequelize";

class Folder extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING
      },
      {
        sequelize,
        tableName: "folders"
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "owner" });
  }
}

export default Folder;
