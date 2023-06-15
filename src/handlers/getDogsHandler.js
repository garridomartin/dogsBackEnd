const { getAllDogs } = require('../controllers/getAllDogs');
const { getDogsByIdRaza } = require('../controllers/getDogsByIdRaza');
const { searchDogsByName } = require('../controllers/searchDogsByName');
const { getTemperaments } = require('../controllers/getTemperaments');

const getDogsHandler = async (req, res) => {
  const { name } = req.query; //name es la raza de un perro que desee buscar por query
  const results = name ? await searchDogsByName(name) : await getAllDogs();
  if (results.length > 0) {
    res.status(200).json(results);
  } else {
    res.status(404).send('No se encontraron perros con ese nombre');
  }
};
//LLAMAR A LA FUNCION que obtiene los datos de la bdd
//llamar a la funcion que obtiene los datos del a api externa
//unir los datos unificando el formato
//cuando tenga los datos, responder

const getDogsByIdHandler = async (req, res) => {
  const { idRaza } = req.params;
  const source = isNaN(idRaza) ? 'bdd' : 'api'; //SI EL ID NO ES UN NUEMRO, BUSCA EN bdd, SI LO ES, EN LA API
  try {
    const dogs = await getDogsByIdRaza(idRaza, source);
    res.status(200).json(dogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //res.send(`NIY: estoy en posts detail by ${idRaza}`);
};

const getTemperamentsHandler = async (req, res) => {
  try {
    const temperaments = await getTemperaments();
    res.status(200).json(temperaments);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDogsHandler,
  getDogsByIdHandler,
  getTemperamentsHandler,
};
