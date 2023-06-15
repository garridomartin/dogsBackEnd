const { Dogs } = require('../db');
const { Temperaments } = require('../db');
const axios = require('axios');
const { API_KEY, URL_BASE } = process.env;
const cleanArray = require('./cleanArray');

const getAllDogs = async () => {
  try {
    const databaseDogs = await Dogs.findAll({
      attributes: [
        'id',
        'name',
        'altura',
        'peso',
        'expectativaDeVida',
        'imagen',
        'created',
      ],
      include: {
        model: Temperaments,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    //para que los temperamentos se muestren como array
    const transformedDatabaseDogs = databaseDogs.map((dog) => {
      const temperamento = dog.Temperaments.map((temp) => temp.name);
      const { Temperaments, ...dogWithoutTemperaments } = dog.toJSON();
      return { ...dogWithoutTemperaments, temperamento };
    });

    const apiDogsRaw = (await axios.get(`${URL_BASE}?api_key=${API_KEY}`)).data;
    const apiDogs = cleanArray(apiDogsRaw);

    return [...transformedDatabaseDogs, ...apiDogs].flat(); //con flat evitono haya arrays anidados y se devuelve el resultado de la función.
  } catch (error) {
    console.error(error);
    throw {
      status: 500,
      message: 'Error retrieving dogs data.',
    };
  }
};

module.exports = { getAllDogs };
