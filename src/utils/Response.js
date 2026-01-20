const Response = ({ res, success, message, data }) => {
  return res.json({
    success: success,
    message: message,
    data: data,
  });
};

module.exports = Response;
