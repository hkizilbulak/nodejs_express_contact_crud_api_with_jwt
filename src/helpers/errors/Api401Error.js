const APIError = require("../error");
const httpStatusCodes = require("../httpStatusCodes");

class Api401Error extends APIError {
  constructor(message, statusCode = httpStatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}

module.exports = Api401Error;
