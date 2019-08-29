import * as Yup from "yup";

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      q: Yup.string().required("Forneça o parâmetro de consulta 'q'")
    });

    await schema.validate(req.query);
    return next();
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};
