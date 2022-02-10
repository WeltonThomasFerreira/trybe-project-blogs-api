require('dotenv').config();
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const TOKEN_NOT_FOUND = () => {
  const error = new Error();
  error.code = 401;
  error.msg = 'Token not found';
  return error;
};

const INVALID_TOKEN = () => {
  const error = new Error();
  error.code = 401;
  error.msg = 'Expired or invalid token';
  return error;
};

const Service = {
  validateAuthorization: async (authorization) => {
    try {
      const schema = Joi.string().required().error(TOKEN_NOT_FOUND);
      await schema.validateAsync(authorization);
      jwt.verify(authorization, process.env.JWT_SECRET);
    } catch (error) {
      console.error(error);
      const invalidToken = /^(TokenExpiredError|JsonWebTokenError)$/;
      if (invalidToken.test(error.name)) throw INVALID_TOKEN();
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
