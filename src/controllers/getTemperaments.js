const { Temperaments } = require("../db");
const axios = require("axios");
const { API_KEY, URL_BASE } = process.env;

//SOLICITO A LA API TODOS LOS TEMPERAMENTOS. LUEGO LLAMO A LA FUNCION getUnique... Y RETORNO TODOS LOS TEMPERAMENTOS
const getTemperaments = async () => {
  try {
    const temperamentsApi = (await axios.get(`${URL_BASE}?api_key=${API_KEY}`))
      .data;
    console.log("SE OBTUVIERON TEMPERAMENTOS SIN FILTRAR DESDE LA API");
    const allTemperaments = await getUniqueTemperaments(temperamentsApi);
    return allTemperaments;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving temperaments");
  }
};

//AQUI TRABAJO LOS TEMPERAMENTOS DE LA API, CREO UNA INSTANCIA DE SET (ELIMINO DUPLICADOS), PREVIO A ESO, LOS UNO EN UNA CADENA UNICA, LE QUITO ESPACIOS,
//LOS SEPARO POR ",", POR ULTIMO LOS MAPEO Y ELIMINO EL PRIMER Y ULTIMO ESPACIO, ASI SET ELIMINA DUPLICADOS.
async function extractTemperaments(apiDogs) {
  const temperamentos = apiDogs.map((apiDog) => apiDog.temperament);
  //console.log(temperamentos); ACTIVAR PARA VER TODOS LOS TEMPERAMENTOS DE LA API SIN FILTRAR
  const uniqueTemperamentsSet = new Set(
    temperamentos
      .join()
      .replace(/\s/g, "")
      .split(",")
      .map((elemento) => elemento.trim())
  );
  const allTemperaments = [...uniqueTemperamentsSet].sort((a, b) =>
    a.localeCompare(b)
  );
  //console.log(allTemperaments); //ACTIVAR PARA VER TODOS LOS TEMPERAMENTOS FILTRADOS, DESDE LA CONSOLA
  console.log("SE FILTRARON TODOS LOS TEMPERAMENTOS EXITOSAMENTE");
  return allTemperaments;
}
//AGREGO LOS TEMPERAMENTOS A LA BASE DE DATOS Temperaments. ANTES DE AGREGARLO, CHQUEQUEO QUE NO HAYA UN TEMPERAMENTO DE LOS QUE VOY AGREGAR EN LA BD
async function getUniqueTemperaments(apiDogs) {
  const allTemperaments = [];
  const temperamentsToCreate = await extractTemperaments(apiDogs);
  for (const i of temperamentsToCreate) {
    if (i !== undefined && i !== "") {
      const viewExist = await Temperaments.findOne({ where: { name: i } });
      viewExist
        ? allTemperaments.push(viewExist)
        : allTemperaments.push(await Temperaments.create({ name: i }));
    }
  }
  console.log(
    "SE AGREGARON TODOS LOS TEMPERAMENTOS A LA BASE DE DATOS Temperaments"
  );
  return allTemperaments;
}

module.exports = {
  getTemperaments,
};
