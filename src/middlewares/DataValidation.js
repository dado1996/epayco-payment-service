export const dataValidation = (source, objectSchema) => {
  return (request, response, next) => {
    const { error, value } = objectSchema.validate(request[source], false);
    if (error) {
      response.status(400).json({
        status: 400,
        message: "There are errors with the data",
        errors: error.details.map((i) => i.message),
      });
      return;
    }

    next();
  };
};
