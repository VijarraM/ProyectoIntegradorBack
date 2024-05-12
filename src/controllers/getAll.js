const axios = require('axios');

const Paginado = require('../utils/paginate');

// Define tu controlador para el endpoint GET
const getAll = async (req, res) => {
  try {
    const { data } = await axios.get('https://rickandmortyapi.com/api/character/');

    const { page, limit } = req.query;

    const pagination = Paginado(page, limit, data);

    res.json({
      // pagination: pagination
      characters: pagination.characters,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener los personajes.' });
  }
};

module.exports = getAll;
