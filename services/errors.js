exports.DISPLAY_NAME_IS_INVALID = () => {
  const error = new Error();
  error.code = 400;
  error.msg = '"displayName" length must be at least 8 characters long';
  return error;
};

exports.EMAIL_IS_REQUIRED = () => {
  const error = new Error();
  error.code = 400;
  error.msg = '"email" is required';
  return error;
};

exports.EMAIL_IS_INVALID = () => {
  const error = new Error();
  error.code = 400;
  error.msg = '"email" must be a valid email';
  return error;
};

exports.PASSWORD_IS_REQUIRED = () => {
  const error = new Error();
  error.code = 400;
  error.msg = '"password" is required';
  return error;
};

exports.PASSWORD_IS_INVALID = () => {
  const error = new Error();
  error.code = 400;
  error.msg = '"password" length must be at least 6 characters long';
  return error;
};

exports.USER_ALREADY_REGISTERED = () => {
  const error = new Error();
  error.code = 409;
  error.msg = 'User already registered';
  return error;
};
