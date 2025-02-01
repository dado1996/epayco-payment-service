import { WalletModel } from "../models/WalletModel.js";
import { TransactionController } from "./TransactionController.js";

export class WalletController {
  async walletDeposit(data) {
    const walletModel = new WalletModel();
    const transactionController = new TransactionController();

    const wallet = await walletModel.findWalletByDocumentId(data.documentId);
    if (!wallet || wallet.user.phone !== data.phone) {
      return {
        status: 400,
        message: "Wallet associated to document id doesn't exist",
      };
    }

    const newBalance = parseFloat(data.amount) + wallet.balance;

    const walletUpdatedBalance = await walletModel.updateBalance(
      wallet.id,
      newBalance
    );
    const transaction = transactionController.createTransaction(
      "deposit",
      data.amount,
      { walletId: wallet.id }
    );
    return {
      status: 200,
      message: "Balance has been updated succesfully",
      data: {
        ...walletUpdatedBalance,
        ...transaction,
      },
    };
  }
}
