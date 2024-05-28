const axios = require('axios');
const URL = 'https://rickandmortyapi.com/api/character/';

const getCharById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios(`${URL}/${id}`);
    const { status, name, species, origin, image, gender, error } = response.data;
    const character = { id, status, name, species, origin, gender, image };

    if (name) {
      res.json(character);
    } else {
      res.status(404).json({ message: error });
    }
  } catch (reason) {
    res.status(500).json({ message: 'cai aca' });
  }
};

module.exports = getCharById;
