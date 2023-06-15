const { createDog } = require('../controllers/createDogs');

const postDogsHandler = async (req, res) => {
  try {
    const {
      ID,
      name,
      altura,
      peso,
      expectativaDeVida,
      temperamento,
      imagen,
      created,
    } = req.body;
    console.log(req.body);
    if (!name || !altura || !peso || !expectativaDeVida || !temperamento) {
      return res
        .status(400)
        .json({ error: 'Required fields are missing to create a new dog.' });
    }
    const newDog = await createDog(
      ID,
      name,
      altura,
      peso,
      expectativaDeVida,
      imagen,
      temperamento,
      created
    );
    res.status(201).json(newDog);
    console.log('perro creado exitosamente');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postDogsHandler };
