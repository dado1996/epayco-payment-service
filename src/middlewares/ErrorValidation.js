export const errorValidation = (err, request, response, next) => {
  console.error(err.stack);
  response.status(500).json({
    status: 500,
    message: "An error has occurred: " + err.message,
  });
  return;
};
