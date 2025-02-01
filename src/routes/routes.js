import { Router } from "express";
import UserRoutes from "./UserRoutes.js";
import WalletRoutes from "./WalletRoutes.js";
import TransactionRoutes from "./TransactionRoutes.js";
import { NotFound } from "../middlewares/NotFound.js";
import { errorValidation } from "../middlewares/ErrorValidation.js";

const router = Router();

// router.get("/", (request, response) => {
//   return response.json({
//     status: 200,
//     message: "It works!",
//   });
// });

router.use("/users", UserRoutes);
router.use("/wallets", WalletRoutes);
router.use("/transactions", TransactionRoutes);
router.use(NotFound);

router.use(errorValidation);

export default router;
