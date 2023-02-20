const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { Api401Error } = require("../helpers/errors");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = decodedToken.user;
      next();
    } catch (error) {
      throw new Api401Error("User not authorized");
    }
  } else {
    throw new Api401Error("User not authorized");
  }
});

module.exports = validateTokenHandler;
