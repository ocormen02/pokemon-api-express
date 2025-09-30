const pokemonService = require('../services/pokemon.service');
const { successResponse, errorResponse } = require('../utils/response.util');

/**
 * Controller to get all Pokemon with pagination
 */
const getAll = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await pokemonService.getAllPokemon({ page, limit });
    return successResponse(res, result, 'Pokemon retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a Pokemon by ID
 */
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pokemon = await pokemonService.getPokemonById(parseInt(id));
    
    if (!pokemon) {
      return errorResponse(res, 'Pokemon not found', 404);
    }
    
    return successResponse(res, pokemon, 'Pokemon retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new Pokemon
 */
const create = async (req, res, next) => {
  try {
    const pokemonData = req.body;
    const newPokemon = await pokemonService.createPokemon(pokemonData);
    return successResponse(res, newPokemon, 'Pokemon created successfully', 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update an existing Pokemon
 */
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pokemonData = req.body;
    const updatedPokemon = await pokemonService.updatePokemon(parseInt(id), pokemonData);
    
    if (!updatedPokemon) {
      return errorResponse(res, 'Pokemon not found', 404);
    }
    
    return successResponse(res, updatedPokemon, 'Pokemon updated successfully', 200);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a Pokemon
 */
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await pokemonService.deletePokemon(parseInt(id));
    
    if (!deleted) {
      return errorResponse(res, 'Pokemon not found', 404);
    }
    
    return successResponse(res, null, 'Pokemon deleted successfully', 200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};