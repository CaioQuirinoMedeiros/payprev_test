import User from "../models/User";

export default async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);

    if (!user.admin) {
      return res
        .status(401)
        .send({ error: "Você não tem permissão de administrador" });
    }

    return next();
  } catch (err) {
    return res.status(401).send({ error: "Falha de autorização" });
  }
};
