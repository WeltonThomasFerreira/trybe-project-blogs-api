const catchError = async (err, _req, res, _next) =>
  res
    .status(err.code || 500)
    .json({ message: err.msg || 'Internal Server Error' });

module.exports = catchError;
