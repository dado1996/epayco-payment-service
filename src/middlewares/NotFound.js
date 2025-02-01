export const NotFound = (request, response, next) => {
  response.status(404).json({
    status: 404,
    message: "The requested URL was not found on this server",
  });
};
