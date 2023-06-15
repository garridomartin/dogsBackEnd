const axios = require('axios');
const { API_KEY, URL_BASE } = process.env;
const { Dogs, Temperaments } = require('../db');
const cleanArray = require('./cleanArray');

const getDogsByIdRaza = async (idRaza, source) => {
  const dog =
    source === 'api' //BUSQUEDA EN LA API
      ? cleanArray([
          await (
            await axios.get(`${URL_BASE}/${idRaza}?api_key=${API_KEY}`)
          ).data,
        ])
      : await Dogs.findByPk(idRaza, {
          //BUSQUEDA EN LA BD Dogs
          include: [
            {
              model: Temperaments,
              attributes: ['name'],
              through: {
                attributes: [],
              },
            },
          ],
        });

  if (!dog) {
    console.log(`No se encontró ningún perro con el ID: ${idRaza}`);
  } else {
    console.log(`SE ENCONTRO UN PERRO CON EL ID: ${idRaza}`);
  }

  if (dog && dog.Temperaments) {
    const temperamento = dog.Temperaments.map((temp) => temp.name);
    const dogWithTemperaments = { ...dog.toJSON(), temperamento };
    delete dogWithTemperaments.Temperaments;
    return dogWithTemperaments;
  }

  return dog;
};

module.exports = { getDogsByIdRaza };
