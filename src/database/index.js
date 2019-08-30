import Sequelize from "sequelize";

import databaseConfig from "../config/database";

import User from "../app/models/User";
import GithubUser from "../app/models/GithubUser";
import Folder from "../app/models/Folder";
import Item from "../app/models/FolderItem";

const models = [Item, User, GithubUser, Folder];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
