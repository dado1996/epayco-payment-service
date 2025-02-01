import Joi from "joi";

export const createUserSchema = Joi.object({
  documentId: Joi.string().alphanum().min(6).max(16).required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .length(10)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid Colombian phone number",
      "string.length": "Phone number must be exactly 10 digits long",
    }),
});
