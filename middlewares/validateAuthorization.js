require('dotenv').config();
const rescue = require('express-rescue');
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
      const invalidToken = /^(TokenExpiredError|JsonWebTokenError)$/;
      if (invalidToken.test(error.name)) throw INVALID_TOKEN;
      throw error;
    }
  },
};

exports.validateAuthorization = rescue(async (req, _res, next) => {
  const { authorization } = req.headers;
  await Service.validateAuthorization(authorization);
  next();
});
