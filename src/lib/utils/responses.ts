export const createSuccessResponse = (res, data, message = 'success', statusCode = 200) => {
  return (
    res.statusCode = statusCode,
    res.end(JSON.stringify({ success: true, message, data }))
  );
};

export const createFailedResponse = (res, data, message = 'failed', statusCode = 400) => {
  return (
    res.statusCode = statusCode,
    res.end(JSON.stringify({ success: false, message, data }))
  );
};

export const createErrorResponse = (res, message = 'error', statusCode = 500) => {
  return (
    res.statusCode = statusCode,
    res.end(JSON.stringify({ success: false, message }))
  );
};
