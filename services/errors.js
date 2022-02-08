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
