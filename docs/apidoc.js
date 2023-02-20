const { version } = require("../package.json");
const {
  Contact,
  ContactRequest,
  createContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
} = require("./contact");
const { registerUser, loginUser, User, UserRequest } = require("./user");
const Error = require("./error");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NodeJs Crud API With JWT",
      version,
      description:
        "This is a simple CRUD API application made with Express, JWT and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Huseyin Kizilbulak",
        email: "huseyinkizilbulak76@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5001/api",
      },
    ],
    paths: {
      "/contacts": {
        post: createContact,
        get: getAllContacts,
      },
      "/contacts/{id}": {
        get: getContact,
        put: updateContact,
        delete: deleteContact,
      },
      "/users/register": {
        post: registerUser,
      },
      "/users/login": {
        post: loginUser,
      },
    },
    components: {
      schemas: {
        Contact,
        ContactRequest,
        User,
        UserRequest,
        Error,
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    tags: [
      {
        name: "Contacts",
      },
      {
        name: "Users",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/schema/*.js"],
};

module.exports = swaggerOptions;
