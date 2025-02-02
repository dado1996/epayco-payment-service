import Joi from "joi";

export const transactionPaySchema = Joi.object({
  documentId: Joi.string().alphanum().min(6).max(16).required(),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .length(10)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid Colombian phone number",
      "string.length": "Phone number must be exactly 10 digits long",
    }),
  value: Joi.number().min(5.0).max(99999.99).precision(2).required(),
  commerceName: Joi.string().min(5).max(50).required(),
  commerceId: Joi.string().length(10).required(),
});

export const transactionPayConfirmSchema = Joi.object({
  sessionId: Joi.string().required(),
  token: Joi.number().min(100000).max(999999).required(),
});
