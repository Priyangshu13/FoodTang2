// Optional logger
export const requestLogger = (req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
  };
  
  // Centralized error handler
  export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  };
  