const { Dogs, Temperaments } = require('../db');
const axios = require('axios');
const { API_KEY, URL_BASE } = process.env;
const cleanArray = require('./cleanArray');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//BUSCO PERROS EN LA BASE DE DATOS, EN LA TABLA  Dogs.
const searchDogsByName = async (name) => {
  const databaseDogs = await Dogs.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Temperaments,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }, // Incluye los temperamentos en la consulta
  });

  //LIMPIO LOS DATOS OBTENIDOS POR LOS QUE ME INTERESAN CON cleanArray
  const apiDogsRaw = (await axios.get(`${URL_BASE}?api_key=${API_KEY}`)).data;
  const apiDogs = cleanArray(apiDogsRaw);

  //FILTRO LA BUSQUEDA ENTRE MAYUS Y MINUSC
  const filteredApi = apiDogs.filter((dog) => {
    //dog REPRESENTA A LOS ELEMENTOS DEL ARRYA apiDogs
    const dogName = dog.name.toLowerCase(); //CONVIERTO EL NOMBRE DEL PERRO ACTUAL A MINUSC
    const searchName = name.toLowerCase(); //CONVIERTO EL NOMBRE BUSCADO A MINUSC
    return dogName.includes(searchName); //EL METODO includes VERIFICA QUE EL NOMBRE DEL PERRO SE INCLUYA EN EL PERRO BUSCADO
  }); //SI LO INCLUYE, LO RETORNA.

  const mergedDogs = [...filteredApi, ...databaseDogs];

  const dogsWithTemperaments = mergedDogs.map((dog) => {
    if (dog.Temperaments && dog.Temperaments.length > 0) {
      const temperamento = dog.Temperaments.map((temp) => temp.name);
      return { ...dog.toJSON(), temperamento };
    } else {
      return dog;
    }
  });

  const dogsWithoutTemperaments = dogsWithTemperaments.map((dog) => {
    delete dog.Temperaments;
    return dog;
  });

  return dogsWithoutTemperaments;
};

module.exports = { searchDogsByName };
