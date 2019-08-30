import Folder from "../models/Folder";
import User from "../models/User";
import GithubUser from "../models/GithubUser";

class FolderController {
  async index(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      let folders;

      if (user.admin) {
        folders = await Folder.findAll({
          include: [{ model: User, as: "owner", attributes: ["cpf", "email"] }]
        });
      } else {
        folders = await Folder.findAll({
          where: { user_id: req.userId }
        });
      }

      return res.status(200).send(folders);
    } catch (err) {
      return res.status(400).send({ error: "Erro ao buscar pastas" });
    }
  }

  async store(req, res) {
    const { name } = req.body;

    try {
      const folderExists = await Folder.findOne({ where: { name } });

      if (folderExists) {
        return res
          .status(400)
          .send({ error: "Você já tem uma pasta com esse nome" });
      }

      const folder = await Folder.create({ name, user_id: req.userId });

      return res.status(201).send(folder);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: "Erro ao criar pasta" });
    }
  }

  async update(req, res) {
    const { name } = req.body;
    const { id } = req.params;

    try {
      let folder = await Folder.findByPk(id);

      if (!folder) {
        return res.status(404).send({ error: "Pasta não encontrada" });
      }

      if (folder.name !== name) {
        const folderExists = await Folder.findOne({
          where: { name, user_id: req.userId }
        });

        if (folderExists) {
          return res
            .status(400)
            .send({ error: "Você já tem uma pasta com esse nome" });
        }
      }

      await folder.update({ name });

      folder = await Folder.findByPk(folder.id);

      return res.status(200).send(folder);
    } catch (err) {
      return res.status(400).send({ error: "Erro ao editar o nome da pasta" });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Folder.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).send({ error: "Pasta não encontrada" });
      }

      return res.status(200).send();
    } catch (err) {
      return res.status(400).send({ error: "Erro ao deletar pasta" });
    }
  }

  async addItem(req, res) {
    const { id } = req.params;
    const { githubUserId, tags } = req.body;

    try {
      const githubUser = await GithubUser.findByPk(githubUserId);

      const folder = await Folder.findByPk(id, {
        where: { user_id: req.userId }
      });

      const response = await folder.addItem(githubUser, {
        through: { tags, status: "ok" }
      });

      return res.status(201).send(response);
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .send({ error: "Não foi possível adicionar na pasta" });
    }
  }
}

export default new FolderController();
