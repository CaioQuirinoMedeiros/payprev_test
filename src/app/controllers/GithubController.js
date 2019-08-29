import githubApi from "../../lib/githubApi.js";

class GithubController {
  async index(req, res) {
    try {
      const { data } = await githubApi.get("/search/users", {
        params: req.query
      });

      return res.status(200).send(data);
    } catch (err) {
      return res
        .status(400)
        .send({ error: "Erro ao buscar usuários pela api do github" });
    }
  }
}

export default new GithubController();
