const APIError = require("../error");
const httpStatusCodes = require("../httpStatusCodes");

class Api403Error extends APIError {
  constructor(message, statusCode = httpStatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}

module.exports = Api403Error;
