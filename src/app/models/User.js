import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";

import { isValidCPF } from "../helpers/index";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        cpf: {
          type: Sequelize.STRING,
          validate: { isValidCPF }
        },
        email: {
          type: Sequelize.STRING,
          validate: { isEmail: true }
        },
        password: {
          type: Sequelize.VIRTUAL,
          validate: { len: [6, 127] }
        },
        password_hash: Sequelize.STRING,
        admin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      },
      {
        sequelize
      }
    );

    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static async findByEmail(email) {
    return this.findOne({ where: { email } });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateJWT() {
    const { id } = this;
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    });
  }

  toJSON() {
    const values = { ...this.get() };

    delete values.password;
    delete values.password_hash;

    return values;
  }
}

export default User;
