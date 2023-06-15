const { Dogs, Temperaments } = require('../db');

const createDog = async (
  id,
  name,
  altura,
  peso,
  expectativaDeVida,
  imagen,
  temperamento,
  created
) => {
  const findTemperaments = await Temperaments.findAll({
    where: { name: temperamento },
  });
  //console.log(findTemperaments);
  const newDog = await Dogs.create({
    id,
    name,
    altura,
    peso,
    expectativaDeVida,
    imagen,
    created,
  });
  await newDog.addTemperaments(findTemperaments);
  return newDog;
};

module.exports = { createDog };
