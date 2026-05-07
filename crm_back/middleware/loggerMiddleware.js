const requestLogger = (req, res, next) => {
  const start = Date.now();


  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();


    let statusColor = '\x1b[32m'; // Green for 2xx
    if (res.statusCode >= 400 && res.statusCode < 500) statusColor = '\x1b[33m'; // Yellow for 4xx
    if (res.statusCode >= 500) statusColor = '\x1b[31m'; // Red for 5xx
    const resetColor = '\x1b[0m';

    console.log(`[${timestamp}] ${req.method} ${req.originalUrl} ${statusColor}${res.statusCode}${resetColor} - ${duration}ms`);
  });

  next();
};

module.exports = requestLogger;
