import { Router } from "express";
import { dataValidation } from "../middlewares/DataValidation.js";
import { walletDepositSchema } from "../validations/WalletValidation.js";
import { WalletController } from "../controllers/WalletController.js";

const router = Router();
const walletController = new WalletController();

router.post(
  "/deposit",
  dataValidation("body", walletDepositSchema),
  async (request, response, next) => {
    try {
      const result = await walletController.walletDeposit(request.body);
      return response.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
