const Paginado = (page, limit, data) => {
  //   console.log(characters);
  const currentPage = page ? parseInt(page) : 1;
  const limitPage = limit ? parseInt(limit) : 8;
  const offset = (currentPage - 1) * limitPage;

  const baseUrl = 'https://rickandmortyapi.com/api/character/';
  const characters = data.results;

  let previousPage = '';

  if (currentPage !== 1) {
    previousPage = `${baseUrl}?page=${Math.max(1, currentPage - 1)}&limit=${limit}`;
  } else {
    previousPage = null;
  }

  const totalItems = Array.isArray(characters) ? characters.length : 0; // Verificar si characters es un array

  const totalPages = Math.ceil(totalItems / limitPage);

  let nextPage = null;

  if (currentPage < totalPages) {
    nextPage = `${baseUrl}?page=${currentPage + 1}&limit=${limit}`;
  }

  // Verificar si characters es un array antes de usar slice()
  const limitedCharacters = Array.isArray(characters)
    ? characters.slice(offset, offset + limitPage > 8 ? 8 : offset + limitPage).map((character) => ({
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        type: character.type,
        gender: character.gender,
        origin: character.origin.name,
        location: character.location.name,
        image: character.image,
      }))
    : []; // Si no es un array, devolver un array vacío

  const resultado = {
    previousPage,
    nextPage,
    limitPage,
    currentPage,
    offset,
    characters: limitedCharacters, // Devolver solo los primeros 8 personajes
  };

  return resultado;
};
module.exports = Paginado;
