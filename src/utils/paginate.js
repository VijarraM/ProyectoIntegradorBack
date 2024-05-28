const Paginado = (page, limit, data) => {
  const currentPage = page ? parseInt(page) : 1;
  const limitPage = limit ? parseInt(limit) : 20;
  const offset = (currentPage - 1) * limitPage;

  const characters = data.results;
  let previousPage = data.info.prev;
  let nextPage = data.info.next;
  const totalPages = data.info.pages;
  const totalItems = data.info.count;

  // Verificar si characters es un array antes de usar slice()
  const limitedCharacters = Array.isArray(characters)
    ? characters.slice(offset, offset + limitPage).map((character) => ({
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
    : [];
  // Si no es un array, devolver un array vacío

  const resultado = {
    previousPage,
    nextPage,
    totalPages,
    currentPage,
    totalItems,
    characters: limitedCharacters,
  };

  return resultado;
};
module.exports = Paginado;
