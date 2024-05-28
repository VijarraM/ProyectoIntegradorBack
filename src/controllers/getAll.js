const axios = require('axios');

// const Paginado = require('../utils/paginate');

// Define tu controlador para el endpoint GET
const getAll = async (req, res) => {
  try {
    let { page } = req.query;
    if (!page) {
      page = 1;
    }
    const baseUrl = 'https://proyectointegradorback.onrender.com/rickandmorty/characters';
    const next = `${baseUrl}?page=${Number(page) + 1}`;
    const prev = `${baseUrl}?page=${Number(page) - 1}`;

    const { data } = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
    const charactersComplete = data.results;
    const characters = charactersComplete.map((character) => ({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: character.origin.name,
      location: character.location.name,
      image: character.image,
    }));

    res.json({
      next,
      prev,
      characters,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al obtener los personajes.' });
  }
};

module.exports = getAll;
