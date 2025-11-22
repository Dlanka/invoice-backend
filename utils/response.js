// utils/response.js

function sendResponse(res, status, message, data = null) {
  return res.status(status).json({
    isSuccess: status < 400,
    message,
    data,
  });
}

module.exports = { sendResponse };
