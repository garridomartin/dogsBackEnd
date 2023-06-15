const { Dogs } = require("../db");
const createDog = async (ID, name, altura, peso, expectativaDeVida, imagen) => {
  const newDog = await Dogs.create({
    ID,
    name,
    altura,
    peso,
    expectativaDeVida,
    imagen,
  });
  return newDog;
};

module.exports = { createDog };
