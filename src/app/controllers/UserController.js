import User from "../models/User";

class UserController {
  async store(req, res) {
    const { email } = req.body;

    try {
      const userExists = await User.findByEmail(email);

      if (userExists) {
        return res.status(400).send({ error: "Usuário já existe" });
      }

      const user = await User.create(req.body);

      const token = await user.generateJWT();

      return res.status(200).send({ user, token });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: "Erro ao criar usuário" });
    }
  }

  async update(req, res) {
    const { email, password, oldPassword } = req.body;

    try {
      let user = await User.findByPk(req.userId);

      if (email && email !== user.email) {
        const userExists = await User.findByEmail(email);

        if (userExists) {
          return res.status(400).send({ error: "Email indisponível" });
        }
      }

      if (password) {
        if (!oldPassword) {
          return res.status(401).send({ error: "Forneça sua senha atual" });
        }

        const passwordMatch = await user.checkPassword(oldPassword);

        if (!passwordMatch) {
          return res.status(401).send({ error: "Senha atual inválida" });
        }
      }

      await user.update(req.body);

      user = await User.findByPk(user.id);

      return res.status(200).send(user);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: "Erro ao editar usuário" });
    }
  }
}

export default new UserController();
