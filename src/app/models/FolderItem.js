import Sequelize, { Model } from "sequelize";

class FolderItem extends Model {
  static init(sequelize) {
    super.init(
      {
        tags: Sequelize.ARRAY(Sequelize.STRING)
      },
      {
        sequelize,
        modelName: "FolderItem"
      }
    );

    return this;
  }
}

export default FolderItem;
