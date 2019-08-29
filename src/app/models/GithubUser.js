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
        tableName: "gihub_users"
      }
    );

    return this;
  }
}

export default GithubUser;
