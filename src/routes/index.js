const { Router } = require("express");
const mainRouter = Router();
const getRouter = require("./getRouter");
const createDogs = require("./createtDogs");

mainRouter.get("/", (req, res) => {
  res.status(200).send("PAGINA DE INICIO");
});
mainRouter.use(getRouter);
mainRouter.post("/dogs", createDogs);

module.exports = mainRouter;
