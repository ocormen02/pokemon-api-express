/**
 * Utility to send consistent success responses
 */
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  const response = {
    success: true,
    message
  };
  
  if (data !== null && data !== undefined) {
    response.data = data;
  }
  
  return res.status(statusCode).json(response);
};

/**
 * Utility to send consistent error responses
 */
const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  return res.status(statusCode).json(response);
};

module.exports = {
  successResponse,
  errorResponse
};