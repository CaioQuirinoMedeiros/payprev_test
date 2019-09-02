import GithubUser from "../models/GithubUser";

import githubApi from "../../lib/githubApi";

class GitHubUserController {
  async index(req, res) {
    try {
      const githubUsers = await GithubUser.findAll();

      return res.status(200).send(githubUsers);
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Erro ao buscar usuários do github" });
    }
  }

  async store(req, res) {
    const { name: username } = req.body;

    try {
      const { data } = await githubApi.get(`/users/${username}`);

      const { login, name, bio, location, html_url } = data;

      const githubUserExists = await GithubUser.findOne({ where: { login } });

      if (githubUserExists) {
        return res
          .status(400)
          .send({ error: "Esse usuário do github já está adicionado" });
      }

      const githubUser = await GithubUser.create({
        login,
        name,
        bio,
        location,
        html_url
      });

      return res.status(201).send(githubUser);
    } catch (err) {
      return res.status(400).send({ error: "Erro ao criar usuário do github" });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const deleted = await GithubUser.destroy({ where: { id } });

      if (!deleted) {
        return res
          .status(404)
          .send({ error: "Usuário do github não encontrado" });
      }

      return res.status(200).send();
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Erro ao deletar usuário do github" });
    }
  }
}

export default new GitHubUserController();
