import { Router } from "express";
import UserRoutes from "./UserRoutes.js";
import WalletRoutes from "./WalletRoutes.js";
import { errorValidation } from "../middlewares/ErrorValidation.js";

const router = Router();

router.get("/", (request, response) => {
  return response.json({
    status: 200,
    message: "It works!",
  });
});

router.use("/users", UserRoutes);
router.use("/wallets", WalletRoutes);

router.use(errorValidation);

export default router;
