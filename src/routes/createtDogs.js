const { Router } = require("express");
const createDogs = Router();
const { postDogsHandler } = require("../handlers/createDogsHandler");
const { validate } = require("../middlewares/validates");

createDogs.post("/dogs", validate, postDogsHandler);

module.exports = createDogs;
