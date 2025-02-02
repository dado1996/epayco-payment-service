import { Router } from "express";
import { dataValidation } from "../middlewares/DataValidation.js";
import {
  transactionPayConfirmSchema,
  transactionPaySchema,
} from "../validations/TransactionValidation.js";
import { TransactionController } from "../controllers/TransactionController.js";

const router = Router();
const transactionController = new TransactionController();

// Route to pay a product or service to a commerce
router.post(
  "/payment",
  dataValidation("body", transactionPaySchema),
  async (request, response, next) => {
    try {
      const result = await transactionController.payment(request.body);
      return response.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
);

// Route to validate the payment created by using
// sessionId and token
router.get(
  "/payment-confirmation",
  dataValidation("query", transactionPayConfirmSchema),
  async (request, response, next) => {
    try {
      const { sessionId, token } = request.query;
      const result = await transactionController.paymentConfirmation(
        sessionId,
        token
      );
      return response.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
