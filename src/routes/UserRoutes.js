import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
import { dataValidation } from "../middlewares/DataValidation.js";
import { createUserSchema } from "../validations/UserValidation.js";

const routes = Router();
const user = new UserController();

// Create a user route
routes.post(
  "/",
  dataValidation("body", createUserSchema),
  async (request, response, next) => {
    try {
      const result = await user.store(request.body);
      return response.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
);

// Get all users
routes.get("/", async (request, response, next) => {
  try {
    const result = await user.find(parseInt(request.query.offset) || 0);
    return response.status(result.status).json(result);
  } catch (error) {
    next(error);
  }
});

export default routes;
