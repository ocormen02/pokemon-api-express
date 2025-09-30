const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/pokemon.json');

/**
 * Read data from JSON file
 */
const readData = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data file:', error);
    throw new Error('Error reading Pokemon data');
  }
};

/**
 * Write data to JSON file
 */
const writeData = async (data) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing data file:', error);
    throw new Error('Error saving Pokemon data');
  }
};

/**
 * Get all Pokemon with optional pagination
 * @param {Object} options - Pagination options
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 20)
 */
const getAllPokemon = async (options = {}) => {
  const { page = 1, limit = 20 } = options;
  
  // Validate pagination parameters
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit))); // Max 100 items per page
  
  const pokemon = await readData();
  const totalItems = pokemon.length;
  const totalPages = Math.ceil(totalItems / limitNum);
  
  // Calculate pagination
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedPokemon = pokemon.slice(startIndex, endIndex);
  
  return {
    pokemon: paginatedPokemon,
    pagination: {
      currentPage: pageNum,
      itemsPerPage: limitNum,
      totalItems: totalItems,
      totalPages: totalPages,
      hasNextPage: pageNum < totalPages,
      hasPreviousPage: pageNum > 1
    }
  };
};

/**
 * Get a Pokemon by ID
 */
const getPokemonById = async (id) => {
  const pokemon = await readData();
  return pokemon.find(p => p.id === id);
};

/**
 * Create a new Pokemon
 */
const createPokemon = async (pokemonData) => {
  const pokemon = await readData();
  
  // Generate new ID
  const newId = pokemon.length > 0 
    ? Math.max(...pokemon.map(p => p.id)) + 1 
    : 1;
  
  const newPokemon = {
    id: newId,
    ...pokemonData
  };
  
  pokemon.push(newPokemon);
  await writeData(pokemon);
  
  return newPokemon;
};

/**
 * Update an existing Pokemon
 */
const updatePokemon = async (id, pokemonData) => {
  const pokemon = await readData();
  const index = pokemon.findIndex(p => p.id === id);
  
  if (index === -1) {
    return null;
  }
  
  // Keep the original ID and update other fields
  pokemon[index] = {
    ...pokemon[index],
    ...pokemonData,
    id: pokemon[index].id // Ensure ID doesn't change
  };
  
  await writeData(pokemon);
  return pokemon[index];
};

/**
 * Delete a Pokemon
 */
const deletePokemon = async (id) => {
  const pokemon = await readData();
  const index = pokemon.findIndex(p => p.id === id);
  
  if (index === -1) {
    return false;
  }
  
  pokemon.splice(index, 1);
  await writeData(pokemon);
  
  return true;
};

module.exports = {
  getAllPokemon,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon
};