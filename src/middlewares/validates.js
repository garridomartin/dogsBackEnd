const validate = (req, res, next) => {
  const { name, altura, peso, expectativaDeVida } = req.body;
  if (!name)
    return res.status(400).json({
      error: "MISSING name",
    });
  if (!altura)
    return res.status(400).json({
      error: "MISSING altura",
    });
  if (!peso)
    return res.status(400).json({
      error: "MISSING peso",
    });
  if (!expectativaDeVida)
    return res.status(400).json({
      error: "MISSING expectativaDeVida",
    });

  next();
};

module.exports = { validate };
