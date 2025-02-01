export const errorValidation = (err, request, response, next) => {
  console.error(err.stack);
  return response.status(500).json({
    status: 500,
    message: "An error has occurred: " + err.message,
  });
};
