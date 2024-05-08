//con express
const axios = require('axios');
const URL = 'https://rickandmortyapi.com/api/character/';

const getCharById = (req, res) => {
  const { id } = req.params;
  axios(`${URL}/${id}`)
    .then(({ data }) => {
      const { id, status, name, species, origin, image, gender, error } = data;
      const character = { id, status, name, species, origin, image, gender };
      return name ? res.json(character) : res.status(404).json({ message: error });
    })
    .catch((reason) => {
      return res.status(500).json({ message: reason });
    });
};

module.exports = getCharById;
