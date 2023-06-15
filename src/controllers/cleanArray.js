const cleanArray = (arr) =>
  arr.map((elem) => {
    let imagen = null;

    if (elem.image && elem.image.url) {
      imagen = elem.image.url;
    } else if (elem.reference_image_id) {
      if (elem.id === 15 || elem.id === 125 || elem.id === 212) {
        imagen = `https://cdn2.thedogapi.com/images/${elem.reference_image_id}.png`;
      } else {
        imagen = `https://cdn2.thedogapi.com/images/${elem.reference_image_id}.jpg`;
      }
    }

    return {
      id: elem.id,
      name: elem.name,
      altura: elem.height.metric,
      peso: elem.weight.metric,
      expectativaDeVida: elem.life_span,
      expectativaDeVida_min: elem.life_span_min,
      expectativaDeVida_max: elem.life_span_max,
      imagen,
      created: false,
      temperamento: elem.temperament ? elem.temperament.split(', ') : [],
    };
  });

module.exports = cleanArray;
