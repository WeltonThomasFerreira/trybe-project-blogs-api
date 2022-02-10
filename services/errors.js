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
  error.msg = '"password" length must be 6 characters long';
  return error;
};

exports.USER_ALREADY_REGISTERED = () => {
  const error = new Error();
  error.code = 409;
  error.msg = 'User already registered';
  return error;
};

exports.EMAIL_IS_EMPTY = () => {
  const error = new Error();
  error.code = 400;
  error.msg = '"email" is not allowed to be empty';
  return error;
};

exports.PASSWORD_IS_EMPTY = () => {
  const error = new Error();
  error.code = 400;
  error.msg = '"password" is not allowed to be empty';
  return error;
};

exports.INVALID_FIELDS = () => {
  const error = new Error();
  error.code = 400;
  error.msg = 'Invalid fields';
  return error;
};

exports.USER_DOES_NOT_EXIST = () => {
  const error = new Error();
  error.code = 404;
  error.msg = 'User does not exist';
  return error;
};

exports.NAME_IS_REQUIRED = () => {
  const error = new Error();
  error.code = 400;
  error.msg = '"name" is required';
  return error;
};

exports.CATEGORY_ALREADY_REGISTERED = () => {
  const error = new Error();
  error.code = 409;
  error.msg = 'Category already registered';
  return error;
};
