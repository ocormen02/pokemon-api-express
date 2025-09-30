const { errorResponse } = require('../utils/response.util');

/**
 * Middleware to validate ID in parameters
 */
const validateId = (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  
  if (isNaN(parsedId) || parsedId <= 0) {
    return errorResponse(res, 'Invalid ID. Must be a positive number', 400);
  }
  
  next();
};

/**
 * Middleware to validate Pokemon data
 */
const validatePokemon = (req, res, next) => {
  const { name, description, characteristics, type } = req.body;
  const errors = [];
  
  // Validate name
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required and must be a non-empty string');
  }
  
  // Validate description
  if (!description || typeof description !== 'string' || description.trim().length === 0) {
    errors.push('Description is required and must be a non-empty string');
  }
  
  // Validate characteristics
  if (!characteristics || typeof characteristics !== 'object') {
    errors.push('Characteristics object is required');
  } else {
    const { height, weight, base_experience, abilities } = characteristics;
    
    if (!height || typeof height !== 'string') {
      errors.push('Characteristics.height is required and must be a string');
    }
    
    if (!weight || typeof weight !== 'string') {
      errors.push('Characteristics.weight is required and must be a string');
    }
    
    if (base_experience === undefined || typeof base_experience !== 'number' || base_experience < 0) {
      errors.push('Characteristics.base_experience is required and must be a non-negative number');
    }
    
    if (!Array.isArray(abilities) || abilities.length === 0) {
      errors.push('Characteristics.abilities is required and must be a non-empty array');
    } else if (!abilities.every(ability => typeof ability === 'string')) {
      errors.push('All abilities must be strings');
    }
  }
  
  // Validate type
  if (!Array.isArray(type) || type.length === 0) {
    errors.push('Type is required and must be a non-empty array');
  } else if (!type.every(t => typeof t === 'string')) {
    errors.push('All types must be strings');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

module.exports = {
  validateId,
  validatePokemon
};