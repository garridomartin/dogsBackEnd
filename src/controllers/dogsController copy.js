const { dogs } = require("../db");
const axios = require("axios");
const { API_KEY, URL_BASE } = process.env;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const dogsDB = require("../models/dogsDB");

const createDog = async (
  ID,
  name,
  altura,
  peso,
  expectativaDeVida,
  temperamento,
  imagen,
  created
) => {
  const newDog = await dogs.create({
    ID,
    name,
    altura,
    peso,
    expectativaDeVida,
    temperamento,
    imagen,
    created,
  });
  return newDog;
};

const cleanArray = (arr) =>
  arr.map((elem) => {
    //retorno directamente el array que mapeo, para ahorrar codigo
    return {
      ID: elem.id,
      name: elem.name,
      altura: elem.height.metric,
      peso: elem.weight.metric,
      expectativaDeVida: elem.life_span,
      expectativaDeVida_min: elem.life_span_min,
      expectativaDeVida_max: elem.life_span_max,
      temperamento: elem.temperament ? elem.temperament.split(", ") : [],
      imagen: elem.image?.url,
      created: false,
    };
  });
//!SOLUCIONAR PROBLEMA QUE NO TRAE IMAGEN
const getDogsByIdRaza = async (idRaza, source) => {
  const dog =
    source === "api"
      ? cleanArray([
          await (
            await axios.get(`${URL_BASE}/${idRaza}?api_key=${API_KEY}`)
          ).data,
        ])
      : await dogs.findByPk(idRaza);

  return dog;
};

const getAllDogs = async () => {
  const databaseDogs = await dogs.findAll();
  const apiDogsRaw = //es el req de la api sin tratar, "en crudo"
    (await axios.get(`${URL_BASE}?api_key=${API_KEY}`)).data;

  const apiDogs = cleanArray(apiDogsRaw);

  return [...databaseDogs, ...apiDogs]; //es como definir result=[] y luego retornarlo. hago destructuring en uno solo
};

const searchDogsByName = async (name) => {
  const databaseDogs = await dogs.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  const apiDogsRaw = //es el req de la api sin tratar, "en crudo"
    (await axios.get(`${URL_BASE}?api_key=${API_KEY}`)).data;

  const apiDogs = cleanArray(apiDogsRaw);

  const filteredApi = apiDogs.filter((dog) => {
    const dogName = dog.name.toLowerCase();
    const searchName = name.toLowerCase();
    return dogName.includes(searchName);
  });

  return [...filteredApi, ...databaseDogs];
};

module.exports = { createDog, getDogsByIdRaza, searchDogsByName, getAllDogs };
