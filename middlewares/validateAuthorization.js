require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const TOKEN_NOT_FOUND = new Error();
TOKEN_NOT_FOUND.code = 401;
TOKEN_NOT_FOUND.msg = 'Token not found';

const INVALID_TOKEN = new Error();
INVALID_TOKEN.code = 401;
INVALID_TOKEN.msg = 'Expired or invalid token';

const Service = {
  validateAuthorization: async (authorization) => {
    try {
      const schema = Joi.string().required().error(TOKEN_NOT_FOUND);
      await schema.validateAsync(authorization);
      jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
      console.error(error);
      const invalidToken = /^(TokenExpiredError|JsonWebTokenError)$/;
      if (invalidToken.test(error.name)) throw INVALID_TOKEN;
      throw error;
    }
  },
};

exports.validateAuthorization = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await Service.validateAuthorization(authorization);
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(error.code || 500)
      .json({ message: error.msg || 'Internal Server Error' });
  }
};
