const registerUser = {
  tags: ["Users"],
  description: "Create a new user",
  operationId: "registerUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UserRequest",
        },
        example: {
          email: "alexbell@gmail.com",
          password: "9983273211",
        },
      },
    },
    required: true,
  },
  responses: {
    200: {
      description: "The created user",
      content: {
        "application/json": {
          schema: {
            schema: {
              $ref: "#/components/schemas/User",
            },
            example: {
              id: "63f22055333b9e4be7b7e239",
              email: "alexbell@gmail.com",
              password: "9983273211",
              createdAt: "2020-03-10T04:05:06.157Z",
              updatedAt: "2020-04-12T07:15:21.157Z",
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              success: false,
              status: 400,
              message: "User already exist",
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              success: false,
              status: 500,
              message: "Internal Server Error",
            },
          },
        },
      },
    },
  },
};

const loginUser = {
  tags: ["Users"],
  description: "Login",
  operationId: "loginUser",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/UserRequest",
        },
        example: {
          email: "alexbell@gmail.com",
          password: "9983273211",
        },
      },
    },
    required: true,
  },
  responses: {
    200: {
      description: "Login successfuly",
      content: {
        "application/json": {
          schema: {
            schema: {
              $ref: "#/components/schemas/User",
            },
            example: {
              id: "63f22055333b9e4be7b7e239",
              email: "alexbell@gmail.com",
              password: "9983273211",
              createdAt: "2020-03-10T04:05:06.157Z",
              updatedAt: "2020-04-12T07:15:21.157Z",
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              success: false,
              status: 401,
              message: "User not authorized",
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            schema: {
              $ref: "#/components/schemas/Error",
            },
            example: {
              success: false,
              status: 500,
              message: "Internal Server Error",
            },
          },
        },
      },
    },
  },
};

const User = {
  type: "object",
  properties: {
    _id: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    createdAt: {
      type: "string",
      format: "date",
    },
    updatedAt: {
      type: "string",
      format: "date",
    },
  },
};

const UserRequest = {
  type: "object",
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
};

module.exports = {
  registerUser,
  loginUser,
  User,
  UserRequest,
};
