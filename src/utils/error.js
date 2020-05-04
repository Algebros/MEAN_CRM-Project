class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const response = {
    status: 'Error',
    statusCode: err.statusCode || 500,
    message: err.message || 'Server Error'
  }
  res.status(response.statusCode).json(response);
};

const catchErrors = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

  module.exports = {
    ErrorHandler,
    handleError,
    catchErrors
  };
